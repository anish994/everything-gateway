// 🎨 Create Background Themes Discord Channel - Local Bridge
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config();

console.log('🚀 Starting theme channel creation script...');
console.log('📋 Environment check:');
console.log('  - DISCORD_TOKEN:', process.env.DISCORD_TOKEN ? 'Present' : 'Missing');
console.log('  - Current directory:', __dirname);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

const GUILD_ID = '1411262001652432928'; // The Everything Gateway

async function createThemeChannel() {
    console.log('🎨 Creating Background Themes Channel via Local Bot...');
    
    try {
        const guild = client.guilds.cache.get(GUILD_ID);
        if (!guild) {
            console.log('❌ Guild not found!');
            return;
        }
        
        console.log(`🔗 Connected to: ${guild.name}`);
        
        // Find Gateway Info category
        let categoryId = null;
        const category = guild.channels.cache.find(ch => 
            ch.type === 4 && ch.name.includes('GATEWAY INFO')
        );
        categoryId = category?.id;
        
        // Create the channel
        console.log('📅 Creating background-themes-showcase channel...');
        
        const channel = await guild.channels.create({
            name: 'background-themes-showcase',
            type: 0, // GUILD_TEXT
            parent: categoryId,
            topic: '🎨 Discover all 32+ beautiful background themes! From Default 🌙 to Navy ⚓, transform your Gateway experience with stunning colors and gradients.'
        });
        
        console.log(`✅ Channel created: #${channel.name}`);
        
        // Send welcome message
        const welcomeEmbed = new EmbedBuilder()
            .setTitle('🎨 Welcome to Background Themes Showcase!')
            .setDescription('Discover the complete collection of **32 stunning background themes** available in the Everything Gateway!')
            .setColor(0x667eea)
            .addFields(
                {
                    name: '🌈 **Theme Categories**',
                    value: '**Main Background Themes**: Transform the entire page background\n**Category Background Themes**: Change the content container colors',
                    inline: false
                },
                {
                    name: '🎯 **Recently Added Colors**',
                    value: '🪸 Coral • 🍋 Lime • 🌺 Magenta • 🦚 Turquoise\n🔮 Indigo • 🥉 Bronze • 🍑 Peach • ⚓ Navy',
                    inline: false
                },
                {
                    name: '🛠️ **How to Use**',
                    value: '1. Visit [Everything Gateway](https://cheery-flan-dc1088.netlify.app)\n2. Click the settings trigger (▶️) on the right\n3. Expand **Main Background** or **Category Background**\n4. Choose your favorite theme!',
                    inline: false
                },
                {
                    name: '🌟 **Pro Tips**',
                    value: '• Mix and match main + category backgrounds\n• Settings are saved automatically\n• Try the new scrollable color picker\n• Each theme has carefully crafted gradients',
                    inline: false
                }
            )
            .setFooter({ text: 'Settings ▶️ Background Themes ▶️ Choose Your Style! 🌌' })
            .setTimestamp();
        
        const welcomeMsg = await channel.send({ embeds: [welcomeEmbed] });
        await welcomeMsg.pin();
        console.log('✅ Welcome message sent and pinned!');
        
        // Send themes collection
        const themesEmbed = new EmbedBuilder()
            .setTitle('🎨 Complete Themes Collection (32 Themes)')
            .setDescription('Here are all the beautiful themes available in both Main Background and Category Background:')
            .setColor(0x8B5CF6)
            .addFields(
                {
                    name: '🌙 Classic Collection',
                    value: '🌙 Default • ☀️ Light Mode • 🌚 Dark Mode • 🌅 Sunset • 🌊 Ocean',
                    inline: false
                },
                {
                    name: '🌲 Nature Collection', 
                    value: '🌲 Forest • 🌸 Cherry • 🍃 Mint • 💚 Emerald • 🌹 Rose',
                    inline: false
                },
                {
                    name: '💎 Vibrant Collection',
                    value: '🔮 Neon • 👑 Royal • 🔥 Fire • ❄️ Ice • 💜 Lavender',
                    inline: false
                },
                {
                    name: '✨ Metallic Collection',
                    value: '🥇 Gold • 🧡 Copper • 🪨 Slate • 🔴 Crimson • 💙 Azure',
                    inline: false
                },
                {
                    name: '🌌 Premium Collection',
                    value: '🟡 Amber • 💙 Violet • 🌌 Midnight',
                    inline: false
                },
                {
                    name: '🆕 **NEW** Latest Collection',
                    value: '🔷 Teal • 🪸 Coral • 🍋 Lime • 🌺 Magenta\n🦚 Turquoise • 🔮 Indigo • 🥉 Bronze • 🍑 Peach • ⚓ Navy',
                    inline: false
                }
            )
            .setFooter({ text: 'Each theme features custom gradients and optimized contrast! 🎨' });
        
        await channel.send({ embeds: [themesEmbed] });
        console.log('🎨 Themes list sent!');
        
        // Send technical details
        const techEmbed = new EmbedBuilder()
            .setTitle('⚡ Recent Enhancements & Technical Details')
            .setDescription('Here are the latest improvements to our theming system:')
            .setColor(0x10B981)
            .addFields(
                {
                    name: '🔧 **Enhanced Scrolling**',
                    value: 'Increased theme options height from 600px to 800px with smooth auto-scrolling through all colors.',
                    inline: false
                },
                {
                    name: '📱 **Better Mobile Experience**',
                    value: 'Improved note placement - desktop effectiveness note now appears only when theme options are expanded.',
                    inline: false
                },
                {
                    name: '🎨 **9 New Colors Added**',
                    value: 'Each new color includes:\n• CSS gradients for main backgrounds\n• Semi-transparent variants for category backgrounds\n• JavaScript theme switching support\n• Consistent emoji and display names',
                    inline: false
                },
                {
                    name: '💾 **Smart Storage**',
                    value: 'All theme preferences are automatically saved to localStorage and persist across sessions.',
                    inline: false
                },
                {
                    name: '🌐 **Live Testing**',
                    value: '[Try All Themes Live](https://cheery-flan-dc1088.netlify.app) - Click the ▶️ settings trigger!',
                    inline: false
                }
            )
            .setFooter({ text: 'Built with love • Zero external dependencies • Pure CSS3 + JavaScript ✨' });
        
        await channel.send({ embeds: [techEmbed] });
        console.log('⚡ Technical details sent!');
        
        console.log('\n🎉 Background Themes Channel Setup Complete!');
        console.log(`📍 Channel: #${channel.name}`);
        console.log(`🔗 Category: ${category ? category.name : 'No Category'}`);
        console.log('💌 3 informative messages sent with 1 pinned');
        console.log('✨ Users can now discover and discuss all 32 beautiful themes! 🌈');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        client.destroy();
        process.exit(0);
    }
}

// Login and setup
console.log('🔑 Attempting to login to Discord...');

// Run when bot is ready
client.once('ready', () => {
    console.log('🌌 Bot is ready!');
    console.log(`🤖 Bot logged in as: ${client.user.tag}`);
    
    // List all guilds the bot is in
    console.log('🏠 Guilds the bot has access to:');
    client.guilds.cache.forEach(guild => {
        console.log(`  - ${guild.name} (ID: ${guild.id})`);
    });
    console.log('');
    
    createThemeChannel();
});

// Handle errors
client.on('error', (error) => {
    console.error('❌ Discord client error:', error);
    process.exit(1);
});

// Start the bot
client.login(process.env.DISCORD_TOKEN)
    .then(() => {
        console.log('✅ Login successful!');
    })
    .catch((error) => {
        console.error('❌ Login failed:', error.message);
        process.exit(1);
    });
