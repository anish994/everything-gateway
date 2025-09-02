// 🔐 FORCE Read-Only Channels (Even Block Server Owner)
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

async function forceReadOnly() {
    console.log('🔐 FORCE blocking ALL typing in info channels...');
    
    try {
        const guild = client.guilds.cache.get(GUILD_ID);
        if (!guild) {
            console.log('❌ Guild not found!');
            return;
        }
        
        console.log(`🔗 Connected to: ${guild.name}`);
        
        // Channels where people CAN type
        const writableChannels = ['general', 'feedback', 'bug-reports'];
        
        // Get all text channels
        const textChannels = guild.channels.cache.filter(ch => ch.type === 0);
        
        for (const [channelId, channel] of textChannels) {
            const channelName = channel.name.toLowerCase();
            const isWritable = writableChannels.some(name => channelName.includes(name));
            
            if (!isWritable) {
                // Clear all existing permission overwrites first
                await channel.permissionOverwrites.cache.forEach(async (overwrite) => {
                    await overwrite.delete();
                });
                
                // Set new permission overwrite that blocks EVERYONE from sending messages
                await channel.permissionOverwrites.create(guild.roles.everyone, {
                    SendMessages: false,
                    ViewChannel: true,
                    ReadMessageHistory: true,
                    AddReactions: false,
                    UseApplicationCommands: false
                });
                
                // Get the server owner and explicitly block them too
                const owner = await guild.fetchOwner();
                await channel.permissionOverwrites.create(owner.user, {
                    SendMessages: false,
                    AddReactions: false,
                    UseApplicationCommands: false
                });
                
                console.log(`🔐 ${channel.name} - FULLY LOCKED (no one can type)`);
            } else {
                console.log(`✅ ${channel.name} - Writable (kept open)`);
            }
        }
        
        console.log('\n🔐 AGGRESSIVE LOCKDOWN COMPLETE!');
        console.log('✅ Info channels are now IMPOSSIBLE to type in');
        console.log('✅ Even server owner cannot type in info channels');
        console.log('✅ Only general/feedback channels allow typing');
        
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
    forceReadOnly();
});

client.login(process.env.DISCORD_TOKEN);
