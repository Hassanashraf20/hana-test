// routes/userRoutes.js
const express = require("express");
const { getUsers, addUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers); // Route to get all users
router.post("/", addUser); // Route to add a new user

module.exports = router;
