const Category = require("../models/categorySchema");
const slugify = require("slugify");
const CreateCategoryController = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
    });
    const data = await category.save();
    res.status(201).send({
      success: true,
      msg: "create category sucessfully",
      category: data,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      msg: e.message,
      category: null,
    });
  }
};
const getCategoryController = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).send({
        success: false,
      msg: "category does not exist",
      category: null,
      });
    }
    res.send({
      success: true,
      msg: "category get Successfully",
      category: category,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      msg: e.message,
      category: null,
    });
  }
};
const updateCategoryController = async (req, res) => {
  try {
    let category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).send({
        success: false,
        msg: "category already exist",
        category: null,
      });
    }
    category.name = req.body.name;
    category.slug = slugify(req.body.name, { lower: true });
    const data = await category.save();
    res.send({
      success: true,
      msg: "category update successfully",
      category: data,
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      msg: e.message,
      category: null,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      slug: req.params.slug,
    });
    if (!category) {
      return res.status(404).send({
        success: false,
        msg: "category not exist",
        category: null,
      });
    }
    res.send({
      success: true,
      msg: "category deleted succesfully",
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      msg: "data base error",
      category: e.message,
    });
  }
};
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({
      success: true,
      msg: "all category get succesfully",
      category: categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message,
      category: null,
    });
  }
};

module.exports = {
  CreateCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getAllCategoryController,
};
