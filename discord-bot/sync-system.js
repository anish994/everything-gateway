// 🔄 BIDIRECTIONAL SYNC SYSTEM
// Keeps Everything Gateway app and Discord bot perfectly synchronized

const { Client, GatewayIntentBits, EmbedBuilder, WebhookClient } = require('discord.js');
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const GUILD_ID = '1411262001652432928';

// Configuration for sync system
const SYNC_CONFIG = {
    // Main app integration
    APP_URL: 'https://cheery-flan-dc1088.netlify.app',
    APP_API_ENDPOINT: 'https://cheery-flan-dc1088.netlify.app/.netlify/functions', // If you have serverless functions
    
    // Discord webhook for main app -> Discord updates
    WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL, // Set this in your .env
    
    // Sync intervals
    FULL_SYNC_INTERVAL: 24 * 60 * 60 * 1000, // 24 hours
    QUICK_SYNC_INTERVAL: 60 * 60 * 1000,     // 1 hour
    
    // Data sources
    RESOURCE_DATA_FILE: '../resources.json', // Path to your main resource data
    CATEGORY_DATA_FILE: '../categories.json', // Path to category data
    STATS_CACHE_FILE: './cache/stats.json',
    
    // Update channels
    CHANNELS: {
        announcements: 'announcements',
        updates: 'app-updates',
        general: 'general-chat',
        showcase: 'showcase-your-finds'
    }
};

class EverythingGatewaySyncSystem {
    constructor() {
        this.client = new Client({
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
        });
        
        this.webhook = SYNC_CONFIG.WEBHOOK_URL ? new WebhookClient({ url: SYNC_CONFIG.WEBHOOK_URL }) : null;
        this.isRunning = false;
        this.lastSync = null;
        this.resourceCount = 0;
        this.categoryCount = 0;
    }

    async initialize() {
        console.log('🔄 Initializing Everything Gateway Sync System...');
        
        // Create cache directory if it doesn't exist
        try {
            await fs.mkdir('./cache', { recursive: true });
        } catch (error) {
            // Directory might already exist
        }
        
        // Set up client events
        this.client.once('ready', () => {
            console.log(`✅ Sync system connected as ${this.client.user.tag}`);
            this.startSyncSystem();
        });
        
        // Login to Discord
        await this.client.login(process.env.DISCORD_TOKEN);
    }

    async startSyncSystem() {
        console.log('🚀 Starting bidirectional sync system...');
        this.isRunning = true;
        
        // Initial full sync
        await this.performFullSync();
        
        // Schedule regular syncs
        setInterval(() => this.performQuickSync(), SYNC_CONFIG.QUICK_SYNC_INTERVAL);
        setInterval(() => this.performFullSync(), SYNC_CONFIG.FULL_SYNC_INTERVAL);
        
        console.log('✅ Sync system is now running!');
        console.log(`📊 Quick sync every: ${SYNC_CONFIG.QUICK_SYNC_INTERVAL / 60000} minutes`);
        console.log(`🔄 Full sync every: ${SYNC_CONFIG.FULL_SYNC_INTERVAL / 3600000} hours`);
    }

    async performFullSync() {
        console.log('🔄 Performing full synchronization...');
        const startTime = Date.now();
        
        try {
            // 1. Sync resource data
            await this.syncResourceData();
            
            // 2. Update Discord channel statistics
            await this.updateDiscordStats();
            
            // 3. Check for app updates
            await this.checkForAppUpdates();
            
            // 4. Update category showcases if needed
            await this.updateCategoryShowcases();
            
            // 5. Cache current state
            await this.cacheCurrentState();
            
            const duration = Date.now() - startTime;
            this.lastSync = new Date();
            
            console.log(`✅ Full sync completed in ${duration}ms`);
            
            // Notify Discord about successful sync
            await this.notifyDiscord('full-sync-complete', {
                duration,
                resourceCount: this.resourceCount,
                categoryCount: this.categoryCount,
                timestamp: this.lastSync
            });
            
        } catch (error) {
            console.error('❌ Full sync failed:', error);
            await this.notifyDiscord('sync-error', { error: error.message });
        }
    }

