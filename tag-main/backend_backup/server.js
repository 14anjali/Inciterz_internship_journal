import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { Server } from "socket.io";
import http from "http";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import setupAssociations from "./models/associations.js";
import sequelize from "./lib/db.js";
import { initIO } from "./lib/io.js";
import { setupHooks } from "./models/hooks.js";
import { getGeoLocation } from "./utils/location.util.js";
import authRoutes from "./routes/auth.route.js";
import communityRoutes from "./routes/community_forum.route.js";
import communityChatsRoutes from "./routes/community_chat.route.js";
import videoRoutes from "./routes/video.route.js";
import manageUserRoutes from "./routes/admin.manageuser.route.js";
import speciesRoutes from "./routes/species.route.js";
import speciesPublicRoutes from "./routes/species.public.route.js";
import textGuideRoutes from "./routes/text_guide.route.js";
import { setupChatSocket } from "./lib/socket-handlers.js";
import { setupPrivateChat } from "./lib/socket-handlers-private.js";
import { setupSupportChat } from "./lib/socket-handlers-support.js";
import { setupPerformanceSocket } from "./lib/performance.socket.js";
import axios from "axios";
import faqRoutes from "./routes/faq.route.js";
import statsRoutes from "./routes/stats.route.js";
import privateChatRoutes from "./routes/privateconversation.route.js";
import supportChatRoutes from "./routes/supportChat.routes.js";
import adminSystemRoutes from "./routes/admin.system.route.js";
import notificationRoutes from "./routes/notification.route.js";
import messagesRoutes from "./routes/messages.route.js";
import adsRoutes from "./routes/ads.route.js";
import siteSettingsRoutes from "./routes/site_settings.route.js";

// IMPORT YOUR MODELS HERE
import User from "./models/user.model.js";
import Guest from "./models/guestModel.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPublicUploadsDir = path.resolve(__dirname, "../frontend/public/uploads");
if (!fs.existsSync(frontendPublicUploadsDir)) {
  fs.mkdirSync(frontendPublicUploadsDir, { recursive: true });
}

// Trust proxy (required for correct IP behind Nginx/Cloudflare)
app.set("trust proxy", true);

// Use Helmet for Security Headers (CSP)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'", 
          "'unsafe-inline'", 
          "https://theaquaguide.com",
          "https://static.cloudflareinsights.com",
          "https://cdn.jsdelivr.net" // for live map html2canvas if needed
        ],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: [
          "'self'", 
          "data:", 
          "blob:", 
          "https://theaquaguide.com", 
		  "https://www.theaquaguide.com",
          "https://raw.githubusercontent.com", // for leaflet markers
          "https://cdnjs.cloudflare.com", // for leaflet markers
          "https://tile.openstreetmap.org" // for map tiles
        ],
        connectSrc: ["'self'", "ws:", "wss:", "https://nominatim.openstreetmap.org"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

const activeUsers = new Map();
export const getActiveUsersMap = () => Array.from(activeUsers.values());

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:8080",
    "http://localhost:5173",
    "http://localhost:5000",
    "https://theaquaguide.com",
    "https://www.theaquaguide.com"
  ],
  credentials: true
}));

setupAssociations();

