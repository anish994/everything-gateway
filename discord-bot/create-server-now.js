// 🚀 Direct Discord Server Creation Script
// This script works with the already running bot to create the server structure

const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const GUILD_ID = '1411262001652432928';

// Complete server structure
const serverStructure = [
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

async function createServerStructure() {
    console.log('🌌 Creating Everything Gateway Discord Server Structure');
    console.log('==================================================');
    console.log('');

    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) {
        console.error('❌ Guild not found! Make sure the bot is in your server.');
        return;
    }

    console.log(`✅ Connected to server: ${guild.name}`);
    console.log(`📊 Current channels: ${guild.channels.cache.size}`);
    console.log('');

    let categoriesCreated = 0;
    let channelsCreated = 0;
    let failed = 0;

    for (const section of serverStructure) {
        try {
            console.log(`📁 Creating category: ${section.name}`);
            
            // Create category
            const category = await guild.channels.create({
                name: section.name,
                type: 4 // GUILD_CATEGORY
            });
            
            categoriesCreated++;
            console.log(`✅ Created category: ${section.name}`);

            // Create channels in this category
            for (const channelData of section.channels) {
                try {
                    const channel = await guild.channels.create({
                        name: channelData.name,
                        type: 0, // GUILD_TEXT
                        parent: category.id,
                        topic: channelData.topic
                    });
                    
                    channelsCreated++;
                    console.log(`✅ Created channel: #${channelData.name}`);
                    
                    // Small delay to avoid rate limits
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                } catch (error) {
                    failed++;
                    console.log(`❌ Failed to create channel ${channelData.name}: ${error.message}`);
                }
            }

            console.log('');
            
        } catch (error) {
            failed++;
            console.log(`❌ Failed to create category ${section.name}: ${error.message}`);
        }
    }

    console.log('🎉 Server structure creation complete!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   📁 Categories: ${categoriesCreated} created`);
    console.log(`   📄 Channels: ${channelsCreated} created`);
    if (failed > 0) {
        console.log(`   ❌ Failed: ${failed} items`);
    }
    console.log('');
    console.log('🔗 Visit your Discord server to see the new structure!');
    console.log('🌌 Everything Gateway Discord server is ready!');
}

// Start the process
client.once('ready', async () => {
    console.log(`🤖 Bot connected as ${client.user.tag}`);
    
    try {
        await createServerStructure();
    } catch (error) {
        console.error('💥 Error creating server structure:', error);
    } finally {
        console.log('');
        console.log('🔄 Disconnecting bot...');
        client.destroy();
        process.exit(0);
    }
});

client.login(process.env.DISCORD_TOKEN);
