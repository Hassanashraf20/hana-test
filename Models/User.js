// models/user.js
const { createTableIfNotExists } = require("../db/dbUtils");

const userTableSchema = `
  ID INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  Name NVARCHAR(50),
  Age INT,
  City NVARCHAR(50)
`;

async function initializeUserTable() {
  await createTableIfNotExists("Users", userTableSchema);
}

module.exports = { initializeUserTable };
