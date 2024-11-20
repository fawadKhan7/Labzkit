import React, { useEffect, useState } from "react";
import { createProduct } from "../../api/products";
import { createCategory, getCategories } from "../../api/categories";
import {
  availableSizes,
  availableColors,
  genders,
} from "../../data/selectFieldsData";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductCreate = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isProductForm, setIsProductForm] = useState(true);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    discountedPrice: "",
    quantity: "",
    size: [],
    color: [],
    gender: "",
    description: "",
  });
  const [category, setCategory] = useState({
    name: "",
  });
  const [productImageFile, setProductImageFile] = useState(null);
  const [categoryImageFile, setCategoryImageFile] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSizeChange = (size) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      size: prevProduct.size.includes(size)
        ? prevProduct.size.filter((s) => s !== size)
        : [...prevProduct.size, size],
    }));
  };

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleColorChange = (color) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      color: prevProduct.color.includes(color)
        ? prevProduct.color.filter((c) => c !== color)
        : [...prevProduct.color, color],
    }));
  };

  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    setProductImageFile(file);
    setProductImagePreview(URL.createObjectURL(file));
  };

  const handleCategoryImageChange = (e) => {
    const file = e.target.files[0];
    setCategoryImageFile(file);
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    if (!category.name) {
      toast.error("Category name is required");
      return;
    }
    const formData = new FormData();
    formData.append("name", category.name);
    if (categoryImageFile) {
      formData.append("image", categoryImageFile);
    }
    try {
      // Call the createProduct function to send the data to the API
      const createdCategory = await createCategory(formData);
      setCategory({});
      toast.success("Category Created Successfully");

      setIsProductForm(true);
    } catch (error) {
      toast.error("Category creation failed");
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    const validationErrors = [];

    if (!product.name) validationErrors.push("Product name is required");
    if (!product.quantity)
      validationErrors.push("Product quantity is required");
    if (!product.gender) validationErrors.push("Product gender is required");
    if (!product.category)
      validationErrors.push("Product category is required");
    if (!product.price) validationErrors.push("Product price is required");
    if (!product.size) validationErrors.push("Product size is required");

    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => toast.error(error));
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("discountedPrice", product.discountedPrice);
    formData.append("quantity", product.quantity);
    formData.append("size", JSON.stringify(product.size)); // Convert size array to JSON string
    formData.append("color", JSON.stringify(product.color));
    formData.append("gender", product.gender);
    formData.append("description", product.description);
    if (productImageFile) {
      formData.append("image", productImageFile);
    }

    try {
      // Call the createProduct function to send the data to the API
      const createdProduct = await createProduct(formData);
      setProduct({});
      toast.success("Product Created Successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error("Product creation failed");
    }
  };

  const fetchCategories = async () => {
    const response = await getCategories().then((res) => {
      let data = res.map((elem) => {
        return { label: elem?.name, value: elem?._id };
      });
      setCategories(data);
    });
  };
  useEffect(() => {
    fetchCategories();
  }, [isProductForm]);

  return (
    <div className="p-8 max-w-4xl m-auto bg-white dark:bg-DarkPrimary dark:text-darkText shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800 dark:text-darkText">
        {isProductForm ? "Create Product" : "Create Category"}
      </h2>

      {/* Toggle between Product and Category forms */}
      <button
        onClick={() => setIsProductForm(!isProductForm)}
        className="mb-4 text-blue-600"
      >
        {isProductForm
          ? "Switch to Create Category"
          : "Switch to Create Product"}
      </button>
      <form
        onSubmit={isProductForm ? handleSubmitProduct : handleSubmitCategory}
        className="flex flex-col items-center gap-8"
      >
        {isProductForm ? (
          <>
            {/* Left Section: Image Preview and Upload */}
            <div className="w-full sm:w-1/3 flex flex-col  items-center">
              {/* Image Preview or Default Placeholder */}
              <div className="w-full h-56 mb-4 border border-gray-300 rounded-md overflow-hidden shadow-sm flex items-center justify-center">
                {productImagePreview ? (
                  <img
                    src={productImagePreview}
                    alt="Product Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 dark:text-darkText text-lg">
                    Product Image
                  </span>
                )}
              </div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-darkText mb-2">
                Product Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProductImageChange}
                className="p-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
              />
            </div>
            <div className="w-full sm:w-2/3 flex flex-col space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-darkText mb-2">
                  Product Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-darkText mb-2">
                  Category:
                </label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option
                      key={cat?.value}
                      value={cat?.value}
                      className="text-black"
                    >
                      {cat?.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-darkText mb-2">
                  Price:
                </label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
                />
              </div>
              {/*Discount Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-darkText mb-2">
                  Discount:
                </label>
                <input
                  type="number"
                  name="discountedPrice"
                  value={product.discountedPrice}
                  onChange={handleInputChange}
                  placeholder="Enter Discount"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-darkText mb-2">
                  Quantity:
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter quantity"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
                />
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-darkText mb-2">
                  Size:
                </label>
                <div className="flex gap-4">
                  {availableSizes.map((size) => (
                    <label
                      key={size}
                      className="flex items-center text-gray-700 dark:text-darkText"
                    >
                      <input
                        type="checkbox"
                        checked={product.size.includes(size)}
                        onChange={() => handleSizeChange(size)}
                        className="form-checkbox h-5 w-5 text-blue-600 mr-2"
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-darkText mb-2">
                  Color:
                </label>
                <div className="flex gap-4">
                  {availableColors.map((color) => (
                    <label
                      key={color}
                      className="flex items-center text-gray-700 dark:text-darkText"
                    >
                      <input
                        type="checkbox"
                        checked={product.color.includes(color)}
                        onChange={() => handleColorChange(color)}
                        className="form-checkbox h-5 w-5 text-blue-600 mr-2 "
                      />
                      {color}
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-darkText mb-2">
                  Gender:
                </label>
                <select
                  name="gender"
                  value={product.gender}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
                >
                  <option value="">Select Gender</option>
                  {genders.map((gen) => (
                    <option key={gen} value={gen} className="text-black">
                      {gen}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-darkText mb-2">
                  Product Description:
                </label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500 transition duration-200"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col gap-2">
            {/* Category Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-darkText mb-2">
                Category Name:
              </label>
              <input
                type="text"
                name="name"
                value={category.name}
                onChange={handleCategoryInputChange}
                placeholder="Enter category name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleCategoryImageChange}
              className="p-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none"
          >
            {isProductForm ? "Create Product" : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;
