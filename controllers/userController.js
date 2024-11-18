// controllers/userController.js
const connectToDatabase = require("../db/connection");
const config = require("../Config/config.json");

const schema = config.schema;

// Fetch all users
async function getUsers(req, res) {
  try {
    const connection = await connectToDatabase();
    const query = `SELECT * FROM ${schema}.Users`;
    const statement = await connection.prepare(query);
    const users = await statement.exec();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
}

// Add a new user
async function addUser(req, res) {
  const { id, name, age, city } = req.body;
  try {
    const connection = await connectToDatabase();
    const query = `INSERT INTO ${schema}.Users (ID, Name, Age, City) VALUES (?, ?, ?, ?)`;
    const statement = await connection.prepare(query);
    await statement.exec([id, name, age, city]);
    res.status(201).send("User added successfully");
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("Error adding user");
  }
}

module.exports = { getUsers, addUser };
