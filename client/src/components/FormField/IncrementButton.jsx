"use client";

import React from "react";

const IncrementerInput = ({ quantity, onQuantityChange, maxQuantity }) => {
  const handleInputChange = (event) => {
    const value = event.target.value;

    // Allow empty string for clearing the input
    if (value === "") {
      onQuantityChange("");
      return;
    }

    const numericValue = parseInt(value, 10);

    if (!isNaN(numericValue) && numericValue <= maxQuantity) {
      onQuantityChange(numericValue);
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        className="w-36 text-center text-sm py-1 px-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#00A76F] focus:border-[#00A76F] transition-all duration-300"
        placeholder="Enter quantity"
      />
    </div>
  );
};

export default IncrementerInput;
