import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const ProductForm = ({
  product,
  categories,
  genders,
  availableSizes,
  availableColors,
  handleInputChange,
  handleProductImageChange,
  handleSizeChange,
  handleColorChange,
  productImageFiles,
  removeImage,
  handleDescriptionChange
}) => {
  return (
    <Grid container spacing={2}>
      {/* Product Images */}
      <Grid item xs={12} sm={8} marginInline={"auto"}>
        <Box>
          <Typography variant="subtitle1" mb={2}>
            Product Images:
          </Typography>
          {/* Display uploaded images */}
          <Box display="flex" gap={2} mb={2}>
            {productImageFiles.map((file, index) => (
              <Box
                key={index}
                position="relative"
                width={80}
                height={80}
                border="1px solid #ccc"
                borderRadius="8px"
                overflow="hidden"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  onClick={() => removeImage(index)}
                  size="small"
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>

          {/* Upload new images */}
          <Button
            variant="outlined"
            component="label"
            disabled={productImageFiles.length >= 5}
          >
            Upload Images
            <input
              type="file"
              accept="image/*"
              hidden
              multiple
              onChange={handleProductImageChange}
              disabled={productImageFiles.length >= 5}
            />
          </Button>

          {productImageFiles.length >= 5 && (
            <Typography variant="body2" color="error" mt={1}>
              You can upload a maximum of 5 images.
            </Typography>
          )}
        </Box>
      </Grid>

      {/* Form Fields */}
      <Grid item xs={12} sm={8} marginInline={"auto"}>
        <Grid container spacing={2}>
          {/* Product Name */}
          <Grid item xs={12}>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </Grid>

          {/* Category */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" mb={1}>
              Category:
            </Typography>
            <Select
              name="category"
              value={product.category}
              onChange={handleInputChange}
              fullWidth
            >
              <MenuItem value="">Select Category</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          {/* Price */}
          <Grid item xs={12} sm={6}>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </Grid>

          {/* Discounted Price */}
          <Grid item xs={12} sm={6}>
            <input
              type="number"
              name="discountedPrice"
              value={product.discountedPrice}
              onChange={handleInputChange}
              placeholder="Discounted Price"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </Grid>

          {/* Quantity */}
          <Grid item xs={12}>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </Grid>

          {/* Sizes */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" mb={1}>
              Size:
            </Typography>
            <Box display="flex" gap={2}>
              {availableSizes.map((size) => (
                <FormControlLabel
                  key={size}
                  control={
                    <Checkbox
                      checked={product.size.includes(size)}
                      onChange={() => handleSizeChange(size)}
                    />
                  }
                  label={size}
                />
              ))}
            </Box>
          </Grid>

          {/* Colors */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" mb={1}>
              Color:
            </Typography>
            <Box display="flex" gap={2}>
              {availableColors.map((color) => (
                <FormControlLabel
                  key={color}
                  control={
                    <Checkbox
                      checked={product.color.includes(color)}
                      onChange={() => handleColorChange(color)}
                    />
                  }
                  label={color}
                />
              ))}
            </Box>
          </Grid>

          {/* Gender */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" mb={1}>
              Gender:
            </Typography>
            <Select
              name="gender"
              value={product.gender}
              onChange={handleInputChange}
              fullWidth
            >
              <MenuItem value="">Select Gender</MenuItem>
              {genders.map((gen) => (
                <MenuItem key={gen} value={gen}>
                  {gen}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" mb={1}>
              Product Description:
            </Typography>
            <ReactQuill
              value={product.description}
              onChange={handleDescriptionChange}
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline"],
                  ["link"],
                  [{ align: [] }],
                  ["image"],
                  ["blockquote", "code-block"],
                ],
              }}
              placeholder="Enter product description"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductForm;
