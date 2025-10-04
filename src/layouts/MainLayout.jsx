import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Silk from "../components/Silk";
import WhatsAppButton from "../components/WhatsAppButton";

/**
 * Main layout component that provides consistent structure across all pages
 * with Navbar and Footer components. Shows Silk background only on home page.
 */
const MainLayout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="relative min-h-screen">
      {/* Silk background - only on home page */}
      {isHomePage && (
        <div className="fixed inset-0 z-0">
          <Silk
            speed={5}
            scale={1}
            color="#7B7481"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>
      )}

      {/* Content layer */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
      </div>

      {/* WhatsApp floating button */}
      <WhatsAppButton />
    </div>
  );
};

export default MainLayout;
