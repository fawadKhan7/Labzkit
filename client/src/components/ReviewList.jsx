import React from "react";
import { useUser } from "../context/UserContext";
import { Stack, Box, Typography, Rating, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const ReviewList = ({ reviews, onDelete }) => {
  const { isAdmin } = useUser();

  return (
    <Box
      className="mt-4"
      sx={{
        maxHeight: "calc(100vh - 200px)", // Adjust according to the layout
        overflowY: "auto",
        '&::-webkit-scrollbar': { display: 'none' }, // Hide the scrollbar for Webkit browsers
      }}
    >
      {reviews.length === 0 ? (
        <Typography variant="body2" align="center" sx={{ color: 'gray', fontStyle: 'italic' }}>
          No reviews yet. Be the first to review this product!
        </Typography>
      ) : (
        reviews.map((review) => (
          <Box
            key={review._id}
            sx={{
              p: 3,
              mb: 2,
              backgroundColor: 'white',
              border: '1px solid #E0E0E0',
              borderRadius: 2,
              boxShadow: 2,
              '&:hover': { boxShadow: 3 },
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <Box display={'flex'} alignItems={"center"} gap={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {`${review.user?.firstName} ${review.user?.lastName}`}
              </Typography>
              <Rating value={review.rating} precision={0.1} readOnly size="small" />

              </Box>

              {isAdmin && (
                <IconButton
                  onClick={() => onDelete(review._id)}
                  color="error"
                  size="small"
                  sx={{ padding: 0 }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Stack>

            <Stack spacing={1} mt={2}>

              <Typography variant="body2" sx={{  color: 'text.secondary' }}>
                {review.reviewText}
              </Typography>
            </Stack>
          </Box>
        ))
      )}
    </Box>
  );
};

export default ReviewList;
