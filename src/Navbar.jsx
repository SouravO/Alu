import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="flex justify-between items-center px-8 pt-6 text-[#88A9C3] text-base bg-[#091235]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="flex gap-8">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-white font-medium"
              : "hover:text-white transition font-medium"
          }
        >
          About Us
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive
              ? "text-white font-medium"
              : "hover:text-white transition font-medium"
          }
        >
          Services
        </NavLink>
      </div>
      <div className="flex-1 flex justify-center">
        <Link
          to="/"
          className="rounded-full border-2 border-[#88A9C3] p-2 hover:border-white transition"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="14" cy="14" r="12" stroke="#88A9C3" strokeWidth="2" />
            <path
              d="M14 8v12M8 14h12"
              stroke="#88A9C3"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Link>
      </div>
      <div className="flex gap-8">
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "text-white font-medium"
              : "hover:text-white transition font-medium"
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-white font-medium"
              : "hover:text-white transition font-medium"
          }
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
