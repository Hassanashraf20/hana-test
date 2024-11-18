// db/dbUtils.js
const connectToDatabase = require("./connection");
const config = require("../Config/config.json");

async function createTableIfNotExists(tableName, tableSchema) {
  const connection = await connectToDatabase();
  const schema = config.schema;

  try {
    const checkTableQuery = `
      SELECT * FROM TABLES WHERE TABLE_NAME = '${tableName}' AND SCHEMA_NAME = '${schema}'
    `;
    const result = await connection.exec(checkTableQuery);

    if (result.length === 0) {
      const createTableQuery = `
        CREATE TABLE ${schema}.${tableName} (${tableSchema})
      `;
      await connection.exec(createTableQuery);
      console.log(`${tableName} table created successfully.`);
    } else {
      console.log(`${tableName} table already exists.`);
    }
  } catch (error) {
    console.error(`Error creating ${tableName} table:`, error);
  }
}

module.exports = { createTableIfNotExists };

// const connectToDatabase = require("./connection");
// const config = require("../Config/config.json");

// async function createTableIfNotExists(tableName, tableSchema) {
//   const connection = await connectToDatabase();
//   const schema = config.schema;

//   try {
//     const createTableQuery = `
//          CREATE TABLE ${schema}.${tableName} (${tableSchema})
//         `;
//     await connection.exec(createTableQuery);
//   } catch (error) {
//     if (error.code === 288) {
//       console.log("this table exist skipp the intialize");
//     } else {
//       console.error(`Error creating ${tableName} table:`, error);
//     }
//   }
// }

// module.exports = { createTableIfNotExists };
