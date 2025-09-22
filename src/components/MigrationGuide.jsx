import React from "react";

/**
 * Integration Guide: How to migrate to optimized animations
 *
 * This file demonstrates how to convert existing animations to use
 * the optimized animation system.
 */

/**
 * EXAMPLE 1: Converting a standard GSAP animation
 *
 * Before:
 * ```jsx
 * import React, { useRef, useEffect } from 'react';
 * import gsap from 'gsap';
 * import { ScrollTrigger } from 'gsap/ScrollTrigger';
 *
 * gsap.registerPlugin(ScrollTrigger);
 *
 * const Component = () => {
 *   const elementRef = useRef(null);
 *
 *   useEffect(() => {
 *     gsap.from(elementRef.current, {
 *       opacity: 0,
 *       y: 50,
 *       duration: 0.8,
 *       scrollTrigger: {
 *         trigger: elementRef.current,
 *         start: "top 80%",
 *       }
 *     });
 *   }, []);
 *
 *   return <div ref={elementRef}>Content</div>;
 * };
 * ```
 *
 * After:
 * ```jsx
 * import React from 'react';
 * import { useFadeInAnimation } from './utils/optimized-animations';
 *
 * const Component = () => {
 *   const elementRef = useFadeInAnimation({
 *     y: 50,
 *     duration: 0.8,
 *     start: "top 80%"
 *   });
 *
 *   return <div ref={elementRef}>Content</div>;
 * };
 * ```
 */

/**
 * EXAMPLE 2: Converting staggered animations
 *
 * Before:
 * ```jsx
 * import React, { useRef, useEffect } from 'react';
 * import gsap from 'gsap';
 * import { ScrollTrigger } from 'gsap/ScrollTrigger';
 *
 * gsap.registerPlugin(ScrollTrigger);
 *
 * const Component = () => {
 *   const containerRef = useRef(null);
 *
 *   useEffect(() => {
 *     const items = containerRef.current.children;
 *
 *     gsap.set(items, { opacity: 0, y: 30 });
 *
 *     gsap.to(items, {
 *       opacity: 1,
 *       y: 0,
 *       stagger: 0.2,
 *       duration: 0.8,
 *       ease: "power2.out",
 *       scrollTrigger: {
 *         trigger: containerRef.current,
 *         start: "top 80%"
 *       }
 *     });
 *   }, []);
 *
 *   return (
 *     <ul ref={containerRef}>
 *       <li>Item 1</li>
 *       <li>Item 2</li>
 *       <li>Item 3</li>
 *     </ul>
 *   );
 * };
 * ```
 *
 * After:
 * ```jsx
 * import React from 'react';
 * import { useStaggerAnimation } from './utils/optimized-animations';
 *
 * const Component = () => {
 *   const containerRef = useStaggerAnimation({
 *     stagger: 0.2,
 *     y: 30,
 *     duration: 0.8,
 *     ease: "power2.out"
 *   });
 *
 *   return (
 *     <ul ref={containerRef}>
 *       <li>Item 1</li>
 *       <li>Item 2</li>
 *       <li>Item 3</li>
 *     </ul>
 *   );
 * };
 * ```
 */

/**
 * EXAMPLE 3: Converting animated text
 *
 * Before:
 * ```jsx
 * import React, { useRef, useEffect } from 'react';
 * import gsap from 'gsap';
 * import { ScrollTrigger } from 'gsap/ScrollTrigger';
 *
 * gsap.registerPlugin(ScrollTrigger);
 *
 * const Component = () => {
 *   const textRef = useRef(null);
 *
 *   useEffect(() => {
 *     // Split text logic
 *     const text = textRef.current.innerText;
 *     textRef.current.innerHTML = '';
 *
 *     const wrapper = document.createElement('span');
 *     wrapper.style.display = 'inline-block';
 *
 *     [...text].forEach(char => {
 *       const charSpan = document.createElement('span');
 *       charSpan.style.display = 'inline-block';
 *       charSpan.innerText = char === ' ' ? '\u00A0' : char;
 *       wrapper.appendChild(charSpan);
 *     });
 *
 *     textRef.current.appendChild(wrapper);
 *
 *     // Animation
 *     gsap.from(wrapper.children, {
 *       opacity: 0,
 *       y: 20,
 *       stagger: 0.02,
 *       duration: 0.5,
 *       scrollTrigger: {
 *         trigger: textRef.current,
 *         start: "top 85%"
 *       }
 *     });
 *   }, []);
 *
 *   return <p ref={textRef}>Your animated text here</p>;
 * };
 * ```
 *
 * After:
 * ```jsx
 * import React from 'react';
 * import { AnimatedText } from './components/OptimizedAnimatedComponents';
 *
 * const Component = () => {
 *   return (
 *     <AnimatedText
 *       text="Your animated text here"
 *       tag="p"
 *       staggerTime={0.02}
 *       color="white"
 *     />
 *   );
 * };
 * ```
 */

