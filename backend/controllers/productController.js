const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
// Create a new product
const createProduct = async (req, res) => {
  const {
    name,
    category,
    price,
    discountedPrice,
    quantity,
    size,
    color,
    gender,
    description,
  } = req.body;

  const image = req.file?.filename || "";
  try {
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(400).json({ message: "Category does not exist" });
    }

    // Ensure that size and color are arrays if they come as strings
    const sizeArray = Array.isArray(size) ? size : JSON.parse(size);
    const colorArray = Array.isArray(color) ? color : JSON.parse(color);

    const product = new Product({
      name,
      category: categoryDoc._id, // Store the category's ObjectId
      price,
      quantity,
      discountedPrice,
      size: sizeArray,
      color: colorArray,
      gender,
      description,
      image, // Store the image URL in the database
    });

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};
// Get all products
const getAllProducts = async (req, res) => {
  try {
    const { name, gender } = req.query;
    const filter = {};
    if (name) filter.name = new RegExp(name, "i");
    if (gender) filter.gender = gender;

    const products = await Product.find(filter).populate("category");
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

const getAllProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { name, gender } = req.query;

  try {
    // Find the category by ID and select only the name field
    const category = await Category.findById(categoryId).select("name");

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const filter = { category: categoryId };
    if (name) filter.name = new RegExp(name, "i");
    if (gender) filter.gender = gender;

    const products = await Product.find(filter).populate("category");

    res.status(200).json({ products, category });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate("category"); // Populate category for the product
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

// Update an existing product by ID
// const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const { name, category, price, quantity, size, color, gender, description } =
//     req.body;
//   const image = req.file?.filename; // Get new image if uploaded
//   try {
//     const categoryDoc = await Category.findById(category);
//     if (!categoryDoc) {
//       return res.status(400).json({ message: "Category does not exist" });
//     }

//     // Ensure size and color are arrays if passed as JSON strings
//     const sizeArray = Array.isArray(size) ? size : JSON.parse(size);
//     const colorArray = Array.isArray(color) ? color : JSON.parse(color);

//     // Update the product
//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       {
//         name,
//         category: categoryDoc._id,
//         price,
//         quantity,
//         size: sizeArray,
//         color: colorArray,
//         gender,
//         description,
//         ...(image && { image }), // Only update image if new file is provided
//       },
//       { new: true, runValidators: true } // Options: return updated product & run schema validators
//     ).populate("category"); // Populate category in the response

//     if (!updatedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: "Error updating product", error: error.message });
//   }
// };

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    category,
    price,
    quantity,
    size,
    discountedPrice,
    color,
    gender,
    description,
    image,
  } = req.body;

  try {
    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields conditionally based on provided data
    const updateData = {};

    if (name) updateData.name = name;
    if (category) {
      const categoryDoc = await Category.findById(category);
      if (!categoryDoc) {
        return res.status(400).json({ message: "Category does not exist" });
      }
      updateData.category = categoryDoc._id;
    }
    if (price) updateData.price = price;
    if (discountedPrice) updateData.discountedPrice = discountedPrice || 0;
    if (quantity) updateData.quantity = quantity;
    if (size) updateData.size = Array.isArray(size) ? size : JSON.parse(size);
    if (color)
      updateData.color = Array.isArray(color) ? color : JSON.parse(color);
    if (gender) updateData.gender = gender;
    if (description) updateData.description = description;
    if (image) updateData.image = req.file?.filename; // Assuming the image is uploaded and available

    // Update the product with only the fields provided
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("category");

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getAllProductsByCategory,
  getProductById,
  deleteProduct,
  updateProduct,
};
