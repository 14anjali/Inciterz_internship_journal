import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/db.js";

class GuestConversion extends Model {}

GuestConversion.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    guest_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    converted_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "GuestConversion",
    timestamps: true,
  }
);

export default GuestConversion;

