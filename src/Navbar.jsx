import React from "react";

const Navbar = () => (
  <nav
    className="flex justify-between items-center px-8 pt-6 text-[#88A9C3] text-base bg-[#091235]"
    style={{ fontFamily: "Montserrat, sans-serif" }}
  >
    <div className="flex gap-8">
      <a href="#" className="hover:text-white transition font-medium">
        Mission
      </a>
      <a href="#" className="hover:text-white transition font-medium">
        Technology
      </a>
    </div>
    <div className="flex-1 flex justify-center">
      <span className="rounded-full border-2 border-[#88A9C3] p-2">
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
      </span>
    </div>
    <div className="flex gap-8">
      <a href="#" className="hover:text-white transition font-medium">
        Careers
      </a>
      <a href="#" className="hover:text-white transition font-medium">
        Contact
      </a>
    </div>
  </nav>
);

export default Navbar;
