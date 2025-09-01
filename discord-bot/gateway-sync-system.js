// 🔄 Gateway-Discord Synchronization System
// Keeps Discord server channels synchronized with Gateway app categories

const DiscordRemoteControl = require('./remote-control.js');
const fs = require('fs').promises;
const path = require('path');

class GatewaySyncSystem {
    constructor(botUrl, apiToken, guildId) {
        this.remote = new DiscordRemoteControl(botUrl, apiToken);
        this.guildId = guildId;
        this.categoryMappings = new Map();
        
        // Initialize category mappings (Discord channel name -> Gateway category)
        this.initializeMappings();
    }

    initializeMappings() {
        // Map Discord channels to Gateway categories
        this.categoryMappings.set('search-engines', {
            gatewayPath: 'categories/search-engines',
            jsonFile: 'categories/search-engines/search-engines.json',
            displayName: 'Search Engines'
        });
        
        this.categoryMappings.set('tools-and-utilities', {
            gatewayPath: 'categories/tools',
            jsonFile: 'categories/tools/tools.json', 
            displayName: 'Tools & Utilities'
        });
        
        this.categoryMappings.set('entertainment-and-media', {
            gatewayPath: 'categories/entertainment',
            jsonFile: 'categories/entertainment/entertainment.json',
            displayName: 'Entertainment & Media'
        });
        
        this.categoryMappings.set('knowledge-and-learning', {
            gatewayPath: 'categories/knowledge',
            jsonFile: 'categories/knowledge/knowledge.json',
            displayName: 'Knowledge & Learning'
        });
        
        this.categoryMappings.set('gaming-and-esports', {
            gatewayPath: 'categories/gaming',
            jsonFile: 'categories/gaming/gaming.json',
            displayName: 'Gaming & Esports'
        });
        
        this.categoryMappings.set('design-and-creative', {
            gatewayPath: 'categories/design',
            jsonFile: 'categories/design/design.json',
            displayName: 'Design & Creative'
        });
        
        this.categoryMappings.set('health-and-fitness', {
            gatewayPath: 'categories/health',
            jsonFile: 'categories/health/health.json',
            displayName: 'Health & Fitness'
        });
        
        this.categoryMappings.set('social-media', {
            gatewayPath: 'categories/social',
            jsonFile: 'categories/social/social.json',
            displayName: 'Social Media'
        });
        
        this.categoryMappings.set('lifestyle-and-shopping', {
            gatewayPath: 'categories/lifestyle',
            jsonFile: 'categories/lifestyle/lifestyle.json',
            displayName: 'Lifestyle & Shopping'
        });
        
        this.categoryMappings.set('hidden-treasures', {
            gatewayPath: 'categories/hidden-treasures',
            jsonFile: 'categories/hidden-treasures/hidden.json',
            displayName: 'Hidden Treasures'
        });
        
        this.categoryMappings.set('anime-and-manga', {
            gatewayPath: 'categories/anime',
            jsonFile: 'categories/anime/anime.json',
            displayName: 'Anime & Manga'
        });
        
        this.categoryMappings.set('crypto-and-blockchain', {
            gatewayPath: 'categories/crypto',
            jsonFile: 'categories/crypto/crypto.json',
            displayName: 'Crypto & Blockchain'
        });
        
        this.categoryMappings.set('developers', {
            gatewayPath: 'categories/developers',
            jsonFile: 'categories/developers/developers.json',
            displayName: 'Developers'
        });
        
        this.categoryMappings.set('music', {
            gatewayPath: 'categories/music',
            jsonFile: 'categories/music/music.json',
            displayName: 'Music'
        });
    }

    // Read and analyze a Gateway category
    async analyzeGatewayCategory(categoryInfo) {
        try {
            const jsonPath = path.resolve(categoryInfo.jsonFile);
            const jsonData = await fs.readFile(jsonPath, 'utf8');
            const categoryData = JSON.parse(jsonData);
            
            // Count resources
            let totalResources = 0;
            const sections = [];
            
            if (categoryData.sections) {
                categoryData.sections.forEach(section => {
                    const sectionCount = section.resources ? section.resources.length : 0;
                    totalResources += sectionCount;
                    sections.push({
                        name: section.name,
                        count: sectionCount,
                        description: section.description || ''
                    });
                });
            }
            
            return {
                name: categoryInfo.displayName,
                totalResources,
                sections,
                lastModified: new Date().toISOString(),
                description: categoryData.description || `Explore ${totalResources} resources in ${categoryInfo.displayName}`
            };
        } catch (error) {
            console.error(`❌ Error analyzing category ${categoryInfo.displayName}:`, error.message);
            return null;
        }
    }

    // Generate updated channel description
    generateChannelDescription(analysis) {
        if (!analysis) return null;
        
        const sectionSummary = analysis.sections
            .slice(0, 3) // Top 3 sections
            .map(s => s.name)
            .join(', ');
            
        return `${analysis.description} • ${analysis.totalResources} resources including ${sectionSummary} and more. Updated: ${new Date().toLocaleDateString()}`;
    }

