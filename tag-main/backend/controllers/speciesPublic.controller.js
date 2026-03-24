import { Op } from "sequelize";
import SpeciesDictionary from "../models/speciesDictionary.model.js";
import sequelize from "../lib/db.js";

/**
 * GET /species-dictionary
 * JSON response with filters + pagination using UNION for combined results
 */
export const getSpeciesDictionary = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.limit) || 12; // Matches your frontend grid
    const offset = (page - 1) * perPage;
    const search = req.query.q || "";
    const water_type = req.query.water_type || "";
    const care_level = req.query.care_level || "";
    const category = req.query.category || "";

    // Define columns to match for UNION (casting IDs and types to match)
    const fishSelect = `
      SELECT 
        fish_id::text, common_name, scientific_name, family, origin, 
        description, primary_image, water_type::text as water_type, care_level::text as care_level, 
        max_size_cm::numeric, status, 'fish' as category_type
      FROM "SpeciesDictionary"
      WHERE status = 'published'
      ${water_type ? "AND water_type = :water_type" : ""}
      ${care_level ? "AND care_level = :care_level" : ""}
      ${search ? "AND (common_name ILIKE :search OR scientific_name ILIKE :search OR family ILIKE :search)" : ""}
    `;

    const plantSelect = `
      SELECT 
        id::text as fish_id, common_name, scientific_name, family, origin, 
        description, primary_image, 'freshwater' as water_type, difficulty as care_level, 
        max_height_cm::numeric as max_size_cm, 'published' as status, 'aquaticplants' as category_type
      FROM "AquaticPlants"
      WHERE 1=1
      ${care_level ? "AND difficulty = :care_level" : ""}
      ${search ? "AND (common_name ILIKE :search OR scientific_name ILIKE :search OR family ILIKE :search)" : ""}
    `;

    // Logic to determine which part of the union to run
    let unionQuery = "";
    if (category === "fish") {
      unionQuery = fishSelect;
    } else if (category === "aquaticplants" || category === "macroalgae") {
      unionQuery = plantSelect;
    } else if (category === "compatibility") {
       // Maintain your existing compatibility logic compatibility override
       unionQuery = `${fishSelect} AND compatibility_notes IS NOT NULL`;
    } else {
      unionQuery = `${fishSelect} UNION ALL ${plantSelect}`;
    }

    // Execution of the Combined Query
    const species = await sequelize.query(
      `${unionQuery} ORDER BY common_name ASC LIMIT :limit OFFSET :offset`,
      {
        replacements: { 
          search: `%${search}%`, 
          water_type, 
          care_level, 
          limit: perPage, 
          offset 
        },
        type: sequelize.QueryTypes.SELECT
      }
    );

    // Execution of the Count Query
    const countResult = await sequelize.query(
      `SELECT COUNT(*) FROM (${unionQuery}) AS total`,
      {
        replacements: { search: `%${search}%`, water_type, care_level },
        type: sequelize.QueryTypes.SELECT
      }
    );

    const totalCount = parseInt(countResult[0].count);
    const totalPages = Math.ceil(totalCount / perPage);

    return res.status(200).json({
      page,
      perPage,
      total: totalCount,
      totalPages,
      filters: {
        search,
        water_type,
        care_level,
        category,
      },
      species,
    });
  } catch (error) {
    console.error("❌ Error in getSpeciesDictionary UNION:", error);
    return res.status(500).json({ error: "Failed to load species dictionary" });
  }
};

/**
 * GET /species/:id
 * Returns one species + related species
 */
export const getSpeciesDetail = async (req, res) => {
  try {
    const fishId = req.params.id;

    const species = await SpeciesDictionary.findOne({
      where: { fish_id: fishId, status: "published" },
    });

    if (!species) {
      return res.status(404).json({ error: "Species not found" });
    }

    // 👁️ Increment view count
    species.views_count = (species.views_count || 0) + 1;
    await species.save();

    // 🔗 Related species (same family/water type)
    const related_species = await SpeciesDictionary.findAll({
      where: {
        fish_id: { [Op.ne]: fishId },
        status: "published",
        [Op.or]: [
          { family: species.family },
          { water_type: species.water_type },
        ],
      },
      limit: 6,
    });

    return res.status(200).json({
      species,
      related_species,
    });
  } catch (error) {
    console.error("❌ Error in getSpeciesDetail:", error);
    return res.status(500).json({ error: "Failed to load species details" });
  }
};

/**
 * GET /api/species/search
 * Autocomplete for species (lightweight)
 */
