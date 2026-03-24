import User from "../models/user.model.js";
import Video from "../models/video.model.js";
import TextGuide from "../models/text.model.js";
import SpeciesDictionary from "../models/speciesDictionary.model.js";
import AquaticPlants from "../models/aquatic_plants.model.js";
import CommunityForum from "../models/community_forum_model.js";
import { getIO } from "./io.js";
import { Op } from "sequelize";

import { fetchUserSummaryData } from "../controllers/userSummary.controller.js";
import { fetchContentStatsData } from "../controllers/contentStats.controller.js";

// Global cache variable
let statsCache = null;

export const broadcastUserSummaryStats = async () => {
  try {
    const io = getIO();
    if (!io) return;

    const data = await fetchUserSummaryData();
    io.emit("userSummaryUpdate", data);
    console.log("🚀 Broadcasted User Summary Stats:", data);
  } catch (error) {
    console.error("Broadcast User Summary Error:", error);
  }
};

export const broadcastContentStats = async () => {
  try {
    const io = getIO();
    if (!io) return;

    const data = await fetchContentStatsData();
    io.emit("contentStatsUpdate", data);
    console.log("🚀 Broadcasted Content Stats:", data);
  } catch (error) {
    console.error("Broadcast Content Stats Error:", error);
  }
};

export const broadcastStats = async (forceRefresh = false) => {
  try {
    const io = getIO();
    if (!io) return;

    // Only query DB if cache is empty OR we are forcing a refresh (from a hook)
    if (!statsCache || forceRefresh) {
      console.log("📊 Cache empty or refresh triggered: Fetching fresh stats from DB...");
      const [u, v, t, s, p, f] = await Promise.all([
      User.count({
        where: {
          role: {
            [Op.notIn]: ["admin", "support"],
          },
        },
      }),
      Video.count(),
      TextGuide.count(),
      SpeciesDictionary.count(),
      AquaticPlants.count(),
      CommunityForum.count({
        where: { status: "approved" }
      })
    ]);
      statsCache = { users: u, videoGuides: v, textGuides: t, species: s, plants: p, forumPosts: f };
    }

    io.emit("statsUpdate", statsCache);
    console.log("🚀 Broadcasted Stats:", statsCache);
  } catch (error) {
    console.error("Broadcast Error:", error);
  }
};
  export const getStatsCache = async () => {
  if (!statsCache) {
  await broadcastStats(true);
  }
  return statsCache;
};
