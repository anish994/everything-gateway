// 🎮 Discord Bot Remote Control Helper
// This script allows remote management of the Discord bot

const https = require('https');
const http = require('http');

class DiscordRemoteControl {
    constructor(botUrl, apiToken) {
        this.botUrl = botUrl;
        this.apiToken = apiToken;
    }

    // Execute any remote action
    async executeAction(actionType, actionData) {
        const payload = {
            token: this.apiToken,
            action: {
                type: actionType,
                data: actionData
            }
        };

        return new Promise((resolve, reject) => {
            const url = new URL(`${this.botUrl}/api/remote`);
            const protocol = url.protocol === 'https:' ? https : http;

            const postData = JSON.stringify(payload);

            const options = {
                hostname: url.hostname,
                port: url.port,
                path: url.pathname,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData)
                }
            };

            const req = protocol.request(options, (res) => {
                let responseData = '';

                res.on('data', (chunk) => {
                    responseData += chunk;
                });

                res.on('end', () => {
                    try {
                        const result = JSON.parse(responseData);
                        resolve(result);
                    } catch (error) {
                        reject(new Error(`Failed to parse response: ${error.message}`));
                    }
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.write(postData);
            req.end();
        });
    }

    // Get server information
    async getGuildInfo(guildId) {
        return await this.executeAction('get_guild_info', { guildId });
    }

    // List all channels in a server
    async listChannels(guildId) {
        return await this.executeAction('list_channels', { guildId });
    }

    // Create a new channel
    async createChannel(guildId, name, type = 'GUILD_TEXT', parentId = null, topic = null) {
        return await this.executeAction('create_channel', {
            guildId,
            name,
            type,
            parentId,
            topic
        });
    }

    // Create a category
    async createCategory(guildId, name) {
        return await this.executeAction('create_category', {
            guildId,
            name
        });
    }

    // Send a message to a channel
    async sendMessage(channelId, content = null, embed = null) {
        return await this.executeAction('send_message', {
            channelId,
            content,
            embed
        });
    }

    // Pin a message
    async pinMessage(channelId, messageId) {
        return await this.executeAction('pin_message', {
            channelId,
            messageId
        });
    }

    // Set channel topic
    async setChannelTopic(channelId, topic) {
        return await this.executeAction('set_channel_topic', {
            channelId,
            topic
        });
    }

    // Bulk create channels and categories
    async bulkCreateChannels(guildId, structure) {
        return await this.executeAction('bulk_create_channels', {
            guildId,
            structure
        });
    }

    // Setup the complete Discord server structure
    async setupGatewayServer(guildId) {
        const structure = [
            {
                type: 'category',
                name: '📌 GATEWAY INFO',
                channels: [
                    {
                        name: 'welcome-and-start-here',
                        topic: '🌟 Welcome to Everything Gateway! Start your journey here with guides and essential information.'
                    },
                    {
                        name: 'categories-overview',
                        topic: '📂 Complete overview of all 13+ resource categories in the Gateway ecosystem.'
                    },
                    {
                        name: 'ai-smart-controller',
                        topic: '🧠 Learn about the AI Smart Controller - your intelligent guide to 577+ resources.'
                    },
                    {
                        name: 'app-features-guide',
                        topic: '⚙️ Discover all the powerful features and hidden gems in the Gateway app.'
                    },
                    {
                        name: 'customization-options',
                        topic: '🎨 Customize your Gateway experience with themes, settings, and personal preferences.'
                    }
                ]
            },
            {
                type: 'category',
                name: '🗂️ CATEGORIES SHOWCASE',
                channels: [
                    {
                        name: 'search-engines',
                        topic: '🔍 39 search engines: DuckDuckGo, Searx, academic search, specialized tools, privacy-focused options.'
                    },
                    {
                        name: 'tools-and-utilities',
                        topic: '🛠️ 52 essential tools: development utilities, productivity apps, system tools, file converters.'
                    },
                    {
                        name: 'entertainment-and-media',
                        topic: '🎮 51 platforms: Netflix, Spotify, gaming resources, streaming services, media discovery.'
                    },
                    {
                        name: 'news-and-trends',
                        topic: '📰 Latest news sources, tech blogs, industry insights, and trending information.'
                    },
                    {
                        name: 'knowledge-and-learning',
                        topic: '📚 53 educational resources: online courses, documentation hubs, research tools, tutorials.'
                    },
                    {
                        name: 'gaming-and-esports',
                        topic: '🎯 Gaming platforms, esports resources, game stores, streaming, competitive gaming.'
                    },
                    {
                        name: 'design-and-creative',
                        topic: '🎨 44 creative tools: Figma, design software, inspiration platforms, asset libraries.'
                    },
                    {
                        name: 'health-and-fitness',
                        topic: '💪 Health apps, fitness tracking, nutrition guides, wellness platforms, workout resources.'
                    },
                    {
                        name: 'social-media',
                        topic: '👥 47 social platforms: Discord, Twitter, professional networks, community tools.'
                    },
                    {
                        name: 'lifestyle-and-shopping',
                        topic: '🛒 E-commerce, lifestyle management, shopping deals, product discovery, daily life tools.'
                    },
                    {
                        name: 'hidden-treasures',
                        topic: '⚡ Secret tools and underground gems: power user secrets, developer underground, creative black market.'
                    },
                    {
                        name: 'anime-and-manga',
                        topic: '🌟 Anime streaming, manga reading, community tracking, news, and industry resources.'
                    },
                    {
                        name: 'crypto-and-blockchain',
                        topic: '💰 Cryptocurrency platforms, blockchain tools, DeFi, NFTs, trading, portfolio management.'
                    },
                    {
                        name: 'developers',
                        topic: '👨‍💻 49 developer resources: GitHub, APIs, development platforms, coding tools, documentation.'
                    },
                    {
                        name: 'music',
                        topic: '🎵 Music streaming, discovery, creation tools, audio production, podcast platforms, radio.'
                    }
                ]
            },
            {
                type: 'category',
                name: '💬 COMMUNITY',
                channels: [
                    {
                        name: 'general-chat',
                        topic: '💭 General discussion about resources, tools, and the Gateway ecosystem.'
                    },
                    {
                        name: 'suggestions-and-ideas',
                        topic: '🤝 Share your ideas for new features, resources, or improvements to the Gateway.'
                    },
                    {
                        name: 'bug-reports-and-feedback',
                        topic: '🐛 Report bugs, issues, or provide feedback to help improve the Gateway experience.'
                    },
                    {
                        name: 'showcase-your-finds',
                        topic: '🎉 Show off cool resources you discovered, share your projects, and celebrate wins!'
                    }
                ]
            }
        ];

        return await this.bulkCreateChannels(guildId, structure);
    }
}

module.exports = DiscordRemoteControl;

// Example usage for testing
if (require.main === module) {
    async function test() {
        // Replace with your bot's actual URL and token
        const botUrl = process.env.BOT_URL || 'http://localhost:3000';
        const apiToken = process.env.REMOTE_API_TOKEN || 'gateway-remote-2024';
        const guildId = process.env.GUILD_ID; // Your Discord server ID

        if (!guildId) {
            console.log('❌ Please set GUILD_ID environment variable with your Discord server ID');
            return;
        }

        const remote = new DiscordRemoteControl(botUrl, apiToken);

        try {
            console.log('🎮 Testing remote control connection...');
            
            // Get server info
            const guildInfo = await remote.getGuildInfo(guildId);
            console.log('✅ Guild info:', guildInfo);

            // List existing channels
            const channels = await remote.listChannels(guildId);
            console.log('✅ Current channels:', channels.success ? channels.channels.length : 'Failed');

            // Setup the complete server structure (uncomment to run)
            // console.log('🏗️ Setting up Gateway server structure...');
            // const setupResult = await remote.setupGatewayServer(guildId);
            // console.log('✅ Setup complete:', setupResult);

        } catch (error) {
            console.error('❌ Remote control error:', error.message);
        }
    }

    test();
}
