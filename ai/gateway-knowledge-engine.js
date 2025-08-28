/**
 * 🧠 Gateway AI Knowledge Discovery Engine v1.0
 * Dynamically discovers and catalogs the entire Gateway universe
 * 
 * This is the AI's brain - it learns everything about the Gateway by reading JSON data
 * Creates local knowledge base using IndexedDB for instant access
 */

class GatewayKnowledgeEngine {
    constructor() {
        this.knowledgeBase = {
            categories: [],
            resources: {},
            totalResources: 0,
            lastUpdated: null
        };
        this.db = null;
        this.isReady = false;
        
        console.log('🧠 Gateway AI Knowledge Engine initializing...');
        this.initialize();
    }
    
    async initialize() {
        try {
            // Initialize IndexedDB for local storage
            await this.initializeDatabase();
            
            // Discover all Gateway knowledge
            await this.discoverGatewayStructure();
            
            this.isReady = true;
            console.log('✅ Gateway AI Knowledge Engine fully operational!');
            console.log(`📊 Knowledge Base: ${this.knowledgeBase.categories.length} categories, ${this.knowledgeBase.totalResources}+ resources`);
            
            // Trigger ready event
            window.dispatchEvent(new CustomEvent('gatewayAIReady', { 
                detail: { knowledgeBase: this.knowledgeBase } 
            }));
            
        } catch (error) {
            console.error('❌ Gateway AI Knowledge Engine failed to initialize:', error);
        }
    }
    
    async initializeDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('GatewayAI_Knowledge', 1);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                console.log('💾 IndexedDB initialized for Gateway AI knowledge storage');
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Store categories
                if (!db.objectStoreNames.contains('categories')) {
                    db.createObjectStore('categories', { keyPath: 'id' });
                }
                
                // Store resources
                if (!db.objectStoreNames.contains('resources')) {
                    db.createObjectStore('resources', { keyPath: 'category' });
                }
                
                // Store user patterns and memory
                if (!db.objectStoreNames.contains('userMemory')) {
                    db.createObjectStore('userMemory', { keyPath: 'key' });
                }
                
