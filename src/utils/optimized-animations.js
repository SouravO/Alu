import { useLayoutEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Configurable settings for animations
 * Can be adjusted globally for the entire application
 */
export const animationSettings = {
    // Device performance-based settings
    performance: {
        lowPower: {
            enable: true, // Enable animations even on low-power devices
            reduceMotion: true, // Respect user's reduced motion settings
            simplifyOnMobile: true, // Use simpler animations on mobile
        }
    },

    // Default animation parameters that can be fine-tuned
    defaults: {
        batchMax: 3, // Maximum number of animations to run simultaneously
        batchDelay: 0.15, // Delay between animation batches
        staggerDefault: 0.1, // Default stagger time
        defaultDuration: 0.6, // Default duration for animations
        defaultEase: "power2.out", // Default easing function
        defaultStartPosition: "top 85%" // Default scroll trigger start position
    }
};

/**
 * Check if reduced motion is preferred by the user
 * @returns {boolean} - Whether reduced motion is preferred
 */
export const prefersReducedMotion = () => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Check if device is likely a mobile/low-power device
 * @returns {boolean} - Whether device is likely mobile/low-power
 */
export const isLowPowerDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
};

/**
 * Get appropriate animation settings based on device capabilities
 * @returns {Object} - Optimized animation settings
 */
export const getOptimizedSettings = () => {
    const reducedMotion = animationSettings.performance.lowPower.reduceMotion && prefersReducedMotion();
    const simplifyOnMobile = animationSettings.performance.lowPower.simplifyOnMobile && isLowPowerDevice();

    // Return appropriate settings
    return {
        enabled: animationSettings.performance.lowPower.enable,
        duration: reducedMotion || simplifyOnMobile ?
            animationSettings.defaults.defaultDuration * 0.7 :
            animationSettings.defaults.defaultDuration,
        stagger: reducedMotion || simplifyOnMobile ?
            animationSettings.defaults.staggerDefault * 0.5 :
            animationSettings.defaults.staggerDefault,
        simplify: simplifyOnMobile,
        disableParallax: reducedMotion || simplifyOnMobile,
        ease: reducedMotion ? "power1.out" : animationSettings.defaults.defaultEase
    };
};

/**
 * Create a GSAP context with cleanup
 * @param {Function} setupFunc - Function to set up animations
 * @param {Object} ref - Element reference
 * @param {Array} deps - Dependencies for useLayoutEffect
 */
export const useGSAPContext = (setupFunc, ref, deps = []) => {
    useLayoutEffect(() => {
        const settings = getOptimizedSettings();
        if (!settings.enabled || !ref.current) return;

        const ctx = gsap.context(() => {
            setupFunc(settings);
        }, ref);

        return () => ctx.revert(); // Clean up animations
    }, deps);
};

/**
 * Optimized hook for staggered animations with performance considerations
 */
export const useStaggerAnimation = (options = {}, deps = []) => {
    const containerRef = useRef(null);

    useGSAPContext((settings) => {
        // Get configuration with overrides
        const config = {
            delay: options.delay || 0,
            stagger: options.stagger || settings.stagger,
            y: options.y || 30,
            duration: options.duration || settings.duration,
            ease: options.ease || settings.ease,
            start: options.start || animationSettings.defaults.defaultStartPosition,
        };

        // Get elements
        const elements = containerRef.current.children;
        if (elements.length === 0) return;

        // Set initial state
        gsap.set([...elements], { opacity: 0, y: config.y });

        // Create batched animations for better performance
        if (settings.simplify && elements.length > animationSettings.defaults.batchMax) {
            // For low-power devices, batch animations
            const batches = [];
            for (let i = 0; i < elements.length; i += animationSettings.defaults.batchMax) {
                batches.push([...elements].slice(i, i + animationSettings.defaults.batchMax));
            }

            // Animate each batch with a delay
            batches.forEach((batch, index) => {
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    duration: config.duration,
                    delay: config.delay + index * animationSettings.defaults.batchDelay,
                    ease: config.ease,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: config.start,
                        toggleActions: "play none none none"
                    }
                });
            });
        } else {
            // For higher-power devices, use standard stagger
            gsap.to([...elements], {
                opacity: 1,
                y: 0,
                duration: config.duration,
                stagger: config.stagger,
                delay: config.delay,
                ease: config.ease,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: config.start,
                    toggleActions: "play none none none"
                }
            });
        }
    }, containerRef, deps);

    return containerRef;
};

/**
 * Optimized hook for fade-in animation on scroll
 */
