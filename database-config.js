const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const { MongoClient } = require('mongodb');
const { finderOneByName } = require('./databaseCRUD/findOneByName');
const { listingDataBases } = require('./databaseCRUD/listingDataBases');
const { createOneList } = require('./databaseCRUD/createListing');
const { updateListByName } = require('./databaseCRUD/updateDocuments');

// Configuration of mongodb service via mongoose
const client = new MongoClient(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true});
const dbConnection = async() => {
  try {
    await client.connect();
    await mongoose.connect(process.env.DB_CONNECTION, {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Db connected');

    //await finderOneByName(client, "Private Room in Bushwick");
    //await updateListByName(client, "Private Room in Bushwick", {bedrooms: 4, beds: 5});
    //await finderOneByName(client, "Private Room in Bushwick");
  }
  catch(error) {
    console.log(error);
  }
  finally {
    await client.close();
  }
};

module.exports = {
  dbConnection
};
