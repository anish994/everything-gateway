/**
 * The Everything Gateway - Performance Configuration
 * Optimizes loading, caching, and runtime performance
 */

// Preloading critical resources
const criticalResources = [
    'css/design-system.css',
    'css/components.css',
    'js/gateway-enhanced.js'
];

// Resource hints for better performance
const resourceHints = {
    // DNS prefetch for external resources
    dnsPrefetch: [
        'www.google.com', // For favicons
        'fonts.googleapis.com',
        'cdnjs.cloudflare.com'
    ],
    
    // Preconnect for critical third-party resources
    preconnect: [
        'https://fonts.gstatic.com'
    ]
};

// Service Worker configuration for caching
const cacheStrategy = {
    // Cache first (for static assets)
    static: [
        '/css/',
        '/js/',
        '/images/',
        '/data/'
    ],
    
    // Network first (for dynamic content)
    dynamic: [
        '/categories/',
        '/api/'
    ],
    
    // Cache duration in seconds
    duration: {
        static: 86400,    // 24 hours
        dynamic: 3600,    // 1 hour
        images: 604800    // 7 days
    }
};

// Image optimization settings
const imageOptimization = {
    // Lazy loading threshold
    lazyLoadThreshold: '50px',
    
    // WebP support detection
    webpSupport: 'picture',
    
    // Image quality settings
    quality: {
        thumbnail: 70,
        fullsize: 85
    }
};

// Performance budgets
const performanceBudgets = {
    // Maximum bundle sizes (in KB)
    javascript: 100,
    css: 50,
    images: 200,
    
    // Core Web Vitals targets
    coreWebVitals: {
        LCP: 2500,    // Largest Contentful Paint (ms)
        FID: 100,     // First Input Delay (ms)
        CLS: 0.1      // Cumulative Layout Shift
    },
    
    // Loading performance targets
    loadingTargets: {
        firstPaint: 1000,
        domContentLoaded: 1500,
        fullyLoaded: 3000
    }
};

// Animation performance settings
const animationConfig = {
    // Respect user preferences
    respectReducedMotion: true,
    
    // Use GPU acceleration
    useTransforms: true,
    
    // Optimize animation timing
    timing: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms'
    },
    
    // Easing functions
    easing: {
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
};

// Search performance optimization
const searchConfig = {
    // Debounce delay for search input (ms)
    debounceDelay: 200,
    
    // Maximum search results to display
    maxResults: 50,
    
    // Search caching duration (ms)
    cacheExpiry: 300000, // 5 minutes
    
    // Use Web Workers for search
    useWebWorker: true
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        criticalResources,
        resourceHints,
        cacheStrategy,
        imageOptimization,
        performanceBudgets,
        animationConfig,
        searchConfig
    };
} else {
    window.PerformanceConfig = {
        criticalResources,
        resourceHints,
        cacheStrategy,
        imageOptimization,
        performanceBudgets,
        animationConfig,
        searchConfig
    };
}