/**
 * EXAMPLE 4: Converting image reveal animations
 *
 * Before:
 * ```jsx
 * import React, { useRef, useEffect } from 'react';
 * import gsap from 'gsap';
 * import { ScrollTrigger } from 'gsap/ScrollTrigger';
 *
 * gsap.registerPlugin(ScrollTrigger);
 *
 * const Component = () => {
 *   const containerRef = useRef(null);
 *
 *   useEffect(() => {
 *     const container = containerRef.current;
 *
 *     // Create overlay
 *     const overlay = document.createElement('div');
 *     overlay.style.position = 'absolute';
 *     overlay.style.top = '0';
 *     overlay.style.left = '0';
 *     overlay.style.width = '100%';
 *     overlay.style.height = '100%';
 *     overlay.style.backgroundColor = '#6e6e73';
 *     overlay.style.transformOrigin = 'right';
 *
 *     // Prepare container
 *     container.style.position = 'relative';
 *     container.style.overflow = 'hidden';
 *     container.insertBefore(overlay, container.firstChild);
 *
 *     // Animate
 *     gsap.to(overlay, {
 *       scaleX: 0,
 *       duration: 1.2,
 *       ease: 'power2.inOut',
 *       scrollTrigger: {
 *         trigger: container,
 *         start: "top 85%"
 *       }
 *     });
 *   }, []);
 *
 *   return (
 *     <div ref={containerRef} className="w-full h-64">
 *       <img src="/path/to/image.jpg" alt="Description" className="w-full h-full object-cover" />
 *     </div>
 *   );
 * };
 * ```
 *
 * After:
 * ```jsx
 * import React from 'react';
 * import { AnimatedImage } from './components/OptimizedAnimatedComponents';
 *
 * const Component = () => {
 *   return (
 *     <AnimatedImage
 *       src="/path/to/image.jpg"
 *       alt="Description"
 *       className="w-full h-64"
 *     />
 *   );
 * };
 * ```
 */

/**
 * EXAMPLE 5: Converting parallax effects
 *
 * Before:
 * ```jsx
 * import React, { useRef, useEffect } from 'react';
 * import gsap from 'gsap';
 * import { ScrollTrigger } from 'gsap/ScrollTrigger';
 *
 * gsap.registerPlugin(ScrollTrigger);
 *
 * const Component = () => {
 *   const bgRef = useRef(null);
 *
 *   useEffect(() => {
 *     gsap.to(bgRef.current, {
 *       y: "-30%",
 *       ease: "none",
 *       scrollTrigger: {
 *         trigger: bgRef.current.parentElement,
 *         start: "top bottom",
 *         end: "bottom top",
 *         scrub: true
 *       }
 *     });
 *   }, []);
 *
 *   return (
 *     <div className="relative h-screen overflow-hidden">
 *       <div
 *         ref={bgRef}
 *         className="absolute inset-0"
 *         style={{ backgroundImage: "url(/bg.jpg)" }}
 *       />
 *       <div className="relative z-10">Content here</div>
 *     </div>
 *   );
 * };
 * ```
 *
 * After:
 * ```jsx
 * import React from 'react';
 * import { useParallaxEffect } from './utils/optimized-animations';
 *
 * const Component = () => {
 *   const bgRef = useParallaxEffect({
 *     speed: 0.3
 *   });
 *
 *   return (
 *     <div className="relative h-screen overflow-hidden">
 *       <div
 *         ref={bgRef}
 *         className="absolute inset-0"
 *         style={{ backgroundImage: "url(/bg.jpg)" }}
 *       />
 *       <div className="relative z-10">Content here</div>
 *     </div>
 *   );
 * };
 * ```
 */

/**
 * Migration Checklist:
 *
 * 1. Replace imports:
 *    - Change `import gsap from 'gsap'` to `import { gsap } from './utils/optimized-animations'`
 *    - Add specific hooks like `useStaggerAnimation`, `useFadeInAnimation`, etc.
 *
 * 2. Replace useEffect + gsap calls with custom hooks:
 *    - For fade animations: useFadeInAnimation
 *    - For staggered animations: useStaggerAnimation
 *    - For text animations: useTextRevealAnimation or AnimatedText component
 *    - For image reveals: useImageRevealAnimation or AnimatedImage component
 *    - For parallax effects: useParallaxEffect
 *
 * 3. Add performance tracking for custom animations:
 *    - Import: `import { trackAnimation } from './utils/performanceMonitor'`
 *    - Create tracker: `const tracker = trackAnimation()`
 *    - Clean up: `tracker.cleanup()`
 *
 * 4. Test animations on low-power devices:
 *    - Chrome DevTools -> Performance tab -> CPU throttling
 *    - Test with "?showPerf=true" in URL to see performance metrics
 *
 * 5. Consider accessibility:
 *    - Respect reduced motion preferences
 *    - Ensure animations don't interfere with screen readers
 */

const MigrationGuide = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Animation Optimization Migration Guide
      </h1>
      <p className="text-lg mb-8">
        This file provides examples of how to migrate existing animations to use
        the optimized animation system. See the code comments for detailed
        examples.
      </p>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Quick Reference</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-2">Animation Type</th>
              <th className="text-left py-2">Use This</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-3 pr-4">Simple fade-in on scroll</td>
              <td className="py-3">
                <code>useFadeInAnimation()</code>
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 pr-4">Staggered list items</td>
              <td className="py-3">
                <code>useStaggerAnimation()</code>
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 pr-4">Text character-by-character reveal</td>
              <td className="py-3">
                <code>&lt;AnimatedText&gt;</code> or{" "}
                <code>useTextRevealAnimation()</code>
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 pr-4">Image reveal with overlay</td>
              <td className="py-3">
                <code>&lt;AnimatedImage&gt;</code> or{" "}
                <code>useImageRevealAnimation()</code>
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 pr-4">Parallax scrolling effects</td>
              <td className="py-3">
                <code>useParallaxEffect()</code>
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4">Custom complex animations</td>
              <td className="py-3">
                <code>useGSAPContext()</code> + <code>trackAnimation()</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MigrationGuide;
