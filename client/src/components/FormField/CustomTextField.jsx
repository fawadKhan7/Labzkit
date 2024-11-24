import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CustomTextField = ({ name, label, type = "text", methods }) => {
  const { control } = methods;
  const [showPassword, setShowPassword] = useState(false); 

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative">
          <input
            {...field}
            id={name}
            type={type === "password" && !showPassword ? "password" : "text"} // Toggle between password and text type
            placeholder={label}
            className={` mt-1 block w-full px-3 py-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
          {type === "password" && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
                sx={{
                  position: "absolute",
                  right: 10,
                  top: 2,
                }}
              >
                {showPassword ? (
                  <VisibilityOff sx={{ fontSize: "18px" }} />
                ) : (
                  <Visibility sx={{ fontSize: "18px" }} />
                )}
              </IconButton>
            </InputAdornment>
          )}
          {error && (
            <p className="mt-1 text-sm text-red-600">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default CustomTextField;
