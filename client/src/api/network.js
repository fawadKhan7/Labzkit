import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../config";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: `${config.endpoint}/api`,
  timeout: 8000, // Timeout set to 8000ms
});

// Request interceptor to include JWT in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle timeouts and other errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Simply return the response for successful requests
  },
  (error) => {
    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      toast.error(
        "The request took too long to complete. Please check your connection or try again later."
      );
    } else if (error.response && error.response.status === 401) {
      toast.error("Your session has expired. Please log in again.");

      localStorage.removeItem("token"); // Remove expired token

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } 
    return Promise.reject(error);
  }
);

export default axiosInstance;
