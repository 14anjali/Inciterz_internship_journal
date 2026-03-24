import AquaticPlants from "../models/aquatic_plants.model.js";
import { Op } from "sequelize";
import { broadcastStats, broadcastContentStats } from "../lib/statsBroadcaster.js";

/**
 * Add a new Aquatic Plant
 */
export const addPlant = async (req, res) => {
  try {
    const plant = await AquaticPlants.create({
      scientific_name: req.body.scientific_name,
      genus: req.body.genus,
      specific_epithet: req.body.specific_epithet,
      infraspecific_epithet: req.body.infraspecific_epithet,
      taxonomic_rank: req.body.taxonomic_rank,
      identification_qualifier: req.body.identification_qualifier,
      common_name: req.body.common_name,
      water_type: req.body.water_type || "freshwater",
      family: req.body.family,
      origin: req.body.origin,
      kingdom: req.body.kingdom,
      phylum: req.body.phylum,
      class: req.body.class,
      order: req.body.order,
      organism_group: req.body.organism_group,
      placement: req.body.placement,
      difficulty: req.body.care_level, // Mapping frontend 'care_level' to DB 'difficulty'
      growth_rate: req.body.growth_rate,
      temp_min_celsius: req.body.min_temp,
      temp_max_celsius: req.body.max_temp,
      ph_min: req.body.min_ph,
      ph_max: req.body.max_ph,
      gh_min: req.body.min_hardness,
      gh_max: req.body.max_hardness,
      kh_min: req.body.kh_min,
      kh_max: req.body.kh_max,
      salinity_ppt_min: req.body.salinity_ppt_min,
      salinity_ppt_max: req.body.salinity_ppt_max,
      nitrate_max_mg_l: req.body.nitrate_max_mg_l,
      lighting: req.body.lighting,
      co2_required: req.body.co2_required,
      co2_optimal_ppm: req.body.co2_optimal_ppm,
      substrate_type: req.body.substrate_type,
      propogation_method: req.body.propogation_method,
      max_height_cm: req.body.max_height_cm,
      is_true_aquatic: req.body.is_true_aquatic,
      native_status: req.body.native_status,
      deficiency_indicators: req.body.deficiency_indicators,
      description: req.body.description,
      primary_image: req.body.primary_image,
      status: req.body.status || 'draft'
    });

    return res.status(201).json(plant);
  } catch (error) {
    console.error("Error adding plant:", error);
    return res.status(500).json({ error: "Failed to create plant entry" });
  }
};

/**
 * Update an existing Aquatic Plant
 */
export const updatePlant = async (req, res) => {
  try {
    const { id } = req.params;
    const plant = await AquaticPlants.findByPk(id);

    if (!plant) return res.status(404).json({ error: "Plant not found" });

    await plant.update({
      scientific_name: req.body.scientific_name,
      genus: req.body.genus,
      specific_epithet: req.body.specific_epithet,
      infraspecific_epithet: req.body.infraspecific_epithet,
      taxonomic_rank: req.body.taxonomic_rank,
      identification_qualifier: req.body.identification_qualifier,
      common_name: req.body.common_name,
      water_type: req.body.water_type,
      family: req.body.family,
      origin: req.body.origin,
      kingdom: req.body.kingdom,
      phylum: req.body.phylum,
      class: req.body.class,
      order: req.body.order,
      organism_group: req.body.organism_group,
      placement: req.body.placement,
      difficulty: req.body.care_level,
      growth_rate: req.body.growth_rate,
      temp_min_celsius: req.body.min_temp,
      temp_max_celsius: req.body.max_temp,
      ph_min: req.body.min_ph,
      ph_max: req.body.max_ph,
      gh_min: req.body.min_hardness,
      gh_max: req.body.max_hardness,
      kh_min: req.body.kh_min,
      kh_max: req.body.kh_max,
      salinity_ppt_min: req.body.salinity_ppt_min,
      salinity_ppt_max: req.body.salinity_ppt_max,
      nitrate_max_mg_l: req.body.nitrate_max_mg_l,
      lighting: req.body.lighting,
      co2_required: req.body.co2_required,
      co2_optimal_ppm: req.body.co2_optimal_ppm,
      substrate_type: req.body.substrate_type,
      propogation_method: req.body.propogation_method,
      max_height_cm: req.body.max_height_cm,
      is_true_aquatic: req.body.is_true_aquatic,
      native_status: req.body.native_status,
      deficiency_indicators: req.body.deficiency_indicators,
      description: req.body.description,
      primary_image: req.body.primary_image,
      status: req.body.status
    });

    return res.status(200).json(plant);
  } catch (error) {
    console.error("Error updating plant:", error);
    return res.status(500).json({ error: "Failed to update plant" });
  }
};

/**
 * Delete a plant by ID
 */
export const deletePlant = async (req, res) => {
  try {
    const { id } = req.params;

    const plant = await AquaticPlants.findByPk(id);

    if (!plant) {
      return res.status(404).json({ error: "Plant not found" });
    }

    // Perform the deletion
    await plant.destroy();
    await Promise.all([broadcastStats(true), broadcastContentStats()]);
    return res.status(200).json({ 
      message: `Plant "${plant.common_name}" deleted successfully` 
    });
  } catch (error) {
    console.error("❌ Error in deletePlant:", error);
    return res.status(500).json({ error: "Failed to delete plant" });
  }
};
