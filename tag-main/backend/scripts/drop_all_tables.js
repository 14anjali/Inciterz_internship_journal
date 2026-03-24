import sequelize from "../lib/db.js";

const dropAllTables = async () => {
  try {
    await sequelize.authenticate();
    console.log('🔌 Connected to database.');

    // Disable foreign key checks to allow dropping tables in any order (for some DBs, but mostly CASCADE handles it in PG)
    
    console.log('🗑️  Dropping all tables...');
    
    // Drop all tables in the database, regardless of model definitions
    await sequelize.getQueryInterface().dropAllTables();

    console.log('✅ All tables dropped successfully! Start the server to recreate them with the correct schema.');
  } catch (error) {
    console.error('❌ Error dropping tables:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
};

dropAllTables();
