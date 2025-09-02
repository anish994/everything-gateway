// 🕉️ SHIVAKALI ASHRAM Discord Channels Creator
// Creates spiritual channels for the ancient wisdom community

const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const GUILD_ID = '1411262001652432928'; // Everything Gateway Discord Server

// SHIVAKALI ASHRAM spiritual channels structure
const shivakaliAshramStructure = {
    type: 'category',
    name: '🕉️ SHIVAKALI ASHRAM',
    channels: [
        {
            name: 'sacred-welcome',
            topic: '🙏 Welcome to SHIVAKALI ASHRAM - 500+ years of authentic Vedic wisdom and spiritual guidance awaits'
        },
        {
            name: 'vedic-astrology',
            topic: '✨ Ancient Vedic astrology insights, birth chart readings, planetary wisdom, and cosmic guidance'
        },
        {
            name: 'spiritual-teachings',
            topic: '📿 Sacred teachings, mantras, meditation practices, and timeless wisdom from our ancestral lineage'
        },
        {
            name: 'divine-consultations',
            topic: '🔮 Personalized spiritual consultations, life guidance, and sacred ceremonies for seekers'
        },
        {
            name: 'ancient-rituals',
            topic: '🕯️ Traditional Hindu rituals, pujas, ceremonies, and sacred practices for spiritual growth'
        },
        {
            name: 'karmic-insights',
            topic: '⚖️ Understanding karma, past lives, spiritual healing, and the journey of the soul'
        },
        {
            name: 'yantra-and-mantras',
            topic: '🔯 Sacred geometry, powerful yantras, healing mantras, and mystical symbols'
        },
        {
            name: 'devotional-community',
            topic: '🌸 Community discussions, spiritual experiences, divine stories, and seekers\' journey sharing'
        }
    ]
};

async function createShivakaliAshramChannels() {
    console.log('🕉️ Creating SHIVAKALI ASHRAM Discord Channels');
    console.log('=============================================');
    console.log('');
    console.log('✨ Invoking ancient wisdom for digital spaces ✨');
    console.log('');

    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) {
        console.error('❌ Guild not found! Make sure the bot is in your server.');
        return;
    }

    console.log(`🏛️ Connected to server: ${guild.name}`);
    console.log('');

    let categoryCreated = false;
    let channelsCreated = 0;
    let failed = 0;

    try {
        // Check if category already exists
        const existingCategory = guild.channels.cache.find(
            channel => channel.type === ChannelType.GuildCategory && 
                      channel.name.includes('SHIVAKALI ASHRAM')
        );

        let category;
        
        if (existingCategory) {
            category = existingCategory;
            console.log(`📁 Using existing category: ${existingCategory.name}`);
        } else {
            console.log(`📁 Creating sacred category: ${shivakaliAshramStructure.name}`);
            
            // Create the SHIVAKALI ASHRAM category
            category = await guild.channels.create({
                name: shivakaliAshramStructure.name,
                type: ChannelType.GuildCategory
            });
            
            categoryCreated = true;
            console.log(`✅ Created sacred category: ${shivakaliAshramStructure.name}`);
        }

        console.log('');
        console.log('🌟 Creating sacred channels...');
        console.log('');

        // Create each spiritual channel
        for (const channelData of shivakaliAshramStructure.channels) {
            try {
                // Check if channel already exists
                const existingChannel = guild.channels.cache.find(
                    channel => channel.name === channelData.name && channel.parentId === category.id
                );

                if (existingChannel) {
                    console.log(`🔄 Channel #${channelData.name} already exists`);
                    continue;
                }

                const channel = await guild.channels.create({
                    name: channelData.name,
                    type: ChannelType.GuildText,
                    parent: category.id,
                    topic: channelData.topic
                });
                
                channelsCreated++;
                console.log(`🕯️ Created sacred channel: #${channelData.name}`);
                
                // Send initial sacred message to each channel
                setTimeout(async () => {
                    try {
                        await sendSacredWelcome(channel, channelData.name);
                    } catch (error) {
                        console.log(`⚠️ Could not send welcome to #${channelData.name}: ${error.message}`);
                    }
                }, 2000 * (channelsCreated)); // Stagger the messages
                
                // Small delay to avoid rate limits
                await new Promise(resolve => setTimeout(resolve, 1500));
                
            } catch (error) {
                failed++;
                console.log(`❌ Failed to create channel ${channelData.name}: ${error.message}`);
            }
        }

        console.log('');
        console.log('🎉 SHIVAKALI ASHRAM channels creation complete!');
        console.log('');
        console.log('📊 Sacred Summary:');
        console.log(`   🏛️ Category: ${categoryCreated ? '1 created' : '1 existing (used)'}`);
        console.log(`   📿 Channels: ${channelsCreated} created`);
        if (failed > 0) {
            console.log(`   ❌ Failed: ${failed} items`);
        }
        console.log('');
        console.log('🕉️ The ancient wisdom now flows through Discord!');
        console.log('🌸 Visit https://shivakali-ashram.netlify.app for full spiritual guidance');
        console.log('');

    } catch (error) {
        console.error('💥 Error creating SHIVAKALI ASHRAM structure:', error);
    }
}

