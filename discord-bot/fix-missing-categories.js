// 🔧 Quick Fix for Missing Category Channels
// Entertainment & Knowledge channels population

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const GUILD_ID = '1411262001652432928';

// The two missing showcases with exact channel name matching
const missingShowcases = {
    // Try different possible channel names for entertainment
    'entertainment-and-media': {
        embed: {
            title: '🎬 Entertainment & Media Category',
            description: 'Dive into 51 amazing entertainment platforms for movies, shows, and fun!',
            color: 0xF59E0B,
            fields: [
                {
                    name: '🎭 Streaming Giants',
                    value: '• **Netflix** - Original content king\n• **Disney+** - Family entertainment\n• **Amazon Prime** - Massive library\n• **Hulu** - TV show specialist\n• **HBO Max** - Premium content',
                    inline: true
                },
                {
                    name: '🎮 Gaming & Interactive',
                    value: '• **Twitch** - Live game streaming\n• **YouTube Gaming** - Gaming content\n• **Steam** - PC gaming platform\n• **Epic Games** - Free weekly games\n• **Xbox Game Pass** - Gaming subscription',
                    inline: true
                },
                {
                    name: '🎵 Music & Audio',
                    value: '• **Spotify** - Music streaming\n• **YouTube Music** - Video + audio\n• **Apple Music** - High-quality audio\n• **Podcasts** - Audio storytelling\n• **SoundCloud** - Independent artists',
                    inline: false
                },
                {
                    name: '📊 Entertainment Facts',
                    value: '📺 Average person watches 2.8 hours of video daily\n🎮 3.2 billion people play video games globally\n🎵 Music streaming grew 13% in 2023\n🍿 Netflix has 260M+ subscribers worldwide',
                    inline: false
                },
                {
                    name: '🎪 Entertainment Hub',
                    value: '[🎬 Explore Entertainment](https://cheery-flan-dc1088.netlify.app/entertainment)\n[🧠 Find Shows](https://cheery-flan-dc1088.netlify.app) "recommend entertainment platforms"',
                    inline: false
                }
            ],
            footer: { text: '51 Entertainment Platforms • Stream • Play • Enjoy 🎬' }
        },
        pin: true
    },

    'knowledge-and-learning': {
        embed: {
            title: '📚 Knowledge & Learning Category',
            description: 'Learn anything with 53 educational platforms and knowledge resources!',
            color: 0x0EA5E9,
            fields: [
                {
                    name: '🎓 Online Learning',
                    value: '• **Coursera** - University courses\n• **edX** - Harvard, MIT courses\n• **Udemy** - Practical skills\n• **Khan Academy** - Free education\n• **Skillshare** - Creative learning',
                    inline: true
                },
                {
                    name: '📖 Knowledge Bases',
                    value: '• **Wikipedia** - Free encyclopedia\n• **Britannica** - Trusted source\n• **Wolfram Alpha** - Computational knowledge\n• **TED** - Ideas worth spreading\n• **Big Think** - Expert insights',
                    inline: true
                },
                {
                    name: '🔬 Academic Resources',
                    value: '• **Google Scholar** - Research papers\n• **JSTOR** - Academic journals\n• **ResearchGate** - Scientific network\n• **arXiv** - Preprint repository\n• **PubMed** - Medical literature',
                    inline: false
                },
                {
                    name: '🧠 Learning Stats',
                    value: '📈 Online learning market: $350+ billion\n👨‍🎓 100M+ students on Coursera\n📚 6M+ articles on Wikipedia\n🎯 70% of learners prefer online courses',
                    inline: false
                },
                {
                    name: '🎯 Learning Portal',
                    value: '[📚 Explore Knowledge Resources](https://cheery-flan-dc1088.netlify.app/knowledge)\n[🧠 Find Learning](https://cheery-flan-dc1088.netlify.app) "help me learn something new"',
                    inline: false
                }
            ],
            footer: { text: '53 Knowledge Resources • Learn • Grow • Discover 📚' }
        },
        pin: true
    }
};

async function fixMissingChannels() {
    console.log('🔧 Fixing Missing Category Channels');
    console.log('==================================');
    console.log('');

    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) {
        console.error('❌ Guild not found!');
        return;
    }

    console.log(`✅ Connected to: ${guild.name}`);
    console.log('📋 Available channels:');
    
    // List all channels to find the correct names
    guild.channels.cache.forEach(channel => {
        if (channel.type === 0) { // Text channel
            console.log(`   - ${channel.name}`);
        }
    });
    console.log('');

    let messagesCreated = 0;
    let messagesPinned = 0;

    for (const [channelName, content] of Object.entries(missingShowcases)) {
        try {
            console.log(`🎨 Looking for #${channelName}...`);
            
            // Try to find the channel with exact name or similar variations
            let channel = guild.channels.cache.find(c => c.name === channelName);
            
            // Try alternative names if not found
            if (!channel) {
                const alternatives = [
                    channelName.replace('-and-', '-'),
                    channelName.replace('-and-', ''),
                    channelName.split('-')[0], // First word only
                ];
                
                for (const alt of alternatives) {
                    channel = guild.channels.cache.find(c => c.name === alt);
                    if (channel) {
                        console.log(`   Found alternative: #${channel.name}`);
                        break;
                    }
                }
            }
            
            if (!channel) {
                console.log(`⚠️  Channel #${channelName} not found, trying alternatives...`);
                continue;
            }

            // Create showcase embed
            const embed = new EmbedBuilder()
                .setTitle(content.embed.title)
                .setDescription(content.embed.description)
                .setColor(content.embed.color)
                .setTimestamp();

            // Add fields
            content.embed.fields.forEach(field => {
                embed.addFields(field);
            });

            // Add footer
            embed.setFooter(content.embed.footer);

            // Send main message
            const message = await channel.send({ embeds: [embed] });
            messagesCreated++;
            console.log(`✅ Created showcase in #${channel.name}`);

            // Pin message
            await message.pin();
            messagesPinned++;
            console.log(`📌 Pinned showcase in #${channel.name}`);

            // Add welcome message
            const welcomeMessage = await channel.send(
                `🎉 **Welcome to the ${content.embed.title} showcase!** Share your experiences, ask questions, and discover amazing resources with the community!\n\n*Try mentioning @The Everything Gateway bot or use slash commands!* 🤖`
            );
            messagesCreated++;
            console.log(`💬 Added welcome message to #${channel.name}`);

            // Delay to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 2000));

        } catch (error) {
            console.log(`❌ Failed to fix #${channelName}: ${error.message}`);
        }
    }

    console.log('');
    console.log('🎉 Missing channel fix complete!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   💬 Messages created: ${messagesCreated}`);
    console.log(`   📌 Messages pinned: ${messagesPinned}`);
    console.log('');
    console.log('🌟 All category channels should now be complete!');
}

// Start the fix
client.once('ready', async () => {
    console.log(`🔧 Fix bot connected as ${client.user.tag}`);
    
    try {
        await fixMissingChannels();
    } catch (error) {
        console.error('💥 Error fixing channels:', error);
    } finally {
        console.log('');
        console.log('🔄 Disconnecting fix bot...');
        client.destroy();
        process.exit(0);
    }
});

client.login(process.env.DISCORD_TOKEN);
