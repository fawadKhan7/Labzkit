import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, Typography, useTheme } from "@mui/material";

const CategoryBox = ({ name, imageUrl, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <Card
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 320,
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: `0 12px 36px rgba(0, 0, 0, 0.1)`,
        },
        padding:2,
        display:"flex",
        flexDirection:"column",
        gap:1
      }}
      onClick={handleClick}
    >
      <Box sx={{  width: "100%", height: 250 }}>
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
            transition: "transform 0.3s ease",
          }}
        />
      </Box>

      <Box
        sx={{
          textAlign: "center"
        }}
      >
        <Typography
          sx={{
            color: "#1C252E",
            letterSpacing: "0.5px",
            fontSize: "1.2rem",
            textTransform: "capitalize",
          }}
        >
          {name}
        </Typography>
      </Box>
    </Card>
  );
};

export default CategoryBox;
