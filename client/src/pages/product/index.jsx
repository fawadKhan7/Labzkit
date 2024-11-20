import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../../components/ProductList";
import { getProductsByCategory } from "../../api/products";
import { genders } from "../../data/selectFieldsData";
import Loader from "../../components/Loader";
import SearchInput from "../../components/Search";

const ProductsPage = () => {
  const { category } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const fetchCategoryProducts = async () => {
    setIsLoading(true); // Set loading to true before fetching
    const response = await getProductsByCategory(
      category,
      searchTerm,
      genderFilter
    );
    setCategoryProducts(response?.products);
    setCategoryName(response?.category?.name);
    setIsLoading(false); // Set loading to false after fetching
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [category, searchTerm, genderFilter]); // Re-fetch when any filter changes

  return (
    <div className="p-6 flex flex-col gap-4 min-h-screen dark:bg-DarkPrimary dark:text-darkText">
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-grow border-t border-1 border-black dark:border-white"></div>
        <h1 className="text-gray-900 dark:text-darkText text-lg">
          {categoryName} Products
        </h1>
        <div className="flex-grow border-t border-1 border-black dark:border-white"></div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Products"
        />
        <div className="relative w-full sm:w-48">
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="w-full px-4 py-2 text-md border-0 border-b-2 border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-600 transition-all duration-300"
          >
            <option value="">All Genders</option>
            {genders.map((elem) => (
              <option key={elem} value={elem}>
                {elem}
              </option>
            ))}
          </select>
        </div>
      </div>{" "}
      {/* Loading Spinner */}
      {isLoading ? (
        <Loader />
      ) : categoryProducts.length > 0 ? (
        <ProductList products={categoryProducts} />
      ) : (
        <p className="text-center">No Products Found!</p>
      )}
    </div>
  );
};

export default ProductsPage;
