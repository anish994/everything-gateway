// 🧪 WEBHOOK SYSTEM TEST
// Tests the complete webhook integration end-to-end

const axios = require('axios');
require('dotenv').config();

const WEBHOOK_URL = 'http://localhost:3001/webhook/updates';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

async function testWebhookSystem() {
    console.log('🧪 Testing Everything Gateway Webhook System');
    console.log('=============================================');
    console.log('');

    // Test cases
    const testCases = [
        {
            name: '🚀 App Deployment',
            payload: {
                type: 'app-deployed',
                data: {
                    version: 'v2.1.0',
                    changes: [
                        'Added 15 new AI tools',
                        'Improved search functionality',
                        'Fixed mobile responsiveness',
                        'Enhanced Discord integration'
                    ],
                    url: 'https://cheery-flan-dc1088.netlify.app',
                    timestamp: new Date().toISOString()
                }
            }
        },
        {
            name: '✨ New Resource Added',
            payload: {
                type: 'resource-added',
                data: {
                    name: 'Claude 3.5 Sonnet',
                    category: 'AI Tools',
                    url: 'https://claude.ai',
                    description: 'Advanced AI assistant for coding and creative tasks',
                    tags: ['ai', 'coding', 'creative', 'assistant']
                }
            }
        },
        {
            name: '🎁 Feature Release',
            payload: {
                type: 'feature-released',
                data: {
                    featureName: 'AI Smart Controller',
                    description: 'Natural language navigation system that understands what you need and opens the right tools instantly',
                    version: 'v2.1.0'
                }
            }
        },
        {
            name: '📊 Statistics Update',
            payload: {
                type: 'stats-updated',
                data: {
                    resourceCount: 600,
                    categoryCount: 16,
                    totalUsers: 2500,
                    discordMembers: 150
                }
            }
        },
        {
            name: '🔧 Maintenance Notice',
            payload: {
                type: 'maintenance',
                data: {
                    status: 'completed',
                    message: 'Database optimization and performance improvements completed',
                    expectedDuration: '30 minutes',
                    endTime: new Date().toISOString()
                }
            }
        }
    ];

    console.log('🔧 Starting webhook receiver server...');
    console.log('   Make sure to run: node webhook-receiver.js');
    console.log('   Waiting 5 seconds for you to start it...');
    console.log('');

    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Test each webhook type
    for (const testCase of testCases) {
        try {
            console.log(`📡 Testing: ${testCase.name}`);
            
            const response = await axios.post(WEBHOOK_URL, testCase.payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${WEBHOOK_SECRET}`
                },
                timeout: 10000
            });

            if (response.status === 200) {
                console.log(`✅ ${testCase.name} - SUCCESS`);
                console.log(`   Response: ${response.data.message}`);
            } else {
                console.log(`❌ ${testCase.name} - FAILED (Status: ${response.status})`);
            }

        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                console.log(`⚠️  ${testCase.name} - Server not running`);
                console.log('   Please run: node webhook-receiver.js');
            } else if (error.response?.status === 401) {
                console.log(`🔐 ${testCase.name} - Authentication failed`);
                console.log('   Check WEBHOOK_SECRET in .env file');
            } else {
                console.log(`❌ ${testCase.name} - ERROR: ${error.message}`);
            }
        }

        // Small delay between tests
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log('');
    console.log('🎉 Webhook testing complete!');
    console.log('');
    console.log('📋 Next steps:');
    console.log('   1. Check Discord for the test messages');
    console.log('   2. Verify webhook receiver logs');
    console.log('   3. Check update logs in ../logs/updates.json');
    console.log('');
    console.log('🚀 If all tests passed, your sync system is ready for production!');
}

// Test webhook health first
async function testWebhookHealth() {
    try {
        console.log('💚 Testing webhook receiver health...');
        const response = await axios.get('http://localhost:3001/health', { timeout: 5000 });
        
        console.log('✅ Webhook receiver is healthy!');
        console.log(`   Status: ${response.data.status}`);
        console.log(`   Discord: ${response.data.discord}`);
        console.log('');
        return true;
    } catch (error) {
        console.log('❌ Webhook receiver health check failed');
        console.log('   Please make sure webhook-receiver.js is running');
        console.log('   Run: node webhook-receiver.js');
        console.log('');
        return false;
    }
}

// Direct Discord webhook test (bypasses our server)
async function testDirectDiscordWebhook() {
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    
    if (!discordWebhookUrl) {
        console.log('⚠️  DISCORD_WEBHOOK_URL not found in .env');
        return;
    }

    try {
        console.log('📡 Testing direct Discord webhook...');
        
        const testMessage = {
            content: '🧪 **Webhook Test Message**',
            embeds: [{
                title: '✅ Everything Gateway Webhook Test',
                description: 'If you see this message, the webhook integration is working perfectly!',
                color: 0x10B981,
                fields: [
                    { name: '🔧 Test Type', value: 'Direct Discord Webhook', inline: true },
                    { name: '⏰ Time', value: new Date().toLocaleString(), inline: true }
                ],
                footer: { text: 'Everything Gateway • Webhook Test 🌌' },
                timestamp: new Date().toISOString()
            }]
        };

        const response = await axios.post(discordWebhookUrl, testMessage, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000
        });

        console.log('✅ Direct Discord webhook test successful!');
        console.log('   Check your Discord server for the test message');
        console.log('');
        return true;

    } catch (error) {
        console.log('❌ Direct Discord webhook test failed');
        console.log(`   Error: ${error.message}`);
        return false;
    }
}

// Main test runner
async function runAllTests() {
    console.log('🌟 Everything Gateway Webhook System Test Suite');
    console.log('================================================');
    console.log('');

    // Test 1: Direct Discord webhook
    const discordWorking = await testDirectDiscordWebhook();
    
    if (!discordWorking) {
        console.log('🛑 Stopping tests - Discord webhook not working');
        return;
    }

    // Test 2: Webhook receiver health
    const receiverWorking = await testWebhookHealth();
    
    if (!receiverWorking) {
        console.log('🛑 Stopping tests - Start webhook receiver first');
        return;
    }

    // Test 3: Full webhook system
    await testWebhookSystem();
}

if (require.main === module) {
    const args = process.argv.slice(2);
    const testType = args[0];

    switch (testType) {
        case 'discord':
            testDirectDiscordWebhook();
            break;
        case 'health':
            testWebhookHealth();
            break;
        case 'full':
            testWebhookSystem();
            break;
        default:
            runAllTests();
    }
}

module.exports = {
    testWebhookSystem,
    testWebhookHealth,
    testDirectDiscordWebhook
};
