import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext"; // Import the useCart hook
import { getImageUrl, imagesProduct } from "../utils/functions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import Modal from "./Modal";
import { createReview, deleteReview, getReviews } from "../api/reviews";
import ReviewList from "./ReviewList";
import { useUser } from "../context/UserContext";
import Loader from "./Loader";

const ProductDetail = ({ product }) => {
  const { addToCart } = useCart(); // Access the addToCart function from the CartContext
  const { isAdmin } = useUser(); // Access the addToCart function from the CartContext
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, token } = useUser();

  const handleQuantityChange = (type) => {
    setQuantity((prevQuantity) => {
      // Check if user is attempting to increment and has reached stock limit
      if (type === "increment" && prevQuantity < product?.quantity) {
        return prevQuantity + 1; // Increment if it's within stock limit
      } else if (type === "decrement" && prevQuantity > 1) {
        return prevQuantity - 1; // Decrement but not below 1
      } else if (type === "increment") {
        toast.warn(
          `Oops! You can't order more than ${product?.quantity} of this item right now. Stock is limited.`
        );
        return prevQuantity; // Don't allow increment beyond stock limit
      } else if (type === "decrement" && prevQuantity === 1) {
        toast.warn(`You can't order less than 1 item.`);
        return prevQuantity; // Prevent decrementing below 1
      }
      return prevQuantity; // Fallback return
    });
  };

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      const cartProduct = {
        ...product,
        price: product.discountedPrice
          ? product.discountedPrice
          : product.price,
        size: selectedSize,
        color: selectedColor,
        category: product.category._id,
        productId: product._id,
        quantity,
      };
      addToCart(cartProduct);
      toast.success(
        token && user
          ? "Product added to cart"
          : "Product added to cart. Please login to access cart"
      );
      navigate(`/products/${product.category._id}`);
    }
  };

  const addReview = async (data) => {
    try {
      const response = await createReview(data);
      if (response) {
        toast.success("Review submitted successfully!");
        fetchReviews();
        setIsModalOpen(false);
      }
    } catch (err) {
      toast.error("Error Submitting review!");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId); // Delete review using the API
      fetchReviews(); // Remove deleted review from state
      toast.success("Review deleted successfully!");
    } catch (err) {
      toast.error("Error deleting review!");
    }
  };
  const fetchReviews = async () => {
    setReviewsLoading(true); // Start loading reviews
    try {
      const response = await getReviews(product._id);
      setReviews(response?.data?.reviews);
    } catch (err) {
      toast.error("Error fetching reviews");
    } finally {
      setReviewsLoading(false);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (!product) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    fetchReviews();
  }, [product]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col">
      <div className="container mx-auto p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white dark:bg-[#1f2937] text-gray-900 dark:text-[#d1d5db] rounded-lg shadow-lg">
        {/* Product Image */}
        <div className="flex flex-col justify-center items-center gap-6 mb-6 lg:mb-0">
          <img
            src={
              product?.image
                ? getImageUrl(product?.image)
                : imagesProduct[product?.gender]
            }
            alt={product.name}
            className="w-full max-w-md max-h-72 object-contain rounded-lg shadow-lg transition-all hover:scale-105"
          />
          <p className="text-center text-sm text-gray-600 dark:text-[#d1d5db]">
            {product?.description}
          </p>
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-5 px-6 lg:px-0">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-[#f1f5f9] tracking-tight leading-snug">
            {product.name}
          </h2>

          {product.discountedPrice > 0 ? (
            <div className="flex items-center gap-4">
              <p className="text-lg font-semibold text-gray-500 line-through">{`$${product.price}`}</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${product.discountedPrice}
              </p>
            </div>
          ) : (
            <p className="text-2xl font-semibold text-gray-900">
              ${product.price}
            </p>
          )}

          {/* Available Sizes */}
          <div>
            <h3 className="text-sm font-medium text-gray-800 dark:text-[#cbd5e1] mb-2">
              Select Size
            </h3>
            <div className="flex gap-4">
              {product.size.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full font-medium border-2 text-sm transition-colors duration-200 ${
                    selectedSize === size
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 text-gray-800 border-gray-300 dark:bg-[#374151] dark:text-[#d1d5db] dark:border-[#4b5563]"
                  } hover:bg-blue-500 hover:text-white dark:hover:bg-[#2563eb]`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Available Colors */}
          <div>
            <h3 className="text-sm font-medium text-gray-800 dark:text-[#cbd5e1] mb-2">
              Select Color
            </h3>
            <div className="flex gap-4">
              {product.color.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-8 h-8 rounded-full border-2 border-gray-300 dark:border-[#4b5563] transition-all ${
                    selectedColor === color
                      ? "ring-4 ring-blue-600 dark:ring-[#3b82f6]"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className="text-sm font-medium text-gray-800 dark:text-[#cbd5e1] mb-2">
              Quantity
            </h3>
            {product?.quantity > 0 ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="px-4 py-2 rounded-full bg-gray-100 dark:bg-[#374151] text-gray-800 dark:text-[#d1d5db] font-semibold hover:bg-gray-200 dark:hover:bg-[#4b5563] transition-all"
                >
                  -
                </button>
                <span className="text-xl font-semibold text-gray-800 dark:text-[#d1d5db]">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="px-4 py-2 rounded-full bg-gray-100 dark:bg-[#374151] text-gray-800 dark:text-[#d1d5db] font-semibold hover:bg-gray-200 dark:hover:bg-[#4b5563] transition-all"
                >
                  +
                </button>
              </div>
            ) : (
              <p className="text-red-700 font-semibold text-sm">Out Of Stock</p>
            )}
          </div>

          {/* Action Buttons */}
          {!isAdmin && (
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                className={`w-full sm:w-28 sm:px-2 py-2 text-sm font-semibold rounded-md transition-all ${
                  selectedSize && selectedColor
                    ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-[#3b82f6] dark:hover:bg-[#2563eb]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-[#4b5563] dark:text-[#6b7280]"
                }`}
                disabled={!selectedSize || !selectedColor}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              {user && token && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-28 sm:px-2 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 dark:bg-[#16a34a] dark:hover:bg-[#15803d] transition-all"
                >
                  Add a Review
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal for Review */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <ReviewForm productId={product._id} onSubmit={addReview} />
      </Modal>

      {/* Reviews Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold">Customer Reviews</h3>
        {reviewsLoading ? (
          <Loader /> // Show loading spinner if reviews are still loading
        ) : (
          <ReviewList reviews={reviews} onDelete={handleDeleteReview} />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
