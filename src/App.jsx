import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Hero from "./Hero";
import AboutUs from "./AboutUs";
import Footer from "./Footer";
import ContactUs from "./ContactUs";
import OurServices from "./OurServices";
import Products from "./Products";
import ModelViewer from "./model/ModelViewer";
import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "./components/ScrollToTop";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";

// Homepage component that combines multiple sections
const HomePage = () => (
  <>
    <Hero />
    <AboutUs />
    <OurServices />
    <ContactUs />
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
    <MainLayout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