async function sendSacredWelcome(channel, channelName) {
    const welcomeMessages = {
        'sacred-welcome': {
            title: '🙏 Sacred Welcome',
            message: '**ॐ गणेशाय नमः**\n\nWelcome to SHIVAKALI ASHRAM, blessed seeker. For over 500 years, our ancestral lineage has preserved the sacred wisdom of Vedic astrology and spiritual guidance.\n\nHere you will find:\n🌟 Authentic teachings passed down through generations\n✨ Divine guidance for your spiritual journey\n🔮 Sacred consultations and cosmic insights\n\n*May the divine light illuminate your path.*',
            color: 0xDC143C
        },
        'vedic-astrology': {
            title: '✨ Vedic Astrology Sanctum',
            message: '**नक्षत्राणि दिशन्ति**\n\n*"The stars guide us"*\n\nWelcome to our Vedic astrology sanctuary. Here, the ancient science of Jyotisha reveals the cosmic influences shaping your destiny.\n\n🌟 Birth chart analysis\n🌙 Planetary remedies\n⭐ Muhurat (auspicious timing)\n🔮 Predictive insights\n\nShare your birth details for divine cosmic guidance.',
            color: 0xFFD700
        },
        'spiritual-teachings': {
            title: '📿 Sacred Teachings Hall',
            message: '**सत्यं शिवं सुन्दरम्**\n\n*"Truth, Consciousness, Bliss"*\n\nWelcome to our hall of sacred teachings. Here flows the eternal wisdom of our ancestors - mantras that heal, meditations that transform, and truths that liberate.\n\n🕯️ Daily spiritual practices\n📜 Ancient scriptures explained\n🧘‍♀️ Meditation techniques\n🌸 Devotional wisdom',
            color: 0xFF4500
        },
        'divine-consultations': {
            title: '🔮 Divine Consultation Chamber',
            message: '**गुरुर्ब्रह्मा गुरुर्विष्णुः**\n\n*"The guru is Brahma, the guru is Vishnu"*\n\nSeek personalized spiritual guidance from our lineage holders. Every soul\'s journey is unique, and divine wisdom provides the perfect counsel for your path.\n\n💫 Personal spiritual counseling\n🎯 Life purpose guidance\n⚡ Karmic healing sessions\n🌺 Sacred ceremonies',
            color: 0x8A2BE2
        },
        'ancient-rituals': {
            title: '🕯️ Sacred Ritual Chamber',
            message: '**यज्ञो वै विष्णुः**\n\n*"Sacrifice is Vishnu himself"*\n\nAncient rituals connect us to the divine cosmic order. Here we share traditional pujas, sacred ceremonies, and time-honored practices that invoke divine blessings.\n\n🪔 Traditional pujas\n🌺 Festival celebrations\n🔥 Homa ceremonies\n🙏 Sacred mantras',
            color: 0xFF6347
        },
        'karmic-insights': {
            title: '⚖️ Karmic Wisdom Center',
            message: '**कर्मण्येवाधिकारस्ते**\n\n*"You have the right to perform your actions"*\n\nUnderstand the divine law of karma and your soul\'s eternal journey. Past life insights, karmic patterns, and spiritual healing await those ready for transformation.\n\n🔄 Karmic pattern analysis\n✨ Past life insights\n🌟 Soul healing practices\n🎯 Dharmic path guidance',
            color: 0x4169E1
        },
        'yantra-and-mantras': {
            title: '🔯 Sacred Geometry & Sound',
            message: '**यन्त्रं मन्त्रं तन्त्रं च**\n\n*"Yantra, Mantra, and Tantra"*\n\nSacred geometry and divine sound frequencies that align you with cosmic energies. Discover powerful yantras and transformative mantras from our ancient tradition.\n\n🔯 Powerful yantras\n🕉️ Healing mantras\n🌀 Sacred symbols\n⭐ Energy activation',
            color: 0x228B22
        },
        'devotional-community': {
            title: '🌸 Devotional Sangha',
            message: '**सत्संगत्वे निस्संगत्वं**\n\n*"From good association comes non-attachment"*\n\nWelcome to our sacred community of seekers. Share your spiritual experiences, divine realizations, and journey with fellow devotees on the path of truth.\n\n🌺 Spiritual experiences\n💫 Divine stories\n🤝 Seeker support\n🙏 Community prayers',
            color: 0xFF69B4
        }
    };

    const welcome = welcomeMessages[channelName] || welcomeMessages['sacred-welcome'];

    try {
        await channel.send({
            embeds: [{
                title: welcome.title,
                description: welcome.message,
                color: welcome.color,
                footer: {
                    text: 'SHIVAKALI ASHRAM | 500+ Years of Divine Wisdom | shivakali-ashram.netlify.app'
                },
                timestamp: new Date().toISOString(),
                thumbnail: {
                    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Om_symbol.svg/1200px-Om_symbol.svg.png'
                }
            }]
        });
    } catch (error) {
        console.log(`⚠️ Could not send welcome embed to #${channelName}: ${error.message}`);
        // Fallback to simple message
        await channel.send(`🕉️ **${welcome.title}**\n\n${welcome.message}`);
    }
}

// Start the sacred process
client.once('ready', async () => {
    console.log(`🤖 Sacred bot connected as ${client.user.tag}`);
    console.log('🕉️ Invoking divine blessings for channel creation...');
    console.log('');
    
    try {
        await createShivakaliAshramChannels();
    } catch (error) {
        console.error('💥 Sacred process encountered an error:', error);
    } finally {
        console.log('');
        console.log('🔄 Sacred mission complete. Disconnecting...');
        
        // Wait a bit for any pending messages
        setTimeout(() => {
            client.destroy();
            process.exit(0);
        }, 10000); // Wait 10 seconds for welcome messages to send
    }
});

client.on('error', error => {
    console.error('💥 Discord client error:', error);
});

console.log('🕉️ Starting SHIVAKALI ASHRAM channel creation...');
console.log('🌟 Connecting to Discord...');

client.login(process.env.DISCORD_TOKEN);
