// Multi Select Component
import { useFormContext, Controller } from "react-hook-form";
import {
  Box,
  Chip,
  Checkbox,
  InputLabel,
  FormControl,
  OutlinedInput,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";

export function CustomeMultiSelect({
  name,
  chip,
  label,
  options = [], // Dynamically passed options
  checkbox,
  placeholder,
  helperText,
  sx,
  onChange, // Function to handle dynamic changes
  value, // External value control
  ...other
}) {
  const { control } = useFormContext();

  const renderValues = (selectedIds) => {
    const selectedItems = options.filter((item) =>
      selectedIds.includes(item.value)
    );

    if (!selectedItems.length && placeholder) {
      return (
        <Box component="em" sx={{ color: "text.disabled" }}>
          {placeholder}
        </Box>
      );
    }

    if (chip) {
      return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {selectedItems.map((item) => (
            <Chip key={item.value} size="small" label={item.label} />
          ))}
        </Box>
      );
    }

    return selectedItems.map((item) => item.label).join(", ");
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl sx={sx}>
          {label && <InputLabel id={name}>{label}</InputLabel>}

          <Select
            {...field}
            value={value || field.value} // Use external value if provided
            multiple
            displayEmpty={!!placeholder}
            labelId={name}
            input={<OutlinedInput fullWidth label={label} error={!!error} />}
            renderValue={renderValues}
            onChange={(e) => {
              field.onChange(e); // Hook into react-hook-form's field value
              if (onChange) onChange(e); // Execute the external onChange function (if provided)
            }}
            {...other}
          >
            {placeholder && (
              <MenuItem disabled value="">
                <em>{placeholder}</em>
              </MenuItem>
            )}

            {options.map((option) => {
              const selected = field.value.includes(option.value);

              return (
                <MenuItem key={option.value} value={option.value}>
                  {checkbox && (
                    <Checkbox size="small" disableRipple checked={selected} />
                  )}
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>
              {error ? error.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
