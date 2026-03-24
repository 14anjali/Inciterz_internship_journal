
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Use the production connection string if available, otherwise local
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/aquaguide_db', {
  logging: false,
});

async function checkConstraints() {
  try {
    await sequelize.authenticate();
    console.log('Connected to database.');

    const [results, metadata] = await sequelize.query(`
      SELECT conname, pg_get_constraintdef(oid)
      FROM pg_constraint
      WHERE conrelid = 'public."SpeciesDictionary"'::regclass
      AND conname LIKE '%swimming_level%';
    `);

    console.log('Constraints on SpeciesDictionary related to swimming_level:');
    console.log(results);

    // Also check the column definition
    const [columns, meta] = await sequelize.query(`
        SELECT column_name, data_type, udt_name
        FROM information_schema.columns
        WHERE table_name = 'SpeciesDictionary' AND column_name = 'swimming_level';
    `);
    console.log('Column definition:');
    console.log(columns);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

checkConstraints();
