import React, { useRef, useEffect, memo } from "react";
import { gsap } from "../utils/optimized-animations";
import {
  getOptimizedSettings,
  prefersReducedMotion,
  isLowPowerDevice,
} from "../utils/optimized-animations";

/**
 * MemoizedSpan - A memoized span component to reduce re-renders
 */
const MemoizedSpan = memo(({ char, index, color, settings }) => {
  // Calculate delay based on index and device performance
  const delay = settings.simplify ? 0 : Math.min(index * 0.02, 1);

  return (
    <span
      style={{
        display: "inline-block",
        color: color,
        transition: `opacity ${settings.duration * 1000}ms, transform ${
          settings.duration * 1000
        }ms`,
        transitionDelay: `${delay}s`,
        opacity: 1,
        transform: "translateY(0)",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  );
});

/**
 * AnimatedText Component - Optimized for performance
 * Uses CSS transitions for lower-power devices and GSAP for higher-power
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
  const [isVisible, setIsVisible] = React.useState(false);
  const [settings] = React.useState(getOptimizedSettings());

  // Create intersection observer to trigger animation when element is in view
  useEffect(() => {
    if (!textRef.current || !text) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(textRef.current);

    return () => observer.disconnect();
  }, [text]);

  // Determine rendering approach based on device performance
  const renderContent = () => {
    if (!text) return null;

    // For low-power devices or reduced motion preference, use simplified animation
    if (settings.simplify) {
      return (
        <span
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity ${settings.duration}s, transform ${settings.duration}s`,
            color: color,
          }}
        >
          {text}
        </span>
      );
    }

    // For higher-power devices, use character-by-character animation
    return text
      .split("")
      .map((char, index) => (
        <MemoizedSpan
          key={index}
          char={char}
          index={index}
          color={color}
          settings={settings}
        />
      ));
  };

  // Create component with specified tag
  const Tag = tag;
  return (
    <Tag
      ref={textRef}
      className={`${className} ${isVisible ? "is-visible" : ""}`}
      {...props}
      style={{
        ...props.style,
        opacity: settings.simplify ? 1 : isVisible ? 1 : 0,
      }}
    >
      {renderContent()}
    </Tag>
  );
};

/**
 * AnimatedTitle Component - Optimized for performance
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
  const [isVisible, setIsVisible] = React.useState(false);
  const [settings] = React.useState(getOptimizedSettings());

  // Create intersection observer for visibility detection
  useEffect(() => {
    if (!titleRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(titleRef.current);

    return () => observer.disconnect();
  }, []);

  // Use CSS transitions for simpler animation
  const titleStyle = {
    color,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(30px)",
    transition: `opacity ${settings.duration}s, transform ${settings.duration}s`,
    ...props.style,
  };

  const underlineStyle = {
    height: "2px",
    width: "32px",
    backgroundColor: underlineColor,
    marginTop: "8px",
    transform: isVisible ? "scaleX(1)" : "scaleX(0)",
    transformOrigin: "left",
    transition: `transform ${settings.duration}s ${settings.duration * 0.3}s`,
    opacity: isVisible ? 1 : 0,
  };

  const Tag = tag;
  return (
    <div className="relative">
      <Tag ref={titleRef} className={className} style={titleStyle} {...props}>
        {text}
      </Tag>
      {underline && (
        <div
          ref={underlineRef}
          className="rounded"
          style={underlineStyle}
        ></div>
      )}
    </div>
  );
};

/**
 * AnimatedImage Component - Optimized image reveal with fallback
 */
export const AnimatedImage = ({
  src,
  alt,
  className = "",
  imageClassName = "",
  ...props
}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [settings] = React.useState(getOptimizedSettings());

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Simplified reveal for low-power devices
  if (settings.simplify) {
    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden ${className}`}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${imageClassName}`}
          style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity ${settings.duration * 1.5}s`,
          }}
        />
      </div>
    );
  }

  // Higher-end reveal with overlay effect
  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-[#6e6e73] transform origin-right"
        style={{
          transform: isVisible ? "scaleX(0)" : "scaleX(1)",
          transition: `transform ${
            settings.duration * 1.2
          }s cubic-bezier(0.645, 0.045, 0.355, 1.000)`,
          zIndex: 1,
        }}
      />
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${imageClassName}`}
      />
    </div>
  );
};

export default { AnimatedText, AnimatedTitle, AnimatedImage };
