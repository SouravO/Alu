import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Silk from "../components/Silk";

/**
 * Main layout component that applies a consistent Silk background to all pages
 * and includes the Navbar and Footer components
 */
const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      {/* Silk background - fixed position so it remains constant across all pages */}
      <div className="fixed inset-0 z-0">
        <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Content layer that sits above the background */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