                console.log('🏗️ IndexedDB schema created for Gateway AI');
            };
        });
    }
    
    async discoverGatewayStructure() {
        console.log('🔍 Discovering Gateway structure...');
        
        try {
            // Load categories metadata
            const categoriesResponse = await fetch('data/categories.json');
            const categoriesData = await categoriesResponse.json();
            
            this.knowledgeBase.categories = categoriesData.categories;
            this.knowledgeBase.totalResources = categoriesData.metadata.totalPlatforms;
            this.knowledgeBase.lastUpdated = new Date().toISOString();
            
            console.log(`📚 Discovered ${this.knowledgeBase.categories.length} categories`);
            
            // Load individual category resources
            for (const category of this.knowledgeBase.categories) {
                try {
                    const resourceResponse = await fetch(`data/${category.id}.json`);
                    if (resourceResponse.ok) {
                        const resourceData = await resourceResponse.json();
                        this.knowledgeBase.resources[category.id] = resourceData;
                        console.log(`📂 Loaded ${category.name}: ${this.countResourcesInCategory(resourceData)} resources`);
                    }
                } catch (err) {
                    console.warn(`⚠️ Could not load resources for ${category.name}:`, err);
                }
            }
            
            // Save to IndexedDB
            await this.saveKnowledgeToDatabase();
            
        } catch (error) {
            console.error('❌ Failed to discover Gateway structure:', error);
        }
    }
    
    countResourcesInCategory(categoryData) {
        let count = 0;
        if (categoryData.sections) {
            categoryData.sections.forEach(section => {
                if (section.platforms) {
                    count += section.platforms.length;
                }
            });
        }
        return count;
    }
    
    async saveKnowledgeToDatabase() {
        if (!this.db) return;
        
        const transaction = this.db.transaction(['categories', 'resources'], 'readwrite');
        
        // Save categories
        const categoriesStore = transaction.objectStore('categories');
        for (const category of this.knowledgeBase.categories) {
            await categoriesStore.put(category);
        }
        
        // Save resources
        const resourcesStore = transaction.objectStore('resources');
        for (const [categoryId, resources] of Object.entries(this.knowledgeBase.resources)) {
            await resourcesStore.put({ category: categoryId, data: resources });
        }
        
        console.log('💾 Gateway knowledge saved to local database');
    }
    
    // 🎯 QUERY METHODS FOR AI TO USE
    
    findCategory(query) {
        const lowercaseQuery = query.toLowerCase();
        return this.knowledgeBase.categories.find(cat => 
            cat.name.toLowerCase().includes(lowercaseQuery) ||
            cat.id.toLowerCase().includes(lowercaseQuery) ||
            cat.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
        );
    }
    
    searchResources(query) {
        const results = [];
        const lowercaseQuery = query.toLowerCase();
        
        for (const [categoryId, categoryData] of Object.entries(this.knowledgeBase.resources)) {
            if (categoryData.sections) {
                categoryData.sections.forEach(section => {
                    if (section.platforms) {
                        section.platforms.forEach(platform => {
                            if (platform.name.toLowerCase().includes(lowercaseQuery) ||
                                platform.description.toLowerCase().includes(lowercaseQuery)) {
                                results.push({
                                    ...platform,
                                    category: categoryId,
                                    section: section.title
                                });
                            }
                        });
                    }
                });
            }
        }
        
        return results;
    }
    
    getCategoryResources(categoryId) {
        return this.knowledgeBase.resources[categoryId] || null;
    }
    
    getAllCategories() {
        return this.knowledgeBase.categories;
    }
    
    getKnowledgeStats() {
        return {
            categories: this.knowledgeBase.categories.length,
            totalResources: this.knowledgeBase.totalResources,
            lastUpdated: this.knowledgeBase.lastUpdated,
            isReady: this.isReady
        };
    }
    
    // 🧠 USER MEMORY SYSTEM
    
    async saveUserMemory(key, data) {
        if (!this.db) return;
        
        const transaction = this.db.transaction(['userMemory'], 'readwrite');
        const store = transaction.objectStore('userMemory');
        
        await store.put({
            key: key,
            data: data,
            timestamp: new Date().toISOString()
        });
        
        console.log(`🧠 Saved user memory: ${key}`);
    }
    
    async getUserMemory(key) {
        if (!this.db) return null;
        
        const transaction = this.db.transaction(['userMemory'], 'readonly');
        const store = transaction.objectStore('userMemory');
        const result = await store.get(key);
        
        return result ? result.data : null;
    }
    
    // 🎯 SMART RECOMMENDATIONS
    
    getSmartRecommendations(intent) {
        const recommendations = [];
        
        // Analyze intent and provide relevant categories/resources
        if (intent.includes('code') || intent.includes('dev')) {
            const toolsCategory = this.findCategory('tools');
            if (toolsCategory) {
                recommendations.push({
                    type: 'category',
                    category: toolsCategory,
                    reason: 'Tools & Utilities has 52 developer resources'
                });
            }
        }
        
        if (intent.includes('entertain') || intent.includes('relax') || intent.includes('fun')) {
            const entertainmentCategory = this.findCategory('entertainment');
            if (entertainmentCategory) {
                recommendations.push({
                    type: 'category',
                    category: entertainmentCategory,
                    reason: 'Entertainment & Media has 51 streaming and gaming platforms'
                });
            }
        }
        
        if (intent.includes('learn') || intent.includes('study') || intent.includes('research')) {
            const knowledgeCategory = this.findCategory('knowledge');
            if (knowledgeCategory) {
                recommendations.push({
                    type: 'category',
                    category: knowledgeCategory,
                    reason: 'Knowledge & Learning has 53 educational platforms'
                });
            }
        }
        
        return recommendations;
    }
}

// Initialize the Gateway AI Knowledge Engine
window.GatewayKnowledgeEngine = GatewayKnowledgeEngine;

// Auto-initialize when loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.gatewayAI_Knowledge = new GatewayKnowledgeEngine();
    });
} else {
    window.gatewayAI_Knowledge = new GatewayKnowledgeEngine();
}

console.log('🚀 Gateway AI Knowledge Engine loaded and ready to discover the universe!');
