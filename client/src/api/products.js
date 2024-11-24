import { toast } from "react-toastify";
import axios from "./network";

// Get all products
export const getProducts = async (
  name = "",
  gender = "",
  page = 1,
  limit = 10
) => {
  try {
    const response = await axios.get("/products", {
      params: { name, gender, page, limit },
    });
    return response.data;
  } catch (error) {
    toast.error("Error fetching products");
  }
};

export const getProductsByCategory = async (
  categoryId,
  name = "",
  gender = ""
) => {
  try {
    const response = await axios.get(`/products/category/${categoryId}`, {
      params: { name, gender },
    });
    return response.data;
  } catch (error) {
    toast.error("Error fetching products by category");
  }
};
// Get product by ID
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching product by ID");
  }
};

// Create a product
export const createProduct = async (productData) => {
  try {
    const response = await axios.post("/products", productData);
    return response.data;
  } catch (error) {
    toast.error("Error creating product");
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`/products/update/${id}`, productData);
    return response.data;
  } catch (error) {
    toast.error("Error updated product");
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    toast.error("Error deleting product");
  }
};
