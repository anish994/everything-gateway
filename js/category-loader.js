/**
 * Category Loader - Dynamic Platform Loading System
 * Handles loading and rendering of category-specific platform data
 */

class CategoryLoader {
    constructor() {
        this.loadingState = null;
        this.errorState = null;
        this.container = null;
        this.currentCategory = null;
        this.retryCount = 0;
        this.maxRetries = 3;
    }

    /**
     * Initialize the category loader
     * @param {string} categorySlug - The category identifier (e.g., 'anime', 'gaming')
     * @param {Object} options - Configuration options
     */
    async init(categorySlug, options = {}) {
        this.currentCategory = categorySlug;
        this.options = {
            fallbackTitle: options.fallbackTitle || 'Category',
            fallbackDescription: options.fallbackDescription || 'Loading platforms...',
            ...options
        };

        // Get DOM elements
        this.loadingState = document.getElementById('loading-state');
        this.errorState = document.getElementById('error-state');
        this.container = document.getElementById('platforms-container');

        if (!this.container) {
            console.error('CategoryLoader: platforms-container element not found');
            return;
        }

        // Start loading
        await this.loadCategory();
    }

    /**
     * Load category data from JSON file
     */
    async loadCategory() {
        try {
            this.showLoading();
            
            const response = await fetch(`../../data/${this.currentCategory}.json`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (!data || !data.sections) {
                throw new Error('Invalid category data structure');
            }

            this.renderCategory(data);
            this.showContent();
            
        } catch (error) {
            console.error('CategoryLoader: Failed to load category data:', error);
            this.handleError(error);
        }
    }

    /**
     * Render the category content
     */
    renderCategory(data) {
        const categoryHtml = `
            <div class="category-content">
                <div class="category-overview">
                    <h2 class="category-title">${data.category || this.options.fallbackTitle}</h2>
                    <p class="category-description">${data.description || this.options.fallbackDescription}</p>
                    ${data.metadata ? this.renderMetadata(data.metadata) : ''}
                </div>

                <div class="sections-container">
                    ${data.sections.map(section => this.renderSection(section)).join('')}
                </div>
            </div>
        `;

        this.container.innerHTML = categoryHtml;
        this.attachEventListeners();
    }

    /**
     * Render category metadata
     */
    renderMetadata(metadata) {
        return `
            <div class="category-stats">
                <div class="stat-item">
                    <span class="stat-number">${metadata.totalSections || 0}</span>
                    <span class="stat-label">Sections</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${metadata.totalPlatforms || 0}</span>
                    <span class="stat-label">Platforms</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${metadata.lastUpdated || 'Recently'}</span>
                    <span class="stat-label">Updated</span>
                </div>
            </div>
        `;
    }

    /**
     * Render a platform section
     */
    renderSection(section) {
        return `
            <section class="platforms-section">
                <div class="section-header">
                    <h3 class="section-title">${section.title}</h3>
                    <p class="section-description">${section.description}</p>
                </div>
                
                <div class="platforms-grid">
                    ${section.platforms.map(platform => this.renderPlatform(platform)).join('')}
                </div>
            </section>
        `;
    }

    /**
     * Render a single platform
     */
    renderPlatform(platform) {
        return `
            <a href="${platform.url}" 
               class="platform-card" 
               target="_blank" 
               rel="noopener noreferrer"
               data-platform="${platform.name.toLowerCase().replace(/\s+/g, '-')}"
               aria-label="Visit ${platform.name} - ${platform.description}">
                <div class="platform-icon" aria-hidden="true">${platform.icon}</div>
                <div class="platform-info">
                    <h4 class="platform-name">${platform.name}</h4>
                    <p class="platform-description">${platform.description}</p>
                </div>
                <div class="platform-action">
                    <span class="visit-text">Visit →</span>
                </div>
            </a>
        `;
    }

    /**
     * Show loading state
     */
    showLoading() {
        if (this.loadingState) this.loadingState.style.display = 'flex';
        if (this.errorState) this.errorState.style.display = 'none';
        if (this.container) this.container.style.display = 'none';
    }

    /**
     * Show content
     */
    showContent() {
        if (this.loadingState) this.loadingState.style.display = 'none';
        if (this.errorState) this.errorState.style.display = 'none';
        if (this.container) this.container.style.display = 'block';
    }

    /**
     * Handle errors with retry logic
     */
    handleError(error) {
        if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            console.log(`CategoryLoader: Retrying... (${this.retryCount}/${this.maxRetries})`);
            setTimeout(() => this.loadCategory(), 1000 * this.retryCount);
            return;
        }

        // Show error state
        if (this.loadingState) this.loadingState.style.display = 'none';
        if (this.container) this.container.style.display = 'none';
        
        if (this.errorState) {
            this.errorState.style.display = 'block';
            
            // Update error message if available
            const errorContent = this.errorState.querySelector('.error-content p');
            if (errorContent) {
                errorContent.textContent = `Failed to load ${this.currentCategory} platforms. ${error.message}`;
            }
        }
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Track platform clicks for analytics
        const platformCards = this.container.querySelectorAll('.platform-card');
        platformCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const platformName = card.dataset.platform;
                const url = card.href;
                
                // Analytics tracking
                if (window.gtag) {
                    gtag('event', 'platform_click', {
                        event_category: 'Platform',
                        event_label: platformName,
                        platform_category: this.currentCategory,
                        platform_url: url
                    });
                }
                
                console.log(`CategoryLoader: Platform clicked - ${platformName}`);
            });
        });

        // Add keyboard navigation support
        platformCards.forEach(card => {
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }

    /**
     * Retry loading
     */
    retry() {
        this.retryCount = 0;
        this.loadCategory();
    }
}

// Global instance
window.CategoryLoader = new CategoryLoader();

// Auto-retry button functionality
document.addEventListener('DOMContentLoaded', function() {
    const retryButtons = document.querySelectorAll('.retry-button');
    retryButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (window.CategoryLoader) {
                window.CategoryLoader.retry();
            }
        });
    });
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CategoryLoader;
}
