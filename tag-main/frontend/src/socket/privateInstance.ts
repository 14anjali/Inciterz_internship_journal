import { io, Socket } from "socket.io-client";
import config from "../api/config";

const SOCKET_URL = config.baseUrl;

// Private chat socket (new namespace)
export let privateSocket: Socket = io(`${SOCKET_URL}/api/chat/private`, {
    autoConnect: false,
    transports: ["websocket", "polling"],
});

/**
 * Connect private socket with proper JWT authentication
 * Called when user logs in
 */
export const connectPrivateSocket = () => {
    // Get token - check both possible keys
    const token = localStorage.getItem("accessToken");

    if (token && !privateSocket.connected) {
        console.log("🔌 Connecting private socket with token...");
        // Update auth object with fresh token
        privateSocket.auth = { token };
        privateSocket.connect();
    } else if (!token) {
        console.warn("❌ No token available for private socket connection");
    } else if (privateSocket.connected) {
        console.log("✅ Private socket already connected");
    }
};

/**
 * Disconnect private socket immediately
 * CRITICAL: Must be called on logout to prevent session persistence
 */
export const disconnectPrivateSocket = () => {
    console.log("🔌 Disconnecting private socket...");
    if (privateSocket && privateSocket.connected) {
        privateSocket.disconnect();
        console.log("✅ Private socket disconnected");
    }
};

/**
 * Reconnect private socket with new token
 * Called when token is refreshed or user logs back in
 */
export const reconnectPrivateSocket = (newToken?: string) => {
    if (privateSocket.connected) {
        privateSocket.disconnect();
    }

    const token = newToken || localStorage.getItem("accessToken");
    if (token) {
        privateSocket.auth = { token };
        privateSocket.connect();
        console.log("🔄 Private socket reconnected with new token");
    }
};
