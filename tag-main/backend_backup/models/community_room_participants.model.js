import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/db.js";

class CommunityRoomParticipants extends Model {}

CommunityRoomParticipants.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        room_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: "CommunityRoomParticipants",
        tableName: "CommunityRoomParticipants",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        indexes: [
            {
                unique: true,
                fields: ['room_id', 'user_id']
            }
        ]
    }
);

export default CommunityRoomParticipants;
