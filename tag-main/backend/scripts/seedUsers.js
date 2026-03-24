import sequelize from "../lib/db.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const seedUsers = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database.");

    // Check if users exist
    const count = await User.count();
    if (count > 0) {
      console.log("Users already exist. Skipping seed.");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const users = [
      {
        userid: "admin",
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        dob: "1990-01-01",
        gender: "rather_not_say",
        terms_accepted: true,
      },
      {
        userid: "user1",
        name: "Test User 1",
        email: "user1@example.com",
        password: hashedPassword,
        role: "user",
        dob: "1995-05-05",
        gender: "male",
        terms_accepted: true,
      },
      {
        userid: "user2",
        name: "Test User 2",
        email: "user2@example.com",
        password: hashedPassword,
        role: "user",
        dob: "1992-02-02",
        gender: "female",
        terms_accepted: true,
      }
    ];

    await User.bulkCreate(users);
    console.log("Seeded 3 users.");

  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await sequelize.close();
  }
};

seedUsers();
