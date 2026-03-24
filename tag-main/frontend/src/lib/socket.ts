import { io } from "socket.io-client";
import config from "@/api/config";

// In production, this should be the full URL of the backend.
// In dev, it's localhost:5000.
// We can try to infer it or just hardcode for this environment.
const SOCKET_URL = config.baseUrl;

export const socket = io(SOCKET_URL, {
	auth: {
    userId: localStorage.getItem("id"),
  },
  transports: ["websocket", "polling"],
  withCredentials: true,
  autoConnect: true,
  path: "/socket.io/",
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export const updateRootSocketAuth = (userId: string) => {
  socket.auth = { userId };
  socket.disconnect();
  socket.connect();
};