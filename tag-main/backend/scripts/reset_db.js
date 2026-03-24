import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Load env vars immediately
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('Environment loaded from:', path.join(__dirname, '../.env'));

// 2. Dynamic import of db.js
// We need to use dynamic import because standard static imports are hoisted
// and evaluated before this code runs.
const { default: sequelize } = await import('../lib/db.js');

const resetDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('🔌 Connected to database.');

    // Get all table names from the public schema
    // Exclude SequelizeMeta to preserve migration history if it exists
    const [results] = await sequelize.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public' 
        AND tablename != 'SequelizeMeta';
    `);

    if (results.length === 0) {
      console.log('⚠️ No tables found to clean.');
      process.exit(0);
    }

    // Wrap table names in double quotes to handle case sensitivity and reserved keywords
    const tables = results.map(r => `"${r.tablename}"`).join(', ');

    console.log(`🧹 Found ${results.length} tables to clean.`);
    
    // TRUNCATE all tables:
    // - RESTART IDENTITY: Resets auto-increment sequences (id = 1)
    // - CASCADE: Automatically truncates tables that have foreign-key references to any of the named tables
    console.log('🗑️  Truncating tables and resetting counters...');
    
    await sequelize.query(`TRUNCATE TABLE ${tables} RESTART IDENTITY CASCADE;`);

    console.log('✅ Database cleaned successfully! All data removed and counters reset.');
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
};

resetDb();
