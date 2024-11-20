import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../api/users";
import { useUser } from "../../context/UserContext";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { login } = useUser();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email) {
      toast.error("Please enter email");
      return;
    }
    if (!credentials.password) {
      toast.error("Please enter password");
      return;
    }
    try {
      const response = await loginUser(credentials);
      if (response) {
        login(response);
        toast.success("Login Successfull");
        navigate("/");
      }
    } catch (err) {
      toast.error("Invalid email or password!");
      // setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out transform dark:bg-darkPrimary dark:text-darkText">
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-5 dark:text-blue-400">
        Welcome Back to Labzkit
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-darkBg dark:border-darkText dark:text-darkText transition duration-300 ease-in-out"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-darkBg dark:border-darkText dark:text-darkText transition duration-300 ease-in-out"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Log In
        </button>
        <p className="mt-5 text-center text-sm text-gray-600 dark:text-darkText">
          Don't have an account?{" "}
          <a
            onClick={() => navigate("/register")}
            className="text-blue-600 dark:text-blue-600 cursor-pointer"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  </div>  );
};

export default Login;
