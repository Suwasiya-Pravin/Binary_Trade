const express = require("express");
const router = express.Router();

const {
  CreateCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getAllCategoryController
} = require("../controllers/CategoryController");


// end point  /api/v1/category

// Get all 
router.get("/all", getAllCategoryController);

// Create
router.post("/create", CreateCategoryController);

// Read
router.get("/get/:slug", getCategoryController);

// Update
router.patch("/update/:slug", updateCategoryController);

// Delete
router.delete("/delete/:slug", deleteCategoryController);

module.exports = router;
