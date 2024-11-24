import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  Button,
  TextareaAutosize,
  Rating,
} from "@mui/material";

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
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        padding: 3,
        borderRadius: 2,
        backgroundColor: "#FFFFFF",
        boxShadow: 2,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
        Add Your Review
      </Typography>

      {/* Rating Section */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
        <Rating
          value={rating}
          onChange={(event, newValue) => handleRatingChange(newValue)}
          size="large"
          sx={{ color: "#FFD700" }}
        />
      </Box>

      {/* Review Text Section */}
      <TextareaAutosize
        minRows={4}
        value={reviewText}
        onChange={handleReviewTextChange}
        placeholder="Write your review here..."
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #D1D5DB",
          backgroundColor: "#F9FAFB",
          fontSize: "16px",
          color: "#1F2937",
          resize: "none",
        }}
      />

      {/* Submit Button */}
      <Button
        onClick={handleSubmitReview}
        disabled={isSubmitting}
        variant="contained"
        sx={{
          marginTop: 2,
          padding: "12px",
          color: "#FFFFFF",
          fontWeight: "bold",
          backgroundColor: "#00A76F",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#007F5B",
          },
          width: "100%",
        }}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </Box>
  );
};

export default ReviewForm;
