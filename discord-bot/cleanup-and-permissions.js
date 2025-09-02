// 🧹 Clean Up Bot Commands & Set Channel Permissions
const { Client, GatewayIntentBits, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

const GUILD_ID = '1411262001652432928'; // The Everything Gateway

async function cleanupAndSetPermissions() {
    console.log('🧹 Starting cleanup and permissions setup...');
    
    try {
        const guild = client.guilds.cache.get(GUILD_ID);
        if (!guild) {
            console.log('❌ Guild not found!');
            return;
        }
        
        console.log(`🔗 Connected to: ${guild.name}`);
        
        // 1. Remove all slash commands
        console.log('🗑️ Removing all slash commands...');
        await guild.commands.set([]);
        console.log('✅ All slash commands removed!');
        
        // 2. Set channel permissions
        console.log('🔒 Setting channel permissions...');
        
        // Channels where people CAN type
        const writableChannels = ['general', 'feedback', 'bug-reports'];
        
        // Get all text channels
        const textChannels = guild.channels.cache.filter(ch => ch.type === 0);
        
        for (const [channelId, channel] of textChannels) {
            const channelName = channel.name.toLowerCase();
            const isWritable = writableChannels.some(name => channelName.includes(name));
            
            if (isWritable) {
                // Allow everyone to send messages
                await channel.permissionOverwrites.edit(guild.roles.everyone, {
                    SendMessages: true,
                    ViewChannel: true,
                    ReadMessageHistory: true
                });
                console.log(`✅ ${channel.name} - Messages ENABLED`);
            } else {
                // Block EVERYONE including admins from sending messages (read-only)
                await channel.permissionOverwrites.edit(guild.roles.everyone, {
                    SendMessages: false,
                    ViewChannel: true,
                    ReadMessageHistory: true
                });
                
                // Also block administrators specifically
                const adminRole = guild.roles.cache.find(role => role.permissions.has(PermissionFlagsBits.Administrator));
                if (adminRole) {
                    await channel.permissionOverwrites.edit(adminRole, {
                        SendMessages: false
                    });
                }
                
                // Block the server owner too
                const owner = await guild.fetchOwner();
                await channel.permissionOverwrites.edit(owner.user, {
                    SendMessages: false
                });
                
                console.log(`🔒 ${channel.name} - Messages DISABLED (even for admins)`);
            }
        }
        
        console.log('\n🎉 Cleanup Complete!');
        console.log('✅ All slash commands removed');
        console.log('✅ Channel permissions configured:');
        console.log('   📝 Writable: general, feedback, bug-reports');
        console.log('   🔒 Read-only: All info/showcase channels');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        client.destroy();
        process.exit(0);
    }
}

// Login and setup
client.once('ready', () => {
    console.log('🌌 Bot is ready!');
    cleanupAndSetPermissions();
});

client.login(process.env.DISCORD_TOKEN);
