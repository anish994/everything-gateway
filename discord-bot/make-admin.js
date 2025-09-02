// 👑 Make mdjoa Admin/Moderator
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

async function makeAdmin() {
    console.log('👑 Making mdjoa an admin/moderator...');
    
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
            console.log('📋 Current members:');
            guild.members.cache.forEach(m => {
                console.log(`  - ${m.user.username} (${m.displayName || 'No nickname'})`);
            });
            return;
        }
        
        console.log(`✅ Found member: ${member.user.username} (${member.displayName || 'No nickname'})`);
        
        // Check if Admin role exists, create if not
        let adminRole = guild.roles.cache.find(role => role.name === 'Admin');
        
        if (!adminRole) {
            console.log('🔧 Creating Admin role...');
            adminRole = await guild.roles.create({
                name: 'Admin',
                color: '#ff6b6b',
                permissions: [
                    PermissionFlagsBits.Administrator,
                    PermissionFlagsBits.ManageChannels,
                    PermissionFlagsBits.ManageGuild,
                    PermissionFlagsBits.ManageMessages,
                    PermissionFlagsBits.ManageRoles,
                    PermissionFlagsBits.KickMembers,
                    PermissionFlagsBits.BanMembers,
                    PermissionFlagsBits.ModerateMembers,
                    PermissionFlagsBits.ViewAuditLog
                ],
                hoist: true,
                mentionable: true
            });
            console.log('✅ Admin role created!');
        }
        
        // Add the role to the member
        await member.roles.add(adminRole);
        console.log(`👑 ${member.user.username} is now an Admin!`);
        
        console.log('\n🎉 ADMIN PROMOTION COMPLETE!');
        console.log(`✅ ${member.user.username} now has full admin powers:`);
        console.log('  - 👑 Administrator permissions');
        console.log('  - 🛠️ Manage channels and server');
        console.log('  - 🗑️ Manage messages');
        console.log('  - 👥 Manage roles and members');
        console.log('  - 🚫 Kick and ban members');
        console.log('  - 🔇 Moderate members (timeout, etc.)');
        console.log('  - 📊 View audit logs');
        
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
    makeAdmin();
});

client.login(process.env.DISCORD_TOKEN);
