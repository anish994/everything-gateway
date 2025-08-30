const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, Collection } = require('discord.js');
require('dotenv').config();

// Initialize Discord client - WITH FULL POWER! 🚀
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution
    ]
});

// Store commands
client.commands = new Collection();

// Gateway Knowledge Base - Same data from our AI system
const GATEWAY_KNOWLEDGE = {
    categories: [
        { name: "Search Engines", count: 39, description: "Web search, academic search, specialized search engines" },
        { name: "Tools & Utilities", count: 52, description: "Development tools, productivity apps, system utilities" },
        { name: "Entertainment & Media", count: 51, description: "Streaming, gaming, music, video platforms" },
        { name: "Knowledge & Learning", count: 53, description: "Educational resources, documentation, tutorials" },
        { name: "Social & Communication", count: 47, description: "Social networks, messaging, collaboration tools" },
        { name: "Creative & Design", count: 44, description: "Design tools, creative software, inspiration platforms" },
        { name: "Finance & Business", count: 41, description: "Financial tools, business resources, market data" },
        { name: "Technology News", count: 38, description: "Tech news, blogs, industry insights" },
        { name: "Developer Resources", count: 49, description: "APIs, libraries, development platforms" },
        { name: "Lifestyle & Health", count: 43, description: "Health apps, fitness, lifestyle management" },
        { name: "Shopping & Commerce", count: 40, description: "E-commerce, deals, product discovery" },
        { name: "AI & Machine Learning", count: 35, description: "AI tools, ML platforms, automation" },
        { name: "Other & Miscellaneous", count: 45, description: "Unique tools and specialized resources" }
    ],
    stats: {
        totalResources: 577,
        totalCategories: 13,
        lastUpdate: "2025-08-30"
    }
};

// Command: /gateway-help
const helpCommand = new SlashCommandBuilder()
    .setName('gateway-help')
    .setDescription('Show all available Everything Gateway commands');

client.commands.set(helpCommand.name, {
    data: helpCommand,
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x4F46E5)
            .setTitle('🌌 Everything Gateway Bot Commands')
            .setDescription('Your AI-powered gateway to 577+ handpicked resources + FUN STUFF!')
            .addFields(
                { name: '**🌟 GATEWAY COMMANDS**', value: '_ _', inline: false },
                { name: '📊 `/gateway-stats`', value: 'View Gateway statistics', inline: true },
                { name: '📋 `/list-categories`', value: 'Show all 13 categories', inline: true },
                { name: '🏷️ `/explore-category`', value: 'Deep dive into categories', inline: true },
                { name: '🎲 `/random-resource`', value: 'Discover random resources', inline: true },
                { name: '🤖 `/ai-commands`', value: 'AI assistant capabilities', inline: true },
                { name: '_ _', value: '_ _', inline: true },
                { name: '**🎮 FUN & UTILITY**', value: '_ _', inline: false },
                { name: '🎱 `/8ball <question>`', value: 'Ask the magic 8-ball!', inline: true },
                { name: '😂 `/joke`', value: 'Get a random joke', inline: true },
                { name: '📊 `/poll <question>`', value: 'Create interactive polls', inline: true },
                { name: '📈 `/server-info`', value: 'Server statistics & info', inline: true },
                { name: '👤 `/user-info [user]`', value: 'User information & stats', inline: true },
                { name: '_ _', value: '_ _', inline: true }
            )
            .addFields(
                { name: '🌐 Visit the Gateway', value: '[everything-gateway.netlify.app](https://everything-gateway.netlify.app/)', inline: false }
            )
            .setFooter({ text: 'Made with 💜 | One person, one old laptop, big dreams' })
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    }
});

// Command: /gateway-stats
const statsCommand = new SlashCommandBuilder()
    .setName('gateway-stats')
    .setDescription('View Everything Gateway statistics and overview');

