const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://invent60:TBvi67lc9XcLHTLk@pangcu.zwnvo.mongodb.net/Users?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("Users").collection("Users");
    console.log(collection)
  // perform actions on the collection object
  client.close();
});