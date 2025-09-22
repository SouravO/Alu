import React, { useRef, useEffect } from "react";
import {
  useStaggerAnimation,
  useImageRevealAnimation,
  gsap,
  ScrollTrigger,
} from "./utils/animations";
import { AnimatedTitle, AnimatedText } from "./components/AnimatedComponents";

const Products = () => {
  // Product categories data
  const categories = [
    {
      id: "aluminum-foils",
      title: "Aluminum Foils",
      products: [
        {
          id: 1,
          name: "Standard Aluminum Foil",
          description: "Everyday kitchen foil for cooking and storage",
          image:
            "https://res.cloudinary.com/daqcima3z/image/upload/v1716493795/aluminum-foil-stack_hvlcnp.jpg",
        },
        {
          id: 2,
          name: "Heavy-Duty Aluminum Foil",
          description:
            "Extra-thick foil for grilling and high-heat applications",
          image:
            "https://res.cloudinary.com/daqcima3z/image/upload/v1716493795/aluminum-foil-roll_svicnp.jpg",
        },
        {
          id: 3,
          name: "Pre-Cut Foil Sheets",
          description: "Convenient pre-cut sheets for easy use",
          image:
            "https://res.cloudinary.com/daqcima3z/image/upload/v1716493795/aluminum-foil-sheets_gzdk3c.jpg",
        },
      ],
    },
    {
      id: "food-containers",
      title: "Food Containers",
      products: [
        {
          id: 4,
          name: "Round Food Containers",
          description: "Versatile round containers for various food types",
          image:
            "https://res.cloudinary.com/daqcima3z/image/upload/v1716493795/round-containers_xm77an.jpg",
        },
        {
          id: 5,
          name: "Rectangular Food Containers",
          description: "Durable rectangular containers for meals and leftovers",
          image:
            "https://res.cloudinary.com/daqcima3z/image/upload/v1716493795/rectangular-container_uti1fj.jpg",
        },
        {
          id: 6,
          name: "Compartment Containers",
          description:
            "Containers with multiple compartments for organized meals",
          image:
            "https://res.cloudinary.com/daqcima3z/image/upload/v1716493795/compartment-containers_c4ve08.jpg",
        },
      ],
    },
  ];

  // Ref for header animation
  const headerRef = useRef(null);

  // Refs for category animations
  const categoryRefs = useRef([]);
  categoryRefs.current = [];

  const addToCategoryRefs = (el) => {
    if (el && !categoryRefs.current.includes(el)) {
      categoryRefs.current.push(el);
    }
  };

  // Set up header animation
  useEffect(() => {
    if (!headerRef.current) return;

    const title = headerRef.current.querySelector("h1");
    const description = headerRef.current.querySelector("p");

    // Set initial state
    gsap.set([title, description], { opacity: 0, y: 50 });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate elements
    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    }).to(
      description,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Cleanup
    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  // Set up category titles and product grid animations
  useEffect(() => {
    categoryRefs.current.forEach((categoryRef) => {
      if (!categoryRef) return;

      const titleWrapper = categoryRef.querySelector(".category-title-wrapper");
      const title = titleWrapper.querySelector("h2");
      const underline = titleWrapper.querySelector(".underline");
      const productItems = categoryRef.querySelectorAll(".product-item");

      // Set initial states
      gsap.set(title, { opacity: 0, y: 30 });
      gsap.set(underline, { scaleX: 0, transformOrigin: "left" });
      gsap.set(productItems, { opacity: 0, y: 50 });

      // Create title animation
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleWrapper,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      titleTl
        .to(title, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        })
        .to(
          underline,
          {
            scaleX: 1,
            duration: 0.5,
            ease: "power2.inOut",
          },
          "-=0.3"
        );

      // Create products grid animation
      gsap.to(productItems, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: productItems[0],
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  return (
    <div className="bg-[#0a0a0a] py-16 px-6 md:px-10">
      {/* Header Section */}
      <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-16">
        <h1
          className="text-5xl font-bold text-[#f8f8f8] mb-4"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Our Products
        </h1>
        <p className="text-[#f8f8f8] text-lg">
          Explore our comprehensive range of aluminum foil and food packaging
          solutions, designed for quality, performance, and sustainability.
        </p>
      </div>

      {/* Product Categories */}
      <div className="max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <div key={category.id} className="mb-24" ref={addToCategoryRefs}>
            {/* Category Title with Underline */}
            <div className="relative mb-10 category-title-wrapper">
              <h2
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {category.title}
              </h2>
              <div className="h-1 w-32 bg-[#4737FF] rounded underline"></div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action Section */}
      <CTA />
    </div>
  );
};

// Separate component for product card with its own animations
const ProductCard = ({ product }) => {
  const cardRef = useRef(null);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    if (!imageContainerRef.current || !cardRef.current) return;

    // Create overlay element for reveal effect
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "#0a0a0a";
    overlay.style.transformOrigin = "right";

    // Add overlay to image container
    imageContainerRef.current.style.position = "relative";
    imageContainerRef.current.style.overflow = "hidden";
    imageContainerRef.current.appendChild(overlay);

    // Animation for image reveal
    gsap.to(overlay, {
      scaleX: 0,
      duration: 1.2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <div ref={cardRef} className="group cursor-pointer product-item">
      {/* Product Image with reveal animation */}
      <div ref={imageContainerRef} className="h-72 mb-4 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Product Name */}
      <h3 className="text-lg font-semibold text-white">{product.name}</h3>

      {/* Product Description */}
      <p className="text-sm text-[#6e6e73]">{product.description}</p>
    </div>
  );
};

// Call to Action component with its own animations
const CTA = () => {
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!ctaRef.current) return;

    const title = ctaRef.current.querySelector("h2");
    const desc = ctaRef.current.querySelector("p");
    const button = ctaRef.current.querySelector("button");

    // Set initial state
    gsap.set([title, desc, button], { opacity: 0, y: 30 });

    // Create staggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    })
      .to(
        desc,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      )
      .to(
        button,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={ctaRef} className="max-w-2xl mx-auto text-center mt-16">
      <h2
        className="text-2xl font-bold text-[#f8f8f8] mb-4"
        style={{ fontFamily: "Playfair Display, serif" }}
      >
        Custom Solutions
      </h2>
      <p className="text-[#6e6e73] mb-8">
        Need something specific for your business? We offer custom aluminum
        packaging solutions tailored to your exact requirements. Contact our
        team today for a consultation.
      </p>
      <button className="bg-[#f8f8f8] hover:bg-[#6e6e73] hover:text-white text-[#6e6e73] font-bold py-3 px-8 rounded-full transition">
        Request Custom Quote
      </button>
    </div>
  );
};

export default Products;
