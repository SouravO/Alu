import React from "react";

const Footer = () => (
  <footer className="flex justify-between items-center px-8 pb-6 text-[#88A9C3] text-sm bg-[#091235] py-6">
    <span style={{ fontFamily: "Montserrat, sans-serif" }}>
      © 2024 Acme Co. All rights reserved.
    </span>
    <div className="flex gap-8">
      <a
        href="#"
        className="hover:text-white transition"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Privacy
      </a>
      <a
        href="#"
        className="hover:text-white transition"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Terms
      </a>
    </div>
  </footer>
);

export default Footer;