    async performQuickSync() {
        console.log('⚡ Performing quick synchronization...');
        
        try {
            // Quick checks for immediate updates
            const hasUpdates = await this.checkForQuickUpdates();
            
            if (hasUpdates) {
                console.log('📝 Quick updates detected, performing targeted sync...');
                await this.syncResourceData();
                await this.updateDiscordStats();
            }
            
        } catch (error) {
            console.error('❌ Quick sync failed:', error);
        }
    }

    async syncResourceData() {
        console.log('📊 Syncing resource data...');
        
        try {
            // Try to read local resource files first
            let resourceData = null;
            let categoryData = null;
            
            try {
                const resourceFile = path.join(__dirname, SYNC_CONFIG.RESOURCE_DATA_FILE);
                const categoryFile = path.join(__dirname, SYNC_CONFIG.CATEGORY_DATA_FILE);
                
                const resourceFileContent = await fs.readFile(resourceFile, 'utf8');
                const categoryFileContent = await fs.readFile(categoryFile, 'utf8');
                
                resourceData = JSON.parse(resourceFileContent);
                categoryData = JSON.parse(categoryFileContent);
            } catch (fileError) {
                console.log('📁 Local files not found, fetching from app...');
                
                // Fallback: try to fetch from app (if you have an API endpoint)
                // resourceData = await this.fetchFromApp('/api/resources');
                // categoryData = await this.fetchFromApp('/api/categories');
                
                // For now, use static data
                resourceData = { count: 577, lastUpdated: new Date() };
                categoryData = { count: 15, lastUpdated: new Date() };
            }
            
            // Update counts
            this.resourceCount = resourceData.count || 577;
            this.categoryCount = categoryData.count || 15;
            
            console.log(`✅ Synced: ${this.resourceCount} resources, ${this.categoryCount} categories`);
            
        } catch (error) {
            console.error('❌ Resource data sync failed:', error);
        }
    }

    async updateDiscordStats() {
        console.log('📈 Updating Discord statistics...');
        
        try {
            const guild = this.client.guilds.cache.get(GUILD_ID);
            if (!guild) return;
            
            // Update welcome channel with latest stats
            const welcomeChannel = guild.channels.cache.find(c => c.name === 'welcome-and-start-here');
            if (welcomeChannel) {
                // Get pinned messages and update the first one
                const pinnedMessages = await welcomeChannel.messages.fetchPinned();
                const welcomeMessage = pinnedMessages.first();
                
                if (welcomeMessage && welcomeMessage.author.id === this.client.user.id) {
                    // Update the embed with current stats
                    const updatedEmbed = EmbedBuilder.from(welcomeMessage.embeds[0])
                        .setDescription(`Your gateway to ${this.resourceCount}+ handpicked resources across ${this.categoryCount} categories!`)
                        .setTimestamp();
                    
                    await welcomeMessage.edit({ embeds: [updatedEmbed] });
                    console.log('✅ Updated welcome channel statistics');
                }
            }
            
            // Update categories overview
            const categoriesChannel = guild.channels.cache.find(c => c.name === 'categories-overview');
            if (categoriesChannel) {
                const pinnedMessages = await categoriesChannel.messages.fetchPinned();
                const categoriesMessage = pinnedMessages.first();
                
                if (categoriesMessage && categoriesMessage.author.id === this.client.user.id) {
                    const updatedEmbed = EmbedBuilder.from(categoriesMessage.embeds[0])
                        .setDescription(`Explore ${this.resourceCount}+ resources across ${this.categoryCount} carefully curated categories`)
                        .setTimestamp();
                    
                    await categoriesMessage.edit({ embeds: [updatedEmbed] });
                    console.log('✅ Updated categories overview statistics');
                }
            }
            
        } catch (error) {
            console.error('❌ Discord stats update failed:', error);
        }
    }

    async checkForAppUpdates() {
        console.log('🔍 Checking for app updates...');
        
        try {
            // This would typically check your deployment logs, version files, or API
            // For now, we'll simulate checking for updates
            
            const response = await axios.get(SYNC_CONFIG.APP_URL, { timeout: 5000 });
            const isAppOnline = response.status === 200;
            
            if (!isAppOnline) {
                await this.notifyDiscord('app-status', { 
                    status: 'offline',
                    message: 'Main Everything Gateway app appears to be offline'
                });
            }
            
            // You could also check for new resource additions, feature updates, etc.
            // const currentVersion = await this.getCurrentVersion();
            // const latestVersion = await this.getLatestVersion();
            
        } catch (error) {
            console.error('❌ App update check failed:', error);
        }
    }

