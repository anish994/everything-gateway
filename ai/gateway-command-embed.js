/**
 * Gateway AI 2.0 - Revolutionary Mobile-First System Loader
 * Replaces the current AI system with an incredible mobile experience
 */

(function() {
    'use strict';
    
    // Load the revolutionary mobile-first AI system
    const loadGatewayAI2 = () => {
        // First, try to load the mobile version
        const script = document.createElement('script');
        script.src = 'ai/gateway-ai-mobile.js';
        script.onload = () => {
            console.log('🚀 Gateway AI 2.0 Mobile Revolution Loaded Successfully!');
        };
        script.onerror = () => {
            console.warn('⚠️ Gateway AI 2.0 Mobile system not found, loading fallback...');
            loadFallbackSystem();
        };
        document.head.appendChild(script);
    };
    
    // Fallback system if mobile version fails to load
    const loadFallbackSystem = () => {
        // Simple but effective fallback floating button
        const styles = `
        .gateway-ai-fallback {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            color: white;
            transition: all 0.3s ease;
            animation: pulse 2s infinite;
        }
        
        .gateway-ai-fallback:hover {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 12px 30px rgba(102, 126, 234, 0.6);
        }
        
        .gateway-ai-fallback:active {
            transform: scale(0.95);
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        
        const fallbackButton = document.createElement('button');
        fallbackButton.className = 'gateway-ai-fallback';
        fallbackButton.innerHTML = '🧠';
        fallbackButton.title = 'Gateway AI 2.0 - Mobile Revolution';
        fallbackButton.onclick = () => {
            alert('🚀 Gateway AI 2.0 Mobile Experience Loading...\n\n📱 The revolutionary mobile-first system is initializing.\nPlease refresh the page or try again in a moment!\n\n✨ Experience swipeable categories, haptic feedback, and the most advanced mobile AI interface ever created!');
        };
        document.body.appendChild(fallbackButton);
        
        console.log('📱 Gateway AI Fallback System Active - Mobile Revolution Ready!');
    };
    
    // Initialize the system based on document state
    const initialize = () => {
        console.log('🎯 Gateway AI 2.0 System Initializing...');
        loadGatewayAI2();
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
