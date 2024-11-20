import { toast } from "react-toastify";
import axios from "./network";

// Get all products
export const getProducts = async () => {
  try {
    const response = await axios.get("/products");
    return response.data;
  } catch (error) {
    toast.error("Error fetching products");
    throw error;
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
    throw error;
  }
};
// Get product by ID
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching product by ID");
    throw error;
  }
};

// Create a product
export const createProduct = async (productData) => {
  try {
    const response = await axios.post("/products", productData);
    return response.data;
  } catch (error) {
    toast.error("Error creating product");
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`/products/update/${id}`, productData);
    return response.data;
  } catch (error) {
    toast.error("Error updated product");
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    toast.error("Error deleting product");
    throw error;
  }
};
