// Google Analytics 4 Integration for Everything Gateway
// Privacy-friendly analytics with user consent

class GatewayAnalytics {
    constructor(measurementId) {
        this.measurementId = measurementId;
        this.initialized = false;
        this.consentGiven = localStorage.getItem('analytics-consent') === 'true';
        this.init();
    }

    init() {
        // Only load if consent given or in development
        if (this.consentGiven || window.location.hostname === 'localhost') {
            this.loadGoogleAnalytics();
            this.initialized = true;
        } else {
            this.showConsentBanner();
        }
    }

    loadGoogleAnalytics() {
        if (!this.measurementId || this.measurementId === 'YOUR_GA_ID_HERE') return;

        // Load GA4 script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() { dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', this.measurementId, {
            anonymize_ip: true,
            cookie_expires: 60 * 60 * 24 * 30 // 30 days
        });

        console.log('✅ Analytics loaded:', this.measurementId);
    }

    showConsentBanner() {
        const banner = document.createElement('div');
        banner.className = 'analytics-consent-banner';
        banner.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(0,0,0,0.9);
                color: white;
                padding: 20px;
                border-radius: 8px;
                max-width: 350px;
                z-index: 10000;
                font-family: -apple-system, system-ui, sans-serif;
                font-size: 14px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            ">
                <div style="margin-bottom: 15px;">
                    🍪 We use privacy-friendly analytics to improve your experience
                </div>
                <div>
                    <button onclick="window.analytics.acceptAnalytics()" style="
                        background: #667eea;
                        border: none;
                        color: white;
                        padding: 8px 16px;
                        border-radius: 4px;
                        margin-right: 10px;
                        cursor: pointer;
                        font-size: 13px;
                    ">Accept</button>
                    <button onclick="window.analytics.declineAnalytics()" style="
                        background: transparent;
                        border: 1px solid #666;
                        color: #ccc;
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 13px;
                    ">Decline</button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);
    }

    acceptAnalytics() {
        localStorage.setItem('analytics-consent', 'true');
        this.consentGiven = true;
        this.loadGoogleAnalytics();
        this.hideBanner();
        this.trackEvent('consent_given', { consent_type: 'analytics' });
    }

    declineAnalytics() {
        localStorage.setItem('analytics-consent', 'false');
        this.hideBanner();
    }

    hideBanner() {
        const banner = document.querySelector('.analytics-consent-banner');
        if (banner) banner.remove();
    }

    // Track custom events
    trackEvent(eventName, parameters = {}) {
        if (!this.initialized || !window.gtag) return;
        
        console.log('📊 Analytics Event:', eventName, parameters);
        window.gtag('event', eventName, {
            event_category: 'everything_gateway',
            ...parameters
        });
    }

    // Track page views
    trackPageView(path, title) {
        if (!this.initialized || !window.gtag) return;
        
        window.gtag('config', this.measurementId, {
            page_path: path,
            page_title: title
        });
    }

    // Track search usage
    trackSearch(query, category = null) {
        this.trackEvent('search_used', {
            search_term: query,
            search_category: category
        });
    }

    // Track category visits
    trackCategoryVisit(category, count) {
        this.trackEvent('category_visit', {
            category_name: category,
            resource_count: count
        });
    }

    // Track resource clicks
    trackResourceClick(resourceName, category, url) {
        this.trackEvent('resource_click', {
            resource_name: resourceName,
            resource_category: category,
            resource_url: url
        });
    }
}

// Initialize analytics (replace with your GA4 Measurement ID)
window.analytics = new GatewayAnalytics('YOUR_GA_ID_HERE');

// Auto-track page loads
document.addEventListener('DOMContentLoaded', () => {
    window.analytics.trackPageView(window.location.pathname, document.title);
});
