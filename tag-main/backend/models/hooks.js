import User from "./user.model.js";
import Video from "./video.model.js";
import TextGuide from "./text.model.js";
import SpeciesDictionary from "./speciesDictionary.model.js";
import AquaticPlants from "./aquatic_plants.model.js";
import CommunityForum from "./community_forum_model.js";
import PlantImages from "./plant_images.model.js";
import { broadcastStats, broadcastContentStats } from "../lib/statsBroadcaster.js";

export const setupHooks = () => {
  const models = [User, Video, TextGuide, SpeciesDictionary, AquaticPlants, CommunityForum, PlantImages];

  models.forEach((model) => {
    model.addHook("afterCreate", () => {
      setImmediate(() => {
        // Pass 'true' to force a fresh DB count
        broadcastStats(true).catch(err => console.error("Hook update failed", err));
        broadcastContentStats().catch(err => console.error("Hook content update failed", err));
      });
    });

    model.addHook("afterDestroy", () => {
      setImmediate(() => {
        broadcastStats(true).catch(err => console.error("Hook delete failed", err));
        broadcastContentStats().catch(err => console.error("Hook content delete failed", err));
      });
    });
    
    // Also listen for updates that might change status (like 'published' vs 'draft')
    // For simplicity, we just broadcast on any update for now, or we could be more specific
    model.addHook("afterUpdate", () => {
      setImmediate(() => {
        broadcastStats(true).catch(err => console.error("Hook update failed", err));
        broadcastContentStats().catch(err => console.error("Hook content update failed", err));
      });
    });

    model.addHook("afterBulkUpdate", () => {
      setImmediate(() => {
        broadcastStats(true).catch(err => console.error("Hook bulk update failed", err));
        broadcastContentStats().catch(err => console.error("Hook content bulk update failed", err));
      });
    });
    
    model.addHook("afterBulkDestroy", () => {
      setImmediate(() => {
        broadcastStats(true).catch(err => console.error("Hook bulk destroy failed", err));
        broadcastContentStats().catch(err => console.error("Hook content bulk destroy failed", err));
      });
    });
  }); 
};