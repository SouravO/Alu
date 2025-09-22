# AluPack Website

Modern website for AluPack, an aluminum food packaging company, featuring GSAP animations and performance optimizations.

## Features

- Responsive design using React and Tailwind CSS
- Modern animations with GSAP and ScrollTrigger
- Performance-optimized for all devices
- React Router for seamless navigation
- 3D product displays

## Animation System

This project features a sophisticated animation system with performance optimizations:

- **Adaptive Animations**: Automatically adjusts animation complexity based on device capabilities
- **Performance Monitoring**: Built-in tools to track FPS and animation performance
- **Optimization Strategies**: Batch processing, staggered reveals, and reduced motion support

For detailed information on the animation system and optimization techniques, see the [Animation Optimization Guide](./animation-optimization.md).

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/alupack-website.git
cd alupack-website
```

2. Install dependencies

```bash
npm install
# or
yarn
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
alupack-website/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images and other assets
│   ├── components/     # Reusable components
│   ├── utils/          # Utility functions
│   │   ├── animations.js             # Animation utilities
│   │   ├── optimized-animations.js   # Performance-optimized animations
│   │   └── performanceMonitor.js     # Animation performance monitoring
│   ├── App.jsx         # Main application component
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
└── animation-optimization.md  # Animation optimization documentation
```

## Animation Performance Debugging

To enable the performance monitoring overlay:

1. Start the development server
2. Add `?showPerf=true` to the URL (e.g., `http://localhost:5173/?showPerf=true`)
3. The overlay will show FPS, active animations, and performance metrics

## Technologies Used

- [React](https://reactjs.org/) - UI Framework
- [Vite](https://vitejs.dev/) - Build tool and development server
- [GSAP](https://greensock.com/gsap/) - Animation library
- [React Router](https://reactrouter.com/) - Navigation
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Performance Optimization Techniques

- CSS transitions for simple animations on low-power devices
- GSAP for complex animations on high-performance devices
- Intersection Observer for triggering animations
- Reduced motion support for accessibility
- Memory leak prevention with proper cleanup
- Component memoization to reduce re-renders
- Animation batching for large collections
- Adaptive staggering based on device capabilities
