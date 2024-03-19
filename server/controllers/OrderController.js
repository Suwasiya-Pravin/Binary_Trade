const Order = require("../models/orderSchema");
const razorpay = require("razorpay");

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
    // const id =req.userId;   getting from authentication middleware
    // const projectId=req.params.projectId;

    const { userId, projectId, amount } = req.body; //also get from req.body
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllOrderByIdController,
  placeOrderController,
};
