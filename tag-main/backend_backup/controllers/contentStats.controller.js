import SpeciesDictionary from "../models/speciesDictionary.model.js";
import Video from "../models/video.model.js";
import TextGuide from "../models/text.model.js";
import CommunityForum from "../models/community_forum_model.js";
import PlantImages from "../models/plant_images.model.js";
import AquaticPlants from "../models/aquatic_plants.model.js";
import { Op } from "sequelize";

export const fetchContentStatsData = async () => {
  const [
    totalSpecies,
    videoCount,
    textGuideCount,
    forumPosts,
    plantImageCount,
    speciesWithPrimaryImage,
    aquaticPlants,
  ] = await Promise.all([
    SpeciesDictionary.count({ where: { status: "published" } }),
    Video.count(),
    TextGuide.count(),
    CommunityForum.count(),
    PlantImages.count(),
    SpeciesDictionary.count({
      where: { primary_image: { [Op.ne]: null } },
    }),
    AquaticPlants.count(),
  ]);

  const mediaFiles = videoCount + textGuideCount;
  const images = plantImageCount + speciesWithPrimaryImage;

  return {
    totalSpecies,
    mediaFiles,
    images,
    forumPosts,
    aquaticPlants,
  };
};

export const getContentStats = async (req, res) => {
  try {
    const data = await fetchContentStatsData();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Content stats error:", error);
    return res.status(500).json({ message: "Failed to load content stats" });
  }
};