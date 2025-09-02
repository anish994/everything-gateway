// 🌈 Discord Category Showcase Population Script
// This fills all 15 category channels with stunning, resource-rich content

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const GUILD_ID = '1411262001652432928';

// Category showcase content with top resources and highlights
const categoryShowcases = {
    'search-engines': {
        embed: {
            title: '🔍 Search Engines Category',
            description: 'Discover the web with 39 powerful search engines beyond Google!',
            color: 0x3B82F6,
            thumbnail: '🔍',
            fields: [
                {
                    name: '🌟 Top Picks',
                    value: '• **DuckDuckGo** - Privacy-first search\n• **Startpage** - Google results without tracking\n• **Searx** - Open-source metasearch\n• **Yandex** - Russian search giant\n• **Bing** - Microsoft\'s search engine',
                    inline: true
                },
                {
                    name: '🎯 Specialized Search',
                    value: '• **Wolfram Alpha** - Computational search\n• **Shodan** - IoT device search\n• **Have I Been Pwned** - Data breach search\n• **TinEye** - Reverse image search\n• **Archive.org** - Internet archive search',
                    inline: true
                },
                {
                    name: '🔬 Academic & Research',
                    value: '• **Google Scholar** - Academic papers\n• **JSTOR** - Academic journals\n• **PubMed** - Medical research\n• **arXiv** - Scientific preprints\n• **ResearchGate** - Research network',
                    inline: false
                },
                {
                    name: '💡 Fun Facts',
                    value: '🌍 Did you know? There are over 100 search engines worldwide!\n⚡ DuckDuckGo processes 100+ million searches daily\n🔒 Privacy-focused engines don\'t store your data\n🤖 Some search engines are AI-powered',
                    inline: false
                },
                {
                    name: '🚀 Quick Access',
                    value: '[🌐 Browse All Search Engines](https://cheery-flan-dc1088.netlify.app/search-engines)\n[🧠 Ask AI Controller](https://cheery-flan-dc1088.netlify.app) "open search engines"',
                    inline: false
                }
            ],
            footer: { text: '39 Search Engines • Privacy, Speed, Specialization 🔍' }
        },
        pin: true
    },

    'hidden-treasures': {
        embed: {
            title: '💎 Hidden Treasures Category',
            description: 'Uncover 80+ secret gems and underground tools that most people never find!',
            color: 0x7C3AED,
            fields: [
                {
                    name: '🏴‍☠️ Underground Gems',
                    value: '• **Library Genesis** - Free academic books\n• **Sci-Hub** - Research papers access\n• **Internet Archive** - Digital library\n• **Z-Library** - Massive book collection\n• **OpenLibrary** - Open book repository',
                    inline: true
                },
                {
                    name: '🛠️ Secret Tools',
                    value: '• **12ft.io** - Bypass paywalls\n• **Remove.bg** - Background removal\n• **ThisPersonDoesNotExist** - AI faces\n• **Temp-Mail** - Disposable emails\n• **10minutemail** - Temporary inbox',
                    inline: true
                },
                {
                    name: '🎨 Creative Secrets',
                    value: '• **Unsplash** - Free HD photos\n• **Pexels** - Stock photography\n• **Freepik** - Graphics & vectors\n• **Mixkit** - Free video clips\n• **Zapsplat** - Sound effects library',
                    inline: false
                },
                {
                    name: '🔥 Power User Tips',
                    value: '🕵️ These tools are often shared in underground communities\n💰 Most are completely free but incredibly powerful\n🤫 Many have features that paid alternatives lack\n⚡ Perfect for students, developers, and creators',
                    inline: false
                },
                {
                    name: '🗝️ Access Portal',
                    value: '[💎 Explore Hidden Treasures](https://cheery-flan-dc1088.netlify.app/hidden-treasures)\n[🧠 AI Discovery](https://cheery-flan-dc1088.netlify.app) "show me hidden gems"',
                    inline: false
                }
            ],
            footer: { text: '80+ Hidden Gems • Underground • Secret Tools 💎' }
        },
        pin: true
    },

    'tools-and-utilities': {
        embed: {
            title: '🛠️ Tools & Utilities Category',
            description: 'Power up with 52 essential tools for productivity and system optimization!',
            color: 0x059669,
            fields: [
                {
                    name: '⚡ Productivity Powerhouses',
                    value: '• **Notion** - All-in-one workspace\n• **Obsidian** - Knowledge management\n• **Todoist** - Task management\n• **RescueTime** - Time tracking\n• **IFTTT** - Automation platform',
                    inline: true
                },
                {
                    name: '🔧 System & Technical',
                    value: '• **CPU-Z** - Hardware info\n• **WinDirStat** - Disk usage analyzer\n• **Process Monitor** - System monitoring\n• **7-Zip** - File compression\n• **Everything** - File search',
                    inline: true
                },
                {
                    name: '🌐 Web & Browser Tools',
                    value: '• **uBlock Origin** - Ad blocker\n• **LastPass** - Password manager\n• **Honey** - Coupon finder\n• **Grammarly** - Writing assistant\n• **ColorZilla** - Color picker',
                    inline: false
                },
                {
                    name: '💡 Pro Tips',
                    value: '🚀 Combine tools for maximum productivity\n⚙️ Many tools have browser extensions\n🆓 Most utilities offer free tiers\n📱 Many have mobile companion apps',
                    inline: false
                },
                {
                    name: '🔗 Tool Arsenal',
                    value: '[🛠️ Browse All Tools](https://cheery-flan-dc1088.netlify.app/tools-utilities)\n[🧠 Find Perfect Tool](https://cheery-flan-dc1088.netlify.app) "I need productivity tools"',
                    inline: false
                }
            ],
            footer: { text: '52 Tools & Utilities • Productivity • Optimization 🛠️' }
        },
        pin: true
    },

    'developers': {
        embed: {
            title: '💻 Developers Category',
            description: 'Code better with 49 essential development platforms and tools!',
            color: 0x1F2937,
            fields: [
                {
                    name: '🏠 Code Repositories',
                    value: '• **GitHub** - World\'s largest code host\n• **GitLab** - DevOps platform\n• **Bitbucket** - Atlassian\'s Git solution\n• **SourceForge** - Open source projects\n• **CodePen** - Frontend playground',
                    inline: true
                },
                {
                    name: '🚀 Development Platforms',
                    value: '• **Stack Overflow** - Developer Q&A\n• **Replit** - Online IDE\n• **Glitch** - Web app hosting\n• **Heroku** - Cloud platform\n• **Vercel** - Frontend deployment',
                    inline: true
                },
                {
                    name: '📚 Learning & Documentation',
                    value: '• **MDN Web Docs** - Web standards\n• **freeCodeCamp** - Coding bootcamp\n• **LeetCode** - Algorithm practice\n• **HackerRank** - Coding challenges\n• **Codecademy** - Interactive learning',
                    inline: false
                },
                {
                    name: '🔥 Developer Insights',
                    value: '📈 GitHub hosts 200M+ repositories\n👥 40M+ developers use Stack Overflow\n🌟 Open source powers 96% of applications\n⚡ DevOps tools save 30% development time',
                    inline: false
                },
                {
                    name: '💻 Developer Hub',
                    value: '[💻 Explore Developer Tools](https://cheery-flan-dc1088.netlify.app/developers)\n[🧠 Find Dev Resources](https://cheery-flan-dc1088.netlify.app) "show me coding platforms"',
                    inline: false
                }
            ],
            footer: { text: '49 Developer Resources • Code • Deploy • Learn 💻' }
        },
        pin: true
    },

    'design-and-creative': {
        embed: {
            title: '🎨 Design & Creative Category',
            description: 'Create amazing visuals with 44 powerful design tools and creative platforms!',
            color: 0xEC4899,
            fields: [
                {
                    name: '🎨 Design Powerhouses',
                    value: '• **Figma** - Collaborative design\n• **Canva** - Easy graphic design\n• **Adobe Creative Suite** - Professional tools\n• **Sketch** - UI/UX design\n• **InVision** - Prototyping platform',
                    inline: true
                },
                {
                    name: '🖼️ Visual Resources',
                    value: '• **Dribbble** - Design inspiration\n• **Behance** - Creative showcase\n• **Pinterest** - Visual discovery\n• **Unsplash** - Free photography\n• **Pexels** - Stock visuals',
                    inline: true
                },
                {
                    name: '🌈 Color & Typography',
                    value: '• **Coolors** - Color palette generator\n• **Adobe Color** - Color wheel\n• **Google Fonts** - Web typography\n• **Font Awesome** - Icon library\n• **Feather Icons** - Simple icons',
                    inline: false
                },
                {
                    name: '✨ Creative Stats',
                    value: '🎯 Figma has 4M+ active users\n🌟 Canva users create 150+ designs/second\n🎨 Visual content is 40x more likely to be shared\n📱 90% of information is processed visually',
                    inline: false
                },
                {
                    name: '🎨 Creative Studio',
                    value: '[🎨 Browse Design Tools](https://cheery-flan-dc1088.netlify.app/design-creative)\n[🧠 Find Design Tool](https://cheery-flan-dc1088.netlify.app) "I need design software"',
                    inline: false
                }
            ],
            footer: { text: '44 Design Tools • Create • Inspire • Design 🎨' }
        },
        pin: true
    },

    'entertainment': {
        embed: {
            title: '🎬 Entertainment Category',
            description: 'Dive into 51 amazing entertainment platforms for movies, shows, and fun!',
            color: 0xF59E0B,
            fields: [
                {
                    name: '🎭 Streaming Giants',
                    value: '• **Netflix** - Original content king\n• **Disney+** - Family entertainment\n• **Amazon Prime** - Massive library\n• **Hulu** - TV show specialist\n• **HBO Max** - Premium content',
                    inline: true
                },
                {
                    name: '🎮 Gaming & Interactive',
                    value: '• **Twitch** - Live game streaming\n• **YouTube Gaming** - Gaming content\n• **Steam** - PC gaming platform\n• **Epic Games** - Free weekly games\n• **Xbox Game Pass** - Gaming subscription',
                    inline: true
                },
                {
                    name: '🎵 Music & Audio',
                    value: '• **Spotify** - Music streaming\n• **YouTube Music** - Video + audio\n• **Apple Music** - High-quality audio\n• **Podcasts** - Audio storytelling\n• **SoundCloud** - Independent artists',
                    inline: false
                },
                {
                    name: '📊 Entertainment Facts',
                    value: '📺 Average person watches 2.8 hours of video daily\n🎮 3.2 billion people play video games globally\n🎵 Music streaming grew 13% in 2023\n🍿 Netflix has 260M+ subscribers worldwide',
                    inline: false
                },
                {
                    name: '🎪 Entertainment Hub',
                    value: '[🎬 Explore Entertainment](https://cheery-flan-dc1088.netlify.app/entertainment)\n[🧠 Find Shows](https://cheery-flan-dc1088.netlify.app) "recommend entertainment platforms"',
                    inline: false
                }
            ],
            footer: { text: '51 Entertainment Platforms • Stream • Play • Enjoy 🎬' }
        },
        pin: true
    },

    'anime-and-manga': {
        embed: {
            title: '🍜 Anime & Manga Category',
            description: 'Explore 48 otaku paradise platforms for anime, manga, and Japanese culture!',
            color: 0xF43F5E,
            fields: [
                {
                    name: '📺 Anime Streaming',
                    value: '• **Crunchyroll** - Largest anime library\n• **Funimation** - Dubbed anime specialist\n• **AnimeLab** - Australian anime platform\n• **VRV** - Anime + more content\n• **Tubi** - Free anime selection',
                    inline: true
                },
                {
                    name: '📚 Manga Reading',
                    value: '• **MangaPlus** - Official Shueisha\n• **VIZ Media** - English manga\n• **ComiXology** - Digital comics\n• **Manga Rock** - Community platform\n• **Webtoon** - Digital manhwa',
                    inline: true
                },
                {
                    name: '🌸 Community & Culture',
                    value: '• **MyAnimeList** - Anime database\n• **AniList** - Modern tracking\n• **Kitsu** - Social anime platform\n• **Reddit r/anime** - Discussion hub\n• **AnimePlanet** - Recommendations',
                    inline: false
                },
                {
                    name: '🎌 Otaku Insights',
                    value: '🌍 Anime industry worth $25+ billion globally\n📖 Manga sales increased 171% in 2021\n👥 100M+ people watch anime worldwide\n🇯🇵 Japan produces 300+ anime series annually',
                    inline: false
                },
                {
                    name: '⛩️ Otaku Central',
                    value: '[🍜 Browse Anime Resources](https://cheery-flan-dc1088.netlify.app/anime-manga)\n[🧠 Find Anime](https://cheery-flan-dc1088.netlify.app) "recommend anime platforms"',
                    inline: false
                }
            ],
            footer: { text: '48 Anime & Manga Sites • Otaku • Culture • Community 🍜' }
        },
        pin: true
    },

    'knowledge': {
        embed: {
            title: '📚 Knowledge Category',
            description: 'Learn anything with 53 educational platforms and knowledge resources!',
            color: 0x0EA5E9,
            fields: [
                {
                    name: '🎓 Online Learning',
                    value: '• **Coursera** - University courses\n• **edX** - Harvard, MIT courses\n• **Udemy** - Practical skills\n• **Khan Academy** - Free education\n• **Skillshare** - Creative learning',
                    inline: true
                },
                {
                    name: '📖 Knowledge Bases',
                    value: '• **Wikipedia** - Free encyclopedia\n• **Britannica** - Trusted source\n• **Wolfram Alpha** - Computational knowledge\n• **TED** - Ideas worth spreading\n• **Big Think** - Expert insights',
                    inline: true
                },
                {
                    name: '🔬 Academic Resources',
                    value: '• **Google Scholar** - Research papers\n• **JSTOR** - Academic journals\n• **ResearchGate** - Scientific network\n• **arXiv** - Preprint repository\n• **PubMed** - Medical literature',
                    inline: false
                },
                {
                    name: '🧠 Learning Stats',
                    value: '📈 Online learning market: $350+ billion\n👨‍🎓 100M+ students on Coursera\n📚 6M+ articles on Wikipedia\n🎯 70% of learners prefer online courses',
                    inline: false
                },
                {
                    name: '🎯 Learning Portal',
                    value: '[📚 Explore Knowledge Resources](https://cheery-flan-dc1088.netlify.app/knowledge)\n[🧠 Find Learning](https://cheery-flan-dc1088.netlify.app) "help me learn something new"',
                    inline: false
                }
            ],
            footer: { text: '53 Knowledge Resources • Learn • Grow • Discover 📚' }
        },
        pin: true
    },

    'social-media': {
        embed: {
            title: '📱 Social Media Category',
            description: 'Connect with 47 social platforms and community networks worldwide!',
            color: 0x8B5CF6,
            fields: [
                {
                    name: '🌐 Global Platforms',
                    value: '• **Facebook** - 3B+ users worldwide\n• **Instagram** - Visual storytelling\n• **Twitter/X** - Real-time updates\n• **LinkedIn** - Professional network\n• **TikTok** - Short-form videos',
                    inline: true
                },
                {
                    name: '🎯 Specialized Networks',
                    value: '• **Discord** - Gaming & communities\n• **Reddit** - Interest-based forums\n• **Pinterest** - Visual discovery\n• **Snapchat** - Ephemeral content\n• **Clubhouse** - Audio conversations',
                    inline: true
                },
                {
                    name: '🌏 Regional & Niche',
                    value: '• **WeChat** - China\'s super app\n• **WhatsApp** - Global messaging\n• **Telegram** - Secure messaging\n• **Signal** - Privacy-focused\n• **VKontakte** - Russian social network',
                    inline: false
                },
                {
                    name: '📊 Social Stats',
                    value: '👥 4.8 billion social media users globally\n⏰ Average 2.5 hours daily on social media\n📱 99% access social media via mobile\n🚀 New platforms emerge every year',
                    inline: false
                },
                {
                    name: '🔗 Social Hub',
                    value: '[📱 Browse Social Platforms](https://cheery-flan-dc1088.netlify.app/social-media)\n[🧠 Find Social Networks](https://cheery-flan-dc1088.netlify.app) "show me social platforms"',
                    inline: false
                }
            ],
            footer: { text: '47 Social Platforms • Connect • Share • Engage 📱' }
        },
        pin: true
    },

    'lifestyle-and-shopping': {
        embed: {
            title: '🛍️ Lifestyle & Shopping Category',
            description: 'Enhance your life with 48 shopping platforms and lifestyle services!',
            color: 0x10B981,
            fields: [
                {
                    name: '🛒 E-commerce Giants',
                    value: '• **Amazon** - Everything store\n• **eBay** - Auction & marketplace\n• **AliExpress** - Global marketplace\n• **Etsy** - Handmade & vintage\n• **Shopify** - Online store platform',
                    inline: true
                },
                {
                    name: '👕 Fashion & Style',
                    value: '• **ASOS** - Fashion forward\n• **Zara** - Fast fashion\n• **Nike** - Athletic wear\n• **H&M** - Affordable fashion\n• **Uniqlo** - Japanese basics',
                    inline: true
                },
                {
                    name: '🏠 Home & Lifestyle',
                    value: '• **IKEA** - Furniture & home\n• **Wayfair** - Home goods\n• **Target** - Everything for home\n• **Best Buy** - Electronics\n• **Home Depot** - DIY & tools',
                    inline: false
                },
                {
                    name: '💳 Shopping Insights',
                    value: '🌍 Global e-commerce: $6.2 trillion annually\n📱 79% shop on mobile devices\n🚚 Amazon delivers 13M packages daily\n💰 Average person spends $1,800 online yearly',
                    inline: false
                },
                {
                    name: '🛍️ Shopping Central',
                    value: '[🛍️ Browse Shopping Platforms](https://cheery-flan-dc1088.netlify.app/lifestyle-shopping)\n[🧠 Find Deals](https://cheery-flan-dc1088.netlify.app) "help me find shopping deals"',
                    inline: false
                }
            ],
            footer: { text: '48 Shopping Platforms • Style • Home • Life 🛍️' }
        },
        pin: true
    },

    'gaming-and-esports': {
        embed: {
            title: '🎮 Gaming & Esports Category',
            description: 'Level up with 42 gaming platforms and esports communities!',
            color: 0x7C3AED,
            fields: [
                {
                    name: '🎯 Gaming Platforms',
                    value: '• **Steam** - PC gaming library\n• **Epic Games** - Free weekly games\n• **Xbox Game Pass** - Gaming subscription\n• **PlayStation Plus** - Console gaming\n• **Nintendo eShop** - Nintendo exclusives',
                    inline: true
                },
                {
                    name: '🏆 Esports & Streaming',
                    value: '• **Twitch** - Live game streaming\n• **YouTube Gaming** - Gaming content\n• **ESL** - Professional esports\n• **FACEIT** - Competitive platform\n• **Discord** - Gaming communities',
                    inline: true
                },
                {
                    name: '📱 Mobile & Casual',
                    value: '• **App Store** - iOS games\n• **Google Play** - Android games\n• **Roblox** - User-generated games\n• **Among Us** - Social deduction\n• **Minecraft** - Creative building',
                    inline: false
                },
                {
                    name: '🎮 Gaming Stats',
                    value: '👾 3.2 billion gamers worldwide\n💰 Gaming industry: $200+ billion\n⚡ Esports viewership: 540M+ people\n📱 Mobile gaming: 60% of revenue',
                    inline: false
                },
                {
                    name: '🕹️ Gaming Hub',
                    value: '[🎮 Explore Gaming Platforms](https://cheery-flan-dc1088.netlify.app/gaming-esports)\n[🧠 Find Games](https://cheery-flan-dc1088.netlify.app) "recommend gaming platforms"',
                    inline: false
                }
            ],
            footer: { text: '42 Gaming Platforms • Play • Compete • Stream 🎮' }
        },
        pin: true
    },

    'music': {
        embed: {
            title: '🎵 Music Category',
            description: 'Discover sound with 40+ music streaming and creation platforms!',
            color: 0xF43F5E,
            fields: [
                {
                    name: '🎧 Streaming Services',
                    value: '• **Spotify** - 450M+ users\n• **Apple Music** - High-quality audio\n• **YouTube Music** - Video integration\n• **Amazon Music** - Prime included\n• **Tidal** - Lossless audio',
                    inline: true
                },
                {
                    name: '🎹 Creation & Production',
                    value: '• **FL Studio** - Music production\n• **Ableton Live** - Professional DAW\n• **GarageBand** - Beginner-friendly\n• **Audacity** - Free audio editor\n• **BandLab** - Online collaboration',
                    inline: true
                },
                {
                    name: '🎤 Discovery & Community',
                    value: '• **SoundCloud** - Independent artists\n• **Bandcamp** - Artist-friendly platform\n• **Last.fm** - Music scrobbling\n• **Genius** - Song lyrics & meanings\n• **Shazam** - Music identification',
                    inline: false
                },
                {
                    name: '🎶 Music Insights',
                    value: '🌍 500M+ songs available digitally\n⏰ People listen to 18+ hours weekly\n📱 Streaming is 85% of music revenue\n🎧 Spotify has 200M+ paid subscribers',
                    inline: false
                },
                {
                    name: '🎵 Music Portal',
                    value: '[🎵 Browse Music Platforms](https://cheery-flan-dc1088.netlify.app/music)\n[🧠 Find Music](https://cheery-flan-dc1088.netlify.app) "help me discover music"',
                    inline: false
                }
            ],
            footer: { text: '40+ Music Platforms • Stream • Create • Discover 🎵' }
        },
        pin: true
    },

    'news-and-trends': {
        embed: {
            title: '📰 News & Trends Category',
            description: 'Stay informed with 38+ news sources and trend tracking platforms!',
            color: 0xDC2626,
            fields: [
                {
                    name: '🌍 Global News',
                    value: '• **BBC News** - World coverage\n• **CNN** - Breaking news\n• **Reuters** - International wire\n• **Associated Press** - News agency\n• **Al Jazeera** - Middle East focus',
                    inline: true
                },
                {
                    name: '💻 Tech & Innovation',
                    value: '• **TechCrunch** - Startup news\n• **Ars Technica** - Deep tech\n• **The Verge** - Technology culture\n• **Wired** - Future insights\n• **Hacker News** - Developer community',
                    inline: true
                },
                {
                    name: '📈 Trends & Analysis',
                    value: '• **Google Trends** - Search trends\n• **Twitter Trending** - Real-time topics\n• **Reddit** - Community discussions\n• **Medium** - Thought leadership\n• **Substack** - Independent journalism',
                    inline: false
                },
                {
                    name: '📊 News Stats',
                    value: '⚡ News travels globally in seconds\n📱 85% consume news on mobile\n🌐 Social media: primary news source\n📰 1,000+ news articles published per minute',
                    inline: false
                },
                {
                    name: '📡 News Center',
                    value: '[📰 Browse News Sources](https://cheery-flan-dc1088.netlify.app/news-trends)\n[🧠 Find News](https://cheery-flan-dc1088.netlify.app) "show me latest tech news"',
                    inline: false
                }
            ],
            footer: { text: '38+ News Sources • Current • Global • Trending 📰' }
        },
        pin: true
    },

    'health-and-fitness': {
        embed: {
            title: '💪 Health & Fitness Category',
            description: 'Get healthy with 43 wellness platforms and fitness tracking tools!',
            color: 0x059669,
            fields: [
                {
                    name: '🏃 Fitness Tracking',
                    value: '• **MyFitnessPal** - Calorie tracking\n• **Strava** - Running & cycling\n• **Fitbit** - Activity monitoring\n• **Garmin Connect** - Sports tracking\n• **Nike Training** - Workout apps',
                    inline: true
                },
                {
                    name: '🧘 Mental Wellness',
                    value: '• **Headspace** - Meditation guide\n• **Calm** - Sleep & relaxation\n• **Insight Timer** - Meditation community\n• **Waking Up** - Philosophy & meditation\n• **Ten Percent Happier** - Mindfulness',
                    inline: true
                },
                {
                    name: '🍎 Nutrition & Health',
                    value: '• **Cronometer** - Nutrient tracking\n• **Lose It!** - Weight management\n• **WebMD** - Health information\n• **Healthline** - Medical insights\n• **Mayo Clinic** - Trusted health',
                    inline: false
                },
                {
                    name: '💚 Health Facts',
                    value: '🏃 Regular exercise reduces disease risk by 50%\n🧘 10 minutes meditation improves focus\n💧 Proper hydration boosts energy 25%\n😴 Good sleep improves memory by 40%',
                    inline: false
                },
                {
                    name: '🌟 Wellness Hub',
                    value: '[💪 Browse Health Platforms](https://cheery-flan-dc1088.netlify.app/health-fitness)\n[🧠 Find Fitness](https://cheery-flan-dc1088.netlify.app) "help me get healthy"',
                    inline: false
                }
            ],
            footer: { text: '43 Health Platforms • Fitness • Wellness • Mindfulness 💪' }
        },
        pin: true
    },

    'crypto-and-blockchain': {
        embed: {
            title: '₿ Crypto & Blockchain Category',
            description: 'Navigate the future with 45 cryptocurrency and blockchain platforms!',
            color: 0xF59E0B,
            fields: [
                {
                    name: '💰 Trading Platforms',
                    value: '• **Coinbase** - Beginner-friendly\n• **Binance** - World\'s largest exchange\n• **Kraken** - Security-focused\n• **KuCoin** - Wide selection\n• **Gemini** - Regulatory compliant',
                    inline: true
                },
                {
                    name: '🔗 DeFi & Web3',
                    value: '• **Uniswap** - Decentralized exchange\n• **MetaMask** - Web3 wallet\n• **OpenSea** - NFT marketplace\n• **Compound** - Lending protocol\n• **Aave** - Liquidity protocol',
                    inline: true
                },
                {
                    name: '📊 Analytics & Research',
                    value: '• **CoinMarketCap** - Price tracking\n• **CoinGecko** - Market data\n• **DeFiPulse** - DeFi analytics\n• **Messari** - Crypto research\n• **Dune Analytics** - Blockchain data',
                    inline: false
                },
                {
                    name: '🚀 Crypto Stats',
                    value: '₿ Bitcoin: First cryptocurrency (2009)\n💎 10,000+ cryptocurrencies exist\n📈 Crypto market cap: $2+ trillion\n🌍 100M+ people own cryptocurrency',
                    inline: false
                },
                {
                    name: '🔐 Crypto Portal',
                    value: '[₿ Explore Crypto Platforms](https://cheery-flan-dc1088.netlify.app/crypto-blockchain)\n[🧠 Learn Crypto](https://cheery-flan-dc1088.netlify.app) "explain cryptocurrency to me"',
                    inline: false
                }
            ],
            footer: { text: '45 Crypto Platforms • Trade • DeFi • Blockchain ₿' }
        },
        pin: true
    }
};

