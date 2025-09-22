import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FoodContainer3D from "./components/SimpleFoodContainer";
import img from "./assets/container-food.png";
import { gsap, ScrollTrigger } from "./utils/animations";
import ModelViewer from "./model/ModelViewer";

// Simple button component
const SimpleButton = ({ text, className, style, onClick }) => {
  return (
    <button className={className} style={style} onClick={onClick}>
      {text}
    </button>
  );
};

// Scroll-based text highlight animation component
const ScrollHighlightText = ({ text, className, style, readingSpeed = 1 }) => {
  const textRef = useRef(null);
  const [characters, setCharacters] = useState([]);
  const [words, setWords] = useState([]);
  const [useWordAnimation, setUseWordAnimation] = useState(false);

  useEffect(() => {
    // Check if we're on mobile - if so, use word-by-word animation
    const isMobile = window.innerWidth < 768;
    setUseWordAnimation(isMobile && text.length > 100);

    if (!textRef.current) return;

    if (useWordAnimation) {
      // Split text into words for animation (better performance on mobile)
      const wordsArray = text.split(" ").map((word, index) => ({
        word,
        id: `word-${index}`,
      }));

      setWords(wordsArray);
    } else {
      // Split text into individual characters for animation (smoother on desktop)
      const chars = text.split("").map((char, index) => ({
        char: char === " " ? "\u00A0" : char, // Use non-breaking space for spaces
        id: `char-${index}`,
      }));

      setCharacters(chars);
    }

    // Wait for elements to be rendered before setting up animation
    setTimeout(() => {
      setupAnimation();
    }, 100);

    return () => {
      // Clean up any ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id?.includes("text-highlight")) {
          trigger.kill();
        }
      });
    };
  }, [text, useWordAnimation]);

  const setupAnimation = () => {
    if (!textRef.current) return;

    // Determine which elements to animate (characters or words)
    const elements = textRef.current.querySelectorAll(
      useWordAnimation ? ".highlight-word" : ".highlight-char"
    );

    if (elements.length === 0) return;

    // Calculate the animation speed based on text length and reading speed
    // This ensures the animation completes as the user scrolls through the content
    const duration = Math.max(0.5, elements.length * 0.01 * readingSpeed);

    // Create timeline for highlighting
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%", // Start when top of text is 80% from top of viewport
        end: "bottom 30%", // End when bottom of text is 30% from top of viewport
        scrub: 0.5, // Smooth scrubbing with slight delay for smoother effect
        id: "text-highlight-main",
        // Uncomment for debugging:
        // markers: true,
      },
    });

    // Add each element to the timeline with staggered progress
    elements.forEach((el, i) => {
      // Calculate progress based on position
      const progress = i / (elements.length - 1);

      // Create animation for this element
      tl.to(
        el,
        {
          color: "#f8f8f8", // Highlight color
          textShadow: "0 0 1px rgba(136, 169, 195, 0.3)",
          fontWeight: "500", // Slightly bolder
          ease: "power1.inOut", // Slightly smoother transition
          duration: useWordAnimation ? 0.3 : 0.1, // Words need longer transition
        },
        progress * duration
      );
    });
  };

  // Render characters or words depending on the selected animation mode
  return (
    <p ref={textRef} className={`${className} leading-relaxed`} style={style}>
      {useWordAnimation
        ? // Word-by-word animation (better for mobile)
          words.map((wordObj, index) => (
            <span key={wordObj.id} className="relative">
              <span
                className="highlight-word inline-block"
                style={{
                  color: "#6e6e73", // Starting color
                  marginRight: "0.25em",
                  transition: "color 0.2s ease",
                }}
              >
                {wordObj.word}
              </span>
            </span>
          ))
        : // Character-by-character animation (better for desktop)
          characters.map((char, index) => (
            <span
              key={char.id}
              className="highlight-char inline-block"
              style={{
                color: "#6e6e73", // Starting color
                transition: "color 0.1s ease, text-shadow 0.1s ease",
              }}
            >
              {char.char}
            </span>
          ))}
    </p>
  );
};

