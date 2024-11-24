import React from "react";
import { TextField } from "@mui/material";

const IncrementerInput = ({
  quantity,
  onQuantityChange,
  maxQuantity,
  sx}) => {
  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);

    if (!isNaN(value)) {
      onQuantityChange(value);
    }
  };

  return (
      <TextField
        type="number"
        fullWidth
        value={quantity}
        onChange={handleInputChange}
        inputProps={{
          min: 1,
          max: maxQuantity,
        }}
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
