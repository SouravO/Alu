/**
 * Animation Performance Monitoring Utility
 * 
 * This utility helps track and optimize animation performance by monitoring:
 * - FPS (Frames Per Second)
 * - Animation Lifecycle Events
 * - Memory Usage
 * - Browser Paint/Layout events
 */

// Configuration for performance monitoring
const perfConfig = {
    enabled: process.env.NODE_ENV !== 'production', // Only enable in development by default
    logLevel: 'warning', // 'debug', 'info', 'warning', 'error'
    throttleTime: 2000, // How often to log performance issues (ms)
    thresholds: {
        fps: 30, // Log warning if FPS drops below this value
        animationCount: 20, // Maximum recommended simultaneous animations
        longTask: 50 // Log long tasks over this duration (ms)
    }
};

// State to track performance metrics
let metrics = {
    fps: {
        current: 60,
        history: []
    },
    activeAnimations: 0,
    totalAnimations: 0,
    longTasks: 0,
    lastReport: 0
};

/**
 * Start monitoring FPS
 */
export const startFPSMonitoring = () => {
    if (!perfConfig.enabled) return;

    let lastTime = performance.now();
    let frames = 0;

    const calculateFPS = () => {
        const now = performance.now();
        const delta = now - lastTime;

        if (delta > 1000) {
            metrics.fps.current = Math.round((frames * 1000) / delta);
            metrics.fps.history.push(metrics.fps.current);

            // Keep history to last 10 measurements
            if (metrics.fps.history.length > 10) {
                metrics.fps.history.shift();
            }

            // Log warning if FPS is below threshold
            if (metrics.fps.current < perfConfig.thresholds.fps &&
                (now - metrics.lastReport) > perfConfig.throttleTime) {
                metrics.lastReport = now;
                logPerformanceWarning(
                    `Low FPS detected: ${metrics.fps.current} FPS`,
                    { fps: metrics.fps.current, averageFPS: getAverageFPS() }
                );
            }

            frames = 0;
            lastTime = now;
        }

        frames++;
        requestAnimationFrame(calculateFPS);
    };

    // Start monitoring
    requestAnimationFrame(calculateFPS);

    // Set up PerformanceObserver for long tasks
    if (typeof PerformanceObserver !== 'undefined') {
        const longTaskObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();

            entries.forEach(entry => {
                if (entry.duration > perfConfig.thresholds.longTask) {
                    metrics.longTasks++;

                    if (perfConfig.logLevel === 'debug' || perfConfig.logLevel === 'info') {
                        console.warn(`Long task detected: ${Math.round(entry.duration)}ms`, entry);
                    }
                }
            });
        });

        try {
            longTaskObserver.observe({ entryTypes: ['longtask'] });
        } catch (e) {
            // longtask observation not supported in this browser
        }
    }
};

/**
 * Get average FPS from history
 */
const getAverageFPS = () => {
    if (metrics.fps.history.length === 0) return 60;

    const sum = metrics.fps.history.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / metrics.fps.history.length);
};

/**
 * Track animation creation and cleanup
 */
export const trackAnimation = () => {
    if (!perfConfig.enabled) return { cleanup: () => { } };

    metrics.activeAnimations++;
    metrics.totalAnimations++;

    // Check if too many animations are active
    if (metrics.activeAnimations > perfConfig.thresholds.animationCount) {
        logPerformanceWarning(
            `High number of active animations: ${metrics.activeAnimations}`,
            { activeAnimations: metrics.activeAnimations, totalCreated: metrics.totalAnimations }
        );
    }

    // Return cleanup function
    return {
        cleanup: () => {
            metrics.activeAnimations = Math.max(0, metrics.activeAnimations - 1);
        }
    };
};

/**
 * Log performance warnings based on configured log level
 */
const logPerformanceWarning = (message, data = {}) => {
    if (!perfConfig.enabled) return;

    const now = new Date().toISOString();

    switch (perfConfig.logLevel) {
        case 'debug':
        case 'info':
            console.warn(
                `%c[Animation Performance ${now}]%c ${message}`,
                'color: orange; font-weight: bold',
                'color: inherit',
                data
            );
            break;
        case 'warning':
            console.warn(
                `[Animation Performance] ${message}`
            );
            break;
        case 'error':
            if (data.fps && data.fps < 20) {
                console.error(
                    `[Animation Performance] CRITICAL: ${message}`
                );
            }
            break;
        default:
            break;
    }
};

/**
 * Get current performance metrics
 */
export const getPerformanceMetrics = () => {
    return {
        fps: metrics.fps.current,
        averageFPS: getAverageFPS(),
        activeAnimations: metrics.activeAnimations,
        totalAnimationsCreated: metrics.totalAnimations,
        longTasks: metrics.longTasks
    };
};

/**
 * Enable debugging overlay in dev environment
 */
export const enablePerformanceOverlay = () => {
    if (!perfConfig.enabled || typeof document === 'undefined') return;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.bottom = '10px';
    overlay.style.right = '10px';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
    overlay.style.color = 'white';
    overlay.style.padding = '10px';
    overlay.style.borderRadius = '5px';
    overlay.style.fontFamily = 'monospace';
    overlay.style.fontSize = '12px';
    overlay.style.zIndex = '9999';

    // Add to document
    document.body.appendChild(overlay);

    // Update overlay
    const updateOverlay = () => {
        const data = getPerformanceMetrics();

        overlay.innerHTML = `
      FPS: ${data.fps} (avg: ${data.averageFPS})<br>
      Active Animations: ${data.activeAnimations}<br>
      Total Created: ${data.totalAnimationsCreated}<br>
      Long Tasks: ${data.longTasks}
    `;

        // Color code based on performance
        if (data.fps < 30) {
            overlay.style.backgroundColor = 'rgba(255,0,0,0.7)';
        } else if (data.fps < 50) {
            overlay.style.backgroundColor = 'rgba(255,165,0,0.7)';
        } else {
            overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
        }

        setTimeout(updateOverlay, 1000);
    };

    updateOverlay();
};

/**
 * Initialize performance monitoring
 */
export const initPerformanceMonitoring = (config = {}) => {
    // Apply custom config
    Object.assign(perfConfig, config);

    if (!perfConfig.enabled) return;

    startFPSMonitoring();

    // Only show overlay when explicitly requested
    if (config.showOverlay) {
        enablePerformanceOverlay();
    }
};

export default {
    initPerformanceMonitoring,
    trackAnimation,
    getPerformanceMetrics
};