import { io, Socket } from "socket.io-client";
import config from "../api/config";

// Community chat socket — autoConnect: false so we connect with a fresh token
export const socket: Socket = io(`${config.baseUrl}/api/community/chat`, {
  autoConnect: false,
  transports: ["websocket", "polling"],
});

/**
 * Connect community socket with proper JWT authentication.
 * Called when the CommunityChat page mounts (or after login).
 */
export const connectCommunitySocket = () => {
  const token = localStorage.getItem("accessToken");

  if (token && !socket.connected) {
    console.log("🔌 Connecting community socket with token...");
    socket.auth = { token };
    socket.connect();
  } else if (!token) {
    console.warn("❌ No token available for community socket connection");
  } else if (socket.connected) {
    console.log("✅ Community socket already connected");
  }
};

/**
 * Update socket authentication with new token
 * Called when user logs in or token is refreshed
 */
export const updateSocketAuth = (token: string) => {
  console.log("🔌 Updating socket auth with new token...");
  socket.auth = { token };
  // Force reconnection with new auth
  if (socket.connected) {
    socket.disconnect();
  }
  socket.connect();
  console.log("✅ Socket reconnected with new credentials");
};

/**
 * Disconnect community chat socket
 * Called when user logs out
 */
export const disconnectCommunitySocket = () => {
  console.log("🔌 Disconnecting community socket...");
  if (socket && socket.connected) {
    socket.disconnect();
    console.log("✅ Community socket disconnected");
  }
};
