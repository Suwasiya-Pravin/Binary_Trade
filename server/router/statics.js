const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const Project = require("./models/project");
const Order = require("./models/order");
const auth = require("./middlewares/auth");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/software-ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(express.json());

// API for admin dashboard
app.get("/admin/dashboard", auth, async (req, res) => {
  try {
    const getRevenue = async () => {
      const orders = await Order.find({ status: "completed" })
        .populate("project", "price")
        .exec();

      const revenue = orders.reduce((total, order) => {
        return total + order.project.price * order.amount;
      }, 0);

      return revenue.toFixed(2);
    };

    const getUsersData = async () => {
      const users = await User.find({}, "userType -_id").exec();
      const usersData = {
        developers: users.filter((user) => user.userType === "developer")
          .length,
        buyers: users.filter((user) => user.userType === "buyer")
          .length,
        admins: users.filter((user) => user.userType === "admin")
          .length,
      };

      return usersData;
    };

    const getProjectsData = async () => {
      const projects = await Project.find({}, "status -_id").exec();
      const projectsData = {
        pending: projects.filter((project) => project.status === "pending")
          .length,
        approved: projects.filter((project) => project.status === "approved")
          .length,
        rejected: projects.filter((project) => project.status === "rejected")
          .length,
      };

      return projectsData;
    };

    const getOrdersData = async () => {
      const orders = await Order.find({}, "status -_id").exec();
      const ordersData = {
        pending: orders.filter((order) => order.status === "pending")
          .length,
        completed: orders.filter((order) => order.status === "completed")
          .length,
      };

      return ordersData;
    };

    const revenue = await getRevenue();
    const usersData = await getUsersData();
    const projectsData = await getProjectsData();
    const ordersData = await getOrdersData();

    res.json({ revenue, usersData, projectsData, ordersData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the app for testing purposes
module.exports = app;