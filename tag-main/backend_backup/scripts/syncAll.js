import sequelize from "../lib/db.js";
import dotenv from "dotenv";
import User from "../models/user.model.js"; 
import Guest from "../models/guestModel.js";
import CommunityForum from "../models/community_forum_model.js";  
import Comments from "../models/community_forum_comment.model.js";  
import CommunityChat from "../models/community_chat.model.js";
import CommunityRoom from "../models/community_room.model.js";  
import AquaticPlants from "../models/aquatic_plants.model.js";
import PlantImages from "../models/plant_images.model.js";  
import PlantTags from "../models/plant_tags.model.js";  
import PlantTagMap from "../models/plant_tag_map.model.js";
import SpeciesDictionary from "../models/speciesDictionary.model.js"; 
import VideoGuide from "../models/video.model.js";
import TextGuide from "../models/text.model.js";  
import FAQ from "../models/faq.model.js"; 
import GuestConversion from "../models/guestConversion.model.js";
import setupAssociations from "../models/associations.js";  

dotenv.config();

const syncAll = async () => {
  try {
    setupAssociations();
    await sequelize.authenticate();
    console.log("Connected to database.");
    
    // Sync all models
    await sequelize.sync({ alter: true });
    
    console.log("All tables synced successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error syncing tables:", error);
    process.exit(1);
  }
};

syncAll();
