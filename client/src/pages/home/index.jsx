import React, { useEffect, useState } from "react";
import CategoryBox from "../../components/CategoryBox";
import { getCategories } from "../../api/categories";
import { getImageUrl } from "../../utils/functions";
import { getImages } from "../../api/images";
import OfferCrousel from "../../components/OfferCrousel";
import HeroBg from "../../assets/hero-bg.png";
import { FiSearch } from "react-icons/fi";
import SearchInput from "../../components/Search";

const HomePage = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for categories

  const fetchCategories = async (name) => {
    setIsLoading(true);
    const response = await getCategories(name);
    setCategoriesData(response);
    setIsLoading(false);
  };

  const fetchImages = async () => {
    const response = await getImages();
    setImages(response?.images);
  };

  useEffect(() => {
    fetchCategories();
    fetchImages();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCategories(searchTerm);
    }, 300); // Add a debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="px-8 pb-8 space-y-6 flex-grow">
      {images.length > 0 && (
        <>
          <div className="flex items-center space-x-4 my-6">
            <div className="flex-grow border-t border-1 border-black dark:border-white"></div>
            <h1 className="text-gray-900 dark:text-darkText text-2xl">
              Trending Offers
            </h1>
            <div className="flex-grow border-t border-1 border-black dark:border-white"></div>
          </div>

          <div className="w-full h-[400px]">
            <OfferCrousel urls={images} />
          </div>
        </>
      )}

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-grow border-t border-1 border-black dark:border-white"></div>
        <h1 className="text-gray-900 dark:text-darkText text-lg mt-4">
          Featured Categories
        </h1>
        <div className="flex-grow border-t border-1 border-black dark:border-white"></div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-center mb-6">
            <SearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Category"
            />
        </div>{" "}
        {isLoading ? (
          <div className="w-full flex justify-center items-center py-20">
            <div
              className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full border-blue-600"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : categoriesData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesData.map((category) => (
              <CategoryBox
                key={category?._id}
                id={category?._id}
                name={category?.name}
                imageUrl={getImageUrl(category?.image)}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center py-20">
            <p className="text-center">No Categories Found!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
