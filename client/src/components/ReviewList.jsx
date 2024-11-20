import React from "react";
import { useUser } from "../context/UserContext";

const ReviewList = ({ reviews, onDelete }) => {
  const { isAdmin } = useUser();
  return (
    <div className="mt-4 max-h-64 overflow-y-scroll space-y-2">
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 text-xs">
          No reviews yet. Be the first to review this product!
        </p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-sm font-semibold text-gray-800">
                {`${review.user?.firstName} ${review.user?.lastName}`}
              </h4>
              {isAdmin && (
                <button
                  onClick={() => onDelete(review._id)}
                  className="text-red-600 hover:text-red-700 font-medium transition-all text-xs"
                >
                  Delete
                </button>
              )}
            </div>
            <div className="flex items-center mb-1">
              <span className="font-semibold text-gray-700 text-xs">
                Rating:
              </span>
              <span className="ml-1 text-yellow-500 text-xs">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </span>
            </div>
            <p className="text-gray-600 text-xs">{review.reviewText}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
