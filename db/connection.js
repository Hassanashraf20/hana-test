// db/connection.js
const hana = require("@sap/hana-client");
const config = require("../Config/config.json");

let connection;

async function connectToDatabase() {
  if (!connection) {
    connection = hana.createConnection();
    try {
      await connection.connect(config);
      console.log("Connected to SAP HANA database!");
    } catch (error) {
      console.error("Error connecting to SAP HANA:", error);
      process.exit(1);
    }
  }
  return connection;
}

module.exports = connectToDatabase;
