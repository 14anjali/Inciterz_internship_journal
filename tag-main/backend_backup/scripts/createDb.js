import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pg;

const config = {
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: "postgres", // Connect to default DB to create new one
};

const createDb = async () => {
  const client = new Client(config);
  try {
    await client.connect();
    console.log("Connected to postgres database.");
    
    const dbName = process.env.DATABASE_NAME;
    // Check if database exists
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database ${dbName} created successfully.`);
    } else {
      console.log(`Database ${dbName} already exists.`);
    }
  } catch (error) {
    console.error("Error creating database:", error);
  } finally {
    await client.end();
  }
  
  // After DB creation check, run the sync script to ensure tables exist
  console.log("Syncing tables...");
  try {
      // Dynamic import to execute the sync script
      await import("./syncAll.js");
  } catch (syncError) {
      console.error("Error syncing tables:", syncError);
  }
};

createDb();
