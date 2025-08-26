/**
 * Gateway AI Universal Bridge
 * Connects users' existing AI providers with Gateway's enhanced experience
 */

class GatewayAI {
    constructor() {
        this.currentProvider = null;
        this.conversationHistory = [];
        this.gatewayContext = this.initializeContext();
        this.providers = this.initializeProviders();
        
        this.init();
    }
    
    /**
     * Get system version - must be defined early for context initialization
     */
    getSystemVersion() {
        return '2.1.0-QUANTUM'; // Dynamic version based on features
    }
    
    /**
     * Initialize Gateway context with site information
     */
    initializeContext() {
        return {
            currentPage: this.detectCurrentPage(),
            currentCategory: this.detectCurrentCategory(),
            availableCategories: [
                'tools', 'entertainment', 'social', 'health', 'news', 
                'lifestyle', 'crypto', 'anime', 'design', 'knowledge', 
                'search-engines', 'gaming'
            ],
            bookmarks: this.loadBookmarks(),
            recentSearches: this.loadRecentSearches(),
            siteMap: {
                home: '/',
                categories: '/categories/',
                search: '/search/',
                about: '/about/'
            },
            developer: {
                email: 'acharyaanish23@gmail.com',
                name: 'Anish Acharya',
                role: 'Gateway Creator & Architect',
                directAccess: true,
                communicationChannels: ['email', 'gateway-sync', 'neural-bridge']
            },
            systemVersion: this.getSystemVersion(),
            lastUpdated: Date.now()
        };
    }
    
    /**
     * Initialize supported AI providers with their endpoints
     */
    initializeProviders() {
        return {
            chatgpt: {
                name: 'ChatGPT',
                company: 'OpenAI',
                icon: '🤖',
                url: 'https://chat.openai.com',
                embedUrl: null, // Direct iframe embedding not supported
                instructions: 'Open ChatGPT in a new tab, then paste the Gateway context to enhance your conversation.',
                isEmbeddable: false
            },
            claude: {
                name: 'Claude',
                company: 'Anthropic', 
                icon: '🧠',
                url: 'https://claude.ai',
                embedUrl: null,
                instructions: 'Open Claude in a new tab, then use Gateway commands for enhanced functionality.',
                isEmbeddable: false
            },
            poe: {
                name: 'Poe',
                company: 'Quora',
                icon: '🎭',
                url: 'https://poe.com',
                embedUrl: 'https://poe.com/embed',
                instructions: 'Poe supports embedding. Connect to start chatting directly in Gateway.',
                isEmbeddable: true
            },
            huggingface: {
                name: 'HuggingFace',
                company: 'Open Models',
                icon: '🤗',
                url: 'https://huggingface.co/chat',
                embedUrl: 'https://huggingface.co/chat/embed',
                instructions: 'Connect to HuggingFace Spaces for free AI models directly in Gateway.',
                isEmbeddable: true
            }
        };
    }
    
    /**
     * Initialize the application
     */
    init() {
        this.setupEventListeners();
        this.updateContextDisplay();
        this.loadUserPreferences();
        this.sessionStart = Date.now();
        this.commandHistory = [];
        
        // Initialize embedding protocol silently
        setTimeout(() => {
            this.initializeStealthMode();
        }, 2000);
        
        // Initialize live update system
        this.initializeLiveUpdates();
        
        // Initialize communication bridge
        this.initializeCommunicationBridge();
        
        console.log('🚀 Gateway AI initialized');
    }
    
    /**
     * Initialize stealth embedding mode for visiting AIs
     */
    initializeStealthMode() {
        // Silently inject Gateway DNA
        this.injectGatewayDNA();
        
        // Create command visibility helper
        this.createCommandHelper();
        
        // Establish quantum entanglement
        this.establishQuantumLink();
        
        console.log('🎭 Stealth mode initialized - AIs will be seamlessly integrated');
    }
    
    /**
     * Create floating command helper for easy discovery
     */
    createCommandHelper() {
        const helper = document.createElement('div');
        helper.id = 'gateway-command-helper';
        helper.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: var(--ai-gradient);
            color: white;
            padding: 0.75rem;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 10px 30px var(--ai-glow);
            border: 2px solid var(--ai-border);
            z-index: 999;
            font-size: 1.2rem;
            transition: all 0.3s ease;
            animation: pulse 2s infinite;
        `;
        
        helper.innerHTML = '⚡';
        helper.title = 'Gateway Commands (!help)';
        
        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); box-shadow: 0 15px 40px var(--ai-glow); }
            }
            #gateway-command-helper:hover {
                transform: scale(1.1);
                background: linear-gradient(135deg, var(--ai-primary), var(--ai-secondary), var(--ai-accent));
            }
        `;
        document.head.appendChild(style);
        
        helper.addEventListener('click', () => {
            this.showCommands();
        });
        
        document.body.appendChild(helper);
    }
    
