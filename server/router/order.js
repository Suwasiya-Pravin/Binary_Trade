const express = require("express");
const { getAllOrderByIdController } = require("../controllers/OrderController");
const Authenticate = require("../middleware/authenticate");
const router = express.Router();

const {
  getAllOrderByIdController,
  placeOrderController,
} = require("../controllers/OrderController");


//localhost:4000/api/v1/order/get-order

// ROUTE Get all Order by id
router.get('/get-order',Authenticate,getAllOrderByIdController);

// ROUTE  place Order
router.get('/place-order/:projectId',Authenticate,placeOrderController);