async function populateCategoryShowcases() {
    console.log('🌈 Populating Category Showcase Channels');
    console.log('=======================================');
    console.log('');

    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) {
        console.error('❌ Guild not found!');
        return;
    }

    console.log(`✅ Connected to: ${guild.name}`);
    console.log('');

    let messagesCreated = 0;
    let messagesPinned = 0;
    let failed = 0;

    for (const [channelName, content] of Object.entries(categoryShowcases)) {
        try {
            console.log(`🎨 Showcasing #${channelName}...`);
            
            // Find the channel
            const channel = guild.channels.cache.find(c => c.name === channelName);
            
            if (!channel) {
                console.log(`⚠️  Channel #${channelName} not found, skipping`);
                continue;
            }

            // Create main showcase embed
            const embed = new EmbedBuilder()
                .setTitle(content.embed.title)
                .setDescription(content.embed.description)
                .setColor(content.embed.color)
                .setTimestamp();

            // Add fields
            if (content.embed.fields) {
                content.embed.fields.forEach(field => {
                    embed.addFields(field);
                });
            }

            // Add footer
            if (content.embed.footer) {
                embed.setFooter(content.embed.footer);
            }

            // Send main message
            const message = await channel.send({ embeds: [embed] });
            messagesCreated++;
            console.log(`✅ Created showcase in #${channelName}`);

            // Pin message if specified
            if (content.pin) {
                await message.pin();
                messagesPinned++;
                console.log(`📌 Pinned showcase in #${channelName}`);
            }

            // Add a welcome message for community interaction
            const welcomeMessage = await channel.send(
                `🎉 **Welcome to the ${content.embed.title} showcase!** Share your experiences, ask questions, and discover amazing resources with the community!\n\n*Try mentioning @The Everything Gateway bot or use slash commands!* 🤖`
            );
            messagesCreated++;
            console.log(`💬 Added welcome message to #${channelName}`);

            // Delay to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 2000));

        } catch (error) {
            failed++;
            console.log(`❌ Failed to showcase #${channelName}: ${error.message}`);
        }
    }

    console.log('');
    console.log('🎉 Category showcase population complete!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   🎨 Showcases created: ${Object.keys(categoryShowcases).length}`);
    console.log(`   💬 Total messages: ${messagesCreated}`);
    console.log(`   📌 Messages pinned: ${messagesPinned}`);
    if (failed > 0) {
        console.log(`   ❌ Failed: ${failed} channels`);
    }
    console.log('');
    console.log('🌟 All category channels are now beautifully showcased!');
    console.log('🎨 Each channel has rich content highlighting top resources!');
    console.log('🚀 Your Discord server is a complete resource exploration hub!');
}

// Start the showcase population
client.once('ready', async () => {
    console.log(`🎨 Category showcase bot connected as ${client.user.tag}`);
    
    try {
        await populateCategoryShowcases();
    } catch (error) {
        console.error('💥 Error populating showcases:', error);
    } finally {
        console.log('');
        console.log('🔄 Disconnecting showcase bot...');
        client.destroy();
        process.exit(0);
    }
});

client.login(process.env.DISCORD_TOKEN);
