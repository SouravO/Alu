import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "../utils/animations";

/**
 * AnimatedText Component
 * Displays text that animates in character by character when it enters the viewport
 *
 * @param {Object} props
 * @param {string} props.text - The text to be animated
 * @param {string} props.tag - The HTML tag to use (default: 'p')
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.staggerTime - Time between each character animation (default: 0.02)
 * @param {string} props.color - Text color
 */
export const AnimatedText = ({
  text,
  tag = "p",
  className = "",
  staggerTime = 0.02,
  color = "white",
  ...props
}) => {
  const textRef = useRef(null);
  const characters = useRef([]);
  characters.current = [];

  // Register each character span
  const addToRefs = (el) => {
    if (el && !characters.current.includes(el)) {
      characters.current.push(el);
    }
  };

  useLayoutEffect(() => {
    // Don't run if there's no text or no spans added
    if (!text || characters.current.length === 0) return;

    // Hide all characters initially
    gsap.set(characters.current, { opacity: 0, y: 20 });

    // Set up ScrollTrigger to animate when element enters viewport
    const animation = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%", // Start when top of element is 80% from top of viewport
        toggleActions: "play none none none",
      },
    });

    // Animate each character with staggered effect
    animation.to(characters.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: staggerTime,
      ease: "power2.out",
    });

    // Clean up ScrollTrigger on component unmount
    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, [text, staggerTime]);

  // Split text into individual characters with spans
  const renderCharacters = () => {
    if (!text) return null;

    return text.split("").map((char, index) => (
      <span
        ref={addToRefs}
        key={index}
        style={{
          display: "inline-block",
          color: color,
        }}
      >
        {char === " " ? "\u00A0" : char /* Use non-breaking space for spaces */}
      </span>
    ));
  };

  // Create component with specified tag
  const Tag = tag;
  return (
    <Tag ref={textRef} className={className} {...props}>
      {renderCharacters()}
    </Tag>
  );
};

/**
 * AnimatedTitle Component
 * Displays headings that animate in with a highlight effect
 *
 * @param {Object} props
 * @param {string} props.text - The title text
 * @param {string} props.tag - The HTML tag to use (default: 'h2')
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.color - Title text color
 * @param {boolean} props.underline - Whether to show an animated underline
 * @param {string} props.underlineColor - Color of the underline
 */
export const AnimatedTitle = ({
  text,
  tag = "h2",
  className = "",
  color = "white",
  underline = false,
  underlineColor = "#4737FF",
  ...props
}) => {
  const titleRef = useRef(null);
  const underlineRef = useRef(null);

  useLayoutEffect(() => {
    if (!titleRef.current) return;

    gsap.set(titleRef.current, { opacity: 0, y: 30 });
    if (underline && underlineRef.current) {
      gsap.set(underlineRef.current, { scaleX: 0 });
    }

    const animation = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    animation.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    if (underline && underlineRef.current) {
      animation.to(
        underlineRef.current,
        {
          scaleX: 1,
          duration: 0.6,
          ease: "power2.inOut",
          delay: 0.2,
        },
        "-=0.4"
      );
    }

    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, [underline]);

  const Tag = tag;
  return (
    <div className="relative">
      <Tag
        ref={titleRef}
        className={`${className} ${color}`}
        style={{ color }}
        {...props}
      >
        {text}
      </Tag>
      {underline && (
        <div
          ref={underlineRef}
          className="h-1 rounded transform origin-left"
          style={{
            backgroundColor: underlineColor,
            width: "32px",
            marginTop: "8px",
          }}
        ></div>
      )}
    </div>
  );
};

export default { AnimatedText, AnimatedTitle };
