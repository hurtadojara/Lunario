var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function insertMe() {
    MongoClient.connect(DB_CONNECTION, function (err, db) {
        if (err)
            throw err;
        var dbo = db.db("StorageServiceLunario");
        var myobj = { name: "Company Inc", address: "Highway 37" };
        dbo.collection("Users").insertOne(myobj, function (err, res) {
            if (err)
                throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
}
module.exports = {
    insertMe
}
