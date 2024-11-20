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
      className="bg-white flex flex-col justify-between shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full py-6 max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4 cursor-pointer"
      onClick={handleClick}
    >
      <div>
        {/* Title and Icon */}
        <div className="flex items-center gap-2 px-6 mb-4">
          <h3
            className="text-lg text-gray-800 font-semibold flex-1 truncate"
            style={{ maxWidth: "calc(100% - 3rem)" }}
          >
            {product.name}
          </h3>
        </div>

        {/* Image Container */}
        <div className="w-full h-56 flex justify-center items-center">
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
        <div className="px-6 pt-4">
          <p className="text-sm text-center text-gray-600 leading-relaxed">
            {product.description && product.description.length > 100
              ? `${product.description.slice(0, 100)}...`
              : product.description}
          </p>
        </div>
      </div>
      {/* Pricing Section */}
      <div className="mt-8 px-6 flex items-center justify-between flex-wrap gap-4">
        {product.discountedPrice > 0 ? (
          <div className="flex items-center">
            <p className="text-gray-500 line-through mr-2">${product.price}</p>
            <h3 className="text-xl text-gray-800 font-bold">
              ${product.discountedPrice}
            </h3>
          </div>
        ) : (
          <h3 className="text-xl text-gray-800 font-bold">${product.price}</h3>
        )}

        {/* Order Button */}
        <button
          type="button"
          className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider bg-blue-600 hover:bg-blue-700 outline-none"
        >
          Order now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
