// 📢 Send Simple Update to Discord Webhook Channel
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
});

const GUILD_ID = '1411262001652432928'; // The Everything Gateway

async function sendUpdate(updateTitle, updateDescription, updateType = 'info') {
    console.log('📢 Sending update to Discord...');
    
    try {
        const guild = client.guilds.cache.get(GUILD_ID);
        if (!guild) {
            console.log('❌ Guild not found!');
            return;
        }
        
        // Find webhook-updates channel
        const webhookChannel = guild.channels.cache.find(ch => 
            ch.name.includes('webhook') && ch.name.includes('update')
        );
        
        if (!webhookChannel) {
            console.log('❌ Webhook updates channel not found!');
            return;
        }
        
        // Set colors based on update type
        const colors = {
            'success': 0x28a745,  // Green
            'info': 0x17a2b8,     // Blue  
            'warning': 0xffc107,  // Yellow
            'feature': 0x6f42c1,  // Purple
            'fix': 0xfd7e14       // Orange
        };
        
        const embed = new EmbedBuilder()
            .setTitle(`🚀 ${updateTitle}`)
            .setDescription(updateDescription)
            .setColor(colors[updateType] || colors.info)
            .setTimestamp()
            .setFooter({ text: 'Everything Gateway • Real-time Updates' });
        
        await webhookChannel.send({ embeds: [embed] });
        console.log(`✅ Update sent to #${webhookChannel.name}`);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        client.destroy();
        process.exit(0);
    }
}

// Get update details from command line arguments
const args = process.argv.slice(2);
const updateTitle = args[0] || 'Gateway Update';
const updateDescription = args[1] || 'New updates have been deployed to Everything Gateway!';
const updateType = args[2] || 'info';

// Login and send update
client.once('ready', () => {
    console.log('🌌 Bot is ready!');
    sendUpdate(updateTitle, updateDescription, updateType);
});

client.login(process.env.DISCORD_TOKEN);
