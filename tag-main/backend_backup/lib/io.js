import { Server } from "socket.io";

let io;

const allowedOrigins = [
  "https://theaquaguide.com",
  "https://www.theaquaguide.com",
  "http://localhost:5173",
  "http://localhost:5000",
  "http://localhost:8080",
];

export const initIO = (server) => {
  io = new Server(server, {
    path: "/socket.io/",
    cors: {
      origin: allowedOrigins,
      credentials: true,
      methods: ["GET", "POST"],
    },
    transports: ["polling", "websocket"],
    allowEIO3: true,
  });
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
