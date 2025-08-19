/**
 * The Everything Gateway - Universal Search Component v2.0 🔥
 * 
 * THIS IS THE MAGIC! 🪄✨
 * One search component that appears different on every page but searches EVERYTHING
 * The ultimate search illusion for maximum user psychology! 
 */

class UniversalSearchEngine {
    constructor(options = {}) {
        this.resources = [];
        this.favorites = new Set();
        this.isSearchOpen = false;
        this.searchResults = [];
        this.selectedIndex = 0;
        this.searchCache = new Map();
        this.searchHistory = [];
        this.currentCategory = options.category || null;
        this.currentTheme = options.theme || 'mainstream';
        this.placeholder = options.placeholder || 'Search across all platforms...';
        
        // Touch gesture support
        this.touchStartY = 0;
        this.touchStartX = 0;
        this.gestureThreshold = 50;
        
        this.init(this.currentCategory, this.currentTheme);
    }
    
    /**
     * Initialize the universal search with category-specific theming
     */
    async init(categoryId = null, theme = 'mainstream') {
        this.currentCategory = categoryId;
        this.currentTheme = theme;
        
        try {
            await this.loadFavorites();
            await this.loadSearchHistory();
            await this.createSearchOverlay();
            await this.loadAllResources();
            
            this.bindKeyboardShortcuts();
            this.bindSearchEvents();
            this.bindTouchGestures();
            this.setupCategoryTheming();
            
            console.log(`🌟 Universal Search initialized for category: ${categoryId || 'all'}`);
            
        } catch (error) {
            console.error('Failed to initialize Universal Search:', error);
        }
    }
    
    /**
     * Setup category-specific theming - THE ILLUSION! 🎭
     */
    setupCategoryTheming() {
        const overlay = this.searchOverlay;
        if (!overlay) return;
        
        // Apply category theme
        overlay.className = `search-overlay search-theme-${this.currentTheme}`;
        
        // Update placeholder text based on category
        const input = overlay.querySelector('.search-input');
        if (input) {
            const placeholders = {
                'search-engines': 'Search across all search engines...',
                'tools': 'Find productivity tools and utilities...',
                'entertainment': 'Discover streaming and entertainment...',
                'knowledge': 'Search educational resources...',
                'news': 'Find news sources and publications...',
                'social': 'Explore social networks and communities...',
                'gaming': 'Search gaming platforms and tools...',
                'anime': 'Find anime and manga resources...',
                'crypto': 'Discover crypto and blockchain platforms...',
                'design': 'Search design tools and inspiration...',
                'health': 'Find health and fitness resources...',
                'lifestyle': 'Explore lifestyle and shopping...'
            };
            
            input.placeholder = placeholders[this.currentCategory] || 'Search across all platforms...';
        }
        
        // Update empty state based on category
        this.updateEmptyState();
    }
    
