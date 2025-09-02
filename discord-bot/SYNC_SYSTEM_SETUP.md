# 🔄 Everything Gateway Bidirectional Sync System

## Overview

This system keeps your Everything Gateway main app and Discord bot perfectly synchronized. When you update your main app, Discord gets notified automatically, and vice versa.

## 🌟 Features

- **📡 Webhook Integration** - Main app can push updates to Discord
- **🔄 Automatic Synchronization** - Regular syncing between platforms  
- **📝 Update Logging** - Complete history of all changes
- **📊 Statistics Tracking** - Real-time resource and category counts
- **🚨 Status Monitoring** - App health and uptime tracking
- **💾 Backup System** - Automatic backups of all data

## 🚀 Quick Setup

### 1. Environment Configuration

Add these to your `.env` file in the `discord-bot` folder:

```env
# Discord Bot Settings (you already have these)
DISCORD_TOKEN=your_discord_bot_token
GUILD_ID=1411262001652432928

# NEW: Webhook Integration Settings
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_URL
WEBHOOK_SECRET=your-super-secret-key-here
WEBHOOK_PORT=3001

# NEW: Main App Integration
MAIN_APP_URL=https://cheery-flan-dc1088.netlify.app
MAIN_APP_API_KEY=your-api-key-if-needed
```

### 2. Create Discord Webhook

