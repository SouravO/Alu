import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import AboutUs from "./AboutUs";
import Footer from "./Footer";
import ContactUs from "./ContactUs";
import OurServices from "./OurServices";

const App = () => {
  return (
    <div className="min-h-screen bg-[#091235] text-white flex flex-col justify-between">
      <Navbar />
      <Hero />
      <AboutUs />
      <ContactUs />
      <OurServices />
      <Footer />
    </div>
  );
};

export default App;
