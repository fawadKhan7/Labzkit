import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryBox = ({ name, imageUrl, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div
      className="relative bg-white border-0 cursor-pointer w-full sm:w-80 md:w-64 lg:w-80 xl:w-72 overflow-hidden rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
      onClick={handleClick}
    >
      <div className="relative w-full h-64">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-contain transition-all duration-300 ease-in-out hover:opacity-80"
        />

        {/* Overlay with a gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 transition-all duration-300"></div>
      </div>

      {/* Category name at the bottom with bold and modern typography */}
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h2 className="text-2xl font-bold text-shadow-md">{name}</h2>
      </div>
    </div>
  );
};

export default CategoryBox;
