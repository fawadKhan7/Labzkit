import axios from "./network";

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post("/users/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Forgot password
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post("/users/forget-password", { email });
    return response.data;
  } catch (error) {
    console.error("Error requesting password reset:", error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (token, password) => {
  try {
    const response = await axios.put(`/users/reset-password/${token}`, {
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};
