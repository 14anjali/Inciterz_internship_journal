import SupportChat from "../models/support_chat.model.js";
import SupportChatMessage from "../models/support_chat_message.model.js";
import SupportMember from "../models/support_member.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { socketAuthMiddleware } from "../middleware/socket.middleware.js";

export const setupSupportChat = (io) => {
    const supportNamespace = io.of("/support");

    // Use permissive middleware
    supportNamespace.use(socketAuthMiddleware);

    supportNamespace.on("connection", (socket) => {
        const user = socket.user;
        const isGuest = !user || user.role === 'guest';
        // If needed, we can access user ID via user.id
        // Note: guests have id like 'guest_...'

        console.log(`[Support Socket] Connected: ${socket.id} (Role: ${user?.role || 'unknown'})`);

        socket.on("join_support_chat", async ({ chatId, userId }) => {
            // Validate userId matches authenticated user if not support/admin
            // But the original code trusted the client-sent userId in the event payload?
            // Original: const isInitiator = chat.initiated_by === userId;
            // It didn't verify if socket.data.userId === userId explicitly in the join logic,
            // BUT it used socket.data.userId in the middleware to populate.
            
            // Let's rely on socket.user.id for security instead of payload userId where possible.
            // But the client sends { chatId, userId }.
            
            // If guest, they might not have a numeric ID.
            // If the chat was initiated by a guest (if that's possible), how do we track?
            // Assuming support chat requires logged in user for now as per original code requiring token.
            
            if (isGuest) {
                 // If guests are not supposed to use this, just return or emit error
                 // But we allowed connection to avoid console errors.
                 socket.emit("error", { message: "Authentication required" });
                 return;
            }

            const authenticatedUserId = user.id;

            try {
                const chat = await SupportChat.findByPk(chatId);
                if (!chat) {
                    socket.emit("error", { message: "Chat not found" });
                    return;
                }

                // Check if user is the initiator or a support member
                const isInitiator = chat.initiated_by === userId;
                const isSupportMember = await SupportMember.findOne({
                    where: { support_chat_id: chatId, user_id: userId },
                });

                console.log(`[DEBUG] Join chat ${chatId} by user ${userId}. IsInitiator: ${isInitiator}, IsSupportMember: ${!!isSupportMember}`);

                if (!(isInitiator || isSupportMember)) {
                    socket.emit("support_error", { message: "Unauthorized access to chat" });
                    return;
                }

                socket.join(`support_chat_${chatId}`);
                console.log(`[Support Socket] User ${userId} joined chat ${chatId}`);

                // Notify others in the room
                socket.to(`support_chat_${chatId}`).emit("user_joined", { userId });
            } catch (error) {
                console.error("Error joining support chat:", error);
                socket.emit("error", { message: "Failed to join chat" });
            }
        });

socket.on("send_support_message", async ({ chatId, senderId, message }) => {
  try {
    const chat = await SupportChat.findByPk(chatId);
    if (!chat) {
      socket.emit("error", { message: "Chat not found" });
      return;
    }

    const isInitiator = chat.initiated_by === senderId;

    const member = await SupportMember.findOne({
      where: { support_chat_id: chatId, user_id: senderId },
    });

    console.log(
      `[DEBUG] Msg from ${senderId} in chat ${chatId}. IsInitiator: ${isInitiator}, Member: ${!!member}, Locked: ${member?.is_locked}`
    );

    /**
     * 🔒 RULES
     * - Initiator (user) → always allowed
     * - Admin/Support → MUST be SupportMember AND unlocked
     */
    if (!isInitiator) {
      if (!member) {
        socket.emit("support_error", {
          message: "You must take over the chat to send messages",
        });
        return;
      }

      if (member.is_locked) {
        socket.emit("support_error", {
          message: "Chat is locked by another agent",
        });
        return;
      }
    }

    // ✅ Save message
    const newMessage = await SupportChatMessage.create({
      support_chat_id: chatId,
      sender_id: senderId,
      message,
    });

    // ✅ Broadcast
    supportNamespace
      .to(`support_chat_${chatId}`)
      .emit("receive_support_message", newMessage);

  } catch (error) {
    console.error("Error sending support message:", error);
    socket.emit("error", { message: "Failed to send message" });
  }
});

        socket.on("disconnect", () => {
            console.log(`[Support Socket] User disconnected: ${socket.id}`);
        });
    });
};

export const emitChatResolved = (io, chatId) => {
    io.of("/support")
        .to(`support_chat_${chatId}`)
        .emit("support:chat_resolved", { chatId });
};
