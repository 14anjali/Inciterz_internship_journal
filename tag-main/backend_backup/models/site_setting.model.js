/**
 * Site Setting Model
 * Key-value store for site-wide settings: logos, fonts, etc.
 * Keys: logo_light, logo_dark, heading_font, text_font
 */
import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/db.js";

class SiteSetting extends Model {}

SiteSetting.init(
  {
    key: {
      type: DataTypes.STRING(100),
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "SiteSetting",
    tableName: "site_settings",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default SiteSetting;
