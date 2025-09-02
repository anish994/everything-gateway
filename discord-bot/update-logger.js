// 📝 UPDATE LOGGER & SYNC SYSTEM
// Tracks all changes and keeps both main app and Discord synchronized

const fs = require('fs').promises;
const path = require('path');

class UpdateLogger {
    constructor() {
        this.logFile = path.join(__dirname, '../logs/updates.json');
        this.backupDir = path.join(__dirname, '../logs/backups');
        this.initializeLogger();
    }

    async initializeLogger() {
        try {
            // Create logs directory
            await fs.mkdir(path.dirname(this.logFile), { recursive: true });
            await fs.mkdir(this.backupDir, { recursive: true });
            
            // Check if log file exists, create if not
            try {
                await fs.access(this.logFile);
            } catch {
                await this.createNewLogFile();
            }
        } catch (error) {
            console.error('Failed to initialize update logger:', error);
        }
    }

    async createNewLogFile() {
        const initialLog = {
            version: '1.0.0',
            created: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            totalUpdates: 0,
            updates: [],
            statistics: {
                resourceCount: 577,
                categoryCount: 15,
                lastSync: null,
                appStatus: 'online',
                discordStatus: 'connected'
            }
        };

        await fs.writeFile(this.logFile, JSON.stringify(initialLog, null, 2));
        console.log('📝 Created new update log file');
    }

    async logUpdate(updateData) {
        try {
            const logs = await this.readLogs();
            
            const update = {
                id: this.generateUpdateId(),
                timestamp: new Date().toISOString(),
                type: updateData.type,
                description: updateData.description,
                details: updateData.details || {},
                source: updateData.source || 'manual',
                category: updateData.category || 'general',
                priority: updateData.priority || 'normal',
                synced: false
            };

            logs.updates.unshift(update); // Add to beginning
            logs.totalUpdates++;
            logs.lastUpdated = update.timestamp;

            // Keep only last 1000 updates
            if (logs.updates.length > 1000) {
                logs.updates = logs.updates.slice(0, 1000);
            }

            await fs.writeFile(this.logFile, JSON.stringify(logs, null, 2));
            
            console.log(`📝 Logged update: ${update.type} - ${update.description}`);
            
            // Trigger sync if needed
            if (updateData.triggerSync !== false) {
                await this.triggerSync(update);
            }

            return update;
        } catch (error) {
            console.error('Failed to log update:', error);
            return null;
        }
    }

    async readLogs() {
        try {
            const content = await fs.readFile(this.logFile, 'utf8');
            return JSON.parse(content);
        } catch (error) {
            console.error('Failed to read logs:', error);
            return null;
        }
    }

    async getRecentUpdates(count = 10) {
        const logs = await this.readLogs();
        return logs ? logs.updates.slice(0, count) : [];
    }

    async getUpdatesByType(type, count = 50) {
        const logs = await this.readLogs();
        return logs ? logs.updates.filter(u => u.type === type).slice(0, count) : [];
    }

    async markAsSynced(updateId) {
        try {
            const logs = await this.readLogs();
            const update = logs.updates.find(u => u.id === updateId);
            
            if (update) {
                update.synced = true;
                update.syncedAt = new Date().toISOString();
                await fs.writeFile(this.logFile, JSON.stringify(logs, null, 2));
                console.log(`✅ Marked update ${updateId} as synced`);
            }
        } catch (error) {
            console.error('Failed to mark as synced:', error);
        }
    }

    async updateStatistics(stats) {
        try {
            const logs = await this.readLogs();
            logs.statistics = { ...logs.statistics, ...stats };
            logs.lastUpdated = new Date().toISOString();
            
            await fs.writeFile(this.logFile, JSON.stringify(logs, null, 2));
            console.log('📊 Updated statistics');
        } catch (error) {
            console.error('Failed to update statistics:', error);
        }
    }

