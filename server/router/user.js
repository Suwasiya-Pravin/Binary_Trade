const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  registerController,
  loginController,
  userDataController,
  getUserProjectController,
  updateUserController,
  changePasswordController,
  addFavoritesController,
  getAllFavoritesController,
  deleteFavoriteController,
  devloperRegisterController,
  getAllUserController,
  getAllDeveloperController,
  getAllBuyerController
} = require("../controllers/userController");

require("../db/conn"); //connection
const User = require("../models/userSchema"); //userSchema for storing data
const Authenticate = require("../middleware/authenticate");

// Route: User Registration 
router.post("/register", registerController);
// Route: developer Registration 
router.post("/dev-register", devloperRegisterController);
// Route: User Login 
router.post("/login", loginController);
// Route: User Logout 
router.post("/logout", async (req, res) => {
  res.clearCookie("jwtoken");
  res.json("log out succesfully");
});
// Route: Get user details
router.get("/get-user", Authenticate, userDataController);
// Route: Get all User Projects details
router.get("/projects", Authenticate, getUserProjectController);
// Route: Update user details
router.put("/update-user", Authenticate, updateUserController);
// Route: Update Password
router.put('/change-password',Authenticate,changePasswordController)
// Route: Add Favorite Project 
router.post('/add-favorite',Authenticate,addFavoritesController);
// Route: Get all Favorite Projects 
router.get('/all-favorites',Authenticate,getAllFavoritesController);
// Route: Delete Favorite Project 
router.delete('/delete-favorite',Authenticate,deleteFavoriteController);
//Route : Get all users
router.get('/get-all',Authenticate,getAllUserController);
router.get('/get-developers',Authenticate,getAllDeveloperController);
router.get('/get-buyers',Authenticate,getAllBuyerController);
module.exports = router;
