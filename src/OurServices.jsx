import React from "react";

const services = [
  {
    id: 1,
    title: "Food Containers",
    description:
      "Premium aluminum food containers for restaurants, catering, and food delivery services with superior heat retention.",
    icon: (
      <svg
        className="w-10 h-10 text-[#f5a742]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 15.9999V7.9999C21 6.8954 20.1046 5.9999 19 5.9999H5C3.89543 5.9999 3 6.8954 3 7.9999V15.9999M21 15.9999C21 17.1045 20.1046 17.9999 19 17.9999H5C3.89543 17.9999 3 17.1045 3 15.9999M21 15.9999L21 19.9999M3 15.9999L3 19.9999M12 11.9999H12.01"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Takeout Packaging",
    description:
      "Eco-friendly aluminum takeout containers that maintain food quality while being fully recyclable and sustainable.",
    icon: (
      <svg
        className="w-10 h-10 text-[#f5a742]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Custom Solutions",
    description:
      "Tailored aluminum packaging designed to your exact specifications for unique food presentations and branding.",
    icon: (
      <svg
        className="w-10 h-10 text-[#f5a742]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Meal Prep Trays",
    description:
      "Compartmentalized aluminum trays perfect for portion control, meal prep services, and institutional food service.",
    icon: (
      <svg
        className="w-10 h-10 text-[#f5a742]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 6l9 4 9-4"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 6v8a2 2 0 01-2 2H5a2 2 0 01-2-2V6"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12v4"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 12v4"
        />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Sustainable Packaging",
    description:
      "100% recyclable aluminum containers that reduce environmental impact while maintaining food freshness and quality.",
    icon: (
      <svg
        className="w-10 h-10 text-[#f5a742]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Wholesale Supply",
    description:
      "Bulk aluminum container solutions for food businesses with flexible ordering options and reliable delivery.",
    icon: (
      <svg
        className="w-10 h-10 text-[#f5a742]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
];

const OurServices = () => {
  return (
    <section className="min-h-screen bg-[#14202e] text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-5xl md:text-6xl font-bold mb-6"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          <span className="text-white">Our </span>
          <span className="text-[#88A9C3]">Aluminum Packaging</span>
        </h1>

        <p
          className="text-[#88A9C3] mb-16 text-xl max-w-3xl"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Premium food-grade aluminum containers that combine quality,
          sustainability, and functionality for all your food packaging needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <div key={service.id} className="flex space-x-6">
              <div className="flex-shrink-0">
                <div className="text-[#f5a742] bg-white bg-opacity-5 p-3 rounded-md">
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
                  className="text-[#88A9C3]"
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
