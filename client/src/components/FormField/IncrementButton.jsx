import React from "react";
import { TextField } from "@mui/material";

const IncrementerInput = ({
  quantity,
  onQuantityChange,
  maxQuantity,
}) => {
  const handleInputChange = (event) => {
    const value = event.target.value;

    // Allow empty string for clearing the input
    if (value === "") {
      onQuantityChange("");
      return;
    }

    const numericValue = parseInt(value, 10);

    if (!isNaN(numericValue)) {
      onQuantityChange(numericValue);
    }
  };

  return (
    <TextField
      type="number"
      fullWidth
      value={quantity}
      onChange={handleInputChange}
      variant="outlined"
      size="small"
      sx={{
        "& input": {
          textAlign: "center",
          fontSize: "1rem",
          padding: "8px",
        },
      }}
    />
  );
};

export default IncrementerInput;
