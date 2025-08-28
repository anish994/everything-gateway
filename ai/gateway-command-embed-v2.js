/**
 * 🚀 Gateway AI Command System v2.0 - Smart Controller Revolution
 * Replaces the old AI system with the new omniscient Gateway AI
 * 
 * This loads the new AI that KNOWS everything about the Gateway
 * and provides natural language control over the entire system
 */

(function() {
    'use strict';
    
    console.log('🚀 Gateway AI Command System v2.0 initializing...');
    
    // Load the new AI brain first
    const loadAIBrain = () => {
        const knowledgeScript = document.createElement('script');
        const timestamp = Date.now(); // Cache busting
        knowledgeScript.src = `ai/gateway-knowledge-engine.js?v=${timestamp}`;
        knowledgeScript.onload = () => {
            console.log('🧠 Gateway AI Knowledge Engine loaded (v2.0 Enhanced)');
            loadSmartController();
        };
        knowledgeScript.onerror = () => {
            console.error('❌ Failed to load Gateway AI Knowledge Engine');
            loadFallbackSystem();
        };
        document.head.appendChild(knowledgeScript);
    };
    
    // Load the smart controller interface
    const loadSmartController = () => {
        const controllerScript = document.createElement('script');
        const timestamp = Date.now(); // Cache busting
        controllerScript.src = `ai/gateway-smart-controller.js?v=${timestamp}`;
        controllerScript.onload = () => {
            console.log('✅ Gateway AI Smart Controller v2.0 ENHANCED fully operational!');
            console.log('🎯 Try SMART commands like: "I want to code", "entertainment", "learn something"');
            
            // Announce the upgrade
            setTimeout(() => {
                console.log('🎉 Gateway AI v2.0 ENHANCED is ready! Press Ctrl+G or click the AI button!');
                console.log('🧠 New: Contextual intelligence, specific resource search, smart suggestions!');
            }, 2000);
        };
        controllerScript.onerror = () => {
            console.error('❌ Failed to load Gateway Smart Controller');
            loadFallbackSystem();
        };
        document.head.appendChild(controllerScript);
    };
    
    // Fallback system if new AI fails to load
    const loadFallbackSystem = () => {
        console.log('⚠️ Loading fallback AI system...');
        
        const styles = `
        .gateway-ai-fallback-v2 {
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
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            color: white;
            transition: all 0.3s ease;
            animation: fallbackPulse 2s infinite;
        }
        
        .gateway-ai-fallback-v2:hover {
            transform: scale(1.1);
            box-shadow: 0 12px 30px rgba(102, 126, 234, 0.6);
        }
        
        @keyframes fallbackPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        
        const fallbackButton = document.createElement('button');
        fallbackButton.className = 'gateway-ai-fallback-v2';
        fallbackButton.innerHTML = '🧠';
        fallbackButton.title = 'Gateway AI v2.0 - Smart Controller (Fallback Mode)';
        fallbackButton.onclick = () => {
            // Simple fallback commands
            const command = prompt('🧠 Gateway AI (Fallback Mode)\\n\\nTell me what you need:\\n• "home" - Go to homepage\\n• "gaming" - Gaming section\\n• "tools" - Developer tools\\n• "entertainment" - Entertainment\\n• "youtube" - Open YouTube\\n• Any search term\\n\\nWhat would you like?');
            
            if (command) {
                const cmd = command.toLowerCase().trim();
                
                if (cmd === 'home') {
                    window.location.href = '/';
                } else if (cmd === 'gaming' || cmd.includes('game')) {
                    window.location.href = 'categories/gaming/';
                } else if (cmd === 'tools' || cmd.includes('dev')) {
                    window.location.href = 'categories/tools/';
                } else if (cmd === 'entertainment') {
                    window.location.href = 'categories/entertainment/';
                } else if (cmd.includes('youtube')) {
                    window.open('https://youtube.com', '_blank');
                } else if (cmd.includes('github')) {
                    window.open('https://github.com', '_blank');
                } else if (cmd.includes('netflix')) {
                    window.open('https://netflix.com', '_blank');
                } else {
                    // Search
                    window.open(`https://duckduckgo.com/?q=${encodeURIComponent(command)}`, '_blank');
                }
            }
        };
        document.body.appendChild(fallbackButton);
        
        console.log('🔄 Gateway AI Fallback Mode active - Basic commands available');
    };
    
    // Initialize the system
    const initialize = () => {
        console.log('🎯 Gateway AI Command System v2.0 starting initialization...');
        
        // Remove any existing AI interfaces
        const existingAI = document.querySelector('.gateway-ai-fallback');
        if (existingAI) {
            existingAI.remove();
            console.log('🔄 Removed old AI interface');
        }
        
        // Start loading the new system
        loadAIBrain();
    };
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
})();
