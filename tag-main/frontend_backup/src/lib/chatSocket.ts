import { io } from "socket.io-client";
import config from "@/api/config";

const SOCKET_URL = config.baseUrl;

export const chatSocket = io(`${SOCKET_URL}/api/community/chat`, {
  transports: ["websocket", "polling"],
  withCredentials: true,
  autoConnect: false,
  path: "/socket.io/",
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
