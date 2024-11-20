const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

// Create a new category
const createCategory = async (req, res) => {
  const { name } = req.body;
  const image = req.file?.filename || "";

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({
      name,
      image,
    });

    await category.save();

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating category", error: error.message });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const { name } = req.query;
    const filter = name ? { name: new RegExp(name, "i") } : {};
    const categories = await Category.find(filter);
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
};

// Get a category by ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching category", error: error.message });
  }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  console.log(categoryId)
  try {
    // Find the category by ID
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    // Delete all products that belong to this category
    await Product.deleteMany({ category: categoryId });

    // Delete the category
    await category.deleteOne();

    res.status(200).json({
      message: "Category and associated products deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting category and products",
      error: error.message,
    });
  }
};
module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
};
