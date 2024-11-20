import axios from './network';

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post('/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// // Get the authenticated user details
// export const getUserDetails = async () => {
//   try {
//     const response = await axios.get('/users/me');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     throw error;
//   }
// };
