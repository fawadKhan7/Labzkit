import axios from "./network";

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post("/orders/create", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};
