import React, { useRef, useEffect } from "react";
import {
  useStaggerAnimation,
  useFadeInAnimation,
  useParallaxEffect,
  gsap,
  ScrollTrigger,
  getOptimizedSettings,
} from "../utils/optimized-animations";
import {
  AnimatedText,
  AnimatedTitle,
  AnimatedImage,
} from "../components/OptimizedAnimatedComponents";
import { trackAnimation } from "../utils/performanceMonitor";

/**
 * Example component showcasing optimized animations
 * This component demonstrates best practices for performance
 */
const OptimizedAnimationExample = () => {
  // Get optimized settings based on device capability
  const settings = getOptimizedSettings();

  // Refs for animations
  const sectionRef = useRef(null);
  const cardContainerRef = useStaggerAnimation({
    stagger: 0.15,
    duration: 0.7,
  });
  const textBlockRef = useFadeInAnimation();
  const parallaxBgRef = useParallaxEffect({ speed: 0.3 });

  // Custom animation with performance tracking
  useEffect(() => {
    if (!sectionRef.current) return;

    // Track this animation for performance
    const tracker = trackAnimation();

    // Get elements to animate
    const header = sectionRef.current.querySelector("header");
    const divider = sectionRef.current.querySelector(".divider");

    // Create timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate header with slide in
    tl.fromTo(
      header,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: settings.duration, ease: settings.ease }
    );

    // Animate divider with scale
    tl.fromTo(
      divider,
      { scaleX: 0 },
      { scaleX: 1, duration: settings.duration * 0.8, ease: "power2.inOut" },
      "-=0.3"
    );

    // Clean up animations and tracking
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
      tracker.cleanup();
    };
  }, [settings]);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Parallax background */}
      <div
        ref={parallaxBgRef}
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: "#6e6e73",
          backgroundImage:
            "radial-gradient(circle at 80% 10%, #142753 0%, #6e6e73 70%)",
        }}
      />

      <div className="container mx-auto max-w-6xl">
        {/* Header with custom animation */}
        <header className="mb-16 opacity-0">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Performance Optimized Animations
          </h1>
          <div className="divider h-1 w-24 bg-[#6e6e73] origin-left transform scale-x-0" />
        </header>

        {/* Animated text using components */}
        <div className="mb-20">
          <AnimatedTitle
            text="Adaptive Animation System"
            tag="h2"
            className="text-3xl font-bold mb-6"
            color="#ffffff"
            underline={true}
            underlineColor="#6e6e73"
          />

          <div ref={textBlockRef} className="max-w-2xl">
            <AnimatedText
              text="Our system automatically adjusts animation complexity based on device capabilities, ensuring smooth performance across all platforms."
              tag="p"
              className="text-lg mb-4"
              color="#E8F0F5"
            />

            <AnimatedText
              text="High-end devices receive full animations while mobile devices get optimized versions."
              tag="p"
              className="text-lg"
              color="#E8F0F5"
              staggerTime={0.01}
            />
          </div>
        </div>

        {/* Card grid with staggered animation */}
        <h3 className="text-2xl font-semibold text-white mb-8">Features</h3>

        <div
          ref={cardContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Each card will be animated in a staggered sequence */}
          {features.map((feature, index) => (
            <div key={index} className="bg-[#142244] p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h4>
              <p className="text-[#E8F0F5]">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Image gallery */}
        <div className="mt-20">
          <AnimatedTitle
            text="Image Reveal Effects"
            tag="h2"
            className="text-3xl font-bold mb-10"
            color="#ffffff"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedImage
              src="https://res.cloudinary.com/daqcima3z/image/upload/v1716493795/aluminum-foil-stack_hvlcnp.jpg"
              alt="Aluminum Foil Stack"
              className="w-full h-72 rounded-lg"
            />

            <AnimatedImage
              src="https://res.cloudinary.com/daqcima3z/image/upload/v1716493795/round-containers_xm77an.jpg"
              alt="Round Containers"
              className="w-full h-72 rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Example feature data
const features = [
  {
    title: "Adaptive Staggering",
    description:
      "Automatically adjusts stagger timing based on device performance capabilities.",
  },
  {
    title: "Batch Processing",
    description:
      "Groups animations into batches for better performance on low-power devices.",
  },
  {
    title: "Reduced Motion Support",
    description:
      "Respects user preferences for reduced motion when specified in system settings.",
  },
  {
    title: "Performance Monitoring",
    description:
      "Built-in tools to track FPS and optimize animations in real-time.",
  },
  {
    title: "Memory Optimization",
    description:
      "Proper cleanup of animations to prevent memory leaks and improve performance.",
  },
  {
    title: "Intersection Observer",
    description:
      "Uses modern browser APIs to trigger animations only when elements are visible.",
  },
];

export default OptimizedAnimationExample;
