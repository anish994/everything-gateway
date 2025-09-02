// 🌟 Discord Channel Content Population Script
// This fills all channels with beautiful, informative content

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const GUILD_ID = '1411262001652432928';

// Channel content data
const channelContent = {
    // GATEWAY INFO CATEGORY
    'welcome-and-start-here': {
        embed: {
            title: '🌟 Welcome to Everything Gateway!',
            description: 'Your gateway to 577+ handpicked resources across 15 categories!',
            color: 0x6366F1,
            fields: [
                {
                    name: '🚀 Quick Start',
                    value: '• Visit [Everything Gateway](https://cheery-flan-dc1088.netlify.app)\n• Try the AI Smart Controller (🧠 button)\n• Explore categories with `/list-categories`',
                    inline: false
                },
                {
                    name: '🗂️ What You\'ll Find',
                    value: '• 577+ Quality-verified resources\n• 15 Major categories\n• AI-powered navigation\n• Hidden gems and secret tools',
                    inline: true
                },
                {
                    name: '💬 How to Use This Server',
                    value: '• Browse category channels below\n• Ask questions in #general-chat\n• Share discoveries in #showcase-your-finds\n• Report issues in #bug-reports-and-feedback',
                    inline: true
                }
            ],
            footer: { text: 'Built with passion • One person, one laptop, big dreams 🌌' }
        },
        pin: true
    },

    'categories-overview': {
        embed: {
            title: '📂 Complete Categories Overview',
            description: 'Explore 577+ resources across 15 carefully curated categories',
            color: 0x8B5CF6,
            fields: [
                {
                    name: '🔍 Search & Discovery',
                    value: '**Search Engines** (39) - DuckDuckGo, Searx, Academic search\n**Hidden Treasures** (80+) - Secret tools, underground gems',
                    inline: true
                },
                {
                    name: '🛠️ Tools & Development', 
                    value: '**Tools & Utilities** (52) - Productivity, system tools\n**Developers** (49) - GitHub, APIs, coding platforms',
                    inline: true
                },
                {
                    name: '🎨 Creative & Design',
                    value: '**Design & Creative** (44) - Figma, creative software\n**Music** (40+) - Streaming, creation, discovery',
                    inline: true
                },
                {
                    name: '🎮 Entertainment & Media',
                    value: '**Entertainment** (51) - Netflix, gaming, streaming\n**Anime & Manga** (48) - Streaming, reading, community',
                    inline: true
                },
                {
                    name: '📚 Knowledge & Learning',
                    value: '**Knowledge** (53) - Courses, documentation, research\n**News & Trends** (38+) - Tech news, industry insights',
                    inline: true
                },
                {
                    name: '🌐 Social & Lifestyle',
                    value: '**Social Media** (47) - Platforms, communities\n**Lifestyle & Shopping** (48) - E-commerce, daily life\n**Health & Fitness** (43) - Wellness, tracking, nutrition',
                    inline: true
                },
                {
                    name: '🎯 Specialized',
                    value: '**Gaming & Esports** (42) - Competitive gaming, stores\n**Crypto & Blockchain** (45) - Trading, DeFi, NFTs',
                    inline: false
                }
            ],
            footer: { text: 'Every resource is handpicked and quality-verified ✨' }
        },
        pin: true
    },

    'ai-smart-controller': {
        embed: {
            title: '🧠 AI Smart Controller Guide',
            description: 'Your intelligent companion for navigating 577+ resources',
            color: 0x6366F1,
            fields: [
                {
                    name: '⚡ What It Does',
                    value: '• **Natural Language Commands** - Just type what you want\n• **Smart Category Navigation** - Opens any category instantly\n• **Direct App Launching** - Opens specific tools by name\n• **Context-Aware Responses** - Understands your intent',
                    inline: false
                },
                {
                    name: '🎯 How to Use It',
                    value: '1. **Click the 🧠 AI button** on the main site\n2. **Type naturally** like "open design tools"\n3. **Use quick commands** like `/open tools`\n4. **Ask questions** like "show me video editors"',
                    inline: false
                },
                {
                    name: '💡 Example Commands',
                    value: '```\nopen search engines\nfind figma\nshow me crypto platforms\nI need video editing tools\nopen hidden treasures\ntake me to developers\n```',
                    inline: false
                },
                {
                    name: '🌟 Smart Features',
                    value: '• **Keyboard Shortcut** - Ctrl+I or Alt+G\n• **Mobile Optimized** - Works perfectly on phones\n• **Instant Results** - Zero loading time\n• **Always Learning** - Gets smarter with updates',
                    inline: false
                }
            ],
            footer: { text: 'AI Smart Controller • Lightweight & Lightning Fast ⚡' }
        },
        pin: true
    },

    'app-features-guide': {
        embed: {
            title: '⚙️ Gateway App Features Guide',
            description: 'Discover all the powerful features and hidden gems',
            color: 0x10B981,
            fields: [
                {
                    name: '🔍 Universal Search',
                    value: '• **Ctrl+K** - Instant search across all categories\n• **Smart Filtering** - Find exactly what you need\n• **Category Browsing** - Explore by topic\n• **Quick Access** - Bookmarks and favorites',
                    inline: false
                },
                {
                    name: '🧠 AI Features',
                    value: '• **Smart Controller** - Natural language navigation\n• **Intelligent Suggestions** - Context-aware recommendations\n• **Quick Commands** - Instant app launching\n• **Voice Search** - Coming soon!',
                    inline: false
                },
                {
                    name: '🎨 Customization',
                    value: '• **Theme Selection** - Dark, light, auto modes\n• **Layout Options** - Compact, comfortable, spacious\n• **Personal Settings** - Customize your experience\n• **Accessibility** - Screen reader friendly',
                    inline: false
                },
                {
                    name: '📱 Cross-Platform',
                    value: '• **Responsive Design** - Perfect on any device\n• **Mobile Optimized** - Touch-friendly interface\n• **Fast Loading** - Lightweight and speedy\n• **Offline Ready** - Core features work offline',
                    inline: false
                }
            ],
            footer: { text: 'More features coming with community feedback! 🚀' }
        },
        pin: true
    },

    'customization-options': {
        embed: {
            title: '🎨 Customization Options',
            description: 'Make Everything Gateway truly yours',
            color: 0xEC4899,
            fields: [
                {
                    name: '🌓 Theme Options',
                    value: '• **Dark Mode** - Easy on the eyes\n• **Light Mode** - Clean and bright\n• **Auto Mode** - Follows system preference\n• **Custom Accents** - Choose your color',
                    inline: false
                },
                {
                    name: '📐 Layout Settings',
                    value: '• **Compact View** - More items on screen\n• **Comfortable** - Balanced spacing (default)\n• **Spacious** - Extra breathing room\n• **Grid Density** - Customize item spacing',
                    inline: false
                },
                {
                    name: '⚡ Performance',
                    value: '• **Animation Level** - Subtle, normal, enhanced\n• **Loading Preferences** - Lazy loading options\n• **Cache Settings** - Optimize for your usage\n• **Bandwidth Mode** - Data-saving options',
                    inline: false
                },
                {
                    name: '♿ Accessibility',
                    value: '• **High Contrast** - Better visibility\n• **Large Text** - Easier reading\n• **Reduced Motion** - Less animations\n• **Screen Reader** - Full ARIA support',
                    inline: false
                }
            ],
            footer: { text: 'Settings sync across devices • Everything Gateway ✨' }
        },
        pin: true
    },

    // COMMUNITY CATEGORY
    'general-chat': {
        embed: {
            title: '💭 Welcome to General Chat!',
            description: 'The heart of the Everything Gateway community',
            color: 0xF59E0B,
            fields: [
                {
                    name: '🗣️ Chat Guidelines',
                    value: '• **Be respectful** - We\'re all here to help each other\n• **Stay on topic** - Resources, tools, and Gateway discussions\n• **Share discoveries** - Found something cool? Tell us!\n• **Ask questions** - No question is too small',
                    inline: false
                },
                {
                    name: '🤖 Bot Commands',
                    value: '• `/gateway-help` - See all available commands\n• `/random-resource` - Discover something new\n• `/list-categories` - Browse all categories\n• `@The Everything Gateway` - Chat with AI',
                    inline: false
                },
                {
                    name: '🌟 What to Discuss',
                    value: '• **Resource recommendations** - Share your favorites\n• **App feedback** - How can we improve?\n• **Hidden gems** - Know any secret tools?\n• **Use cases** - How do you use Gateway?',
                    inline: false
                }
            ],
            footer: { text: 'Let\'s build something amazing together! 🌌' }
        },
        pin: true
    },

    'suggestions-and-ideas': {
        embed: {
            title: '🤝 Suggestions & Ideas',
            description: 'Help shape the future of Everything Gateway!',
            color: 0x06B6D4,
            fields: [
                {
                    name: '💡 What We\'re Looking For',
                    value: '• **New resource categories** - What\'s missing?\n• **Feature requests** - What would make Gateway better?\n• **UI/UX improvements** - Design suggestions welcome\n• **Integration ideas** - What tools should we connect?',
                    inline: false
                },
                {
                    name: '📝 How to Suggest',
                    value: '• **Be specific** - Detailed suggestions are most helpful\n• **Explain why** - What problem does it solve?\n• **Consider others** - Would this benefit the community?\n• **Stay constructive** - We\'re all learning together',
                    inline: false
                },
                {
                    name: '🚀 Current Roadmap',
                    value: '• **Theme customization** - More personalization options\n• **Advanced search** - Better filtering and sorting\n• **Community features** - User profiles and sharing\n• **Mobile app** - Native iOS and Android apps',
                    inline: false
                }
            ],
            footer: { text: 'Every great idea started with a suggestion ✨' }
        },
        pin: true
    },

    'showcase-your-finds': {
        embed: {
            title: '🎉 Showcase Your Finds!',
            description: 'Share your discoveries and celebrate wins with the community',
            color: 0x10B981,
            fields: [
                {
                    name: '🌟 What to Share',
                    value: '• **Cool new tools** - Found something amazing?\n• **Hidden gems** - Secret resources you discovered\n• **Useful workflows** - How you use Gateway tools together\n• **Success stories** - Gateway helped you complete a project',
                    inline: false
                },
                {
                    name: '📸 How to Share',
                    value: '• **Screenshots** - Show us what you found\n• **Brief description** - What makes it special?\n• **Use case** - How you\'re using it\n• **Link** - Help others find it too',
                    inline: false
                },
                {
                    name: '🏆 Community Highlights',
                    value: 'Amazing discoveries get featured in:\n• **Gateway app updates**\n• **Social media posts**\n• **Community newsletter**\n• **Special recognition**',
                    inline: false
                }
            ],
            footer: { text: 'Your discoveries inspire the whole community! 🌟' }
        },
        pin: true
    }
};