    // Update a single Discord channel based on Gateway category
    async updateDiscordChannel(channelName) {
        const categoryInfo = this.categoryMappings.get(channelName);
        if (!categoryInfo) {
            console.log(`⚠️  No mapping found for channel: ${channelName}`);
            return false;
        }

        try {
            // Analyze Gateway category
            const analysis = await this.analyzeGatewayCategory(categoryInfo);
            if (!analysis) {
                return false;
            }

            // Generate new description
            const newDescription = this.generateChannelDescription(analysis);
            if (!newDescription) {
                return false;
            }

            // Get current Discord channels
            const channelsResult = await this.remote.listChannels(this.guildId);
            if (!channelsResult.success) {
                throw new Error(`Failed to list channels: ${channelsResult.error}`);
            }

            // Find the channel
            const channel = channelsResult.channels.find(c => c.name === channelName);
            if (!channel) {
                console.log(`⚠️  Discord channel not found: ${channelName}`);
                return false;
            }

            // Update channel description if changed
            if (channel.topic !== newDescription) {
                const updateResult = await this.remote.setChannelTopic(channel.id, newDescription);
                if (updateResult.success) {
                    console.log(`✅ Updated #${channelName}: ${analysis.totalResources} resources`);
                    return true;
                } else {
                    throw new Error(`Failed to update channel: ${updateResult.error}`);
                }
            } else {
                console.log(`ℹ️  #${channelName} already up to date`);
                return false;
            }

        } catch (error) {
            console.error(`❌ Failed to update #${channelName}:`, error.message);
            return false;
        }
    }

    // Sync all mapped channels
    async syncAllChannels() {
        console.log('🔄 Starting Gateway-Discord synchronization...');
        
        let updated = 0;
        let skipped = 0;
        let failed = 0;

        for (const [channelName] of this.categoryMappings) {
            try {
                const wasUpdated = await this.updateDiscordChannel(channelName);
                if (wasUpdated) {
                    updated++;
                } else {
                    skipped++;
                }
                
                // Small delay to avoid rate limits
                await new Promise(resolve => setTimeout(resolve, 1000));
                
            } catch (error) {
                failed++;
                console.error(`❌ Sync failed for #${channelName}:`, error.message);
            }
        }

        console.log('📊 Synchronization Summary:');
        console.log(`   ✅ Updated: ${updated} channels`);
        console.log(`   ⏭️ Skipped: ${skipped} channels (already up to date)`);
        if (failed > 0) {
            console.log(`   ❌ Failed: ${failed} channels`);
        }
        console.log(`   🏁 Total processed: ${updated + skipped + failed} channels`);

        return {
            updated,
            skipped,
            failed,
            total: updated + skipped + failed
        };
    }

    // Create summary update message for Discord
    async createSummaryMessage() {
        try {
            let totalResources = 0;
            const categoryStats = [];

            for (const [channelName, categoryInfo] of this.categoryMappings) {
                const analysis = await this.analyzeGatewayCategory(categoryInfo);
                if (analysis) {
                    totalResources += analysis.totalResources;
                    categoryStats.push({
                        name: analysis.name,
                        count: analysis.totalResources
                    });
                }
            }

            // Sort by resource count (descending)
            categoryStats.sort((a, b) => b.count - a.count);

            const topCategories = categoryStats.slice(0, 5)
                .map(cat => `**${cat.name}**: ${cat.count}`)
                .join('\n');

            return {
                content: '🌌 **Everything Gateway Update**\n\nDiscord channels synchronized with latest Gateway data!',
                embed: {
                    title: '📊 Current Gateway Statistics',
                    description: `**${totalResources}** total resources across **${categoryStats.length}** categories`,
                    fields: [
                        {
                            name: '🏆 Top Categories',
                            value: topCategories,
                            inline: false
                        },
                        {
                            name: '🔗 Visit Gateway',
                            value: '[cheery-flan-dc1088.netlify.app](https://cheery-flan-dc1088.netlify.app)',
                            inline: false
                        }
                    ],
                    color: 0x6366F1,
                    footer: {
                        text: `Last sync: ${new Date().toLocaleString()} • Everything Gateway`
                    }
                }
            };
        } catch (error) {
            console.error('❌ Failed to create summary message:', error.message);
            return null;
        }
    }

    // Send update notification to general channel
    async notifyUpdate(syncResults) {
        try {
            // Get channels list
            const channelsResult = await this.remote.listChannels(this.guildId);
            if (!channelsResult.success) {
                return false;
            }

            // Find general channel
            const generalChannel = channelsResult.channels.find(c => 
                c.name.includes('general') || c.name.includes('announcements')
            );

            if (!generalChannel) {
                console.log('⚠️  No general channel found for notifications');
                return false;
            }

            // Create and send summary message
            const summaryMessage = await this.createSummaryMessage();
            if (!summaryMessage) {
                return false;
            }

            const result = await this.remote.sendMessage(
                generalChannel.id,
                summaryMessage.content,
                summaryMessage.embed
            );

            if (result.success) {
                console.log('📢 Update notification sent to #' + generalChannel.name);
                return true;
            } else {
                throw new Error(result.error);
            }

        } catch (error) {
            console.error('❌ Failed to send update notification:', error.message);
            return false;
        }
    }
}

// Export the class
module.exports = GatewaySyncSystem;

// CLI usage
if (require.main === module) {
    async function runSync() {
        const BOT_URL = process.env.BOT_URL || 'https://your-bot-url.onrender.com';
        const API_TOKEN = process.env.REMOTE_API_TOKEN || 'gateway-remote-2024';
        const GUILD_ID = process.env.GUILD_ID;

        if (!GUILD_ID) {
            console.error('❌ Please set GUILD_ID environment variable');
            process.exit(1);
        }

        const sync = new GatewaySyncSystem(BOT_URL, API_TOKEN, GUILD_ID);
        
        try {
            const results = await sync.syncAllChannels();
            
            // Send notification if any channels were updated
            if (results.updated > 0) {
                await sync.notifyUpdate(results);
            }
            
            console.log('🎉 Synchronization complete!');
        } catch (error) {
            console.error('💥 Synchronization failed:', error);
            process.exit(1);
        }
    }

    runSync();
}
