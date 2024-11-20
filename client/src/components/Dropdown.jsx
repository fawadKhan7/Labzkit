"use client";

import { Dropdown } from "flowbite-react";
import { NavLink } from "react-router-dom";

const CategoryDropdown = ({categories}) => {


  return (
    <Dropdown
      label={
        <span className="text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor text-gray-500">
          Categories
        </span>
      }
      dismissOnClick={false}
      inline
      className="!"
    >
        {categories?.slice(0, 4).map((category) => (

      <NavLink to={`/products/${category?._id}`}>
        <Dropdown.Item className="bg-white">{category?.name}</Dropdown.Item>
      </NavLink>
        ))}
    </Dropdown>
  );
};

export default CategoryDropdown;
