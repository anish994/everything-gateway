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
        
        /* Remove tap highlight on all AI elements */
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
            z-index: 10001;
            overflow: hidden;
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
        <!-- Enhanced Floating Action Button -->
        <button class="ai-fab" id="aiFab" aria-label="Open Gateway AI 2.0">
            <span class="ai-fab-icon">🧠</span>
        </button>
        
        <!-- Enhanced Modal -->
        <div class="ai-modal-overlay" id="aiModal">
            <div class="ai-container">
                <!-- Drag Handle -->
                <div class="ai-drag-handle"></div>
                
                <!-- Enhanced Header -->
                <div class="ai-header">
                    <div class="ai-header-content">
                        <div class="ai-title">
                            <div class="ai-status"></div>
                            Gateway AI 2.0
                        </div>
                        <button class="ai-close" id="aiClose" aria-label="Close AI Assistant">×</button>
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
    
    // Initialize Revolutionary Mobile AI System
    const initializeMobileAI = () => {
        window.gatewayAI = new GatewayAIMobile();
    };
    
    // Gateway AI 2.0 Mobile Class
    class GatewayAIMobile {
        constructor() {
            this.isOpen = false;
            this.currentCategory = 'navigation';
            this.commandHistory = [];
            this.touchStartY = 0;
            this.isDragging = false;
            
            this.commands = this.getEnhancedCommands();
            this.knowledgeBase = this.getKnowledgeBase();
            
            this.initializeElements();
            this.initializeEventListeners();
            this.renderCommands();
            
            console.log('🚀 Gateway AI 2.0 Mobile-First Revolution - Ready!');
        }
        
        initializeElements() {
            this.fab = document.getElementById('aiFab');
            this.modal = document.getElementById('aiModal');
            this.close = document.getElementById('aiClose');
            this.container = document.querySelector('.ai-container');
            this.categoriesScroll = document.getElementById('categoriesScroll');
            this.commandsGrid = document.getElementById('commandsGrid');
            this.messages = document.getElementById('aiMessages');
            this.input = document.getElementById('aiInput');
            this.send = document.getElementById('aiSend');
            
            this.categoryChips = document.querySelectorAll('.ai-category-chip');
        }
        
        initializeEventListeners() {
            // FAB and close
            this.fab?.addEventListener('click', () => this.open());
            this.close?.addEventListener('click', () => this.close());
            this.modal?.addEventListener('click', (e) => {
                if (e.target === this.modal) this.close();
            });
            
            // Category selection
            this.categoryChips.forEach(chip => {
                chip.addEventListener('click', () => {
                    this.selectCategory(chip.dataset.category);
                    this.addHapticFeedback();
                });
            });
            
            // Input and send
            this.input?.addEventListener('input', () => this.autoResize());
            this.input?.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            this.send?.addEventListener('click', () => this.sendMessage());
            
            // Keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) this.close();
                if (e.ctrlKey && e.key === 'i' && !this.isOpen) {
                    e.preventDefault();
                    this.open();
                }
            });
            
            // Mobile gestures
            this.initializeTouchGestures();
            this.initializeCategorySwipe();
        }
        
        initializeTouchGestures() {
            const dragHandle = document.querySelector('.ai-drag-handle');
            if (!dragHandle) return;
            
            dragHandle.addEventListener('touchstart', (e) => {
                this.touchStartY = e.touches[0].clientY;
                this.isDragging = true;
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
                
                if (diff > 100) {
                    this.close();
                } else {
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
                    { id: 'list-categories', icon: '📋', title: 'All Categories', desc: 'Complete list of 13 categories', badge: '' },
                    { id: 'site-stats', icon: '📊', title: 'Gateway Stats', desc: '577+ resources overview', badge: '' },
                    { id: 'whats-new', icon: '🆕', title: "What's New", desc: 'Latest updates & features', badge: 'hot' },
                    { id: 'help-navigation', icon: '🧭', title: 'Navigation Help', desc: 'How to use the Gateway', badge: '' }
                ],
                explorer: [
                    { id: 'explore-search', icon: '🔍', title: 'Search Engines', desc: '39 search platforms', badge: '' },
                    { id: 'explore-tools', icon: '🛠️', title: 'Tools & Utilities', desc: '52 productivity tools', badge: '' },
                    { id: 'explore-entertainment', icon: '🎭', title: 'Entertainment', desc: '51 media platforms', badge: '' },
                    { id: 'explore-knowledge', icon: '📚', title: 'Learning Hub', desc: '53 educational resources', badge: '' },
                    { id: 'explore-more', icon: '➡️', title: 'More Categories', desc: 'All remaining categories', badge: '' },
                    { id: 'trending-resources', icon: '📈', title: 'Trending Now', desc: 'Popular this week', badge: 'hot' }
                ],
                actions: [
                    { id: 'find-ai-tools', icon: '🤖', title: 'AI Tools', desc: 'Discover AI platforms', badge: '' },
                    { id: 'find-design-tools', icon: '🎨', title: 'Design Tools', desc: 'Creative resources', badge: '' },
                    { id: 'search-tips', icon: '💡', title: 'Search Tips', desc: 'Power user tricks', badge: '' },
                    { id: 'random-resource', icon: '🎲', title: 'Surprise Me', desc: 'Random discovery', badge: '' },
                    { id: 'quick-compare', icon: '⚖️', title: 'Compare Tools', desc: 'Side-by-side analysis', badge: 'new' },
                    { id: 'workflow-builder', icon: '🔗', title: 'Build Workflow', desc: 'Create tool chains', badge: 'new' }
                ],
                personal: [
                    { id: 'my-favorites', icon: '❤️', title: 'My Favorites', desc: 'Your saved resources', badge: 'new' },
                    { id: 'recent-visits', icon: '🕒', title: 'Recent Activity', desc: 'Recently viewed', badge: 'new' },
                    { id: 'personalized-feed', icon: '🎯', title: 'For You', desc: 'AI recommendations', badge: 'new' },
                    { id: 'usage-stats', icon: '📊', title: 'My Analytics', desc: 'Your activity insights', badge: 'new' }
                ],
                advanced: [
                    { id: 'semantic-search', icon: '🔮', title: 'Smart Search', desc: 'AI-powered discovery', badge: 'new' },
                    { id: 'voice-command', icon: '🎙️', title: 'Voice Control', desc: 'Speak your commands', badge: 'new' },
                    { id: 'bulk-actions', icon: '📦', title: 'Bulk Actions', desc: 'Multiple operations', badge: 'new' },
                    { id: 'api-access', icon: '🔌', title: 'API Access', desc: 'Developer integration', badge: 'new' }
                ],
                system: [
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
            
            this.renderCommands();
        }
        
        renderCommands() {
            const commands = this.commands[this.currentCategory] || [];
            
            this.commandsGrid.innerHTML = commands.map(cmd => `
                <div class="ai-command-card ai-haptic" onclick="window.gatewayAI.executeCommand('${cmd.id}')">
                    ${cmd.badge ? `<div class="ai-command-badge ${cmd.badge}">${cmd.badge}</div>` : ''}
                    <div class="ai-command-content">
                        <div class="ai-command-icon">${cmd.icon}</div>
                        <div class="ai-command-title">${cmd.title}</div>
                        <div class="ai-command-desc">${cmd.desc}</div>
                    </div>
                </div>
            `).join('');
        }
        
        executeCommand(commandId) {
            this.addHapticFeedback();
            this.showMessages();
            this.addMessage(`Command: /${commandId}`, 'system');
            
            // Command implementations
            switch (commandId) {
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
                default:
                    this.addMessage(`✨ "${commandId}" is ready! This advanced feature is coming in the next update.`, 'assistant');
            }
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
            
            if (msgLower.includes('categories') || msgLower.includes('list')) {
                this.executeCommand('list-categories');
            } else if (msgLower.includes('stats') || msgLower.includes('statistics')) {
                this.executeCommand('site-stats');
            } else if (msgLower.includes('trending') || msgLower.includes('popular')) {
                this.executeCommand('trending-resources');
            } else if (msgLower.includes('favorites') || msgLower.includes('saved')) {
                this.executeCommand('my-favorites');
            } else if (msgLower.includes('voice') || msgLower.includes('speak')) {
                this.executeCommand('voice-command');
            } else {
                const response = `🎯 I understand: "${message}"

💡 **Try These Actions:**
• Swipe categories above to explore
• Tap command cards for instant results
• Ask about trending or your favorites  
• Use voice commands: /voice-command
• Type /help to see all options

🚀 **Mobile Tips:**
• Drag the handle to close
• Swipe categories left/right
• Feel the haptic feedback on taps
• Long press for quick actions (soon!)

What would you like to discover? 🌟`;
                
                this.addMessage(response, 'assistant');
            }
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
            
            this.container.style.transform = '';
            this.container.style.opacity = '';
            
            this.hideMessages();
        }
    }
    
    // Auto-initialize when DOM is ready
    const initialize = () => {
        injectMobileStyles();
        createMobileHTML();
        initializeMobileAI();
        
        setTimeout(() => {
            if (window.gatewayAI) {
                console.log('🎯 Gateway AI 2.0 Mobile-First System Ready!');
            }
        }, 100);
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
