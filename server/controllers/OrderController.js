const Order = require("../models/orderSchema");
const razorpay = require("razorpay");
const Project = require("../models/projectSchema");
const Razorpay = require("razorpay");
const crypto = require("crypto");
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
    const amount = project.price;
    console.log(amount);

    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZOR_KEY,
      key_secret: process.env.RAZOR_SECRET_KEY,
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "#1",
    };

    const response = await razorpayInstance.orders.create(options);

    const orderPlaced = await Order.create({
      user: userId,
      project: projectId,
      amount: project.price,
      orderId: response.id,
    });
    if (!orderPlaced) {
      throw new Error("Order could not be placed");
    }
    res.status(200).json(response);
    console.log(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyPaymentController = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const dataToGenerateSignature = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZOR_SECRET_KEY)
    .update(dataToGenerateSignature)
    .digest("hex");

  const isSignatureValid = expectedSignature === razorpay_signature;
  if (isSignatureValid) {
    const paymentVerified = await Order.findOne({
      orderId: razorpay_order_id,
    });

    paymentVerified.status = "completed";
    await paymentVerified.save();
    console.log(paymentVerified);

    res.status(201).json("Purchase successful !");
  }
};

module.exports = {
  getAllOrderByIdController,
  placeOrderController,
  verifyPaymentController,
};