async function populateChannels() {
    console.log('🌟 Populating Everything Gateway Discord Channels');
    console.log('===============================================');
    console.log('');

    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) {
        console.error('❌ Guild not found!');
        return;
    }

    console.log(`✅ Connected to: ${guild.name}`);
    console.log('');

    let messagesCreated = 0;
    let messagesPinned = 0;
    let failed = 0;

    for (const [channelName, content] of Object.entries(channelContent)) {
        try {
            console.log(`📝 Populating #${channelName}...`);
            
            // Find the channel
            const channel = guild.channels.cache.find(c => c.name === channelName);
            
            if (!channel) {
                console.log(`⚠️  Channel #${channelName} not found, skipping`);
                continue;
            }

            // Create embed
            const embed = new EmbedBuilder()
                .setTitle(content.embed.title)
                .setDescription(content.embed.description)
                .setColor(content.embed.color)
                .setTimestamp();

            // Add fields
            if (content.embed.fields) {
                content.embed.fields.forEach(field => {
                    embed.addFields(field);
                });
            }

            // Add footer
            if (content.embed.footer) {
                embed.setFooter(content.embed.footer);
            }

            // Send message
            const message = await channel.send({ embeds: [embed] });
            messagesCreated++;
            console.log(`✅ Created message in #${channelName}`);

            // Pin message if specified
            if (content.pin) {
                await message.pin();
                messagesPinned++;
                console.log(`📌 Pinned message in #${channelName}`);
            }

            // Small delay to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 1500));

        } catch (error) {
            failed++;
            console.log(`❌ Failed to populate #${channelName}: ${error.message}`);
        }
    }

    // Add a welcome message to general-chat
    try {
        const generalChannel = guild.channels.cache.find(c => c.name === 'general-chat');
        if (generalChannel) {
            const welcomeMessage = await generalChannel.send(
                "🌌 **Welcome to Everything Gateway!** This is where our community comes together to discover, share, and celebrate amazing resources. Feel free to introduce yourself, ask questions, or share your latest discoveries! \n\n*Try `/gateway-help` to see what I can do!* 🤖"
            );
            messagesCreated++;
            console.log(`✅ Added welcome message to #general-chat`);
        }
    } catch (error) {
        console.log(`❌ Failed to add welcome message: ${error.message}`);
    }

    console.log('');
    console.log('🎉 Channel population complete!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   💬 Messages created: ${messagesCreated}`);
    console.log(`   📌 Messages pinned: ${messagesPinned}`);
    if (failed > 0) {
        console.log(`   ❌ Failed: ${failed} items`);
    }
    console.log('');
    console.log('🔗 Your Discord server is now fully populated with rich content!');
    console.log('🌟 Users will have detailed guides and information in every channel!');
}

// Start the process
client.once('ready', async () => {
    console.log(`🤖 Content bot connected as ${client.user.tag}`);
    
    try {
        await populateChannels();
    } catch (error) {
        console.error('💥 Error populating channels:', error);
    } finally {
        console.log('');
        console.log('🔄 Disconnecting bot...');
        client.destroy();
        process.exit(0);
    }
});

client.login(process.env.DISCORD_TOKEN);