client.commands.set(statsCommand.name, {
    data: statsCommand,
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x10B981)
            .setTitle('📊 Everything Gateway Statistics')
            .setDescription('**Your gateway to the internet\'s best resources**')
            .addFields(
                { name: '🔢 Total Resources', value: `**${GATEWAY_KNOWLEDGE.stats.totalResources}+**`, inline: true },
                { name: '📂 Categories', value: `**${GATEWAY_KNOWLEDGE.stats.totalCategories}**`, inline: true },
                { name: '🆕 Last Update', value: GATEWAY_KNOWLEDGE.stats.lastUpdate, inline: true },
                { name: '🌟 What We Offer', value: 'Handpicked tools, platforms, and resources across every major category you can imagine.', inline: false },
                { name: '🎯 Our Mission', value: 'One place to access every tool, app, and hidden gem on the internet.', inline: false }
            )
            .setFooter({ text: 'From humble beginnings to your gateway to everything 🌌' })
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    }
});

// Command: /list-categories
const categoriesCommand = new SlashCommandBuilder()
    .setName('list-categories')
    .setDescription('Show all resource categories in the Everything Gateway');

client.commands.set(categoriesCommand.name, {
    data: categoriesCommand,
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x8B5CF6)
            .setTitle('📂 Everything Gateway Categories')
            .setDescription('Explore our handpicked collection across 13+ categories:');
        
        // Add fields for each category (Discord has a limit of 25 fields)
        GATEWAY_KNOWLEDGE.categories.forEach((category, index) => {
            if (index < 25) { // Discord embed field limit
                embed.addFields({
                    name: `${category.name} (${category.count})`,
                    value: category.description,
                    inline: true
                });
            }
        });
        
        embed.setFooter({ text: 'Use /explore-category to dive deeper into any category' })
             .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    }
});

// Command: /explore-category
const exploreCategoryCommand = new SlashCommandBuilder()
    .setName('explore-category')
    .setDescription('Explore a specific category in detail')
    .addStringOption(option =>
        option.setName('category')
            .setDescription('Choose a category to explore')
            .setRequired(true)
            .addChoices(
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
            ));

client.commands.set(exploreCategoryCommand.name, {
    data: exploreCategoryCommand,
    async execute(interaction) {
        const categoryChoice = interaction.options.getString('category');
        
        const categoryDetails = {
            'search': {
                name: 'Search Engines',
                count: 39,
                description: 'Comprehensive search tools for every need',
                highlights: ['Google, Bing, DuckDuckGo', 'Academic search engines', 'Specialized search tools', 'Privacy-focused options'],
                color: 0xEF4444
            },
            'tools': {
                name: 'Tools & Utilities',
                count: 52,
                description: 'Essential tools for productivity and development',
                highlights: ['Development tools', 'System utilities', 'Productivity apps', 'File converters'],
                color: 0x06B6D4
            },
            'entertainment': {
                name: 'Entertainment & Media',
                count: 51,
                description: 'Streaming, gaming, and media platforms',
                highlights: ['Video streaming services', 'Music platforms', 'Gaming resources', 'Media discovery'],
                color: 0xF59E0B
            },
            'knowledge': {
                name: 'Knowledge & Learning',
                count: 53,
                description: 'Educational resources and learning platforms',
                highlights: ['Online courses', 'Documentation hubs', 'Research tools', 'Educational content'],
                color: 0x10B981
            },
            'design': {
                name: 'Creative & Design',
                count: 44,
                description: 'Tools for creators and designers',
                highlights: ['Design software', 'Creative inspiration', 'Asset libraries', 'Collaboration tools'],
                color: 0xEC4899
            },
            'ai': {
                name: 'AI & Machine Learning',
                count: 35,
                description: 'AI tools and machine learning platforms',
                highlights: ['ChatGPT and AI assistants', 'ML platforms', 'AI development tools', 'Automation tools'],
                color: 0x6366F1
            },
            'developer': {
                name: 'Developer Resources',
                count: 49,
                description: 'Essential resources for developers',
                highlights: ['GitHub and repositories', 'API documentation', 'Development platforms', 'Code tools'],
                color: 0x8B5CF6
            }
        };
        
        const category = categoryDetails[categoryChoice] || categoryDetails['tools'];
        
        const embed = new EmbedBuilder()
            .setColor(category.color)
            .setTitle(`🎯 ${category.name}`)
            .setDescription(`**${category.count} carefully curated resources**\n\n${category.description}`)
            .addFields(
                { name: '✨ What You\'ll Find', value: category.highlights.join('\n• '), inline: false },
                { name: '🔗 Access', value: 'Visit [Everything Gateway](https://everything-gateway.netlify.app/) to explore all resources in this category', inline: false }
            )
            .setFooter({ text: 'Every resource is handpicked and quality-verified' })
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    }
});

