"use client";

import React from "react";

const GenderDropdown = ({ genderFilter, setGenderFilter, genders }) => {
  return (
    <div className="relative w-full sm:w-48">
      {/* Dropdown Select */}
      <select
        value={genderFilter}
        onChange={(e) => setGenderFilter(e.target.value)}
        className="w-full px-4 py-1 text-sm text-gray-500 border-b-2 border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#00A76F] focus:border-[#00A76F] transition-all duration-300"
      >
        <option value="">All Genders</option>
        {genders.map((elem) => (
          <option key={elem} value={elem}>
            {elem}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenderDropdown;
