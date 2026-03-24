import { performanceMonitor } from "../services/performance.monitor.js";
import { socketAuthMiddleware } from "../middleware/socket.middleware.js";

export const setupPerformanceSocket = (io) => {
  const nsp = io.of("/performance");
  
  // Use the permissive middleware (allows guests)
  nsp.use(socketAuthMiddleware);

  nsp.on("connection", (socket) => {
    // Only log if meaningful or debug
    // console.log(`[Performance WS] connected: ${socket.id} (${socket.user?.role || 'unknown'})`);

    // Only send metrics to admins or support
    const isAdminOrSupport = socket.user && (socket.user.role === 'admin' || socket.user.role === 'support');

    let interval;
    if (isAdminOrSupport) {
        interval = setInterval(async () => {
          const metrics = await performanceMonitor.collect();
          socket.emit("metrics", metrics);
        }, 1000);
    }

    socket.on("disconnect", () => {
      if (interval) clearInterval(interval);
      // console.log("[Performance WS] disconnected:", socket.id);
    });
  });
};
