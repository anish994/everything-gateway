/**
 * The Everything Gateway - Enhanced Core JavaScript Module v2.0
 * Provides search, favorites, keyboard shortcuts, animations, and dynamic functionality
 * With performance optimizations and accessibility enhancements
 */

class EverythingGatewayEnhanced {
    constructor() {
        this.resources = [];
        this.favorites = new Set();
        this.isSearchOpen = false;
        this.searchResults = [];
        this.selectedIndex = 0;
        this.searchCache = new Map();
        this.animationQueue = [];
        this.debounceTimer = null;
        this.searchWorker = null;
        
        // Performance monitoring
        this.metrics = {
            searchLatency: [],
            renderTime: [],
            animationFrames: 0
        };
        
        // Initialize
        this.init();
    }
    
    /**
     * Initialize the gateway with enhanced features
     */
    async init() {
        try {
            await this.loadFavorites();
            await this.createSearchOverlay();
            this.bindKeyboardShortcuts();
            this.bindSearchEvents();
            this.setupAnimations();
            this.setupIntersectionObserver();
            this.setupPreloading();
            
            // Load all resource data with loading states
            await this.loadAllResources();
            
            // Initialize category animations
            this.initializeCategoryAnimations();
            
            console.log('🌟 Enhanced Everything Gateway initialized!', {
                resources: this.resources.length,
                features: ['Search', 'Animations', 'A11y', 'Performance'],
                version: '2.0'
            });
            
        } catch (error) {
            console.error('Failed to initialize Enhanced Gateway:', error);
            // Fallback to basic functionality
            this.initializeFallback();
        }
    }
    