    async triggerSync(update) {
        // This would trigger the sync system
        console.log(`🔄 Triggering sync for update: ${update.id}`);
        
        // Import and use the sync system
        try {
            const SyncSystem = require('./sync-system');
            const sync = new SyncSystem();
            
            // You could trigger specific syncs based on update type
            switch (update.type) {
                case 'resource-added':
                case 'resource-removed':
                case 'category-updated':
                    // Trigger Discord channel updates
                    break;
                    
                case 'app-deployed':
                    // Trigger full sync
                    break;
                    
                case 'bot-updated':
                    // Update Discord status
                    break;
            }
        } catch (error) {
            console.error('Failed to trigger sync:', error);
        }
    }

    generateUpdateId() {
        return `update_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    async createBackup() {
        try {
            const logs = await this.readLogs();
            const backupFile = path.join(this.backupDir, `backup_${Date.now()}.json`);
            
            await fs.writeFile(backupFile, JSON.stringify(logs, null, 2));
            console.log(`💾 Created backup: ${backupFile}`);
            
            // Clean old backups (keep only last 30)
            await this.cleanOldBackups();
            
            return backupFile;
        } catch (error) {
            console.error('Failed to create backup:', error);
            return null;
        }
    }

    async cleanOldBackups() {
        try {
            const files = await fs.readdir(this.backupDir);
            const backupFiles = files
                .filter(f => f.startsWith('backup_') && f.endsWith('.json'))
                .map(f => ({
                    name: f,
                    path: path.join(this.backupDir, f),
                    time: parseInt(f.match(/backup_(\d+)\.json/)?.[1] || '0')
                }))
                .sort((a, b) => b.time - a.time);

            // Keep only latest 30 backups
            if (backupFiles.length > 30) {
                const toDelete = backupFiles.slice(30);
                for (const file of toDelete) {
                    await fs.unlink(file.path);
                }
                console.log(`🗑️ Cleaned ${toDelete.length} old backups`);
            }
        } catch (error) {
            console.error('Failed to clean old backups:', error);
        }
    }
}

// Predefined update types for consistency
const UPDATE_TYPES = {
    RESOURCE_ADDED: 'resource-added',
    RESOURCE_REMOVED: 'resource-removed',  
    RESOURCE_UPDATED: 'resource-updated',
    CATEGORY_ADDED: 'category-added',
    CATEGORY_UPDATED: 'category-updated',
    APP_DEPLOYED: 'app-deployed',
    BOT_UPDATED: 'bot-updated',
    SYNC_COMPLETED: 'sync-completed',
    ERROR_OCCURRED: 'error-occurred',
    MAINTENANCE: 'maintenance',
    FEATURE_ADDED: 'feature-added',
    BUG_FIXED: 'bug-fixed',
    DISCORD_UPDATED: 'discord-updated',
    USER_FEEDBACK: 'user-feedback'
};

// Export singleton instance
const updateLogger = new UpdateLogger();

// Convenience functions
const logResourceAdded = async (resourceName, category, details) => {
    return await updateLogger.logUpdate({
        type: UPDATE_TYPES.RESOURCE_ADDED,
        description: `Added new resource: ${resourceName}`,
        details: { resourceName, category, ...details },
        category: 'resources',
        priority: 'high'
    });
};

const logAppDeployed = async (version, changes) => {
    return await updateLogger.logUpdate({
        type: UPDATE_TYPES.APP_DEPLOYED,
        description: `App deployed - Version ${version}`,
        details: { version, changes },
        category: 'deployment',
        priority: 'high'
    });
};

const logDiscordUpdated = async (updateType, description, details) => {
    return await updateLogger.logUpdate({
        type: UPDATE_TYPES.DISCORD_UPDATED,
        description: `Discord: ${description}`,
        details,
        category: 'discord',
        priority: 'normal'
    });
};

const logSyncCompleted = async (stats) => {
    return await updateLogger.logUpdate({
        type: UPDATE_TYPES.SYNC_COMPLETED,
        description: 'Synchronization completed successfully',
        details: stats,
        category: 'sync',
        priority: 'low',
        triggerSync: false // Don't trigger sync for sync completion
    });
};

module.exports = {
    UpdateLogger,
    updateLogger,
    UPDATE_TYPES,
    logResourceAdded,
    logAppDeployed,
    logDiscordUpdated,
    logSyncCompleted
};
