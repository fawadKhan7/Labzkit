const mongoose = require("mongoose");

// Product schema definition
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Link the product to a category via category ID
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    default: 0,
  },
  size: {
    type: [String],
    required: true,
  },
  color: {
    type: [String],
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

// Product model creation
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
