import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Dummy credentials check
    if (username === "admin" && password === "password") {
      localStorage.setItem("isAdmin", "true"); // Store login status
      navigate("/admin/products"); // Redirect to product list page
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-DarkPrimary transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Admin Login
        </h2>
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-200"
          />
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-6">
          Only authorized users are allowed to access.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
