"use client";

import React from "react";

const CustomSelect = ({
  name,
  label,
  value,
  onChange,
  options = [],
  helperText,
  ...other
}) => {
  return (
    <div className="relative w-full">
      {/* Label */}
      <label
        htmlFor={name}
        className="block text-sm  text-gray-700 mb-1"
      >
        {label}
      </label>

      {/* Select Dropdown */}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 text-sm text-gray-500 border-b-2 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#00A76F] focus:border-[#00A76F] ${
          helperText ? "border-red-500" : ""
        }`}
        {...other}
      >
        {/* Placeholder */}
        <option value="" disabled>
          {label}
        </option>

        {/* Options */}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Error Message */}
      {helperText && <p className="text-xs text-red-500 mt-1">{helperText}</p>}
    </div>
  );
};

export default CustomSelect;
