import express from "express";
import { getStats, getPostgresStats } from "../controllers/stats.controller.js";
import {
  getServerMetrics,
  getServerMetricsHistory,
} from "../controllers/serverMetrics.controller.js";
import { getContentStats } from "../controllers/contentStats.controller.js";

const router = express.Router();

router.get("/", getStats);
router.get("/system", getServerMetrics);
router.get("/system/history", getServerMetricsHistory);
router.get("/content", getContentStats);
router.get("/postgres", getPostgresStats);

export default router;
