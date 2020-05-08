let MongoClient = require("mongodb").MongoClient;
let mongoURL = "mongodb://localhost:27017/";
let dbName = "Janki_Patel_lab6";
let connection = undefined;
let db = undefined;

module.exports = async () => {
  if (!connection) {
    connection = await MongoClient.connect(mongoURL);
    db = await connection.db(dbName);

    console.log("DataBAse connected successfully.");
  }
  return db;

};
