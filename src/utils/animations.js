import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to create a staggered fade-in effect for multiple elements
 * @param {Object} options - Animation options
 * @param {number} options.delay - Initial delay before animation starts
 * @param {number} options.stagger - Time between each element's animation
 * @param {number} options.y - Initial Y offset (pixels)
 * @param {number} options.duration - Animation duration
 * @param {string} options.ease - GSAP easing function
 * @param {Array} deps - Dependency array for useLayoutEffect
 * @returns {Object} - Ref to attach to the container element
 */
export const useStaggerAnimation = (options = {}, deps = []) => {
    const {
        delay = 0,
        stagger = 0.2,
        y = 30,
        duration = 0.8,
        ease = "power2.out",
    } = options;

    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Get all direct children of the container
            const elements = containerRef.current.children;

            if (elements.length === 0) return;

            // Set initial state - invisible and shifted down
            gsap.set([...elements], { opacity: 0, y });

            // Create the animation
            gsap.to([...elements], {
                opacity: 1,
                y: 0,
                duration,
                stagger,
                delay,
                ease,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%", // Starts animation when element is 85% from the top of the viewport
                    toggleActions: "play none none none"
                }
            });
        }, containerRef);

        // Cleanup
        return () => ctx.revert();
    }, deps);

    return containerRef;
};

/**
 * Custom hook for fade-in animation on scroll
 * @param {Object} options - Animation options
 * @param {number} options.delay - Delay before animation starts
 * @param {number} options.y - Initial Y offset (pixels)
 * @param {number} options.duration - Animation duration
 * @param {string} options.ease - GSAP easing function
 * @param {string} options.start - ScrollTrigger start position
 * @param {Array} deps - Dependency array for useLayoutEffect
 * @returns {Object} - Ref to attach to the element
 */
export const useFadeInAnimation = (options = {}, deps = []) => {
    const {
        delay = 0,
        y = 50,
        duration = 0.8,
        ease = "power2.out",
        start = "top 80%",
    } = options;

    const elementRef = useRef(null);

    useLayoutEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const ctx = gsap.context(() => {
            // Set initial state
            gsap.set(element, { opacity: 0, y });

            // Create the animation
            gsap.to(element, {
                opacity: 1,
                y: 0,
                duration,
                delay,
                ease,
                scrollTrigger: {
                    trigger: element,
                    start,
                    toggleActions: "play none none none"
                }
            });
        });

        // Cleanup
        return () => ctx.revert();
    }, deps);

    return elementRef;
};

/**
 * Custom hook for text character-by-character reveal animation
 * @param {Object} options - Animation options
 * @param {number} options.stagger - Time between each character
 * @param {number} options.duration - Animation duration per character
 * @param {string} options.ease - GSAP easing function
 * @param {Array} deps - Dependency array for useLayoutEffect
 * @returns {Object} - Ref to attach to the text element
 */
export const useTextRevealAnimation = (options = {}, deps = []) => {
    const {
        stagger = 0.02,
        duration = 0.5,
        ease = "power2.out",
    } = options;

    const textRef = useRef(null);

    useLayoutEffect(() => {
        const element = textRef.current;
        if (!element) return;

        const ctx = gsap.context(() => {
            // Split text into spans for each character
            const text = element.innerText;
            element.innerHTML = "";

            // Create wrapper for maintaining layout
            const wrapper = document.createElement("span");
            wrapper.style.display = "inline-block";

            [...text].forEach(char => {
                const charSpan = document.createElement("span");
                charSpan.style.display = "inline-block";
                charSpan.style.opacity = "0";
                charSpan.innerText = char === " " ? "\u00A0" : char; // Use non-breaking space for spaces
                wrapper.appendChild(charSpan);
            });

            element.appendChild(wrapper);
            const chars = wrapper.children;

            // Create the animation
            gsap.to(chars, {
                opacity: 1,
                duration,
                stagger,
                ease,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        });

        // Cleanup
        return () => ctx.revert();
    }, deps);

    return textRef;
};

/**
 * Custom hook for image reveal animation with a curtain effect
 * @param {Object} options - Animation options
 * @param {number} options.duration - Animation duration
 * @param {string} options.ease - GSAP easing function
 * @param {Array} deps - Dependency array for useLayoutEffect
 * @returns {Object} - Ref to attach to the image container
 */
export const useImageRevealAnimation = (options = {}, deps = []) => {
    const {
        duration = 1.2,
        ease = "power2.inOut",
    } = options;

    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const ctx = gsap.context(() => {
            // Create overlay element for reveal effect
            const overlay = document.createElement("div");
            overlay.style.position = "absolute";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.backgroundColor = "#6e6e73";
            overlay.style.transformOrigin = "right";

            // Ensure container has position relative
            container.style.position = "relative";
            container.style.overflow = "hidden";

            // Add overlay as first child
            container.insertBefore(overlay, container.firstChild);

            // Create the animation
            gsap.to(overlay, {
                scaleX: 0,
                duration,
                ease,
                scrollTrigger: {
                    trigger: container,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        });

        // Cleanup
        return () => ctx.revert();
    }, deps);

    return containerRef;
};

// Export the GSAP instances for direct use
export { gsap, ScrollTrigger };