// Command: /random-resource
const randomCommand = new SlashCommandBuilder()
    .setName('random-resource')
    .setDescription('Discover a random resource from the Everything Gateway');

client.commands.set(randomCommand.name, {
    data: randomCommand,
    async execute(interaction) {
        // Sample random resources (in a real implementation, this would be dynamic)
        const sampleResources = [
            { name: 'GitHub', category: 'Developer Resources', description: 'World\'s leading software development platform' },
            { name: 'Figma', category: 'Creative & Design', description: 'Collaborative interface design tool' },
            { name: 'Notion', category: 'Tools & Utilities', description: 'All-in-one workspace for notes and collaboration' },
            { name: 'ChatGPT', category: 'AI & Machine Learning', description: 'AI conversational assistant' },
            { name: 'Spotify', category: 'Entertainment & Media', description: 'Music streaming platform' },
            { name: 'Khan Academy', category: 'Knowledge & Learning', description: 'Free online learning platform' },
            { name: 'DuckDuckGo', category: 'Search Engines', description: 'Privacy-focused search engine' },
            { name: 'Discord', category: 'Social & Communication', description: 'Voice, video and text communication platform' }
        ];
        
        const randomResource = sampleResources[Math.floor(Math.random() * sampleResources.length)];
        
        const embed = new EmbedBuilder()
            .setColor(0xF59E0B)
            .setTitle('🎲 Random Discovery')
            .setDescription(`**${randomResource.name}**`)
            .addFields(
                { name: '📂 Category', value: randomResource.category, inline: true },
                { name: '📝 Description', value: randomResource.description, inline: false },
                { name: '🔍 Find More', value: 'Use `/explore-category` to discover similar resources', inline: false }
            )
            .setFooter({ text: 'Discover something new every time! 🌟' })
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    }
});

// Command: /ai-commands
const aiCommandsCommand = new SlashCommandBuilder()
    .setName('ai-commands')
    .setDescription('Learn about the Gateway AI assistant capabilities');

// Command: /8ball - Magic 8-ball
const eightBallCommand = new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Ask the magic 8-ball a question!')
    .addStringOption(option =>
        option.setName('question')
            .setDescription('Your question for the magic 8-ball')
            .setRequired(true));

// Command: /joke - Tell a joke
const jokeCommand = new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Get a random joke to brighten your day!');

// Command: /poll - Create a poll
const pollCommand = new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a poll for your server!')
    .addStringOption(option =>
        option.setName('question')
            .setDescription('The poll question')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('option1')
            .setDescription('First poll option')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('option2')
            .setDescription('Second poll option')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('option3')
            .setDescription('Third poll option')
            .setRequired(false))
    .addStringOption(option =>
        option.setName('option4')
            .setDescription('Fourth poll option')
            .setRequired(false));

// Command: /server-info - Server information
const serverInfoCommand = new SlashCommandBuilder()
    .setName('server-info')
    .setDescription('Get detailed information about this server');

// Command: /user-info - User information  
const userInfoCommand = new SlashCommandBuilder()
    .setName('user-info')
    .setDescription('Get information about a user')
    .addUserOption(option =>
        option.setName('user')
            .setDescription('The user to get info about')
            .setRequired(false));

