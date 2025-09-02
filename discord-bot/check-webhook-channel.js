// 🔍 CHECK WEBHOOK CHANNEL LOCATION
// This will tell you exactly where your webhook messages are going

const axios = require('axios');
require('dotenv').config();

async function checkWebhookInfo() {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    
    if (!webhookUrl) {
        console.log('❌ No DISCORD_WEBHOOK_URL found in .env file');
        return;
    }

    try {
        console.log('🔍 Checking webhook information...');
        console.log('');
        
        // Extract webhook info from URL
        const urlParts = webhookUrl.match(/\/webhooks\/(\d+)\/(.+)/);
        if (!urlParts) {
            console.log('❌ Invalid webhook URL format');
            return;
        }

        const webhookId = urlParts[1];
        const webhookToken = urlParts[2];
        
        // Get webhook details
        const response = await axios.get(`https://discord.com/api/webhooks/${webhookId}/${webhookToken}`);
        const webhookInfo = response.data;
        
        console.log('📡 Webhook Information:');
        console.log(`   Webhook Name: ${webhookInfo.name}`);
        console.log(`   Webhook ID: ${webhookInfo.id}`);
        console.log(`   Channel ID: ${webhookInfo.channel_id}`);
        console.log(`   Guild ID: ${webhookInfo.guild_id}`);
        console.log('');
        
        // The messages should appear in the channel with ID: webhookInfo.channel_id
        console.log('🎯 WHERE TO FIND YOUR MESSAGES:');
        console.log(`   Look for a channel with ID: ${webhookInfo.channel_id}`);
        console.log('   This is where ALL webhook messages will appear!');
        console.log('');
        
        // Send a location test message
        console.log('📍 Sending a location test message...');
        
        const locationTestMessage = {
            content: '🎯 **FOUND IT!** This is where your webhook messages appear!',
            embeds: [{
                title: '📍 Webhook Message Location Confirmed',
                description: `All webhook messages from your Everything Gateway app will appear in this channel!`,
                color: 0xF59E0B,
                fields: [
                    { name: '📡 Webhook Name', value: webhookInfo.name, inline: true },
                    { name: '🆔 Channel ID', value: webhookInfo.channel_id, inline: true },
                    { name: '🎯 What to Look For', value: 'App deployments, new resources, feature releases, and maintenance notices will all appear here!', inline: false }
                ],
                footer: { text: 'Everything Gateway • Webhook Location Test 🌌' },
                timestamp: new Date().toISOString()
            }]
        };

        await axios.post(webhookUrl, locationTestMessage);
        console.log('✅ Location test message sent!');
        console.log('');
        console.log('👀 Check your Discord server NOW - you should see the location confirmation message!');
        
    } catch (error) {
        console.error('❌ Error checking webhook info:', error.message);
    }
}

checkWebhookInfo();
