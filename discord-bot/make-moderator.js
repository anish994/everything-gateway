// 🛡️ Make mdjoa a Smart Moderator (Essential Powers Only)
const { Client, GatewayIntentBits, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
    ]
});

const GUILD_ID = '1411262001652432928'; // The Everything Gateway
const TARGET_USERNAME = 'mdjoa'; // Username to promote

async function makeModerator() {
    console.log('🛡️ Making mdjoa a smart moderator...');
    
    try {
        const guild = client.guilds.cache.get(GUILD_ID);
        if (!guild) {
            console.log('❌ Guild not found!');
            return;
        }
        
        console.log(`🔗 Connected to: ${guild.name}`);
        
        // Fetch all members to find mdjoa
        await guild.members.fetch();
        
        // Find mdjoa by username
        const member = guild.members.cache.find(m => 
            m.user.username.toLowerCase() === TARGET_USERNAME.toLowerCase() ||
            m.user.displayName?.toLowerCase() === TARGET_USERNAME.toLowerCase() ||
            m.displayName?.toLowerCase() === TARGET_USERNAME.toLowerCase()
        );
        
        if (!member) {
            console.log(`❌ Member "${TARGET_USERNAME}" not found in server`);
            return;
        }
        
        console.log(`✅ Found member: ${member.user.username} (${member.displayName || 'No nickname'})`);
        
        // Remove any existing Admin role first
        const adminRole = guild.roles.cache.find(role => role.name === 'Admin');
        if (adminRole && member.roles.cache.has(adminRole.id)) {
            await member.roles.remove(adminRole);
            console.log('🔧 Removed full Admin role');
        }
        
        // Check if Moderator role exists, create if not
        let modRole = guild.roles.cache.find(role => role.name === 'Moderator');
        
        if (!modRole) {
            console.log('🛡️ Creating smart Moderator role...');
            modRole = await guild.roles.create({
                name: 'Moderator',
                color: '#4CAF50', // Nice green color
                permissions: [
                    // ✅ ESSENTIAL MOD POWERS
                    PermissionFlagsBits.KickMembers,           // Kick troublemakers
                    PermissionFlagsBits.BanMembers,            // Ban bad actors
                    PermissionFlagsBits.ModerateMembers,       // Timeout users
                    PermissionFlagsBits.ManageMessages,        // Delete spam/bad messages
                    PermissionFlagsBits.ViewAuditLog,          // See what happened
                    PermissionFlagsBits.CreateInstantInvite,   // Create invites
                    PermissionFlagsBits.ManageNicknames,       // Change user nicknames
                    PermissionFlagsBits.ReadMessageHistory,    // Read all messages
                    PermissionFlagsBits.SendMessages,          // Send messages everywhere
                    PermissionFlagsBits.EmbedLinks,            // Send rich embeds
                    PermissionFlagsBits.AttachFiles,           // Upload files
                    PermissionFlagsBits.AddReactions,          // Add reactions
                    PermissionFlagsBits.UseExternalEmojis,     // Use custom emojis
                    
                    // ❌ NOT INCLUDED (keeps you in control)
                    // Administrator - Too powerful
                    // ManageGuild - Server settings stay with you
                    // ManageChannels - Channel structure stays with you  
                    // ManageRoles - Role management stays with you
                    // ManageWebhooks - Webhook control stays with you
                ],
                hoist: true,        // Show separately in member list
                mentionable: true   // Can be @mentioned
            });
            console.log('✅ Smart Moderator role created!');
        }
        
        // Add the role to the member
        await member.roles.add(modRole);
        console.log(`🛡️ ${member.user.username} is now a Moderator!`);
        
        console.log('\n🎉 SMART MODERATOR SETUP COMPLETE!');
        console.log(`✅ ${member.user.username} now has these mod powers:`);
        console.log('  - 🚫 Kick & ban troublesome members');
        console.log('  - 🔇 Timeout users (moderate members)');
        console.log('  - 🗑️ Delete spam/inappropriate messages');
        console.log('  - 📊 View audit logs (see server activity)');
        console.log('  - 📨 Create invite links for new members');
        console.log('  - 🏷️ Change user nicknames');
        console.log('  - 💬 Send messages in all channels');
        console.log('');
        console.log('🔒 YOU still control:');
        console.log('  - Server settings & configuration');
        console.log('  - Channel creation & structure');  
        console.log('  - Role management & permissions');
        console.log('  - Webhook & bot management');
        
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
    makeModerator();
});

client.login(process.env.DISCORD_TOKEN);