1. Go to your Discord server
2. Right-click on a channel (like #general-chat or create #updates)
3. Click "Edit Channel" → "Integrations" → "Webhooks" → "New Webhook"
4. Copy the webhook URL and add it to your `.env` file
5. Name it "Everything Gateway Updates"

### 3. Start the Sync System

```bash
# Option 1: Start continuous sync (recommended for production)
node sync-system.js start

# Option 2: Start webhook receiver (for main app updates)
node webhook-receiver.js

# Option 3: Manual one-time sync
node sync-system.js sync

# Option 4: Test the system
node sync-system.js test
```

## 📡 Main App Integration

### From Your Main App (Netlify, Vercel, etc.)

Add this to your deployment scripts or app code:

```javascript
// Example: Notify Discord when you deploy
const notifyDiscord = async (version, changes) => {
    const webhookUrl = 'http://your-discord-bot-server:3001/webhook/updates';
    
    const payload = {
        type: 'app-deployed',
        data: {
            version: version,
            changes: changes,
            url: 'https://cheery-flan-dc1088.netlify.app',
            timestamp: new Date().toISOString()
        }
    };
    
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-super-secret-key-here'
            },
            body: JSON.stringify(payload)
        });
        
        console.log('Discord notified of deployment!');
    } catch (error) {
        console.error('Failed to notify Discord:', error);
    }
};

// Call it after deployment
notifyDiscord('v2.1.0', [
    'Added 15 new AI tools',
    'Improved search functionality', 
    'Fixed mobile responsiveness'
]);
```

### Available Webhook Types

```javascript
// App Deployment
{
    "type": "app-deployed",
    "data": {
        "version": "v2.1.0",
        "changes": ["New features", "Bug fixes"],
        "url": "https://your-app.com"
    }
}

// New Resource Added
{
    "type": "resource-added",
    "data": {
        "name": "Amazing Tool",
        "category": "AI Tools",
        "url": "https://amazingtool.com",
        "description": "Does amazing things",
        "tags": ["ai", "productivity"]
    }
}

// Statistics Update
{
    "type": "stats-updated",
    "data": {
        "resourceCount": 600,
        "categoryCount": 16,
        "totalUsers": 1500
    }
}

// Feature Release
{
    "type": "feature-released",
    "data": {
        "featureName": "AI Search",
        "description": "Smart search with AI",
        "screenshot": "https://image.com/screenshot.png",
        "version": "v2.1.0"
    }
}

// Maintenance Notice
{
    "type": "maintenance",
    "data": {
        "status": "started", // or "completed", "scheduled"
        "message": "Performing database updates",
        "expectedDuration": "30 minutes"
    }
}
```

## 🔧 Configuration Options

### Sync Intervals

```javascript
// In sync-system.js - modify these as needed
const SYNC_CONFIG = {
    FULL_SYNC_INTERVAL: 24 * 60 * 60 * 1000, // 24 hours
    QUICK_SYNC_INTERVAL: 60 * 60 * 1000,     // 1 hour
    // ... other settings
};
```

### Discord Channels

The system automatically updates these channels:
- `#welcome-and-start-here` - Resource counts
- `#categories-overview` - Category statistics
- All category channels - Resource highlights
- Webhook channel - Update notifications

## 📊 Monitoring & Logs

### Check System Status

```bash
# Check webhook receiver health
curl http://localhost:3001/health

# View recent updates
curl -H "Authorization: Bearer your-secret-key" \
     http://localhost:3001/updates/recent?count=20
```

### Log Files

- `../logs/updates.json` - All system updates
- `../logs/backups/` - Automatic backups
- `./cache/stats.json` - Current system state

## 🔄 How Synchronization Works

### Direction 1: Main App → Discord

1. **You deploy/update your main app**
2. **App sends webhook** to Discord bot server
3. **Bot processes update** and logs it
4. **Discord channels updated** with new info
5. **Users get notified** of changes

### Direction 2: Discord → Main App

1. **Discord activity detected** (new resources, feedback)
2. **Bot logs the activity**
3. **Sync system processes** the changes
4. **Main app notified** (if API available)
5. **Both platforms updated**

### Automatic Syncing

- **Quick sync every hour** - Checks for immediate updates
- **Full sync every 24 hours** - Complete synchronization
- **Real-time webhooks** - Instant notifications

## 🛠️ Advanced Usage

### Custom Sync Triggers

```javascript
// In your Discord bot commands
const { updateLogger } = require('./update-logger');

// Log custom events
await updateLogger.logUpdate({
    type: 'user-feedback',
    description: 'User suggested new resource',
    details: { 
        user: 'username',
        suggestion: 'Add ChatGPT to AI tools'
    },
    priority: 'normal'
});
```

### Manual Sync Commands

Add to your Discord bot:

```javascript
// /sync-now command
client.commands.set('sync-now', {
    data: new SlashCommandBuilder()
        .setName('sync-now')
        .setDescription('Manually trigger synchronization'),
    async execute(interaction) {
        // Trigger manual sync
        const SyncSystem = require('./sync-system');
        const sync = new SyncSystem();
        await sync.performFullSync();
        
        await interaction.reply('🔄 Synchronization triggered!');
    }
});
```

## 🚀 Production Deployment

### Option 1: PM2 (Recommended)

```bash
npm install -g pm2

# Start both systems
pm2 start sync-system.js --name "gateway-sync"
pm2 start webhook-receiver.js --name "gateway-webhook"

# Save PM2 configuration
pm2 save
pm2 startup
```

### Option 2: Docker

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 3001
CMD ["node", "sync-system.js", "start"]
```

### Option 3: Systemd Service

```ini
# /etc/systemd/system/gateway-sync.service
[Unit]
Description=Everything Gateway Sync System
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/discord-bot
ExecStart=/usr/bin/node sync-system.js start
Restart=always

[Install]
WantedBy=multi-user.target
```

## 📈 Monitoring Dashboard

The system provides several monitoring endpoints:

- `GET /health` - System health status
- `GET /updates/recent` - Recent update history
- `GET /stats` - Current system statistics

You could build a simple monitoring dashboard or integrate with existing monitoring tools.

## 🔧 Troubleshooting

### Common Issues

1. **Webhook not receiving updates**
   - Check firewall settings
   - Verify webhook URL and secret
   - Check Discord webhook configuration

2. **Sync not working**
   - Verify Discord bot permissions
   - Check environment variables
   - Review log files for errors

3. **Statistics not updating**
   - Ensure resource data files exist
   - Check file permissions
   - Verify API endpoints

### Debug Mode

```bash
# Enable detailed logging
DEBUG=gateway-sync node sync-system.js start
```

## 🎯 Next Steps

1. **Set up webhooks** in your main app deployment
2. **Configure Discord webhooks** for notifications  
3. **Test the system** with manual updates
4. **Monitor logs** for any issues
5. **Customize sync intervals** for your needs

Your Everything Gateway ecosystem is now **fully synchronized**! 🌌✨
