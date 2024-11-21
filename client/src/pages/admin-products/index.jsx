import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Use the hook for navigation
import { getProducts, deleteProduct, updateProduct } from "../../api/products"; // Ensure deleteProduct is in your API
import { getCategories, deleteCategory } from "../../api/categories"; // Make sure deleteCategory API is imported
import { getImageUrl, imagesProduct } from "../../utils/functions";
import ProductUpdateModal from "../../components/EditProductModal";
import { toast } from "react-toastify";
import { DeleteColumnOutlined } from "@ant-design/icons";
import { FiDelete } from "react-icons/fi";
import { FaDeleteLeft } from "react-icons/fa6";
import { BiPen, BiPencil, BiTrash } from "react-icons/bi";
import { genders } from "../../data/selectFieldsData";
import SearchInput from "../../components/Search";

const AdminProductList = () => {
  const navigate = useNavigate();
  const [productsData, setProductData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]); // Store categories data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedTab, setSelectedTab] = useState("products"); // Track selected tab ('products' or 'categories')
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const openModal = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedProductId(null);
    setIsModalOpen(false);
  };

  const handleCreateProduct = () => {
    navigate("/admin/products/create");
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId);
      fetchProducts(); // Refresh the product list after deletion
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(categoryId);
      fetchCategories();
      fetchProducts();
    }
  };

  const fetchProducts = async () => {
    const response = await getProducts(searchTerm, genderFilter);
    setProductData(response);
  };

  const fetchCategories = async () => {
    const response = await getCategories(""); // Pass empty string to get all categories
    setCategoriesData(response);
  };

  const handleUpdate = async (id, productData) => {
    try {
      const response = await updateProduct(id, productData);
      if (response) {
        toast.success("Product Updated Successfully");
        fetchProducts();
        handleClose();
      }
    } catch {
      toast.error("Error Updating Product");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, genderFilter]);

  return (
    <div className="p-6 dark:bg-[#1f2937] min-h-screen">
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-grow border-t border-1 border-black dark:border-white"></div>
        <h1 className="text-gray-900 dark:text-darkText text-lg">
          Labzkit Admin Products
        </h1>
        <div className="flex-grow border-t border-1 border-black dark:border-white"></div>
      </div>

      {/* Tab buttons */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => setSelectedTab("products")}
          className={`py-3 px-6 rounded-lg text-sm font-medium transition-all duration-300 shadow-md ${
            selectedTab === "products"
              ? "bg-blue-500 text-white shadow-blue-300"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setSelectedTab("categories")}
          className={`py-3 px-6 rounded-lg text-sm font-medium transition-all duration-300 shadow-md ${
            selectedTab === "categories"
              ? "bg-blue-500 text-white shadow-blue-300"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          Categories
        </button>
      </div>

      {/* Create product and offer buttons */}
      <div className="flex flex-col gap-6 mb-6">
        {/* Top Section: Create Product and Handle Offers Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <button
            onClick={handleCreateProduct}
            className="flex-1 sm:flex-none bg-blue-500 text-white shadow-blue-300 transition-all duration-300 py-3 px-4 rounded-lg shadow-md"
          >
            Create Product
          </button>

          <button
            onClick={() => navigate("/admin/offer/create")}
            className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transition-all duration-300 text-white py-3 px-4 rounded-lg shadow-md"
          >
            Handle Offers Banner
          </button>
        </div>

        {/* Conditional Section: Search and Filters */}
        {selectedTab === "products" && (
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <SearchInput
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Products"
              />
            </div>

            {/* Gender Filter Dropdown */}
            <div className="relative w-full lg:w-48">
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="w-full py-3 px-4 text-md border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Genders</option>
                {genders.map((elem) => (
                  <option key={elem} value={elem}>
                    {elem}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Show products or categories based on selectedTab */}
      {selectedTab === "products" ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border bg-white border-gray-300 rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 border border-gray-300 text-center font-semibold text-gray-700">
                  Image
                </th>
                <th className="p-4 border border-gray-300 text-center font-semibold text-gray-700">
                  Name
                </th>
                <th className="p-4 border border-gray-300 text-center font-semibold text-gray-700">
                  Category
                </th>
                <th className="p-4 border border-gray-300 text-center font-semibold text-gray-700">
                  Price
                </th>
                <th className="p-4 border border-gray-300 text-center font-semibold text-gray-700">
                  Discount
                </th>
                <th className="p-4 border border-gray-300 text-center font-semibold text-gray-700">
                  Quantity
                </th>
                <th className="p-4 border border-gray-300 text-center font-semibold text-gray-700">
                  Size
                </th>
                <th className="p-4 border border-gray-300 text-center font-semibold text-gray-700">
                  Color
                </th>
                <th className="p-4 border border-gray-300 text-center font-semibold text-gray-700">
                  Gender
                </th>
                <th className="p-4 border border-gray-300 text-center font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="p-4 border border-gray-300">
                    <img
                      src={
                        product?.image
                          ? getImageUrl(product?.image)
                          : imagesProduct[product?.gender]
                      }
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-4 border border-gray-300 text-gray-800 font-medium text-center">
                    {product.name}
                  </td>
                  <td className="p-4 border border-gray-300 text-gray-600 text-center">
                    {product.category?.name}
                  </td>
                  <td className="p-4 border border-gray-300 text-gray-600 text-center">
                    ${product.price}
                  </td>
                  <td className="p-4 border border-gray-300 text-gray-600 text-center">
                    ${product.discountedPrice || 0}
                  </td>
                  <td className="p-4 border border-gray-300 text-gray-600 text-center">
                    {product.quantity > 0 ? product.quantity : "Out Of Stock"}
                  </td>
                  <td className="p-4 border border-gray-300 text-gray-600 text-center">
                    {product.size.join(", ")}
                  </td>
                  <td className="p-4 border border-gray-300 text-gray-600 text-center">
                    {product.color.join(", ")}
                  </td>
                  <td className="p-4 border border-gray-300 text-gray-600 text-center">
                    {product.gender}
                  </td>
                  <td className="p-4 border border-gray-300 text-gray-600 text-center">
                    <div className="flex justify-center items-center gap-4">
                      <BiPencil
                        color="#e3a008"
                        size={20}
                        className="cursor-pointer hover:scale-110 transition-transform duration-200"
                        onClick={() => openModal(product._id)}
                      />
                      <BiTrash
                        color="red"
                        size={20}
                        className="cursor-pointer hover:scale-110 transition-transform duration-200"
                        onClick={() => handleDeleteProduct(product._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isModalOpen && (
            <ProductUpdateModal
              productId={selectedProductId}
              onClose={handleClose}
              onSave={handleUpdate}
            />
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="grid grid-cols-3 gap-4">
            {categoriesData.map((category) => (
              <div
                key={category._id}
                className="bg-white shadow rounded-md p-8 text-center"
              >
                <img
                  src={getImageUrl(category?.image)}
                  alt={category.name}
                  className="w-36 h-36 object-contain rounded-md mb-2 mx-auto"
                />
                <h2 className="font-semibold text-gray-700">{category.name}</h2>
                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="mt-2 bg-red-500 text-white p-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductList;
