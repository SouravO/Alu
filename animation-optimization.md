# Animation Performance Optimization Guide

This document provides guidelines for optimizing animations in the AluPack project. Follow these best practices to ensure smooth animations and a responsive user experience across all devices.

## Table of Contents

1. [Animation Framework](#animation-framework)
2. [Performance Considerations](#performance-considerations)
3. [Using the Optimized Animations](#using-the-optimized-animations)
4. [Debugging Performance Issues](#debugging-performance-issues)
5. [Performance Testing](#performance-testing)

## Animation Framework

The project uses an optimized animation system built on GSAP with the following key components:

- **optimized-animations.js**: Core animation utilities with performance optimizations
- **OptimizedAnimatedComponents.jsx**: Reusable animated components with performance considerations
- **performanceMonitor.js**: Utilities for monitoring animation performance

## Performance Considerations

### High-Impact Performance Factors

1. **Number of Animated Elements**:

   - Keep the number of simultaneously animated elements below 20
   - Use staggered animations for groups of elements
   - Batch animations for large collections

2. **Animation Complexity**:

   - Use simpler animations on mobile devices
   - Avoid complex physics simulations
   - Prefer CSS transforms over other properties

3. **Property Selection**:
   - Animate `transform` and `opacity` when possible
   - Avoid animating `width`, `height`, or `top`/`left`
   - Use `will-change` property sparingly

### Device-Specific Optimizations

The animation system automatically detects device capabilities and adjusts:

- **Mobile/Low-Power Devices**:

  - Simplified animations (fewer animated elements)
  - Reduced motion complexity
  - Batch processing instead of individual animations

- **Reduced Motion Preference**:
  - Respects user's system preferences
  - Simplifies or disables animations when requested
  - Falls back to simple transitions

## Using the Optimized Animations

### Basic Components

```jsx
import {
  AnimatedText,
  AnimatedTitle,
  AnimatedImage
} from './components/OptimizedAnimatedComponents';

// Text that reveals character by character
<AnimatedText
  text="Your text here"
  tag="p"
  className="text-lg"
  color="#ffffff"
/>

// Animated heading with optional underline
<AnimatedTitle
  text="Section Title"
  tag="h2"
  underline={true}
  underlineColor="#4737FF"
/>

// Image with reveal animation
<AnimatedImage
  src="/path/to/image.jpg"
  alt="Description"
  className="rounded-lg"
/>
```

### Animation Hooks

```jsx
import {
  useStaggerAnimation,
  useFadeInAnimation,
  useTextRevealAnimation,
  useImageRevealAnimation,
  useParallaxEffect,
} from "./utils/optimized-animations";

// For staggered list animations
const MyList = () => {
  const listRef = useStaggerAnimation({
    delay: 0.2,
    stagger: 0.1,
  });

  return (
    <ul ref={listRef}>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  );
};

// For parallax effects
const ParallaxSection = () => {
  const bgRef = useParallaxEffect({
    speed: 0.5,
  });

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        ref={bgRef}
        className="absolute w-full h-full"
        style={{ backgroundImage: "url(/bg.jpg)" }}
      />
      <div className="relative z-10">Content here</div>
    </div>
  );
};
```

## Debugging Performance Issues

### Performance Monitoring

The performance monitoring system helps identify issues:

1. Enable the performance overlay by adding `?showPerf=true` to your URL
2. Watch for FPS drops below 30
3. Monitor the number of active animations

### Common Issues and Solutions

1. **Low FPS on Mobile**:

   - Reduce the number of animated elements
   - Increase batch sizes
   - Use simpler animations

2. **Jank During Scrolling**:

   - Avoid heavy scroll-triggered animations
   - Throttle scroll events
   - Use IntersectionObserver instead of scroll events

3. **Memory Leaks**:
   - Ensure all animations are properly cleaned up
   - Use the cleanup functions returned by hooks
   - Check for persistent references to DOM elements

## Performance Testing

To test animation performance:

1. Run Chrome DevTools Performance tab
2. Use the CPU throttling feature (4x or 6x slowdown)
3. Record while scrolling through animations
4. Look for long tasks in the flame chart
5. Identify any animation frames that take > 16ms

### Test Scenarios

- Scroll test: Smooth scrolling through entire page
- Load test: Initial page load animation performance
- Interaction test: Testing animations triggered by user interaction

## Best Practices Checklist

- [ ] Lazy load components with animations
- [ ] Use passive scroll listeners
- [ ] Avoid animating non-composited properties
- [ ] Keep animations under 300ms for UI feedback
- [ ] Implement responsive animation strategies
- [ ] Test on low-end devices
- [ ] Respect user motion preferences
