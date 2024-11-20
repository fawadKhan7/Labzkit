// ReviewForm.js
import React, { useState } from "react";
import { toast } from "react-toastify";

const ReviewForm = ({ productId, onSubmit }) => {
  const [rating, setRating] = useState(0); // Rating state (1-5)
  const [reviewText, setReviewText] = useState(""); // Review text state
  const [isSubmitting, setIsSubmitting] = useState(false); // Button loading state

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    if (rating === 0 || reviewText.trim() === "") {
      toast.error("Please provide a rating and a review.");
      return;
    }
    setRating(0);
    setReviewText("");

    setIsSubmitting(true);
    await onSubmit({ productId, rating, reviewText });
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmitReview} className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800 dark:text-[#cbd5e1] mb-2">
        Add Your Review
      </h3>

      {/* Rating Section */}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(star)}
            className={`text-2xl ${
              rating >= star ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      {/* Review Text Section */}
      <textarea
        value={reviewText}
        onChange={handleReviewTextChange}
        placeholder="Write your review here..."
        className="w-full resize-none p-3 rounded-lg border border-gray-300 dark:border-[#4b5563] dark:bg-[#374151] dark:text-[#d1d5db] focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 mt-4 text-lg font-semibold rounded-md transition-all ${
          isSubmitting
            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-[#3b82f6] dark:hover:bg-[#2563eb]"
        }`}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