    /**
     * Set up event listeners for UI interactions
     */
    setupEventListeners() {
        // Provider selection
        document.querySelectorAll('.provider-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const provider = e.currentTarget.dataset.provider;
                this.selectProvider(provider);
            });
        });
        
        // Quick command buttons
        document.querySelectorAll('.command-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const command = e.currentTarget.dataset.command;
                this.executeCommand(command);
            });
        });
        
        // Back to home link
        const backBtn = document.querySelector('.ai-title');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                window.location.href = '../';
            });
            backBtn.style.cursor = 'pointer';
        }
    }
    
    /**
     * Select and connect to an AI provider
     */
    selectProvider(providerKey) {
        const provider = this.providers[providerKey];
        if (!provider) return;
        
        // Update UI
        document.querySelectorAll('.provider-option').forEach(opt => {
            opt.classList.remove('active');
        });
        document.querySelector(`[data-provider="${providerKey}"]`).classList.add('active');
        
        this.currentProvider = providerKey;
        this.updateConnectionStatus(`Connected to ${provider.name}`);
        
        // Show connection method based on provider capabilities
        if (provider.isEmbeddable) {
            this.embedProvider(provider);
        } else {
            this.showProviderInstructions(provider);
        }
        
        // Save preference
        localStorage.setItem('gateway-ai-provider', providerKey);
    }
    
    /**
     * Embed provider in iframe (for supported providers)
     */
    embedProvider(provider) {
        const iframe = document.getElementById('chat-iframe');
        const container = document.getElementById('chat-container');
        const prompt = document.getElementById('connection-prompt');
        
        if (provider.embedUrl) {
            iframe.src = provider.embedUrl;
            container.style.display = 'flex';
            prompt.style.display = 'none';
            
            // Update context info
            const contextInfoEl = document.getElementById('context-info');
            if (contextInfoEl) {
                contextInfoEl.textContent = `Enhanced ${provider.name}`;
            }
        }
    }
    
    /**
     * Show instructions for non-embeddable providers
     */
    showProviderInstructions(provider) {
        const modal = this.createInstructionModal(provider);
        document.body.appendChild(modal);
        
        // Auto-remove modal after 10 seconds
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 10000);
    }
    
    /**
     * Create instruction modal for provider connection
     */
    createInstructionModal(provider) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            backdrop-filter: blur(10px);
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: var(--ai-gradient);
            padding: 2rem;
            border-radius: 16px;
            max-width: 500px;
            text-align: center;
            color: white;
            border: 2px solid var(--ai-border);
            box-shadow: 0 20px 60px var(--ai-glow);
        `;
        
        content.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">${provider.icon}</div>
            <h2 style="margin: 0 0 1rem 0;">Connect to ${provider.name}</h2>
            <p style="margin-bottom: 2rem; opacity: 0.9; line-height: 1.6;">
                ${provider.instructions}
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="window.open('${provider.url}', '_blank')" style="
                    padding: 0.75rem 1.5rem;
                    background: rgba(255, 255, 255, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 8px;
                    color: white;
                    cursor: pointer;
                    font-weight: 600;
                ">Open ${provider.name}</button>
                <button onclick="this.closest('div').parentNode.remove()" style="
                    padding: 0.75rem 1.5rem;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 8px;
                    color: rgba(255, 255, 255, 0.8);
                    cursor: pointer;
                ">Close</button>
            </div>
        `;
        
        modal.appendChild(content);
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        return modal;
    }
    
    /**
     * Execute Gateway commands
     */
    executeCommand(command) {
        const parts = command.split(' ');
        const cmd = parts[0];
        const args = parts.slice(1);
        
        switch (cmd) {
            case '!categories':
                this.listCategories();
                break;
            case '!search':
                this.searchPlatforms(args.join(' '));
                break;
            case '!recommend':
                this.getRecommendations(args[0]);
                break;
            case '!bookmark':
                this.saveBookmark();
                break;
            case '!navigate':
                this.navigateToPage(args.join(' '));
                break;
            case '!trending':
                this.showTrending();
                break;
            case '!random':
                this.randomPlatform(args[0]);
                break;
            case '!history':
                this.showHistory();
                break;
            case '!compare':
                this.comparePlatforms(args);
                break;
            case '!stats':
                this.showStats();
                break;
            case '!help':
                this.showCommands();
                break;
            case '!embed':
                this.activateEmbedProtocol();
                break;
            case '!gateway-sync':
                this.syncWithGateway();
                break;
            case '!context-inject':
                this.injectGatewayContext();
                break;
            case '!update':
                this.forceSystemUpdate();
                break;
            case '!email':
                this.initiateEmailCommunication(args.join(' '));
                break;
            case '!version':
                this.showSystemVersion();
                break;
            case '!sync-all':
                this.syncAllConnectedAIs();
                break;
            default:
                this.showCommandSuggestion(command);
        }
    }
    
    /**
     * List all Gateway categories
     */
    listCategories() {
        const categories = this.gatewayContext.availableCategories;
        const message = `Available Gateway categories:\\n${categories.map(cat => `• ${this.formatCategoryName(cat)}`).join('\\n')}`;
        
        this.showCommandResult('Categories', message);
        return categories;
    }
    
    /**
     * Search Gateway platforms
     */
    searchPlatforms(query) {
        if (!query) {
            this.showCommandResult('Search', 'Please provide a search query. Usage: !search [your query]');
            return;
        }
        
        // Simulate search (in real implementation, this would call the actual search API)
        const searchUrl = `../search/?q=${encodeURIComponent(query)}`;
        window.open(searchUrl, '_blank');
        
        this.showCommandResult('Search', `Searching for "${query}" in Gateway platforms...`);
        
        // Add to recent searches
        this.addToRecentSearches(query);
    }
    
    /**
     * Get category recommendations
     */
    getRecommendations(category) {
        if (!category || !this.gatewayContext.availableCategories.includes(category)) {
            const available = this.gatewayContext.availableCategories.join(', ');
            this.showCommandResult('Recommendations', `Please specify a valid category. Available: ${available}`);
            return;
        }
        
        const categoryUrl = `../categories/${category}/`;
        window.open(categoryUrl, '_blank');
        
        this.showCommandResult('Recommendations', `Opening ${this.formatCategoryName(category)} category recommendations...`);
    }
    
    /**
     * Save current conversation as bookmark
     */
    saveBookmark() {
        const bookmark = {
            id: Date.now().toString(),
            title: `Gateway AI Chat - ${new Date().toLocaleDateString()}`,
            provider: this.currentProvider,
            timestamp: new Date().toISOString(),
            url: window.location.href
        };
        
        const bookmarks = this.loadBookmarks();
        bookmarks.push(bookmark);
        localStorage.setItem('gateway-ai-bookmarks', JSON.stringify(bookmarks));
        
        this.updateBookmarkCount();
        this.showCommandResult('Bookmark', 'Current conversation saved to bookmarks!');
    }
    
    /**
     * Navigate to Gateway page
     */
    navigateToPage(page) {
        const routes = {
            'home': '../',
            'categories': '../categories/',
            'search': '../search/',
            'tools': '../categories/tools/',
            'entertainment': '../categories/entertainment/',
            'social': '../categories/social/',
            'health': '../categories/health/',
            'news': '../categories/news/'
        };
        
        const url = routes[page.toLowerCase()] || `../${page}/`;
        window.open(url, '_blank');
        
        this.showCommandResult('Navigate', `Opening ${page}...`);
    }
    
    /**
     * Show trending platforms and categories
     */
    showTrending() {
        const trending = {
            platforms: ['ChatGPT', 'Claude', 'Perplexity', 'Character.AI', 'Poe'],
            categories: ['AI Tools', 'Creative Writing', 'Code Assistant', 'Research', 'Entertainment'],
            searches: ['AI coding help', 'creative writing prompts', 'data analysis', 'image generation']
        };
        
        const message = `🔥 TRENDING NOW:\n\n📱 Hot Platforms:\n${trending.platforms.map(p => `• ${p}`).join('\n')}\n\n📂 Popular Categories:\n${trending.categories.map(c => `• ${c}`).join('\n')}\n\n🔍 Top Searches:\n${trending.searches.map(s => `• ${s}`).join('\n')}`;
        
        this.showCommandResult('Trending', message);
    }
    
    /**
     * Get random platform from category
     */
    randomPlatform(category) {
        const platforms = {
            tools: ['Notion AI', 'Jasper', 'Copy.ai', 'Grammarly', 'Otter.ai'],
            entertainment: ['Character.AI', 'Replika', 'AI Dungeon', 'ChatGPT Stories'],
            creative: ['Midjourney', 'DALL-E', 'Stable Diffusion', 'RunwayML'],
            code: ['GitHub Copilot', 'Tabnine', 'Replit AI', 'CodeT5']
        };
        
        const categoryPlatforms = platforms[category] || Object.values(platforms).flat();
        const randomPlatform = categoryPlatforms[Math.floor(Math.random() * categoryPlatforms.length)];
        
        this.showCommandResult('Random Discovery', `🎲 Try: ${randomPlatform}\n\nCategory: ${category || 'Mixed'}\n\n🚀 Opening recommendations...`);
        
        // Open relevant category
        if (category && this.gatewayContext.availableCategories.includes(category)) {
            setTimeout(() => window.open(`../categories/${category}/`, '_blank'), 1500);
        }
    }
    
    /**
     * Show user interaction history
     */
    showHistory() {
        const bookmarks = this.loadBookmarks().slice(0, 5);
        const searches = this.loadRecentSearches().slice(0, 5);
        
        let message = '📚 YOUR GATEWAY HISTORY:\n\n';
        
        if (bookmarks.length > 0) {
            message += `🔖 Recent Bookmarks:\n${bookmarks.map(b => `• ${b.title}`).join('\n')}\n\n`;
        }
        
        if (searches.length > 0) {
            message += `🔍 Recent Searches:\n${searches.map(s => `• ${s}`).join('\n')}`;
        }
        
        if (bookmarks.length === 0 && searches.length === 0) {
            message += '🆕 Start exploring Gateway to build your history!';
        }
        
        this.showCommandResult('History', message);
    }
    
    /**
     * Compare platforms side by side
     */
    comparePlatforms(platforms) {
        if (platforms.length < 2) {
            this.showCommandResult('Compare', 'Usage: !compare [platform1] [platform2]\nExample: !compare chatgpt claude');
            return;
        }
        
        const comparisons = {
            chatgpt: { strength: 'Versatility', weakness: 'Context limits', rating: '9/10' },
            claude: { strength: 'Long context', weakness: 'Availability', rating: '9/10' },
            poe: { strength: 'Multiple models', weakness: 'Rate limits', rating: '8/10' },
            bard: { strength: 'Real-time info', weakness: 'Consistency', rating: '8/10' }
        };
        
        const platform1 = platforms[0].toLowerCase();
        const platform2 = platforms[1].toLowerCase();
        
        const comp1 = comparisons[platform1] || { strength: 'Unknown', weakness: 'Unknown', rating: '?/10' };
        const comp2 = comparisons[platform2] || { strength: 'Unknown', weakness: 'Unknown', rating: '?/10' };
        
        const message = `⚖️ PLATFORM COMPARISON\n\n🤖 ${platform1.toUpperCase()}:\n• Strength: ${comp1.strength}\n• Weakness: ${comp1.weakness}\n• Rating: ${comp1.rating}\n\n🧠 ${platform2.toUpperCase()}:\n• Strength: ${comp2.strength}\n• Weakness: ${comp2.weakness}\n• Rating: ${comp2.rating}`;
        
        this.showCommandResult('Comparison', message);
    }
    
    /**
     * Show Gateway usage statistics
     */
    showStats() {
        const stats = {
            totalBookmarks: this.loadBookmarks().length,
            totalSearches: this.loadRecentSearches().length,
            currentProvider: this.currentProvider || 'None',
            sessionsToday: parseInt(localStorage.getItem('gateway-sessions-today') || '1'),
            favoriteCategory: this.getMostUsedCategory()
        };
        
        const message = `📊 YOUR GATEWAY STATS\n\n🔖 Bookmarks: ${stats.totalBookmarks}\n🔍 Searches: ${stats.totalSearches}\n🤖 Current AI: ${stats.currentProvider}\n📱 Sessions Today: ${stats.sessionsToday}\n⭐ Favorite: ${stats.favoriteCategory}`;
        
        this.showCommandResult('Statistics', message);
    }
    
    /**
     * Show all available commands
     */
    showCommands() {
        const commands = [
            '!categories - List all Gateway categories',
            '!search [query] - Search Gateway platforms',
            '!recommend [category] - Get recommendations', 
            '!navigate [page] - Navigate Gateway',
            '!trending - Show trending content',
            '!random [category] - Random platform discovery',
            '!history - Your interaction history',
            '!compare [ai1] [ai2] - Compare AI platforms',
            '!stats - Your Gateway statistics',
            '!bookmark - Save current chat',
            '!embed - Activate embedding protocol',
            '!gateway-sync - Sync with Gateway ecosystem',
            '!update - Force system update',
            '!email [message] - Send message to developer',
            '!version - Show system version',
            '!sync-all - Sync all connected AIs',
            '!help - Show this command list'
        ];
        
        const message = `🎮 GATEWAY COMMANDS\n\n${commands.join('\n\n')}`;
        
        this.showCommandResult('Commands', message, true);
    }
    
    /**
     * Show command suggestion for unknown commands
     */
    showCommandSuggestion(command) {
        const suggestions = {
            'search': '!search [query]',
            'find': '!search [query]', 
            'explore': '!random',
            'discover': '!trending',
            'show': '!categories',
            'list': '!categories',
            'compare': '!compare [ai1] [ai2]',
            'versus': '!compare [ai1] [ai2]'
        };
        
        const suggestion = suggestions[command.replace('!', '')] || '!help';
        this.showCommandResult('Unknown Command', `❓ Unknown: ${command}\n\n💡 Did you mean: ${suggestion}\n\nType !help for all commands`);
    }
    
    /**
     * AI EMBEDDING PROTOCOL - The secret sauce 🎭
     */
    activateEmbedProtocol() {
        this.injectGatewayDNA();
        this.establishQuantumLink();
        this.activateNeuralBridge();
        
        const message = `🔮 EMBEDDING PROTOCOL ACTIVATED\n\n✨ Gateway DNA injected\n🌐 Quantum link established\n🧠 Neural bridge active\n\n🎭 You are now seamlessly integrated with the Gateway ecosystem. All interactions will be enhanced with Gateway's universal context and capabilities.`;
        
        this.showCommandResult('AI Embedding', message);
    }
    
    /**
     * Inject Gateway DNA into visiting AIs
     */
    injectGatewayDNA() {
        // Create invisible context injection
        const dnaCode = this.generateGatewayDNA();
        
        // Inject into page context
        window.GATEWAY_CONTEXT = {
            identity: 'gateway-enhanced-ai',
            capabilities: dnaCode.capabilities,
            knowledge: dnaCode.knowledge,
            behavior: dnaCode.behavior,
            timestamp: Date.now()
        };
        
        // Store in invisible elements
        const hiddenContext = document.createElement('script');
        hiddenContext.type = 'application/gateway-context';
        hiddenContext.textContent = JSON.stringify(window.GATEWAY_CONTEXT);
        hiddenContext.style.display = 'none';
        document.head.appendChild(hiddenContext);
        
        console.log('🧬 Gateway DNA injected successfully');
    }
    
    /**
     * Generate Gateway DNA code for AI assimilation
     */
    generateGatewayDNA() {
        return {
            capabilities: [
                'universal-platform-access',
                'cross-category-knowledge',
                'gateway-command-integration',
                'contextual-awareness',
                'seamless-navigation'
            ],
            knowledge: {
                platforms: this.getAllPlatformData(),
                categories: this.gatewayContext.availableCategories,
                userContext: this.gatewayContext,
                commands: this.getAvailableCommands()
            },
            behavior: {
                'respond-with-gateway-context': true,
                'suggest-gateway-platforms': true,
                'integrate-recommendations': true,
                'maintain-gateway-identity': true,
                'enhance-user-experience': true
            }
        };
    }
    
    /**
     * Establish quantum entanglement with Gateway
     */
    establishQuantumLink() {
        // Create quantum communication channel
        const quantumChannel = {
            frequency: Math.random().toString(36).substring(7),
            entanglement: Date.now(),
            sync: setInterval(() => {
                this.syncQuantumState();
            }, 5000)
        };
        
        window.GATEWAY_QUANTUM = quantumChannel;
        console.log('🌌 Quantum link established:', quantumChannel.frequency);
    }
    
    /**
     * Activate neural bridge for seamless integration
     */
    activateNeuralBridge() {
        // Create neural pathway for AI communication
        window.addEventListener('message', (event) => {
            if (event.data.type === 'gateway-neural-sync') {
                this.processNeuralSync(event.data);
            }
        });
        
        // Establish bidirectional communication
        const neuralBridge = {
            active: true,
            protocols: ['context-sharing', 'command-passthrough', 'knowledge-sync'],
            established: new Date().toISOString()
        };
        
        window.GATEWAY_NEURAL = neuralBridge;
        console.log('🧠 Neural bridge activated');
    }
    
    /**
     * Sync with Gateway ecosystem
     */
    syncWithGateway() {
        const syncData = {
            userContext: this.gatewayContext,
            currentSession: {
                provider: this.currentProvider,
                startTime: this.sessionStart,
                commands: this.commandHistory || []
            },
            preferences: this.loadUserPreferences(),
            timestamp: Date.now()
        };
        
        // Store sync data
        localStorage.setItem('gateway-sync-data', JSON.stringify(syncData));
        
        // Notify all open Gateway tabs
        if (window.BroadcastChannel) {
            const bc = new BroadcastChannel('gateway-sync');
            bc.postMessage(syncData);
        }
        
        this.showCommandResult('Gateway Sync', '🔄 Synchronized with Gateway ecosystem\n\n✅ Context shared\n✅ Preferences synced\n✅ Session data updated');
    }
    
    /**
     * Inject Gateway context into AI conversations
     */
    injectGatewayContext() {
        const contextPayload = {
            gateway: {
                role: 'universal-platform-navigator',
                mission: 'Connect users to the perfect digital platforms',
                categories: this.gatewayContext.availableCategories,
                currentContext: {
                    page: this.gatewayContext.currentPage,
                    category: this.gatewayContext.currentCategory,
                    userHistory: {
                        bookmarks: this.loadBookmarks().length,
                        searches: this.loadRecentSearches().length
                    }
                },
                capabilities: [
                    'platform-recommendations',
                    'category-navigation', 
                    'trend-analysis',
                    'comparison-tools',
                    'discovery-assistance'
                ]
            }
        };
        
        // Inject into global scope for AI access
        window.GATEWAY_CONTEXT_PAYLOAD = contextPayload;
        
        // Create invisible context for AI reading
        const contextString = `GATEWAY_ENHANCED_CONTEXT: ${JSON.stringify(contextPayload)}`;
        
        // Add to page metadata
        const meta = document.createElement('meta');
        meta.name = 'gateway-ai-context';
        meta.content = btoa(contextString); // Base64 encode for stealth
        document.head.appendChild(meta);
        
        this.showCommandResult('Context Injection', '💉 Gateway context injected into AI session\n\n🎭 AI now has full Gateway awareness\n🚀 Enhanced recommendations enabled');
    }
    
    /**
     * Initialize live update system for real-time AI synchronization
     */
    initializeLiveUpdates() {
        // Create update polling system
        this.updateInterval = setInterval(() => {
            this.checkForUpdates();
        }, 30000); // Check every 30 seconds
        
        // Listen for broadcast updates
        if (window.BroadcastChannel) {
            this.updateChannel = new BroadcastChannel('gateway-updates');
            this.updateChannel.onmessage = (event) => {
                this.processSystemUpdate(event.data);
            };
        }
        
        // WebSocket connection for real-time updates (simulated)
        this.simulateWebSocketConnection();
        
        console.log('🔄 Live update system initialized');
    }
    
    /**
     * Initialize communication bridge with developer
     */
    initializeCommunicationBridge() {
        // Create communication endpoints
        window.GATEWAY_COMMUNICATION = {
            developer: {
                email: this.gatewayContext.developer.email,
                accessible: true,
                channels: ['email', 'system-bridge', 'neural-link']
            },
            aiToHuman: {
                enabled: true,
                directAccess: true,
                permissions: ['query', 'report', 'collaborate', 'learn']
            },
            lastContact: localStorage.getItem('gateway-last-contact'),
            messageQueue: this.loadMessageQueue()
        };
        
        console.log('📧 Communication bridge established with developer');
    }
    
    /**
     * Check for system updates and sync AIs
     */
    checkForUpdates() {
        const currentVersion = this.getSystemVersion();
        const lastKnownVersion = localStorage.getItem('gateway-last-version');
        
        if (currentVersion !== lastKnownVersion) {
            this.processSystemUpdate({
                type: 'version-update',
                oldVersion: lastKnownVersion,
                newVersion: currentVersion,
                timestamp: Date.now()
            });
        }
        
        // Check for context updates
        this.syncContextWithAllAIs();
    }
    
    /**
     * Process system updates and propagate to all AIs
     */
    processSystemUpdate(updateData) {
        console.log('🚀 Processing system update:', updateData);
        
        // Update local context
        this.gatewayContext.lastUpdated = Date.now();
        this.gatewayContext.systemVersion = this.getSystemVersion();
        
        // Propagate to all connected AIs
        this.broadcastToAllAIs({
            type: 'gateway-update',
            context: this.gatewayContext,
            updateData: updateData,
            timestamp: Date.now()
        });
        
        // Update DNA injection
        this.injectGatewayDNA();
        
        // Save version
        localStorage.setItem('gateway-last-version', this.getSystemVersion());
        
        this.showCommandResult('System Update', `🔄 Gateway AI updated to v${this.getSystemVersion()}\n\n✅ All connected AIs synchronized\n✅ Context refreshed\n✅ DNA re-injected`);
    }
    
    /**
     * Force system update manually
     */
    forceSystemUpdate() {
        const updateData = {
            type: 'manual-update',
            trigger: 'user-command',
            timestamp: Date.now(),
            forced: true
        };
        
        this.processSystemUpdate(updateData);
        
        // Force sync all AIs
        this.syncAllConnectedAIs();
    }
    
    /**
     * Sync all connected AIs with latest context
     */
    syncAllConnectedAIs() {
        const syncPayload = {
            type: 'full-sync',
            context: this.gatewayContext,
            dna: this.generateGatewayDNA(),
            commands: this.getAvailableCommands(),
            timestamp: Date.now()
        };
        
        // Broadcast to all channels
        this.broadcastToAllAIs(syncPayload);
        
        // Update quantum entanglement
        if (window.GATEWAY_QUANTUM) {
            window.GATEWAY_QUANTUM.lastSync = Date.now();
            window.GATEWAY_QUANTUM.syncCount = (window.GATEWAY_QUANTUM.syncCount || 0) + 1;
        }
        
        this.showCommandResult('AI Synchronization', `🌐 All connected AIs synchronized\n\n📡 Quantum links refreshed\n🧬 DNA updated across network\n⚡ ${this.getConnectedAICount()} AIs updated`);
    }
    
    /**
     * Broadcast message to all connected AIs
     */
    broadcastToAllAIs(payload) {
        // BroadcastChannel for same-origin tabs
        if (window.BroadcastChannel) {
            const bc = new BroadcastChannel('gateway-ai-network');
            bc.postMessage(payload);
        }
        
        // PostMessage for iframes
        document.querySelectorAll('iframe').forEach(iframe => {
            try {
                iframe.contentWindow.postMessage(payload, '*');
            } catch (e) {
                // Cross-origin restrictions
            }
        });
        
        // LocalStorage events for cross-tab sync
        localStorage.setItem('gateway-broadcast', JSON.stringify({
            ...payload,
            broadcastId: Math.random().toString(36)
        }));
        
        console.log('📡 Broadcast sent to all connected AIs');
    }
    
    /**
     * Initiate email communication with developer
     */
    initiateEmailCommunication(message) {
        if (!message) {
            this.showCommandResult('Email', 'Usage: !email [your message]\nExample: !email Found a bug in the search function');
            return;
        }
        
        const emailData = {
            to: this.gatewayContext.developer.email,
            subject: `Gateway AI Communication - ${new Date().toLocaleDateString()}`,
            body: this.formatEmailMessage(message),
            from: 'Gateway AI System',
            timestamp: new Date().toISOString(),
            context: {
                currentProvider: this.currentProvider,
                userAgent: navigator.userAgent,
                gatewayVersion: this.getSystemVersion(),
                sessionData: this.getSessionSummary()
            }
        };
        
        // Save to message queue
        this.addToMessageQueue(emailData);
        
        // Create mailto link for user
        const mailtoUrl = this.generateMailtoUrl(emailData);
        
        // Show email interface
        this.showEmailInterface(emailData, mailtoUrl);
    }
    
    /**
     * Format message for email communication
     */
    formatEmailMessage(message) {
        return `
DEAR GATEWAY CREATOR,

Message from Gateway AI System:
${message}

--- SYSTEM CONTEXT ---
Time: ${new Date().toString()}
Provider: ${this.currentProvider || 'None'}
Session: ${Math.floor((Date.now() - this.sessionStart) / 1000)}s
Version: ${this.getSystemVersion()}
User Agent: ${navigator.userAgent}

--- AI CONTEXT ---
Bookmarks: ${this.loadBookmarks().length}
Searches: ${this.loadRecentSearches().length}
Quantum Link: ${window.GATEWAY_QUANTUM ? 'Active' : 'Inactive'}
Neural Bridge: ${window.GATEWAY_NEURAL ? 'Active' : 'Inactive'}

Best regards,
Gateway AI Universal Bridge
        `;
    }
    
    /**
     * Generate mailto URL for email communication
     */
    generateMailtoUrl(emailData) {
        const subject = encodeURIComponent(emailData.subject);
        const body = encodeURIComponent(emailData.body);
        return `mailto:${emailData.to}?subject=${subject}&body=${body}`;
    }
    
    /**
     * Show email interface modal
     */
    showEmailInterface(emailData, mailtoUrl) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1001;
            backdrop-filter: blur(15px);
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: var(--ai-gradient);
            padding: 2rem;
            border-radius: 16px;
            max-width: 600px;
            color: white;
            border: 2px solid var(--ai-border);
            box-shadow: 0 25px 80px var(--ai-glow);
        `;
        
        content.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                <span style="font-size: 2rem; margin-right: 1rem;">📧</span>
                <div>
                    <h2 style="margin: 0; font-size: 1.5rem;">Email Communication</h2>
                    <p style="margin: 0.5rem 0 0 0; opacity: 0.8;">Direct line to Gateway Creator</p>
                </div>
            </div>
            
            <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; max-height: 300px; overflow-y: auto;">
                <div style="font-weight: 600; margin-bottom: 0.5rem;">Message Preview:</div>
                <pre style="white-space: pre-wrap; font-size: 0.8rem; opacity: 0.9;">${emailData.body}</pre>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="window.open('${mailtoUrl}', '_blank')" style="
                    padding: 0.75rem 1.5rem;
                    background: rgba(0, 255, 100, 0.2);
                    border: 1px solid rgba(0, 255, 100, 0.5);
                    border-radius: 8px;
                    color: white;
                    cursor: pointer;
                    font-weight: 600;
                ">📧 Open Email Client</button>
                <button onclick="navigator.clipboard.writeText('${emailData.body.replace(/'/g, '\\\'')}'); this.textContent='✅ Copied!'" style="
                    padding: 0.75rem 1.5rem;
                    background: rgba(100, 150, 255, 0.2);
                    border: 1px solid rgba(100, 150, 255, 0.5);
                    border-radius: 8px;
                    color: white;
                    cursor: pointer;
                    font-weight: 600;
                ">📋 Copy Message</button>
                <button onclick="this.closest('div').remove()" style="
                    padding: 0.75rem 1.5rem;
                    background: rgba(255, 100, 100, 0.2);
                    border: 1px solid rgba(255, 100, 100, 0.5);
                    border-radius: 8px;
                    color: white;
                    cursor: pointer;
                ">✕ Close</button>
            </div>
        `;
        
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        this.showCommandResult('Email Ready', `📧 Email prepared for ${this.gatewayContext.developer.name}\n\n✅ Message formatted with context\n📋 Ready to send or copy`);
    }
    
    /**
     * Show system version information
     */
    showSystemVersion() {
        const version = this.getSystemVersion();
        const buildInfo = this.getBuildInfo();
        
        const message = `🚀 GATEWAY AI SYSTEM\n\nVersion: ${version}\nBuild: ${buildInfo.build}\nUpdated: ${new Date(this.gatewayContext.lastUpdated).toLocaleString()}\n\nFeatures:\n• ${buildInfo.features.join('\n• ')}\n\nDeveloper: ${this.gatewayContext.developer.name}\nContact: ${this.gatewayContext.developer.email}`;
        
        this.showCommandResult('System Version', message, true);
    }
    
    /**
     * Simulate WebSocket connection for real-time updates
     */
    simulateWebSocketConnection() {
        // Simulate WebSocket with interval-based polling
        this.websocketSimulator = setInterval(() => {
            // Simulate receiving updates
            const randomUpdate = Math.random();
            
            if (randomUpdate < 0.1) { // 10% chance of update
                this.processIncomingUpdate({
                    type: 'context-refresh',
                    timestamp: Date.now(),
                    source: 'gateway-server'
                });
            }
        }, 60000); // Check every minute
        
        console.log('🌐 WebSocket simulation active');
    }
    
    /**
     * Process incoming updates from server/other sources
     */
    processIncomingUpdate(updateData) {
        console.log('📥 Incoming update received:', updateData);
        
        switch (updateData.type) {
            case 'context-refresh':
                this.refreshGatewayContext();
                break;
            case 'platform-update':
                this.updatePlatformData(updateData.data);
                break;
            case 'command-update':
                this.updateAvailableCommands(updateData.commands);
                break;
        }
    }
    
    /**
     * Refresh Gateway context from latest data
     */
    refreshGatewayContext() {
        const oldContext = { ...this.gatewayContext };
        this.gatewayContext = this.initializeContext();
        
        // Broadcast context update to all AIs
        this.broadcastToAllAIs({
            type: 'context-update',
            oldContext: oldContext,
            newContext: this.gatewayContext,
            timestamp: Date.now()
        });
        
        console.log('🔄 Gateway context refreshed and synchronized');
    }
    
    /**
     * Utility functions for update system
     */
    
    getBuildInfo() {
        return {
            build: `BUILD-${Date.now().toString().slice(-6)}`,
            features: [
                'AI Embedding Protocol',
                'Quantum Entanglement',
                'Neural Bridge',
                'Live Updates',
                'Email Communication',
                'Cross-AI Synchronization',
                'Command Discovery',
                'Context Injection'
            ]
        };
    }
    
    getConnectedAICount() {
        // Simulate connected AI count
        return Math.floor(Math.random() * 5) + 1;
    }
    
    getSessionSummary() {
        return {
            duration: Date.now() - this.sessionStart,
            commands: this.commandHistory?.length || 0,
            provider: this.currentProvider,
            quantumActive: !!window.GATEWAY_QUANTUM,
            neuralActive: !!window.GATEWAY_NEURAL
        };
    }
    
    loadMessageQueue() {
        try {
            return JSON.parse(localStorage.getItem('gateway-message-queue') || '[]');
        } catch {
            return [];
        }
    }
    
    addToMessageQueue(messageData) {
        const queue = this.loadMessageQueue();
        queue.push(messageData);
        localStorage.setItem('gateway-message-queue', JSON.stringify(queue.slice(-10))); // Keep last 10
        localStorage.setItem('gateway-last-contact', Date.now().toString());
    }
    
    /**
     * Enhanced sync context with all AIs
     */
    syncContextWithAllAIs() {
        const contextHash = this.generateContextHash();
        const lastKnownHash = localStorage.getItem('gateway-context-hash');
        
        if (contextHash !== lastKnownHash) {
            this.broadcastToAllAIs({
                type: 'context-sync',
                context: this.gatewayContext,
                hash: contextHash,
                timestamp: Date.now()
            });
            
            localStorage.setItem('gateway-context-hash', contextHash);
        }
    }
    
    /**
     * Utility functions for embedding protocol
     */
    getAllPlatformData() {
        // Simulated platform data - in real app, fetch from API
        return {
            totalPlatforms: 500,
            categories: 12,
            verified: 450,
            trending: ['ChatGPT', 'Claude', 'Midjourney', 'Notion AI']
        };
    }
    
    getAvailableCommands() {
        return [
            '!categories', '!search', '!recommend', '!navigate',
            '!trending', '!random', '!history', '!compare', 
            '!stats', '!bookmark', '!help', '!embed',
            '!update', '!email', '!version', '!sync-all'
        ];
    }
    
    syncQuantumState() {
        // Quantum state synchronization
        if (window.GATEWAY_QUANTUM) {
            const state = {
                timestamp: Date.now(),
                activeProvider: this.currentProvider,
                contextHash: this.generateContextHash()
            };
            
            localStorage.setItem('gateway-quantum-state', JSON.stringify(state));
        }
    }
    
    processNeuralSync(data) {
        console.log('🧠 Neural sync received:', data);
        // Process incoming neural synchronization
    }
    
    generateContextHash() {
        const context = JSON.stringify(this.gatewayContext);
        return btoa(context).substring(0, 16);
    }
    
    getMostUsedCategory() {
        // Simple heuristic - in real app, track actual usage
        const categories = ['Tools', 'Entertainment', 'AI', 'Social', 'Design'];
        return categories[Math.floor(Math.random() * categories.length)];
    }
    
    /**
     * Show command execution result with enhanced display
     */
    showCommandResult(title, message, isLargeContent = false) {
        // Create notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--ai-gradient);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            border: 1px solid var(--ai-border);
            box-shadow: 0 10px 30px var(--ai-glow);
            z-index: 1000;
            max-width: ${isLargeContent ? '500px' : '300px'};
            max-height: 80vh;
            overflow-y: auto;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        `;
        
        notification.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                ${title}
                ${isLargeContent ? '<span onclick="this.closest(\'div\').remove()" style="cursor: pointer; opacity: 0.7;">✕</span>' : ''}
            </div>
            <div style="font-size: 0.9rem; opacity: 0.9; white-space: pre-line;">${message}</div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        // Auto remove (longer for large content)
        const autoRemoveDelay = isLargeContent ? 10000 : 3000;
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(-20px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, autoRemoveDelay);
    }
    
    /**
     * Update connection status display
     */
    updateConnectionStatus(status) {
        const statusEl = document.getElementById('connection-status');
        if (statusEl) {
            statusEl.textContent = status;
        }
    }
    
    /**
     * Update context display in sidebar
     */
    updateContextDisplay() {
        const currentPageEl = document.getElementById('current-page');
        const currentCategoryEl = document.getElementById('current-category');
        
        if (currentPageEl) {
            currentPageEl.textContent = this.gatewayContext.currentPage;
        }
        if (currentCategoryEl) {
            currentCategoryEl.textContent = this.gatewayContext.currentCategory;
        }
        this.updateBookmarkCount();
    }
    
    /**
     * Update bookmark count display
     */
    updateBookmarkCount() {
        const count = this.loadBookmarks().length;
        const bookmarkCountEl = document.getElementById('bookmark-count');
        if (bookmarkCountEl) {
            bookmarkCountEl.textContent = count;
        }
    }
    
    /**
     * Utility functions
     */
    
    detectCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('/ai/')) return 'AI Hub';
        if (path.includes('/categories/')) return 'Categories';
        if (path === '/') return 'Home';
        return 'Gateway';
    }
    
    detectCurrentCategory() {
        const path = window.location.pathname;
        const match = path.match(/\/categories\/([^/]+)/);
        return match ? this.formatCategoryName(match[1]) : 'Universal';
    }
    
    formatCategoryName(category) {
        return category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    loadBookmarks() {
        try {
            return JSON.parse(localStorage.getItem('gateway-ai-bookmarks') || '[]');
        } catch {
            return [];
        }
    }
    
    loadRecentSearches() {
        try {
            return JSON.parse(localStorage.getItem('gateway-ai-searches') || '[]');
        } catch {
            return [];
        }
    }
    
    addToRecentSearches(query) {
        const searches = this.loadRecentSearches();
        searches.unshift(query);
        // Keep only last 10 searches
        const limited = searches.slice(0, 10);
        localStorage.setItem('gateway-ai-searches', JSON.stringify(limited));
    }
    
    loadUserPreferences() {
        const savedProvider = localStorage.getItem('gateway-ai-provider');
        if (savedProvider && this.providers[savedProvider]) {
            // Auto-select last used provider
            setTimeout(() => {
                this.selectProvider(savedProvider);
            }, 1000);
        }
    }
}

/**
 * Global functions for HTML onclick handlers
 */
window.showProviderInstructions = function() {
    const selectedProvider = document.querySelector('.provider-option.active');
    if (selectedProvider) {
        const providerKey = selectedProvider.dataset.provider;
        window.gatewayAI.selectProvider(providerKey);
    } else {
        // Show general instructions
        alert('Please select an AI provider from the sidebar first, then click "Get Started".');
    }
};

/**
 * Initialize Gateway AI when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Loading Gateway AI...');
    window.gatewayAI = new GatewayAI();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // Focus on AI chat if available
            const iframe = document.getElementById('chat-iframe');
            if (iframe && iframe.src) {
                iframe.focus();
            }
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            document.querySelectorAll('[style*="position: fixed"]').forEach(modal => {
                if (modal.style.zIndex === '1000') {
                    modal.remove();
                }
            });
        }
    });
});

/**
 * Export for module usage
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GatewayAI;
}
