/**
 * Gateway AI Command System - Embeddable Module
 * Easily integrate into any existing site
 */

(function() {
    'use strict';
    
    // Inject CSS styles
    const injectStyles = () => {
        const styleId = 'gateway-ai-styles';
        if (document.getElementById(styleId)) return;
        
        const styles = `
        /* Gateway AI Command System Embedded Styles */
        :root {
            --ai-chat-bg: rgba(0, 0, 0, 0.95);
            --ai-bubble-bg: #1a1a1a;
            --ai-user-bg: #667eea;
            --ai-border: rgba(255, 255, 255, 0.1);
            --command-bg: rgba(102, 126, 234, 0.1);
            --command-border: rgba(102, 126, 234, 0.3);
            --command-hover: rgba(102, 126, 234, 0.2);
            --text-primary: #ffffff;
            --text-secondary: #cccccc;
            --accent-primary: #667eea;
            --accent-secondary: #764ba2;
            --card-bg: #1a1a1a;
            --input-bg: #2a2a2a;
            --spacing-sm: 8px;
            --spacing-md: 16px;
            --spacing-lg: 24px;
            --spacing-xl: 32px;
            --radius-sm: 4px;
            --radius-md: 8px;
            --radius-lg: 12px;
            --font-size-sm: 0.875rem;
            --font-size-base: 1rem;
            --font-size-lg: 1.25rem;
            --font-size-2xl: 1.875rem;
            --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.3);
            --shadow-xl: 0 25px 50px rgba(0, 0, 0, 0.5);
        }
        
        /* Chat Modal Overlay */
        .ai-chat-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--ai-chat-bg);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .ai-chat-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        /* Chat Container */
        .ai-chat-container {
            background: var(--card-bg);
            border-radius: var(--radius-lg);
            border: 2px solid var(--ai-border);
            width: 90vw;
            height: 85vh;
            max-width: 900px;
            max-height: 700px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: var(--shadow-xl);
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .ai-chat-overlay.active .ai-chat-container {
            transform: scale(1);
        }
        
        /* Chat Header */
        .ai-chat-header {
            padding: var(--spacing-lg);
            border-bottom: 1px solid var(--ai-border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
            color: white;
        }
        
        .ai-chat-title {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            font-size: var(--font-size-lg);
            font-weight: 700;
        }
        
        .ai-status-indicator {
            width: 12px;
            height: 12px;
            background: #4ade80;
            border-radius: 50%;
            animation: ai-pulse 2s infinite;
        }
        
        @keyframes ai-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        .ai-close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: var(--spacing-sm);
            border-radius: var(--radius-sm);
            transition: background 0.2s ease;
        }
        
        .ai-close-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        /* Main Content Area */
        .ai-main-content {
            flex: 1;
            display: flex;
            overflow: hidden;
        }
        
        /* Command Panel */
        .ai-command-panel {
            width: 320px;
            background: rgba(0, 0, 0, 0.02);
            border-right: 1px solid var(--ai-border);
            padding: var(--spacing-lg);
            overflow-y: auto;
        }
        
        .command-section {
            margin-bottom: var(--spacing-xl);
        }
        
        .command-section-title {
            font-size: var(--font-size-lg);
            font-weight: 700;
            margin-bottom: var(--spacing-md);
            color: var(--text-primary);
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
        }
        
        .command-grid {
            display: grid;
            gap: var(--spacing-sm);
            grid-template-columns: 1fr;
        }
        
        .command-btn {
            background: var(--command-bg);
            border: 1px solid var(--command-border);
            border-radius: var(--radius-md);
            padding: var(--spacing-md);
            text-align: left;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: var(--font-size-sm);
            font-family: inherit;
        }
        
        .command-btn:hover {
            background: var(--command-hover);
            transform: translateX(2px);
            border-color: var(--accent-primary);
        }
        
        .command-btn:active {
            transform: scale(0.98);
        }
        
        .command-text {
            flex: 1;
            color: var(--text-primary);
            font-weight: 500;
        }
        
        .command-icon {
            color: var(--accent-primary);
            font-size: var(--font-size-base);
        }
        
        /* Chat Messages Area */
        .ai-chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: var(--spacing-lg);
            display: flex;
            flex-direction: column;
            gap: var(--spacing-lg);
        }
        
        .ai-message {
            display: flex;
            gap: var(--spacing-md);
            max-width: 80%;
            animation: ai-fadeInUp 0.3s ease;
        }
        
        @keyframes ai-fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .ai-message.user {
            align-self: flex-end;
            flex-direction: row-reverse;
        }
        
        .ai-message.assistant {
            align-self: flex-start;
        }
        
        .ai-message.system {
            align-self: center;
            max-width: 90%;
        }
        
        .ai-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            flex-shrink: 0;
        }
        
        .ai-avatar.user {
            background: var(--ai-user-bg);
            color: white;
        }
        
        .ai-avatar.assistant {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .ai-avatar.system {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
        }
        
        .ai-message-content {
            background: var(--card-bg);
            padding: var(--spacing-md) var(--spacing-lg);
            border-radius: var(--radius-md);
            border: 1px solid var(--ai-border);
            line-height: 1.6;
            font-size: var(--font-size-sm);
            color: var(--text-primary);
            white-space: pre-line;
        }
        
        .ai-message.user .ai-message-content {
            background: var(--ai-user-bg);
            color: white;
        }
        
        .ai-message.system .ai-message-content {
            background: rgba(79, 172, 254, 0.1);
            border-color: rgba(79, 172, 254, 0.3);
            text-align: center;
            font-style: italic;
        }
        
        /* Welcome Screen */
        .ai-welcome-screen {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            text-align: center;
            padding: var(--spacing-xl);
            color: var(--text-secondary);
        }
        
        .welcome-emoji {
            font-size: 48px;
            margin-bottom: var(--spacing-lg);
        }
        
        .welcome-title {
            font-size: var(--font-size-2xl);
            font-weight: 700;
            margin-bottom: var(--spacing-md);
            color: var(--text-primary);
        }
        
        .welcome-subtitle {
            font-size: var(--font-size-base);
            margin-bottom: var(--spacing-lg);
            max-width: 400px;
        }
        
        .welcome-instruction {
            font-size: var(--font-size-sm);
            background: var(--command-bg);
            padding: var(--spacing-md);
            border-radius: var(--radius-md);
            border: 1px solid var(--command-border);
            max-width: 350px;
        }
        
        /* Chat Input */
        .ai-chat-input-container {
            padding: var(--spacing-lg);
            border-top: 1px solid var(--ai-border);
            display: flex;
            gap: var(--spacing-md);
            align-items: flex-end;
        }
        
        .ai-chat-input {
            flex: 1;
            background: var(--input-bg);
            border: 2px solid var(--ai-border);
            border-radius: var(--radius-md);
            padding: var(--spacing-md) var(--spacing-lg);
            font-size: var(--font-size-base);
            color: var(--text-primary);
            resize: none;
            min-height: 50px;
            max-height: 120px;
            transition: border-color 0.2s ease;
            font-family: inherit;
        }
        
        .ai-chat-input:focus {
            outline: none;
            border-color: var(--accent-primary);
        }
        
        .ai-send-btn {
            background: var(--accent-primary);
            color: white;
            border: none;
            border-radius: var(--radius-md);
            padding: var(--spacing-md) var(--spacing-lg);
            font-size: 16px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 50px;
            height: 50px;
        }
        
        .ai-send-btn:hover:not(:disabled) {
            background: var(--accent-secondary);
            transform: translateY(-1px);
        }
        
        .ai-send-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        /* Floating Chat Button */
        .ai-chat-fab {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .ai-chat-fab:hover {
            transform: scale(1.1);
            box-shadow: var(--shadow-xl);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .ai-chat-container {
                width: 95vw;
                height: 90vh;
            }
            
            .ai-main-content {
                flex-direction: column;
            }
            
            .ai-command-panel {
                width: 100%;
                height: 200px;
                border-right: none;
                border-bottom: 1px solid var(--ai-border);
            }
            
            .command-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .ai-chat-fab {
                bottom: 80px;
                right: 15px;
                width: 50px;
                height: 50px;
                font-size: 20px;
            }
        }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.id = styleId;
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    };
    
    // Create HTML structure
    const createHTML = () => {
        const htmlId = 'gateway-ai-html';
        if (document.getElementById(htmlId)) return;
        
        const htmlContent = `
        <!-- Floating Chat Button -->
        <button class="ai-chat-fab" id="aiChatFab" aria-label="Open Gateway AI Command System">
            🧠
        </button>
        
        <!-- Chat Modal Overlay -->
        <div class="ai-chat-overlay" id="aiChatOverlay">
            <div class="ai-chat-container">
                <!-- Chat Header -->
                <div class="ai-chat-header">
                    <div class="ai-chat-title">
                        <div class="ai-status-indicator"></div>
                        <span>Gateway AI - Command System</span>
                    </div>
                    <button class="ai-close-btn" id="aiCloseBtn" aria-label="Close AI chat">
                        ×
                    </button>
                </div>
                
                <!-- Main Content -->
                <div class="ai-main-content">
                    <!-- Command Panel -->
                    <div class="ai-command-panel">
                        <!-- Site Navigation Commands -->
                        <div class="command-section">
                            <div class="command-section-title">
                                🗂️ Site Navigation
                            </div>
                            <div class="command-grid">
                                <button class="command-btn" onclick="window.gatewayAI.executeCommand('list-categories')">
                                    <span class="command-text">List All Categories</span>
                                    <span class="command-icon">📋</span>
                                </button>
                                <button class="command-btn" onclick="window.gatewayAI.executeCommand('site-stats')">
                                    <span class="command-text">Site Statistics</span>
                                    <span class="command-icon">📊</span>
                                </button>
                                <button class="command-btn" onclick="window.gatewayAI.executeCommand('whats-new')">
                                    <span class="command-text">What's New</span>
                                    <span class="command-icon">🆕</span>
                                </button>
                                <button class="command-btn" onclick="window.gatewayAI.executeCommand('help-navigation')">
                                    <span class="command-text">Navigation Help</span>
                                    <span class="command-icon">🧭</span>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Category Deep Dive -->
                        <div class="command-section">
                            <div class="command-section-title">
                                🏷️ Category Explorer
                            </div>
                            <div class="command-grid">
                                <button class="command-btn" onclick="window.gatewayAI.executeCommand('explore-search')">
                                    <span class="command-text">Search Engines (39)</span>
                                    <span class="command-icon">🔍</span>
                                </button>
                                <button class="command-btn" onclick="window.gatewayAI.executeCommand('explore-tools')">
                                    <span class="command-text">Tools & Utilities (52)</span>
                                    <span class="command-icon">🛠️</span>
                                </button>
                                <button class="command-btn" onclick="window.gatewayAI.executeCommand('explore-entertainment')">
                                    <span class="command-text">Entertainment (51)</span>
                                    <span class="command-icon">🎭</span>
                                </button>
                                <button class="command-btn" onclick="window.gatewayAI.executeCommand('explore-knowledge')">
                                    <span class="command-text">Knowledge (53)</span>
                                    <span class="command-icon">📚</span>
                                </button>
                                <button class="command-btn" onclick="window.gatewayAI.executeCommand('explore-more')">
                                    <span class="command-text">More Categories...</span>
                                    <span class="command-icon">➡️</span>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Quick Actions -->
                        <div class="command-section">
                            <div class="command-section-title">
                                ⚡ Quick Actions
                            </div>
                            <div class="command-grid">
                                <button class="command-btn" onclick="window.gatewayAI.executeCommand('find-ai-tools')">
                                    <span class="command-text">Find AI Tools</span>
                                    <span class="command-icon">🤖</span>
                                </button>
                                <button class="command-btn" onclick="window.gatewayAI.executeCommand('find-design-tools')">
                                    <span class="command-text">Design Resources</span>
                                    <span class="command-icon">🎨</span>
                                </button>
                                <button class="command-btn" onclick="window.gatewayAI.executeCommand('search-tips')">
                                    <span class="command-text">Search Tips</span>
                                    <span class="command-icon">💡</span>
                                </button>
                                <button class="command-btn" onclick="window.gatewayAI.executeCommand('random-resource')">
                                    <span class="command-text">Surprise Me!</span>
                                    <span class="command-icon">🎲</span>
                                </button>
                            </div>
                        </div>
                        
                        <!-- System Commands -->
                        <div class="command-section">
                            <div class="command-section-title">
                                ⚙️ System
                            </div>
                            <div class="command-grid">
                                <button class="command-btn" onclick="window.gatewayAI.executeCommand('clear-chat')">
                                    <span class="command-text">Clear Chat</span>
                                    <span class="command-icon">🧹</span>
                                </button>
                                <button class="command-btn" onclick="window.gatewayAI.executeCommand('show-commands')">
                                    <span class="command-text">All Commands</span>
                                    <span class="command-icon">📜</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Chat Messages -->
                    <div class="ai-chat-messages" id="aiMessages">
                        <div class="ai-welcome-screen">
                            <div class="welcome-emoji">🎯</div>
                            <div class="welcome-title">Gateway AI Command System</div>
                            <div class="welcome-subtitle">
                                Click any command on the left to get instant, structured responses about your Gateway!
                            </div>
                            <div class="welcome-instruction">
                                💡 You can also type commands like "/list-categories" or ask natural questions
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Chat Input -->
                <div class="ai-chat-input-container">
                    <textarea 
                        class="ai-chat-input" 
                        id="aiInput" 
                        placeholder="Click a command above or type /help for all commands..."
                        rows="1"
                    ></textarea>
                    <button class="ai-send-btn" id="aiSendBtn" aria-label="Send message">
                        ➤
                    </button>
                </div>
            </div>
        </div>
        `;
        
        const container = document.createElement('div');
        container.id = htmlId;
        container.innerHTML = htmlContent;
        document.body.appendChild(container);
    };
    
    // Initialize the Gateway AI System
    const initializeGatewayAI = () => {
        window.gatewayAI = {
            overlay: null,
            messages: null,
            input: null,
            sendBtn: null,
            fab: null,
            closeBtn: null,
            isOpen: false,
            commandHistory: [],
            
            knowledgeBase: {
                categories: {
                    'search-engines': { name: 'Search Engines', count: 39, emoji: '🔍', description: 'Your gateway to the entire search universe - mainstream, privacy-focused, academic, and hidden gems' },
                    'tools': { name: 'Tools & Utilities', count: 52, emoji: '🛠️', description: '52 curated tools across 6 categories: AI tools, PDF utilities, creative design, developer resources, productivity apps, and file conversion' },
                    'entertainment': { name: 'Entertainment & Media', count: 51, emoji: '🎭', description: 'Your gateway to streaming, music, gaming, and entertainment platforms' },
                    'knowledge': { name: 'Knowledge & Learning', count: 53, emoji: '📚', description: 'Educational resources, online courses, and learning platforms from Harvard and MIT to Wikipedia and Khan Academy' },
                    'anime': { name: 'Anime & Manga', count: 48, emoji: '🗾', description: 'Immerse yourself in Japanese animation and comics! Streaming platforms, manga readers, databases, and otaku communities' },
                    'crypto': { name: 'Crypto & Blockchain', count: 45, emoji: '₿', description: 'Navigate the digital economy! Trading platforms, DeFi protocols, NFT marketplaces, and blockchain analytics tools' },
                    'gaming': { name: 'Gaming & Esports', count: 42, emoji: '🎮', description: 'Level up your gaming experience! Game stores, streaming platforms, esports communities, and everything for PC, console, and competitive gaming' },
                    'health': { name: 'Health & Fitness', count: 43, emoji: '💪', description: 'Transform your wellness journey! Fitness apps, nutrition tracking, mental health resources, and workout platforms' },
                    'design': { name: 'Design & Creativity', count: 40, emoji: '🎨', description: 'Unleash your creative potential! Professional design tools, stock resources, inspiration platforms, and collaboration spaces' },
                    'lifestyle': { name: 'Lifestyle & Shopping', count: 44, emoji: '🛍️', description: 'Transform your daily life! E-commerce giants, travel platforms, food delivery, and home services for modern living' },
                    'news': { name: 'News & Trends', count: 48, emoji: '📰', description: 'Stay informed with trusted news sources, tech blogs, and trend tracking platforms from BBC to TechCrunch' },
                    'social': { name: 'Social Networks', count: 39, emoji: '🌐', description: 'Connect and engage with communities worldwide through social media, professional networks, forums, and communication tools' },
                    'hidden-treasures': { name: 'Hidden Treasures', count: 50, emoji: '💎', description: "The internet's best-kept secrets. Powerful tools and hidden gems that insiders use but rarely share. Welcome to the underground." }
                },
                totalResources: 577,
                totalCategories: 13
            },
            
            init() {
                this.overlay = document.getElementById('aiChatOverlay');
                this.messages = document.getElementById('aiMessages');
                this.input = document.getElementById('aiInput');
                this.sendBtn = document.getElementById('aiSendBtn');
                this.fab = document.getElementById('aiChatFab');
                this.closeBtn = document.getElementById('aiCloseBtn');
                
                this.initializeEventListeners();
                console.log('🧠 Gateway AI Command System initialized and ready!');
            },
            
            initializeEventListeners() {
                if (!this.overlay) return;
                
                // Open/close chat
                this.fab?.addEventListener('click', () => this.openChat());
                this.closeBtn?.addEventListener('click', () => this.closeChat());
                this.overlay.addEventListener('click', (e) => {
                    if (e.target === this.overlay) this.closeChat();
                });
                
                // Send message
                this.sendBtn?.addEventListener('click', () => this.sendMessage());
                this.input?.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        this.sendMessage();
                    }
                });
                
                // Auto-resize input
                this.input?.addEventListener('input', () => this.autoResizeInput());
                
                // Keyboard shortcuts
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && this.isOpen) {
                        this.closeChat();
                    }
                    if (e.ctrlKey && e.key === 'i' && !this.isOpen) {
                        e.preventDefault();
                        this.openChat();
                    }
                });
            },
            
            openChat() {
                this.isOpen = true;
                this.overlay?.classList.add('active');
                this.input?.focus();
            },
            
            closeChat() {
                this.isOpen = false;
                this.overlay?.classList.remove('active');
            },
            
            autoResizeInput() {
                if (!this.input) return;
                this.input.style.height = 'auto';
                this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
            },
            
            sendMessage() {
                if (!this.input) return;
                const message = this.input.value.trim();
                if (!message) return;
                
                this.addMessage(message, 'user');
                this.input.value = '';
                this.autoResizeInput();
                
                // Process command or natural language
                if (message.startsWith('/')) {
                    this.executeCommand(message.substring(1));
                } else {
                    this.processNaturalLanguage(message);
                }
            },
            
            addMessage(content, role) {
                if (!this.messages) return;
                
                // Remove welcome screen
                const welcomeScreen = this.messages.querySelector('.ai-welcome-screen');
                if (welcomeScreen) {
                    welcomeScreen.remove();
                }
                
                const messageDiv = document.createElement('div');
                messageDiv.className = `ai-message ${role}`;
                
                const avatar = document.createElement('div');
                avatar.className = `ai-avatar ${role}`;
                if (role === 'user') avatar.textContent = '👤';
                else if (role === 'assistant') avatar.textContent = '🧠';
                else if (role === 'system') avatar.textContent = '⚙️';
                
                const messageContent = document.createElement('div');
                messageContent.className = 'ai-message-content';
                messageContent.textContent = content;
                
                messageDiv.appendChild(avatar);
                messageDiv.appendChild(messageContent);
                
                this.messages.appendChild(messageDiv);
                this.scrollToBottom();
            },
            
            executeCommand(command) {
                this.commandHistory.push(command);
                this.addMessage(`Command executed: /${command}`, 'system');
                
                // Execute command logic
                switch (command) {
                    case 'list-categories':
                        this.listCategories();
                        break;
                    case 'site-stats':
                        this.showSiteStats();
                        break;
                    case 'whats-new':
                        this.showWhatsNew();
                        break;
                    case 'help-navigation':
                        this.showNavigationHelp();
                        break;
                    case 'explore-search':
                        this.exploreCategory('search-engines');
                        break;
                    case 'explore-tools':
                        this.exploreCategory('tools');
                        break;
                    case 'explore-entertainment':
                        this.exploreCategory('entertainment');
                        break;
                    case 'explore-knowledge':
                        this.exploreCategory('knowledge');
                        break;
                    case 'explore-more':
                        this.exploreMoreCategories();
                        break;
                    case 'find-ai-tools':
                        this.findAITools();
                        break;
                    case 'find-design-tools':
                        this.findDesignTools();
                        break;
                    case 'search-tips':
                        this.showSearchTips();
                        break;
                    case 'random-resource':
                        this.showRandomResource();
                        break;
                    case 'clear-chat':
                        this.clearChat();
                        break;
                    case 'show-commands':
                        this.showAllCommands();
                        break;
                    default:
                        this.addMessage(`Unknown command: /${command}. Type /show-commands to see all available commands.`, 'assistant');
                }
            },
            
            listCategories() {
                const categories = Object.values(this.knowledgeBase.categories);
                let response = `📋 **The Everything Gateway - All ${this.knowledgeBase.totalCategories} Categories:**\n\n`;
                
                categories.forEach((cat, index) => {
                    response += `${index + 1}. ${cat.emoji} **${cat.name}** (${cat.count} resources)\n`;
                });
                
                response += `\n🎯 Total: ${this.knowledgeBase.totalResources}+ resources across all categories`;
                this.addMessage(response, 'assistant');
            },
            
            showSiteStats() {
                const response = `📊 **Gateway Statistics:**

🏷️ Categories: ${this.knowledgeBase.totalCategories}
📦 Total Resources: ${this.knowledgeBase.totalResources}+
🆓 Cost to Use: Free
🌍 Global Access: Available Worldwide
⚡ Search Options: Universal Search (Ctrl+K)
🤖 AI Assistant: Command-based intelligence
📱 Mobile Ready: Fully responsive design

🏆 **Top Categories by Resource Count:**
1. 🔍 Search Engines - 39 resources
2. 📚 Knowledge & Learning - 53 resources  
3. 🛠️ Tools & Utilities - 52 resources
4. 🎭 Entertainment & Media - 51 resources
5. 💎 Hidden Treasures - 50 secrets`;

                this.addMessage(response, 'assistant');
            },
            
            exploreCategory(categoryId) {
                const category = this.knowledgeBase.categories[categoryId];
                if (category) {
                    const response = `${category.emoji} **${category.name}**

📊 **${category.count} resources available**

📝 **Description:**
${category.description}

🔗 **Access:** Click on "${category.name}" on the main Gateway page

💡 **Tip:** Use Ctrl+K to search within this category specifically`;

                    this.addMessage(response, 'assistant');
                }
            },
            
            exploreMoreCategories() {
                const categories = ['anime', 'crypto', 'gaming', 'health', 'design', 'lifestyle', 'news', 'social', 'hidden-treasures'];
                let response = "🏷️ **Additional Categories:**\n\n";
                
                categories.forEach(catId => {
                    const cat = this.knowledgeBase.categories[catId];
                    response += `${cat.emoji} **${cat.name}** (${cat.count})\n${cat.description}\n\n`;
                });
                
                this.addMessage(response, 'assistant');
            },
            
            findAITools() {
                const response = `🤖 **AI Tools in The Gateway:**

📍 **Location:** Tools & Utilities → AI & ML Section

🔥 **Popular AI Tools Include:**
• ChatGPT - Conversational AI
• Claude - Advanced AI assistant  
• Midjourney - AI image generation
• GitHub Copilot - AI coding assistant
• Perplexity - AI search engine

💡 **Plus:** PDF AI tools, creative AI platforms, and productivity AI assistants

🔗 **Access:** Go to Tools & Utilities category and look for the "AI & ML" section`;

                this.addMessage(response, 'assistant');
            },
            
            findDesignTools() {
                const response = `🎨 **Design Resources Available:**

📍 **Primary Location:** Design & Creativity category (40 resources)

🛠️ **Tool Categories:**
• Professional Design Software
• Stock Resource Libraries  
• Inspiration Platforms
• Collaboration Spaces
• Portfolio Builders

⭐ **Popular Tools:**
• Figma - Collaborative design
• Canva - Quick graphics
• Dribbble - Design inspiration
• Adobe Creative Suite alternatives
• Free stock photo resources

🔗 **Access:** Click "Design & Creativity" on the main Gateway page`;

                this.addMessage(response, 'assistant');
            },
            
            showSearchTips() {
                const response = `💡 **Gateway Search Tips:**

⌨️ **Keyboard Shortcuts:**
• Ctrl+K - Open universal search
• Ctrl+I - Open AI command system (this!)

🎯 **Search Strategies:**
• Use category names: "search engines", "tools"
• Try specific terms: "PDF editor", "AI chat"
• Search by use case: "design inspiration", "streaming"

🔍 **Advanced Tips:**
• Browse by category first, then search within
• Check "Hidden Treasures" for unique finds
• Use tags to find related resources

🤖 **AI Commands:**
• Type /find-ai-tools for AI resources
• Use /list-categories to see all options
• Try /random-resource for discoveries`;

                this.addMessage(response, 'assistant');
            },
            
            showRandomResource() {
                const categories = Object.keys(this.knowledgeBase.categories);
                const randomCategory = categories[Math.floor(Math.random() * categories.length)];
                const category = this.knowledgeBase.categories[randomCategory];
                
                const response = `🎲 **Random Discovery:**

${category.emoji} **${category.name}**
${category.description}

📊 **${category.count} resources** to explore in this category

🎯 **Why you might like this:**
This category offers curated resources that many users find valuable for productivity and discovery.

🔗 **Explore:** Check out the "${category.name}" section on the main Gateway page!`;

                this.addMessage(response, 'assistant');
            },
            
            showWhatsNew() {
                const response = `🆕 **What's New at The Gateway:**

✨ **Recent Additions:**
• Command-based AI system (you're using it now!)
• Enhanced search functionality
• Mobile-optimized interface
• New categories added regularly

🚀 **Latest Categories:**
• 💎 Hidden Treasures - Secret tools and resources
• 🎨 Design & Creativity - Professional creative tools
• 💪 Health & Fitness - Wellness platforms
• ₿ Crypto & Blockchain - Digital economy tools

🔧 **Improvements:**
• Faster loading times
• Better mobile experience  
• Enhanced search algorithms
• More detailed categorization

📈 **Growing:** We add new resources weekly!`;

                this.addMessage(response, 'assistant');
            },
            
            showNavigationHelp() {
                const response = `🧭 **Navigation Help:**

🏠 **Homepage:**
• Browse all 13 category cards
• Click any category to explore
• Use search (Ctrl+K) for quick access

📱 **Mobile Navigation:**
• Tap categories to explore
• Use hamburger menu if available
• Search button for quick finds

⌨️ **Keyboard Shortcuts:**
• Ctrl+K - Universal search
• Ctrl+I - AI command system
• Escape - Close modals

🔍 **Search Features:**
• Search across all 577+ resources
• Filter by category
• Save favorites (heart icon)

💡 **Pro Tips:**
• Bookmark frequently used categories
• Try the "Hidden Treasures" for unique finds
• Use this command system for quick answers`;

                this.addMessage(response, 'assistant');
            },
            
            showAllCommands() {
                const response = `📜 **All Available Commands:**

🗂️ **Site Navigation:**
• /list-categories - Show all 13 categories
• /site-stats - Gateway statistics
• /whats-new - Recent updates
• /help-navigation - Navigation guide

🏷️ **Category Explorer:**
• /explore-search - Search Engines (39)
• /explore-tools - Tools & Utilities (52)
• /explore-entertainment - Entertainment (51)
• /explore-knowledge - Knowledge (53)
• /explore-more - All other categories

⚡ **Quick Actions:**
• /find-ai-tools - Locate AI resources
• /find-design-tools - Design resources
• /search-tips - Search guidance
• /random-resource - Surprise discovery

⚙️ **System:**
• /clear-chat - Clear conversation
• /show-commands - This list

💡 **Tip:** You can also ask natural questions or click the command buttons on the left!`;

                this.addMessage(response, 'assistant');
            },
            
            clearChat() {
                if (!this.messages) return;
                this.messages.innerHTML = '';
                this.addMessage('Chat cleared! Ready for new commands.', 'system');
                this.commandHistory = [];
            },
            
            processNaturalLanguage(message) {
                const msgLower = message.toLowerCase();
                
                if (msgLower.includes('categories') || msgLower.includes('list')) {
                    this.executeCommand('list-categories');
                } else if (msgLower.includes('stats') || msgLower.includes('statistics')) {
                    this.executeCommand('site-stats');
                } else if (msgLower.includes('ai tools') || msgLower.includes('artificial intelligence')) {
                    this.executeCommand('find-ai-tools');
                } else if (msgLower.includes('design') || msgLower.includes('creative')) {
                    this.executeCommand('find-design-tools');
                } else if (msgLower.includes('search') && msgLower.includes('engine')) {
                    this.executeCommand('explore-search');
                } else if (msgLower.includes('help') || msgLower.includes('how')) {
                    this.executeCommand('show-commands');
                } else {
                    const response = `I understand you're asking: "${message}"
                    
💡 **Suggested commands:**
• Type /list-categories to see all categories
• Type /find-ai-tools if you need AI resources
• Type /show-commands to see all available options
• Or click any command button on the left!

🎯 This structured approach ensures you get exactly what you need, every time.`;
                    this.addMessage(response, 'assistant');
                }
            },
            
            scrollToBottom() {
                if (!this.messages) return;
                this.messages.scrollTop = this.messages.scrollHeight;
            }
        };
    };
    
    // Auto-initialize when DOM is ready
    const initialize = () => {
        injectStyles();
        createHTML();
        initializeGatewayAI();
        
        // Wait for DOM elements to be available
        setTimeout(() => {
            if (window.gatewayAI) {
                window.gatewayAI.init();
            }
        }, 100);
    };
    
    // Initialize based on document state
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
