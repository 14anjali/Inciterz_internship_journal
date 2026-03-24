// routes/videoGuide.routes.js
import express from "express";
import {
  createVideoGuide,
  getAllVideos,
  approveVideo,
  rejectVideo,
  deleteVideoGuide,
  deleteSelectedVideos,
  getActiveVideoGuides,
  toggleVideoActiveStatus,
  getVideoById,
} from "../controllers/video.controller.js";
import {
  protectRoute,
  adminRoute,
  supportOrAdminRoute,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// Get all active public video guides
router.get("/public", getActiveVideoGuides);

// Get video guide by ID (public route)
router.get("/:id", getVideoById);



// Protected routes (all require auth)
router.use(protectRoute);



// Create a new video guide (admin or support)
router.post("/", supportOrAdminRoute, createVideoGuide);



// Get all video guides (admin or support)
router.get("/", supportOrAdminRoute, getAllVideos);



// Approve a video guide (admin only)
router.put("/approve", adminRoute, approveVideo);



// Reject a video guide (admin only)
router.put("/reject", adminRoute, rejectVideo);



// Delete a video guide (admin or support; controller enforces per-user rules)
router.post("/delete", supportOrAdminRoute, deleteVideoGuide);



// Bulk delete selected videos (admin or support; controller enforces per-user rules)
router.post("/delete-selected", supportOrAdminRoute, deleteSelectedVideos);



// Toggle active status of a video guide (admin only)
router.patch("/:id/toggle-active", adminRoute, toggleVideoActiveStatus);

export default router;
