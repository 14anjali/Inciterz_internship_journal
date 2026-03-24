import sequelize from "../lib/db.js";
import Community from "../models/community_chat.model.js";
import User from "../models/user.model.js";

const seedRooms = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database.");

    // Ensure we have a user to be the creator
    const adminUser = await User.findOne();
    if (!adminUser) {
        console.log("No users found. Please run seedUsers.js first.");
        return;
    }

    const count = await Community.count();
    if (count > 0) {
      console.log("Rooms already exist. Skipping seed.");
      return;
    }

    const defaultRooms = [
        { name: "General", description: "General discussion for everyone", is_private: false, created_by: adminUser.id },
        { name: "Beginner's Corner", description: "Help for new hobbyists", is_private: false, created_by: adminUser.id },
        { name: "Planted Tank Enthusiasts", description: "Discuss aquatic plants and aquascaping", is_private: false, created_by: adminUser.id },
        { name: "Saltwater Specialists", description: "Marine and reef tank discussions", is_private: false, created_by: adminUser.id },
        { name: "Breeding & Fry Care", description: "Tips for breeding fish", is_private: false, created_by: adminUser.id },
    ];
    
    await Community.bulkCreate(defaultRooms);
    console.log("Seeded default rooms.");

  } catch (error) {
    console.error("Error seeding rooms:", error);
  } finally {
    await sequelize.close();
  }
};

seedRooms();
