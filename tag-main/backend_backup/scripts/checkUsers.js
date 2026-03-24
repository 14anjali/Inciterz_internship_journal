import sequelize from "../lib/db.js";
import User from "../models/user.model.js";

const checkUsers = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database.");
    
    const count = await User.count();
    console.log(`Total users: ${count}`);
    
    if (count > 0) {
      const users = await User.findAll({ limit: 5, attributes: ['email', 'role'] });
      console.log("Sample users:", JSON.stringify(users, null, 2));
    }
  } catch (error) {
    console.error("Error checking users:", error);
  } finally {
    await sequelize.close();
  }
};

checkUsers();
