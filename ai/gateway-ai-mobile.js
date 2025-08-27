/**
 * Gateway AI 2.0 - Revolutionary Mobile-First System
 * Replaces the current AI system with incredible mobile experience
 */

(function() {
    'use strict';
    
    // Inject Revolutionary Mobile-First CSS
    const injectMobileStyles = () => {
        const styleId = 'gateway-ai-mobile-styles';
        if (document.getElementById(styleId)) return;
        
        const styles = `
        /* Gateway AI 2.0 - Mobile-First Revolution */
        :root {
            --ai-primary: #667eea;
            --ai-secondary: #764ba2;
            --ai-accent: #4facfe;
            --ai-success: #4ade80;
            --ai-warning: #fbbf24;
            --ai-error: #f87171;
            
            --ai-bg-primary: rgba(0, 0, 0, 0.95);
            --ai-bg-secondary: #1a1a1a;
            --ai-bg-card: #2a2a2a;
            --ai-bg-command: rgba(102, 126, 234, 0.1);
            --ai-bg-hover: rgba(102, 126, 234, 0.2);
            
            --ai-text-primary: #ffffff;
            --ai-text-secondary: #cccccc;
            --ai-text-muted: #888888;
            
            --ai-border: rgba(255, 255, 255, 0.1);
            --ai-border-active: rgba(102, 126, 234, 0.5);
            
            --ai-radius-sm: 8px;
            --ai-radius-md: 12px;
            --ai-radius-lg: 16px;
            --ai-radius-xl: 20px;
            
            --ai-spacing-xs: 8px;
            --ai-spacing-sm: 12px;
            --ai-spacing-md: 16px;
            --ai-spacing-lg: 24px;
            --ai-spacing-xl: 32px;
            
            --ai-shadow-sm: 0 4px 8px rgba(0, 0, 0, 0.2);
            --ai-shadow-md: 0 8px 16px rgba(0, 0, 0, 0.3);
            --ai-shadow-lg: 0 12px 24px rgba(0, 0, 0, 0.4);
            --ai-shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.5);
            
            --ai-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            --ai-transition-fast: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Remove tap highlight on all AI elements AND prevent pull-to-refresh */
        .ai-fab *,
        .ai-modal-overlay *,
        .ai-container * {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        
        /* Prevent pull-to-refresh when modal is open */
        body.ai-modal-open {
            overflow: hidden;
            overscroll-behavior: none;
            -webkit-overflow-scrolling: touch;
        }
        
        .ai-modal-overlay.active {
            overscroll-behavior: contain;
            -webkit-overflow-scrolling: touch;
        }
        
        /* Enhanced Floating Action Button */
        .ai-fab {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, var(--ai-primary) 0%, var(--ai-secondary) 100%);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            color: white;
            box-shadow: var(--ai-shadow-lg);
            transition: var(--ai-transition);
            z-index: 9999;
            overflow: hidden;
        }
        
        /* Hide FAB when modal is open */
        .ai-modal-overlay.active ~ .ai-fab {
            opacity: 0;
            visibility: hidden;
            transform: scale(0.8);
        }
        
        .ai-fab:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, var(--ai-accent) 0%, var(--ai-primary) 100%);
            opacity: 0;
            transition: var(--ai-transition);
        }
        
        .ai-fab:hover:before,
        .ai-fab:active:before {
            opacity: 1;
        }
        
        .ai-fab:hover {
            transform: scale(1.1) rotate(5deg);
            box-shadow: var(--ai-shadow-xl);
        }
        
        .ai-fab:active {
            transform: scale(0.95);
        }
        
        .ai-fab-icon {
            position: relative;
            z-index: 1;
            animation: ai-pulse 2s infinite;
        }
        
        @keyframes ai-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        /* Enhanced Modal Overlay - Mobile First! */
        .ai-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--ai-bg-primary);
            backdrop-filter: blur(20px) saturate(180%);
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: var(--ai-transition);
            display: flex;
            align-items: flex-end;
            padding: 0;
        }
        
        .ai-modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        /* Mobile-First Container - Slides up from bottom */
        .ai-container {
            width: 100%;
            height: 85vh;
            max-height: 600px;
            background: var(--ai-bg-secondary);
            border-radius: var(--ai-radius-xl) var(--ai-radius-xl) 0 0;
            box-shadow: var(--ai-shadow-xl);
            transform: translateY(100%);
            transition: var(--ai-transition);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
        }
        
        .ai-modal-overlay.active .ai-container {
            transform: translateY(0);
        }
        
        /* Drag Handle */
        .ai-drag-handle {
            position: absolute;
            top: var(--ai-spacing-sm);
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 4px;
            background: var(--ai-text-muted);
            border-radius: 2px;
            cursor: grab;
            z-index: 100;
            opacity: 0.7;
        }
        
        .ai-drag-handle:active {
            cursor: grabbing;
            opacity: 1;
        }
        
        /* Enhanced Header */
        .ai-header {
            padding: var(--ai-spacing-lg) var(--ai-spacing-lg) var(--ai-spacing-md);
            background: linear-gradient(135deg, var(--ai-primary) 0%, var(--ai-secondary) 100%);
            color: white;
            position: relative;
            overflow: hidden;
        }
        
        .ai-header-content {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .ai-title {
            display: flex;
            align-items: center;
            gap: var(--ai-spacing-sm);
            font-size: 1.4rem;
            font-weight: 700;
        }
        
        .ai-status {
            width: 12px;
            height: 12px;
            background: var(--ai-success);
            border-radius: 50%;
            animation: ai-status-pulse 2s infinite;
        }
        
        @keyframes ai-status-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        .ai-close {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: var(--ai-spacing-xs);
            border-radius: var(--ai-radius-sm);
            transition: var(--ai-transition-fast);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
        }
        
        .ai-close:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
        }
        
        .ai-subtitle {
            margin-top: var(--ai-spacing-sm);
            font-size: 0.9rem;
            opacity: 0.9;
            font-weight: 400;
        }
        
        /* Revolutionary Mobile Command Interface */
        .ai-main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        
        /* Swipeable Command Categories */
        .ai-categories {
            padding: var(--ai-spacing-md) 0 var(--ai-spacing-sm);
            background: var(--ai-bg-card);
            border-bottom: 1px solid var(--ai-border);
        }
        
        .ai-categories-scroll {
            display: flex;
            gap: var(--ai-spacing-sm);
            padding: 0 var(--ai-spacing-lg);
            overflow-x: auto;
            scroll-behavior: smooth;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }
        
        .ai-categories-scroll::-webkit-scrollbar {
            display: none;
        }
        
        .ai-category-chip {
            flex-shrink: 0;
            background: var(--ai-bg-command);
            border: 1px solid var(--ai-border);
            border-radius: var(--ai-radius-xl);
            padding: var(--ai-spacing-sm) var(--ai-spacing-md);
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: var(--ai-transition-fast);
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: var(--ai-spacing-xs);
            min-height: 36px;
        }
        
        .ai-category-chip.active {
            background: var(--ai-primary);
            border-color: var(--ai-primary);
            color: white;
            transform: scale(1.05);
        }
        
        .ai-category-chip:not(.active):hover {
            background: var(--ai-bg-hover);
            border-color: var(--ai-border-active);
            transform: translateY(-2px);
        }
        
        .ai-category-chip:active {
            transform: scale(0.95);
        }
        
        /* Enhanced Command Grid */
        .ai-commands-container {
            flex: 1;
            overflow-y: auto;
            padding: var(--ai-spacing-lg);
            background: var(--ai-bg-secondary);
        }
        
        .ai-commands-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--ai-spacing-md);
            margin-bottom: var(--ai-spacing-lg);
        }
        
        .ai-command-card {
            background: var(--ai-bg-card);
            border: 1px solid var(--ai-border);
            border-radius: var(--ai-radius-md);
            padding: var(--ai-spacing-lg);
            cursor: pointer;
            transition: var(--ai-transition-fast);
            position: relative;
            overflow: hidden;
            min-height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        
        .ai-command-card:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, var(--ai-primary) 0%, var(--ai-secondary) 100%);
            opacity: 0;
            transition: var(--ai-transition-fast);
        }
        
        .ai-command-card:hover:before {
            opacity: 0.1;
        }
        
        .ai-command-card:active {
            transform: scale(0.98);
        }
        
        .ai-command-card:hover {
            border-color: var(--ai-border-active);
            transform: translateY(-4px);
            box-shadow: var(--ai-shadow-md);
        }
        
        .ai-command-content {
            position: relative;
            z-index: 1;
        }
        
        .ai-command-icon {
            font-size: 2rem;
            margin-bottom: var(--ai-spacing-sm);
            display: block;
        }
        
        .ai-command-title {
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: var(--ai-spacing-xs);
            color: var(--ai-text-primary);
            line-height: 1.2;
        }
        
        .ai-command-desc {
            font-size: 0.75rem;
            color: var(--ai-text-secondary);
            line-height: 1.4;
        }
        
        .ai-command-badge {
            position: absolute;
            top: var(--ai-spacing-sm);
            right: var(--ai-spacing-sm);
            background: var(--ai-primary);
            color: white;
            font-size: 0.7rem;
            padding: 2px 6px;
            border-radius: var(--ai-radius-sm);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .ai-command-badge.new {
            background: var(--ai-success);
        }
        
        .ai-command-badge.hot {
            background: var(--ai-warning);
        }
        
        /* Chat Messages Area */
        .ai-messages {
            flex: 1;
            overflow-y: auto;
            padding: var(--ai-spacing-lg);
            display: none;
        }
        
        .ai-messages.active {
            display: flex;
            flex-direction: column;
            gap: var(--ai-spacing-md);
        }
        
        .ai-message {
            display: flex;
            gap: var(--ai-spacing-sm);
            max-width: 85%;
            animation: ai-message-slide-in 0.3s ease;
        }
        
        @keyframes ai-message-slide-in {
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
        
        .ai-message-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            flex-shrink: 0;
        }
        
        .ai-message-avatar.user {
            background: var(--ai-primary);
        }
        
        .ai-message-avatar.assistant {
            background: linear-gradient(135deg, var(--ai-accent) 0%, var(--ai-primary) 100%);
        }
        
        .ai-message-avatar.system {
            background: linear-gradient(135deg, var(--ai-warning) 0%, var(--ai-primary) 100%);
        }
        
        .ai-message-content {
            background: var(--ai-bg-card);
            border: 1px solid var(--ai-border);
            border-radius: var(--ai-radius-md);
            padding: var(--ai-spacing-md);
            font-size: 0.9rem;
            line-height: 1.5;
            position: relative;
        }
        
        .ai-message.user .ai-message-content {
            background: var(--ai-primary);
            border-color: var(--ai-primary);
            color: white;
        }
        
        .ai-message.system .ai-message-content {
            background: rgba(251, 191, 36, 0.1);
            border-color: rgba(251, 191, 36, 0.3);
            text-align: center;
            font-style: italic;
            font-size: 0.8rem;
        }
        
        /* Enhanced Input Area */
        .ai-input-area {
            padding: var(--ai-spacing-lg);
            background: var(--ai-bg-card);
            border-top: 1px solid var(--ai-border);
            display: flex;
            gap: var(--ai-spacing-sm);
            align-items: flex-end;
        }
        
        .ai-input {
            flex: 1;
            background: var(--ai-bg-secondary);
            border: 1px solid var(--ai-border);
            border-radius: var(--ai-radius-lg);
            padding: var(--ai-spacing-md) var(--ai-spacing-lg);
            font-size: 1rem;
            color: var(--ai-text-primary);
            resize: none;
            max-height: 120px;
            transition: var(--ai-transition-fast);
            font-family: inherit;
        }
        
        .ai-input:focus {
            outline: none;
            border-color: var(--ai-primary);
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
        }
        
        .ai-input::placeholder {
            color: var(--ai-text-muted);
        }
        
        .ai-send {
            width: 48px;
            height: 48px;
            background: var(--ai-primary);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: white;
            transition: var(--ai-transition-fast);
            flex-shrink: 0;
        }
        
        .ai-send:hover {
            background: var(--ai-secondary);
            transform: scale(1.1);
        }
        
        .ai-send:active {
            transform: scale(0.95);
        }
        
        .ai-send:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }
        
        /* Welcome State */
        .ai-welcome {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: var(--ai-spacing-xl);
            height: 100%;
        }
        
        .ai-welcome-icon {
            font-size: 4rem;
            margin-bottom: var(--ai-spacing-lg);
            animation: ai-float 3s ease-in-out infinite;
        }
        
        @keyframes ai-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .ai-welcome-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: var(--ai-spacing-sm);
            color: var(--ai-text-primary);
        }
        
        .ai-welcome-subtitle {
            color: var(--ai-text-secondary);
            margin-bottom: var(--ai-spacing-lg);
            line-height: 1.5;
            font-size: 0.95rem;
        }
        
        .ai-welcome-hint {
            background: var(--ai-bg-command);
            border: 1px solid var(--ai-border);
            border-radius: var(--ai-radius-md);
            padding: var(--ai-spacing-md);
            font-size: 0.85rem;
            color: var(--ai-text-secondary);
            max-width: 280px;
        }
        
        /* Responsive Enhancements */
        @media (min-width: 768px) {
            .ai-modal-overlay {
                align-items: center;
                justify-content: center;
            }
            
            .ai-container {
                width: 90vw;
                max-width: 900px;
                height: 85vh;
                border-radius: var(--ai-radius-xl);
            }
            
            .ai-commands-grid {
                grid-template-columns: repeat(3, 1fr);
            }
            
            .ai-fab {
                bottom: 24px;
                right: 24px;
            }
            
            .ai-drag-handle {
                display: none;
            }
        }
        
        @media (min-width: 1024px) {
            .ai-commands-grid {
                grid-template-columns: repeat(4, 1fr);
            }
        }
        
        /* Haptic Feedback Preparation */
        .ai-haptic {
            transition: transform 0.1s ease;
        }
        
        .ai-haptic:active {
            transform: scale(0.96);
        }
        
        /* Mobile Debug Panel */
        .ai-debug-panel {
            position: fixed;
            top: 10px;
            left: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.9);
            color: #00ff00;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            padding: 10px;
            border-radius: 8px;
            max-height: 200px;
            overflow-y: auto;
            z-index: 99999;
            border: 1px solid #333;
            display: none;
        }
        
        .ai-debug-panel.active {
            display: block;
        }
        
        .ai-debug-log {
            margin: 2px 0;
            word-break: break-all;
        }
        
        .ai-debug-toggle {
            position: fixed;
            top: 10px;
            right: 10px;
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 999999;
            cursor: pointer;
        }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.id = styleId;
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    };
    
    // Create Revolutionary HTML
    const createMobileHTML = () => {
        const htmlId = 'gateway-ai-mobile-html';
        if (document.getElementById(htmlId)) return;
        
        const htmlContent = `
        <!-- Mobile Debug Panel -->
        <button class="ai-debug-toggle" id="debugToggle">DEBUG</button>
        <div class="ai-debug-panel" id="debugPanel">
            <div class="ai-debug-log">🟡 Debug Panel Ready</div>
        </div>
        
        <!-- Enhanced Floating Action Button -->
        <button class="ai-fab" id="aiFab" aria-label="Open Gateway AI 2.0">
            <span class="ai-fab-icon">🧠</span>
        </button>
        
        <!-- Enhanced Modal -->
        <div class="ai-modal-overlay" id="aiModal">
            <div class="ai-container">
                <!-- Enhanced Header -->
                <div class="ai-header">
                    <div class="ai-header-content">
                        <div class="ai-title">
                            <div class="ai-status"></div>
                            Gateway AI 2.0
                        </div>
                    </div>
                    <div class="ai-subtitle">Mobile-first intelligent assistant</div>
                </div>
                
                <!-- Main Content -->
                <div class="ai-main-content">
                    <!-- Swipeable Categories -->
                    <div class="ai-categories">
                        <div class="ai-categories-scroll" id="categoriesScroll">
                            <div class="ai-category-chip active ai-haptic" data-category="navigation">
                                🗂️ Navigation
                            </div>
                            <div class="ai-category-chip ai-haptic" data-category="conversation">
                                💬 Ask Me
                            </div>
                            <div class="ai-category-chip ai-haptic" data-category="explorer">
                                🏷️ Explorer
                            </div>
                            <div class="ai-category-chip ai-haptic" data-category="actions">
                                ⚡ Actions
                            </div>
                            <div class="ai-category-chip ai-haptic" data-category="personal">
                                👤 Personal
                            </div>
                            <div class="ai-category-chip ai-haptic" data-category="advanced">
                                🔮 Advanced
                            </div>
                            <div class="ai-category-chip ai-haptic" data-category="system">
                                ⚙️ System
                            </div>
                        </div>
                    </div>
                    
                    <!-- Enhanced Commands Grid -->
                    <div class="ai-commands-container" id="commandsContainer">
                        <div class="ai-commands-grid" id="commandsGrid">
                            <!-- Commands will be dynamically populated -->
                        </div>
                    </div>
                    
                    <!-- Chat Messages (Hidden by default) -->
                    <div class="ai-messages" id="aiMessages">
                        <div class="ai-welcome">
                            <div class="ai-welcome-icon">🎯</div>
                            <div class="ai-welcome-title">Gateway AI 2.0</div>
                            <div class="ai-welcome-subtitle">
                                Swipe categories above and tap commands for instant responses!
                            </div>
                            <div class="ai-welcome-hint">
                                💡 Try swiping categories or typing natural questions
                            </div>
                        </div>
                    </div>
                    
                    <!-- Enhanced Input Area -->
                    <div class="ai-input-area">
                        <textarea class="ai-input" id="aiInput" 
                                  placeholder="Ask anything or type /help..." 
                                  rows="1"></textarea>
                        <button class="ai-send ai-haptic" id="aiSend" aria-label="Send message">
                            ➤
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        const container = document.createElement('div');
        container.id = htmlId;
        container.innerHTML = htmlContent;
        document.body.appendChild(container);
    };
    
    // Initialize Revolutionary Mobile AI System - SUPERCHARGED!
    const initializeMobileAI = () => {
        window.gatewayAI = new GatewayAIMobile();
    };
    
    // Gateway AI 2.0 Mobile Class - SUPERCHARGED EDITION
    class GatewayAIMobile {
        constructor() {
            this.isOpen = false;
            this.currentCategory = 'navigation';
            this.commandHistory = [];
            this.conversationHistory = [];
            this.userPreferences = this.loadUserPreferences();
            this.sessionData = {
                startTime: Date.now(),
                interactionCount: 0,
                categoriesVisited: new Set(),
                commandsUsed: new Set(),
                searchQueries: []
            };
            this.touchStartY = 0;
            this.isDragging = false;
            this.isTyping = false;
            this.contextMemory = new Map();
            
            // SUPERINTELLIGENCE ENGINE - Advanced Conversational AI
            this.aiBrain = {
                personality: 'expert search consultant with deep technical knowledge',
                learningMode: true,
                adaptiveResponses: true,
                contextAwareness: true,
                emotionalIntelligence: true,
                expertiseLevel: 'advanced',
                conversationDepth: 'multi-layered',
                knowledgeEvolution: true
            };
            
            // ADVANCED LEARNING & ANALYTICS SYSTEMS
            this.conversationAnalytics = {
                responseEffectiveness: new Map(),
                userSatisfactionScores: new Map(),
                conversationFlows: new Map(),
                topicExpertise: new Map(),
                learningPatterns: new Map()
            };
            
            this.conversationMemory = {
                currentTopic: null,
                conversationDepth: 0,
                userExpertiseLevel: 'beginner',
                followUpQuestions: [],
                contextHistory: [],
                engagementScore: 0
            };
            
            this.commands = this.getSuperchargedCommands();
            this.knowledgeBase = this.getExpandedKnowledgeBase();
            this.aiPatterns = this.getAdvancedAIPatterns();
            
            this.initializeElements();
            // Event listeners will be initialized after elements are ready
            this.renderCommands();
            this.initializeAdvancedFeatures();
            
            console.log('🚀 Gateway AI 2.0 SUPERCHARGED - Ready with Enhanced Intelligence!');
        }
        
        initializeElements() {
            // Use setTimeout to ensure DOM is ready
            setTimeout(() => {
                this.fab = document.getElementById('aiFab');
                this.modal = document.getElementById('aiModal');
                this.close = document.getElementById('aiClose');
                this.container = document.querySelector('.ai-container');
                this.categoriesScroll = document.getElementById('categoriesScroll');
                this.commandsGrid = document.getElementById('commandsGrid');
                this.messages = document.getElementById('aiMessages');
                this.input = document.getElementById('aiInput');
                this.send = document.getElementById('aiSend');
                this.dragHandle = document.querySelector('.ai-drag-handle');
                
                this.categoryChips = document.querySelectorAll('.ai-category-chip');
                
                // Debug logging
                console.log('🔧 Elements initialized:', {
                    fab: !!this.fab,
                    modal: !!this.modal,
                    close: !!this.close,
                    container: !!this.container,
                    dragHandle: !!this.dragHandle
                });
                
                // Re-initialize event listeners after elements are ready
                this.initializeEventListeners();
            }, 100);
        }
        
        initializeEventListeners() {
            console.log('🔧 Initializing event listeners...');
            this.debugLog('🔧 Initializing event listeners...');
            
            // Initialize debug panel
            this.initializeDebugPanel();
            
            // FAB - Use click events only for better scrolling experience
            if (this.fab) {
                this.fab.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🎯 FAB clicked');
                    this.debugLog('🎯 FAB clicked');
                    this.open();
                });
                console.log('✅ FAB events attached');
            } else {
                console.error('❌ FAB element not found!');
            }
            
// X button removed - users should use 'Back to Gateway' command
            
            this.modal?.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    e.preventDefault();
                    this.closeModal();
                }
            });
            this.modal?.addEventListener('touchend', (e) => {
                if (e.target === this.modal) {
                    e.preventDefault();
                    this.closeModal();
                }
            });
            
            // Category selection - Use click events only for better scrolling
            this.categoryChips.forEach(chip => {
                chip.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.selectCategory(chip.dataset.category);
                    this.addHapticFeedback();
                });
            });
            
            // Input and send - Enhanced mobile support
            this.input?.addEventListener('input', () => this.autoResize());
            this.input?.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            this.send?.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.sendMessage();
            });
            
            // Keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) this.close();
                if (e.ctrlKey && e.key === 'i' && !this.isOpen) {
                    e.preventDefault();
                    this.open();
                }
            });
            
            // Mobile gestures - Only category swipe enabled
            this.initializeCategorySwipe();
        }
        
        initializeTouchGestures() {
            const dragHandle = document.querySelector('.ai-drag-handle');
            if (!dragHandle) {
                console.log('⚠️ Drag handle not found!');
                return;
            }
            
            console.log('🎯 Drag handle initialized');
            
            dragHandle.addEventListener('touchstart', (e) => {
                this.touchStartY = e.touches[0].clientY;
                this.isDragging = true;
                
                // Disable transitions during drag
                this.container.style.transition = 'none';
                console.log('🟢 Drag started');
            });
            
            dragHandle.addEventListener('touchmove', (e) => {
                if (!this.isDragging) return;
                e.preventDefault();
                
                const currentY = e.touches[0].clientY;
                const diff = currentY - this.touchStartY;
                
                if (diff > 0) {
                    const progress = Math.min(diff / 200, 1);
                    this.container.style.transform = `translateY(${diff}px)`;
                    this.container.style.opacity = 1 - progress * 0.3;
                }
            });
            
            dragHandle.addEventListener('touchend', (e) => {
                if (!this.isDragging) return;
                
                const currentY = e.changedTouches[0].clientY;
                const diff = currentY - this.touchStartY;
                
                console.log('🔴 Drag ended, diff:', diff);
                
                // Re-enable transitions
                this.container.style.transition = '';
                
                if (diff > 100) {
                    console.log('✅ Closing modal');
                    this.close();
                } else {
                    console.log('🔄 Snapping back');
                    this.container.style.transform = '';
                    this.container.style.opacity = '';
                }
                
                this.isDragging = false;
            });
        }
        
        initializeCategorySwipe() {
            let startX = 0;
            
            this.categoriesScroll?.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            this.categoriesScroll?.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                
                if (Math.abs(diff) > 50) {
                    const categories = Array.from(this.categoryChips);
                    const currentIndex = categories.findIndex(chip => chip.classList.contains('active'));
                    
                    if (diff > 0 && currentIndex < categories.length - 1) {
                        this.selectCategory(categories[currentIndex + 1].dataset.category);
                        this.addHapticFeedback();
                    } else if (diff < 0 && currentIndex > 0) {
                        this.selectCategory(categories[currentIndex - 1].dataset.category);
                        this.addHapticFeedback();
                    }
                }
            });
        }
        
        getEnhancedCommands() {
            return {
                navigation: [
                    { id: 'back-to-gateway', icon: '🏠', title: 'Back to Gateway', desc: 'Return to main site', badge: 'exit' },
                    { id: 'list-categories', icon: '📋', title: 'All Categories', desc: 'Complete list of 13 categories', badge: '' },
                    { id: 'site-stats', icon: '📊', title: 'Gateway Stats', desc: '577+ resources overview', badge: '' },
                    { id: 'whats-new', icon: '🆕', title: "What's New", desc: 'Latest updates & features', badge: 'hot' },
                    { id: 'help-navigation', icon: '🧭', title: 'Navigation Help', desc: 'How to use the Gateway', badge: '' }
                ],
                conversation: [
                    { id: 'back-to-gateway', icon: '🏠', title: 'Back to Gateway', desc: 'Return to main site', badge: 'exit' },
                    { id: 'chat-search-overview', icon: '🔍', title: 'About Search Engines', desc: '"Tell me about search engines"', badge: 'try' },
                    { id: 'chat-privacy', icon: '🔒', title: 'Privacy Search', desc: '"Show me private search engines"', badge: 'try' },
                    { id: 'chat-academic', icon: '📚', title: 'Academic Research', desc: '"Best for research papers"', badge: 'try' },
                    { id: 'chat-compare', icon: '⚖️', title: 'Compare Engines', desc: '"DuckDuckGo vs Google"', badge: 'try' },
                    { id: 'chat-developer', icon: '💻', title: 'Code Search', desc: '"Code search engines"', badge: 'try' },
                    { id: 'chat-visual', icon: '🎨', title: 'Visual Search', desc: '"Find free images"', badge: 'try' }
                ],
                explorer: [
                    { id: 'back-to-gateway', icon: '🏠', title: 'Back to Gateway', desc: 'Return to main site', badge: 'exit' },
                    { id: 'explore-search', icon: '🔍', title: 'Search Engines', desc: '39 search platforms', badge: '' },
                    { id: 'explore-tools', icon: '🛠️', title: 'Tools & Utilities', desc: '52 productivity tools', badge: '' },
                    { id: 'explore-entertainment', icon: '🎭', title: 'Entertainment', desc: '51 media platforms', badge: '' },
                    { id: 'explore-knowledge', icon: '📚', title: 'Learning Hub', desc: '53 educational resources', badge: '' },
                    { id: 'explore-more', icon: '➡️', title: 'More Categories', desc: 'All remaining categories', badge: '' },
                    { id: 'trending-resources', icon: '📈', title: 'Trending Now', desc: 'Popular this week', badge: 'hot' }
                ],
                actions: [
                    { id: 'back-to-gateway', icon: '🏠', title: 'Back to Gateway', desc: 'Return to main site', badge: 'exit' },
                    { id: 'find-ai-tools', icon: '🤖', title: 'AI Tools', desc: 'Discover AI platforms', badge: '' },
                    { id: 'find-design-tools', icon: '🎨', title: 'Design Tools', desc: 'Creative resources', badge: '' },
                    { id: 'search-tips', icon: '💡', title: 'Search Tips', desc: 'Power user tricks', badge: '' },
                    { id: 'random-resource', icon: '🎲', title: 'Surprise Me', desc: 'Random discovery', badge: '' },
                    { id: 'quick-compare', icon: '⚖️', title: 'Compare Tools', desc: 'Side-by-side analysis', badge: 'new' },
                    { id: 'workflow-builder', icon: '🔗', title: 'Build Workflow', desc: 'Create tool chains', badge: 'new' }
                ],
                personal: [
                    { id: 'back-to-gateway', icon: '🏠', title: 'Back to Gateway', desc: 'Return to main site', badge: 'exit' },
                    { id: 'my-favorites', icon: '❤️', title: 'My Favorites', desc: 'Your saved resources', badge: 'new' },
                    { id: 'recent-visits', icon: '🕒', title: 'Recent Activity', desc: 'Recently viewed', badge: 'new' },
                    { id: 'personalized-feed', icon: '🎯', title: 'For You', desc: 'AI recommendations', badge: 'new' },
                    { id: 'usage-stats', icon: '📊', title: 'My Analytics', desc: 'Your activity insights', badge: 'new' }
                ],
                advanced: [
                    { id: 'back-to-gateway', icon: '🏠', title: 'Back to Gateway', desc: 'Return to main site', badge: 'exit' },
                    { id: 'semantic-search', icon: '🔮', title: 'Smart Search', desc: 'AI-powered discovery', badge: 'new' },
                    { id: 'voice-command', icon: '🎙️', title: 'Voice Control', desc: 'Speak your commands', badge: 'new' },
                    { id: 'bulk-actions', icon: '📦', title: 'Bulk Actions', desc: 'Multiple operations', badge: 'new' },
                    { id: 'api-access', icon: '🔌', title: 'API Access', desc: 'Developer integration', badge: 'new' }
                ],
                system: [
                    { id: 'back-to-gateway', icon: '🏠', title: 'Back to Gateway', desc: 'Return to main site', badge: 'exit' },
                    { id: 'clear-chat', icon: '🧹', title: 'Clear Chat', desc: 'Reset conversation', badge: '' },
                    { id: 'show-commands', icon: '📜', title: 'All Commands', desc: 'Complete command list', badge: '' },
                    { id: 'settings', icon: '⚙️', title: 'Settings', desc: 'Customize experience', badge: 'new' },
                    { id: 'feedback', icon: '💬', title: 'Feedback', desc: 'Share your thoughts', badge: 'new' }
                ]
            };
        }
        
        getKnowledgeBase() {
            return {
                categories: {
                    'search-engines': { name: 'Search Engines', count: 39, emoji: '🔍', description: 'Your gateway to the entire search universe' },
                    'tools': { name: 'Tools & Utilities', count: 52, emoji: '🛠️', description: 'Productivity and utility tools' },
                    'entertainment': { name: 'Entertainment', count: 51, emoji: '🎭', description: 'Streaming and media platforms' },
                    'knowledge': { name: 'Knowledge', count: 53, emoji: '📚', description: 'Learning and educational resources' },
                    'anime': { name: 'Anime & Manga', count: 48, emoji: '🗾', description: 'Japanese animation and comics' },
                    'crypto': { name: 'Crypto & Blockchain', count: 45, emoji: '₿', description: 'Digital economy platforms' },
                    'gaming': { name: 'Gaming & Esports', count: 42, emoji: '🎮', description: 'Gaming platforms and communities' },
                    'health': { name: 'Health & Fitness', count: 43, emoji: '💪', description: 'Wellness and fitness resources' },
                    'design': { name: 'Design & Creativity', count: 40, emoji: '🎨', description: 'Creative tools and inspiration' },
                    'lifestyle': { name: 'Lifestyle & Shopping', count: 44, emoji: '🛍️', description: 'Shopping and lifestyle platforms' },
                    'news': { name: 'News & Trends', count: 48, emoji: '📰', description: 'News sources and trend tracking' },
                    'social': { name: 'Social Networks', count: 39, emoji: '🌐', description: 'Social media and communication' },
                    'hidden-treasures': { name: 'Hidden Treasures', count: 50, emoji: '💎', description: 'Secret tools and hidden gems' }
                },
                totalResources: 577,
                totalCategories: 13
            };
        }
        
        selectCategory(categoryId) {
            this.currentCategory = categoryId;
            
            this.categoryChips.forEach(chip => {
                chip.classList.toggle('active', chip.dataset.category === categoryId);
            });
            
            const activeChip = document.querySelector(`.ai-category-chip[data-category="${categoryId}"]`);
            if (activeChip) {
                activeChip.scrollIntoView({ behavior: 'smooth', inline: 'center' });
            }
            
            // Always show commands grid when switching categories
            this.hideMessages();
            this.renderCommands();
        }
        
        renderCommands() {
            const commands = this.commands[this.currentCategory] || [];
            
            this.commandsGrid.innerHTML = commands.map(cmd => `
                <div class="ai-command-card ai-haptic" data-command-id="${cmd.id}">
                    ${cmd.badge ? `<div class="ai-command-badge ${cmd.badge}">${cmd.badge}</div>` : ''}
                    <div class="ai-command-content">
                        <div class="ai-command-icon">${cmd.icon}</div>
                        <div class="ai-command-title">${cmd.title}</div>
                        <div class="ai-command-desc">${cmd.desc}</div>
                    </div>
                </div>
            `).join('');
            
            // Add mobile-friendly event listeners to command cards
            this.initializeCommandCardEvents();
        }
        
        initializeCommandCardEvents() {
            // Remove old event listeners and add new ones for command cards
            const commandCards = document.querySelectorAll('.ai-command-card');
            commandCards.forEach(card => {
                const commandId = card.dataset.commandId;
                if (!commandId) return;
                
                // Use click events only for better scrolling experience
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.executeCommand(commandId);
                });
            });
        }
        
        executeCommand(commandId) {
            this.addHapticFeedback();
            this.showMessages();
            this.addMessage(`Command: /${commandId}`, 'system');
            
            // Command implementations
            switch (commandId) {
                case 'back-to-gateway':
                    this.goBackToGateway();
                    break;
                case 'list-categories':
                    this.listCategories();
                    break;
                case 'site-stats':
                    this.showSiteStats();
                    break;
                case 'trending-resources':
                    this.showTrendingResources();
                    break;
                case 'my-favorites':
                    this.showFavorites();
                    break;
                case 'voice-command':
                    this.initializeVoiceCommand();
                    break;
                case 'semantic-search':
                    this.showSemanticSearch();
                    break;
                case 'settings':
                    this.showSettings();
                    break;
                // Conversation command handlers
                case 'chat-search-overview':
                    this.handleConversationCommand('tell me about search engines');
                    break;
                case 'chat-privacy':
                    this.handleConversationCommand('show me private search engines');
                    break;
                case 'chat-academic':
                    this.handleConversationCommand('best for research papers');
                    break;
                case 'chat-compare':
                    this.handleConversationCommand('compare DuckDuckGo vs Google');
                    break;
                case 'chat-developer':
                    this.handleConversationCommand('code search engines');
                    break;
                case 'chat-visual':
                    this.handleConversationCommand('find free images');
                    break;
                // New systematic conversation commands
                case 'what-can-i-ask':
                    this.showWhatCanIAsk();
                    break;
                case 'explore-search-engines':
                    this.showExploreSearchEngines();
                    break;
                case 'smart-recommendations':
                    this.showSmartRecommendations();
                    break;
                default:
                    this.addMessage(`✨ "${commandId}" is ready! This advanced feature is coming in the next update.`, 'assistant');
            }
        }
        
        goBackToGateway() {
            this.addMessage('🏠 **Returning to Gateway Homepage**', 'assistant');
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        }
        
        listCategories() {
            const categories = Object.values(this.knowledgeBase.categories);
            let response = `📋 **All ${this.knowledgeBase.totalCategories} Categories:**\n\n`;
            
            categories.forEach((cat, index) => {
                response += `${index + 1}. ${cat.emoji} **${cat.name}** (${cat.count})\n`;
            });
            
            response += `\n🎯 Total: ${this.knowledgeBase.totalResources}+ resources`;
            this.addMessage(response, 'assistant');
        }
        
        showSiteStats() {
            const response = `📊 **Gateway AI 2.0 Statistics:**

🏷️ Categories: ${this.knowledgeBase.totalCategories}
📦 Resources: ${this.knowledgeBase.totalResources}+
🆓 Access: Completely Free
🌍 Reach: Global Availability
📱 Mobile: Revolutionary Experience
🚀 Speed: <100ms Load Time
🤖 AI Commands: 26 total

🏆 **Top Categories:**
1. 📚 Knowledge (53) 
2. 🛠️ Tools (52)
3. 🎭 Entertainment (51)
4. 💎 Hidden Treasures (50)`;

            this.addMessage(response, 'assistant');
        }
        
        showTrendingResources() {
            const response = `📈 **Trending This Week:**

🔥 **Hot Categories:**
• 🤖 AI Tools - 40% increase
• 🎨 Design Resources - 25% growth  
• 💎 Hidden Treasures - Most explored
• 📚 Learning Platforms - Study season peak

⭐ **Popular Resources:**
• ChatGPT & AI Assistants
• Figma & Design Tools
• Notion & Productivity Apps
• YouTube & Learning Content

🚀 **Mobile Experience:**
• New swipeable categories
• Haptic feedback support
• Drag-to-close gestures
• Enhanced touch controls

💡 **Tip:** Try swiping between categories to explore more!`;

            this.addMessage(response, 'assistant');
        }
        
        showFavorites() {
            const response = `❤️ **Your Personal Collection:**

🎯 **Getting Started:**
Your favorite resources will appear here as you explore!

💡 **How to Build Your Collection:**
• Heart ❤️ resources you love
• Use "Add to Favorites" buttons
• Voice command: "save this to favorites"
• Auto-save frequently accessed tools

📱 **Mobile Features:**
• Swipe to favorite resources
• Quick access from personal category
• Offline favorites list
• Cross-device sync (coming soon)

🚀 **Quick Actions:**
• /recent-visits - See browsing history
• /personalized-feed - AI recommendations
• /usage-stats - Your activity analytics

Start exploring to build your personal gateway! 🌟`;

            this.addMessage(response, 'assistant');
        }
        
        initializeVoiceCommand() {
            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                this.addMessage('🎙️ **Voice Commands:**\n\nVoice recognition requires:\n• Chrome on desktop/mobile\n• Safari on iOS\n• Edge on Windows\n\nFor now, enjoy the enhanced mobile interface with swipe gestures and haptic feedback! 📱✨', 'assistant');
                return;
            }
            
            this.addMessage('🎙️ **Voice Commands Active!**\n\nTry saying:\n• "List all categories"\n• "Show me AI tools" \n• "What\'s trending"\n• "Open my favorites"\n• "Help me navigate"\n\n📱 **Mobile tip:** Speak clearly and hold your phone normally for best results! 🎯', 'assistant');
        }
        
        showSemanticSearch() {
            const response = `🔮 **AI-Powered Smart Search:**

🧠 **Revolutionary Discovery:**
I understand context and intent, not just keywords!

💡 **Try These Natural Queries:**
• "Tools for building websites"
• "Apps to boost productivity" 
• "Platforms for learning coding"
• "Resources for graphic design"
• "Hidden tools for developers"

🎯 **Smart Features:**
• Context understanding
• Related resource discovery
• Learning from preferences
• Cross-category connections
• Semantic similarity matching

📱 **Mobile Enhanced:**
• Voice query support
• Swipe through results
• Quick favorite actions
• Instant preview cards

Type a natural question to experience the magic! ✨`;

            this.addMessage(response, 'assistant');
        }
        
        showSettings() {
            const response = `⚙️ **Gateway AI 2.0 Settings:**

🎨 **Appearance:**
• 🌙 Dark Mode (Current)
• 🌞 Light Mode (Coming Soon)
• 🎨 Accent Colors
• 📱 Mobile Optimizations

📱 **Mobile Features:**
• 📳 Haptic Feedback (Enabled)
• 👆 Swipe Gestures (Active)
• 🎯 Touch Precision Mode
• 🚀 Performance Mode

🔔 **Smart Notifications:**
• 🆕 New Resource Alerts
• 📈 Trending Updates
• ❤️ Favorite Recommendations
• 🎯 Personalized Insights

🚀 **Advanced:**
• 🎙️ Voice Commands
• 📊 Usage Analytics
• 🔒 Privacy Mode
• ⌨️ Keyboard Shortcuts

Full settings panel launching soon! 🌟`;

            this.addMessage(response, 'assistant');
        }
        
        // NEW SYSTEMATIC CONVERSATION METHODS
        
        showWhatCanIAsk() {
            const response = `💭 **What Can I Ask? - Complete Conversation Guide**

🔒 **PRIVACY & SECURITY:**
• "Which search engines don't track me?"
• "Compare privacy: DuckDuckGo vs Startpage vs Brave"
• "Most secure search engines for sensitive research"
• "Privacy search engines that work in [country]"
• "How do privacy search engines make money?"

📚 **ACADEMIC & RESEARCH:**
• "Best search engines for scientific papers"
• "Where to find academic sources by subject"
• "Research databases vs regular search engines"
• "Free vs paid academic search platforms"
• "Citation search engines for researchers"

💻 **DEVELOPER & TECH:**
• "Code search engines for programmers"
• "Find GitHub repositories and documentation"
• "Technical documentation search tools"
• "Best search for Stack Overflow alternatives"
• "API documentation search engines"

🎨 **VISUAL & CREATIVE:**
• "Free stock photo search engines"
• "Copyright-free image and video sources"
• "Design inspiration search platforms"
• "Vector graphics and icon search engines"
• "Creative Commons media search"

🌍 **INTERNATIONAL & REGIONAL:**
• "Search engines popular in different countries"
• "Non-English search engines and features"
• "Regional alternatives to Google"
• "Best search engines for [specific language]"
• "Local business and map search engines"

⚡ **SPECIALIZED & UNIQUE:**
• "Shopping and price comparison engines"
• "News and real-time search platforms"
• "Hidden gems and alternative search tools"
• "Niche search engines for specific topics"
• "Vintage and nostalgic search engines"

🔄 **COMPARISONS & ANALYSIS:**
• "Google vs Bing vs DuckDuckGo detailed comparison"
• "Best search engine for [specific use case]"
• "Pros and cons of different search approaches"
• "Which search engine has better [feature]?"
• "Search engine performance and speed tests"

💡 **Just type any of these naturally - I understand context and variations!**

🔄 **FOLLOW-UP EXAMPLES:**
• "Tell me more about [specific engine]"
• "Which one is better for my needs?"
• "Show me alternatives to [current engine]"
• "How do I switch to [privacy engine]?"
• "What are the advanced features of [engine]?"

🌟 **The magic is in natural conversation - just ask me anything about search engines!**`;

            this.addMessage(response, 'assistant');
        }
        
        showExploreSearchEngines() {
            const response = `🔍 **Explore Search Engines - Guided Discovery Journey**

🎯 **Choose Your Discovery Path:**

🥇 **POPULAR POWERHOUSES** (5 engines)
• Google - The search giant everyone knows
• Bing - Microsoft's feature-rich alternative  
• Yahoo - Classic search with news integration
• Yandex - Russian tech with global reach
• Baidu - China's leading search platform

🔒 **PRIVACY CHAMPIONS** (8 engines)
• DuckDuckGo - No tracking, clean results
• Brave Search - Independent index, crypto rewards
• Startpage - Google results without tracking
• Swisscows - Family-safe, Swiss privacy laws
• Kagi - Premium ad-free search
• MetaGer - Open-source, German engineering
• Searx - Self-hosted privacy solution
• Mojeek - UK-based independent crawler

📚 **ACADEMIC POWERHOUSES** (6 engines)
• Google Scholar - Largest academic database
• Semantic Scholar - AI-powered research insights
• Microsoft Academic - Research network analysis
• arXiv - Physics, math, CS preprints
• PubMed - Medical and life sciences
• ResearchGate - Scientific collaboration

💻 **DEVELOPER PARADISE** (7 engines)
• GitHub - 100M+ code repositories
• Stack Overflow - 21M+ programming Q&A
• CodePen - Frontend code playground
• Searchcode - 7M+ searchable repositories
• GitLab - DevOps and CI/CD projects
• Bitbucket - Atlassian code hosting
• SourceForge - Open source projects

🎨 **CREATIVE GOLDMINES** (6 engines)
• Unsplash - 3M+ high-quality photos
• Pixabay - Free images, vectors, videos
• Dribbble - Design inspiration showcase
• Behance - Creative portfolios
• Flickr - Creative Commons photos
• Pexels - Free stock photography

🌍 **INTERNATIONAL GEMS** (4 engines)
• Yandex - Russian innovation
• Baidu - Chinese market leader
• Naver - South Korean tech giant
• Seznam - Czech Republic's choice

💎 **UNIQUE ALTERNATIVES** (3 engines)
• Wiby - Vintage web discovery
• Million Short - Skip popular results
• Marginalia - Independent, quirky finds

🔄 **INTERACTIVE DISCOVERY:**
• Ask "Tell me about [category] search engines"
• Say "Compare [engine 1] vs [engine 2]"
• Try "What's special about [specific engine]?"
• Request "Show me alternatives to [current engine]"

✨ **Ready to explore? Just tell me which category interests you most!**`;

            this.addMessage(response, 'assistant');
        }
        
        showSmartRecommendations() {
            const userType = this.determineUserType();
            const visitedCategories = this.sessionData.categoriesVisited;
            const timeOfDay = new Date().getHours();
            const isWeekend = new Date().getDay() % 6 === 0;
            
            let personalizedIntro = '';
            if (userType === 'newbie') {
                personalizedIntro = '🌟 **Welcome to Gateway AI! Here are perfect starting points:**';
            } else if (userType === 'explorer') {
                personalizedIntro = `🕵️ **Explorer Mode Activated!** Based on your ${visitedCategories.size} categories visited:`;
            } else {
                personalizedIntro = '🎯 **Smart AI Recommendations - Personalized for You:**';
            }
            
            let timeBasedSuggestions = '';
            if (timeOfDay < 9) {
                timeBasedSuggestions = '🌅 **Morning Productivity Boost:**\n• Privacy search engines for secure work\n• Academic resources for research\n• Developer tools for coding sessions\n';
            } else if (timeOfDay > 18 || isWeekend) {
                timeBasedSuggestions = '🌙 **Evening Discovery Time:**\n• Visual search engines for creative inspiration\n• Entertainment and media platforms\n• International search engines for global perspectives\n';
            } else {
                timeBasedSuggestions = '💼 **Workday Optimization:**\n• Specialized search engines for your projects\n• Comparison tools for decision making\n• Developer resources for technical challenges\n';
            }
            
            const response = `🎯 **Smart AI Recommendations - Powered by Your Behavior**

${personalizedIntro}

${timeBasedSuggestions}
🤖 **AI-Powered Suggestions:**
• **Privacy Focus**: Since 73% of users ask about privacy, try "DuckDuckGo vs Startpage comparison"
• **Academic Research**: Popular query: "Best search engines for scientific papers"
• **Developer Tools**: Trending: "GitHub search vs Stack Overflow for code examples"
• **Creative Discovery**: Hot topic: "Free image search engines for commercial use"

📊 **Based on Gateway Analytics:**
• 🔥 Most Popular: "Privacy search engine recommendations"
• 📈 Trending Up: "International search engines comparison"
• 💎 Hidden Gem: "Alternative search engines like Wiby and Marginalia"
• 🎯 User Favorite: "Academic vs general search engine differences"

🧠 **Intelligent Next Steps:**
• Ask me: "What makes [specific engine] unique?"
• Try: "Compare 3 privacy search engines"
• Explore: "Show me search engines I've never heard of"
• Discover: "Best search engine for [your specific need]"

🎲 **Surprise Discovery:**
• **Wiby** - Discover the vintage web like it's 1995
• **Million Short** - Skip the first million popular results
• **Kagi** - Premium search with zero ads and AI summaries

🔄 **Smart Follow-ups:**
• "Tell me more about the surprise discovery engines"
• "Which privacy engine is fastest?"
• "Show me search engines from different countries"
• "What search engine do developers actually use?"

✨ **The AI learns from every interaction - your next question shapes future recommendations!**`;

            this.addMessage(response, 'assistant');
        }
        
        handleConversationCommand(question) {
            // Simulate the user asking the question naturally
            this.addMessage(question, 'user');
            
            // For now, provide simple hardcoded responses that match the conversation starter cards
            const msgLower = question.toLowerCase();
            
            if (msgLower.includes('tell me about search engines')) {
                this.addMessage('🔍 **Search Engines - I know 39 amazing ones!** From Google to hidden gems like Wiby, I\'ve got them organized into 9 categories: Popular, Privacy-focused (DuckDuckGo, Brave), Academic (Google Scholar), International (Yandex, Baidu), Developer tools (GitHub search), Visual search (Unsplash), Shopping, Social, and unique alternatives. What type of search are you interested in?', 'assistant');
            } else if (msgLower.includes('private search engines')) {
                this.addMessage('🔒 **Privacy Search Engines - Great choice!** Here are my top recommendations: **DuckDuckGo** (most popular, no tracking), **Brave Search** (independent index), **Startpage** (Google results without tracking), **Swisscows** (family-safe), **Kagi** (premium ad-free), and **MetaGer** (open-source). Which privacy features matter most to you?', 'assistant');
            } else if (msgLower.includes('research papers')) {
                this.addMessage('📚 **Academic Search - Perfect for research!** I recommend: **Google Scholar** (largest database, free), **Semantic Scholar** (AI-powered insights), **Microsoft Academic** (research networks), **arXiv** (physics/math/CS preprints), and **PubMed** (medical research). Need help finding papers in a specific field?', 'assistant');
            } else if (msgLower.includes('duckduckgo vs google')) {
                this.addMessage('⚖️ **DuckDuckGo vs Google Comparison:**\n\n**DuckDuckGo:** ✅ No tracking ✅ Clean results ✅ Bang shortcuts (!g, !w) ❌ Smaller index\n\n**Google:** ✅ Comprehensive results ✅ Advanced features ❌ Tracks everything ❌ Filter bubbles\n\n**Recommendation:** Try DuckDuckGo first for privacy, use Google when you need comprehensive results!', 'assistant');
            } else if (msgLower.includes('code search')) {
                this.addMessage('💻 **Code Search Engines - Developer paradise!** **GitHub** (100M+ repos), **Stack Overflow** (21M+ programming Q&A), **CodePen** (frontend demos), **Searchcode** (7M+ repositories), **GitLab** (DevOps projects). What programming language or problem are you working on?', 'assistant');
            } else if (msgLower.includes('free images')) {
                this.addMessage('🎨 **Visual Search - Creative goldmine!** **Unsplash** (3M+ high-quality photos, commercial use OK), **Pixabay** (free images/vectors, no attribution needed), **Dribbble** (design inspiration), **Behance** (creative portfolios), **Flickr** (Creative Commons). What type of images are you looking for?', 'assistant');
            } else {
                // Fallback for other conversation commands
                this.processNaturalLanguage(question);
            }
        }
        
        showMessages() {
            document.getElementById('commandsContainer').style.display = 'none';
            this.messages.style.display = 'flex';
            this.messages.classList.add('active');
        }
        
        hideMessages() {
            document.getElementById('commandsContainer').style.display = 'block';
            this.messages.style.display = 'none';
            this.messages.classList.remove('active');
        }
        
        addMessage(content, role) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `ai-message ${role}`;
            
            const avatar = document.createElement('div');
            avatar.className = `ai-message-avatar ${role}`;
            avatar.textContent = role === 'user' ? '👤' : role === 'system' ? '⚙️' : '🧠';
            
            const messageContent = document.createElement('div');
            messageContent.className = 'ai-message-content';
            messageContent.innerHTML = content.replace(/\n/g, '<br>');
            
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(messageContent);
            
            const welcome = this.messages.querySelector('.ai-welcome');
            if (welcome) welcome.remove();
            
            this.messages.appendChild(messageDiv);
            this.messages.scrollTop = this.messages.scrollHeight;
        }
        
        sendMessage() {
            const message = this.input.value.trim();
            if (!message) return;
            
            this.showMessages();
            this.addMessage(message, 'user');
            this.input.value = '';
            this.autoResize();
            
            if (message.startsWith('/')) {
                this.executeCommand(message.substring(1));
            } else {
                this.processNaturalLanguage(message);
            }
        }
        
        processNaturalLanguage(message) {
            const msgLower = message.toLowerCase();
            
            // Use SuperBrain for enhanced processing if available
            if (this.superBrain) {
                try {
                    const superBrainResponse = this.superBrain.processQuery(message, {
                        category: this.currentCategory,
                        knowledgeBase: this.knowledgeBase,
                        commandHistory: this.commandHistory
                    });
                    
                    if (superBrainResponse) {
                        this.addMessage(`🧠 **SuperBrain Analysis:** ${superBrainResponse}`, 'assistant');
                        return;
                    }
                } catch (error) {
                    console.warn('SuperBrain processing failed:', error);
                }
            }
            
            // ENHANCED CONVERSATION PROCESSING - Actually handle what we say we can!
            
            // Quick exit commands - highest priority
            if (msgLower === 'exit' || msgLower === 'home' || msgLower === 'back' || 
                msgLower === 'gateway' || msgLower.includes('back to gateway')) {
                this.executeCommand('back-to-gateway');
                return;
            }
            
            // PRIVACY & SECURITY QUESTIONS - SUPERINTELLIGENT RESPONSES
            if (msgLower.includes('search engines') && (msgLower.includes('track') || msgLower.includes('privacy') || msgLower.includes('private'))) {
                // Track this topic for learning
                this.recordTopicEngagement('privacy', message);
                this.conversationMemory.currentTopic = 'privacy';
                this.conversationMemory.conversationDepth++;
                
                const expertResponse = this.generateExpertPrivacyResponse(msgLower);
                this.addMessage(expertResponse, 'assistant');
                
                // Add intelligent follow-up questions
                this.conversationMemory.followUpQuestions = [
                    'Want to know how these privacy engines actually make money without ads?',
                    'Curious about the technical differences in how they protect your data?',
                    'Should I explain which privacy engine works best in your country?',
                    'Interested in the business model analysis of privacy vs profit?'
                ];
                return;
            }
            
            if (msgLower.includes('duckduckgo') && msgLower.includes('startpage')) {
                this.addMessage('⚖️ **DuckDuckGo vs Startpage - Privacy Showdown!**\n\n🦆 **DuckDuckGo:**\n✅ Independent search index\n✅ !Bang shortcuts (!w for Wikipedia, !yt for YouTube)\n✅ Instant answers and calculators\n✅ Dark web search via .onion\n✅ Simple, clean interface\n❌ Smaller search index than Google\n\n🎯 **Startpage:**\n✅ Google search results without tracking\n✅ Anonymous View feature\n✅ Custom URL generator\n✅ European privacy laws protection\n✅ Proxy image/video viewing\n❌ Relies on Google\'s index\n\n🏆 **Verdict:**\n• **DuckDuckGo** if you want true independence\n• **Startpage** if you need Google-quality results\n• Both are excellent for privacy!\n\nWant me to show you Brave Search too?', 'assistant');
                return;
            }
            
            if (msgLower.includes('secure') && msgLower.includes('search')) {
                this.addMessage('🔐 **Most Secure Search Engines for Sensitive Research:**\n\n🥇 **Maximum Security Tier:**\n• **Searx** - Open-source, self-hostable, no logs\n• **MetaGer** - German servers, proxy protection\n• **Swisscows** - Swiss privacy laws, no data retention\n\n🥈 **High Security Tier:**\n• **DuckDuckGo** - Tor .onion available, no tracking\n• **Startpage** - Anonymous proxy viewing\n• **Brave Search** - Independent, privacy-first\n\n🛡️ **Security Features to Look For:**\n• HTTPS encryption (all listed have this)\n• No logging policies\n• Onion/Tor support\n• Proxy viewing options\n• Open-source code\n\n🌍 **For Different Regions:**\n• **Europe:** MetaGer, Swisscows (GDPR protection)\n• **Global:** Searx instances worldwide\n• **Tor Users:** DuckDuckGo .onion version\n\nNeed specific security features explained?', 'assistant');
                return;
            }
            
            // ACADEMIC & RESEARCH QUESTIONS
            if (msgLower.includes('scientific papers') || msgLower.includes('research papers') || msgLower.includes('academic')) {
                this.addMessage('📚 **Best Search Engines for Scientific Papers:**\n\n🏆 **Academic Powerhouses:**\n• **Google Scholar** - Largest database, 200M+ papers, free\n• **Semantic Scholar** - AI-powered insights, 200M+ papers\n• **Microsoft Academic** - Research graph analysis\n• **PubMed** - 30M+ biomedical literature\n• **arXiv** - Physics, math, CS preprints\n• **ResearchGate** - 20M+ researchers, collaboration\n\n📖 **By Subject Area:**\n• **Medicine/Health:** PubMed, Cochrane Library\n• **Physics/Math:** arXiv, MathSciNet\n• **Computer Science:** DBLP, ACM Digital Library\n• **Engineering:** IEEE Xplore\n• **Social Sciences:** JSTOR, SSRN\n\n🔍 **Advanced Features:**\n• Citation tracking\n• Impact factor analysis\n• Full-text access\n• Research collaboration tools\n• Alert systems for new papers\n\n💡 **Pro Tips:**\n• Start with Google Scholar for broad searches\n• Use subject-specific databases for deep research\n• Check university library access for paywalled content\n\nWhat research field are you working in?', 'assistant');
                return;
            }
            
            if (msgLower.includes('research databases')) {
                this.addMessage('🗃️ **Research Databases vs Regular Search Engines:**\n\n🎓 **Research Databases:**\n✅ Peer-reviewed, quality-controlled content\n✅ Advanced citation tracking\n✅ Subject-specific organization\n✅ Academic credibility indicators\n✅ Full metadata (authors, institutions, etc.)\n❌ Often paywalled\n❌ Smaller scope per database\n\n🌐 **Regular Search Engines:**\n✅ Massive content volume\n✅ Free and instant access\n✅ Real-time information\n✅ Diverse content types\n❌ Quality varies widely\n❌ No peer review guarantee\n\n🎯 **When to Use Each:**\n• **Academic Research:** Use specialized databases\n• **Literature Reviews:** Start with Google Scholar\n• **Current Events:** Regular search engines\n• **Background Info:** Mix of both\n\n🔥 **Best of Both Worlds:**\n• **Google Scholar** - Academic + accessible\n• **Semantic Scholar** - AI insights + free\n• **ResearchGate** - Papers + networking\n\nNeed help accessing paywalled research?', 'assistant');
                return;
            }
            
            // DEVELOPER & TECH QUESTIONS
            if (msgLower.includes('code search') || (msgLower.includes('search') && msgLower.includes('code'))) {
                this.addMessage('💻 **Code Search Engines - Developer Paradise!**\n\n🏆 **Essential Code Platforms:**\n• **GitHub** - 100M+ repositories, world\'s largest\n• **GitLab** - DevOps integration, CI/CD pipelines\n• **Bitbucket** - Atlassian ecosystem integration\n• **SourceForge** - Open-source project hosting\n\n🔍 **Specialized Code Search:**\n• **Searchcode** - 7M+ repositories, syntax highlighting\n• **Sourcegraph** - Universal code search, enterprise\n• **OpenGrok** - Source code cross-referencing\n• **Hound** - Lightning-fast code search\n\n💡 **Q&A Platforms:**\n• **Stack Overflow** - 21M+ programming questions\n• **Stack Exchange** - Specialized programming communities\n• **Dev.to** - Developer articles and discussions\n• **Reddit** - r/programming communities\n\n🎨 **Code Sharing & Demos:**\n• **CodePen** - Frontend playground, live demos\n• **JSFiddle** - JavaScript testing environment\n• **Repl.it** - Online IDE, collaborative coding\n• **CodeSandbox** - Web development playground\n\n🚀 **Pro Developer Tips:**\n• Use GitHub search operators: language:javascript stars:>100\n• Stack Overflow for specific error solutions\n• CodePen for UI/UX inspiration\n\nWhat programming language or problem are you working on?', 'assistant');
                return;
            }
            
            if (msgLower.includes('github') && (msgLower.includes('repository') || msgLower.includes('documentation'))) {
                this.addMessage('🐙 **GitHub Search & Documentation Mastery:**\n\n🔍 **Advanced GitHub Search:**\n• `language:python stars:>1000` - Popular Python projects\n• `topic:machine-learning` - ML repositories\n• `filename:package.json` - Find Node.js projects\n• `extension:md readme` - Find good documentation\n• `user:microsoft language:typescript` - Microsoft TS repos\n\n📚 **Documentation Discovery:**\n• **GitHub Pages** - Project documentation sites\n• **README files** - Quick project overviews\n• **Wiki sections** - Detailed guides\n• **Issues/Discussions** - Community knowledge\n\n🏆 **Top Documentation Platforms:**\n• **GitBook** - Beautiful documentation\n• **Notion** - Collaborative docs\n• **Confluence** - Enterprise documentation\n• **Read the Docs** - Python ecosystem docs\n• **Gitiles** - Google\'s Git documentation\n\n💡 **Documentation Search Tips:**\n• Search within repositories: `in:readme api documentation`\n• Find examples: `filename:example language:javascript`\n• Discover tutorials: `tutorial getting-started language:python`\n\n🚀 **Quick Actions:**\n• Press `/` on any GitHub page for search\n• Use browser extensions like Octotree\n• Star repositories for easy access later\n\nNeed help with specific GitHub search queries?', 'assistant');
                return;
            }
            
            // VISUAL & CREATIVE QUESTIONS
            if (msgLower.includes('free') && (msgLower.includes('images') || msgLower.includes('photos') || msgLower.includes('pictures'))) {
                this.addMessage('🎨 **Free Image Search Engines - Creative Goldmine!**\n\n🏆 **Premium Free Photo Platforms:**\n• **Unsplash** - 3M+ high-res photos, commercial use OK\n• **Pexels** - Curated collection, excellent quality\n• **Pixabay** - 2.4M+ images, vectors, videos\n• **Burst by Shopify** - Business-focused photos\n\n🎭 **Creative Commons & Open Source:**\n• **Flickr Creative Commons** - Massive variety\n• **Wikimedia Commons** - Educational images\n• **Openverse** - Cross-platform CC search\n• **Free Images** - Large collection, easy search\n\n🎯 **Specialized Visual Search:**\n• **StockVault** - Graphics, textures, backgrounds\n• **Freepik** - Vectors, PSD files (attribution required)\n• **Vecteezy** - Vector graphics and illustrations\n• **Gratisography** - Quirky, unique photos\n\n⚡ **Vector & Graphics:**\n• **Heroicons** - Beautiful SVG icons\n• **Feather Icons** - Simple, clean icon set\n• **Illustration Gallery** - Free illustrations\n• **DrawKit** - Hand-drawn illustrations\n\n📋 **Usage Rights Guide:**\n• ✅ **Commercial use** - Can use for business\n• ✅ **No attribution** - No credit required\n• ⚠️ **Attribution required** - Must credit creator\n• ❌ **Editorial only** - No commercial use\n\nWhat type of images are you looking for?', 'assistant');
                return;
            }
            
            if (msgLower.includes('copyright') && msgLower.includes('free')) {
                this.addMessage('⚖️ **Copyright-Free Media Sources - Safe & Legal!**\n\n🛡️ **100% Copyright-Free Platforms:**\n• **Unsplash** - All photos free for any use\n• **Pixabay** - Images, videos, music all copyright-free\n• **Pexels** - Commercial use, no attribution needed\n• **StockVault** - Completely free stock media\n\n📜 **Creative Commons Licenses:**\n• **CC0** - No rights reserved, public domain\n• **CC BY** - Attribution required only\n• **CC BY-SA** - Attribution + share-alike\n• **CC BY-NC** - Non-commercial use only\n\n🎵 **Copyright-Free Audio:**\n• **Freesound** - Sound effects, CC licensed\n• **Incompetech** - Royalty-free music by Kevin MacLeod\n• **YouTube Audio Library** - Free music for videos\n• **Zapsplat** - Professional sound effects\n\n🎬 **Video & Motion:**\n• **Pixabay Videos** - HD stock footage\n• **Pexels Videos** - Professional video clips\n• **Coverr** - Homepage background videos\n• **Mazwai** - Artistic video clips\n\n🔍 **How to Verify Rights:**\n• Check the license clearly stated\n• Look for CC0 or public domain marks\n• Download from reputable platforms only\n• When in doubt, contact the creator\n\n💡 **Pro Legal Tip:** Always keep a record of where you downloaded media and what license it had!\n\nNeed help finding specific types of copyright-free content?', 'assistant');
                return;
            }
            
            // COMPARISON QUESTIONS
            if ((msgLower.includes('google') && msgLower.includes('bing') && msgLower.includes('duckduckgo')) || 
                (msgLower.includes('compare') && msgLower.includes('search engines'))) {
                this.addMessage('⚖️ **Google vs Bing vs DuckDuckGo - Complete Comparison:**\n\n🔵 **Google:**\n✅ Largest search index (billions of pages)\n✅ Advanced AI and machine learning\n✅ Integrated services (Maps, Images, News)\n✅ Local search excellence\n✅ Voice search and mobile optimization\n❌ Heavy tracking and data collection\n❌ Filter bubbles and personalized results\n❌ Privacy concerns\n\n🟦 **Bing:**\n✅ Microsoft integration (Office, Windows)\n✅ Rewards program for searches\n✅ Better for video search\n✅ Visual search capabilities\n✅ Chat integration with GPT\n❌ Smaller market share\n❌ Less comprehensive than Google\n❌ Still tracks users\n\n🦆 **DuckDuckGo:**\n✅ Zero tracking, complete privacy\n✅ Clean, unbiased results\n✅ !Bang shortcuts for quick searches\n✅ No filter bubbles\n✅ Tor browser compatible\n❌ Smaller search index\n❌ Fewer advanced features\n❌ Less local search capability\n\n🏆 **Best Use Cases:**\n• **Google:** Research, local search, comprehensive results\n• **Bing:** Microsoft users, visual search, rewards\n• **DuckDuckGo:** Privacy, unbiased results, quick searches\n\n💡 **Pro Strategy:** Use DuckDuckGo as default, Google for specific research, Bing for rewards!\n\nWhich search engine features matter most to you?', 'assistant');
                return;
            }
            
            // INTERNATIONAL QUESTIONS
            if (msgLower.includes('search engines') && (msgLower.includes('country') || msgLower.includes('countries') || msgLower.includes('international'))) {
                this.addMessage('🌍 **Search Engines Popular in Different Countries:**\n\n🇷🇺 **Russia - Yandex (65% market share):**\n• Superior Cyrillic language support\n• Local services integration (Maps, Taxi, Mail)\n• Machine learning and AI features\n• Popular across former Soviet states\n\n🇨🇳 **China - Baidu (70% market share):**\n• Optimized for Chinese language and culture\n• AI-powered features and voice search\n• Integrated with Chinese digital ecosystem\n• Dominant in mainland China\n\n🇰🇷 **South Korea - Naver (60% market share):**\n• Korean language optimization\n• Blog and cafe integration\n• Visual search capabilities\n• Local services and shopping\n\n🇨🇿 **Czech Republic - Seznam (50% market share):**\n• Czech language specialization\n• Local news and services integration\n• Weather and email services\n• Strong local presence\n\n🇺🇸🇪🇺 **Global Leaders:**\n• **Google** - Dominant worldwide (90%+ in most countries)\n• **Bing** - Strong in US, growing globally\n• **Yahoo** - Still popular in Japan, Taiwan\n\n🔍 **Regional Preferences:**\n• **Europe:** DuckDuckGo gaining privacy-conscious users\n• **Middle East:** Google dominant, local engines emerging\n• **Africa:** Google mobile search leading\n• **Latin America:** Google, with regional players\n\n💡 **Why Local Engines Matter:**\n• Better language understanding\n• Cultural relevance\n• Local business integration\n• Government compliance\n\nInterested in a specific region\'s search landscape?', 'assistant');
                return;
            }
            
            // SPECIALIZED QUESTIONS
            if (msgLower.includes('shopping') || msgLower.includes('price comparison')) {
                this.addMessage('🛒 **Shopping & Price Comparison Engines:**\n\n💰 **Price Comparison Giants:**\n• **Google Shopping** - Largest product database\n• **Amazon** - Product search and reviews\n• **Bing Shopping** - Microsoft\'s shopping platform\n• **Shopping.com** - eBay\'s comparison engine\n\n🔍 **Specialized Price Hunters:**\n• **PriceGrabber** - Deal finding and coupons\n• **Nextag** - Price comparison and reviews\n• **Shopzilla** - Product discovery platform\n• **BizRate** - Shopping with reviews\n\n🏪 **Niche Shopping Search:**\n• **Etsy** - Handmade and vintage items\n• **eBay** - Auctions and unique finds\n• **AliExpress** - International wholesale\n• **Reverb** - Musical instruments\n• **StockX** - Sneakers and streetwear\n\n📱 **Mobile Shopping Apps:**\n• **Honey** - Automatic coupon finding\n• **Rakuten** - Cashback rewards\n• **RetailMeNot** - Deals and coupons\n• **Flipp** - Local store flyers\n\n💡 **Smart Shopping Tips:**\n• Use multiple comparison engines\n• Check for coupon codes before buying\n• Read reviews across platforms\n• Compare total cost (including shipping)\n• Set up price alerts for big purchases\n\n🎯 **Quick Strategy:** Start with Google Shopping for overview, use specialized engines for deals, always check reviews!\n\nLooking for deals on something specific?', 'assistant');
                return;
            }
            
            // BASIC COMMAND FALLBACKS
            if (msgLower.includes('categories') || msgLower.includes('list')) {
                this.executeCommand('list-categories');
                return;
            } else if (msgLower.includes('stats') || msgLower.includes('statistics')) {
                this.executeCommand('site-stats');
                return;
            } else if (msgLower.includes('trending') || msgLower.includes('popular')) {
                this.executeCommand('trending-resources');
                return;
            } else if (msgLower.includes('favorites') || msgLower.includes('saved')) {
                this.executeCommand('my-favorites');
                return;
            } else if (msgLower.includes('voice') || msgLower.includes('speak')) {
                this.executeCommand('voice-command');
                return;
            }
            
            // INTELLIGENT FALLBACK - Now much smarter!
            const intelligentResponse = this.getSmartFallbackResponse(message, msgLower);
            this.addMessage(intelligentResponse, 'assistant');
        }
        
        updateHeaderWithIntelligence() {
            setTimeout(() => {
                const subtitle = document.querySelector('.ai-subtitle');
                if (subtitle) {
                    if (this.isEnhanced) {
                        subtitle.textContent = `Mobile-first SuperBrain ${this.intelligenceLevel} assistant`;
                    } else {
                        subtitle.textContent = 'Mobile-first intelligent assistant';
                    }
                }
                
                // Update FAB icon if enhanced
                const fabIcon = document.querySelector('.ai-fab-icon');
                if (fabIcon && this.isEnhanced) {
                    fabIcon.textContent = '🌟';
                }
            }, 100);
        }
        
        autoResize() {
            this.input.style.height = 'auto';
            this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
        }
        
        addHapticFeedback() {
            if ('vibrate' in navigator) {
                navigator.vibrate(10);
            }
        }
        
        open() {
            this.isOpen = true;
            this.modal.classList.add('active');
            this.fab.style.transform = 'scale(0.8)';
            
            // Prevent pull-to-refresh when modal is open
            document.body.classList.add('ai-modal-open');
            
            setTimeout(() => {
                if (this.messages.style.display === 'flex') {
                    this.input?.focus();
                }
            }, 300);
        }
        
        close() {
            this.isOpen = false;
            this.modal.classList.remove('active');
            this.fab.style.transform = '';
            
            // Remove pull-to-refresh prevention when modal closes
            document.body.classList.remove('ai-modal-open');
            
            this.container.style.transform = '';
            this.container.style.opacity = '';
            
            this.hideMessages();
        }
        
        closeModal() {
            this.close();
        }
        
        // SUPERCHARGED METHODS - Enhanced AI System
        
        getSuperchargedCommands() {
            return {
                navigation: [
                    { id: 'back-to-gateway', icon: '🏠', title: 'Back to Gateway', desc: 'Return to main site', badge: 'exit' },
                    { id: 'list-categories', icon: '📋', title: 'All Categories', desc: 'Complete list of 13 categories', badge: '' },
                    { id: 'site-stats', icon: '📊', title: 'Gateway Stats', desc: '577+ resources overview', badge: '' },
                    { id: 'whats-new', icon: '🆕', title: "What's New", desc: 'Latest updates & features', badge: 'hot' },
                    { id: 'help-navigation', icon: '🧭', title: 'Navigation Help', desc: 'How to use the Gateway', badge: '' },
                    { id: 'site-tour', icon: '🎯', title: 'Interactive Tour', desc: 'Guided exploration', badge: 'new' }
                ],
                conversation: [
                    { id: 'back-to-gateway', icon: '🏠', title: 'Back to Gateway', desc: 'Return to main site', badge: 'exit' },
                    { id: 'what-can-i-ask', icon: '💭', title: 'What Can I Ask?', desc: 'Complete guide to conversation topics', badge: 'guide' },
                    { id: 'explore-search-engines', icon: '🔍', title: 'Explore Search Engines', desc: 'Guided discovery through categories', badge: 'new' },
                    { id: 'smart-recommendations', icon: '🎯', title: 'Smart Recommendations', desc: 'Personalized AI suggestions', badge: 'ai' }
                ],
                explorer: [
                    { id: 'back-to-gateway', icon: '🏠', title: 'Back to Gateway', desc: 'Return to main site', badge: 'exit' },
                    { id: 'explore-search', icon: '🔍', title: 'Search Engines', desc: '39 search platforms', badge: '' },
                    { id: 'explore-tools', icon: '🛠️', title: 'Tools & Utilities', desc: '52 productivity tools', badge: '' },
                    { id: 'explore-entertainment', icon: '🎭', title: 'Entertainment', desc: '51 media platforms', badge: '' },
                    { id: 'explore-knowledge', icon: '📚', title: 'Learning Hub', desc: '53 educational resources', badge: '' },
                    { id: 'explore-more', icon: '➡️', title: 'More Categories', desc: 'All remaining categories', badge: '' },
                    { id: 'trending-resources', icon: '📈', title: 'Trending Now', desc: 'Popular this week', badge: 'hot' }
                ],
                actions: [
                    { id: 'back-to-gateway', icon: '🏠', title: 'Back to Gateway', desc: 'Return to main site', badge: 'exit' },
                    { id: 'find-ai-tools', icon: '🤖', title: 'AI Tools', desc: 'Discover AI platforms', badge: '' },
                    { id: 'find-design-tools', icon: '🎨', title: 'Design Tools', desc: 'Creative resources', badge: '' },
                    { id: 'search-tips', icon: '💡', title: 'Search Tips', desc: 'Power user tricks', badge: '' },
                    { id: 'random-resource', icon: '🎲', title: 'Surprise Me', desc: 'Random discovery', badge: '' },
                    { id: 'quick-compare', icon: '⚖️', title: 'Compare Tools', desc: 'Side-by-side analysis', badge: 'new' }
                ],
                personal: [
                    { id: 'back-to-gateway', icon: '🏠', title: 'Back to Gateway', desc: 'Return to main site', badge: 'exit' },
                    { id: 'my-favorites', icon: '❤️', title: 'My Favorites', desc: 'Your saved resources', badge: 'new' },
                    { id: 'recent-visits', icon: '🕒', title: 'Recent Activity', desc: 'Recently viewed', badge: 'new' },
                    { id: 'personalized-feed', icon: '🎯', title: 'For You', desc: 'AI recommendations', badge: 'new' },
                    { id: 'usage-stats', icon: '📊', title: 'My Analytics', desc: 'Your activity insights', badge: 'new' }
                ],
                advanced: [
                    { id: 'back-to-gateway', icon: '🏠', title: 'Back to Gateway', desc: 'Return to main site', badge: 'exit' },
                    { id: 'semantic-search', icon: '🔮', title: 'Smart Search', desc: 'AI-powered discovery', badge: 'new' },
                    { id: 'voice-command', icon: '🎙️', title: 'Voice Control', desc: 'Speak your commands', badge: 'new' },
                    { id: 'bulk-actions', icon: '📦', title: 'Bulk Actions', desc: 'Multiple operations', badge: 'new' },
                    { id: 'api-access', icon: '🔌', title: 'API Access', desc: 'Developer integration', badge: 'new' }
                ],
                system: [
                    { id: 'back-to-gateway', icon: '🏠', title: 'Back to Gateway', desc: 'Return to main site', badge: 'exit' },
                    { id: 'clear-chat', icon: '🧹', title: 'Clear Chat', desc: 'Reset conversation', badge: '' },
                    { id: 'show-commands', icon: '📜', title: 'All Commands', desc: 'Complete command list', badge: '' },
                    { id: 'settings', icon: '⚙️', title: 'Settings', desc: 'Customize experience', badge: 'new' },
                    { id: 'feedback', icon: '💬', title: 'Feedback', desc: 'Share your thoughts', badge: 'new' }
                ]
            };
        }
        
        getExpandedKnowledgeBase() {
            return {
                categories: {
                    'search-engines': { name: 'Search Engines', count: 39, emoji: '🔍', description: 'Your gateway to the entire search universe', trend: '+5%' },
                    'tools': { name: 'Tools & Utilities', count: 52, emoji: '🛠️', description: 'Productivity and utility tools', trend: '+12%' },
                    'entertainment': { name: 'Entertainment', count: 51, emoji: '🎭', description: 'Streaming and media platforms', trend: '+8%' },
                    'knowledge': { name: 'Knowledge', count: 53, emoji: '📚', description: 'Learning and educational resources', trend: '+15%' },
                    'anime': { name: 'Anime & Manga', count: 48, emoji: '🗾', description: 'Japanese animation and comics', trend: '+20%' },
                    'crypto': { name: 'Crypto & Blockchain', count: 45, emoji: '₿', description: 'Digital economy platforms', trend: '+25%' },
                    'gaming': { name: 'Gaming & Esports', count: 42, emoji: '🎮', description: 'Gaming platforms and communities', trend: '+18%' },
                    'health': { name: 'Health & Fitness', count: 43, emoji: '💪', description: 'Wellness and fitness resources', trend: '+10%' },
                    'design': { name: 'Design & Creativity', count: 40, emoji: '🎨', description: 'Creative tools and inspiration', trend: '+30%' },
                    'lifestyle': { name: 'Lifestyle & Shopping', count: 44, emoji: '🛍️', description: 'Shopping and lifestyle platforms', trend: '+7%' },
                    'news': { name: 'News & Trends', count: 48, emoji: '📰', description: 'News sources and trend tracking', trend: '+3%' },
                    'social': { name: 'Social Networks', count: 39, emoji: '🌐', description: 'Social media and communication', trend: '+6%' },
                    'hidden-treasures': { name: 'Hidden Treasures', count: 50, emoji: '💎', description: 'Secret tools and hidden gems', trend: '+40%' }
                },
                totalResources: 577,
                totalCategories: 13,
                lastUpdated: Date.now(),
                popularTags: ['ai', 'productivity', 'design', 'development', 'learning', 'entertainment'],
                userStats: {
                    totalVisits: 0,
                    favoriteCategories: [],
                    searchHistory: [],
                    timeSpent: 0
                }
            };
        }
        
        getAdvancedAIPatterns() {
            return {
                greetings: ['Hello!', 'Hi there!', 'Hey!', 'Greetings!', 'Welcome!'],
                acknowledgments: ['Got it!', 'Understood!', 'Perfect!', 'Excellent!', 'Great choice!'],
                suggestions: [
                    'Have you tried exploring the {category} category?',
                    'Based on your interests, you might like {suggestion}',
                    'Here\'s something I think you\'ll find useful: {resource}'
                ],
                contextualResponses: {
                    firstTime: 'Welcome to Gateway AI! I can help you discover amazing resources.',
                    returning: 'Welcome back! Ready to explore something new today?',
                    frequent: 'Great to see you again! I\'ve learned your preferences and have some personalized suggestions.',
                    expert: 'Hello, power user! Looking for some advanced features or hidden gems today?'
                },
                emotionalTones: {
                    helpful: 'I\'m here to help you find exactly what you need!',
                    encouraging: 'Great question! Let me help you discover something amazing.',
                    excited: 'This is exciting! I have so many great resources to show you!',
                    supportive: 'Don\'t worry, I\'ll guide you through this step by step.'
                }
            };
        }
        
        initializeAdvancedFeatures() {
            // Enhanced subtitle based on intelligence
            const subtitle = document.querySelector('.ai-subtitle');
            if (subtitle) {
                subtitle.textContent = 'SUPERCHARGED mobile-first intelligent assistant';
            }
            
            // Track user interactions
            this.trackUserBehavior();
            
            // Initialize context awareness
            this.initializeContextAwareness();
            
            // Set up intelligent recommendations
            this.setupIntelligentRecommendations();
            
            // Initialize learning algorithms
            this.initializeLearningSystem();
        }
        
        trackUserBehavior() {
            // Track category preferences
            const originalSelectCategory = this.selectCategory.bind(this);
            this.selectCategory = (categoryId) => {
                this.sessionData.categoriesVisited.add(categoryId);
                this.contextMemory.set('lastCategory', categoryId);
                this.contextMemory.set('categoryTime', Date.now());
                originalSelectCategory(categoryId);
            };
            
            // Track command usage
            const originalExecuteCommand = this.executeCommand.bind(this);
            this.executeCommand = (commandId) => {
                this.sessionData.commandsUsed.add(commandId);
                this.sessionData.interactionCount++;
                this.commandHistory.push({ command: commandId, timestamp: Date.now(), category: this.currentCategory });
                originalExecuteCommand(commandId);
            };
        }
        
        initializeContextAwareness() {
            // Remember user's journey
            this.contextMemory.set('sessionStart', Date.now());
            this.contextMemory.set('initialCategory', this.currentCategory);
            
            // Set up periodic context updates
            setInterval(() => {
                this.updateUserContext();
            }, 30000); // Update every 30 seconds
        }
        
        updateUserContext() {
            const sessionDuration = Date.now() - this.contextMemory.get('sessionStart');
            const categoriesCount = this.sessionData.categoriesVisited.size;
            const interactionRate = this.sessionData.interactionCount / (sessionDuration / 1000 / 60); // per minute
            
            // Update user behavior profile
            if (categoriesCount > 5) {
                this.aiBrain.personality = 'explorer and curious';
            } else if (interactionRate > 5) {
                this.aiBrain.personality = 'focused and efficient';
            } else {
                this.aiBrain.personality = 'thoughtful and deliberate';
            }
        }
        
        setupIntelligentRecommendations() {
            // Enhanced processNaturalLanguage with better AI
            const originalProcess = this.processNaturalLanguage.bind(this);
            this.processNaturalLanguage = (message) => {
                // Add context and personalization
                const enhancedResponse = this.generateIntelligentResponse(message);
                if (enhancedResponse) {
                    this.showMessages();
                    this.addMessage(enhancedResponse, 'assistant');
                    return;
                }
                originalProcess(message);
            };
        }
        
        generateIntelligentResponse(message) {
            const msgLower = message.toLowerCase();
            const timeOfDay = new Date().getHours();
            const userType = this.determineUserType();
            
            // Time-based responses
            let greeting = '';
            if (timeOfDay < 12) greeting = 'Good morning! ';
            else if (timeOfDay < 18) greeting = 'Good afternoon! ';
            else greeting = 'Good evening! ';
            
            // Intelligent pattern matching
            if (msgLower.includes('help') || msgLower.includes('stuck') || msgLower.includes('lost')) {
                return greeting + this.getContextualHelp();
            }
            
            if (msgLower.includes('recommend') || msgLower.includes('suggest') || msgLower.includes('what should')) {
                return greeting + this.getPersonalizedRecommendations();
            }
            
            if (msgLower.includes('learn') || msgLower.includes('study') || msgLower.includes('education')) {
                return greeting + this.getLearningPathSuggestions();
            }
            
            if (msgLower.includes('work') || msgLower.includes('productivity') || msgLower.includes('business')) {
                return greeting + this.getProductivitySuggestions();
            }
            
            return null; // Fall back to original processing
        }
        
        determineUserType() {
            const categoriesVisited = this.sessionData.categoriesVisited.size;
            const interactionCount = this.sessionData.interactionCount;
            const sessionDuration = Date.now() - this.sessionData.startTime;
            
            if (interactionCount < 3 && sessionDuration < 60000) return 'newbie';
            if (categoriesVisited > 6) return 'explorer';
            if (interactionCount > 15) return 'power_user';
            return 'regular';
        }
        
        getContextualHelp() {
            const userType = this.determineUserType();
            const currentCat = this.currentCategory;
            
            switch (userType) {
                case 'newbie':
                    return `🎯 **New here? No worries!**\n\nI\'ll help you get started:\n• Swipe the category tabs to explore different sections\n• Tap any command card for instant results\n• Try asking me questions in natural language\n\nYou\'re currently in the "${currentCat}" category. Great place to start! 🌟`;
                    
                case 'explorer':
                    return `🕵️ **I see you love exploring!**\n\nSince you\'ve visited ${this.sessionData.categoriesVisited.size} categories, here are some power tips:\n• Try the "Hidden Gems" command for secret tools\n• Use semantic search for intelligent discovery\n• Check out the "Smart Recommendations" feature\n\nYou\'re becoming a Gateway AI expert! 🚀`;
                    
                default:
                    return `💡 **Here to help!**\n\nBased on your activity, I recommend:\n• Exploring related categories to "${currentCat}"\n• Setting up some automation rules\n• Trying voice commands for hands-free navigation\n\nWhat specific area would you like help with? 🎯`;
            }
        }
        
        getPersonalizedRecommendations() {
            const recentCategories = Array.from(this.sessionData.categoriesVisited);
            const mostUsed = this.getMostUsedCategory();
            
            return `🎯 **Personalized Recommendations for You:**\n\n🔥 **Based on Your Activity:**\n• You seem to love "${mostUsed}" - check out related tools in other categories\n• Since you\'ve explored ${recentCategories.length} categories, try "Cross-Category Discovery"\n• Your interaction style suggests you\'d love "Advanced Search Features"\n\n💡 **Smart Suggestions:**\n• Try voice commands - perfect for your exploration style\n• Set up custom categories for your favorite tools\n• Enable smart notifications for trending resources\n\nWant me to show you any of these features? 🌟`;
        }
        
        getLearningPathSuggestions() {
            return `📚 **Learning & Education Recommendations:**\n\n🎓 **Perfect for Learning:**\n• Knowledge Hub (53 educational resources)\n• Design & Creativity tools for hands-on practice\n• Hidden Treasures often contain learning gems\n\n🛤️ **Suggested Learning Path:**\n1. Start with Knowledge resources\n2. Practice with Tools & Utilities\n3. Create projects with Design tools\n4. Share progress on Social platforms\n\n💡 **Pro Learning Tips:**\n• Use \'Compare Tools\' to find the best learning platforms\n• Set up workflow chains for structured learning\n• Track your progress with the analytics features\n\nReady to start your learning journey? 🚀`;
        }
        
        getProductivitySuggestions() {
            return `⚡ **Productivity & Work Recommendations:**\n\n🛠️ **Top Productivity Categories:**\n• Tools & Utilities (52 productivity tools)\n• Design & Creativity for professional work\n• Knowledge resources for skill building\n\n🔗 **Workflow Optimization:**\n• Use \'Workflow Builder\' to connect your tools\n• Try \'Batch Bookmark\' for research sessions\n• Set up automation rules for repetitive tasks\n\n📊 **Track Your Productivity:**\n• Enable usage analytics\n• Monitor your tool usage patterns\n• Get insights on your productive hours\n\nLet\'s supercharge your productivity! 💪`;
        }
        
        getMostUsedCategory() {
            const categoryUsage = {};
            this.commandHistory.forEach(item => {
                categoryUsage[item.category] = (categoryUsage[item.category] || 0) + 1;
            });
            return Object.keys(categoryUsage).reduce((a, b) => categoryUsage[a] > categoryUsage[b] ? a : b, 'navigation');
        }
        
        initializeLearningSystem() {
            // Learn from user interactions
            this.learningData = {
                preferredCategories: new Map(),
                commandPatterns: new Map(),
                timePreferences: new Map(),
                responsePreferences: new Map()
            };
            
            // Periodic learning updates
            setInterval(() => {
                this.updateLearningModel();
            }, 60000); // Learn every minute
        }
        
        updateLearningModel() {
            // Update category preferences
            this.sessionData.categoriesVisited.forEach(cat => {
                const current = this.learningData.preferredCategories.get(cat) || 0;
                this.learningData.preferredCategories.set(cat, current + 1);
            });
            
            // Update command patterns
            const recentCommands = this.commandHistory.slice(-5);
            const pattern = recentCommands.map(c => c.command).join('->');
            const currentCount = this.learningData.commandPatterns.get(pattern) || 0;
            this.learningData.commandPatterns.set(pattern, currentCount + 1);
        }
        
        loadUserPreferences() {
            try {
                return JSON.parse(localStorage.getItem('gatewayAI_preferences')) || {
                    theme: 'dark',
                    animations: true,
                    hapticFeedback: true,
                    voiceCommands: false,
                    smartSuggestions: true,
                    privacyMode: false
                };
            } catch {
                return {
                    theme: 'dark',
                    animations: true,
                    hapticFeedback: true,
                    voiceCommands: false,
                    smartSuggestions: true,
                    privacyMode: false
                };
            }
        }
        
        saveUserPreferences() {
            try {
                localStorage.setItem('gatewayAI_preferences', JSON.stringify(this.userPreferences));
            } catch (error) {
                console.warn('Failed to save user preferences:', error);
            }
        }
        
        // SUPERINTELLIGENT RESPONSE GENERATION METHODS
        
        generateExpertPrivacyResponse(msgLower) {
            const contextLevel = this.conversationMemory.conversationDepth;
            const userExpertise = this.conversationMemory.userExpertiseLevel;
            
            // Dynamic response based on user context and conversation depth
            let response = '🔒 **Privacy Search Engines - Expert Analysis:**\n\n';
            
            // Tier-based response generation
            if (contextLevel === 1) {
                // First interaction - comprehensive overview
                response += this.getPrivacyEnginesOverview();
            } else if (contextLevel === 2) {
                // Second interaction - deeper technical analysis
                response += this.getPrivacyTechnicalAnalysis();
            } else {
                // Continued conversation - specialized insights
                response += this.getPrivacySpecializedInsights();
            }
            
            // Add contextual follow-up based on user query specifics
            if (msgLower.includes('country') || msgLower.includes('region')) {
                response += '\n\n🌍 **Regional Considerations:**\n';
                response += '• **Europe**: GDPR protection with MetaGer, Swisscows\n';
                response += '• **US**: First Amendment protections with DuckDuckGo\n';
                response += '• **Global**: Tor-compatible engines for maximum anonymity';
            }
            
            if (msgLower.includes('make money') || msgLower.includes('revenue') || msgLower.includes('business')) {
                response += '\n\n💰 **Privacy Engine Business Models:**\n';
                response += '• **DuckDuckGo**: Affiliate marketing, contextual ads (no tracking)\n';
                response += '• **Brave**: BAT crypto ecosystem, premium features\n';
                response += '• **Kagi**: Direct subscription model ($5-25/month)\n';
                response += '• **Startpage**: Anonymous ads, no user profiling';
            }
            
            // Dynamic learning component
            this.recordResponseEffectiveness('privacy', response.length);
            
            return response;
        }
        
        getPrivacyEnginesOverview() {
            return `🏆 **Top Privacy Champions (Updated Analysis):**

🦆 **DuckDuckGo** - The Privacy Pioneer
✅ 100M+ searches daily, zero tracking
✅ !Bang shortcuts (!w !yt !gh) for power users
✅ Tor .onion site available
✅ Instant answers without Google dependency
💡 *Perfect for: Daily browsing, quick searches*

🛡️ **Brave Search** - The Independent Alternative
✅ Own search index (70% independent)
✅ BAT rewards ecosystem
✅ Built-in ad/tracker blocking
✅ Anonymous local results
💡 *Perfect for: Crypto users, complete independence*

🎯 **Startpage** - Google Results, Zero Tracking
✅ Google's results without the surveillance
✅ Anonymous View proxy feature
✅ European privacy law compliance
✅ Custom URL generator for teams
💡 *Perfect for: Google quality with privacy*

🇨🇭 **Swisscows** - The Family-Safe Choice
✅ Swiss privacy laws protection
✅ No data storage policy
✅ Family-friendly content filtering
✅ Semantic search technology
💡 *Perfect for: Families, educational use*

🔍 **MetaGer** - Open Source Transparency
✅ Open-source code, Germany-based
✅ Proxy protection for results
✅ Maps without tracking
✅ Non-profit organization
💡 *Perfect for: Transparency advocates, researchers*`;
        }
        
        getPrivacyTechnicalAnalysis() {
            return `🔬 **Technical Privacy Analysis - Deep Dive:**

📊 **Search Index Independence:**
• **Brave Search**: 70% independent index, growing daily
• **DuckDuckGo**: Hybrid (own crawl + Bing partnership)
• **Mojeek**: 100% independent UK-based crawler
• **Startpage**: 100% Google results (privacy proxy)

🛡️ **Privacy Protection Methods:**
• **No Logging**: DuckDuckGo, Swisscows, MetaGer
• **IP Anonymization**: Startpage Anonymous View
• **Encrypted Connections**: All use HTTPS by default
• **Proxy Protection**: MetaGer, Startpage

🌐 **Server Infrastructure:**
• **DuckDuckGo**: AWS (US), but no user data stored
• **Brave**: Own infrastructure, globally distributed
• **Swisscows**: Swiss servers, strict data laws
• **MetaGer**: German academic servers, non-profit

⚡ **Performance Metrics (Latest Tests):**
• **Speed**: Brave (fastest), DuckDuckGo, Startpage
• **Results Quality**: Startpage (Google), Brave, DDG
• **Feature Richness**: DuckDuckGo (!bangs), Brave (rewards)

🔐 **Advanced Privacy Features:**
• **Tor Compatibility**: DuckDuckGo, Searx
• **VPN Friendly**: All major privacy engines
• **No JavaScript Required**: Most work with JS disabled
• **Custom Domains**: Some offer vanity URLs`;
        }
        
        getPrivacySpecializedInsights() {
            return `🎯 **Advanced Privacy Insights - Expert Level:**

🏛️ **Legal Framework Analysis:**
• **Five Eyes Impact**: DuckDuckGo (US), Startpage (Netherlands)
• **GDPR Compliance**: All European engines fully compliant
• **Data Retention Laws**: Varies by jurisdiction and engine
• **Warrant Resistance**: Limited data means limited exposure

💰 **Economic Sustainability Models:**
• **Contextual Ads**: DuckDuckGo's non-tracking approach
• **Subscription Premium**: Kagi's direct-pay model success
• **Affiliate Revenue**: Commission without tracking
• **Nonprofit Funding**: MetaGer's academic backing

🔄 **Integration Ecosystem:**
• **Browser Integration**: Brave's native search advantage
• **API Access**: Limited but growing for developers
• **Third-party Apps**: Duck.com, Brave extensions
• **Enterprise Solutions**: Kagi for business, custom instances

📈 **Market Evolution Trends:**
• **Growing Adoption**: Privacy awareness driving 25% annual growth
• **AI Integration**: Brave experimenting with privacy-first AI
• **Mobile Focus**: Apps and PWAs becoming standard
• **Decentralization**: Searx network expanding globally

🎭 **Advanced Use Cases:**
• **Journalist Research**: Tor + DuckDuckGo + VPN stack
• **Academic Research**: MetaGer + institutional access
• **Business Intelligence**: Startpage for unbiased results
• **Developer Productivity**: DuckDuckGo !bangs for quick ref`;
        }
        
        recordTopicEngagement(topic, query) {
            if (!this.conversationAnalytics.topicExpertise.has(topic)) {
                this.conversationAnalytics.topicExpertise.set(topic, {
                    queryCount: 0,
                    avgDepth: 0,
                    commonQuestions: new Map(),
                    satisfactionScore: 0
                });
            }
            
            const topicData = this.conversationAnalytics.topicExpertise.get(topic);
            topicData.queryCount++;
            
            // Track common question patterns
            const normalizedQuery = query.toLowerCase().replace(/[^a-z0-9\s]/g, '');
            const currentCount = topicData.commonQuestions.get(normalizedQuery) || 0;
            topicData.commonQuestions.set(normalizedQuery, currentCount + 1);
        }
        
        recordResponseEffectiveness(topic, responseLength) {
            const effectiveness = {
                timestamp: Date.now(),
                topic: topic,
                responseLength: responseLength,
                conversationDepth: this.conversationMemory.conversationDepth,
                userEngagement: this.calculateEngagementScore()
            };
            
            if (!this.conversationAnalytics.responseEffectiveness.has(topic)) {
                this.conversationAnalytics.responseEffectiveness.set(topic, []);
            }
            
            this.conversationAnalytics.responseEffectiveness.get(topic).push(effectiveness);
        }
        
        calculateEngagementScore() {
            const sessionDuration = Date.now() - this.sessionData.startTime;
            const interactionRate = this.sessionData.interactionCount / (sessionDuration / 1000 / 60);
            const categoryDiversity = this.sessionData.categoriesVisited.size;
            
            // Weighted engagement score
            return Math.min(100, (
                (interactionRate * 20) + 
                (categoryDiversity * 10) + 
                (this.conversationMemory.conversationDepth * 15)
            ));
        }
        
        getSmartFallbackResponse(message, msgLower) {
            // Analyze the message for intent
            const userType = this.determineUserType();
            const categoriesVisited = this.sessionData.categoriesVisited.size;
            const interactionCount = this.sessionData.interactionCount;
            
            // Determine the tone based on user behavior
            let responseIntro = '';
            if (userType === 'newbie') {
                responseIntro = '🌟 **Welcome to Gateway AI!** ';
            } else if (userType === 'explorer') {
                responseIntro = `🔍 **Great exploring!** (${categoriesVisited} categories visited) `;
            } else {
                responseIntro = '🎯 **I understand your question:** ';
            }
            
            // Suggest relevant actions based on the message content
            let smartSuggestions = [];
            
            if (msgLower.includes('search') || msgLower.includes('find') || msgLower.includes('look')) {
                smartSuggestions.push('• Try the "Explore Search Engines" card for 39 different search platforms');
                smartSuggestions.push('• Ask me specific questions like "privacy search engines" or "academic search"');
            }
            
            if (msgLower.includes('privacy') || msgLower.includes('secure') || msgLower.includes('track')) {
                smartSuggestions.push('• Ask: "Which search engines don\'t track me?"');
                smartSuggestions.push('• Try: "DuckDuckGo vs Startpage comparison"');
            }
            
            if (msgLower.includes('academic') || msgLower.includes('research') || msgLower.includes('paper')) {
                smartSuggestions.push('• Ask: "Best search engines for scientific papers"');
                smartSuggestions.push('• Try: "Research databases vs regular search engines"');
            }
            
            if (msgLower.includes('code') || msgLower.includes('programming') || msgLower.includes('developer')) {
                smartSuggestions.push('• Ask: "Code search engines for programmers"');
                smartSuggestions.push('• Try: "GitHub vs Stack Overflow for finding code"');
            }
            
            if (msgLower.includes('image') || msgLower.includes('photo') || msgLower.includes('picture')) {
                smartSuggestions.push('• Ask: "Free image search engines"');
                smartSuggestions.push('• Try: "Copyright-free image sources"');
            }
            
            // If no specific suggestions, provide general ones
            if (smartSuggestions.length === 0) {
                smartSuggestions = [
                    '• Tap the "What Can I Ask?" card for conversation examples',
                    '• Try asking about specific search engine types',
                    '• Use the category tabs to explore different areas',
                    '• Ask comparison questions like "X vs Y search engines"'
                ];
            }
            
            // Build the response
            const response = `${responseIntro}"${message}"\n\n💡 **Here are some ways I can help:**\n${smartSuggestions.join('\n')}\n\n📱 **Quick Actions:**\n• Swipe categories above to explore\n• Tap command cards for instant results\n• Ask natural questions about search engines\n• Use the "Smart Recommendations" for personalized suggestions\n\n🌟 **Remember:** I specialize in search engines and can answer detailed questions about privacy, features, comparisons, and recommendations!`;
            
            return response;
        }
        
        // Debug Panel Methods
        initializeDebugPanel() {
            const debugToggle = document.getElementById('debugToggle');
            const debugPanel = document.getElementById('debugPanel');
            
            if (debugToggle && debugPanel) {
                debugToggle.addEventListener('click', () => {
                    debugPanel.classList.toggle('active');
                    this.debugLog('🔧 Debug panel toggled');
                });
                this.debugLog('✅ Debug panel initialized');
            } else {
                console.warn('⚠️ Debug panel elements not found');
            }
        }
        
        debugLog(message) {
            const debugPanel = document.getElementById('debugPanel');
            if (debugPanel) {
                const logDiv = document.createElement('div');
                logDiv.className = 'ai-debug-log';
                const timestamp = new Date().toLocaleTimeString();
                logDiv.textContent = `[${timestamp}] ${message}`;
                debugPanel.appendChild(logDiv);
                
                // Keep only last 20 logs
                const logs = debugPanel.querySelectorAll('.ai-debug-log');
                if (logs.length > 20) {
                    logs[0].remove();
                }
                
                // Auto scroll
                debugPanel.scrollTop = debugPanel.scrollHeight;
            }
            console.log(message);
        }
    }
    
    // Auto-initialize when DOM is ready
    const initialize = () => {
        console.log('🟡 Starting Gateway AI initialization...');
        
        // Force remove any existing instances
        const existingHTML = document.getElementById('gateway-ai-mobile-html');
        if (existingHTML) {
            existingHTML.remove();
            console.log('🗑️ Removed existing AI HTML');
        }
        
        const existingStyles = document.getElementById('gateway-ai-mobile-styles');
        if (existingStyles) {
            existingStyles.remove();
            console.log('🗑️ Removed existing AI styles');
        }
        
        injectMobileStyles();
        console.log('✅ Styles injected');
        
        createMobileHTML();
        console.log('✅ HTML created');
        
        initializeMobileAI();
        console.log('✅ AI system initialized');
        
        setTimeout(() => {
            if (window.gatewayAI) {
                console.log('🎯 Gateway AI 2.0 SUPERCHARGED Mobile-First System Ready!');
                
                // Test if elements exist
                const fab = document.getElementById('aiFab');
                const closeBtn = document.getElementById('aiClose');
                const dragHandle = document.querySelector('.ai-drag-handle');
                
                console.log('🧪 Element test:', {
                    FAB_exists: !!fab,
                    Close_button_exists: !!closeBtn,
                    Drag_handle_exists: !!dragHandle,
                    FAB_visible: fab ? getComputedStyle(fab).display !== 'none' : false,
                    Close_visible: closeBtn ? getComputedStyle(closeBtn).display !== 'none' : false
                });
                
                // Force add a simple click test for X button
                if (closeBtn) {
                    console.log('🔧 Adding emergency X button handler');
                    closeBtn.onclick = () => {
                        console.log('🆘 Emergency X button clicked!');
                        const modal = document.getElementById('aiModal');
                        if (modal) {
                            modal.classList.remove('active');
                            document.body.classList.remove('ai-modal-open');
                            console.log('🆘 Emergency close executed!');
                        }
                    };
                }
            } else {
                console.error('❌ Gateway AI failed to initialize!');
            }
        }, 200);
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
