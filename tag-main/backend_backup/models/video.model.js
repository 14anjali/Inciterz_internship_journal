// models/videoGuide.model.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/db.js";

class VideoGuide extends Model {}

VideoGuide.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    youtubeLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    channelAvatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    videoId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    status: {
      type: DataTypes.ENUM("approved", "pending", "rejected"),
      defaultValue: "approved",
    },
    submittedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "Users", key: "id" },
    },
    is_ownership_transferred: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    original_owner_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "VideoGuide",
    timestamps: true,
  }
);

export default VideoGuide;
