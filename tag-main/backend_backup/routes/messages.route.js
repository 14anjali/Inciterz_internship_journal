import express from "express";
import {
  getUnreadCount,
  markConversationRead,
  markCommunityMentionsRead,
} from "../controllers/messages.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/unread-count", protectRoute, getUnreadCount);
router.patch("/conversation/:conversationId/read", protectRoute, markConversationRead);
router.patch("/community-mentions/read", protectRoute, markCommunityMentionsRead);

export default router;
