import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when a link is clicked
  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-8 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-black bg-opacity-70 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center justify-center flex-1 gap-8 text-[#f8f8f8] text-base">
        {/* home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white font-medium"
              : "hover:text-white transition font-medium"
          }
        >
          Home
        </NavLink>
        {/* about  */}
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

        {/* Quick contact button */}
        <a
          href="tel:+919020229988"
          className="bg-[#6e6e73] hover:bg-[#f8f8f8] hover:text-black text-white py-1 px-4 rounded-full transition-all text-sm flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z"
            />
          </svg>
          +91 9020229988
        </a>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-[#f8f8f8] focus:outline-none transition-colors hover:text-white p-2"
          aria-label="Toggle menu"
        >
          {!mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Backdrop for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
          style={{ top: "60px" }}
        />
      )}

      {/* Mobile Menu (Collapsible) */}
      <div
        className={`absolute top-full left-0 right-0 bg-[#6e6e73] shadow-lg transition-all duration-300 ease-in-out z-50 ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        } md:hidden`}
      >
        <div className="flex flex-col py-4 px-8 space-y-4 text-[#6e6e73]">
          {/* home */}
          <NavLink
            to="/"
            onClick={handleNavLinkClick}
            className={({ isActive }) =>
              isActive
                ? "text-white font-medium py-2 border-b border-[#6e6e73]"
                : "hover:text-white transition font-medium py-2 border-b border-[#6e6e73]"
            }
          >
            Home
          </NavLink>
          {/* about */}
          <NavLink
            to="/about"
            onClick={handleNavLinkClick}
            className={({ isActive }) =>
              isActive
                ? "text-white font-medium py-2 border-b border-[#6e6e73]"
                : "hover:text-white transition font-medium py-2 border-b border-[#6e6e73]"
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/services"
            onClick={handleNavLinkClick}
            className={({ isActive }) =>
              isActive
                ? "text-white font-medium py-2 border-b border-[#6e6e73]"
                : "hover:text-white transition font-medium py-2 border-b border-[#6e6e73]"
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/products"
            onClick={handleNavLinkClick}
            className={({ isActive }) =>
              isActive
                ? "text-white font-medium py-2 border-b border-[#6e6e73]"
                : "hover:text-white transition font-medium py-2 border-b border-[#6e6e73]"
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/contact"
            onClick={handleNavLinkClick}
            className={({ isActive }) =>
              isActive
                ? "text-white font-medium py-2"
                : "hover:text-white transition font-medium py-2"
            }
          >
            Contact
          </NavLink>

          {/* Add quick contact in mobile menu */}
          <a
            href="tel:+919020229988"
            className="text-white font-medium py-2 border-b border-[#6e6e73] flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z"
              />
            </svg>
            Call Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
