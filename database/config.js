const mongoose = require('mongoose');

/**
 * Creates the connection to the DB.
 */
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS);
    console.log('DB Online.');
  } catch (error) {
    console.log(error);

    throw new Error('Error on DB.');
  }
}

module.exports = { dbConnection };
