/**
 * Creates the ads table for Manage Ads (if it does not exist).
 * Run from backend: node scripts/createAdsTable.js
 * Uses the Ad model so the schema stays in sync.
 *
 * Predefined locations (stored in location column): after_header, sidebar_left,
 * sidebar_right, community_chat_sidebar, before_footer, or any custom slug.
 */
import dotenv from "dotenv";
import sequelize from "../lib/db.js";
import Ad from "../models/ad.model.js";

dotenv.config();

const createAdsTable = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database.");

    await Ad.sync();
    console.log("Ads table created or already exists.");

    process.exit(0);
  } catch (error) {
    console.error("Error creating ads table:", error.message);
    process.exit(1);
  }
};

createAdsTable();
