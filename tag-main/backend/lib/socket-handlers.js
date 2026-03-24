import CommunityChat from "../models/community_chat.model.js";
import CommunityMessage from "../models/community_chat_messages.model.js";
import User from "../models/user.model.js";
import { socketAuthMiddleware } from "../middleware/socket.middleware.js";

export function setupChatSocket(io) {
  const chatNamespace = io.of("/api/community/chat");

  // Use JWT auth middleware (same as support/private chat)
  chatNamespace.use(socketAuthMiddleware);

  chatNamespace.on("connection", (socket) => {
    const user = socket.user;
    const isGuest = !user || user.role === 'guest';
    const userId = user?.id;

    console.log(`[Chat] User connected: ${socket.id} (Role: ${user?.role || 'unknown'})`);

    if (userId && !isGuest) {
      socket.data.userId = userId;
      socket.join(`user-${userId}`);
      console.log(`[Chat] User ${userId} authenticated`);
    }

    /**
     * JOIN COMMUNITY
     */
    socket.on("join-community", (communityId, callback) => {
      if (!communityId) {
        return callback?.({
          success: false,
          error: "Community ID required",
        });
      }

      socket.join(communityId);

      console.log(`[Chat] Socket ${socket.id} joined community ${communityId}`);

      chatNamespace.to(communityId).emit("user-joined", {
        communityId,
        userId: socket.data.userId,
        timestamp: new Date(),
      });

      callback?.({ success: true });
    });

    /**
     * GUEST CONVERSION
     */
    socket.on("guest-converted", async (data) => {
      console.log(`[Chat] Guest converted to User ${socket.data.userId || 'unknown'}`);
      // Here you would implement logic to merge guest history if needed
    });

    /**
     * SEND MESSAGE
     */
    socket.on("send-message", async (data, callback) => {
      try {
        const { message, communityId } = data;
        const userId = socket.data.userId;

        if (!userId) {
          return callback({
            success: false,
            error: "User not authenticated",
          });
        }

        if (!communityId) {
          return callback({
            success: false,
            error: "Community ID required",
          });
        }

        if (!message || !message.trim()) {
          return callback({
            success: false,
            error: "Message cannot be empty",
          });
        }

        if (message.length > 5000) {
          return callback({
            success: false,
            error: "Message too long (max 5000 chars)",
          });
        }

        // Store message in DB
        const newMessage = await CommunityMessage.create({
          user_id: userId,
          community_id: communityId, // room_id == community_id
          message: message.trim(),
        });

        // Fetch with user data
        const messageWithUser = await CommunityMessage.findByPk(newMessage.id, {
          include: [
            {
              model: User,
              as: "sender",
              attributes: ["id", "userid", "name"],
            },
          ],
        });

        console.log(messageWithUser);

        // Broadcast to community
        chatNamespace.to(communityId).emit("message-received", {
          id: newMessage.id,
          message: newMessage.message,
          sender: messageWithUser.sender,
          timestamp: newMessage.created_at,
          communityId: communityId,
        });

        callback({ success: true });
      } catch (error) {
        console.error("[Chat] Send message error:", error);
        callback({
          success: false,
          error: "Failed to send message",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log(`[Chat] User disconnected: ${socket.id}`);
    });
  });
}
