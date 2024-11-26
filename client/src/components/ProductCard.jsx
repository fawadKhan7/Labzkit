import React from "react";
import { Box, Card, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getImageUrl, imagesProduct } from "../utils/functions";
import Image from "./FormField/Image";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <Card
      sx={{
        position: "relative",
        boxShadow: 2,
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        width: "100%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between"
        // paddingBottom: 1,
      }}
      onClick={handleClick}
    >
      <Box sx={{ p: 1 }}>
        <Image
          alt={product.name}
          src={
            product?.images && product?.images?.length > 0
              ? getImageUrl(product?.images[0])
              : imagesProduct[product?.gender]
          }
          ratio="1/1"
          sx={{
            borderRadius: 1.5,
            height: "210px",
            objectFit: "cover",
          }}
        />
      </Box>

      <Stack display={"flex"} flexDirection={"column"}  spacing={1} sx={{ p: 1.5, pt: 1, height: "100%" }}>
        <Box
        
          onClick={() => navigate(`/product/${product._id}`)}
          className="hover:underline"
          noWrap
          style={{ fontSize: 15 }}
        >
          {product.name}
        </Box>

        <Box sx={{justifySelf:"end" }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              {product.discountedPrice > 0 && (
                <Box
                  mr={1}
                  component="span"
                  sx={{
                    color: "text.disabled",
                    textDecoration: "line-through",
                  }}
                >
                  ${product.price.toFixed(2)}
                </Box>
              )}
              <Box component="span">
                ${product.discountedPrice.toFixed(2) || product.price}
              </Box>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

export default ProductCard;
