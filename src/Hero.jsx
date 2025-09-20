import React from "react";

const Hero = () => (
  <main
    className="flex flex-col items-center justify-center flex-1 text-center px-4 bg-[#091235]"
    style={{ minHeight: "90vh" }}
  >
    <h1
      className="text-5xl md:text-6xl font-bold mt-16 mb-4 text-white"
      style={{ fontFamily: "Playfair Display, serif" }}
    >
      Engineering the Next
    </h1>
    <h2
      className="text-5xl md:text-6xl font-bold text-[#88A9C3] mb-6"
      style={{ fontFamily: "Playfair Display, serif" }}
    >
      Dimension
    </h2>
    <p
      className="text-lg text-[#88A9C3] mb-10 max-w-xl"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      We design and develop futuristic digital products that redefine
      possibilities and shape tomorrow's user experiences.
    </p>
    <button
      className="mt-2 px-8 py-3 border-2 border-[#88A9C3] rounded-full text-[#88A9C3] font-semibold text-lg hover:bg-[#284257] hover:text-white hover:border-[#284257] transition shadow-md"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      Explore Our Universe
    </button>
  </main>
);

export default Hero;
