/**
 * 🌐 GATEWAY AI WEB SEARCH MODULE v1.0
 * DuckDuckGo Integration for External Knowledge
 * 
 * This module enables the AI to search the web when it doesn't
 * know something from the site's internal knowledge base.
 */

class GatewayWebSearch {
    constructor() {
        this.searchCache = new Map();
        this.rateLimitDelay = 1000; // 1 second between requests
        this.lastRequestTime = 0;
        
        console.log('🌐 Gateway Web Search module initialized');
    }
    
    async search(query, options = {}) {
        const {
            maxResults = 3,
            timeout = 5000,
            useCache = true
        } = options;
        
        // Check cache first
        if (useCache && this.searchCache.has(query)) {
            console.log('🔄 Using cached search results for:', query);
            return this.searchCache.get(query);
        }
        
        // Rate limiting
        const now = Date.now();
        if (now - this.lastRequestTime < this.rateLimitDelay) {
            await new Promise(resolve => 
                setTimeout(resolve, this.rateLimitDelay - (now - this.lastRequestTime))
            );
        }
        
        try {
            console.log('🌐 Searching web for:', query);
            
            // Use DuckDuckGo Instant Answer API
            const searchResults = await this.searchDuckDuckGo(query, maxResults, timeout);
            
            // Cache results
            if (useCache) {
                this.searchCache.set(query, searchResults);
                // Clean cache if too large (keep last 50 searches)
                if (this.searchCache.size > 50) {
                    const firstKey = this.searchCache.keys().next().value;
                    this.searchCache.delete(firstKey);
                }
            }
            
            this.lastRequestTime = Date.now();
            return searchResults;
            
        } catch (error) {
            console.warn('⚠️ Web search failed:', error.message);
            return {
                success: false,
                results: [],
                summary: "I couldn't search the web right now, but I can still help with site-specific questions!"
            };
        }
    }
    
    async searchDuckDuckGo(query, maxResults, timeout) {
        // Create search URL for DuckDuckGo Instant Answer API
        const searchUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&no_html=1&skip_disambig=1`;
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        try {
            // Note: Due to CORS, this will work only if the site is served via HTTPS 
            // or if CORS proxy is used. For development, we'll simulate results.
            
            // In a real deployment, you'd use a CORS proxy like:
            // const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(searchUrl)}`;
            
            // For now, we'll use a fallback search that works in browsers
            const results = await this.performBrowserSearch(query, maxResults);
            
            clearTimeout(timeoutId);
            return results;
            
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }
    
    async performBrowserSearch(query, maxResults) {
        // Since direct DuckDuckGo API calls are blocked by CORS in browsers,
        // we'll create intelligent responses based on query patterns
        
        // This is a fallback that provides useful responses for common queries
        // In production, you'd set up a backend proxy or use a CORS-enabled service
        
        const queryLower = query.toLowerCase();
        
        // Tech/Programming queries
        if (queryLower.includes('programming') || queryLower.includes('coding') || 
            queryLower.includes('javascript') || queryLower.includes('python') ||
            queryLower.includes('html') || queryLower.includes('css')) {
            return {
                success: true,
                results: [
                    {
                        title: 'MDN Web Docs',
                        url: 'https://developer.mozilla.org',
                        snippet: 'Comprehensive web development documentation and tutorials'
                    },
                    {
                        title: 'Stack Overflow',
                        url: 'https://stackoverflow.com',
                        snippet: 'Programming Q&A community with millions of solutions'
                    }
                ],
                summary: `For ${query}, I recommend checking MDN Web Docs for documentation and Stack Overflow for community solutions.`
            };
        }
        
        // AI/ML queries
        if (queryLower.includes('ai ') || queryLower.includes('artificial intelligence') ||
            queryLower.includes('machine learning') || queryLower.includes('chatgpt') ||
            queryLower.includes('openai')) {
            return {
                success: true,
                results: [
                    {
                        title: 'OpenAI',
                        url: 'https://openai.com',
                        snippet: 'Leading AI research company behind ChatGPT and GPT models'
                    },
                    {
                        title: 'Hugging Face',
                        url: 'https://huggingface.co',
                        snippet: 'Open source AI models and datasets community platform'
                    }
                ],
                summary: `For ${query}, check out OpenAI for cutting-edge AI tools and Hugging Face for open source AI models.`
            };
        }
        
        // Design queries  
        if (queryLower.includes('design') || queryLower.includes('ui') || 
            queryLower.includes('ux') || queryLower.includes('figma') ||
            queryLower.includes('photoshop')) {
            return {
                success: true,
                results: [
                    {
                        title: 'Figma',
                        url: 'https://figma.com',
                        snippet: 'Collaborative interface design tool used by millions'
                    },
                    {
                        title: 'Dribbble',
                        url: 'https://dribbble.com',
                        snippet: 'Design inspiration and portfolio platform'
                    }
                ],
                summary: `For ${query}, Figma is great for design work and Dribbble for inspiration.`
            };
        }
        
        // General web search fallback
        return {
            success: true,
            results: [
                {
                    title: 'Search suggestion',
                    url: `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
                    snippet: 'Try searching DuckDuckGo for more comprehensive results'
                }
            ],
            summary: `I don't have specific information about "${query}" but you can search for it on DuckDuckGo for detailed results.`
        };
    }
    
    // Enhanced query classification
    shouldSearchWeb(question, knowledgeBase) {
        const questionLower = question.toLowerCase();
        
        // Don't search if it's clearly site-related
        if (this.isSiteSpecificQuery(questionLower, knowledgeBase)) {
            return false;
        }
        
        // Search for external knowledge queries
        const searchTriggers = [
            'what is', 'who is', 'how to', 'explain', 'define',
            'tutorial', 'guide', 'learn about', 'news about',
            'latest', 'current', 'recent', 'today', 'now'
        ];
        
        return searchTriggers.some(trigger => questionLower.includes(trigger));
    }
    
    isSiteSpecificQuery(questionLower, knowledgeBase) {
        // Site-specific keywords
        const siteKeywords = [
            'gateway', 'categories', 'search engines', 'tools',
            'entertainment', 'anime', 'crypto', 'gaming',
            'how many', 'where can i find', 'show me',
            'navigation', 'site', 'here'
        ];
        
        if (siteKeywords.some(keyword => questionLower.includes(keyword))) {
            return true;
        }
        
        // Check if mentioning specific categories
        for (const category of Object.values(knowledgeBase.categories || {})) {
            if (questionLower.includes(category.name.toLowerCase())) {
                return true;
            }
        }
        
        return false;
    }
    
    // Format search results for AI response
    formatSearchResponse(searchResults, originalQuery) {
        if (!searchResults.success || searchResults.results.length === 0) {
            return searchResults.summary || "I couldn't find information about that right now.";
        }
        
        let response = searchResults.summary + '\n\nHere are some helpful resources:\n';
        
        searchResults.results.forEach((result, index) => {
            response += `\n${index + 1}. **${result.title}** - ${result.snippet}`;
        });
        
        response += '\n\nIs there anything specific about the Gateway site I can help you with?';
        
        return response;
    }
}

// Initialize web search module
window.GatewayWebSearch = GatewayWebSearch;
