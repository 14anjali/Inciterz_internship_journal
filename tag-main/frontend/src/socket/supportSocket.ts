import { io, Socket } from "socket.io-client";
import config from "../api/config";

let supportSocket: Socket | null = null;

export const connectSupportSocket = (accessToken: string) => {
  if (supportSocket && supportSocket.connected) {
    return supportSocket;
  }

  if (supportSocket) {
    supportSocket.disconnect();
    supportSocket = null;
  }

  supportSocket = io(`${config.baseUrl}/support`, {
    auth: {
      token: accessToken
    },
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
  });

  supportSocket.on("connect", () => {});
  supportSocket.on("disconnect", () => {});
  supportSocket.on("support_error", () => {});
  supportSocket.on("error", () => {});

  return supportSocket;
};

export const getSupportSocket = (): Socket | null => supportSocket;

export const joinSupportChat = (chatId: string, userId: string) => {
  if (!supportSocket) return;

  supportSocket.emit("join_support_chat", {
    chatId,
    userId
  });
};

export const sendSupportMessage = (
  chatId: string,
  senderId: string,
  message: string
) => {
  if (!supportSocket) return;

  supportSocket.emit("send_support_message", {
    chatId,
    senderId,
    message
  });
};

export const onSupportMessage = (
  callback: (message: any) => void
) => {
  if (!supportSocket) return;

  supportSocket.on("receive_support_message", callback);
};

export const offSupportMessage = (
  callback: (message: any) => void
) => {
  if (!supportSocket) return;
  supportSocket.off("receive_support_message", callback);
};

export const onSocketConnect = (callback: () => void) => {
  if (!supportSocket) return;
  supportSocket.on("connect", callback);
};

export const offSocketConnect = (callback: () => void) => {
  if (!supportSocket) return;
  supportSocket.off("connect", callback);
};

export const onChatResolved = (
  callback: (payload: { chatId: string }) => void
) => {
  if (!supportSocket) return;

  supportSocket.on("support:chat_resolved", callback);
};

export const onChatTakenOver = (
  callback: (payload: { chatId: string; by: string; role: string, byName: string }) => void
) => {
  if (!supportSocket) return;
  supportSocket.on("support:chat_taken_over", callback);
};

export const onNewSupportChat = (
  callback: (payload: { chat: any }) => void
) => {
  if (!supportSocket) return;
  supportSocket.on("support:new_chat", callback);
};

export const offNewSupportChat = (
  callback: (payload: { chat: any }) => void
) => {
  if (!supportSocket) return;
  supportSocket.off("support:new_chat", callback);
};

export const disconnectSupportSocket = () => {
  if (!supportSocket) return;

  supportSocket.disconnect();
  supportSocket = null;
};

export const onSupportError = (
  callback: (err: { message: string }) => void
) => {
  if (!supportSocket) return;
  supportSocket.on("support_error", callback);
};

