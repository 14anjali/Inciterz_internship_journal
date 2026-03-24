import express from "express";
import { purgeCache, getSystemLogs } from "../controllers/admin.system.controller.js";
import { protectRoute, supportOrAdminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Purge Cache (Admin/Support)
router.post("/purge-cache", protectRoute, supportOrAdminRoute, purgeCache);

// Get System Logs (Admin/Support)
router.get("/logs", protectRoute, supportOrAdminRoute, getSystemLogs);

export default router;
