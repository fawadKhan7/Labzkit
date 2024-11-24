import React, { useEffect, useState } from "react";
import { getProductById } from "../api/products";
import { getCategories } from "../api/categories";
import {
  availableSizes,
  availableColors,
  genders,
} from "../data/selectFieldsData";
import { getImageUrl } from "../utils/functions";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { Delete as DeleteIcon } from "@mui/icons-material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ProductUpdateModal({ productId, onClose, onSave }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    discountedPrice: 0,
    quantity: "",
    size: [],
    color: [],
    gender: "",
    description: "",
  });
  const [fileList, setFileList] = useState([]); // To store selected files

  // Fetch product and category data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductById(productId);
        if (response) {
          setProductData({ ...response, category: response?.category?._id });
          if (response.images) {
            setFileList(
              response.images.map((image, index) => ({
                uid: `image-${Date.now()}-${index}`, // Ensure unique UID for each image
                name: image.name,
                status: "done",
                url: getImageUrl(image),
                originFileObj: image, // Store the original image data
              }))
            );
          }
        }
      } catch (error) {
        toast.error("Error fetching data");
      }
    };
    fetchData();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSizeChange = (size) => {
    setProductData((prevProduct) => ({
      ...prevProduct,
      size: prevProduct.size.includes(size)
        ? prevProduct.size.filter((s) => s !== size)
        : [...prevProduct.size, size],
    }));
  };

  const handleColorChange = (color) => {
    setProductData((prevProduct) => ({
      ...prevProduct,
      color: prevProduct.color.includes(color)
        ? prevProduct.color.filter((c) => c !== color)
        : [...prevProduct.color, color],
    }));
  };

  const handleCancel = () => {
    onClose(); // Close modal on cancel
  };

  const fetchCategories = async () => {
    const response = await getCategories().then((res) => {
      let data = res.map((elem) => ({
        label: elem?.name,
        value: elem?._id,
      }));
      setCategories(data);
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file, index) => ({
      uid: `file-${Date.now()}-${index}`, // Ensure unique UID for each new file
      name: file.name,
      status: "done",
      url: URL.createObjectURL(file), // Temporary URL for preview
      originFileObj: file, // Store the original file object
    }));

    // Check the number of files after adding new ones
    if (fileList.length + newFiles.length <= 5) {
      setFileList((prevList) => [...prevList, ...newFiles]);
    } else {
      toast.error("You can upload a maximum of 5 images.");
    }
  };

  // To handle removal of files properly:
  const handleRemoveImage = (file) => {
    setFileList((prevList) => prevList.filter((elem) => elem.uid !== file.uid)); // Only remove the clicked file by UID
  };
  const handleDescriptionChange = (value) => {
    setProductData((prevData) => ({
      ...prevData,
      description: value, // Update description field with the HTML content
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productData.name) {
      toast.error("Product name is required");
      return;
    }
    if (!productData.category) {
      toast.error("Product category is required");
      return;
    }
    if (
      !productData.price ||
      isNaN(productData.price) ||
      parseFloat(productData.price) <= 0
    ) {
      toast.error("Please enter a valid price");
      return;
    }
    if (
      !productData.discountedPrice ||
      isNaN(productData.discountedPrice) ||
      parseFloat(productData.discountedPrice) <= 0
    ) {
      toast.error("Please enter a valid discounted price");
      return;
    }
    if (
      !productData.quantity ||
      isNaN(productData.quantity) ||
      parseInt(productData.quantity) <= 0
    ) {
      toast.error("Please enter a valid quantity");
      return;
    }
    if (!productData.size || productData.size.length === 0) {
      toast.error("Please select at least one size");
      return;
    }
    if (!productData.color || productData.color.length === 0) {
      toast.error("Please select at least one color");
      return;
    }
    if (!productData.gender) {
      toast.error("Please select a gender");
      return;
    }
    if (!productData.description) {
      toast.error("Product description is required");
      return;
    }
    

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("category", productData.category);
    formData.append("price", productData.price);
    formData.append("discountedPrice", productData.discountedPrice);
    formData.append("quantity", productData.quantity);
    formData.append("size", JSON.stringify(productData.size));
    formData.append("color", JSON.stringify(productData.color));
    formData.append("gender", productData.gender);
    formData.append("description", productData.description);
    if (fileList.length > 0) {
      fileList.forEach((file) => {
        formData.append("images", file.originFileObj);
      });
    } else {
      formData.append("images", JSON.stringify([]));
    }

    setIsLoading(true);
    try {
      await onSave(productId, formData);
    } catch (error) {
      toast.error("Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 py-6">
      <div className="bg-white p-6 shadow-lg w-full rounded-xl max-w-2xl max-h-[80vh] overflow-auto sm:w-3/4">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Edit Product
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="file-upload"
            />
            <Button variant="contained" component="label" htmlFor="file-upload">
              Upload Images
            </Button>
            <Box display="flex" gap={2} mt={2}>
              {fileList.map((file) => (
                <Box
                  key={file.uid}
                  position="relative"
                  width="100px"
                  height="100px"
                >
                  <img
                    src={file.url}
                    alt={file.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    onClick={() => handleRemoveImage(file)}
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
          </div>

          {/* Product Name */}
          <TextField
            name="name"
            label="Product Name"
            value={productData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          {/* Category */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              label="Category"
            >
              {categories.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Price, Discounted Price, Quantity Inputs */}
          <TextField
            name="price"
            label="Price"
            type="number"
            value={productData.price}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="discountedPrice"
            label="Discounted Price"
            type="number"
            value={productData.discountedPrice}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="quantity"
            label="Quantity"
            type="number"
            value={productData.quantity}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          {/* Size Selection */}
          <Box mb={2}>
            <label className="block mb-2">Size:</label>
            {availableSizes.map((size) => (
              <FormControlLabel
                key={size}
                control={
                  <Checkbox
                    checked={productData.size.includes(size)}
                    onChange={() => handleSizeChange(size)}
                  />
                }
                label={size}
              />
            ))}
          </Box>

          {/* Color Selection */}
          <Box mb={2}>
            <label className="block mb-2">Color:</label>
            {availableColors.map((color) => (
              <FormControlLabel
                key={color}
                control={
                  <Checkbox
                    checked={productData.color.includes(color)}
                    onChange={() => handleColorChange(color)}
                  />
                }
                label={color}
              />
            ))}
          </Box>

          {/* Gender Selection */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={productData.gender}
              onChange={handleInputChange}
              label="Gender"
            >
              {genders.map((gender) => (
                <MenuItem key={gender} value={gender}>
                  {gender}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Description */}
          <ReactQuill
            theme="snow"
            value={productData.description}
            onChange={(value) => handleDescriptionChange(value)}
            style={{ height: "150px", marginBottom: "1em" }}
          />
          {/* Actions */}
          <Box display="flex" justifyContent="space-between" mt={8}>
            <Button variant="outlined" color="gray" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
}

export default ProductUpdateModal;
