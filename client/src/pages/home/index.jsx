import React, { useEffect, useState } from "react";
import CategoryBox from "../../components/CategoryBox";
import { getCategories } from "../../api/categories";
import { getImageUrl } from "../../utils/functions";
import { getImages } from "../../api/images";
import OfferCrousel from "../../components/OfferCrousel";
import SearchInput from "../../components/Search";
import Loader from "../../components/Loader";
import OrderCountDisplay from "../../components/OrderCoutDisplay";

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

          <div className="flex flex-col justify-center w-full h-fit sm:h-[400px]">
            <OfferCrousel urls={images} />
          </div>
        </>
      )}

      <div className="flex-col justify-center md:w-1/2 w-full mx-auto md:py-20 py-10">
        <h1 className="text-2xl md:text-4xl font-bold text-[#00A76F] text-center mb-4">
          Explore Premium Lab Equipment at Labzkit
        </h1>
        <p className="text-sm md:text-lg text-gray-700 text-center mb-4">
          Discover top-quality lab tools, from microscopes to precise
          instruments, designed for all your scientific needs.
        </p>
        <p className="text-sm md:text-lg text-gray-700 text-center">
          Equip your lab with trusted brands and get fast, reliable delivery –
          all at competitive prices.
        </p>
      </div>
      <OrderCountDisplay duration={7} />

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-grow border-t border-1 border-black dark:border-white"></div>
        <h1 className="text-gray-900 dark:text-darkText md:text-lg text-sm">
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
          <Loader />
        ) : categoriesData.length > 0 ? (
          <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10">
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
