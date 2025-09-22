import React from "react";
import foodContainerGif from "./assets/food-container.gif";
import takeoutpackingGif from "./assets/Takeout-Packaging.gif";
import customSolutionsGif from "./assets/custom-solutions.gif";
import mealPrepTraysGif from "./assets/meal-preparation.gif";
import sustainablePackagingGif from "./assets/Sustainable-Packaging.gif";
import wholesaleSupplyGif from "./assets/Wholesale-Supply.gif";
const services = [
  {
    id: 1,
    title: "Food Containers",
    description:
      "Premium aluminum food containers for restaurants, catering, and food delivery services with superior heat retention.",
    icon: (
      <img src={foodContainerGif} alt="Food Container" className="w-10 h-10" />
    ),
  },
  {
    id: 2,
    title: "Takeout Packaging",
    description:
      "Eco-friendly aluminum takeout containers that maintain food quality while being fully recyclable and sustainable.",
    icon: (
      <img
        src={takeoutpackingGif}
        alt="Takeout Packaging"
        className="w-10 h-10"
      />
    ),
  },
  {
    id: 3,
    title: "Custom Solutions",
    description:
      "Tailored aluminum packaging designed to your exact specifications for unique food presentations and branding.",
    icon: (
      <img
        src={customSolutionsGif}
        alt="Custom Solutions"
        className="w-10 h-10"
      />
    ),
  },
  {
    id: 4,
    title: "Meal Prep Trays",
    description:
      "Compartmentalized aluminum trays perfect for portion control, meal prep services, and institutional food service.",
    icon: (
      <img src={mealPrepTraysGif} alt="Meal Prep Trays" className="w-10 h-10" />
    ),
  },
  {
    id: 5,
    title: "Sustainable Packaging",
    description:
      "100% recyclable aluminum containers that reduce environmental impact while maintaining food freshness and quality.",
    icon: (
      <img
        src={sustainablePackagingGif}
        alt="Sustainable Packaging"
        className="w-10 h-10"
      />
    ),
  },
  {
    id: 6,
    title: "Wholesale Supply",
    description:
      "Bulk aluminum container solutions for food businesses with flexible ordering options and reliable delivery.",
    icon: (
      <img
        src={wholesaleSupplyGif}
        alt="Wholesale Supply"
        className="w-10 h-10"
      />
    ),
  },
];

const OurServices = () => {
  return (
    <section className="min-h-screen bg-[#0a0a0a] text-[#f8f8f8] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-5xl md:text-6xl font-bold mb-6"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          <span className="text-[#f8f8f8]">Our </span>
          <span className="text-[#f8f8f8]">Aluminium Packaging</span>
        </h1>

        <p
          className="text-[#f8f8f8] mb-16 text-xl max-w-3xl"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Premium food-grade aluminium containers that combine quality,
          sustainability, and functionality for all your food packaging needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <div key={service.id} className="flex space-x-6">
              <div className="flex-shrink-0">
                <div className="text-[#f8f8f8] bg-white bg-opacity-5 p-3 rounded-md">
                  {service.icon}
                </div>
              </div>
              <div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-[#f8f8f8]"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