client.commands.set(aiCommandsCommand.name, {
    data: aiCommandsCommand,
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x6366F1)
            .setTitle('🤖 Gateway AI Assistant')
            .setDescription('**Your lightweight, homebrew app controller AI**')
            .addFields(
                { name: '🧠 What I Know', value: 'Every resource in our ecosystem - all 577+ tools, platforms, and hidden gems', inline: false },
                { name: '⚡ Available Commands', value: '• `/list-categories` - Browse all categories\n• `/explore-category` - Dive deep into topics\n• `/search-resources` - Find specific tools\n• `/random-resource` - Discover new gems', inline: false },
                { name: '🌐 Web AI Features', value: 'Visit the main site for advanced AI features:\n• Natural language queries\n• Smart command system\n• 16 structured AI commands', inline: false },
                { name: '🌱 Growing Together', value: 'With time and community support, we\'ll upgrade this AI much more. For now, we stay humble.', inline: false }
            )
            .setFooter({ text: 'This is just the beginning 🌌' })
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    }
});

// 8-Ball Command Implementation
client.commands.set(eightBallCommand.name, {
    data: eightBallCommand,
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const responses = [
            '🎯 It is certain', '🎯 Without a doubt', '🎯 Yes definitely', '🎯 You may rely on it',
            '🎯 As I see it, yes', '🎯 Most likely', '🎯 Outlook good', '🎯 Yes',
            '🤔 Reply hazy, try again', '🤔 Ask again later', '🤔 Better not tell you now',
            '🤔 Cannot predict now', '🤔 Concentrate and ask again',
            '❌ Don\'t count on it', '❌ My reply is no', '❌ My sources say no',
            '❌ Outlook not so good', '❌ Very doubtful'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const embed = new EmbedBuilder()
            .setColor(0x9333EA)
            .setTitle('🎱 Magic 8-Ball')
            .addFields(
                { name: '❓ Your Question', value: question, inline: false },
                { name: '🔮 The 8-Ball Says...', value: randomResponse, inline: false }
            )
            .setFooter({ text: 'The magic 8-ball has spoken! 🌌' })
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    }
});

// Joke Command Implementation
client.commands.set(jokeCommand.name, {
    data: jokeCommand,
    async execute(interaction) {
        const jokes = [
            {
                setup: 'Why don\'t scientists trust atoms?',
                punchline: 'Because they make up everything! 🧬'
            },
            {
                setup: 'Why did the developer go broke?',
                punchline: 'Because he used up all his cache! 💸'
            },
            {
                setup: 'Why do programmers prefer dark mode?',
                punchline: 'Because light attracts bugs! 🐛'
            },
            {
                setup: 'What\'s a computer\'s favorite snack?',
                punchline: 'Microchips! 🍟'
            },
            {
                setup: 'Why did the bot cross the road?',
                punchline: 'To get to the other site! 🌐'
            },
            {
                setup: 'How many developers does it take to change a light bulb?',
                punchline: 'None, that\'s a hardware problem! 💡'
            }
        ];
        
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        
        const embed = new EmbedBuilder()
            .setColor(0xF59E0B)
            .setTitle('😂 Here\'s a Joke for You!')
            .addFields(
                { name: '🎭 Setup', value: randomJoke.setup, inline: false },
                { name: '🎉 Punchline', value: randomJoke.punchline, inline: false }
            )
            .setFooter({ text: 'Hope that made you smile! 🌌' })
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    }
});

// Poll Command Implementation
client.commands.set(pollCommand.name, {
    data: pollCommand,
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const option1 = interaction.options.getString('option1');
        const option2 = interaction.options.getString('option2');
        const option3 = interaction.options.getString('option3');
        const option4 = interaction.options.getString('option4');
        
        const options = [option1, option2];
        if (option3) options.push(option3);
        if (option4) options.push(option4);
        
        const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣'];
        
        let optionsText = '';
        options.forEach((option, index) => {
            optionsText += `${emojis[index]} ${option}\n`;
        });
        
        const embed = new EmbedBuilder()
            .setColor(0x10B981)
            .setTitle('📊 Poll Created!')
            .setDescription(`**${question}**\n\n${optionsText}`)
            .setFooter({ text: 'React with the emojis to vote! 🌌' })
            .setTimestamp();
        
        const message = await interaction.reply({ embeds: [embed], fetchReply: true });
        
        // Add reactions for voting
        for (let i = 0; i < options.length; i++) {
            await message.react(emojis[i]);
        }
    }
});

