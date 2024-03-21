const express = require("express");
const Authenticate = require("../middleware/authenticate");
const router = express.Router();

const {
  getAllOrderByIdController,
  placeOrderController,
  verifyPaymentController,
} = require("../controllers/OrderController");

//localhost:4000/api/v1/order/get-order

// ROUTE Get all Order by id
router.get("/get-order", Authenticate, getAllOrderByIdController);

// ROUTE  place Order
router.get("/place-order/:projectId", Authenticate, placeOrderController);

// Route verifyPayment
router.post("/verify-payment", Authenticate, verifyPaymentController);

module.exports = router;
