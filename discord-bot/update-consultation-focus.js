// 🔮 SHIVAKALI ASHRAM Premium Consultation Update Script
// Updates channels to focus on personal consultation with Acharya Anish

const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const GUILD_ID = '1411262001652432928'; // Everything Gateway Discord Server

// Updated consultation-focused welcome messages
const consultationWelcomes = {
    'sacred-welcome': {
        title: '🙏 Welcome to SHIVAKALI ASHRAM',
        message: '**ॐ गणेशाय नमः**\n\n**Welcome to Personal Spiritual Guidance**\n\nI am **Acharya Anish**, creator of both the Everything Gateway and SHIVAKALI ASHRAM platforms. Unlike automated spiritual tools, here you receive authentic, personalized guidance from a real spiritual practitioner with deep understanding of both ancient traditions and modern seekers.\n\n✨ **What I Offer:**\n📊 **Birth Chart Analysis** - 100+ page comprehensive Vedic astrology reports\n🔢 **Numerology Reading** - Deep karmic and life path analysis\n💬 **Online Consultation** - Direct one-on-one spiritual guidance\n🎯 **Person-Specific Insights** - Tailored wisdom for your unique journey\n\n**Ready for authentic spiritual guidance?**\n📧 **acharyaanish23@gmail.com**\n\n*"Real wisdom comes from real connection with a qualified guide."*',
        color: 0xDC143C
    },
    'vedic-astrology': {
        title: '✨ Personal Birth Chart Analysis',
        message: '**नक्षत्राणि दिशन्ति** *(The stars guide us)*\n\n**Get Your Complete 100+ Page Birth Chart Analysis**\n\nAs the creator of SHIVAKALI ASHRAM, I provide authentic Vedic astrology consultations that go far beyond generic computer-generated reports.\n\n🌟 **What You Receive:**\n• Comprehensive planetary analysis (100+ pages)\n• Detailed life predictions and timing\n• Career, relationships, and spiritual guidance\n• Remedial measures and gemstone recommendations\n• Personal consultation to explain your chart\n\n📧 **To get started:** Email me at **acharyaanish23@gmail.com**\n\n**Include:** Your birth date, exact time, and location\n**Mention:** "Birth Chart Analysis Request"\n\n*This is not automated software - this is personal guidance from Acharya Anish*',
        color: 0xFFD700
    },
    'spiritual-teachings': {
        title: '📿 Personal Spiritual Guidance Sessions',
        message: '**सत्यं शिवं सुन्दरम्** *(Truth, Consciousness, Bliss)*\n\n**Direct Spiritual Guidance from Acharya Anish**\n\nExperience authentic spiritual teachings tailored to your personal journey. No generic advice - only personalized wisdom based on your unique circumstances.\n\n🕯️ **Personal Consultation Includes:**\n• Life purpose and dharma guidance\n• Meditation practices suited to your nature\n• Karmic pattern analysis and healing\n• Spiritual practice recommendations\n• Direct Q&A with experienced practitioner\n\n**Why Personal Consultation?**\nAs someone who bridges ancient wisdom with modern technology (creator of Everything Gateway), I understand both traditional spiritual practices and contemporary challenges.\n\n📧 **Ready for guidance?** **acharyaanish23@gmail.com**',
        color: 0xFF4500
    },
    'divine-consultations': {
        title: '🔮 Premium Consultation Services',
        message: '**गुरुर्ब्रह्मा गुरुर्विष्णुः** *(The guru is divine)*\n\n**One-on-One Spiritual Consultation with Acharya Anish**\n\nExperience the difference between automated spiritual tools and authentic personal guidance from a qualified spiritual practitioner.\n\n💫 **Consultation Options:**\n1. **Vedic Astrology Session** - Complete life analysis\n2. **Numerology Reading** - Karmic number meanings\n3. **Spiritual Life Coaching** - Personal growth guidance\n4. **Combined Package** - Comprehensive spiritual assessment\n\n🎯 **What Makes This Different:**\n• Direct access to the SHIVAKALI ASHRAM creator\n• Personalized insights based on your unique situation\n• Real-time Q&A and clarifications\n• Authentic spiritual guidance, not computer algorithms\n\n📧 **Book your consultation:** **acharyaanish23@gmail.com**',
        color: 0x8A2BE2
    },
    'ancient-rituals': {
        title: '🕯️ Traditional Spiritual Practices',
        message: '**यज्ञो वै विष्णुः** *(Sacrifice is Vishnu)*\n\n**Learn Authentic Spiritual Practices**\n\nIn your personal consultation, receive guidance on traditional spiritual practices tailored to your specific needs and spiritual development level.\n\n🪔 **What I Can Guide You Through:**\n• Daily spiritual routine (sadhana) design\n• Appropriate mantras for your situation\n• Meditation techniques suited to your nature\n• Ritual practices for specific goals\n• Sacred geometry and yantra guidance\n\n**Personal Approach:**\nUnlike generic spiritual apps, I provide instructions based on your individual spiritual capacity, lifestyle, and goals.\n\n**Want to learn authentic practices?**\n📧 Contact **acharyaanish23@gmail.com** for personalized spiritual practice guidance',
        color: 0xFF6347
    },
    'karmic-insights': {
        title: '⚖️ Personal Karmic Analysis',
        message: '**कर्मण्येवाधिकारस्ते** *(You have the right to perform your actions)*\n\n**Understanding Your Karmic Patterns with Acharya Anish**\n\nReceive deep insights into your karmic influences through personalized analysis combining Vedic astrology and numerology.\n\n🔄 **Karmic Analysis Includes:**\n• Past life influences on current challenges\n• Karmic debts and credits assessment\n• Soul lessons you\'re here to learn\n• Relationship karmic patterns\n• Career and life purpose from karmic perspective\n\n**Why Personal Analysis Matters:**\nKarmic understanding requires deep spiritual insight that can\'t be automated. As a qualified practitioner, I provide authentic karmic readings based on traditional Vedic knowledge.\n\n📧 **Discover your karma:** **acharyaanish23@gmail.com**',
        color: 0x4169E1
    },
    'yantra-and-mantras': {
        title: '🔯 Personalized Sacred Practices',
        message: '**यन्त्रं मन्त्रं तन्त्रं च** *(Yantra, Mantra, and Tantra)*\n\n**Custom Yantras and Mantras for Your Spiritual Journey**\n\nReceive personalized sacred practices designed specifically for your spiritual needs and goals.\n\n🕉️ **Personal Consultation Includes:**\n• Custom yantra design for your specific goals\n• Personalized mantra selection and initiation\n• Proper pronunciation and practice guidance\n• Timing and method recommendations\n• Sacred geometry explanations\n\n**Authentic Spiritual Tools:**\nAs both a spiritual practitioner and technology creator, I understand the difference between real sacred practices and superficial spiritual apps.\n\n**Ready for authentic sacred practices?**\n📧 **acharyaanish23@gmail.com** - mention "Yantra & Mantra Consultation"\n\n*Real mantras require proper initiation and guidance*',
        color: 0x228B22
    },
    'devotional-community': {
        title: '🌸 Connect with Acharya Anish',
        message: '**सत्संगत्वे निस्संगत्वं** *(From good association comes non-attachment)*\n\n**Join the Personal Spiritual Guidance Community**\n\nThis channel showcases the spiritual consultation services available directly from **Acharya Anish**, creator of both Everything Gateway and SHIVAKALI ASHRAM platforms.\n\n🤝 **Why Choose Personal Consultation:**\n• Direct access to an experienced spiritual practitioner\n• Authentic guidance rooted in traditional knowledge\n• Modern understanding combined with ancient wisdom\n• Personal attention to your unique spiritual needs\n• Real spiritual growth, not just entertainment\n\n**Available Services:**\n📊 Birth Chart Analysis (100+ pages)\n🔢 Numerology Reading\n💬 Online Spiritual Consultation\n🎯 Person-Specific Life Guidance\n\n📧 **Start your authentic spiritual journey:** **acharyaanish23@gmail.com**',
        color: 0xFF69B4
    }
};

