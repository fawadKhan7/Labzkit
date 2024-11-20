import { toast } from "react-toastify";
import axios from "./network";

// Get all images
export const getImages = async () => {
  try {
    const response = await axios.get("/images");
    return response.data;
  } catch (error) {
    toast.error("Error fetching images");
    throw error;
  }
};

// Upload new images
export const uploadImages = async (body) => {
  try {
    const response = await axios.post("/images", body);
    return response.data;
  } catch (error) {
    toast.error("Error uploading images");
    throw error;
  }
};

// Update images by ID
export const updateImages = async (id, body) => {
  try {
    const response = await axios.put(`/images/${id}`, body);
    return response.data;
  } catch (error) {
    toast.error("Error updating images");
    throw error;
  }
};

// Delete images by ID
export const deleteImages = async (id) => {
  try {
    const response = await axios.delete(`/images/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Error deleting image");
    throw error;
  }
};