    /**
     * Create the search overlay with mobile-first design
     */
    async createSearchOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'search-overlay';
        overlay.innerHTML = `
            <div class="search-modal">
                <div class="search-header">
                    <div class="search-input-container">
                        <span class="search-icon">🔍</span>
                        <input type="text" class="search-input" placeholder="Search across all platforms..." autocomplete="off">
                        <button class="search-close" aria-label="Close search">×</button>
                    </div>
                </div>
                <div class="search-results">
                    <div class="search-empty" id="searchEmpty">
                        <div class="search-empty-icon">🌟</div>
                        <div class="search-empty-text">Start typing to search everywhere</div>
                        <div class="search-empty-hint">Try: "netflix", "github", "wikipedia"</div>
                    </div>
                </div>
                <div class="search-footer">
                    <div class="search-shortcuts">
                        <kbd>↑↓</kbd> navigate
                        <kbd>Enter</kbd> open
                        <kbd>Esc</kbd> close
                        <span class="mobile-only">
                            <kbd>Swipe down</kbd> close
                        </span>
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
     * Enhanced search with category filtering (THE SECRET SAUCE!)
     */
    async performSearch(query, categoryFilter = null) {
        if (!query.trim()) {
            this.displayEmptyState();
            return [];
        }
        
        // Use current category filter if none specified
        const filter = categoryFilter || this.currentCategory;
        
        // Check cache first
        const cacheKey = `${query}-${filter || 'all'}`;
        if (this.searchCache.has(cacheKey)) {
            const cachedResults = this.searchCache.get(cacheKey);
            this.displayResults(cachedResults);
            return cachedResults;
        }
        
        const searchTerms = query.toLowerCase().split(/\s+/);
        let results = [];
        
        // Search all resources
        for (const resource of this.resources) {
            const score = this.calculateRelevanceScore(resource, searchTerms, filter);
            
            if (score > 0) {
                results.push({
                    ...resource,
                    relevanceScore: score,
                    matchedTerms: this.getMatchedTerms(resource, searchTerms)
                });
            }
        }
        
        // Sort by relevance and limit results
        results = results.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 50);
        
        // Cache results
        this.searchCache.set(cacheKey, results);
        
        // Save to search history
        this.addToHistory(query);
        
        this.displayResults(results);
        return results;
    }
    
    /**
     * Calculate relevance with category bias (THE ILLUSION ENHANCEMENT!)
     */
    calculateRelevanceScore(resource, searchTerms, categoryFilter = null) {
        let score = 0;
        const name = resource.name.toLowerCase();
        const description = resource.description.toLowerCase();
        const category = resource.category.toLowerCase();
        
        searchTerms.forEach(term => {
            // Exact name matches get highest score
            if (name.includes(term)) {
                score += name === term ? 100 : 50;
            }
            
            // Description matches
            if (description.includes(term)) {
                score += 20;
            }
            
            // Category matches
            if (category.includes(term)) {
                score += 15;
            }
            
            // Fuzzy matching
            if (this.fuzzyMatch(name, term) || this.fuzzyMatch(description, term)) {
                score += 10;
            }
        });
        
        // Category bias - make current category appear more relevant!
        if (categoryFilter && resource.category === categoryFilter) {
            score *= 1.5; // 50% boost for current category
        }
        
        // Boost favorites
        if (this.favorites.has(resource.url)) {
            score *= 1.1;
        }
        
        return score;
    }
    
    /**
     * Enhanced display with category-aware styling
     */
    displayResults(results) {
        const container = this.searchResults;
        
        if (results.length === 0) {
            this.displayEmptyState();
            return;
        }
        
        // Show category distribution for debugging (hidden in production)
        const categoryStats = this.getCategoryStats(results);
        
        const resultsHTML = `
            <div class="search-results-header" role="status" aria-live="polite">
                <span class="results-count">${results.length} result${results.length !== 1 ? 's' : ''}</span>
                ${this.currentCategory ? `<span class="category-bias">Showing ${this.currentCategory} first</span>` : ''}
            </div>
            <div class="search-results-list">
                ${results.map((result, index) => this.generateResultHTML(result, index)).join('')}
            </div>
        `;
        
        container.innerHTML = resultsHTML;
        this.selectedIndex = 0;
        this.updateSelection();
        
        // Announce to screen readers
        this.announceToScreenReader(`${results.length} results found`);
    }
    
    /**
     * Generate individual result HTML with enhanced styling
     */
    generateResultHTML(result, index) {
        const isFavorite = this.favorites.has(result.url);
        const categoryEmoji = this.getCategoryEmoji(result.category);
        
        return `
            <div class="search-result-item" 
                 data-url="${result.url}" 
                 data-index="${index}"
                 role="option"
                 aria-selected="${index === 0 ? 'true' : 'false'}"
                 tabindex="${index === 0 ? '0' : '-1'}">
                <div class="result-icon">
                    <span class="category-emoji">${categoryEmoji}</span>
                </div>
                <div class="result-content">
                    <div class="result-name">${this.highlightMatch(result.name, result.matchedTerms)}</div>
                    <div class="result-description">${this.highlightMatch(result.description, result.matchedTerms)}</div>
                    <div class="result-meta">
                        <span class="result-category" data-category="${result.category}">${result.category}</span>
                        ${isFavorite ? '<span class="result-favorite">★</span>' : ''}
                        ${result.relevanceScore > 80 ? '<span class="result-perfect-match">Perfect Match</span>' : ''}
                    </div>
                </div>
                <div class="result-actions">
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                            onclick="universalSearch.toggleFavorite('${result.url}')"
                            aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                        ${isFavorite ? '★' : '☆'}
                    </button>
                </div>
            </div>
        `;
    }
    
    /**
     * Display empty state with category-specific messaging
     */
    displayEmptyState() {
        const container = this.searchResults;
        const categoryInfo = this.getCategoryInfo();
        
        container.innerHTML = `
            <div class="search-empty">
                <div class="search-empty-icon">${categoryInfo.emoji}</div>
                <div class="search-empty-text">${categoryInfo.emptyText}</div>
                <div class="search-empty-hint">${categoryInfo.hint}</div>
                ${this.searchHistory.length > 0 ? this.generateHistoryHTML() : ''}
            </div>
        `;
    }
    
    /**
     * Get category-specific information for theming
     */
    getCategoryInfo() {
        const categoryData = {
            'search-engines': {
                emoji: '🔍',
                emptyText: 'Search across all search engines',
                hint: 'Try: "google", "duckduckgo", "scholar"'
            },
            'tools': {
                emoji: '🛠️',
                emptyText: 'Find productivity tools',
                hint: 'Try: "pdf", "converter", "productivity"'
            },
            'entertainment': {
                emoji: '🎭',
                emptyText: 'Discover entertainment platforms',
                hint: 'Try: "netflix", "spotify", "gaming"'
            },
            'default': {
                emoji: '🌟',
                emptyText: 'Start typing to search everywhere',
                hint: 'Try: "netflix", "github", "wikipedia"'
            }
        };
        
        return categoryData[this.currentCategory] || categoryData.default;
    }
    
    /**
     * Bind touch gestures for mobile UX
     */
    bindTouchGestures() {
        if (!this.searchOverlay) return;
        
        this.searchOverlay.addEventListener('touchstart', (e) => {
            this.touchStartY = e.touches[0].clientY;
            this.touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        this.searchOverlay.addEventListener('touchmove', (e) => {
            if (!this.isSearchOpen) return;
            
            const touchY = e.touches[0].clientY;
            const diffY = touchY - this.touchStartY;
            
            // Swipe down to close
            if (diffY > this.gestureThreshold) {
                this.closeSearch();
            }
        }, { passive: true });
        
        // Add haptic feedback for iOS
        if ('vibrate' in navigator) {
            this.searchOverlay.addEventListener('touchstart', () => {
                navigator.vibrate(10);
            }, { passive: true });
        }
    }
    
    /**
     * Enhanced keyboard navigation
     */
    bindKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Open search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
                return;
            }
            
            // Close search
            if (e.key === 'Escape' && this.isSearchOpen) {
                this.closeSearch();
                return;
            }
            
            // Navigation within search
            if (this.isSearchOpen) {
                this.handleSearchNavigation(e);
            }
        });
    }
    
    /**
     * Bind search input and overlay events
     */
    bindSearchEvents() {
        // Input event with debouncing
        let debounceTimer;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 200);
        });
        
        // Close button
        this.searchClose.addEventListener('click', () => {
            this.closeSearch();
        });
        
        // Click outside to close
        this.searchOverlay.addEventListener('click', (e) => {
            if (e.target === this.searchOverlay) {
                this.closeSearch();
            }
        });
        
        // Result clicks
        this.searchResults.addEventListener('click', (e) => {
            const resultItem = e.target.closest('.search-result-item');
            if (resultItem && !e.target.closest('.favorite-btn')) {
                const url = resultItem.dataset.url;
                this.openUrl(url);
            }
        });
    }
    
    /**
     * Open search with category context
     */
    openSearch() {
        this.isSearchOpen = true;
        this.searchOverlay.classList.add('search-open');
        this.searchInput.focus();
        document.body.style.overflow = 'hidden';
        
        // Setup category theming
        this.setupCategoryTheming();
        
        // Show search history if available
        if (this.searchInput.value === '') {
            this.displayEmptyState();
        }
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
        
        // Reset to empty state
        this.displayEmptyState();
    }
    
    /**
     * Open URL and track analytics
     */
    openUrl(url) {
        // Track click analytics
        this.trackSearchClick(url);
        
        // Open in new tab
        window.open(url, '_blank', 'noopener,noreferrer');
        this.closeSearch();
    }
    
    /**
     * Load all resources from data files
     */
    async loadAllResources() {
        try {
            const basePath = window.location.pathname.includes('/categories/') ? '../../data/' : 'data/';
            
            const dataFiles = [
                'search-engines.json', 'tools.json', 'entertainment.json', 'knowledge.json',
                'anime.json', 'crypto.json', 'gaming.json', 'health.json', 
                'design.json', 'lifestyle.json', 'news.json', 'social.json'
            ];
            
            const allData = await Promise.all(
                dataFiles.map(file => this.loadJSON(basePath + file).catch(() => ({})))
            );
            
            const categoryMap = {
                0: 'search-engines', 1: 'tools', 2: 'entertainment', 3: 'knowledge',
                4: 'anime', 5: 'crypto', 6: 'gaming', 7: 'health',
                8: 'design', 9: 'lifestyle', 10: 'news', 11: 'social'
            };
            
            this.resources = [];
            
            allData.forEach((data, index) => {
                const category = categoryMap[index];
                const emoji = this.getCategoryEmoji(category);
                
                if (data.sections) {
                    data.sections.forEach(section => {
                        (section.engines || section.resources || section.platforms || []).forEach(item => {
                            this.resources.push({
                                name: item.name,
                                url: item.url,
                                description: item.description,
                                category: category,
                                categoryEmoji: emoji,
                                section: section.title
                            });
                        });
                    });
                }
            });
            
            console.log(`📚 Loaded ${this.resources.length} resources from ${dataFiles.length} categories`);
            
        } catch (error) {
            console.error('Failed to load resources:', error);
            this.resources = this.getFallbackResources();
        }
    }
    
    /**
     * Get category emoji
     */
    getCategoryEmoji(category) {
        const emojis = {
            'search-engines': '🔍',
            'tools': '🛠️',
            'entertainment': '🎭',
            'knowledge': '📚',
            'anime': '🗾',
            'crypto': '₿',
            'gaming': '🎮',
            'health': '💪',
            'design': '🎨',
            'lifestyle': '🛍️',
            'news': '📰',
            'social': '🌐'
        };
        return emojis[category] || '🌟';
    }
    
    /**
     * Utility methods
     */
    async loadJSON(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load ${url}`);
        return response.json();
    }
    
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
    
    highlightMatch(text, matchedTerms = []) {
        if (!matchedTerms.length) return text;
        let highlightedText = text;
        matchedTerms.forEach(term => {
            const regex = new RegExp(`(${term})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
        });
        return highlightedText;
    }
    
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
    
    // Additional utility methods for favorites, history, etc.
    async loadFavorites() {
        try {
            const saved = localStorage.getItem('gateway-favorites');
            if (saved) {
                this.favorites = new Set(JSON.parse(saved));
            }
        } catch (error) {
            console.warn('Failed to load favorites:', error);
        }
    }
    
    async saveFavorites() {
        try {
            localStorage.setItem('gateway-favorites', JSON.stringify([...this.favorites]));
        } catch (error) {
            console.warn('Failed to save favorites:', error);
        }
    }
    
    async toggleFavorite(url) {
        if (this.favorites.has(url)) {
            this.favorites.delete(url);
        } else {
            this.favorites.add(url);
        }
        await this.saveFavorites();
        
        // Update current results if search is open
        if (this.isSearchOpen && this.searchInput.value) {
            this.performSearch(this.searchInput.value);
        }
    }
    
    async loadSearchHistory() {
        try {
            const saved = localStorage.getItem('gateway-search-history');
            if (saved) {
                this.searchHistory = JSON.parse(saved);
            }
        } catch (error) {
            console.warn('Failed to load search history:', error);
        }
    }
    
    addToHistory(query) {
        if (!query.trim()) return;
        
        // Remove if already exists
        this.searchHistory = this.searchHistory.filter(item => item !== query);
        
        // Add to beginning
        this.searchHistory.unshift(query);
        
        // Keep only last 10
        this.searchHistory = this.searchHistory.slice(0, 10);
        
        // Save to localStorage
        try {
            localStorage.setItem('gateway-search-history', JSON.stringify(this.searchHistory));
        } catch (error) {
            console.warn('Failed to save search history:', error);
        }
    }
    
    generateHistoryHTML() {
        if (this.searchHistory.length === 0) return '';
        
        return `
            <div class="search-history">
                <div class="search-history-title">Recent searches</div>
                <div class="search-history-list">
                    ${this.searchHistory.map(query => `
                        <button class="search-history-item" onclick="universalSearch.searchInput.value='${query}'; universalSearch.performSearch('${query}')">
                            <span class="history-icon">🕒</span>
                            <span class="history-query">${query}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    getFallbackResources() {
        return [
            { name: 'Google', url: 'https://google.com', description: 'Search engine', category: 'search-engines', categoryEmoji: '🔍' },
            { name: 'GitHub', url: 'https://github.com', description: 'Code repository', category: 'tools', categoryEmoji: '🛠️' },
            { name: 'YouTube', url: 'https://youtube.com', description: 'Video platform', category: 'entertainment', categoryEmoji: '🎭' }
        ];
    }
    
    // Analytics and performance tracking
    trackSearchClick(url) {
        console.log(`Search click: ${url} from category: ${this.currentCategory || 'all'}`);
        // Add your analytics code here
    }
    
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
    
    handleSearchNavigation(e) {
        const results = this.searchResults.querySelectorAll('.search-result-item');
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.selectedIndex = Math.min(this.selectedIndex + 1, results.length - 1);
                this.updateSelection();
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
                this.updateSelection();
                break;
                
            case 'Enter':
                e.preventDefault();
                if (results[this.selectedIndex]) {
                    const url = results[this.selectedIndex].dataset.url;
                    this.openUrl(url);
                }
                break;
        }
    }
    
    announceToScreenReader(message) {
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
    
    getCategoryStats(results) {
        const stats = {};
        results.forEach(result => {
            stats[result.category] = (stats[result.category] || 0) + 1;
        });
        return stats;
    }
    
    updateEmptyState() {
        const emptyElement = document.getElementById('searchEmpty');
        if (emptyElement) {
            const categoryInfo = this.getCategoryInfo();
            emptyElement.innerHTML = `
                <div class="search-empty-icon">${categoryInfo.emoji}</div>
                <div class="search-empty-text">${categoryInfo.emptyText}</div>
                <div class="search-empty-hint">${categoryInfo.hint}</div>
            `;
        }
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UniversalSearchEngine;
}

console.log('🚀 Universal Search Engine loaded - Ready for TOTAL SEARCH DOMINATION!');
