const Order = require("../models/orderSchema");
const razorpay = require("razorpay");
const Project = require("../models/projectSchema");
const Razorpay = require("razorpay");
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

const placeOrderController = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const userId = req.userId;
    console.log(projectId, userId);
    const project = await Project.findById(projectId);
    const amount  = project.price;
    console.log(amount)

    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZOR_KEY,
      key_secret: process.env.RAZOR_SECRET_KEY,
    })

const options = {
  amount: amount * 100,
  currency: "INR",
  receipt: "#1"
}

const response = await razorpayInstance.orders.create(options);
res.status(200).json(response);
console.log(response);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllOrderByIdController,
  placeOrderController,
};