const AboutUs = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const scrollHintRef = useRef(null);

  // Enhanced animations with GSAP
  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;

    // Create an overlay for image reveal
    const imageContainer = imageRef.current;
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "#f8f8f8";
    overlay.style.transformOrigin = "left";
    overlay.style.zIndex = "1";

    // Ensure container has position relative
    imageContainer.style.position = "relative";
    imageContainer.style.overflow = "hidden";

    // Add overlay as first child
    imageContainer.insertBefore(overlay, imageContainer.firstChild);

    // Main scroll-based animations
    const animations = [];

    // 1. Parallax effect for the about section
    animations.push(
      gsap.fromTo(
        sectionRef.current,
        { backgroundPosition: "50% 0%" },
        {
          backgroundPosition: "50% 20%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            id: "about-parallax",
          },
        }
      )
    );

    // 2. Image reveal animation with scroll trigger
    animations.push(
      gsap.to(overlay, {
        scaleX: 0,
        duration: 1.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: imageContainer,
          start: "top 80%",
          end: "top 30%", // End animation when image is 30% from top of viewport
          toggleActions: "play none none none",
          scrub: 0.5, // Smooth scrubbing for better control
          id: "image-reveal",
        },
      })
    );

    // 3. Subtle fade-in for the title
    const title = sectionRef.current.querySelector("h2");
    if (title) {
      animations.push(
        gsap.fromTo(
          title,
          { opacity: 0.7, y: 20 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              end: "top 60%",
              scrub: true,
              id: "title-fade-in",
            },
          }
        )
      );
    }

    // 4. Animate scroll hint (only on mobile)
    if (scrollHintRef.current && window.innerWidth < 768) {
      // Create pulsing animation for scroll hint
      gsap.fromTo(
        scrollHintRef.current,
        { opacity: 0.3, y: 0 },
        {
          opacity: 1,
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        }
      );

      // Hide scroll hint after scrolling
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200",
        onEnter: () => {
          gsap.to(scrollHintRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              if (scrollHintRef.current) {
                scrollHintRef.current.style.display = "none";
              }
            },
          });
        },
        id: "scroll-hint-hide",
      });
    }

    // Handle cleanup
    return () => {
      // Clean up all scroll triggers
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.id?.includes("about-") ||
          trigger.vars.id?.includes("scroll-hint") ||
          trigger.vars.id?.includes("image-reveal") ||
          trigger.vars.id?.includes("title-fade-in")
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[50vh] bg-[#0a0a0a] flex flex-col md:flex-row items-center justify-center py-16 px-6 gap-10 relative"
    >
      <div className="md:w-1/2 w-full">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4 text-[#f8f8f8]"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          About <span className="text-[#f8f8f8]">VP GROUP</span>
        </h2>
        <ScrollHighlightText
          text="At VP GROUP, we are pioneers in premium aluminium food packaging solutions. Our mission is to provide sustainable, durable, and innovative containers that preserve food quality while respecting our environment. We blend cutting-edge manufacturing with thoughtful design to create packaging that performs flawlessly for both businesses and consumers."
          className="mb-4 text-base md:text-lg"
          style={{ fontFamily: "Montserrat, sans-serif" }}
          readingSpeed={0.8} // Slightly faster reading speed
        />
        <ScrollHighlightText
          text="Our values are rooted in sustainability, quality, and innovation. We believe in the circular economy of aluminum—100% recyclable and infinitely reusable. Our team of engineers, designers, and food packaging experts are dedicated to creating solutions that meet the evolving needs of the food industry while maintaining our commitment to environmental responsibility."
          className="text-base md:text-lg mb-6"
          style={{ fontFamily: "Montserrat, sans-serif" }}
          readingSpeed={1.2} // Slightly slower for emphasis
        />

        {/* Add a smaller paragraph with faster reading speed */}
        <ScrollHighlightText
          text="Experience the difference of VP GROUP's premium aluminium food packaging containers for your food business today."
          className="text-sm md:text-base mb-8 italic"
          style={{ fontFamily: "Montserrat, sans-serif" }}
          readingSpeed={0.6} // Faster for this short line
        />
        <SimpleButton
          text="Explore Our Products"
          className="bg-[#6e6e73] hover:bg-[#f8f8f8] hover:text-black text-white py-2 px-6 rounded-md transition-all duration-300 ease-in-out"
          style={{ fontFamily: "Montserrat, sans-serif" }}
          onClick={() => navigate("/products")}
        />
      </div>
      <div className="md:w-1/2 w-full h-100 flex justify-center">
        <ModelViewer modelPath="/models/food-container.glb" />

        {/* <div
          ref={imageRef}
          className="relative w-[320px] h-[240px] md:w-[400px] md:h-[300px] rounded-lg overflow-hidden"
        >
          <img
            src={img}
            alt="Aluminum Food Container"
            className="w-full h-full object-cover shadow-lg relative z-10"
          />
        </div> */}
      </div>

      {/* Scroll hint - only visible on mobile */}
      <div
        ref={scrollHintRef}
        className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
      >
        <div className="text-[#6e6e73] text-xs mb-2">Scroll to read</div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto"
        >
          <path
            d="M12 5L12 19M12 19L19 12M12 19L5 12"
            stroke="#6e6e73"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
};

export default AboutUs;
