import sequelize from "../lib/db.js";

const cleanupIndexes = async () => {
  try {
    await sequelize.authenticate();
    console.log('🔌 Connected to database.');

    const queryInterface = sequelize.getQueryInterface();
    const tableName = 'Users';

    // Get all indexes for the Users table
    const [indexes] = await sequelize.query(`
      SELECT indexname 
      FROM pg_indexes 
      WHERE tablename = '${tableName}' 
      AND indexname LIKE 'Users_%_key%'
      AND indexname NOT IN ('Users_pkey', 'Users_email_key', 'Users_userid_key');
    `);

    if (indexes.length === 0) {
      console.log('✅ No duplicate indexes found.');
      return;
    }

    console.log(`🗑️  Found ${indexes.length} duplicate indexes. Removing them...`);

    for (const index of indexes) {
      console.log(`Dropping constraint: ${index.indexname}`);
      try {
        await sequelize.query(`ALTER TABLE "${tableName}" DROP CONSTRAINT "${index.indexname}";`);
      } catch (err) {
        // If constraint drop fails (e.g. it's just an index not a constraint), try dropping index
        console.log(`Constraint drop failed, trying index drop for: ${index.indexname}`);
        await queryInterface.removeIndex(tableName, index.indexname);
      }
    }

    console.log('✅ Duplicate indexes removed successfully!');
  } catch (error) {
    console.error('❌ Error cleaning up indexes:', error);
  } finally {
    await sequelize.close();
  }
};

cleanupIndexes();