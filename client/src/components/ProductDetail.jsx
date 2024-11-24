import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { getImageUrl, imagesProduct } from "../utils/functions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import Modal from "./Modal";
import { createReview, deleteReview, getReviews } from "../api/reviews";
import ReviewList from "./ReviewList";
import { useUser } from "../context/UserContext";
import Loader from "./Loader";
import ReactImageLightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import IncrementerButton from "./FormField/IncrementButton";
import { Typography, Box, Button, CircularProgress } from "@mui/material";
import CustomSelect from "./FormField/SelectField";
import "../styles/description.css";
const ProductDetail = ({ product }) => {
  const { addToCart } = useCart();
  const { isAdmin } = useUser();
  const [selectedSize, setSelectedSize] = useState("null");
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const navigate = useNavigate();
  const { user, token } = useUser();

  const handleQuantityChange = (type) => {
    setQuantity((prevQuantity) => {
      if (type === "increment" && prevQuantity < product?.quantity) {
        return prevQuantity + 1;
      } else if (type === "decrement" && prevQuantity > 1) {
        return prevQuantity - 1;
      } else if (type === "increment") {
        toast.warn(
          `Oops! You can't order more than ${product?.quantity} of this item right now. Stock is limited.`
        );
        return prevQuantity;
      } else if (type === "decrement" && prevQuantity === 1) {
        toast.warn(`You can't order less than 1 item.`);
        return prevQuantity;
      }
      return prevQuantity;
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
      toast.error("Error submitting review!");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      fetchReviews();
      toast.success("Review deleted successfully!");
    } catch (err) {
      toast.error("Error deleting review!");
    }
  };

  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const response = await getReviews(product._id);
      setReviews(response?.data?.reviews);
    } catch (err) {
      toast.error("Error fetching reviews");
    } finally {
      setReviewsLoading(false);
    }
  };

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
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
    <Box className="flex flex-col gap-4">
      <Box className="flex flex-col gap-4 rounded-lg shadow-md py-4 px-6 bg-white">
        <Box className="flex flex-col md:flex-row md:justify-between gap-16 items-center">
          <Box className="w-full flex flex-col justify-center items-center gap-6 mb-6 lg:mb-0">
            <Box className="flex flex-col items-center justify-between md:w-[600px] ">
              <img
                src={
                  product.images && product.images.length > 0
                    ? getImageUrl(product.images[0])
                    : imagesProduct[product.gender]
                }
                alt="Product"
                className="max-h-[400px] w-fit rounded-md"
              />
              <Box className="flex flex-wrap gap-4 mt-8">
                {product?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={getImageUrl(image)}
                    alt={`Product Image ${index + 1}`}
                    className="w-16 h-16 border-2 border-gray-300 object-contain rounded-lg shadow-lg cursor-pointer transition-all hover:scale-105"
                    onClick={() => openLightbox(index)}
                  />
                ))}
              </Box>
            </Box>

            {isOpen && (
              <ReactImageLightbox
                mainSrc={getImageUrl(product?.images[photoIndex])}
                nextSrc={getImageUrl(
                  product?.images[(photoIndex + 1) % product?.images.length]
                )}
                prevSrc={getImageUrl(
                  product?.images[
                    (photoIndex + product?.images.length - 1) %
                      product?.images.length
                  ]
                )}
                onCloseRequest={closeLightbox}
                onMovePrevRequest={() =>
                  setPhotoIndex(
                    (photoIndex + product?.images.length - 1) %
                      product?.images.length
                  )
                }
                onMoveNextRequest={() =>
                  setPhotoIndex((photoIndex + 1) % product?.images.length)
                }
              />
            )}
          </Box>

          <Box className="w-full flex flex-col justify-between space-y-5 px-6 lg:px-0">
            {product.quantity > 0 ? (
              <Typography fontWeight={"bold"} color="#22C55E">
                IN STOCK
              </Typography>
            ) : (
              <Typography
                color="error"
                bgcolor={"#FFE9D5"}
                fontWeight={"bold"}
                padding={1}
                textAlign={"center"}
                width={180}
                variant="body2"
              >
                OUT OF STOCK
              </Typography>
            )}
            <Typography variant="h4">{product.name}</Typography>
            {product.discountedPrice > 0 ? (
              <Box className="flex items-center gap-4">
                <Typography
                  variant="body1"
                  color="gray"
                  sx={{ textDecoration: "line-through" }}
                >
                  ${product.price}
                </Typography>
                <Typography variant="h5" color="gray">
                  ${product.discountedPrice}
                </Typography>
              </Box>
            ) : (
              <Typography variant="h5" color="primary">
                ${product.price}
              </Typography>
            )}
            <div className="w-full md:w-36">
              <CustomSelect
                value={selectedSize}
                options={product.size}
                onChange={(e) => setSelectedSize(e.target.value)}
                label="Size"
                size="small"
              />
            </div>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              Select Color
            </Typography>
            <Box className="flex gap-4 ">
              {product.color.map((color) => (
                <Box
                  key={color}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: color,
                    border:
                      selectedColor === color
                        ? "2px solid blue"
                        : "1px solid gray",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body2" mb={1}>
                Quantity
              </Typography>
              {product?.quantity > 0 && (
                <IncrementerButton
                  quantity={quantity}
                  onIncrease={() => handleQuantityChange("increment")}
                  onDecrease={() => handleQuantityChange("decrement")}
                  disabledIncrease={quantity >= product?.quantity}
                  disabledDecrease={quantity <= 1}
                />
              )}
            </Box>
            {!isAdmin && (
              <Box sx={{ display: "flex", gap: 2, marginTop: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                  fullWidth
                >
                  Add to Cart
                </Button>
                {user && token && (
                  <Button
                    sx={{
                      backgroundColor: "#00A76F",
                      color: "#FFFFFF",
                      "&:hover": {
                        backgroundColor: "#007F5B",
                      },
                    }}
                    variant="contained"
                    color="secondary"
                    onClick={() => setIsModalOpen(true)}
                    fullWidth
                  >
                    Add a Review
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Box>

        <Box className="w-full my-4">
          <Typography variant="h5" py={1}>
            About {product.name}
          </Typography>
          <Typography variant="body2" color="gray">
            <div
              className="product-description"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </Typography>
        </Box>

        <Box className="flex flex-col gap-4 mt-4">
          {reviewsLoading ? (
            <CircularProgress />
          ) : (
            <ReviewList
              reviews={reviews}
              productId={product._id}
              onDeleteReview={handleDeleteReview}
            />
          )}
        </Box>
      </Box>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Review"
      >
        <ReviewForm productId={product._id} onSubmit={addReview} />
      </Modal>
    </Box>
  );
};

export default ProductDetail;
