import { useEffect, useState } from "react";
import { getProductById, updateProduct } from "../api/products";
import { getCategories } from "../api/categories";
import {
  availableSizes,
  availableColors,
  genders,
} from "../data/selectFieldsData";
import { getImageUrl } from "../utils/functions";
import { toast } from "react-toastify";

function ProductUpdateModal({ productId, onClose, onSave }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    discountedPrice: 0,
    quantity: "",
    size: [],
    color: [],
    gender: "",
    description: "",
  });
  const [productImageFile, setProductImageFile] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState(null);

  // Fetch categories and product data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductById(productId);
        if (response) {
          setProductData(response);
          if (response.image)
            setProductImagePreview(getImageUrl(response.image));
        }
      } catch (error) {
        toast.error("Error fetching data");
      }
    };
    fetchData();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSizeChange = (size) => {
    setProductData((prevProduct) => ({
      ...prevProduct,
      size: prevProduct.size.includes(size)
        ? prevProduct.size.filter((s) => s !== size)
        : [...prevProduct.size, size],
    }));
  };

  const handleColorChange = (color) => {
    setProductData((prevProduct) => ({
      ...prevProduct,
      color: prevProduct.color.includes(color)
        ? prevProduct.color.filter((c) => c !== color)
        : [...prevProduct.color, color],
    }));
  };

  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImageFile(file);
      setProductImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("category", productData.category?._id);
    formData.append("price", productData.price);
    formData.append("discountedPrice", productData.discountedPrice);
    formData.append("quantity", productData.quantity);
    formData.append("size", JSON.stringify(productData.size));
    formData.append("color", JSON.stringify(productData.color));
    formData.append("gender", productData.gender);
    formData.append("description", productData.description);
    if (productImageFile) {
      formData.append("image", productImageFile);
    }
    setIsLoading(true);
    try {
      await onSave(productId, formData);
    } catch (error) {
      toast.error("Internal Server Error");
    } finally {
      setIsLoading(false);
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
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 py-6">
      <div
        className=" bg-white p-6 shadow-lg w-full rounded-xl max-w-2xl max-h-[80vh] overflow-auto sm:w-3/4"
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* Internet Explorer 10+ */,
        }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Edit Product
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Image Upload Section */}
          <div className="w-full sm:w-1/3 flex flex-col items-center mb-4">
            <div className="w-full h-48 mb-4 border border-gray-300 rounded-md overflow-hidden shadow-sm flex items-center justify-center">
              {productImagePreview ? (
                <img
                  src={
                    productImagePreview
                      ? productImagePreview
                      : getImageUrl(productData?.image)
                  }
                  alt="Product Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-lg">Product Image</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleProductImageChange}
              className="p-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>

          {/* Product Name */}
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
            placeholder="Enter product name"
          />

          {/* Category Selection */}
          <select
            name="category"
            value={productData.category?._id}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
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

          {/* Price Input */}
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            placeholder="Enter price"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
          />
          {/* discountedPrice Input */}
          <input
            type="number"
            name="discountedPrice"
            value={productData.discountedPrice}
            onChange={handleInputChange}
            placeholder="Enter Discount"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
          />

          {/* Quantity Input */}
          <input
            type="number"
            name="quantity"
            value={productData.quantity}
            onChange={handleInputChange}
            placeholder="Enter quantity"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
          />

          {/* Size Selection */}
          <div className="mb-4">
            <label className="block mb-2 text-sm">Size:</label>
            <div className="flex gap-4">
              {availableSizes.map((size) => (
                <label key={size} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={productData.size.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="form-checkbox h-5 w-5 text-blue-600 mr-2"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-4">
            <label className="block mb-2 text-sm">Color:</label>
            <div className="flex gap-4">
              {availableColors.map((color) => (
                <label key={color} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={productData.color.includes(color)}
                    onChange={() => handleColorChange(color)}
                    className="form-checkbox h-5 w-5 text-blue-600 mr-2"
                  />
                  {color}
                </label>
              ))}
            </div>
          </div>

          {/* Gender Selection */}
          <select
            name="gender"
            value={productData.gender}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
          >
            <option value="">Select Gender</option>
            {genders.map((gen) => (
              <option key={gen} value={gen} className="text-black">
                {gen}
              </option>
            ))}
          </select>

          {/* Product Description */}
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
            rows="4"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500 transition duration-200"
          />

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-6">
            <button
              type="submit"
              className={`w-24 py-2 px-4 rounded-md focus:outline-none transition-all duration-300 ease-in-out ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              }`}
            >
              {isLoading ? " Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductUpdateModal;
