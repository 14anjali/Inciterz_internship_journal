import express from "express";
import { getSettings, updateSettings, uploadLogo } from "../controllers/site_settings.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";
import logoUpload from "../middleware/logo_upload.middleware.js";

const router = express.Router();

router.get("/", getSettings);
router.post("/upload-logo", protectRoute, adminRoute, logoUpload.single("logo"), uploadLogo);
router.put("/", protectRoute, adminRoute, updateSettings);

export default router;
