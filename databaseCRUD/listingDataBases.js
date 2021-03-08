// Listing databases from MongoDB ATLAS
const listingDataBases = async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

// to use, example: "await listingDataBases(client);"

module.exports = {
  listingDataBases
};