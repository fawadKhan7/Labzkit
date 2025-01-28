// components/InputField.js
import React from "react";

const InputField = ({ label, id, type, register, error, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className="w-full mt-2 p-1 px-2 text-[12px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A76F]"
        {...register(id)}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
