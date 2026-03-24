
import { Sequelize } from 'sequelize';

// Hardcoded from .env to avoid issues
const DB_NAME = 'admin_aquaguide_db';
const DB_USER = 'admin_aquaguide_db_user';
const DB_PASS = 'Aquaguidep1';
const DB_HOST = 'localhost';

async function debugImages() {
    const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
        host: DB_HOST,
        dialect: 'postgres',
        logging: false
    });

    try {
        await sequelize.authenticate();
        console.log('DB Connection successful.');

        const [results] = await sequelize.query('SELECT fish_id, common_name, primary_image FROM "SpeciesDictionary" ORDER BY created_at DESC LIMIT 5;');
        
        console.log(`Found ${results.length} species.`);
        results.forEach(row => {
            console.log('---');
            console.log(`Name: ${row.common_name}`);
            console.log(`Image URL: ${row.primary_image}`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

debugImages();
