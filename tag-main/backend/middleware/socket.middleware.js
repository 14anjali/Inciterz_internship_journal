import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      // Guest handling
      socket.user = { role: "guest", id: `guest_${socket.id}` };
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findByPk(decoded.userId || decoded.id, {
        attributes: { exclude: ["password"] }
      });
      
      if (user) {
        socket.user = user;
      } else {
        socket.user = { role: "guest", id: `guest_${socket.id}` };
      }
      next();
    } catch (err) {
      // Token invalid/expired -> treat as guest
      // Instead of erroring, we allow them as guest
      socket.user = { role: "guest", id: `guest_${socket.id}` };
      next();
    }
  } catch (error) {
    console.error("Socket auth error:", error);
    next(new Error("Internal server error during socket auth"));
  }
};