export const apiSpeciesSearch = async (req, res) => {
  try {
    // 🔎 Sanitize and normalize the query
    const query = (req.query.q || "").trim();

    // 🔒 Prevent empty or single-character queries
    if (!query || query.length < 2) {
      return res.status(400).json({
        error: "Search query must be at least 2 characters long.",
        example: "/api/species/search?q=betta"
      });
    }

    // 🐠 Search species in the published dictionary
    const species = await SpeciesDictionary.findAll({
      where: {
        status: "published",
        [Op.or]: [
          { common_name: { [Op.iLike]: `%${query}%` } },
          { scientific_name: { [Op.iLike]: `%${query}%` } },
          { family: { [Op.iLike]: `%${query}%` } },
          { origin: { [Op.iLike]: `%${query}%` } },
        ],
      },
      limit: 10,
      order: [["common_name", "ASC"]],
    });

    // 🧩 Map to clean JSON results
    const results = species.map((s) => ({
      fish_id: s.fish_id,
      common_name: s.common_name,
      scientific_name: s.scientific_name,
      primary_image: s.primary_image || "",
      family: s.family || "",
      origin: s.origin || "",
      water_type: s.water_type || "",
      care_level: s.care_level || "",
    }));

    // ✅ Respond
    return res.status(200).json({
      query,
      count: results.length,
      results,
    });
  } catch (error) {
    console.error("❌ Error in apiSpeciesSearch:", error);
    return res.status(500).json({
      error: "Internal server error while performing search.",
    });
  }
};

/**
 * GET /api/species/suggestions
 * Richer suggestions for search dropdown
 */
export const apiSpeciesSuggestions = async (req, res) => {
  try {
    const query = (req.query.q || "").trim();
    if (!query || query.length < 2) {
      return res.status(400).json({
        error: "Search query must be at least 2 characters long.",
      });
    }

    const likeQuery = `%${query}%`;

    const species = await SpeciesDictionary.findAll({
      where: {
        status: "published",
        [Op.or]: [
          { common_name: { [Op.iLike]: likeQuery } },
          { scientific_name: { [Op.iLike]: likeQuery } },
          { family: { [Op.iLike]: likeQuery } },
          { origin: { [Op.iLike]: likeQuery } },
          { description: { [Op.iLike]: likeQuery } },
          { diet_info: { [Op.iLike]: likeQuery } },
          { compatibility_notes: { [Op.iLike]: likeQuery } },
          { breeding_notes: { [Op.iLike]: likeQuery } },
        ],
      },
      limit: 8,
      order: [["common_name", "ASC"]],
    });

    const suggestions = species.map((s) => ({
      fish_id: s.fish_id,
      common_name: s.common_name,
      scientific_name: s.scientific_name,
      description: s.description || "",
      primary_image: s.primary_image || "",
      water_type: s.water_type || "",
      care_level: s.care_level || "",
      family: s.family || "",
      origin: s.origin || "",
      temperament: s.temperament || "",
      diet_type: s.diet_type || "",
      max_size_cm: s.max_size_cm ? parseFloat(s.max_size_cm) : null,
      min_tank_size_liters: s.min_tank_size_liters,
      min_temp: s.min_temp,
      max_temp: s.max_temp,
      min_ph: s.min_ph,
      max_ph: s.max_ph,
      lifespan_years: s.lifespan_years,
    }));

    return res.status(200).json({
      query,
      count: suggestions.length,
      suggestions,
    });
  } catch (error) {
    console.error("❌ Error in apiSpeciesSuggestions:", error);
    return res.status(500).json({ error: error?.message || error });
  }
};

/**
 * GET /species/compatibility-options
 * Returns a lightweight list of species fields used by the compatibility tool
 */
export const getSpeciesCompatibilityOptions = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 200, 500);

    const species = await SpeciesDictionary.findAll({
      where: { status: "published" },
      attributes: [
        "fish_id",
        "common_name",
        "family",
        "temperament",
        "min_temp",
        "max_temp",
        "min_ph",
        "max_ph",
        "compatibility_notes",
      ],
      order: [["common_name", "ASC"]],
      limit,
    });

    return res.status(200).json(species);
  } catch (error) {
    console.error("❌ Error in getSpeciesCompatibilityOptions:", error);
    return res.status(500).json({ error: "Failed to load compatibility options" });
  }
};

/**
 * GET /api/species/compatibility-options
 * Fetch species data optimized for compatibility matrix tool
 */
export const getCompatibilityOptions = async (req, res) => {
  try {
    const species = await SpeciesDictionary.findAll({
      where: {
        status: "published",
      },
      attributes: [
        "fish_id",
        "common_name",
        "temperament",
        "min_temp",
        "max_temp",
        "min_ph",
        "max_ph",
        "family",
        "water_type",
        "compatibility_notes"
      ],
      order: [["common_name", "ASC"]],
      limit: 100, 
    });

    return res.status(200).json(species);
  } catch (error) {
    console.error("❌ Error in getCompatibilityOptions:", error);
    return res.status(500).json({ error: "Failed to load compatibility data" });
  }
};
