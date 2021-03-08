// Create a single list
const createOneList = async function createListing(client, newListing) {
  const create = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
  console.log(`New listing created with the following id: ${create.insertedId}`);
};

/* await createOneList(
  client,
  {
    name: "Juan",
    lastName: "Uribe",
    email: "1996@holbertonschool.com"
  }
); */

module.exports = {
  createOneList
}