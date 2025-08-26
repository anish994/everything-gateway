/**
 * Gateway AI Command System Integration Script
 * This script will integrate the command system into your main Everything Gateway site
 */

(function() {
    'use strict';
    
    console.log('🚀 Gateway AI Integration Starting...');
    
    // Configuration
    const config = {
        enableKeyboardShortcuts: true,
        enableFloatingButton: true,
        autoInitialize: true,
        debugMode: false
    };
    
    // Integration methods
    const integration = {
        
        // Method 1: Direct script injection (Recommended)
        injectCommandSystem() {
            console.log('📦 Injecting Gateway AI Command System...');
            
            const script = document.createElement('script');
            script.src = 'ai/gateway-command-embed.js';
            script.onload = () => {
                console.log('✅ Gateway AI Command System loaded successfully!');
                this.setupIntegrationHooks();
            };
            script.onerror = () => {
                console.error('❌ Failed to load Gateway AI Command System');
                this.fallbackIntegration();
            };
            
            document.head.appendChild(script);
        },
        
        // Method 2: Fallback integration for existing sites
        fallbackIntegration() {
            console.log('🔄 Using fallback integration method...');
            
            // Create a simple fallback button
            const fallbackButton = document.createElement('button');
            fallbackButton.innerHTML = '🧠';
            fallbackButton.style.cssText = `
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
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                z-index: 1000;
                transition: transform 0.3s ease;
            `;
            
            fallbackButton.onmouseover = () => {
                fallbackButton.style.transform = 'scale(1.1)';
            };
            
            fallbackButton.onmouseout = () => {
                fallbackButton.style.transform = 'scale(1)';
            };
            
            fallbackButton.onclick = () => {
                alert('Gateway AI Command System will be available soon! 🚀\n\nFor now, use Ctrl+K to search the Gateway.');
            };
            
            document.body.appendChild(fallbackButton);
        },
        
        // Setup integration hooks for existing site elements
        setupIntegrationHooks() {
            console.log('🔗 Setting up integration hooks...');
            
            // Hook into existing search functionality
            this.enhanceExistingSearch();
            
            // Add AI suggestions to navigation
            this.enhanceNavigation();
            
            // Setup analytics tracking
            this.setupAnalytics();
        },
        
        // Enhance existing search with AI suggestions
        enhanceExistingSearch() {
            const searchInputs = document.querySelectorAll('input[type="search"], .search-input, #search');
            
            searchInputs.forEach(input => {
                // Add AI icon to search inputs
                const aiButton = document.createElement('button');
                aiButton.innerHTML = '🧠';
                aiButton.style.cssText = `
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    font-size: 18px;
                    cursor: pointer;
                    opacity: 0.7;
                    transition: opacity 0.2s ease;
                `;
                
                aiButton.onmouseover = () => aiButton.style.opacity = '1';
                aiButton.onmouseout = () => aiButton.style.opacity = '0.7';
                aiButton.onclick = (e) => {
                    e.preventDefault();
                    if (window.gatewayAI) {
                        window.gatewayAI.openChat();
                    }
                };
                
                // Make parent relative if needed
                const parent = input.parentElement;
                if (getComputedStyle(parent).position === 'static') {
                    parent.style.position = 'relative';
                }
                
                parent.appendChild(aiButton);
            });
        },
        
        // Enhance navigation with AI suggestions
        enhanceNavigation() {
            // Add AI helper to main navigation
            const mainNav = document.querySelector('nav, .navigation, .main-nav');
            if (mainNav) {
                const aiNavItem = document.createElement('div');
                aiNavItem.innerHTML = `
                    <button style="
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 20px;
                        font-size: 14px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        transition: transform 0.2s ease;
                    " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onclick="window.gatewayAI && window.gatewayAI.openChat()">
                        🧠 AI Assistant
                    </button>
                `;
                mainNav.appendChild(aiNavItem);
            }
        },
        
        // Setup analytics for AI usage
        setupAnalytics() {
            // Track when AI system is opened
            document.addEventListener('ai-system-opened', () => {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'ai_system_opened', {
                        event_category: 'Gateway AI',
                        event_label: 'Command System'
                    });
                }
            });
            
            // Track command usage
            document.addEventListener('ai-command-executed', (e) => {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'ai_command_used', {
                        event_category: 'Gateway AI',
                        event_label: e.detail.command
                    });
                }
            });
        },
        
        // Method 3: Embed as iframe (for legacy support)
        embedAsIframe() {
            console.log('🖼️ Embedding as iframe...');
            
            const iframe = document.createElement('iframe');
            iframe.src = 'ai/gateway-ai-command-system.html';
            iframe.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border: none;
                pointer-events: none;
                z-index: 9999;
                background: transparent;
            `;
            iframe.id = 'gateway-ai-iframe';
            
            document.body.appendChild(iframe);
        },
        
        // Check if site is compatible
        checkCompatibility() {
            const compatibility = {
                modernBrowser: !!document.querySelector && !!document.addEventListener,
                cssSupport: !!window.CSS && !!CSS.supports,
                es6Support: (function() { try { eval("const test = () => {}"); return true; } catch(e) { return false; } })(),
                localStorage: !!window.localStorage
            };
            
            const compatible = Object.values(compatibility).every(Boolean);
            
            if (config.debugMode) {
                console.log('🔍 Compatibility Check:', compatibility);
                console.log(compatible ? '✅ Site is compatible' : '⚠️ Some features may not work');
            }
            
            return compatible;
        }
    };
    
    // Auto-initialization
    const initialize = () => {
        if (!config.autoInitialize) return;
        
        console.log('🎯 Initializing Gateway AI Command System...');
        
        // Check compatibility first
        const isCompatible = integration.checkCompatibility();
        
        if (isCompatible) {
            integration.injectCommandSystem();
        } else {
            console.warn('⚠️ Using fallback integration due to compatibility issues');
            integration.fallbackIntegration();
        }
        
        // Setup global keyboard shortcuts
        if (config.enableKeyboardShortcuts) {
            document.addEventListener('keydown', (e) => {
                // Alt + G to open Gateway AI
                if (e.altKey && e.key.toLowerCase() === 'g') {
                    e.preventDefault();
                    if (window.gatewayAI) {
                        window.gatewayAI.openChat();
                    } else {
                        console.log('🤖 Gateway AI Command System not yet loaded');
                    }
                }
            });
        }
    };
    
    // Expose integration methods globally for manual control
    window.GatewayAIIntegration = {
        init: initialize,
        inject: integration.injectCommandSystem.bind(integration),
        fallback: integration.fallbackIntegration.bind(integration),
        iframe: integration.embedAsIframe.bind(integration),
        config: config
    };
    
    // Auto-initialize based on document state
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        // Slight delay to ensure page is ready
        setTimeout(initialize, 100);
    }
    
    console.log('🎯 Gateway AI Integration Script Loaded');
    console.log('💡 Use Alt+G to open Gateway AI when ready');
    
})();