export const useFadeInAnimation = (options = {}, deps = []) => {
    const elementRef = useRef(null);

    useGSAPContext((settings) => {
        const element = elementRef.current;

        // Get configuration with overrides
        const config = {
            delay: options.delay || 0,
            y: options.y || 50,
            duration: options.duration || settings.duration,
            ease: options.ease || settings.ease,
            start: options.start || animationSettings.defaults.defaultStartPosition
        };

        // Set initial state and animate
        gsap.set(element, { opacity: 0, y: config.y });
        gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: config.duration,
            delay: config.delay,
            ease: config.ease,
            scrollTrigger: {
                trigger: element,
                start: config.start,
                toggleActions: "play none none none"
            }
        });
    }, elementRef, deps);

    return elementRef;
};

/**
 * Optimized hook for text character-by-character reveal with performance optimizations
 */
export const useTextRevealAnimation = (options = {}, deps = []) => {
    const textRef = useRef(null);

    useGSAPContext((settings) => {
        const element = textRef.current;

        // Get configuration with overrides
        const config = {
            stagger: options.stagger || (settings.stagger * 0.4), // Characters get smaller stagger
            duration: options.duration || settings.duration,
            ease: options.ease || settings.ease,
            start: options.start || animationSettings.defaults.defaultStartPosition
        };

        // Split text approach based on device capability
        if (settings.simplify) {
            // Simplified animation for low-power devices - animate by word instead of character
            const text = element.innerText;
            element.innerHTML = "";

            const words = text.split(" ");
            words.forEach(word => {
                const wordSpan = document.createElement("span");
                wordSpan.style.display = "inline-block";
                wordSpan.style.opacity = "0";
                wordSpan.innerText = word;
                wordSpan.style.marginRight = "0.25em";
                element.appendChild(wordSpan);
            });

            gsap.to(element.children, {
                opacity: 1,
                duration: config.duration,
                stagger: config.stagger * 2, // Slightly longer stagger for words
                ease: config.ease,
                scrollTrigger: {
                    trigger: element,
                    start: config.start,
                    toggleActions: "play none none none"
                }
            });
        } else {
            // Full animation for powerful devices - character by character
            const text = element.innerText;
            element.innerHTML = "";

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

            gsap.to(wrapper.children, {
                opacity: 1,
                duration: config.duration,
                stagger: config.stagger,
                ease: config.ease,
                scrollTrigger: {
                    trigger: element,
                    start: config.start,
                    toggleActions: "play none none none"
                }
            });
        }
    }, textRef, deps);

    return textRef;
};

/**
 * Optimized hook for image reveal animation with performance considerations
 */
export const useImageRevealAnimation = (options = {}, deps = []) => {
    const containerRef = useRef(null);

    useGSAPContext((settings) => {
        const container = containerRef.current;

        // Get configuration with overrides
        const config = {
            duration: options.duration || (settings.duration * 1.2), // Image reveals typically look better with slightly longer duration
            ease: options.ease || "power2.inOut",
            start: options.start || animationSettings.defaults.defaultStartPosition
        };

        // Create overlay for reveal effect
        const overlay = document.createElement("div");
        overlay.style.position = "absolute";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "#6e6e73";
        overlay.style.transformOrigin = "right";

        // Prepare container
        container.style.position = "relative";
        container.style.overflow = "hidden";
        container.insertBefore(overlay, container.firstChild);

        // Animate with optimizations
        gsap.to(overlay, {
            scaleX: 0,
            duration: settings.simplify ? config.duration * 0.8 : config.duration, // Slightly faster for low-power
            ease: config.ease,
            scrollTrigger: {
                trigger: container,
                start: config.start,
                toggleActions: "play none none none"
            }
        });
    }, containerRef, deps);

    return containerRef;
};

/**
 * Optimized hook for parallax effects with performance considerations
 */
export const useParallaxEffect = (options = {}, deps = []) => {
    const elementRef = useRef(null);

    useGSAPContext((settings) => {
        // Skip parallax on reduced motion or low-power
        if (settings.disableParallax) return;

        const element = elementRef.current;

        // Get configuration with overrides
        const config = {
            speed: options.speed || 0.5, // How fast the parallax moves (0.5 = half speed of scroll)
            start: options.start || "top bottom",
            end: options.end || "bottom top"
        };

        // Create parallax effect
        gsap.to(element, {
            yPercent: config.speed * -100, // Move in opposite direction of scroll
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: config.start,
                end: config.end,
                scrub: true // Smooth scrubbing effect tied to scroll position
            }
        });
    }, elementRef, deps);

    return elementRef;
};

/**
 * Cleanup all ScrollTrigger instances - useful when navigating between pages
 */
export const cleanupScrollTriggers = () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

/**
 * Create a throttled function that limits execution to once per specified interval
 */
export const createThrottledAnimationHandler = (func, limit = 100) => {
    let inThrottle;

    return (...args) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
};

// Export GSAP instances for direct use
export { gsap, ScrollTrigger };