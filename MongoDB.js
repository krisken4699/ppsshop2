const MongoClient = require('mongodb').MongoClient;
const MONGODBURI = "mongodb+srv://invent60:TBvi67lc9XcLHTLk@pangcu.zwnvo.mongodb.net/Products?retryWrites=true&w=majority";
const client = new MongoClient(MONGODBURI, { useNewUrlParser: true, useUnifiedTopology: true });

async function insertOne(json, database, collectionName) {
  try {
    await client.connect();
    const collection = client.db(database).collection(collectionName);
    const result = await collection.insertOne(json);
    // console.log(result)
    // return (await result.insertedId);
  } catch (err) {
    if (err) return (err);
  } finally {
    await client.close();
  }
}
// insertOne({ name: "Item name 1", id: "bribZNKFb_N", image: "https://i.pinimg.com/originals/c6/5b/80/c65b8092e8dee33aa662feebeea792bf.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum atque dolores, quos veritatis nulla culpa maiores, quaerat voluptatem esse odio quas dolore laborum ratione eos officia aliquam labore, nostrum in?", sellerID: "sellerID 1", price: 0, category: [] }, 'Products', 'Products');

async function find(json, options, database, collectionName) {
  try {
    await client.connect();
    const collection = client.db(database).collection(collectionName);
    const query = json;
    const cursor = collection.find(query, options);
    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      return ("No documents found!");
    }
    // replace console.dir with your callback to access individual elements
    return (await cursor.toArray())
  }
  catch (err) {
    if (err) return (err);
  } finally {
    await client.close();
  }
}

module.exports.find = function (json, database, collectionName) {
  return find(json, database, collectionName);
}
module.exports.insertOne = function (json, database, collectionName) {
  return insertOne(json, database, collectionName);
}


setInterval(() => {
  console.log("test");
}, 120000);
// 120000 = 120 second * 1000ms