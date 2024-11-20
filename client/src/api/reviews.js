import axios from "./network";

export const createReview = async (reviewData) => {
  const response = await axios.post("/reviews/create", reviewData);
  return response;
};

export const getReviews = async (productId) => {
  const response = await axios.get(`/reviews/${productId}`);
  return response;
};

export const deleteReview = async (reviewId) => {
  const response = await axios.delete(`/reviews/delete/${reviewId}`);
  return response;
};
