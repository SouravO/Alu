import React from "react";

const AboutUs = () => {
  return (
    <section className="min-h-[50vh] bg-[#14202E] flex flex-col md:flex-row items-center justify-center py-16 px-6 gap-10">
      <div className="md:w-1/2 w-full">
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          About <span className="text-[#88A9C3]">Acme Co</span>
        </h2>
        <p
          className="text-[#88A9C3] mb-4 text-base md:text-lg"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          At Acme Co, we are architects of the digital frontier. Our mission is
          to forge unparalleled digital experiences by seamlessly blending
          cutting-edge technology with visionary design. We believe in pushing
          the boundaries of what's possible, creating products that are not only
          innovative but also intuitive and impactful.
        </p>
        <p
          className="text-[#88A9C3] text-base md:text-lg mb-6"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Our values are rooted in a relentless pursuit of excellence, a passion
          for innovation, and a commitment to our clients' success. We are a
          collective of thinkers, creators, and builders dedicated to shaping a
          future where technology empowers and inspires.
        </p>
        <button
          className="bg-[#091235] hover:bg-[#284257] text-white py-2 px-6 rounded-md transition-all duration-300 ease-in-out"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Learn More About Us
        </button>
      </div>
      <div className="md:w-1/2 w-full flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="About Acme Co"
          className="rounded-xl shadow-2xl object-cover w-[320px] h-[180px] md:w-[400px] md:h-[240px]"
        />
      </div>
        
    </section>
  );
};

export default AboutUs;
