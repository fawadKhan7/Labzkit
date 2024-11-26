import axios from "./network";

// Get all categories
export const getCategories = async (name) => {
  try {
    const response = await axios.get("/categories", {
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Create a category
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post("/categories", categoryData);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (id,categoryData) => {
  try {
    const response = await axios.put(`/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

// Delete a category
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    // throw error;
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting category:", error);
    // throw error;
  }
};
