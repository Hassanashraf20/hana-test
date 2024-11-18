const express = require("express");
const { getOrders, createOrder } = require("../controllers/orderController");

const router = express.Router();

router.get("/", getOrders); // Route to get all orders
router.post("/", createOrder); // Route to add a new order

module.exports = router;
