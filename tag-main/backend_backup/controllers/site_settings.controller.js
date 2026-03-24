import SiteSetting from "../models/site_setting.model.js";

const DEFAULTS = {
  logo_light: "/light_theme_logo.webp",
  logo_dark: "/dark_theme_logo.webp",
  heading_font: "Plus Jakarta Sans",
  text_font: "Inter",
};

const KEYS = ["logo_light", "logo_dark", "heading_font", "text_font"];

/**
 * GET /api/settings (public)
 * Returns current site settings for frontend (logos, fonts).
 */
export const getSettings = async (req, res) => {
  try {
    const rows = await SiteSetting.findAll({
      where: { key: KEYS },
      attributes: ["key", "value"],
    });
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    const data = {
      logo_light: map.logo_light ?? DEFAULTS.logo_light,
      logo_dark: map.logo_dark ?? DEFAULTS.logo_dark,
      heading_font: map.heading_font ?? DEFAULTS.heading_font,
      text_font: map.text_font ?? DEFAULTS.text_font,
    };
    return res.status(200).json(data);
  } catch (err) {
    console.error("getSettings error:", err.message);
    return res.status(500).json({ message: "Failed to fetch settings" });
  }
};

/**
 * POST /api/settings/upload-logo (admin only)
 * Multipart form: logo (file), type (optional: "light" | "dark" for filename).
 * Saves file to frontend/public as logo-light.* or logo-dark.*, returns path for DB.
 */
export const uploadLogo = async (req, res) => {
  try {
    if (!req.file || !req.file.filename) {
      return res.status(400).json({ message: "No image file received" });
    }
    const path = `/${req.file.filename}`;
    return res.status(200).json({ path });
  } catch (err) {
    console.error("uploadLogo error:", err.message);
    return res.status(500).json({ message: "Failed to upload logo" });
  }
};

/**
 * PUT /api/settings (admin only)
 * Body: { logo_light?, logo_dark?, heading_font?, text_font? }
 */
export const updateSettings = async (req, res) => {
  try {
    const { logo_light, logo_dark, heading_font, text_font } = req.body;
    const toSet = { logo_light, logo_dark, heading_font, text_font };
    for (const key of KEYS) {
      const value = toSet[key];
      if (value === undefined || value === null) continue;
      await SiteSetting.upsert({ key, value: String(value).trim() || null }, { conflictFields: ["key"] });
    }
    const rows = await SiteSetting.findAll({ where: { key: KEYS }, attributes: ["key", "value"] });
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    const data = {
      logo_light: map.logo_light ?? DEFAULTS.logo_light,
      logo_dark: map.logo_dark ?? DEFAULTS.logo_dark,
      heading_font: map.heading_font ?? DEFAULTS.heading_font,
      text_font: map.text_font ?? DEFAULTS.text_font,
    };
    return res.status(200).json(data);
  } catch (err) {
    console.error("updateSettings error:", err.message);
    return res.status(500).json({ message: "Failed to update settings" });
  }
};
