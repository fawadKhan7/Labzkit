import React from "react";
import { Select, MenuItem, InputLabel, FormControl, FormHelperText } from "@mui/material";

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
    <FormControl fullWidth size="small" error={!!helperText}>
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        labelId={name}
        value={value}
        onChange={onChange}
        label={label}
        {...other}
      >
        {/* Placeholder */}
        <MenuItem value="" disabled>
          {label}
        </MenuItem>
        
        {/* Options */}
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelect;
