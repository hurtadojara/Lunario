// Reading documents
const finderOneByName = async function findOneListByName(client, nameOfListing) {
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing});
  if (result) {
    console.log(`Founded a listing ${nameOfListing}: `);
    console.log(result);
  } else {
    console.log(`No listing found with the name ${nameOfListing}`);
  }
};

// to be called example: "await finderOneByName(client, "Ribeira Charming Duplex");"

module.exports = {
  finderOneByName
};