    /**
     * Setup animations with reduced motion support
     */
    setupAnimations() {
        // Check for reduced motion preference
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!this.prefersReducedMotion) {
            // Setup scroll-triggered animations
            this.setupScrollAnimations();
            // Setup hover effects
            this.setupHoverAnimations();
            // Setup page transition effects
            this.setupPageTransitions();
        }
    }
    
    /**
     * Setup scroll-triggered animations
     */
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateIn(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all cards for entrance animations
        document.querySelectorAll('.category-card, .platform-card').forEach(card => {
            this.scrollObserver.observe(card);
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        });
    }
    
    /**
     * Animate element into view
     */
    animateIn(element, delay = 0) {
        if (this.prefersReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'none';
            return;
        }
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    }
    
    /**
     * Initialize category cards with staggered animations
     */
    initializeCategoryAnimations() {
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach((card, index) => {
            this.animateIn(card, index * 100);
        });
    }
    
    /**
     * Enhanced search with debouncing and caching
     */
    async performSearch(query, options = {}) {
        const startTime = performance.now();
        
        // Check cache first
        if (this.searchCache.has(query)) {
            const cachedResults = this.searchCache.get(query);
            this.displayResults(cachedResults);
            return cachedResults;
        }
        
        // Clear previous debounce
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        
        return new Promise((resolve) => {
            this.debounceTimer = setTimeout(async () => {
                const results = await this.executeSearch(query, options);
                
                // Cache results
                this.searchCache.set(query, results);
                
                // Track performance
                const latency = performance.now() - startTime;
                this.metrics.searchLatency.push(latency);
                
                this.displayResults(results);
                resolve(results);
            }, 200);
        });
    }
    
    /**
     * Execute search with fuzzy matching and intelligent ranking
     */
    async executeSearch(query, options = {}) {
        if (!query.trim()) return [];
        
        const searchTerms = query.toLowerCase().split(/\s+/);
        const results = [];
        
        for (const resource of this.resources) {
            const score = this.calculateRelevanceScore(resource, searchTerms);
            
            if (score > 0) {
                results.push({
                    ...resource,
                    relevanceScore: score,
                    matchedTerms: this.getMatchedTerms(resource, searchTerms)
                });
            }
        }
        
        // Sort by relevance score
        return results.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 50);
    }
    
    /**
     * Calculate relevance score with weighted factors
     */
    calculateRelevanceScore(resource, searchTerms) {
        let score = 0;
        const name = resource.name.toLowerCase();
        const description = resource.description.toLowerCase();
        const tags = resource.tags || [];
        
        searchTerms.forEach(term => {
            // Exact name matches get highest score
            if (name.includes(term)) {
                score += name === term ? 100 : 50;
            }
            
            // Description matches
            if (description.includes(term)) {
                score += 20;
            }
            
            // Tag matches
            tags.forEach(tag => {
                if (tag.includes(term)) {
                    score += 15;
                }
            });
            
            // Fuzzy matching for typos
            if (this.fuzzyMatch(name, term) || this.fuzzyMatch(description, term)) {
                score += 10;
            }
        });
        
        // Boost popular/featured items
        if (resource.featured) score *= 1.2;
        if (this.favorites.has(resource.url)) score *= 1.1;
        
        return score;
    }
    
    /**
     * Simple fuzzy matching for typo tolerance
     */
    fuzzyMatch(text, term) {
        if (term.length < 3) return false;
        
        const words = text.split(' ');
        return words.some(word => {
            if (Math.abs(word.length - term.length) > 2) return false;
            
            let matches = 0;
            const minLength = Math.min(word.length, term.length);
            
            for (let i = 0; i < minLength; i++) {
                if (word[i] === term[i]) matches++;
            }
            
            return matches / minLength > 0.7;
        });
    }
    
    /**
     * Enhanced search results display with animations
     */
    displayResults(results) {
        const container = this.searchResults;
        const startTime = performance.now();
        
        // Show loading state briefly for perceived performance
        container.innerHTML = '<div class="search-loading"><div class="loading-spinner"></div><span>Searching...</span></div>';
        
        requestAnimationFrame(() => {
            if (results.length === 0) {
                container.innerHTML = this.getEmptyResultsHTML();
                this.announceToScreenReader('No results found');
                return;
            }
            
            const resultsHTML = this.generateResultsHTML(results);
            container.innerHTML = resultsHTML;
            
            // Announce results to screen readers
            this.announceToScreenReader(`${results.length} results found`);
            
            // Animate results in
            if (!this.prefersReducedMotion) {
                this.animateSearchResults();
            }
            
            // Track render performance
            const renderTime = performance.now() - startTime;
            this.metrics.renderTime.push(renderTime);
            
            // Reset selection
            this.selectedIndex = 0;
            this.updateSelection();
        });
    }
    
    /**
     * Animate search results entrance
     */
    animateSearchResults() {
        const resultItems = this.searchResults.querySelectorAll('.search-result-item');
        resultItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 50);
        });
    }
    
    /**
     * Generate HTML for search results with accessibility
     */
    generateResultsHTML(results) {
        return `
            <div class="search-results-header" role="status" aria-live="polite">
                <span class="results-count">${results.length} result${results.length !== 1 ? 's' : ''}</span>
            </div>
            ${results.map((result, index) => `
                <div class="search-result-item" 
                     data-url="${result.url}" 
                     data-index="${index}"
                     role="option"
                     aria-selected="${index === 0 ? 'true' : 'false'}"
                     tabindex="${index === 0 ? '0' : '-1'}">
                    <div class="result-icon">
                        <span class="category-emoji">${result.categoryEmoji}</span>
                    </div>
                    <div class="result-content">
                        <div class="result-name">${this.highlightMatch(result.name, result.matchedTerms)}</div>
                        <div class="result-description">${this.highlightMatch(result.description, result.matchedTerms)}</div>
                        <div class="result-meta">
                            <span class="result-category">${result.category}</span>
                            ${this.favorites.has(result.url) ? '<span class="result-favorite">★</span>' : ''}
                        </div>
                    </div>
                    <div class="result-actions">
                        <button class="favorite-btn" 
                                onclick="gateway.toggleFavorite('${result.url}')"
                                aria-label="${this.favorites.has(result.url) ? 'Remove from favorites' : 'Add to favorites'}">
                            ${this.favorites.has(result.url) ? '★' : '☆'}
                        </button>
                    </div>
                </div>
            `).join('')}
        `;
    }
    
    /**
     * Highlight search matches in text
     */
    highlightMatch(text, matchedTerms = []) {
        if (!matchedTerms.length) return text;
        
        let highlightedText = text;
        matchedTerms.forEach(term => {
            const regex = new RegExp(`(${term})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
        });
        
        return highlightedText;
    }
    
    /**
     * Announce messages to screen readers
     */
    announceToScreenReader(message) {
        // Create or update aria-live region
        let announcer = document.getElementById('search-announcer');
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'search-announcer';
            announcer.className = 'sr-only';
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            document.body.appendChild(announcer);
        }
        
        announcer.textContent = message;
    }
    
    /**
     * Enhanced keyboard navigation with better accessibility
     */
    enhancedKeyboardNavigation(e) {
        const results = this.searchResults.querySelectorAll('.search-result-item');
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.selectedIndex = Math.min(this.selectedIndex + 1, results.length - 1);
                this.updateSelection();
                this.scrollSelectedIntoView();
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
                this.updateSelection();
                this.scrollSelectedIntoView();
                break;
                
            case 'Enter':
                e.preventDefault();
                if (results[this.selectedIndex]) {
                    const url = results[this.selectedIndex].dataset.url;
                    this.openUrl(url);
                }
                break;
                
            case 'f':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    if (results[this.selectedIndex]) {
                        const url = results[this.selectedIndex].dataset.url;
                        this.toggleFavorite(url);
                    }
                }
                break;
                
            case 'Home':
                e.preventDefault();
                this.selectedIndex = 0;
                this.updateSelection();
                this.scrollSelectedIntoView();
                break;
                
            case 'End':
                e.preventDefault();
                this.selectedIndex = results.length - 1;
                this.updateSelection();
                this.scrollSelectedIntoView();
                break;
        }
    }
    
    /**
     * Update selection with proper ARIA attributes
     */
    updateSelection() {
        const results = this.searchResults.querySelectorAll('.search-result-item');
        
        results.forEach((result, index) => {
            const isSelected = index === this.selectedIndex;
            result.classList.toggle('selected', isSelected);
            result.setAttribute('aria-selected', isSelected.toString());
            result.setAttribute('tabindex', isSelected ? '0' : '-1');
            
            if (isSelected) {
                result.focus();
            }
        });
    }
    
    /**
     * Scroll selected item into view smoothly
     */
    scrollSelectedIntoView() {
        const selectedItem = this.searchResults.querySelector('.search-result-item.selected');
        if (selectedItem) {
            selectedItem.scrollIntoView({
                behavior: this.prefersReducedMotion ? 'auto' : 'smooth',
                block: 'nearest'
            });
        }
    }
    
    /**
     * Enhanced favorites system with persistence and sync
     */
    async toggleFavorite(url, notify = true) {
        try {
            if (this.favorites.has(url)) {
                this.favorites.delete(url);
                if (notify) this.showToast('Removed from favorites', 'success');
            } else {
                this.favorites.add(url);
                if (notify) this.showToast('Added to favorites', 'success');
            }
            
            await this.saveFavorites();
            this.updateFavoriteButtons();
            
            // Update search results if visible
            if (this.isSearchOpen) {
                this.refreshCurrentResults();
            }
            
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
            this.showToast('Failed to update favorites', 'error');
        }
    }
    
    /**
     * Show toast notification with animations
     */
    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${this.getToastIcon(type)}</span>
                <span class="toast-message">${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.classList.add('toast-show');
        });
        
        // Animate out and remove
        setTimeout(() => {
            toast.classList.add('toast-hide');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    }
    
    /**
     * Get icon for toast type
     */
    getToastIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }
    
    /**
     * Setup intersection observer for performance
     */
    setupIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Lazy load or enhance visible elements
                    this.enhanceVisibleElement(entry.target);
                }
            });
        }, { rootMargin: '50px' });
        
        // Observe performance-critical elements
        document.querySelectorAll('.category-card').forEach(card => {
            this.intersectionObserver.observe(card);
        });
    }
    
    /**
     * Enhanced visible elements for better performance
     */
    enhanceVisibleElement(element) {
        if (!element.dataset.enhanced) {
            // Add enhanced hover effects only when visible
            this.addEnhancedHoverEffects(element);
            element.dataset.enhanced = 'true';
        }
    }
    
    /**
     * Add enhanced hover effects
     */
    addEnhancedHoverEffects(element) {
        if (this.prefersReducedMotion) return;
        
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }
    
    /**
     * Performance monitoring and optimization
     */
    monitorPerformance() {
        // Track animation frame rate
        let lastTime = performance.now();
        const measureFPS = (currentTime) => {
            this.metrics.animationFrames++;
            const delta = currentTime - lastTime;
            
            if (delta >= 1000) {
                const fps = Math.round((this.metrics.animationFrames * 1000) / delta);
                console.log(`🎯 Performance: ${fps} FPS`);
                
                this.metrics.animationFrames = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
    }
    
    /**
     * Load all resources from JSON files
     */
    async loadAllResources() {
        try {
            const basePath = window.location.pathname.includes('/categories/') ? '../../data/' : 'data/';
            
            const [searchEngines, tools, entertainment] = await Promise.all([
                this.loadJSON(basePath + 'search-engines.json'),
                this.loadJSON(basePath + 'tools.json'),
                this.loadJSON(basePath + 'entertainment.json')
            ]);
            
            this.resources = [
                ...this.processResources(searchEngines, 'search-engines', '🔍'),
                ...this.processResources(tools, 'tools', '🛠️'),
                ...this.processResources(entertainment, 'entertainment', '🎭')
            ];
            
            console.log(`📚 Loaded ${this.resources.length} resources`);
            
        } catch (error) {
            console.error('Failed to load resources:', error);
            this.resources = this.getFallbackResources();
        }
    }
    
    /**
     * Load JSON data from file
     */
    async loadJSON(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load ${url}`);
        return response.json();
    }
    
    /**
     * Process resources from JSON into searchable format
     */
    processResources(data, category, emoji) {
        const resources = [];
        
        if (data.sections) {
            data.sections.forEach(section => {
                section.resources.forEach(resource => {
                    resources.push({
                        name: resource.name,
                        url: resource.url,
                        description: resource.description,
                        category: category,
                        categoryEmoji: emoji,
                        section: section.title,
                        tags: this.extractTags(resource.name, resource.description, section.title)
                    });
                });
            });
        } else if (data.categories) {
            Object.values(data.categories).forEach(cat => {
                cat.engines.forEach(engine => {
                    resources.push({
                        name: engine.name,
                        url: engine.url,
                        description: engine.description,
                        category: category,
                        categoryEmoji: emoji,
                        section: cat.title,
                        tags: this.extractTags(engine.name, engine.description, cat.title)
                    });
                });
            });
        }
        
        return resources;
    }
    
    /**
     * Extract searchable tags from resource data
     */
    extractTags(name, description, section) {
        const text = `${name} ${description} ${section}`.toLowerCase();
        return text.split(/\s+/).filter(word => word.length > 2);
    }
    
    /**
     * Get matched terms for highlighting
     */
    getMatchedTerms(resource, searchTerms) {
        const matchedTerms = [];
        const text = `${resource.name} ${resource.description}`.toLowerCase();
        
        searchTerms.forEach(term => {
            if (text.includes(term)) {
                matchedTerms.push(term);
            }
        });
        
        return matchedTerms;
    }
    
    /**
     * Load favorites from localStorage
     */
    async loadFavorites() {
        try {
            const saved = localStorage.getItem('gateway-favorites');
            if (saved) {
                const favorites = JSON.parse(saved);
                this.favorites = new Set(favorites);
            }
        } catch (error) {
            console.warn('Failed to load favorites:', error);
        }
    }
    
    /**
     * Save favorites to localStorage
     */
    async saveFavorites() {
        try {
            const favorites = Array.from(this.favorites);
            localStorage.setItem('gateway-favorites', JSON.stringify(favorites));
        } catch (error) {
            console.warn('Failed to save favorites:', error);
        }
    }
    
    /**
     * Create search overlay
     */
    async createSearchOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'search-overlay';
        overlay.innerHTML = `
            <div class="search-modal">
                <div class="search-header">
                    <div class="search-input-container">
                        <span class="search-icon">🔍</span>
                        <input type="text" class="search-input" placeholder="Search across all platforms... (Ctrl+K)" autocomplete="off">
                        <button class="search-close">&times;</button>
                    </div>
                </div>
                <div class="search-results">
                    <div class="search-empty">
                        <div class="search-empty-icon">🌟</div>
                        <div class="search-empty-text">Start typing to search across 142+ platforms</div>
                        <div class="search-empty-hint">Try: "netflix", "spotify", "github", or any platform name</div>
                    </div>
                </div>
                <div class="search-footer">
                    <div class="search-shortcuts">
                        <kbd>↑↓</kbd> navigate
                        <kbd>Enter</kbd> open
                        <kbd>Esc</kbd> close
                        <kbd>♥</kbd> favorite
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        this.searchOverlay = overlay;
        this.searchInput = overlay.querySelector('.search-input');
        this.searchResults = overlay.querySelector('.search-results');
        this.searchClose = overlay.querySelector('.search-close');
    }
    
    /**
     * Bind keyboard shortcuts
     */
    bindKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
                return;
            }
            
            if (e.key === 'Escape' && this.isSearchOpen) {
                this.closeSearch();
                return;
            }
            
            if (this.isSearchOpen) {
                this.enhancedKeyboardNavigation(e);
            }
        });
    }
    
    /**
     * Bind search events
     */
    bindSearchEvents() {
        this.searchInput.addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });
        
        this.searchClose.addEventListener('click', () => {
            this.closeSearch();
        });
        
        this.searchOverlay.addEventListener('click', (e) => {
            if (e.target === this.searchOverlay) {
                this.closeSearch();
            }
        });
        
        this.searchResults.addEventListener('click', (e) => {
            const resultItem = e.target.closest('.search-result-item');
            if (resultItem) {
                const url = resultItem.dataset.url;
                this.openUrl(url);
            }
        });
    }
    
    /**
     * Open search overlay
     */
    openSearch() {
        this.isSearchOpen = true;
        this.searchOverlay.classList.add('search-open');
        this.searchInput.focus();
        document.body.style.overflow = 'hidden';
    }
    
    /**
     * Close search overlay
     */
    closeSearch() {
        this.isSearchOpen = false;
        this.searchOverlay.classList.remove('search-open');
        this.searchInput.value = '';
        this.searchInput.blur();
        document.body.style.overflow = '';
        
        // Reset results
        this.searchResults.innerHTML = `
            <div class="search-empty">
                <div class="search-empty-icon">🌟</div>
                <div class="search-empty-text">Start typing to search across 142+ platforms</div>
                <div class="search-empty-hint">Try: "netflix", "spotify", "github", or any platform name</div>
            </div>
        `;
    }
    
    /**
     * Open URL in new tab
     */
    openUrl(url) {
        window.open(url, '_blank', 'noopener,noreferrer');
        this.closeSearch();
    }
    
    /**
     * Get empty results HTML
     */
    getEmptyResultsHTML() {
        return `
            <div class="search-empty">
                <div class="search-empty-icon">🔍</div>
                <div class="search-empty-text">No results found</div>
                <div class="search-empty-hint">Try different keywords or check your spelling</div>
            </div>
        `;
    }
    
    /**
     * Update favorite buttons
     */
    updateFavoriteButtons() {
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        favoriteButtons.forEach(btn => {
            const url = btn.closest('[data-url]')?.dataset.url;
            if (url) {
                const isFavorite = this.favorites.has(url);
                btn.textContent = isFavorite ? '★' : '☆';
                btn.setAttribute('aria-label', 
                    isFavorite ? 'Remove from favorites' : 'Add to favorites'
                );
            }
        });
    }
    
    /**
     * Refresh current search results
     */
    refreshCurrentResults() {
        if (this.searchInput.value) {
            this.performSearch(this.searchInput.value);
        }
    }
    
    /**
     * Get fallback resources
     */
    getFallbackResources() {
        return [
            { name: 'Google', url: 'https://google.com', description: 'Search engine', category: 'search-engines', categoryEmoji: '🔍' },
            { name: 'GitHub', url: 'https://github.com', description: 'Code repository', category: 'tools', categoryEmoji: '🛠️' },
            { name: 'YouTube', url: 'https://youtube.com', description: 'Video platform', category: 'entertainment', categoryEmoji: '🎭' }
        ];
    }
    
    /**
     * Setup preloading
     */
    setupPreloading() {
        // Preload critical resources
        const preloadLinks = [
            'data/search-engines.json',
            'data/tools.json', 
            'data/entertainment.json'
        ];
        
        preloadLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = href;
            link.as = 'fetch';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }
    
    /**
     * Setup hover animations
     */
    setupHoverAnimations() {
        // Enhanced hover effects are added through CSS and intersection observer
    }
    
    /**
     * Setup page transitions
     */
    setupPageTransitions() {
        // Page transition effects for navigation
    }
    
    /**
     * Initialize fallback functionality
     */
    initializeFallback() {
        console.warn('Initializing fallback functionality');
        this.resources = this.getFallbackResources();
    }
    
    /**
     * Cleanup and destroy
     */
    destroy() {
        if (this.scrollObserver) this.scrollObserver.disconnect();
        if (this.intersectionObserver) this.intersectionObserver.disconnect();
        if (this.debounceTimer) clearTimeout(this.debounceTimer);
        if (this.searchWorker) this.searchWorker.terminate();
        
        // Clear cache
        this.searchCache.clear();
        
        console.log('🧹 Enhanced Gateway destroyed and cleaned up');
    }
}

// Initialize enhanced gateway when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.gatewayEnhanced = new EverythingGatewayEnhanced();
    
    // Also maintain backwards compatibility
    window.gateway = window.gatewayEnhanced;
});

// Add CSS for toast notifications and enhanced animations
const enhancedStyles = `
<style>
/* Toast Notifications */
.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--bg-primary);
    border: 1px solid var(--border-medium);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    padding: var(--spacing-4);
    z-index: var(--z-toast);
    transform: translateX(400px);
    transition: transform var(--duration-normal) var(--timing-spring);
}

.toast-show {
    transform: translateX(0);
}

.toast-hide {
    transform: translateX(400px);
}

.toast-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
}

.toast-success {
    border-left: 4px solid var(--color-success);
}

.toast-error {
    border-left: 4px solid var(--color-error);
}

.toast-warning {
    border-left: 4px solid var(--color-warning);
}

.toast-info {
    border-left: 4px solid var(--color-info);
}

/* Enhanced search results */
.search-result-item.selected {
    background: var(--bg-secondary);
    border-color: var(--border-focus);
    box-shadow: var(--shadow-focus);
}

.search-results-header {
    padding: var(--spacing-3) var(--spacing-4);
    border-bottom: 1px solid var(--border-light);
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
}

/* Enhanced animations */
@media (prefers-reduced-motion: no-preference) {
    .category-card {
        transition: all var(--duration-normal) var(--timing-spring);
    }
    
    .category-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: var(--shadow-2xl);
    }
    
    .category-emoji {
        animation: float 3s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
    }
}

/* Loading states */
.search-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-4);
    padding: var(--spacing-8);
    color: var(--text-secondary);
}
</style>
`;

// Inject enhanced styles
document.head.insertAdjacentHTML('beforeend', enhancedStyles);
