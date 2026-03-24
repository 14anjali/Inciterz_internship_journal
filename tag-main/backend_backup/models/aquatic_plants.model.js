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
  common_name: DataTypes.STRING(255),
  family: DataTypes.STRING(100),
  origin: DataTypes.STRING(100),
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
  lighting: {
    type: DataTypes.STRING(32),
    defaultValue: "medium",
  },
  co2_required: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  propogation_method: DataTypes.TEXT,
  max_height_cm: DataTypes.INTEGER,
  is_true_aquatic: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  description: DataTypes.TEXT,
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default AquaticPlants;
