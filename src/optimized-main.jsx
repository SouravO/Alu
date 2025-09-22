import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./imports.css"; // Import fonts first
import "./index.css";
import App from "./App.jsx";

// Import performance monitoring tools
import { initPerformanceMonitoring } from "./utils/performanceMonitor";
import { animationSettings } from "./utils/optimized-animations";

// Initialize performance monitoring in development
if (import.meta.env.DEV) {
  // Configure animation settings based on device capabilities
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // Adjust animation settings for mobile
  if (isMobile) {
    animationSettings.performance.lowPower.simplifyOnMobile = true;
    // Decrease animation complexity on mobile
    animationSettings.defaults.batchMax = 2;
    animationSettings.defaults.staggerDefault = 0.05;
  }

  // Initialize performance monitoring
  initPerformanceMonitoring({
    enabled: true,
    logLevel: "warning",
    // Only show overlay if query param is present
    showOverlay: window.location.search.includes("showPerf=true"),
  });
}

// Initialize app with optimized animations
const mountApp = () => {
  const root = createRoot(document.getElementById("root"));

  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
};

// Check if the browser is idle before mounting
if ("requestIdleCallback" in window) {
  // Use requestIdleCallback to wait for browser idle time
  window.requestIdleCallback(mountApp);
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(mountApp, 0);
}
