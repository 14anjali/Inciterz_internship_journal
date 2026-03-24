
import sequelize from '../lib/db.js';
import SpeciesDictionary from '../models/speciesDictionary.model.js';

async function checkLatestSpecies() {
  try {
    await sequelize.authenticate();
    console.log('Connected.');

    const species = await SpeciesDictionary.findOne({
      order: [['created_at', 'DESC']],
    });

    if (species) {
      console.log('Latest Species:');
      console.log('ID:', species.fish_id);
      console.log('Common Name:', species.common_name);
      console.log('Image URL:', species.primary_image);
    } else {
      console.log('No species found.');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

checkLatestSpecies();
