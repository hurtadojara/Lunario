// Updating documents
const updateListByName = async function updateListingByName(client, nameOfListing, updatedListing) {
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne(
    {name: nameOfListing},
    {$set: updatedListing}
  );
  console.log(`${result.matchedCount} document(s) matched`);
  console.log(`${result.modifiedCount} document(s) was/were updated`);
};

module.exports = {
  updateListByName
};