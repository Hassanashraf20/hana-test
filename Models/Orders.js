const { createTableIfNotExists } = require("../db/dbUtils");

const orderTableSchema = `
  OrderID INT PRIMARY KEY,
  UserID INT,
  Amount DECIMAL(10, 2),
  OrderDate DATE,
  FOREIGN KEY (UserID) REFERENCES "DBADMIN"."USERS"(ID)
`;

async function initializeOrderTable() {
  await createTableIfNotExists("Orders", orderTableSchema);
}

module.exports = { initializeOrderTable };
