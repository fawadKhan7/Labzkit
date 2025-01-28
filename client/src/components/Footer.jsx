import React, { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { getCategories } from "../api/categories";
import Amex from "../assets/amex.svg";
import Discover from "../assets/discover.svg";
import Mastercard from "../assets/mastercard.svg";
import Paypal from "../assets/paypal.svg";
import Stripe from "../assets/stripe.svg";
import Visa from "../assets/visa.svg";
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
    <footer className="bg-white  py-6 px-9 border-t border-gray-300">
      <div className="text-sm container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/about-us"
                className="hover:underline transition-all duration-300"
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact-us"
                className="hover:underline transition-all duration-300"
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold mb-4">Categories</h3>
          <ul className="space-y-2">
            {categoriesData?.slice(0, 4).map((category) => (
              <li key={category._id}>
                <NavLink
                  to={`/products/${category._id}`}
                  className="hover:underline transition-all duration-300"
                >
                  {category?.name}
                </NavLink>
              </li>
            ))}
          </ul>{" "}
        </div>

        {/* Social Media & Contact */}
        <div>
          <h3 className="text-sm font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 text-sm">
            <a
              href="https://www.facebook.com/people/LabzKit/61568475466063"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-sm hover:underline transition-all duration-300" />
            </a>
            <a
              href="https://www.instagram.com/labzkit/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-sm hover:underline transition-all duration-300" />
            </a>
          </div>
          <div className="mt-4">
            <a href="mailto: labzkit@gmail.com" className="mt-8 text-gray-400">
              labzkit@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="text-sm mt-8 text-center text-gray-400">
        &copy; {new Date().getFullYear()} Uniform Store. All rights reserved.
      </div>
      {/* Payment Icons */}
      <div className="flex justify-end md:space-x-6 space-x-4 my-2">
        <img src={Amex} className="h-8 w-8" alt="Amex" />
        <img src={Discover} className="h-8 w-8" alt="Discover" />
        <img src={Mastercard} className="h-8 w-8" alt="Mastercard" />
        <img src={Paypal} className="h-8 w-8" alt="Paypal" />
        <img src={Stripe} className="h-8 w-8" alt="Stripe" />
        <img src={Visa} className="h-8 w-8" alt="Visa" />
      </div>
    </footer>
  );
};

export default Footer;
