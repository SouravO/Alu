import React, { useEffect, useRef } from "react";
import FoodContainer3D from "./components/SimpleFoodContainer";
import img from './assets/container-food.png';
import { useInView } from "react-intersection-observer";

// CSS for animations
const animationStyles = `
  .highlight-animation {
    display: inline-block;
    transition: color 0.5s ease;
  }
  
  .highlight-animation.visible {
    color: #88A9C3;
    text-shadow: 0 0 5px rgba(136, 169, 195, 0.3);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animated-button {
    animation-fill-mode: both;
  }

  .animated-button.visible {
    animation: fadeIn 0.8s ease forwards;
  }
`;

// Animated button component
const AnimatedButton = ({ text, className, style }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <button
      ref={ref}
      className={`${className} ${inView ? 'animated-button visible' : 'opacity-0'}`}
      style={{
        ...style,
        animationDelay: '0.8s', // Wait for text animation to complete
      }}
    >
      {text}
    </button>
  );
};

// Animated title component with special highlighting
const AnimatedTitle = ({ text, highlightIndex, className, style, threshold = 0.1 }) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: false,
  });

  // Split text into words
  const words = text.split(' ');
  
  return (
    <h2 ref={ref} className={`${className}`} style={style}>
      {words.map((word, index) => (
        <span 
          key={index} 
          className="inline-block mr-2"
        >
          {index < highlightIndex ? (
            <span className="text-white">{word}</span>
          ) : (
            Array.from(word).map((char, charIndex) => (
              <span
                key={charIndex}
                className="inline-block transition-all duration-700"
                style={{
                  color: inView ? '#88A9C3' : '#14202E',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(30%)',
                  transitionDelay: `${charIndex * 0.05}s`,
                }}
              >
                {char}
              </span>
            ))
          )}
        </span>
      ))}
    </h2>
  );
};

// Text highlight animation component for paragraphs
const AnimatedText = ({ text, className, style, threshold = 0.1 }) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: false,
  });

  // Split text into individual characters
  const characters = text.split('');

  return (
    <p ref={ref} className={`${className} overflow-hidden`} style={style}>
      {characters.map((char, index) => (
        <span 
          key={index}
          className="inline-block transition-all duration-700"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(100%)',
            opacity: inView ? 1 : 0,
            color: inView ? '#88A9C3' : '#14202E',
            transitionDelay: `${index * 0.02}s`,
            display: char === ' ' ? 'inline' : undefined
          }}
        >
          {char}
        </span>
      ))}
    </p>
  );
};

const AboutUs = () => {
  return (
    <section className="min-h-[50vh] bg-[#14202E] flex flex-col md:flex-row items-center justify-center py-16 px-6 gap-10">
      {/* Inject animation styles */}
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      <div className="md:w-1/2 w-full">
        <AnimatedTitle
          text="About AluPack"
          highlightIndex={6} // Start highlighting from "AluPack"
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: "Playfair Display, serif" }}
        />
        <AnimatedText
          text="At AluPack, we are pioneers in premium aluminum food packaging solutions. Our mission is to provide sustainable, durable, and innovative containers that preserve food quality while respecting our environment. We blend cutting-edge manufacturing with thoughtful design to create packaging that performs flawlessly for both businesses and consumers."
          className="mb-4 text-base md:text-lg"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        />
        <AnimatedText
          text="Our values are rooted in sustainability, quality, and innovation. We believe in the circular economy of aluminum—100% recyclable and infinitely reusable. Our team of engineers, designers, and food packaging experts are dedicated to creating solutions that meet the evolving needs of the food industry while maintaining our commitment to environmental responsibility."
          className="text-base md:text-lg mb-6"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        />
        <AnimatedButton
          text="Explore Our Products"
          className="bg-[#091235] hover:bg-[#284257] text-white py-2 px-6 rounded-md transition-all duration-300 ease-in-out"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        />
      </div>
      <div className="md:w-1/2 w-full flex justify-center">
        <div className="relative w-[320px] h-[240px] md:w-[400px] md:h-[300px]">
          {/* <FoodContainer3D hideControls={true} /> */}
          <img
            src={img}
            alt="Aluminum Food Container"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