async function updateConsultationFocus() {
    console.log('🔮 Updating SHIVAKALI ASHRAM Channels for Premium Consultation Focus');
    console.log('====================================================================');
    console.log('');
    console.log('✨ Shifting from automated tools to personal spiritual guidance ✨');
    console.log('');

    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) {
        console.error('❌ Guild not found! Make sure the bot is in your server.');
        return;
    }

    console.log(`🏛️ Connected to server: ${guild.name}`);
    console.log('');

    // Find SHIVAKALI ASHRAM category
    const shivakaliCategory = guild.channels.cache.find(
        channel => channel.type === 4 && // GuildCategory
                  channel.name.includes('SHIVAKALI ASHRAM')
    );

    if (!shivakaliCategory) {
        console.error('❌ SHIVAKALI ASHRAM category not found!');
        return;
    }

    console.log(`📁 Found category: ${shivakaliCategory.name}`);
    console.log('');

    // Get all channels in the SHIVAKALI ASHRAM category
    const shivakaliChannels = guild.channels.cache.filter(
        channel => channel.parentId === shivakaliCategory.id && channel.type === 0 // GuildText
    );

    console.log(`📿 Found ${shivakaliChannels.size} SHIVAKALI ASHRAM channels to update`);
    console.log('');

    let updated = 0;
    let failed = 0;

    for (const [channelId, channel] of shivakaliChannels) {
        try {
            console.log(`🔧 Updating #${channel.name} with consultation focus...`);

            const welcomeData = consultationWelcomes[channel.name];
            
            if (!welcomeData) {
                console.log(`⚠️ No consultation message defined for #${channel.name}, skipping...`);
                continue;
            }

            // Clear previous messages (optional - you might want to keep them)
            // const messages = await channel.messages.fetch({ limit: 10 });
            // await channel.bulkDelete(messages.filter(msg => msg.author.bot));

            // Send new consultation-focused message
            await channel.send({
                embeds: [{
                    title: welcomeData.title,
                    description: welcomeData.message,
                    color: welcomeData.color,
                    footer: {
                        text: 'Acharya Anish | Tegharia Nishikanan SHIVAKALI ASHRAM, Kolkata 700157 | acharyaanish23@gmail.com'
                    },
                    timestamp: new Date().toISOString(),
                    thumbnail: {
                        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Om_symbol.svg/1200px-Om_symbol.svg.png'
                    },
                    fields: [{
                        name: '📧 Contact for Consultation',
                        value: '**acharyaanish23@gmail.com**\n\nMention which service you\'re interested in and include your birth details if requesting astrology/numerology services.',
                        inline: false
                    }]
                }]
            });

            updated++;
            console.log(`✅ Updated #${channel.name} with consultation focus`);

            // Small delay to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 2000));

        } catch (error) {
            failed++;
            console.log(`❌ Failed to update #${channel.name}: ${error.message}`);
        }
    }

    console.log('');
    console.log('🎉 Consultation focus update complete!');
    console.log('');
    console.log('📊 Update Summary:');
    console.log(`   🔮 Channels updated: ${updated}`);
    if (failed > 0) {
        console.log(`   ❌ Failed: ${failed} channels`);
    }
    console.log('');
    console.log('✅ SHIVAKALI ASHRAM channels now focus on premium personal consultation:');
    console.log('   💬 Direct communication with Acharya Anish');
    console.log('   📊 100+ page birth chart analyses');
    console.log('   🔢 Personal numerology readings');
    console.log('   🎯 Authentic spiritual guidance');
    console.log('   📧 Email: acharyaanish23@gmail.com');
    console.log('');
    console.log('🕉️ Authentic spiritual guidance now available!');
}

// Start the update process
client.once('ready', async () => {
    console.log(`🤖 Bot connected as ${client.user.tag}`);
    console.log('🔮 Updating channels for premium consultation focus...');
    console.log('');
    
    try {
        await updateConsultationFocus();
    } catch (error) {
        console.error('💥 Update process failed:', error);
    } finally {
        console.log('');
        console.log('🔄 Update mission complete. Disconnecting...');
        
        // Wait a bit for any pending messages
        setTimeout(() => {
            client.destroy();
            process.exit(0);
        }, 5000);
    }
});

client.on('error', error => {
    console.error('💥 Discord client error:', error);
});

console.log('🔮 Starting SHIVAKALI ASHRAM consultation focus update...');
console.log('🌟 Connecting to Discord...');

client.login(process.env.DISCORD_TOKEN);
