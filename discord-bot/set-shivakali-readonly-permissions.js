// 🔒 SHIVAKALI ASHRAM Channel Permissions Manager
// Sets read-only permissions for information channels

const { Client, GatewayIntentBits, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const GUILD_ID = '1411262001652432928'; // Everything Gateway Discord Server

async function setShivakaliReadOnlyPermissions() {
    console.log('🔒 Setting SHIVAKALI ASHRAM Channel Permissions');
    console.log('===============================================');
    console.log('');
    console.log('📋 Configuring read-only information channels...');
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

    console.log(`📿 Found ${shivakaliChannels.size} SHIVAKALI ASHRAM channels to configure`);
    console.log('');

    let updated = 0;
    let failed = 0;

    // Define the read-only permissions for @everyone role
    const readOnlyPermissions = {
        // ALLOW: Basic viewing and interaction
        [PermissionFlagsBits.ViewChannel]: true,           // Can see the channel
        [PermissionFlagsBits.ReadMessageHistory]: true,   // Can read message history
        [PermissionFlagsBits.AddReactions]: true,         // Can react with emojis
        [PermissionFlagsBits.UseExternalEmojis]: true,    // Can use external emojis
        [PermissionFlagsBits.UseExternalStickers]: true,  // Can use external stickers
        
        // DENY: Messaging and disruption
        [PermissionFlagsBits.SendMessages]: false,        // Cannot send messages
        [PermissionFlagsBits.SendMessagesInThreads]: false, // Cannot send in threads
        [PermissionFlagsBits.CreatePublicThreads]: false, // Cannot create threads
        [PermissionFlagsBits.CreatePrivateThreads]: false, // Cannot create private threads
        [PermissionFlagsBits.ManageMessages]: false,      // Cannot manage messages
        [PermissionFlagsBits.ManageThreads]: false,       // Cannot manage threads
        [PermissionFlagsBits.EmbedLinks]: true,           // Can click/embed links
        [PermissionFlagsBits.AttachFiles]: false,         // Cannot attach files
        [PermissionFlagsBits.UseApplicationCommands]: true, // Can use slash commands
    };

    // Get the @everyone role
    const everyoneRole = guild.roles.everyone;

    for (const [channelId, channel] of shivakaliChannels) {
        try {
            console.log(`🔧 Configuring permissions for #${channel.name}...`);

            // Set permissions for @everyone role
            await channel.permissionOverwrites.edit(everyoneRole, readOnlyPermissions, {
                reason: 'Setting read-only permissions for SHIVAKALI ASHRAM information channels'
            });

            updated++;
            console.log(`✅ Set read-only permissions for #${channel.name}`);

            // Small delay to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (error) {
            failed++;
            console.log(`❌ Failed to set permissions for #${channel.name}: ${error.message}`);
        }
    }

    console.log('');
    console.log('🎉 Permission configuration complete!');
    console.log('');
    console.log('📊 Permission Summary:');
    console.log(`   🔒 Channels updated: ${updated}`);
    if (failed > 0) {
        console.log(`   ❌ Failed: ${failed} channels`);
    }
    console.log('');
    console.log('✅ SHIVAKALI ASHRAM channels are now information-only:');
    console.log('   👀 Users can VIEW content');
    console.log('   😊 Users can REACT with emojis');
    console.log('   🔗 Users can CLICK links');
    console.log('   🚫 Users CANNOT send messages');
    console.log('   🚫 Users CANNOT create threads');
    console.log('   🚫 Users CANNOT attach files');
    console.log('');
    console.log('🕉️ Sacred channels are now properly protected!');
}

// Start the permission configuration
client.once('ready', async () => {
    console.log(`🤖 Bot connected as ${client.user.tag}`);
    console.log('🔒 Configuring sacred channel permissions...');
    console.log('');
    
    try {
        await setShivakaliReadOnlyPermissions();
    } catch (error) {
        console.error('💥 Permission configuration failed:', error);
    } finally {
        console.log('');
        console.log('🔄 Permission mission complete. Disconnecting...');
        client.destroy();
        process.exit(0);
    }
});

client.on('error', error => {
    console.error('💥 Discord client error:', error);
});

console.log('🔒 Starting SHIVAKALI ASHRAM permission configuration...');
console.log('🌟 Connecting to Discord...');

client.login(process.env.DISCORD_TOKEN);
