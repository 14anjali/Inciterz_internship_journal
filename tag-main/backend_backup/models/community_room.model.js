import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/db.js";

class CommunityRoom extends Model {}

CommunityRoom.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: true, // URL or icon name
        },
        type: {
            type: DataTypes.ENUM("public", "private"),
            defaultValue: "public",
        },
        status: {
            type: DataTypes.ENUM("active", "pending", "rejected"),
            defaultValue: "active", // Admins create active rooms, Users create pending requests
        },
        created_by: {
            type: DataTypes.UUID,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: "CommunityRoom",
        tableName: "CommunityRooms",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default CommunityRoom;
