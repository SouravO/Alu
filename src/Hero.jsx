import React, { useRef, useEffect } from "react";
import { gsap } from "./utils/animations";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const title1 = heroRef.current.querySelector(".title1");
    const title2 = heroRef.current.querySelector(".title2");
    const paragraph = heroRef.current.querySelector(".paragraph");
    const button = heroRef.current.querySelector(".cta-button");

    // Create a timeline for the hero animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Set initial states
    gsap.set([title1, title2, paragraph, button], { opacity: 0, y: 30 });

    // Animate elements in sequence
    tl.to(title1, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2,
    })
      .to(
        title2,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.4"
      )
      .to(
        paragraph,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.4"
      )
      .to(
        button,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.4"
      );

    // Clean up animation on component unmount
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="flex flex-col items-center justify-center flex-1 text-center px-4"
      style={{ minHeight: "90vh" }}
    >
      <h1
        className="text-5xl md:text-6xl font-bold mt-16 mb-4 text-[#f8f8f8] title1"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        VP GROUP
      </h1>
      <h2
        className="text-3xl md:text-4xl font-bold text-[#f8f8f8] mb-6 title2"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        PREMIUM ALUMINIUM FOOD PACKING CONTAINERS
      </h2>
      <p
        className="text-lg text-[#f8f8f8] mb-10 max-w-xl paragraph"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        We design and develop high-quality aluminium food packaging solutions
        that combine durability, sustainability, and innovation.
      </p>
      <button
        className="mt-2 px-8 py-3 border-2 border-[#f8f8f8] rounded-full text-[#f8f8f8] font-semibold text-lg hover:bg-[#f8f8f8] hover:text-[#0a0a0a] hover:border-[#f8f8f8] transition shadow-md cta-button"
        style={{ fontFamily: "Montserrat, sans-serif" }}
        onClick={() => navigate("/products")}
      >
        Explore Our Products
      </button>
    </div>
  );
};

export default Hero;
 
