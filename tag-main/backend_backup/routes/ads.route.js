import express from "express";
import {
  getAdByLocation,
  getAds,
  createOrUpdateAd,
  updateAd,
  deleteAd,
  uploadAdImage,
} from "../controllers/ads.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";
import adImageUpload from "../middleware/ad_upload.middleware.js";

const router = express.Router();

// Public: used by frontend to render ads
router.get("/by-location/:location", getAdByLocation);

// Admin only
router.get("/", protectRoute, adminRoute, getAds);
router.post("/upload-image", protectRoute, adminRoute, adImageUpload.single("image"), uploadAdImage);
router.post("/", protectRoute, adminRoute, createOrUpdateAd);
router.put("/:id", protectRoute, adminRoute, updateAd);
router.delete("/:id", protectRoute, adminRoute, deleteAd);

export default router;
