import { DataTypes } from "sequelize";
import sequelize from "../lib/db.js";

const AdminLog = sequelize.define("AdminLog", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  admin_id: {
    type: DataTypes.STRING, // Using STRING to match User.id type (UUID usually stored as string)
    allowNull: true,
  },
  admin_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING, // "SUCCESS" or "FAILED"
    allowNull: false,
  },
  details: {
    type: DataTypes.JSONB, // Store API response or error details
    allowNull: true,
  },
  ip_address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['admin_email'],
    },
    {
      fields: ['createdAt'],
    },
  ],
});

export default AdminLog;