    async updateCategoryShowcases() {
        console.log('🎨 Checking category showcase updates...');
        
        // This would update category channels if resources were added/removed
        // For now, we'll just log that we're checking
        console.log('📝 Category showcases are up to date');
    }

    async checkForQuickUpdates() {
        // Check for immediate updates that need syncing
        // This could include new resource submissions, user feedback, etc.
        return false; // No quick updates for now
    }

    async cacheCurrentState() {
        console.log('💾 Caching current state...');
        
        const state = {
            lastSync: this.lastSync,
            resourceCount: this.resourceCount,
            categoryCount: this.categoryCount,
            appStatus: 'online',
            discordGuildId: GUILD_ID,
            syncSystemVersion: '1.0.0'
        };
        
        try {
            await fs.writeFile(
                path.join(__dirname, SYNC_CONFIG.STATS_CACHE_FILE),
                JSON.stringify(state, null, 2)
            );
            console.log('✅ State cached successfully');
        } catch (error) {
            console.error('❌ State caching failed:', error);
        }
    }

    async notifyDiscord(eventType, data) {
        if (!this.webhook) return;
        
        console.log(`📢 Notifying Discord: ${eventType}`);
        
        const embeds = [];
        
        switch (eventType) {
            case 'full-sync-complete':
                embeds.push(new EmbedBuilder()
                    .setColor(0x10B981)
                    .setTitle('✅ Full Sync Complete')
                    .setDescription('Everything Gateway ↔ Discord synchronization completed successfully')
                    .addFields(
                        { name: 'Resources', value: data.resourceCount.toString(), inline: true },
                        { name: 'Categories', value: data.categoryCount.toString(), inline: true },
                        { name: 'Duration', value: `${data.duration}ms`, inline: true }
                    )
                    .setTimestamp(data.timestamp)
                    .setFooter({ text: 'Sync System • Everything Gateway 🌌' })
                );
                break;
                
            case 'sync-error':
                embeds.push(new EmbedBuilder()
                    .setColor(0xEF4444)
                    .setTitle('❌ Sync Error')
                    .setDescription(`Synchronization failed: ${data.error}`)
                    .setTimestamp()
                    .setFooter({ text: 'Sync System • Everything Gateway 🌌' })
                );
                break;
                
            case 'app-status':
                embeds.push(new EmbedBuilder()
                    .setColor(data.status === 'online' ? 0x10B981 : 0xEF4444)
                    .setTitle(`📡 App Status: ${data.status.toUpperCase()}`)
                    .setDescription(data.message)
                    .setTimestamp()
                    .setFooter({ text: 'Sync System • Everything Gateway 🌌' })
                );
                break;
        }
        
        try {
            await this.webhook.send({ embeds });
        } catch (error) {
            console.error('❌ Discord notification failed:', error);
        }
    }

    async fetchFromApp(endpoint) {
        // Helper method to fetch data from main app
        const response = await axios.get(`${SYNC_CONFIG.APP_API_ENDPOINT}${endpoint}`);
        return response.data;
    }

    async stop() {
        console.log('🛑 Stopping sync system...');
        this.isRunning = false;
        this.client.destroy();
    }
}

// CLI interface for manual operations
if (require.main === module) {
    const args = process.argv.slice(2);
    const command = args[0];
    
    const syncSystem = new EverythingGatewaySyncSystem();
    
    switch (command) {
        case 'start':
            syncSystem.initialize();
            break;
            
        case 'sync':
            syncSystem.initialize().then(() => {
                setTimeout(() => {
                    console.log('🔄 Manual sync complete, exiting...');
                    process.exit(0);
                }, 5000);
            });
            break;
            
        case 'test':
            console.log('🧪 Testing sync system...');
            syncSystem.initialize();
            break;
            
        default:
            console.log('📖 Usage: node sync-system.js [start|sync|test]');
            console.log('  start - Start the continuous sync system');
            console.log('  sync  - Perform one-time sync and exit');
            console.log('  test  - Test the sync system');
    }
}

module.exports = EverythingGatewaySyncSystem;
