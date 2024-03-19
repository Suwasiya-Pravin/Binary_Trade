const Order = require("../models/orderSchema");
const razorpay = require('razorpay');


const getAllOrderByIdController = async (req, res) => {
  try {
    const id = req.userId;
    const orders = await Order.find({ user: id }).populate("project");
    res.status(200).json({
      success: true,
      msg: "orders get Successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
      data: null,
    });
  }
};

const razorpayInstance = new razorpay({
    key_id: 'YOUR_RAZORPAY_KEY_ID',
    key_secret: 'YOUR_RAZORPAY_KEY_SECRET',
  });
  
const placeOrderController = async (req, res) => {
  try {

    // const id =req.userId;   getting from authentication middleware 
    // const projectId=req.params.projectId;

    const { userId, projectId, amount} = req.body;   //also get from req.body

    // Create a Razorpay order
    const razorpayOrder = await razorpayInstance.orders.create({
      amount: amount * 100, // Convert amount to paise (Razorpay expects amount in paise)
      currency: "INR",
      receipt: "order_receipt",
    });

    // Create a new order in the database
    const newOrder = new Order({
      user: userId,
      project: projectId,
      amount,
      paymentId: razorpayOrder.id,
    });

    await newOrder.save();

    res.status(201).json({
      orderId: razorpayOrder.id,
      orderAmount: razorpayOrder.amount / 100, // Convert amount back to rupees for response
      currency: razorpayOrder.currency,
      receipt: razorpayOrder.receipt,
      razorpayOrderId: razorpayOrder.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllOrderByIdController,
  placeOrderController,
};
