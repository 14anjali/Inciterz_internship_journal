/**
 * Site-wide notification for website updates: new community posts,
 * new text/video guides, new species. Shown to all logged-in users.
 */
import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/db.js";

class Notification extends Model {}

Notification.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("community_post", "text_guide", "video_guide", "new_species"),
      allowNull: false,
    },
    reference_id: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "ID of the community post, guide, or species",
    },
    title: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    link_path: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "Frontend path to open (e.g. /community-forum, /text-guides/xxx)",
    },
  },
  {
    sequelize,
    modelName: "Notification",
    tableName: "notifications",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [{ fields: ["created_at"] }, { fields: ["type"] }],
  }
);

export default Notification;
