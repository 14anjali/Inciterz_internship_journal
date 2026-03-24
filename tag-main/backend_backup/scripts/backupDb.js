
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

// Detect OS and set appropriate pg_dump path
const isWindows = process.platform === 'win32';
const PG_DUMP_PATH = process.env.PG_DUMP_PATH || (isWindows 
  ? 'C:\\Program Files\\PostgreSQL\\13\\bin\\pg_dump.exe' 
  : 'pg_dump'); // On Linux (Debian), assumes pg_dump is in PATH

// Define backup directory relative to the script:
// scripts is in backend/scripts
// We want to put db_dump in backend/db_dump
// So we go up one level (..) to backend, then into db_dump
const BACKUP_DIR = path.join(__dirname, '../db_dump');

// Create the directory if it doesn't exist
if (!fs.existsSync(BACKUP_DIR)) {
  try {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    console.log(`Created backup directory: ${BACKUP_DIR}`);
  } catch (err) {
    console.error(`Failed to create backup directory: ${err.message}`);
    process.exit(1);
  }
}

const OUTPUT_FILE = path.join(BACKUP_DIR, `backup_${new Date().toISOString().replace(/[:.]/g, '-')}.sql`);

const {
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT
} = process.env;

const command = `"${PG_DUMP_PATH}" -h ${DATABASE_HOST} -p ${DATABASE_PORT} -U ${DATABASE_USERNAME} -F p -b -v -f "${OUTPUT_FILE}" ${DATABASE_NAME}`;

console.log('Starting database backup...');
console.log(`Platform: ${process.platform}`);
console.log(`Using pg_dump at: ${PG_DUMP_PATH}`);
console.log(`Target database: ${DATABASE_NAME}`);
console.log(`Output file: ${OUTPUT_FILE}`);

// Set password env var for pg_dump
process.env.PGPASSWORD = DATABASE_PASSWORD;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Backup failed: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`pg_dump output: ${stderr}`);
  }
  console.log(`Backup completed successfully! File saved to: ${OUTPUT_FILE}`);
});
