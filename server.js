// index.js
const express = require("express");
const morgan = require("morgan");

const userRoutes = require("./routes/userRoutes");
const { initializeUserTable } = require("./Models/User");

const orderRoute = require("./routes/orderRoute");
const { initializeOrderTable } = require("./Models/Orders");

const app = express();
const port = 3030;

app.use(express.json());
app.use(morgan(":method :url :status - :response-time ms"));

// Initialize the Users table if needed
initializeUserTable()
  .then(() => console.log("Users table initialization completed"))
  .catch((error) => console.error("Error initializing Users table:", error));

initializeOrderTable()
  .then(() => console.log("Orders table initialization completed"))
  .catch((error) => console.error("Error initializing Orders table:", error));

// Use the routes
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
