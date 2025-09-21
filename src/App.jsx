import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./Hero";
import AboutUs from "./AboutUs";
import Footer from "./Footer";
import ContactUs from "./ContactUs";
import OurServices from "./OurServices";
import Products from "./Products";

// Homepage component that combines multiple sections
const HomePage = () => (
  <>
    <Hero />
    <AboutUs />
    <ContactUs />
    <OurServices />
  </>
);

// About page component
const AboutPage = () => <AboutUs />;

// Contact page component
const ContactPage = () => <ContactUs />;

// Services page component
const ServicesPage = () => <OurServices />;

const App = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#091235] text-white flex flex-col justify-between">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
