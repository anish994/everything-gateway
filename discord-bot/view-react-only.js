// 👁️ VIEW + REACT + LINKS Only (Block Everything Else)
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

async function setViewReactOnly() {
    console.log('👁️ Setting channels to VIEW + REACT + LINKS only...');
    
    try {
        const guild = client.guilds.cache.get(GUILD_ID);
        if (!guild) {
            console.log('❌ Guild not found!');
            return;
        }
        
        console.log(`🔗 Connected to: ${guild.name}`);
        
        // Channels where people can type normally
        const writableChannels = ['general', 'feedback', 'bug-reports'];
        
        // Get all text channels
        const textChannels = guild.channels.cache.filter(ch => ch.type === 0);
        
        for (const [channelId, channel] of textChannels) {
            const channelName = channel.name.toLowerCase();
            const isWritable = writableChannels.some(name => channelName.includes(name));
            
            if (!isWritable) {
                // Clear existing permissions
                await channel.permissionOverwrites.cache.forEach(async (overwrite) => {
                    await overwrite.delete();
                });
                
                // Set permissions: VIEW + REACT + LINKS only (block everything else)
                await channel.permissionOverwrites.create(guild.roles.everyone, {
                    // ✅ ALLOWED
                    ViewChannel: true,
                    ReadMessageHistory: true,
                    AddReactions: true,              // Can react with emojis
                    
                    // ❌ BLOCKED
                    SendMessages: false,             // No typing
                    SendMessagesInThreads: false,    // No thread messages  
                    CreatePublicThreads: false,      // No threads
                    CreatePrivateThreads: false,     // No private threads
                    UseApplicationCommands: false,   // No slash commands
                    ManageMessages: false,           // No message management
                    ManageThreads: false,            // No thread management
                    EmbedLinks: false,               // No link embeds (but can click)
                    AttachFiles: false,              // No file uploads
                    UseExternalEmojis: false,        // No external emojis
                    UseExternalStickers: false,      // No external stickers
                    SendTTSMessages: false,          // No TTS
                    SendVoiceMessages: false,        // No voice messages
                    MentionEveryone: false           // No @everyone/@here
                });
                
                console.log(`👁️ ${channel.name} - VIEW + REACT + LINKS only`);
            } else {
                console.log(`✅ ${channel.name} - Full chat enabled`);
            }
        }
        
        console.log('\n👁️ PERFECT SETUP COMPLETE!');
        console.log('✅ Info channels: VIEW + REACT + CLICK LINKS only');
        console.log('✅ Chat channels: Full functionality');
        console.log('✅ No typing, threads, commands, or uploads in info channels');
        console.log('✅ People can still show appreciation with emoji reactions');
        
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
    setViewReactOnly();
});

client.login(process.env.DISCORD_TOKEN);
