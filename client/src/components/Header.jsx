import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // Import the useCart hook
import { useUser } from "../context/UserContext";
import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { FaShoppingCart, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import BgGradient from "../assets/header-bg.png";
import CategoryDropdown from "./Dropdown";
import { getCategories } from "../api/categories";

const Header = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu toggle

  const { cartLength } = useCart();
  const { user, token, isAdmin, logout } = useUser();
  const headerRef = useRef(null);

  // Fetch categories
  const fetchCategories = async () => {
    const response = await getCategories();
    setCategoriesData(response);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      ref={headerRef}
      className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-sans min-h-[70px] tracking-wide relative z-50"
    >
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        {/* Logo */}
        <NavLink to="/">
          <div className="bg-black w-36 py-2 px-4 text-white flex justify-center font-barrio">LabzKit</div>
        </NavLink>

        {/* Navigation */}
        <div
          className={`lg:block ${
            isMenuOpen ? "max-lg:block" : "max-lg:hidden"
          }`}
        >
          <button
            id="toggleClose"
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 fill-black"
              viewBox="0 0 320.591 320.591"
            >
              <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
              <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
            </svg>
          </button>

          <ul
            className={`lg:flex  gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 ${
              isMenuOpen ? "max-lg:block" : "max-lg:hidden"
            }`}
          >
            <li className="max-lg:border-b  leading-7 font-[500] border-gray-300 max-lg:py-3 px-3">
              <NavLink
                to="/"
                className="hover:text-blue-500 text-gray-500 text-[15px]"
              >
                Home
              </NavLink>
            </li>
            <li className="max-lg:border-b  leading-7 font-[500] border-gray-300 max-lg:py-3 px-3">
              <NavLink
                to="/about-us"
                className="hover:text-blue-500 text-gray-500 text-[15px]"
              >
                About
              </NavLink>
            </li>
            <li className="max-lg:border-b  leading-7 font-[500] border-gray-300 max-lg:py-3 px-3">
              <NavLink
                to="/contact-us"
                className="hover:text-blue-500 text-gray-500 text-[15px]"
              >
                Contact
              </NavLink>
            </li>
            <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
              <CategoryDropdown categories={categoriesData} />
            </li>
          </ul>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4 max-lg:ml-auto space-x-3">
          {token && user ? (
            <>
              {!isAdmin && (
                <NavLink to="/cart" className="relative">
                  <FaShoppingCart className="text-xl hover:text-blue-300" />
                  <span className="absolute top-2 left-4 px-[6px] rounded-full bg-red-500 text-white text-xs">
                    {cartLength}
                  </span>
                </NavLink>
              )}
              {isAdmin && (
                <NavLink to="/admin/products/">
                  <FaUserAlt className="text-xl hover:text-blue-300" />
                </NavLink>
              )}
              <button
                onClick={logout}
                className="px-4 py-2 text-sm rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <button className="px-4 py-2 text-sm rounded-full text-white bg-blue-500 hover:bg-blue-600">
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button className="px-4 py-2 text-sm rounded-full text-white bg-green-500 hover:bg-green-600">
                  Sign Up
                </button>
              </NavLink>
            </>
          )}
          <button
            id="toggleOpen"
            onClick={toggleMenu}
            className="lg:hidden p-2 bg-gray-100 rounded-md"
          >
            <BiMenu className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
