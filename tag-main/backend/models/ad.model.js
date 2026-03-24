/**
 * Ad Model
 * Stores ad content (AdSense script or image) per location for frontend display.
 * Admin-only management; locations: sidebar_left, sidebar_right, community_chat_sidebar, after_header, before_footer, or custom slug.
 */
import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/db.js";

class Ad extends Model {}

Ad.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "ads_location_unique",
      comment: "Predefined: sidebar_left, sidebar_right, community_chat_sidebar, after_header, before_footer; or custom slug",
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Optional label for admin (e.g. 'Homepage sidebar')",
    },
    content_type: {
      type: DataTypes.ENUM("script", "image"),
      allowNull: false,
      defaultValue: "script",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "AdSense script code or image URL",
    },
    image_link_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "When content_type=image, optional link URL for the image",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    sort_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Ad",
    tableName: "ads",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [{ fields: ["is_active"] }],
  }
);

export default Ad;
