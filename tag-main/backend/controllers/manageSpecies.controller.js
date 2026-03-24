import SpeciesDictionary from "../models/speciesDictionary.model.js";
import AquaticPlants from "../models/aquatic_plants.model.js";
import { Op, where, fn, col } from "sequelize";
import User from "../models/user.model.js";
import sequelize from "../lib/db.js";
import { broadcastStats, broadcastContentStats } from "../lib/statsBroadcaster.js";

/**
 * POST /admin/species-management/new
 */
export const addSpecies = async (req, res) => {
  try {
    const { common_name, scientific_name } = req.body;

    const existing = await SpeciesDictionary.findOne({
      where: {
        [Op.and]: [
          { common_name: { [Op.iLike]: common_name.trim() } },
          { scientific_name: { [Op.iLike]: scientific_name.trim() } },
        ],
      },
    });

    if (existing) {
      return res.status(400).json({
        error: "Species already exists in the dictionary",
        existing: {
          fish_id: existing.fish_id,
          common_name: existing.common_name,
          scientific_name: existing.scientific_name,
        },
      });
    }

    const newSpecies = await SpeciesDictionary.create({
      ...req.body,
      created_by: req.user?.id || null,
      status: req.body.status || "published",
    });

    await Promise.all([broadcastStats(true), broadcastContentStats()]);

    return res.status(201).json({
      message: "Species added successfully",
      fish_id: newSpecies.fish_id,
      common_name: newSpecies.common_name,
      scientific_name: newSpecies.scientific_name,
    });
  } catch (error) {
    console.error("Error adding species:", error);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * PUT /admin/species-management/:fish_id
 */
export const editSpecies = async (req, res) => {
  try {
    const { fish_id } = req.params;
    const species = await SpeciesDictionary.findByPk(fish_id);

    if (!species) return res.status(404).json({ error: "Species not found" });

    await species.update(req.body);
    await Promise.all([broadcastStats(true), broadcastContentStats()]);

    return res.status(200).json({
      message: "Species updated successfully",
      species,
    });
  } catch (error) {
    console.error("Error updating species:", error);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * DELETE /admin/species-management/:fish_id
 */
export const deleteSpecies = async (req, res) => {
  try {
    const { fish_id } = req.params;
    const species = await SpeciesDictionary.findByPk(fish_id);

    if (!species) return res.status(404).json({ error: "Species not found" });

    await species.destroy();
    await Promise.all([broadcastStats(true), broadcastContentStats()]);

    return res.status(204).json({ message: "Species deleted successfully" });
  } catch (error) {
    console.error("Error deleting species:", error);
    return res.status(500).json({ error: "Failed to delete species" });
  }
};

/**
 * Updated GET /admin/species-management using UNION ALL
 */
export const getSpeciesManagement = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 20;
    const offset = (page - 1) * perPage;

    const query = `
      SELECT fish_id::text as id, common_name, scientific_name, family, water_type, care_level, status, created_at, 'fish' as category 
      FROM "SpeciesDictionary"
      UNION ALL
      SELECT id::text as id, common_name, scientific_name, family, 'freshwater' as water_type, difficulty as care_level, status, created_at, 'aquaticplants' as category 
      FROM "AquaticPlants"
      ORDER BY created_at DESC
      LIMIT :limit OFFSET :offset
    `;

    const countQuery = `
      SELECT COUNT(*) FROM (
        SELECT created_at FROM "SpeciesDictionary"
        UNION ALL
        SELECT created_at FROM "AquaticPlants"
      ) as total
    `;

    const [species, countResult] = await Promise.all([
      sequelize.query(query, { replacements: { limit: perPage, offset }, type: sequelize.QueryTypes.SELECT }),
      sequelize.query(countQuery, { type: sequelize.QueryTypes.SELECT })
    ]);

    const total = parseInt(countResult[0].count);

    return res.status(200).json({
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
      species,
    });
  } catch (error) {
    console.error("Error fetching species management:", error);
    return res.status(500).json({ error: "Failed to fetch management data" });
  }
};

/**
 * Updated search using UNION ALL logic
 */
export const searchSpeciesManagement = async (req, res) => {
  try {
    const { q = "", status, type, page = 1, limit = 20, category } = req.query;
    const perPage = parseInt(limit);
    const currentPage = parseInt(page);
    const offset = (currentPage - 1) * perPage;

    const fishPart = `
      SELECT 
        fish_id::text as id, common_name, scientific_name, family, origin, description,
        primary_image, water_type::text as water_type, care_level::text as care_level, 
        max_size_cm::numeric as max_size_cm, status::text as status, created_at, 'fish' as category,
        min_temp, max_temp, min_ph, max_ph, min_hardness, max_hardness, diet_type::text, diet_info,
        min_tank_size_liters, temperament::text, compatibility_notes, breeding_difficulty::text,
        breeding_notes, is_fin_nipper, has_delicate_fins, swimming_level, min_group_size,
        eats_invertebrates, lifespan_years, social_needs, filtration_requirement, varieties,
        bioload, recommended_substrate, plant_safety, breeding_triggers, spawning_process,
        fry_development, tank_mates, common_myths, common_diseases, gallery_images,
        NULL as genus, NULL as specific_epithet, NULL as infraspecific_epithet, NULL as taxonomic_rank, NULL as identification_qualifier,
        NULL as kingdom, NULL as phylum, NULL as class, NULL as "order", NULL as organism_group,
        NULL as kh_min, NULL as kh_max, NULL as salinity_ppt_min, NULL as salinity_ppt_max,
        NULL as nitrate_max_mg_l, NULL as co2_optimal_ppm, NULL as substrate_type,
        NULL as native_status, NULL as deficiency_indicators
      FROM "SpeciesDictionary"
      WHERE 1=1
      ${status ? "AND status = :status" : ""}
      ${type ? "AND water_type = :type" : ""}
      ${q ? "AND (common_name ILIKE :search OR scientific_name ILIKE :search)" : ""}
    `;

    const plantPart = `
      SELECT 
        id::text as id, common_name, scientific_name, family, origin, description,
        primary_image, water_type::text as water_type, difficulty as care_level, 
        max_height_cm::numeric as max_size_cm, status as status, created_at, 'aquaticplants' as category,
        temp_min_celsius as min_temp, temp_max_celsius as max_temp, ph_min as min_ph, ph_max as max_ph, 
        gh_min as min_hardness, gh_max as max_hardness, NULL as diet_type, NULL as diet_info,
        NULL as min_tank_size_liters, NULL as temperament, NULL as compatibility_notes, NULL as breeding_difficulty,
        NULL as breeding_notes, false as is_fin_nipper, false as has_delicate_fins, NULL as swimming_level, 1 as min_group_size,
        false as eats_invertebrates, NULL as lifespan_years, NULL as social_needs, NULL as filtration_requirement, NULL as varieties,
        NULL as bioload, NULL as recommended_substrate, NULL as plant_safety, NULL as breeding_triggers, NULL as spawning_process,
        NULL as fry_development, NULL as tank_mates, NULL as common_myths, NULL as common_diseases, NULL as gallery_images,
        genus, specific_epithet, infraspecific_epithet, taxonomic_rank, identification_qualifier,
        kingdom, phylum, class, "order", organism_group,
        kh_min, kh_max, salinity_ppt_min, salinity_ppt_max,
        nitrate_max_mg_l, co2_optimal_ppm, substrate_type,
        native_status, deficiency_indicators
      FROM "AquaticPlants"
      WHERE 1=1
      ${status ? "AND status = :status" : ""}
      ${type ? "AND water_type = :type" : ""}
      ${q ? "AND (common_name ILIKE :search OR scientific_name ILIKE :search)" : ""}
    `;
    let finalQuery = "";
    if (category === 'fish') {
      finalQuery = fishPart;
    } else if (category === 'aquaticplants' || category === 'macroalgae') {
      finalQuery = plantPart;
    } else {
      // Wrap parts in parentheses for valid SQL UNION syntax
      finalQuery = `(${fishPart}) UNION ALL (${plantPart})`;
    }

    const [species, countResult, totalDictionary] = await Promise.all([
      sequelize.query(`${finalQuery} ORDER BY created_at DESC LIMIT :limit OFFSET :offset`, {
        replacements: { search: `%${q}%`, status, type, limit: perPage, offset },
        type: sequelize.QueryTypes.SELECT
      }),
      sequelize.query(`SELECT COUNT(*) FROM (${finalQuery}) as total`, {
        replacements: { search: `%${q}%`, status, type },
        type: sequelize.QueryTypes.SELECT
      }),
      SpeciesDictionary.count()
    ]);

    const totalFiltered = parseInt(countResult[0].count);

    return res.status(200).json({
      page: currentPage,
      perPage,
      totalSpecies: totalDictionary,
      totalFiltered,
      total: totalFiltered,
      totalPages: Math.ceil(totalFiltered / perPage),
      species,
    });
  } catch (error) {
    console.error("Error searching species management:", error);
    return res.status(500).json({ error: "Failed to search management data" });
  }
};
