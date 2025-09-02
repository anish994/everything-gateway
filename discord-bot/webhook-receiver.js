// 🔗 WEBHOOK RECEIVER FOR MAIN APP UPDATES
// Receives updates from the main Everything Gateway app and syncs to Discord

const express = require('express');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const { updateLogger, logAppDeployed, logResourceAdded, logDiscordUpdated } = require('./update-logger');
require('dotenv').config();

const app = express();
const port = process.env.WEBHOOK_PORT || 3001;

// Middleware
app.use(express.json());

// Security middleware - verify requests are from your main app
const verifyWebhook = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const expectedSecret = process.env.WEBHOOK_SECRET || 'your-secret-key';
    
    if (!authHeader || authHeader !== `Bearer ${expectedSecret}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    next();
};

// Discord webhook client for sending updates
const discordWebhook = process.env.DISCORD_WEBHOOK_URL ? 
    new WebhookClient({ url: process.env.DISCORD_WEBHOOK_URL }) : null;

// Main webhook endpoint
app.post('/webhook/updates', verifyWebhook, async (req, res) => {
    try {
        const { type, data } = req.body;
        
        console.log(`📡 Received webhook: ${type}`);
        
        let response = { success: true, message: 'Update processed' };
        
        switch (type) {
            case 'app-deployed':
                await handleAppDeployment(data);
                break;
                
            case 'resource-added':
                await handleResourceAdded(data);
                break;
                
            case 'resource-updated':
                await handleResourceUpdated(data);
                break;
                
            case 'stats-updated':
                await handleStatsUpdated(data);
                break;
                
            case 'feature-released':
                await handleFeatureReleased(data);
                break;
                
            case 'maintenance':
                await handleMaintenance(data);
                break;
                
            default:
                console.log(`⚠️ Unknown webhook type: ${type}`);
                response = { success: false, message: 'Unknown update type' };
        }
        
        res.json(response);
        
    } catch (error) {
        console.error('❌ Webhook processing error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Handler functions
async function handleAppDeployment(data) {
    const { version, changes, url, timestamp } = data;
    
    // Log the deployment
    await logAppDeployed(version, changes);
    
    // Send to Discord
    if (discordWebhook) {
        const embed = new EmbedBuilder()
            .setColor(0x10B981)
            .setTitle('🚀 Everything Gateway Deployed!')
            .setDescription(`New version **${version}** is now live!`)
            .addFields(
                { name: '🌐 App URL', value: url || 'https://cheery-flan-dc1088.netlify.app', inline: false }
            )
            .setTimestamp(timestamp ? new Date(timestamp) : new Date())
            .setFooter({ text: 'Everything Gateway • Deployment System 🌌' });
            
        if (changes && changes.length > 0) {
            const changeList = changes.slice(0, 5).map(c => `• ${c}`).join('\n');
            embed.addFields({ name: '✨ What\'s New', value: changeList, inline: false });
            
            if (changes.length > 5) {
                embed.addFields({ name: '📝 And More!', value: `${changes.length - 5} additional improvements`, inline: false });
            }
        }
            
        await discordWebhook.send({ 
            content: '🎉 **New Everything Gateway Update!**',
            embeds: [embed] 
        });
    }
    
    console.log(`🚀 Processed app deployment: ${version}`);
}

async function handleResourceAdded(data) {
    const { name, category, url, description, tags } = data;
    
    // Log the new resource
    await logResourceAdded(name, category, { url, description, tags });
    
    // Send to Discord
    if (discordWebhook) {
        const embed = new EmbedBuilder()
            .setColor(0x3B82F6)
            .setTitle('✨ New Resource Added!')
            .setDescription(`**${name}** has been added to Everything Gateway`)
            .addFields(
                { name: '📂 Category', value: category, inline: true },
                { name: '🔗 URL', value: url || 'Not provided', inline: true }
            )
            .setTimestamp()
            .setFooter({ text: 'Everything Gateway • Resource Update 🌌' });
            
        if (description) {
            embed.addFields({ name: '📝 Description', value: description, inline: false });
        }
        
        if (tags && tags.length > 0) {
            embed.addFields({ name: '🏷️ Tags', value: tags.join(', '), inline: false });
        }
            
        await discordWebhook.send({ embeds: [embed] });
    }
    
    console.log(`✨ Processed new resource: ${name}`);
}

async function handleResourceUpdated(data) {
    const { name, category, changes } = data;
    
    // Log the update
    await updateLogger.logUpdate({
        type: 'resource-updated',
        description: `Updated resource: ${name}`,
        details: { name, category, changes },
        category: 'resources',
        priority: 'normal'
    });
    
    // Send to Discord (optional - might be too noisy)
    console.log(`📝 Processed resource update: ${name}`);
}

async function handleStatsUpdated(data) {
    const { resourceCount, categoryCount, totalUsers, otherStats } = data;
    
    // Update local statistics
    await updateLogger.updateStatistics({
        resourceCount,
        categoryCount,
        totalUsers,
        ...otherStats,
        lastStatsUpdate: new Date().toISOString()
    });
    
    // Send to Discord if it's a significant milestone
    if (resourceCount && (resourceCount % 100 === 0 || resourceCount % 50 === 0)) {
        if (discordWebhook) {
            const embed = new EmbedBuilder()
                .setColor(0x8B5CF6)
                .setTitle('📊 Milestone Reached!')
                .setDescription(`Everything Gateway now has **${resourceCount}** resources across **${categoryCount}** categories!`)
                .setTimestamp()
                .setFooter({ text: 'Everything Gateway • Statistics 🌌' });
                
            await discordWebhook.send({ 
                content: '🎯 **New Milestone!**',
                embeds: [embed] 
            });
        }
    }
    
    console.log(`📊 Updated statistics: ${resourceCount} resources, ${categoryCount} categories`);
}

async function handleFeatureReleased(data) {
    const { featureName, description, screenshot, version } = data;
    
    // Log the feature
    await updateLogger.logUpdate({
        type: 'feature-added',
        description: `New feature released: ${featureName}`,
        details: { featureName, description, screenshot, version },
        category: 'features',
        priority: 'high'
    });
    
    // Send to Discord
    if (discordWebhook) {
        const embed = new EmbedBuilder()
            .setColor(0xEC4899)
            .setTitle('🎁 New Feature Released!')
            .setDescription(`**${featureName}** is now available!`)
            .addFields(
                { name: '📝 Description', value: description || 'No description provided', inline: false }
            )
            .setTimestamp()
            .setFooter({ text: 'Everything Gateway • Feature Release 🌌' });
            
        if (screenshot) {
            embed.setImage(screenshot);
        }
        
        if (version) {
            embed.addFields({ name: '🏷️ Version', value: version, inline: true });
        }
            
        await discordWebhook.send({ 
            content: '🆕 **New Feature Alert!**',
            embeds: [embed] 
        });
    }
    
    console.log(`🎁 Processed new feature: ${featureName}`);
}

async function handleMaintenance(data) {
    const { status, message, expectedDuration, startTime, endTime } = data;
    
    // Log the maintenance
    await updateLogger.logUpdate({
        type: 'maintenance',
        description: `Maintenance ${status}: ${message}`,
        details: { status, message, expectedDuration, startTime, endTime },
        category: 'maintenance',
        priority: status === 'started' ? 'high' : 'normal'
    });
    
    // Send to Discord
    if (discordWebhook) {
        const colors = {
            started: 0xF59E0B, // Orange
            completed: 0x10B981, // Green
            scheduled: 0x6366F1  // Blue
        };
        
        const embed = new EmbedBuilder()
            .setColor(colors[status] || 0x6B7280)
            .setTitle(`🔧 Maintenance ${status.charAt(0).toUpperCase() + status.slice(1)}`)
            .setDescription(message)
            .setTimestamp()
            .setFooter({ text: 'Everything Gateway • Maintenance 🌌' });
            
        if (expectedDuration && status === 'started') {
            embed.addFields({ name: '⏱️ Expected Duration', value: expectedDuration, inline: true });
        }
        
        if (endTime && status === 'completed') {
            embed.addFields({ name: '✅ Completed At', value: new Date(endTime).toLocaleString(), inline: true });
        }
            
        await discordWebhook.send({ embeds: [embed] });
    }
    
    console.log(`🔧 Processed maintenance update: ${status}`);
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        webhook: 'active',
        discord: discordWebhook ? 'connected' : 'not configured'
    });
});

// Recent updates endpoint
app.get('/updates/recent', verifyWebhook, async (req, res) => {
    const count = parseInt(req.query.count) || 10;
    const updates = await updateLogger.getRecentUpdates(count);
    res.json({ updates });
});

// Start the webhook server
if (require.main === module) {
    app.listen(port, () => {
        console.log('🔗 Webhook receiver started');
        console.log(`📡 Listening on port ${port}`);
        console.log(`🎯 Endpoint: POST /webhook/updates`);
        console.log(`💚 Health check: GET /health`);
        console.log('');
        console.log('📖 Usage from your main app:');
        console.log(`   POST http://localhost:${port}/webhook/updates`);
        console.log('   Headers: { "Authorization": "Bearer your-secret-key" }');
        console.log('   Body: { "type": "app-deployed", "data": {...} }');
    });
}

module.exports = app;
