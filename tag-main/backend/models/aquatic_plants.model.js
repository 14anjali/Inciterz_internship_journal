import { DataTypes } from "sequelize";
import sequelize from "../lib/db.js";

const AquaticPlants = sequelize.define("AquaticPlants", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  scientific_name: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
  },
  genus: DataTypes.STRING(100),
  specific_epithet: DataTypes.STRING(100),
  infraspecific_epithet: DataTypes.STRING(100),
  taxonomic_rank: {
    type: DataTypes.STRING(32),
    defaultValue: "species",
  },
  identification_qualifier: DataTypes.STRING(32),
  common_name: DataTypes.STRING(255),
  family: DataTypes.STRING(100),
  origin: DataTypes.STRING(100),
  kingdom: {
    type: DataTypes.STRING(64),
    defaultValue: "Plantae",
  },
  phylum: DataTypes.STRING(64),
  class: DataTypes.STRING(64),
  order: DataTypes.STRING(64),
  organism_group: {
    type: DataTypes.STRING(64),
    defaultValue: "Macrophytes",
  },
  water_type: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  placement: {
    type: DataTypes.STRING(32),
    defaultValue: "midground",
  },
  difficulty: {
    type: DataTypes.STRING(32),
    defaultValue: "easy",
  },
  growth_rate: {
    type: DataTypes.STRING(32),
    defaultValue: "medium",
  },
  temp_min_celsius: DataTypes.DECIMAL(4, 1),
  temp_max_celsius: DataTypes.DECIMAL(4, 1),
  ph_min: DataTypes.DECIMAL(3, 1),
  ph_max: DataTypes.DECIMAL(3, 1),
  gh_min: DataTypes.INTEGER,
  gh_max: DataTypes.INTEGER,
  kh_min: DataTypes.INTEGER,
  kh_max: DataTypes.INTEGER,
  salinity_ppt_min: DataTypes.DECIMAL(4, 1),
  salinity_ppt_max: DataTypes.DECIMAL(4, 1),
  nitrate_max_mg_l: DataTypes.INTEGER,
  lighting: {
    type: DataTypes.STRING(32),
    defaultValue: "medium",
  },
  co2_required: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  co2_optimal_ppm: DataTypes.INTEGER,
  substrate_type: DataTypes.STRING(64),
  propogation_method: DataTypes.TEXT,
  max_height_cm: DataTypes.INTEGER,
  is_true_aquatic: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  native_status: {
    type: DataTypes.STRING(64),
    defaultValue: "native",
  },
  deficiency_indicators: DataTypes.JSONB,
  description: DataTypes.TEXT,
  primary_image: DataTypes.STRING(500),
  status: {
    type: DataTypes.STRING(32),
    defaultValue: "draft",
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default AquaticPlants;
