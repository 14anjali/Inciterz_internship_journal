import dotenv from 'dotenv';
dotenv.config();

import sequelize from '../lib/db.js';
import User from '../models/user.model.js';
import Video from '../models/video.model.js';
import TextGuide from '../models/text.model.js';
import SpeciesDictionary from '../models/speciesDictionary.model.js';
import setupAssociations from '../models/associations.js';

console.log('Starting count check...');

const checkCounts = async () => {
  try {
    setupAssociations();
    await sequelize.authenticate();
    console.log('Database connected.');

    const userCount = await User.count();
    const videoCount = await Video.count();
    const textGuideCount = await TextGuide.count();
    const speciesCount = await SpeciesDictionary.count();

    console.log('--- Database Counts ---');
    console.log(`Users: ${userCount}`);
    console.log(`Video Guides: ${videoCount}`);
    console.log(`Text Guides: ${textGuideCount}`);
    console.log(`Species Info: ${speciesCount}`);
    console.log('-----------------------');

    process.exit(0);
  } catch (error) {
    console.error('Error checking counts:', error);
    process.exit(1);
  }
};

checkCounts();
