/**
 * 🔍 Search Engine Smart Controller - PROOF OF CONCEPT
 * Simple focused approach to test search engine commands
 */

class SearchEngineController {
    constructor() {
        this.searchEngines = {
            // Mainstream
            'google': { url: 'https://google.com', name: 'Google' },
            'bing': { url: 'https://bing.com', name: 'Bing' },
            'yahoo': { url: 'https://yahoo.com', name: 'Yahoo' },
            'ask': { url: 'https://ask.com', name: 'Ask' },
            
            // Privacy
            'duckduckgo': { url: 'https://duckduckgo.com', name: 'DuckDuckGo' },
            'ddg': { url: 'https://duckduckgo.com', name: 'DuckDuckGo' },
            'brave': { url: 'https://search.brave.com', name: 'Brave Search' },
            'startpage': { url: 'https://startpage.com', name: 'Startpage' },
            'swisscows': { url: 'https://swisscows.com', name: 'Swisscows' },
            'kagi': { url: 'https://kagi.com', name: 'Kagi' },
            
            // Academic
            'scholar': { url: 'https://scholar.google.com', name: 'Google Scholar' },
            'google scholar': { url: 'https://scholar.google.com', name: 'Google Scholar' },
            'semantic scholar': { url: 'https://semanticscholar.org', name: 'Semantic Scholar' },
            'arxiv': { url: 'https://arxiv.org/search', name: 'arXiv' },
            'pubmed': { url: 'https://pubmed.ncbi.nlm.nih.gov', name: 'PubMed' },
            
            // International
            'yandex': { url: 'https://yandex.com', name: 'Yandex' },
            'baidu': { url: 'https://baidu.com', name: 'Baidu' },
            'naver': { url: 'https://naver.com', name: 'Naver' },
            'qwant': { url: 'https://qwant.com', name: 'Qwant' },
            'ecosia': { url: 'https://ecosia.org', name: 'Ecosia' }
        };
        
        console.log('🔍 Search Engine Controller loaded with', Object.keys(this.searchEngines).length, 'engines');
    }
    
    handleSearchCommand(command) {
        const lowercaseCommand = command.toLowerCase().trim();
        
        // Check if it's a request for the search engines category
        if (this.isCategoryRequest(lowercaseCommand)) {
            this.openSearchEnginesCategory();
            return true;
        }
        
        // Check if it's a specific search engine
        const engineMatch = this.findSearchEngine(lowercaseCommand);
        if (engineMatch) {
            this.openSearchEngine(engineMatch);
            return true;
        }
        
        return false; // Not handled
    }
    
    isCategoryRequest(command) {
        const categoryPhrases = [
            'search engines',
            'search engine',
            'show me search engines',
            'open search engines',
            'go to search engines',
            'take me to search engines'
        ];
        
        return categoryPhrases.some(phrase => command.includes(phrase));
    }
    
    findSearchEngine(command) {
        // Direct match
        if (this.searchEngines[command]) {
            return this.searchEngines[command];
        }
        
        // Partial match (for "open google", "launch bing", etc.)
        for (const [key, engine] of Object.entries(this.searchEngines)) {
            if (command.includes(key)) {
                return engine;
            }
        }
        
        return null;
    }
    
    openSearchEnginesCategory() {
        console.log('🎯 Opening Search Engines category page');
        window.location.href = 'categories/search-engines/';
        
        if (window.gatewaySmartController) {
            window.gatewaySmartController.addMessage('🔍 Opening Search Engines category with 39 different search engines!', 'ai');
            window.gatewaySmartController.updateStatus('Opening search engines category...');
        }
    }
    
    openSearchEngine(engine) {
        console.log('🚀 Opening specific search engine:', engine.name);
        window.open(engine.url, '_blank');
        
        if (window.gatewaySmartController) {
            window.gatewaySmartController.addMessage(`🔍 Opening ${engine.name}!`, 'ai');
            window.gatewaySmartController.updateStatus(`Opened ${engine.name}!`);
        }
    }
}

// Initialize and make globally available
window.searchEngineController = new SearchEngineController();

console.log('🔍 Search Engine Controller ready!');
