const connectToDatabase = require("../db/connection");
const config = require("../Config/config.json");

const schema = config.schema;

exports.getOrders = async (req, res) => {
  const connection = await connectToDatabase();
  const query = `SELECT * FROM ${schema}.Orders`;
  const statement = await connection.prepare(query);
  const orders = await statement.exec();

  if (!orders) {
    res.status(404).send("No orders found");
  }

  res.status(200).json(orders);
};
exports.createOrder = async (req, res) => {
  const { OrderID, UserID, Amount } = req.body;

  try {
    const connection = await connectToDatabase();
    const orderDate = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format

    // Step 1: Insert the order
    const insertQuery = `
      INSERT INTO ${schema}.Orders (OrderID, UserID, Amount, OrderDate)
      VALUES (?, ?, ?, ?)
    `;
    const insertStatement = await connection.prepare(insertQuery);
    await insertStatement.exec([OrderID, UserID, Amount, orderDate]);

    // Step 2: Retrieve the inserted order data
    const selectQuery = `
      SELECT * FROM ${schema}.Orders WHERE OrderID = ?
    `;
    const selectStatement = await connection.prepare(selectQuery);
    const [order] = await selectStatement.exec([OrderID]);

    console.log(`Order created for user ${UserID} with amount ${Amount}`);

    res.status(201).json(order); // Send the full order details in response
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
};
