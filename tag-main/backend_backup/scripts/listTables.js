import sequelize from "../lib/db.js";

const listTables = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected.");
    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log("Tables:", tables);
  } catch (error) {
    console.error("Error:", error);
  }
};

listTables();
