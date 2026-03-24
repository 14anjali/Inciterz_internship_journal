/**
 * Creates the site_settings table and seeds it with current default settings.
 * Run from backend: node scripts/createSiteSettingsTable.js
 */
import dotenv from "dotenv";
import sequelize from "../lib/db.js";
import SiteSetting from "../models/site_setting.model.js";

dotenv.config();

const DEFAULT_SETTINGS = [
  { key: "logo_light", value: "/light_theme_logo.webp" },
  { key: "logo_dark", value: "/dark_theme_logo.webp" },
  { key: "heading_font", value: "Plus Jakarta Sans" },
  { key: "text_font", value: "Inter" },
];

const createSiteSettingsTable = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database.");
    await SiteSetting.sync();
    console.log("Site settings table created or already exists.");
    for (const row of DEFAULT_SETTINGS) {
      await SiteSetting.upsert(row, { conflictFields: ["key"] });
    }
    console.log("Default settings inserted/updated:", DEFAULT_SETTINGS.map((r) => r.key).join(", "));
    process.exit(0);
  } catch (error) {
    console.error("Error creating site_settings table:", error.message);
    process.exit(1);
  }
};

createSiteSettingsTable();
