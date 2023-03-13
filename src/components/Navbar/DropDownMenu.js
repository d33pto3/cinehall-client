import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const DropdownMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { _id, role, name } = user.user || {};

  let goto = "";

  if (role === "admin") {
    goto = `/admin/${_id}`;
  }
  if (role === "user") {
    goto = `/user/${_id}`;
  }

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    // console.log(`Selected option: ${option}`);
    setIsOpen(false);
  };

  return (
    <div className="relative z-20">
      <Link
        className="text-gray-800 font-semibold py-2 px-4 inline-flex items-center"
        onClick={handleToggle}
      >
        <FaUser className="text-white" />
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M6.928 8.464l3.536-3.536a2 2 0 012.828 0l3.536 3.536a2 2 0 010 2.828l-3.536 3.536a2 2 0 01-2.828 0l-3.536-3.536a2 2 0 010-2.828z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Link>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
          <Link
            to={goto}
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
            onClick={() => handleSelect("Option 1")}
          >
            <span>{name}</span>
          </Link>
          {/* <Link
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
            onClick={() => handleSelect("Option 3")}
          >
            Option 3
          </Link> */}
          <Link
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
            onClick={() => handleSelect("Option 2")}
          >
            <Logout />
          </Link>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
