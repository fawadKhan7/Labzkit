import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/users";
import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.firstName) {
      toast.error("Please enter first name.");
      return;
    }
    if (!user.lastName) {
      toast.error("Please enter last name.");
      return;
    }
    if (!user.email) {
      toast.error("Please enter email.");
      return;
    }
    if (!user.password) {
      toast.error("Please enter password.");
      return;
    }

    try {
      setLoading(true); // Set loading to true
      const response = await registerUser(user);
      if (response) {
        toast.success("Registration Successful");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.msg || "Registration Failed");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-darkBg">
      <div className="w-full max-w-md p-6 bg-white dark:bg-DarkPrimary rounded-lg shadow-lg transition-all duration-300 ease-in-out transform dark:text-darkText">
        <h2 className="text-2xl font-semibold text-center text-blue-600 dark:text-darkText mb-6">
          Welcome To Labzkit
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-4 gap-5 md:flex-row">
            <div className="w-full md:w-1/2">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={user.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-darkBg dark:text-darkText transition duration-300 ease-in-out"
              />
            </div>
            <div className="w-full md:w-1/2">
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={user.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-darkBg dark:text-darkText transition duration-300 ease-in-out"
              />
            </div>
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-darkBg dark:text-darkText transition duration-300 ease-in-out"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-darkBg dark:text-darkText transition duration-300 ease-in-out"
            />
          </div>
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className={`w-full py-2 rounded-md focus:outline-none transition-all duration-300 ease-in-out ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            }`}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
          <p className="mt-4 text-center text-darkText dark:text-darkText">
            Already have an account?{" "}
            <a
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline cursor-pointer dark:text-blue-400 transition-all duration-300 ease-in-out"
            >
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
