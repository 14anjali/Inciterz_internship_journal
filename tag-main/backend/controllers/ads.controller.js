import "../models/associations.js";
import Ad from "../models/ad.model.js";

const PREDEFINED_LOCATIONS = [
  { id: "after_header", label: "After header" },
  { id: "sidebar_left", label: "Sidebar (left)" },
  { id: "sidebar_right", label: "Sidebar (right)" },
  { id: "community_chat_sidebar", label: "Community chat sidebar" },
  { id: "before_footer", label: "Before footer" },
];

/**
 * GET /api/ads/by-location/:location (public)
 * Returns active ad for the given location (for frontend to render).
 */
export const getAdByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }
    const ad = await Ad.findOne({
      where: { location, is_active: true },
      attributes: ["id", "location", "content_type", "content", "image_link_url"],
    });
    if (!ad) {
      return res.status(200).json({ data: null });
    }
    return res.status(200).json({
      data: {
        id: ad.id,
        location: ad.location,
        content_type: ad.content_type,
        content: ad.content,
        image_link_url: ad.image_link_url || null,
      },
    });
  } catch (err) {
    console.error("getAdByLocation error:", err.message);
    return res.status(500).json({ message: "Failed to fetch ad" });
  }
};

/**
 * GET /api/ads (admin only)
 * List all ads and predefined + custom locations.
 */
export const getAds = async (req, res) => {
  try {
    const ads = await Ad.findAll({
      order: [
        ["sort_order", "ASC"],
        ["location", "ASC"],
      ],
      attributes: ["id", "location", "name", "content_type", "content", "image_link_url", "is_active", "sort_order", "created_at", "updated_at"],
    });
    const locationSet = new Set(PREDEFINED_LOCATIONS.map((p) => p.id));
    ads.forEach((a) => locationSet.add(a.location));
    const allLocations = [
      ...PREDEFINED_LOCATIONS,
      ...ads
        .filter((a) => !PREDEFINED_LOCATIONS.some((p) => p.id === a.location))
        .map((a) => ({ id: a.location, label: a.name || a.location })),
    ];
    return res.status(200).json({
      ads: ads.map((a) => ({
        id: a.id,
        location: a.location,
        name: a.name,
        content_type: a.content_type,
        content: a.content,
        image_link_url: a.image_link_url,
        is_active: a.is_active,
        sort_order: a.sort_order,
        created_at: a.created_at,
        updated_at: a.updated_at,
      })),
      predefinedLocations: PREDEFINED_LOCATIONS,
      allLocations: [...new Map(allLocations.map((l) => [l.id, l])).values()],
    });
  } catch (err) {
    console.error("getAds error:", err.message);
    return res.status(500).json({ message: "Failed to fetch ads" });
  }
};

/**
 * POST /api/ads (admin only)
 * Create or update ad for a location (upsert by location).
 */
export const createOrUpdateAd = async (req, res) => {
  try {
    const { location, name, content_type, content, image_link_url, is_active } = req.body;
    if (!location || typeof location !== "string" || !location.trim()) {
      return res.status(400).json({ message: "Location is required" });
    }
    const slug = location.trim().toLowerCase().replace(/\s+/g, "_");
    if (!["script", "image"].includes(content_type)) {
      return res.status(400).json({ message: "content_type must be 'script' or 'image'" });
    }
    if (!content || typeof content !== "string") {
      return res.status(400).json({ message: "Content is required" });
    }
    await Ad.upsert(
      {
        location: slug,
        name: name?.trim() || null,
        content_type,
        content: content.trim(),
        image_link_url: image_link_url?.trim() || null,
        is_active: is_active !== false,
      },
      { conflictFields: ["location"] }
    );
    const created = await Ad.findOne({ where: { location: slug } });
    return res.status(200).json({
      message: "Ad saved",
      data: {
        id: created.id,
        location: created.location,
        name: created.name,
        content_type: created.content_type,
        is_active: created.is_active,
      },
    });
  } catch (err) {
    console.error("createOrUpdateAd error:", err.message);
    return res.status(500).json({ message: "Failed to save ad" });
  }
};

/**
 * PUT /api/ads/:id (admin only)
 */
export const updateAd = async (req, res) => {
  try {
    const { id } = req.params;
    const { location, name, content_type, content, image_link_url, is_active } = req.body;
    const ad = await Ad.findByPk(id);
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }
    if (location !== undefined && typeof location === "string" && location.trim()) {
      ad.location = location.trim().toLowerCase().replace(/\s+/g, "_");
    }
    if (name !== undefined) ad.name = name?.trim() || null;
    if (content_type !== undefined) {
      if (!["script", "image"].includes(content_type)) {
        return res.status(400).json({ message: "content_type must be 'script' or 'image'" });
      }
      ad.content_type = content_type;
    }
    if (content !== undefined) ad.content = content.trim();
    if (image_link_url !== undefined) ad.image_link_url = image_link_url?.trim() || null;
    if (typeof is_active === "boolean") ad.is_active = is_active;
    await ad.save();
    return res.status(200).json({ message: "Ad updated", data: ad });
  } catch (err) {
    console.error("updateAd error:", err.message);
    return res.status(500).json({ message: "Failed to update ad" });
  }
};

/**
 * DELETE /api/ads/:id (admin only)
 */
export const deleteAd = async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Ad.findByPk(id);
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }
    await ad.destroy();
    return res.status(200).json({ message: "Ad deleted" });
  } catch (err) {
    console.error("deleteAd error:", err.message);
    return res.status(500).json({ message: "Failed to delete ad" });
  }
};

/**
 * POST /api/ads/upload-image (admin only)
 * Multipart form with field "image". Returns path for storing in ad content.
 */
export const uploadAdImage = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No image file received" });
    }
    const path = `/uploads/ads/${req.file.filename}`;
    return res.status(200).json({ path });
  } catch (err) {
    console.error("uploadAdImage error:", err.message);
    return res.status(500).json({ message: "Failed to upload image" });
  }
};