// Server Info Command Implementation
client.commands.set(serverInfoCommand.name, {
    data: serverInfoCommand,
    async execute(interaction) {
        const guild = interaction.guild;
        
        const embed = new EmbedBuilder()
            .setColor(0x5865F2)
            .setTitle(`📊 ${guild.name} Server Info`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: '👑 Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: '👥 Members', value: guild.memberCount.toString(), inline: true },
                { name: '📅 Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
                { name: '🏷️ Server ID', value: guild.id, inline: true },
                { name: '🌍 Region', value: guild.preferredLocale || 'Unknown', inline: true },
                { name: '🔒 Verification Level', value: guild.verificationLevel.toString(), inline: true },
                { name: '📺 Channels', value: guild.channels.cache.size.toString(), inline: true },
                { name: '🎭 Roles', value: guild.roles.cache.size.toString(), inline: true },
                { name: '😄 Emojis', value: guild.emojis.cache.size.toString(), inline: true }
            )
            .setFooter({ text: 'Everything Gateway Bot | Server Statistics 🌌' })
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    }
});

// User Info Command Implementation
client.commands.set(userInfoCommand.name, {
    data: userInfoCommand,
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);
        
        const embed = new EmbedBuilder()
            .setColor(0xEC4899)
            .setTitle(`👤 ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: '🆔 User ID', value: user.id, inline: true },
                { name: '📅 Account Created', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: '🤖 Bot?', value: user.bot ? 'Yes' : 'No', inline: true }
            );
        
        if (member) {
            embed.addFields(
                { name: '📝 Nickname', value: member.nickname || 'None', inline: true },
                { name: '📅 Joined Server', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: '🎭 Roles', value: member.roles.cache.size > 1 ? `${member.roles.cache.size - 1} roles` : 'No roles', inline: true }
            );
        }
        
        embed.setFooter({ text: 'Everything Gateway Bot | User Information 🌌' })
             .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
    }
});

// Bot ready event
client.once('ready', async () => {
    console.log(`🌌 Everything Gateway Bot is online as ${client.user.tag}!`);
    console.log(`📊 Connected to ${client.guilds.cache.size} servers`);
    
    // Register slash commands
    try {
        console.log('🔄 Started refreshing application (/) commands...');
        
        const commands = [];
        client.commands.forEach(command => {
            commands.push(command.data.toJSON());
        });
        
        // Register commands globally (takes up to 1 hour to propagate)
        await client.application.commands.set(commands);
        console.log('✅ Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('❌ Error registering commands:', error);
    }
    
    // Set bot status
    client.user.setActivity('🌌 Gateway to 577+ resources | /gateway-help', { type: 'WATCHING' });
});

// Handle slash command interactions
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    
    try {
        await command.execute(interaction);
        console.log(`✅ Command executed: ${interaction.commandName} by ${interaction.user.tag}`);
    } catch (error) {
        console.error(`❌ Error executing command ${interaction.commandName}:`, error);
        
        const errorEmbed = new EmbedBuilder()
            .setColor(0xEF4444)
            .setTitle('❌ Oops! Something went wrong')
            .setDescription('There was an error executing this command. Please try again.')
            .setFooter({ text: 'If this persists, visit everything-gateway.netlify.app' });
        
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
        } else {
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    }
});

// Error handling
process.on('unhandledRejection', error => {
    console.error('❌ Unhandled promise rejection:', error);
});

// Start the bot
if (!process.env.DISCORD_TOKEN) {
    console.error('❌ DISCORD_TOKEN is required! Please check your .env file.');
    process.exit(1);
}

client.login(process.env.DISCORD_TOKEN);
