/**
 * The Everything Gateway - Core JavaScript Module
 * Provides search, favorites, keyboard shortcuts, and dynamic functionality
 */

class EverythingGateway {
    constructor() {
        this.resources = [];
        this.favorites = new Set();
        this.isSearchOpen = false;
        this.searchResults = [];
        this.selectedIndex = 0;
        
        // Initialize
        this.loadFavorites();
        this.createSearchOverlay();
        this.bindKeyboardShortcuts();
        this.bindSearchEvents();
        
        // Load all resource data
        this.loadAllResources();
        
        console.log('🌟 Everything Gateway initialized!');
    }
    
    /**
     * Load all resources from JSON files
     */
    async loadAllResources() {
        try {
            // Determine the correct base path for JSON files
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
            this.updateSearchIndex();
            
        } catch (error) {
            console.error('Failed to load resources:', error);
            // Fallback to hardcoded popular platforms
            this.resources = this.getFallbackResources();
            console.log(`📚 Using fallback data: ${this.resources.length} resources`);
            this.updateSearchIndex();
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
            // For entertainment and similar structured data
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
            // For search engines structured data
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
     * Create search overlay HTML
     */
    createSearchOverlay() {
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
            // Ctrl/Cmd + K to open search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
                return;
            }
            
            // Escape to close search
            if (e.key === 'Escape' && this.isSearchOpen) {
                this.closeSearch();
                return;
            }
            
            // Arrow keys and Enter for navigation (only when search is open)
            if (this.isSearchOpen) {
                this.handleSearchNavigation(e);
            }
        });
    }
    
    /**
     * Handle search navigation with keyboard
     */
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
                    this.openPlatform(url);
                }
                break;
        }
    }
    
    /**
     * Bind search input events
     */
    bindSearchEvents() {
        // Search input
        document.addEventListener('input', (e) => {
            if (e.target.matches('.search-input')) {
                this.performSearch(e.target.value);
            }
        });
        
        // Close button
        document.addEventListener('click', (e) => {
            if (e.target.matches('.search-close')) {
                this.closeSearch();
            }
            
            if (e.target.matches('.search-overlay')) {
                this.closeSearch();
            }
            
            if (e.target.matches('.search-result-item') || e.target.closest('.search-result-item')) {
                const item = e.target.closest('.search-result-item');
                this.openPlatform(item.dataset.url);
            }
            
            if (e.target.matches('.favorite-btn')) {
                e.preventDefault();
                e.stopPropagation();
                const url = e.target.closest('.search-result-item').dataset.url;
                this.toggleFavorite(url);
            }
        });
    }
    
    /**
     * Open search overlay
     */
    openSearch() {
        this.isSearchOpen = true;
        this.searchOverlay.classList.add('active');
        this.searchInput.focus();
        document.body.style.overflow = 'hidden';
    }
    
    /**
     * Close search overlay
     */
    closeSearch() {
        this.isSearchOpen = false;
        this.searchOverlay.classList.remove('active');
        this.searchInput.value = '';
        this.searchInput.blur();
        this.selectedIndex = 0;
        document.body.style.overflow = '';
        this.showEmptyState();
    }
    
    /**
     * Perform search across all resources
     */
    performSearch(query) {
        if (!query.trim()) {
            this.showEmptyState();
            return;
        }
        
        // Show loading state
        this.showLoadingState();
        
        // Use a small timeout to let the loading state render and prevent UI freezing
        setTimeout(() => {
            try {
                const searchTerm = query.toLowerCase().trim();
                const matches = this.resources.filter(resource => {
                    return resource.name.toLowerCase().includes(searchTerm) ||
                           resource.description.toLowerCase().includes(searchTerm) ||
                           resource.tags.some(tag => tag.includes(searchTerm));
                });
                
                // Sort by relevance (exact name matches first)
                matches.sort((a, b) => {
                    const aNameMatch = a.name.toLowerCase().includes(searchTerm);
                    const bNameMatch = b.name.toLowerCase().includes(searchTerm);
                    
                    if (aNameMatch && !bNameMatch) return -1;
                    if (!aNameMatch && bNameMatch) return 1;
                    
                    return a.name.localeCompare(b.name);
                });
                
                this.displaySearchResults(matches, query);
                this.selectedIndex = 0;
                this.updateSelection();
            } catch (error) {
                console.error('Search error:', error);
                this.showErrorState('An error occurred while searching. Please try again.');
            }
        }, 100);
    }
    
    /**
     * Display search results
     */
    displaySearchResults(matches, query) {
        if (matches.length === 0) {
            this.searchResults.innerHTML = `
                <div class="search-empty">
                    <div class="search-empty-icon">🔍</div>
                    <div class="search-empty-text">No results for "${query}"</div>
                    <div class="search-empty-hint">Try searching for platform names like "netflix", "github", or "spotify"</div>
                </div>
            `;
            return;
        }
        
        const resultsHTML = matches.map((resource, index) => `
            <div class="search-result-item" data-url="${resource.url}" data-index="${index}">
                <div class="search-result-icon">${resource.categoryEmoji}</div>
                <div class="search-result-content">
                    <div class="search-result-name">${this.highlightMatch(resource.name, query)}</div>
                    <div class="search-result-description">${this.highlightMatch(resource.description, query)}</div>
                    <div class="search-result-meta">
                        <span class="search-result-category">${resource.section}</span>
                    </div>
                </div>
                <button class="favorite-btn ${this.favorites.has(resource.url) ? 'active' : ''}" title="Add to favorites">
                    ${this.favorites.has(resource.url) ? '❤️' : '🤍'}
                </button>
            </div>
        `).join('');
        
        this.searchResults.innerHTML = `
            <div class="search-results-header">
                <span class="search-results-count">${matches.length} result${matches.length !== 1 ? 's' : ''}</span>
            </div>
            <div class="search-results-list">
                ${resultsHTML}
            </div>
        `;
    }
    
    /**
     * Show loading state
     */
    showLoadingState() {
        this.searchResults.innerHTML = `
            <div class="search-empty">
                <div class="search-empty-icon">⏳</div>
                <div class="search-empty-text">Searching...</div>
                <div class="search-empty-hint">Finding the best results for you</div>
            </div>
        `;
    }
    
    /**
     * Show error state
     */
    showErrorState(message) {
        this.searchResults.innerHTML = `
            <div class="search-empty">
                <div class="search-empty-icon">⚠️</div>
                <div class="search-empty-text">Oops! ${message}</div>
                <div class="search-empty-hint">Please try again or contact support if the issue persists</div>
            </div>
        `;
    }
    
    /**
     * Show empty state
     */
    showEmptyState() {
        this.searchResults.innerHTML = `
            <div class="search-empty">
                <div class="search-empty-icon">🌟</div>
                <div class="search-empty-text">Start typing to search across ${this.resources.length}+ platforms</div>
                <div class="search-empty-hint">Try: "netflix", "spotify", "github", or any platform name</div>
            </div>
        `;
    }
    
    /**
     * Highlight search matches in text
     */
    highlightMatch(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    /**
     * Update selected result
     */
    updateSelection() {
        const items = this.searchResults.querySelectorAll('.search-result-item');
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedIndex);
        });
        
        // Scroll selected item into view
        const selected = items[this.selectedIndex];
        if (selected) {
            selected.scrollIntoView({ block: 'nearest' });
        }
    }
    
    /**
     * Open platform in new tab
     */
    openPlatform(url) {
        window.open(url, '_blank');
        this.closeSearch();
    }
    
    /**
     * Toggle favorite status
     */
    toggleFavorite(url) {
        if (this.favorites.has(url)) {
            this.favorites.delete(url);
        } else {
            this.favorites.add(url);
        }
        
        this.saveFavorites();
        this.updateFavoriteButtons();
        
        // Show feedback
        const resource = this.resources.find(r => r.url === url);
        if (resource) {
            this.showToast(
                this.favorites.has(url) 
                    ? `❤️ Added ${resource.name} to favorites`
                    : `🤍 Removed ${resource.name} from favorites`
            );
        }
    }
    
    /**
     * Update favorite button states
     */
    updateFavoriteButtons() {
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        favoriteButtons.forEach(btn => {
            const url = btn.closest('.search-result-item').dataset.url;
            const isFavorite = this.favorites.has(url);
            btn.classList.toggle('active', isFavorite);
            btn.innerHTML = isFavorite ? '❤️' : '🤍';
        });
    }
    
    /**
     * Load favorites from localStorage
     */
    loadFavorites() {
        try {
            const saved = localStorage.getItem('gateway-favorites');
            if (saved) {
                this.favorites = new Set(JSON.parse(saved));
            }
        } catch (error) {
            console.warn('Failed to load favorites:', error);
            this.favorites = new Set();
        }
    }
    
    /**
     * Save favorites to localStorage
     */
    saveFavorites() {
        try {
            localStorage.setItem('gateway-favorites', JSON.stringify([...this.favorites]));
        } catch (error) {
            console.warn('Failed to save favorites:', error);
        }
    }
    
    /**
     * Show toast notification
     */
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 2000);
    }
    
    /**
     * Get fallback resources if JSON loading fails
     */
    getFallbackResources() {
        return [
            // Popular platforms that should always work
            { name: 'Netflix', url: 'https://www.netflix.com', description: 'Global streaming service with original content and movies', category: 'entertainment', categoryEmoji: '🎭', section: 'Video Streaming', tags: ['netflix', 'streaming', 'movies', 'shows'] },
            { name: 'YouTube', url: 'https://www.youtube.com', description: 'World\'s largest video sharing platform', category: 'entertainment', categoryEmoji: '🎭', section: 'Video Streaming', tags: ['youtube', 'video', 'streaming'] },
            { name: 'Spotify', url: 'https://www.spotify.com', description: 'World\'s largest music streaming platform', category: 'entertainment', categoryEmoji: '🎭', section: 'Music & Audio', tags: ['spotify', 'music', 'streaming', 'audio'] },
            { name: 'Google', url: 'https://www.google.com', description: 'World\'s most popular search engine', category: 'search-engines', categoryEmoji: '🔍', section: 'Mainstream Search', tags: ['google', 'search', 'web'] },
            { name: 'GitHub', url: 'https://github.com', description: 'Developer platform for version control and collaboration', category: 'tools', categoryEmoji: '🛠️', section: 'Developer Tools', tags: ['github', 'development', 'coding', 'git'] },
            { name: 'ChatGPT', url: 'https://chat.openai.com', description: 'AI-powered conversational assistant', category: 'tools', categoryEmoji: '🛠️', section: 'AI & ML Tools', tags: ['chatgpt', 'ai', 'assistant', 'openai'] },
            { name: 'Steam', url: 'https://store.steampowered.com', description: 'World\'s largest PC gaming platform', category: 'entertainment', categoryEmoji: '🎭', section: 'Gaming Platforms', tags: ['steam', 'gaming', 'games', 'pc'] },
            { name: 'Reddit', url: 'https://www.reddit.com', description: 'Community discussion and content aggregation', category: 'entertainment', categoryEmoji: '🎭', section: 'Social Entertainment', tags: ['reddit', 'social', 'discussion', 'community'] },
            { name: 'Wikipedia', url: 'https://www.wikipedia.org', description: 'Free online encyclopedia with millions of articles', category: 'knowledge', categoryEmoji: '📚', section: 'Reference', tags: ['wikipedia', 'encyclopedia', 'knowledge', 'reference'] },
            { name: 'DuckDuckGo', url: 'https://duckduckgo.com', description: 'Privacy-focused search engine that doesn\'t track users', category: 'search-engines', categoryEmoji: '🔍', section: 'Privacy Search', tags: ['duckduckgo', 'search', 'privacy'] }
        ];
    }
    
    /**
     * Update search index for better performance
     */
    updateSearchIndex() {
        // Pre-process search terms for faster searching
        this.resources.forEach(resource => {
            resource.searchText = `${resource.name} ${resource.description} ${resource.section}`.toLowerCase();
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.gateway = new EverythingGateway();
    });
} else {
    window.gateway = new EverythingGateway();
}
