import React from "react";
import { useNavigate } from "react-router-dom";
import { getImageUrl, imagesProduct } from "../utils/functions";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      className="bg-white flex flex-col justify-between shadow-[0_3px_10px_-4px_rgba(0,0,0,0.3)] w-full py-4 max-w-xs rounded-md font-[sans-serif] overflow-hidden mx-auto mt-3 cursor-pointer"
      onClick={handleClick}
    >
      <div>
        {/* Title and Icon */}
        <div className="flex items-center gap-2 px-4 mb-3">
          <h3
            className="text-md text-gray-800 font-semibold flex-1 truncate"
            style={{ maxWidth: "calc(100% - 2.5rem)" }}
          >
            {product.name}
          </h3>
        </div>

        {/* Image Container */}
        <div className="w-full h-44 flex justify-center items-center">
          <img
            src={
              product?.image
                ? getImageUrl(product?.image)
                : imagesProduct[product?.gender]
            }
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Description */}
        <div className="px-4 pt-3">
          <p className="text-xs text-center text-gray-600 leading-relaxed">
            {product.description && product.description.length > 80
              ? `${product.description.slice(0, 80)}...`
              : product.description}
          </p>
        </div>
      </div>
      {/* Pricing Section */}
      <div className="mt-6 px-4 flex items-center justify-between flex-wrap gap-3">
        {product.discountedPrice > 0 ? (
          <div className="flex items-center">
            <p className="text-gray-500 line-through mr-2 text-sm">
              ${product.price}
            </p>
            <h3 className="text-lg text-gray-800 font-bold">
              ${product.discountedPrice}
            </h3>
          </div>
        ) : (
          <h3 className="text-lg text-gray-800 font-bold">${product.price}</h3>
        )}

        {/* Order Button */}
        <button
          type="button"
          className="px-4 py-2 rounded-md text-white text-xs tracking-wide bg-blue-600 hover:bg-blue-700 outline-none"
        >
          Order now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
