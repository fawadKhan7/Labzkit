import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create Context for User
const UserContext = createContext();

// Custom Hook to use UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component to wrap the App and provide the user state
export const UserProvider = ({ children }) => {
  // Get initial state from localStorage or set to null by default
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(() => {
    const storedIsAdmin = localStorage.getItem("isAdmin");
    return storedIsAdmin ? JSON.parse(storedIsAdmin) : false;
  });

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken || null;
  });

  useEffect(() => {
    // This effect will run on mount and reset the user state if needed
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Store user data
    }
    if (isAdmin !== false) {
      localStorage.setItem("isAdmin", JSON.stringify(isAdmin)); // Store isAdmin
    }
    if (token) {
      localStorage.setItem("token", token); // Store token
    }
  }, [user, isAdmin, token]);

  const login = (userData) => {
    setUser(userData.user);
    setIsAdmin(userData.isAdmin);
    setToken(userData.token);
    // Store userData and token in localStorage
    localStorage.setItem("user", JSON.stringify(userData.user));
    localStorage.setItem("isAdmin", JSON.stringify(userData.isAdmin));
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    setToken(null);
    // Remove all stored user-related data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    navigate('/login')
  };

  return (
    <UserContext.Provider value={{ user, token, isAdmin, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