// Routes (more specific /api/* paths before generic /api to avoid 404)
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/manage_users", manageUserRoutes);
app.use("/api/manage_species", speciesRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/ads", adsRoutes);
app.use("/api/settings", siteSettingsRoutes);
app.use("/api", speciesPublicRoutes);
app.use("/api/textguides", textGuideRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/community/chat", communityChatsRoutes);
app.use("/uploads", express.static(frontendPublicUploadsDir));
app.use("/uploads", express.static("uploads"));
app.use("/api/public", express.static("public"));
app.use("/api/faqs", faqRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/conversation/private", privateChatRoutes);
app.use("/api/support", supportChatRoutes);
app.use("/api/admin/system", adminSystemRoutes);
app.use("/api/notifications", notificationRoutes);


const getIpFromSocket = (socket) => {
  const headerIp =
    socket.handshake.headers["cf-connecting-ip"] ||
    socket.handshake.headers["x-real-ip"] ||
    (socket.handshake.headers["x-forwarded-for"] || "").split(",")[0].trim();
  
  let ipAddress = headerIp || socket.handshake.address || "";
  
  // Clean up IPv6 mapped IPv4
  if (ipAddress && ipAddress.startsWith("::ffff:")) {
    ipAddress = ipAddress.replace("::ffff:", "");
  }

  // If primary IP is IPv6, try to find an IPv4 fallback
  if (!ipAddress.includes('.')) {
      const pseudoIpv4 = socket.handshake.headers["cf-pseudo-ipv4"];
      if (pseudoIpv4) {
          return `${pseudoIpv4} / ${ipAddress}`;
      }
      
      const forwardedFor = socket.handshake.headers["x-forwarded-for"];
      if (forwardedFor) {
          const ips = forwardedFor.split(',').map(ip => ip.trim());
          const ipv4 = ips.find(ip => ip.includes('.') && !ip.startsWith("::ffff:"));
          if (ipv4) {
              return `${ipv4} / ${ipAddress}`;
          }
      }
  }

  // Attempt to capture both IPv4 and IPv6 if available
  const ipv6 = socket.handshake.headers["cf-connecting-ipv6"] || null;
  if (ipv6 && ipv6 !== ipAddress && ipAddress.includes('.')) {
      return `${ipAddress} / ${ipv6}`;
  }

  if (ipAddress === "::1") {
    return "127.0.0.1";
  }
  return ipAddress;
};

const getSessionKey = (socket) => {
  const ip = getIpFromSocket(socket);
  const userAgent = (socket.handshake.headers["user-agent"] || "").slice(0, 120);
  const userId = socket.handshake.auth?.userId;
  if (userId) {
    return `${userId}::${userAgent}`;
  }
  return `${ip}::${userAgent}::${socket.id}`;
};

// Placeholder for broadcast function (ensure this is defined in your stats logic)
const broadcastStats = async () => {
  // Implement your stats broadcasting logic here if needed
};

app.get("/", (req, res) => res.send('Aqua Guide API Active'));

const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.ENVIRONMENT || process.env.NODE_ENV || "DEV";
const IS_PROD = ENVIRONMENT.toUpperCase() === "PROD" || ENVIRONMENT === "production";

const startServer = async () => {
  try {
    await sequelize.authenticate();

    /**
     * IMPORTANT:
     * - In local/dev we keep `alter: true` for convenience.
     * - In production we avoid `alter` to prevent long-running
     *   implicit migrations that can block startup and cause 502s.
     */
    if (IS_PROD) {
      await sequelize.sync();
    } else {
      await sequelize.sync({ alter: true });
    }
    console.log("PostgreSQL connected");

    const server = http.createServer(app);
    const io = initIO(server);
    app.set("io", io);

    setupChatSocket(io);
    setupPrivateChat(io);
    setupSupportChat(io);
    setupPerformanceSocket(io);
    setupHooks();

    io.on("connection", async (socket) => {
      // 1. Initial IP-based Geo
      const ipAddress = getIpFromSocket(socket);
      let geo = await getGeoLocation(ipAddress);

      const sessionKey = getSessionKey(socket);
      console.log(
        "[LiveTracking] New socket connection",
        socket.id,
        "ip:",
        ipAddress,
        "geo:",
        geo
      );

      let userName = "Guest";
      let userType = "Guest";
      let userRole = "guest";
      const userId = socket.handshake.auth?.userId;

      try {
        if (userId) {
          const user = await User.findOne({ where: { userid: userId } });
          if (user) {
            userName = user.name;
            userRole = user.role || "user";
            if (userRole === "admin") {
              userType = "Admin";
            } else if (userRole === "support") {
              userType = "Support";
            } else {
              userType = "User";
            }

            await User.update(
              {
                last_seen: new Date(),
                ip_address: ipAddress,
                country_code: geo?.country_code ?? null,
                region: geo?.region,
                latitude: geo?.latitude,
                longitude: geo?.longitude,
              },
              { where: { userid: userId } }
            );
          }
        } else {
          const defaults = {
            last_seen: new Date(),
          };
          if (geo) {
            defaults.country_code = geo.country_code;
            defaults.region = geo.region;
            defaults.latitude = geo.latitude;
            defaults.longitude = geo.longitude;
          }

          const [guest, created] = await Guest.findOrCreate({
            where: { ip_address: ipAddress },
            defaults: defaults,
          });
          if (!created) {
            const guestUpdate = { last_seen: new Date() };
            if (geo) {
              guestUpdate.country_code = geo.country_code;
              guestUpdate.region = geo.region;
              guestUpdate.latitude = geo.latitude;
              guestUpdate.longitude = geo.longitude;
            }
            await guest.update(guestUpdate);
          }
          userName = guest.guest_name || "Guest";
          userRole = "guest";
          userType = "Guest";
        }
      } catch (err) {
        console.error("Socket Tracking DB Error:", err);
      }

      activeUsers.set(sessionKey, {
        socketId: socket.id,
        name: userName,
        type: userType,
        role: userRole,
        ip: ipAddress,
        coords: geo ? [geo.latitude, geo.longitude] : [0, 0],
        city: geo?.region || "Unknown",
      });

      console.log(
        "[LiveTracking] Active users count:",
        activeUsers.size
      );

      io.emit("live-tracking-update", Array.from(activeUsers.values()));

      socket.on("update-location", async (data) => {
        const { latitude, longitude } = data;
        if (!latitude || !longitude) return;

        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
            params: {
              lat: latitude,
              lon: longitude,
              format: "json",
            },
            headers: {
              "User-Agent": "AquaGuide/1.0"
            }
          });

          const address = response.data.address;
          const city = address.city || address.town || address.village || address.county || "Unknown";
          const region = address.state || address.region || "";
          const countryCode = address.country_code ? address.country_code.toUpperCase() : "??";
          const formattedRegion = `${city}, ${region}, ${countryCode}`;

          const userData = activeUsers.get(sessionKey);
          if (userData) {
            userData.coords = [latitude, longitude];
            userData.city = formattedRegion;
            activeUsers.set(sessionKey, userData);
            io.emit("live-tracking-update", Array.from(activeUsers.values()));
          }

          if (userId) {
            await User.update(
              {
                latitude,
                longitude,
                region: formattedRegion,
                country_code: countryCode,
              },
              { where: { userid: userId } }
            );
          } else {
            const guest = await Guest.findOne({ where: { ip_address: ipAddress } });
            if (guest) {
              await guest.update({
                latitude,
                longitude,
                region: formattedRegion,
                country_code: countryCode,
              });
            }
          }
          console.log(`[LiveTracking] Updated location for ${userId || "guest"} to ${formattedRegion}`);

        } catch (error) {
          console.error("Reverse geocoding error:", error.message);
        }
      });

      socket.on("guest-converted", (data) => {
        console.log(`[LiveTracking] Guest converted to user ${data.userId} on socket ${socket.id}`);
        // Remove the guest session immediately so it doesn't linger
        for (const [key, value] of activeUsers.entries()) {
          if (value.socketId === socket.id) {
            activeUsers.delete(key);
            break;
          }
        }
        io.emit("live-tracking-update", Array.from(activeUsers.values()));
      });

      socket.on("disconnect", () => {
        for (const [key, value] of activeUsers.entries()) {
          if (value.socketId === socket.id) {
            activeUsers.delete(key);
            break;
          }
        }
        io.emit("live-tracking-update", Array.from(activeUsers.values()));
      });
    });

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
