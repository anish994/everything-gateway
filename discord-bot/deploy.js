const { REST, Routes } = require('discord.js');
require('dotenv').config();

// Import all command data
const commands = [
    // Gateway Commands
    {
        name: 'gateway-help',
        description: 'Show all available Everything Gateway commands'
    },
    {
        name: 'gateway-stats',
        description: 'View Everything Gateway statistics and overview'
    },
    {
        name: 'list-categories',
        description: 'Show all resource categories in the Everything Gateway'
    },
    {
        name: 'explore-category',
        description: 'Explore a specific category in detail',
        options: [
            {
                type: 3, // STRING
                name: 'category',
                description: 'Choose a category to explore',
                required: true,
                choices: [
                    { name: 'Search Engines (39)', value: 'search' },
                    { name: 'Tools & Utilities (52)', value: 'tools' },
                    { name: 'Entertainment & Media (51)', value: 'entertainment' },
                    { name: 'Knowledge & Learning (53)', value: 'knowledge' },
                    { name: 'Social & Communication (47)', value: 'social' },
                    { name: 'Creative & Design (44)', value: 'design' },
                    { name: 'Finance & Business (41)', value: 'finance' },
                    { name: 'Technology News (38)', value: 'tech-news' },
                    { name: 'Developer Resources (49)', value: 'developer' },
                    { name: 'AI & Machine Learning (35)', value: 'ai' }
                ]
            }
        ]
    },
    {
        name: 'random-resource',
        description: 'Discover a random resource from the Everything Gateway'
    },
    {
        name: 'ai-commands',
        description: 'Learn about the Gateway AI assistant capabilities'
    },
    // Fun & Utility Commands
    {
        name: '8ball',
        description: 'Ask the magic 8-ball a question!',
        options: [
            {
                type: 3, // STRING
                name: 'question',
                description: 'Your question for the magic 8-ball',
                required: true
            }
        ]
    },
    {
        name: 'joke',
        description: 'Get a random joke to brighten your day!'
    },
    {
        name: 'poll',
        description: 'Create a poll for your server!',
        options: [
            {
                type: 3, // STRING
                name: 'question',
                description: 'The poll question',
                required: true
            },
            {
                type: 3, // STRING
                name: 'option1',
                description: 'First poll option',
                required: true
            },
            {
                type: 3, // STRING
                name: 'option2',
                description: 'Second poll option',
                required: true
            },
            {
                type: 3, // STRING
                name: 'option3',
                description: 'Third poll option',
                required: false
            },
            {
                type: 3, // STRING
                name: 'option4',
                description: 'Fourth poll option',
                required: false
            }
        ]
    },
    {
        name: 'server-info',
        description: 'Get detailed information about this server'
    },
    {
        name: 'user-info',
        description: 'Get information about a user',
        options: [
            {
                type: 6, // USER
                name: 'user',
                description: 'The user to get info about',
                required: false
            }
        ]
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

async function deployCommands() {
    try {
        console.log('🔄 Started refreshing application (/) commands...');

        // Register commands globally
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log('✅ Successfully reloaded application (/) commands.');
        console.log(`📊 Deployed ${commands.length} commands:`);
        commands.forEach(cmd => {
            console.log(`   • /${cmd.name} - ${cmd.description}`);
        });
        
        console.log('\n🌌 Everything Gateway Bot commands deployed successfully!');
        console.log('⏰ Commands may take up to 1 hour to appear in Discord.');
        
    } catch (error) {
        console.error('❌ Error deploying commands:', error);
    }
}

// Check if required environment variables exist
if (!process.env.DISCORD_TOKEN || !process.env.CLIENT_ID) {
    console.error('❌ Missing required environment variables!');
    console.error('Please ensure DISCORD_TOKEN and CLIENT_ID are set in your .env file.');
    process.exit(1);
}

deployCommands();
