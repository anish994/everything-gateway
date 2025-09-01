#!/usr/bin/env node
// 🎮 Interactive Discord Server Setup Script
// This script sets up the complete Everything Gateway Discord server structure

const DiscordRemoteControl = require('./remote-control.js');
const readline = require('readline');

// Configuration
const BOT_URL = process.env.BOT_URL || 'https://your-bot-url.onrender.com'; // Replace with your bot's URL
const API_TOKEN = process.env.REMOTE_API_TOKEN || 'gateway-remote-2024';

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Utility function to ask questions
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

async function main() {
    console.log('🌌 Everything Gateway Discord Server Setup');
    console.log('==========================================');
    console.log('');

    // Get Discord Server ID
    let guildId;
    if (process.env.GUILD_ID) {
        guildId = process.env.GUILD_ID;
        console.log(`📋 Using Guild ID from environment: ${guildId.substring(0, 4)}...`);
    } else {
        console.log('To get your Discord Server ID:');
        console.log('1. Right-click your Discord server name');
        console.log('2. Select "Copy Server ID" (enable Developer Mode if needed)');
        console.log('3. Paste it below');
        console.log('');
        guildId = await askQuestion('🔗 Enter your Discord Server ID: ');
        
        if (!guildId || guildId.length < 17) {
            console.log('❌ Invalid Guild ID. Please try again.');
            rl.close();
            return;
        }
    }

    // Initialize remote control
    const remote = new DiscordRemoteControl(BOT_URL, API_TOKEN);

    try {
        console.log('');
        console.log('🔄 Testing connection to Discord bot...');

        // Test connection
        const guildInfo = await remote.getGuildInfo(guildId);
        if (!guildInfo.success) {
            throw new Error(`Failed to connect: ${guildInfo.error}`);
        }

        console.log(`✅ Connected to "${guildInfo.guild.name}"`);
        console.log(`   📊 ${guildInfo.guild.memberCount} members, ${guildInfo.guild.channels} channels`);
        console.log('');

        // Ask for confirmation
        const confirm = await askQuestion(`🚀 Set up complete Gateway server structure? (y/N): `);
        if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
            console.log('⏹️  Setup cancelled.');
            rl.close();
            return;
        }

        console.log('');
        console.log('🏗️ Setting up Gateway server structure...');
        console.log('This will create:');
        console.log('  📌 Gateway Info category (5 channels)');
        console.log('  🗂️ Categories Showcase (15 channels)');
        console.log('  💬 Community category (4 channels)');
        console.log('');

        // Set up the server
        const result = await remote.setupGatewayServer(guildId);
        
        if (!result.success) {
            throw new Error(`Setup failed: ${result.error}`);
        }

        // Display results
        console.log('✅ Server setup complete!');
        console.log('');
        console.log('📊 Creation Results:');
        
        let categoriesCreated = 0;
        let channelsCreated = 0;
        let failed = 0;

        result.results.forEach(item => {
            const status = item.success ? '✅' : '❌';
            const type = item.type === 'category' ? '📁' : '📄';
            
            if (item.success) {
                if (item.type === 'category') {
                    categoriesCreated++;
                    console.log(`${status} ${type} Created category: ${item.name}`);
                } else {
                    channelsCreated++;
                    console.log(`${status} ${type} Created channel: #${item.name}${item.parent ? ` (in ${item.parent})` : ''}`);
                }
            } else {
                failed++;
                console.log(`${status} ${type} Failed: ${item.name} - ${item.error}`);
            }
        });

        console.log('');
        console.log('📈 Summary:');
        console.log(`   📁 Categories: ${categoriesCreated} created`);
        console.log(`   📄 Channels: ${channelsCreated} created`);
        if (failed > 0) {
            console.log(`   ❌ Failed: ${failed} items`);
        }

        console.log('');
        console.log('🎉 Your Everything Gateway Discord server is ready!');
        console.log('');
        console.log('🔗 Next steps:');
        console.log('  1. Visit your Discord server to see the new structure');
        console.log('  2. Use the Gateway bot commands like /gateway-help');
        console.log('  3. Start populating channels with pinned welcome messages');
        console.log('  4. Invite community members to explore!');

    } catch (error) {
        console.error('');
        console.error('❌ Setup Error:', error.message);
        console.error('');
        console.error('🔧 Troubleshooting:');
        console.error('  • Make sure your Discord bot is running');
        console.error('  • Check that the bot has Administrator permissions');
        console.error('  • Verify your Guild ID is correct');
        console.error('  • Ensure BOT_URL environment variable is set');
        console.error('');
    } finally {
        rl.close();
    }
}

// Handle script execution
if (require.main === module) {
    main().catch(error => {
        console.error('💥 Fatal error:', error);
        process.exit(1);
    });
}

module.exports = { main };
