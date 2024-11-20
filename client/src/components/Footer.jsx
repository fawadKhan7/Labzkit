import React, { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { getCategories } from "../api/categories";

const Footer = () => {
  const [categoriesData, setCategoriesData] = useState([]);

  const fetchCategories = async (name) => {
    const response = await getCategories(name);
    setCategoriesData(response);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <footer className="bg-gray-800 text-white py-6 px-9 border-t border-gray-300">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/about-us" className="hover:text-blue-300">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact-us" className="hover:text-blue-300">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2">
            {categoriesData?.slice(0, 4).map((category) => (
              <li key={category._id}>
                <NavLink
                  to={`/products/${category._id}`}
                  className="hover:text-blue-300"
                >
                  {category?.name}
                </NavLink>
              </li>
            ))}
          </ul>{" "}
        </div>

        {/* Social Media & Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://www.facebook.com/people/LabzKit/61568475466063"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-xl hover:text-blue-300" />
            </a>
            <a
              href="https://www.instagram.com/labzkit/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-xl hover:text-blue-300" />
            </a>
          </div>
          <div className="mt-4">
            <a href="mailto: labzkit@gmail.com" className="mt-8 text-gray-400">
              labzkit@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400">
        &copy; {new Date().getFullYear()} Uniform Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
