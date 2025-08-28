/**
 * 🎮 Gateway AI Smart Controller v1.0
 * Native AI interface that feels part of the Gateway ecosystem
 * 
 * This is the user-facing AI that understands natural language and controls everything
 * Powered by the Knowledge Engine for omniscient Gateway awareness
 */

class GatewaySmartController {
    constructor() {
        this.knowledgeEngine = null;
        this.isReady = false;
        this.currentSession = {
            commands: [],
            preferences: {},
            patterns: []
        };
        
        // 🔍 Search Engine Database - Core search engines mapped by keywords
        this.searchEngines = {
            // Mainstream
            'google': { url: 'https://google.com', name: 'Google' },
            'bing': { url: 'https://bing.com', name: 'Bing' },
            'yahoo': { url: 'https://yahoo.com', name: 'Yahoo' },
            'ask': { url: 'https://ask.com', name: 'Ask' },
            
            // Privacy-focused
            'duckduckgo': { url: 'https://duckduckgo.com', name: 'DuckDuckGo' },
            'ddg': { url: 'https://duckduckgo.com', name: 'DuckDuckGo' },
            'brave search': { url: 'https://search.brave.com', name: 'Brave Search' },
            'brave': { url: 'https://search.brave.com', name: 'Brave Search' },
            'startpage': { url: 'https://startpage.com', name: 'Startpage' },
            'swisscows': { url: 'https://swisscows.com', name: 'Swisscows' },
            'kagi': { url: 'https://kagi.com', name: 'Kagi' },
            
            // Academic
            'scholar': { url: 'https://scholar.google.com', name: 'Google Scholar' },
            'google scholar': { url: 'https://scholar.google.com', name: 'Google Scholar' },
            'semantic scholar': { url: 'https://semanticscholar.org', name: 'Semantic Scholar' },
            'arxiv': { url: 'https://arxiv.org/search', name: 'arXiv' },
            'pubmed': { url: 'https://pubmed.ncbi.nlm.nih.gov', name: 'PubMed' },
            
            // International
            'yandex': { url: 'https://yandex.com', name: 'Yandex' },
            'baidu': { url: 'https://baidu.com', name: 'Baidu' },
            'naver': { url: 'https://naver.com', name: 'Naver' },
            'qwant': { url: 'https://qwant.com', name: 'Qwant' },
            'ecosia': { url: 'https://ecosia.org', name: 'Ecosia' }
        };
        
        // 🛠️ Tools & Utilities Database - Popular tools mapped by keywords
        this.toolsDatabase = {
            // AI & Machine Learning
            'chatgpt': { url: 'https://chat.openai.com', name: 'ChatGPT', category: 'AI Tools' },
            'claude': { url: 'https://claude.ai', name: 'Claude', category: 'AI Tools' },
            'gemini': { url: 'https://gemini.google.com', name: 'Gemini', category: 'AI Tools' },
            'midjourney': { url: 'https://midjourney.com', name: 'Midjourney', category: 'AI Art' },
            'stable diffusion': { url: 'https://stablediffusionweb.com', name: 'Stable Diffusion', category: 'AI Art' },
            'github copilot': { url: 'https://copilot.github.com', name: 'GitHub Copilot', category: 'Code AI' },
            'copilot': { url: 'https://copilot.github.com', name: 'GitHub Copilot', category: 'Code AI' },
            'replit ai': { url: 'https://replit.com/ai', name: 'Replit AI', category: 'Code AI' },
            'perplexity': { url: 'https://perplexity.ai', name: 'Perplexity', category: 'AI Search' },
            'runwayml': { url: 'https://runwayml.com', name: 'RunwayML', category: 'AI Video' },
            'runway': { url: 'https://runwayml.com', name: 'RunwayML', category: 'AI Video' },
            'jasper': { url: 'https://jasper.ai', name: 'Jasper', category: 'AI Writing' },
            
            // PDF Tools
            'smallpdf': { url: 'https://smallpdf.com', name: 'SmallPDF', category: 'PDF Tools' },
            'ilovepdf': { url: 'https://ilovepdf.com', name: 'ILovePDF', category: 'PDF Tools' },
            'pdf24': { url: 'https://tools.pdf24.org', name: 'PDF24', category: 'PDF Tools' },
            'sejda': { url: 'https://sejda.com', name: 'Sejda PDF', category: 'PDF Tools' },
            
            // Creative & Design
            'canva': { url: 'https://canva.com', name: 'Canva', category: 'Design Tools' },
            'figma': { url: 'https://figma.com', name: 'Figma', category: 'Design Tools' },
            'remove.bg': { url: 'https://remove.bg', name: 'Remove.bg', category: 'Design Tools' },
            'removebg': { url: 'https://remove.bg', name: 'Remove.bg', category: 'Design Tools' },
            'photopea': { url: 'https://photopea.com', name: 'Photopea', category: 'Photo Editor' },
            'gimp': { url: 'https://gimp.org', name: 'GIMP', category: 'Photo Editor' },
            'coolors': { url: 'https://coolors.co', name: 'Coolors', category: 'Design Tools' },
            'unsplash': { url: 'https://unsplash.com', name: 'Unsplash', category: 'Stock Photos' },
            'iconify': { url: 'https://iconify.design', name: 'Iconify', category: 'Icons' },
            
            // Developer Tools
            'codepen': { url: 'https://codepen.io', name: 'CodePen', category: 'Code Editor' },
            'jsfiddle': { url: 'https://jsfiddle.net', name: 'JSFiddle', category: 'Code Editor' },
            'regex101': { url: 'https://regex101.com', name: 'Regex101', category: 'Developer Tools' },
            'jsonlint': { url: 'https://jsonlint.com', name: 'JSONLint', category: 'Developer Tools' },
            'can i use': { url: 'https://caniuse.com', name: 'Can I Use', category: 'Developer Tools' },
            'caniuse': { url: 'https://caniuse.com', name: 'Can I Use', category: 'Developer Tools' },
            'postman': { url: 'https://postman.com', name: 'Postman', category: 'API Testing' },
            'vscode': { url: 'https://vscode.dev', name: 'VS Code Online', category: 'Code Editor' },
            'vs code': { url: 'https://vscode.dev', name: 'VS Code Online', category: 'Code Editor' },
            'gitpod': { url: 'https://gitpod.io', name: 'GitPod', category: 'Cloud IDE' },
            'replit': { url: 'https://replit.com', name: 'Replit', category: 'Online IDE' },
            
            // Productivity Tools
            'notion': { url: 'https://notion.so', name: 'Notion', category: 'Productivity' },
            'obsidian': { url: 'https://obsidian.md', name: 'Obsidian', category: 'Note Taking' },
            'todoist': { url: 'https://todoist.com', name: 'Todoist', category: 'Task Management' },
            'calendly': { url: 'https://calendly.com', name: 'Calendly', category: 'Scheduling' },
            'grammarly': { url: 'https://grammarly.com', name: 'Grammarly', category: 'Writing Tools' },
            'forest': { url: 'https://forestapp.cc', name: 'Forest', category: 'Focus Tools' },
            'rescuetime': { url: 'https://rescuetime.com', name: 'RescueTime', category: 'Time Tracking' },
            
            // File Conversion
            'cloudconvert': { url: 'https://cloudconvert.com', name: 'CloudConvert', category: 'File Conversion' },
            'convertio': { url: 'https://convertio.co', name: 'Convertio', category: 'File Conversion' },
            'zamzar': { url: 'https://zamzar.com', name: 'Zamzar', category: 'File Conversion' },
            'freeconvert': { url: 'https://freeconvert.com', name: 'FreeConvert', category: 'File Conversion' }
        };
        
        // 🎆 Entertainment & Media Database - Popular platforms mapped by keywords
        this.entertainmentDatabase = {
            // Video Streaming
            'netflix': { url: 'https://www.netflix.com', name: 'Netflix', category: 'Video Streaming' },
            'youtube': { url: 'https://www.youtube.com', name: 'YouTube', category: 'Video Streaming' },
            'disney+': { url: 'https://www.disneyplus.com', name: 'Disney+', category: 'Video Streaming' },
            'disney plus': { url: 'https://www.disneyplus.com', name: 'Disney+', category: 'Video Streaming' },
            'amazon prime': { url: 'https://www.primevideo.com', name: 'Amazon Prime Video', category: 'Video Streaming' },
            'prime video': { url: 'https://www.primevideo.com', name: 'Amazon Prime Video', category: 'Video Streaming' },
            'hbo max': { url: 'https://www.hbomax.com', name: 'HBO Max', category: 'Video Streaming' },
            'hulu': { url: 'https://www.hulu.com', name: 'Hulu', category: 'Video Streaming' },
            'apple tv': { url: 'https://tv.apple.com', name: 'Apple TV+', category: 'Video Streaming' },
            'paramount+': { url: 'https://www.paramountplus.com', name: 'Paramount+', category: 'Video Streaming' },
            'paramount plus': { url: 'https://www.paramountplus.com', name: 'Paramount+', category: 'Video Streaming' },
            'peacock': { url: 'https://www.peacocktv.com', name: 'Peacock', category: 'Video Streaming' },
            'twitch': { url: 'https://www.twitch.tv', name: 'Twitch', category: 'Live Streaming' },
            
            // Music & Audio
            'spotify': { url: 'https://www.spotify.com', name: 'Spotify', category: 'Music Streaming' },
            'apple music': { url: 'https://music.apple.com', name: 'Apple Music', category: 'Music Streaming' },
            'youtube music': { url: 'https://music.youtube.com', name: 'YouTube Music', category: 'Music Streaming' },
            'soundcloud': { url: 'https://soundcloud.com', name: 'SoundCloud', category: 'Music Streaming' },
            'amazon music': { url: 'https://music.amazon.com', name: 'Amazon Music', category: 'Music Streaming' },
            'pandora': { url: 'https://www.pandora.com', name: 'Pandora', category: 'Music Streaming' },
            'tidal': { url: 'https://tidal.com', name: 'Tidal', category: 'Music Streaming' },
            'bandcamp': { url: 'https://bandcamp.com', name: 'Bandcamp', category: 'Music Platform' },
            'audible': { url: 'https://www.audible.com', name: 'Audible', category: 'Audiobooks' },
            
            // Gaming Platforms
            'steam': { url: 'https://store.steampowered.com', name: 'Steam', category: 'Gaming Platform' },
            'epic games': { url: 'https://www.epicgames.com/store', name: 'Epic Games Store', category: 'Gaming Platform' },
            'playstation': { url: 'https://store.playstation.com', name: 'PlayStation Store', category: 'Gaming Platform' },
            'xbox': { url: 'https://www.xbox.com/xbox-game-pass', name: 'Xbox Game Pass', category: 'Gaming Platform' },
            'nintendo': { url: 'https://www.nintendo.com/store', name: 'Nintendo eShop', category: 'Gaming Platform' },
            'gog': { url: 'https://www.gog.com', name: 'GOG', category: 'Gaming Platform' },
            'itch.io': { url: 'https://itch.io', name: 'itch.io', category: 'Indie Gaming' },
            'discord': { url: 'https://discord.com', name: 'Discord', category: 'Gaming Community' },
            'roblox': { url: 'https://www.roblox.com', name: 'Roblox', category: 'Gaming Platform' },
            
            // Social Entertainment
            'tiktok': { url: 'https://www.tiktok.com', name: 'TikTok', category: 'Social Media' },
            'instagram': { url: 'https://www.instagram.com', name: 'Instagram', category: 'Social Media' },
            'twitter': { url: 'https://twitter.com', name: 'Twitter', category: 'Social Media' },
            'snapchat': { url: 'https://www.snapchat.com', name: 'Snapchat', category: 'Social Media' },
            'reddit': { url: 'https://www.reddit.com', name: 'Reddit', category: 'Social Media' },
            'pinterest': { url: 'https://www.pinterest.com', name: 'Pinterest', category: 'Social Media' },
            'tumblr': { url: 'https://www.tumblr.com', name: 'Tumblr', category: 'Social Media' },
            'facebook': { url: 'https://www.facebook.com', name: 'Facebook', category: 'Social Media' },
            
            // Fun & Interactive
            'kahoot': { url: 'https://kahoot.com', name: 'Kahoot!', category: 'Interactive Games' },
            'sporcle': { url: 'https://www.sporcle.com', name: 'Sporcle', category: 'Trivia Games' },
            'wordle': { url: 'https://www.nytimes.com/games/wordle', name: 'Wordle', category: 'Word Games' },
            'chess.com': { url: 'https://www.chess.com', name: 'Chess.com', category: 'Board Games' },
            'lichess': { url: 'https://lichess.org', name: 'Lichess', category: 'Board Games' },
            'geoguessr': { url: 'https://www.geoguessr.com', name: 'Geoguessr', category: 'Geography Games' },
            'among us': { url: 'https://www.innersloth.com/games/among-us', name: 'Among Us', category: 'Party Games' },
            
            // Alternative Platforms
            'vimeo': { url: 'https://vimeo.com', name: 'Vimeo', category: 'Video Platform' },
            'crunchyroll': { url: 'https://www.crunchyroll.com', name: 'Crunchyroll', category: 'Anime Streaming' },
            'funimation': { url: 'https://www.funimation.com', name: 'Funimation', category: 'Anime Streaming' },
            'plex': { url: 'https://www.plex.tv', name: 'Plex', category: 'Media Server' },
            'jellyfin': { url: 'https://jellyfin.org', name: 'Jellyfin', category: 'Media Server' },
            'internet archive': { url: 'https://archive.org', name: 'Internet Archive', category: 'Digital Library' },
            'newgrounds': { url: 'https://www.newgrounds.com', name: 'Newgrounds', category: 'Creative Platform' }
        };
        
        // 📰 News & Trends Database - News sources mapped by keywords
        this.newsDatabase = {
            // Global News
            'bbc': { url: 'https://www.bbc.com/news', name: 'BBC News', category: 'Global News' },
            'bbc news': { url: 'https://www.bbc.com/news', name: 'BBC News', category: 'Global News' },
            'cnn': { url: 'https://www.cnn.com', name: 'CNN', category: 'Global News' },
            'reuters': { url: 'https://www.reuters.com', name: 'Reuters', category: 'Global News' },
            'associated press': { url: 'https://apnews.com', name: 'Associated Press', category: 'Global News' },
            'ap news': { url: 'https://apnews.com', name: 'Associated Press', category: 'Global News' },
            'guardian': { url: 'https://www.theguardian.com', name: 'The Guardian', category: 'Global News' },
            'the guardian': { url: 'https://www.theguardian.com', name: 'The Guardian', category: 'Global News' },
            'npr': { url: 'https://www.npr.org', name: 'NPR', category: 'Global News' },
            'al jazeera': { url: 'https://www.aljazeera.com', name: 'Al Jazeera', category: 'Global News' },
            'france24': { url: 'https://www.france24.com', name: 'France24', category: 'Global News' },
            'deutsche welle': { url: 'https://www.dw.com', name: 'Deutsche Welle', category: 'Global News' },
            'new york times': { url: 'https://www.nytimes.com', name: 'The New York Times', category: 'Global News' },
            'nytimes': { url: 'https://www.nytimes.com', name: 'The New York Times', category: 'Global News' },
            'wall street journal': { url: 'https://www.wsj.com', name: 'Wall Street Journal', category: 'Global News' },
            'wsj': { url: 'https://www.wsj.com', name: 'Wall Street Journal', category: 'Global News' },
            'financial times': { url: 'https://www.ft.com', name: 'Financial Times', category: 'Global News' },
            
            // Technology News
            'techcrunch': { url: 'https://techcrunch.com', name: 'TechCrunch', category: 'Technology News' },
            'the verge': { url: 'https://www.theverge.com', name: 'The Verge', category: 'Technology News' },
            'verge': { url: 'https://www.theverge.com', name: 'The Verge', category: 'Technology News' },
            'ars technica': { url: 'https://arstechnica.com', name: 'Ars Technica', category: 'Technology News' },
            'wired': { url: 'https://www.wired.com', name: 'Wired', category: 'Technology News' },
            'engadget': { url: 'https://www.engadget.com', name: 'Engadget', category: 'Technology News' },
            'hacker news': { url: 'https://news.ycombinator.com', name: 'Hacker News', category: 'Technology News' },
            'techradar': { url: 'https://www.techradar.com', name: 'TechRadar', category: 'Technology News' },
            'mashable': { url: 'https://mashable.com', name: 'Mashable', category: 'Technology News' },
            'venturebeat': { url: 'https://venturebeat.com', name: 'VentureBeat', category: 'Technology News' },
            'anandtech': { url: 'https://www.anandtech.com', name: 'AnandTech', category: 'Technology News' },
            '9to5mac': { url: 'https://9to5mac.com', name: '9to5Mac', category: 'Technology News' },
            'android central': { url: 'https://www.androidcentral.com', name: 'Android Central', category: 'Technology News' },
            
            // Specialized & Niche
            'politico': { url: 'https://www.politico.com', name: 'Politico', category: 'Specialized News' },
            'economist': { url: 'https://www.economist.com', name: 'The Economist', category: 'Specialized News' },
            'the economist': { url: 'https://www.economist.com', name: 'The Economist', category: 'Specialized News' },
            'harvard business review': { url: 'https://hbr.org', name: 'Harvard Business Review', category: 'Specialized News' },
            'hbr': { url: 'https://hbr.org', name: 'Harvard Business Review', category: 'Specialized News' },
            'mit technology review': { url: 'https://www.technologyreview.com', name: 'MIT Technology Review', category: 'Specialized News' },
            'nature': { url: 'https://www.nature.com', name: 'Nature', category: 'Specialized News' },
            'science magazine': { url: 'https://www.sciencemag.org', name: 'Science Magazine', category: 'Specialized News' },
            'atlantic': { url: 'https://www.theatlantic.com', name: 'The Atlantic', category: 'Specialized News' },
            'the atlantic': { url: 'https://www.theatlantic.com', name: 'The Atlantic', category: 'Specialized News' },
            'foreign affairs': { url: 'https://www.foreignaffairs.com', name: 'Foreign Affairs', category: 'Specialized News' },
            'bloomberg': { url: 'https://www.bloomberg.com', name: 'Bloomberg', category: 'Specialized News' },
            'axios': { url: 'https://www.axios.com', name: 'Axios', category: 'Specialized News' },
            
            // Newsletters & Blogs
            'morning brew': { url: 'https://www.morningbrew.com', name: 'Morning Brew', category: 'Newsletters & Blogs' },
            'the hustle': { url: 'https://thehustle.co', name: 'The Hustle', category: 'Newsletters & Blogs' },
            'hustle': { url: 'https://thehustle.co', name: 'The Hustle', category: 'Newsletters & Blogs' },
            'benedict evans': { url: 'https://www.ben-evans.com', name: 'Benedict Evans', category: 'Newsletters & Blogs' },
            'stratechery': { url: 'https://stratechery.com', name: 'Stratechery', category: 'Newsletters & Blogs' },
            'casey newton': { url: 'https://www.platformer.news', name: 'Casey Newton', category: 'Newsletters & Blogs' },
            'platformer': { url: 'https://www.platformer.news', name: 'Casey Newton', category: 'Newsletters & Blogs' },
            'lenny': { url: 'https://www.lennysnewsletter.com', name: 'Lenny\'s Newsletter', category: 'Newsletters & Blogs' },
            'the information': { url: 'https://www.theinformation.com', name: 'The Information', category: 'Newsletters & Blogs' },
            'punchbowl news': { url: 'https://punchbowl.news', name: 'Punchbowl News', category: 'Newsletters & Blogs' },
            'substack': { url: 'https://substack.com', name: 'Substack', category: 'Newsletters & Blogs' },
            'medium': { url: 'https://medium.com', name: 'Medium', category: 'Newsletters & Blogs' },
            'dev.to': { url: 'https://dev.to', name: 'Dev.to', category: 'Newsletters & Blogs' },
            'product hunt': { url: 'https://www.producthunt.com', name: 'Product Hunt', category: 'Newsletters & Blogs' },
            'indiehackers': { url: 'https://www.indiehackers.com', name: 'IndieHackers', category: 'Newsletters & Blogs' },
            'indie hackers': { url: 'https://www.indiehackers.com', name: 'IndieHackers', category: 'Newsletters & Blogs' },
            'ycombinator': { url: 'https://blog.ycombinator.com', name: 'YCombinator Blog', category: 'Newsletters & Blogs' },
            'y combinator': { url: 'https://blog.ycombinator.com', name: 'YCombinator Blog', category: 'Newsletters & Blogs' }
        };
        
        console.log('🎮 Gateway Smart Controller initializing...');
        console.log('🔍 Loaded', Object.keys(this.searchEngines).length, 'search engines');
        console.log('🛠️ Loaded', Object.keys(this.toolsDatabase).length, 'tools & utilities');
        console.log('🎆 Loaded', Object.keys(this.entertainmentDatabase).length, 'entertainment platforms');
        console.log('📰 Loaded', Object.keys(this.newsDatabase).length, 'news sources');
        this.initialize();
    }
    
    initialize() {
        // Wait for knowledge engine to be ready
        if (window.gatewayAI_Knowledge && window.gatewayAI_Knowledge.isReady) {
            this.setupController();
        } else {
            // Listen for knowledge engine ready event
            window.addEventListener('gatewayAIReady', () => {
                this.setupController();
            });
        }
    }
    
    setupController() {
        this.knowledgeEngine = window.gatewayAI_Knowledge;
        this.isReady = true;
        
        // Create the AI interface
        this.createAIInterface();
        
        // Load user preferences
        this.loadUserPreferences();
        
        console.log('✅ Gateway Smart Controller fully operational!');
        console.log('🎯 AI knows about:', this.knowledgeEngine.getKnowledgeStats());
    }
    
    createAIInterface() {
        // Remove any existing AI interfaces
        const existingFAB = document.querySelector('.gateway-ai-fallback');
        if (existingFAB) {
            existingFAB.remove();
        }
        
        // Create floating AI button
        this.createFloatingAI();
        
        // Add keyboard shortcuts
        this.setupKeyboardShortcuts();
    }
    
    createFloatingAI() {
        const styles = `
        .gateway-ai-smart {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            color: white;
            transition: all 0.3s ease;
            animation: aiPulse 3s infinite;
        }
        
        .gateway-ai-smart:hover {
            transform: scale(1.1);
            box-shadow: 0 12px 30px rgba(102, 126, 234, 0.6);
            animation: none;
        }
        
        .gateway-ai-smart:active {
            transform: scale(0.95);
        }
        
        @keyframes aiPulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.9; }
        }
        
        .ai-chat-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10001;
            display: none;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
        }
        
        .ai-chat-container {
            background: linear-gradient(135deg, #1a1d29 0%, #2d3748 100%);
            border: 2px solid rgba(102, 126, 234, 0.3);
            border-radius: 16px;
            width: 90%;
            max-width: 500px;
            max-height: 80%;
            display: flex;
            flex-direction: column;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        
        .ai-chat-header {
            padding: 20px;
            border-bottom: 1px solid rgba(102, 126, 234, 0.2);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .ai-chat-title {
            color: #667eea;
            font-size: 1.2rem;
            font-weight: bold;
            margin: 0;
        }
        
        .ai-chat-close {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 5px;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .ai-chat-close:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .ai-chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            min-height: 200px;
            max-height: 300px;
        }
        
        .ai-message {
            margin-bottom: 15px;
            padding: 12px 16px;
            background: rgba(102, 126, 234, 0.1);
            border-radius: 12px;
            border-left: 3px solid #667eea;
            color: white;
            line-height: 1.5;
        }
        
        .ai-input-area {
            padding: 20px;
            border-top: 1px solid rgba(102, 126, 234, 0.2);
            display: flex;
            gap: 10px;
        }
        
        .ai-input {
            flex: 1;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(102, 126, 234, 0.3);
            border-radius: 12px;
            padding: 12px;
            color: white;
            font-size: 16px;
            font-family: inherit;
            transition: border-color 0.3s ease;
        }
        
        .ai-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 15px rgba(102, 126, 234, 0.3);
        }
        
        .ai-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }
        
        .ai-send {
            background: #667eea;
            border: none;
            border-radius: 12px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            padding: 0 20px;
            transition: all 0.3s ease;
        }
        
        .ai-send:hover {
            background: #5a67d8;
            transform: translateY(-1px);
        }
        
        .ai-status {
            text-align: center;
            padding: 10px;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.7);
        }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        
        // Create floating button
        const aiButton = document.createElement('button');
        aiButton.className = 'gateway-ai-smart';
        aiButton.innerHTML = '🧠';
        aiButton.title = 'Gateway AI - Your Smart Controller';
        aiButton.onclick = () => this.openAIChat();
        
        document.body.appendChild(aiButton);
        
        // Create chat modal
        this.createChatModal();
    }
    
    createChatModal() {
        const modal = document.createElement('div');
        modal.className = 'ai-chat-modal';
        modal.innerHTML = `
            <div class="ai-chat-container">
                <div class="ai-chat-header">
                    <h3 class="ai-chat-title">🧠 Gateway AI</h3>
                    <button class="ai-chat-close" onclick="gatewaySmartController.closeAIChat()">×</button>
                </div>
                <div class="ai-chat-messages" id="aiMessages">
                    <div class="ai-message">
                        Hello! I'm your Gateway AI controller. I know everything about your ${this.knowledgeEngine ? this.knowledgeEngine.getKnowledgeStats().categories : '13'} categories and ${this.knowledgeEngine ? this.knowledgeEngine.getKnowledgeStats().totalResources : '561+'} resources.
                        <br><br>
                        Try saying:
                        <br>• "Open Figma" or "ChatGPT"
                        <br>• "Netflix" or "Spotify" 
                        <br>• "Google" or "DuckDuckGo" 
                        <br>• "Tools category" or "Entertainment category"
                        <br>• "I need to code" or "I want to relax"
                        <br><br>
                        🎆 <strong>New!</strong> I can open entertainment platforms, tools, and search engines directly!
                    </div>
                </div>
                <div class="ai-status" id="aiStatus">
                    AI ready - Type your command below
                </div>
                <div class="ai-input-area">
                    <input type="text" class="ai-input" id="aiInput" 
                           placeholder="Tell me what you need... (e.g., 'take me to gaming', 'open netflix')"
                           onkeypress="if(event.key==='Enter') gatewaySmartController.processCommand()">
                    <button class="ai-send" onclick="gatewaySmartController.processCommand()">Send</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.chatModal = modal;
    }
    
    openAIChat() {
        if (this.chatModal) {
            this.chatModal.style.display = 'flex';
            const input = document.getElementById('aiInput');
            if (input) {
                input.focus();
            }
        }
    }
    
    closeAIChat() {
        if (this.chatModal) {
            this.chatModal.style.display = 'none';
        }
    }
    
    async processCommand() {
        const input = document.getElementById('aiInput');
        const command = input.value.trim();
        
        if (!command) return;
        
        // Add user message to chat
        this.addMessage(`You: ${command}`, 'user');
        
        // Clear input
        input.value = '';
        
        // Update status
        this.updateStatus('AI thinking...');
        
        // Process the command
        setTimeout(() => {
            this.handleCommand(command);
        }, 500);
    }
    
    handleCommand(command) {
        const lowercaseCommand = command.toLowerCase();
        
        // NAVIGATION COMMANDS
        if (lowercaseCommand.includes('home') || lowercaseCommand.includes('homepage')) {
            this.navigateToHome();
            return;
        }
        
        // 🔍 SEARCH ENGINE COMMANDS - Handle this first for direct matches
        if (this.handleSearchEngineCommand(lowercaseCommand)) {
            return;
        }
        
        // 🛠️ TOOLS & UTILITIES COMMANDS - Handle specific tools
        if (this.handleToolsCommand(lowercaseCommand)) {
            return;
        }
        
        // 🎆 ENTERTAINMENT & MEDIA COMMANDS - Handle entertainment platforms
        if (this.handleEntertainmentCommand(lowercaseCommand)) {
            return;
        }
        
        // 📰 NEWS & TRENDS COMMANDS - Handle news sources
        if (this.handleNewsCommand(lowercaseCommand)) {
            return;
        }
        
        // SPECIFIC RESOURCE SEARCH
        const specificResource = this.findSpecificResource(lowercaseCommand);
        if (specificResource) {
            this.handleSpecificResource(specificResource);
            return;
        }
        
        // CATEGORY NAVIGATION
        const categoryMatch = this.findCategoryIntent(lowercaseCommand);
        if (categoryMatch) {
            this.navigateToCategory(categoryMatch.category, categoryMatch.reason);
            return;
        }
        
        // EXTERNAL SITE OPENING (only for direct requests)
        if (lowercaseCommand.includes('open ') || lowercaseCommand.includes('launch ')) {
            const siteMatch = this.findSiteIntent(lowercaseCommand);
            if (siteMatch) {
                this.openExternalSite(siteMatch.url, siteMatch.name, siteMatch.reason);
                return;
            }
        }
        
        // CONTEXTUAL COMMANDS WITH INTELLIGENCE
        if (lowercaseCommand.includes('code') || lowercaseCommand.includes('dev') || lowercaseCommand.includes('program')) {
            this.handleSmartCodingIntent(lowercaseCommand);
            return;
        }
        
        if (lowercaseCommand.includes('entertain') || lowercaseCommand.includes('relax') || lowercaseCommand.includes('fun') || lowercaseCommand.includes('watch')) {
            this.handleSmartEntertainmentIntent(lowercaseCommand);
            return;
        }
        
        if (lowercaseCommand.includes('learn') || lowercaseCommand.includes('study') || lowercaseCommand.includes('research')) {
            this.handleSmartLearningIntent(lowercaseCommand);
            return;
        }
        
        if (lowercaseCommand.includes('news') || lowercaseCommand.includes('latest')) {
            this.handleSmartNewsIntent(lowercaseCommand);
            return;
        }
        
        // DEFAULT: INTELLIGENT SEARCH WITH SUGGESTIONS
        this.handleIntelligentSearch(command);
    }
    
    findCategoryIntent(command) {
        if (!this.knowledgeEngine) return null;
        
        const categories = this.knowledgeEngine.getAllCategories();
        
        for (const category of categories) {
            if (command.includes(category.id) || 
                command.includes(category.name.toLowerCase()) ||
                category.tags.some(tag => command.includes(tag))) {
                return {
                    category: category,
                    reason: `Found ${category.name} category with ${category.count} resources`
                };
            }
        }
        
        return null;
    }
    
    findSiteIntent(command) {
        // Popular sites that users might want to open directly
        const commonSites = {
            'youtube': { url: 'https://youtube.com', name: 'YouTube' },
            'github': { url: 'https://github.com', name: 'GitHub' },
            'reddit': { url: 'https://reddit.com', name: 'Reddit' },
            'netflix': { url: 'https://netflix.com', name: 'Netflix' },
            'spotify': { url: 'https://spotify.com', name: 'Spotify' },
            'twitter': { url: 'https://twitter.com', name: 'Twitter' },
            'instagram': { url: 'https://instagram.com', name: 'Instagram' },
            'gmail': { url: 'https://gmail.com', name: 'Gmail' },
            'facebook': { url: 'https://facebook.com', name: 'Facebook' }
        };
        
        for (const [key, site] of Object.entries(commonSites)) {
            if (command.includes(key)) {
                return {
                    ...site,
                    reason: `Opening ${site.name} in new tab`
                };
            }
        }
        
        return null;
    }
    
    navigateToHome() {
        window.location.href = '/';
        this.addMessage('🏠 Taking you to Gateway homepage', 'ai');
        this.updateStatus('Navigating to homepage...');
    }
    
    navigateToCategory(category, reason) {
        window.location.href = `categories/${category.id}/`;
        this.addMessage(`🎯 ${reason}. Opening ${category.name}!`, 'ai');
        this.updateStatus(`Opening ${category.name}...`);
    }
    
    openExternalSite(url, name, reason) {
        window.open(url, '_blank');
        this.addMessage(`🚀 ${reason}`, 'ai');
        this.updateStatus(`Opened ${name}!`);
    }
    
    handleCodingIntent(command) {
        const toolsCategory = this.knowledgeEngine.findCategory('tools');
        if (toolsCategory) {
            this.addMessage('🛠️ Perfect! Opening Tools & Utilities with 52 developer resources including GitHub, Stack Overflow, and coding tools.', 'ai');
            window.location.href = 'categories/tools/';
            this.updateStatus('Opening developer tools...');
        } else {
            this.addMessage('🤔 I understand you need coding resources. Let me open some popular dev sites for you.', 'ai');
            window.open('https://github.com', '_blank');
            window.open('https://stackoverflow.com', '_blank');
            this.updateStatus('Opened GitHub and Stack Overflow!');
        }
    }
    
    handleEntertainmentIntent(command) {
        const entertainmentCategory = this.knowledgeEngine.findCategory('entertainment');
        if (entertainmentCategory) {
            this.addMessage('🎭 Entertainment mode activated! Opening Entertainment & Media with 51 streaming and gaming platforms.', 'ai');
            window.location.href = 'categories/entertainment/';
            this.updateStatus('Activating entertainment mode...');
        } else {
            this.addMessage('🎬 Let me open some entertainment sites for you!', 'ai');
            window.open('https://netflix.com', '_blank');
            window.open('https://spotify.com', '_blank');
            this.updateStatus('Opened Netflix and Spotify!');
        }
    }
    
    handleSearchIntent(command) {
        const searchEngineCategory = this.knowledgeEngine.findCategory('search');
        if (searchEngineCategory) {
            this.addMessage(`🔍 Searching for "${command}". I'll open our Search Engines section with 39 search engines, then search DuckDuckGo.`, 'ai');
            window.open(`https://duckduckgo.com/?q=${encodeURIComponent(command)}`, '_blank');
            this.updateStatus('Search completed!');
        } else {
            this.addMessage(`🔍 Searching for "${command}" using DuckDuckGo.`, 'ai');
            window.open(`https://duckduckgo.com/?q=${encodeURIComponent(command)}`, '_blank');
            this.updateStatus('Search completed!');
        }
    }
    
    // 🧠 NEW SMART CONTEXTUAL FUNCTIONS
    
    findSpecificResource(command) {
        if (!this.knowledgeEngine) return null;
        
        // Search through all resources to find specific matches
        const searchResults = this.knowledgeEngine.searchResources(command);
        
        if (searchResults.length > 0) {
            return {
                results: searchResults.slice(0, 5), // Top 5 matches
                query: command
            };
        }
        
        return null;
    }
    
    handleSpecificResource(resourceMatch) {
        const { results, query } = resourceMatch;
        
        if (results.length === 1) {
            // Single match - open it directly
            const resource = results[0];
            window.open(resource.url, '_blank');
            this.addMessage(`🎯 Found exactly what you're looking for! Opening ${resource.name}.\n\n📝 ${resource.description}`, 'ai');
            this.updateStatus(`Opened ${resource.name}!`);
        } else {
            // Multiple matches - show options
            let message = `🔍 Found ${results.length} resources matching "${query}":\n\n`;
            results.forEach((resource, index) => {
                message += `${index + 1}. **${resource.name}** - ${resource.description}\n`;
            });
            message += `\n💡 Say "open [number]" or "open ${results[0].name}" to launch a specific one, or I can open the ${results[0].category} category to see all options!`;
            
            this.addMessage(message, 'ai');
            this.updateStatus('Found multiple matches!');
            
            // Store results for follow-up
            this.currentSession.lastResults = results;
        }
    }
    
    handleSmartCodingIntent(command) {
        const toolsCategory = this.knowledgeEngine.findCategory('tools');
        
        if (!toolsCategory) {
            this.addMessage('🤔 I understand you need coding resources. Let me help by opening some developer tools.', 'ai');
            window.open('https://github.com', '_blank');
            return;
        }
        
        // Ask for more context instead of just opening stuff
        let message = `🛠️ I see you want to code! I have ${toolsCategory.count} developer resources in our Tools & Utilities section.\n\n`;
        message += `What kind of coding are you doing?\n`;
        message += `• Web development (HTML/CSS/JavaScript)\n`;
        message += `• Backend programming (APIs, databases)\n`;
        message += `• Mobile app development\n`;
        message += `• Learning to code\n`;
        message += `• Project management & collaboration\n\n`;
        message += `Or say "open tools category" to see all 52 developer resources, or "open GitHub" if you want to go straight there!`;
        
        this.addMessage(message, 'ai');
        this.updateStatus('What kind of coding?');
    }
    
    handleSmartEntertainmentIntent(command) {
        const entertainmentCategory = this.knowledgeEngine.findCategory('entertainment');
        
        if (!entertainmentCategory) {
            this.addMessage('🎬 Let me open some entertainment sites for you!', 'ai');
            window.open('https://netflix.com', '_blank');
            return;
        }
        
        let message = `🎭 Ready for some entertainment! I have ${entertainmentCategory.count} platforms in our Entertainment & Media section.\n\n`;
        message += `What mood are you in?\n`;
        message += `• Streaming movies/shows (Netflix, Hulu, etc.)\n`;
        message += `• Music & podcasts (Spotify, Apple Music)\n`;
        message += `• Gaming platforms (Steam, Epic Games)\n`;
        message += `• Social entertainment (TikTok, Instagram)\n`;
        message += `• Live streams & videos (Twitch, YouTube)\n\n`;
        message += `Say "open entertainment category" to browse all options, or be specific like "open Netflix" or "music streaming"!`;
        
        this.addMessage(message, 'ai');
        this.updateStatus('What kind of entertainment?');
    }
    
    handleSmartLearningIntent(command) {
        const knowledgeCategory = this.knowledgeEngine.findCategory('knowledge');
        
        if (!knowledgeCategory) {
            this.addMessage('📚 Let me help you learn! Opening some educational resources.', 'ai');
            window.open('https://wikipedia.org', '_blank');
            return;
        }
        
        let message = `📚 Excellent! I have ${knowledgeCategory.count} educational resources in our Knowledge & Learning section.\n\n`;
        message += `What are you looking to learn?\n`;
        message += `• Academic research (Wikipedia, Google Scholar)\n`;
        message += `• Online courses (Khan Academy, Coursera)\n`;
        message += `• Technical documentation\n`;
        message += `• Language learning\n`;
        message += `• Professional development\n\n`;
        message += `Say "open knowledge category" to explore all options, or be specific like "open Khan Academy" or "academic research"!`;
        
        this.addMessage(message, 'ai');
        this.updateStatus('What do you want to learn?');
    }
    
    handleSmartNewsIntent(command) {
        const newsCategory = this.knowledgeEngine.findCategory('news');
        
        if (!newsCategory) {
            this.addMessage('📰 Let me get you some news! Opening popular news sites.', 'ai');
            window.open('https://news.google.com', '_blank');
            return;
        }
        
        let message = `📰 I have ${newsCategory.count} news sources in our News & Trends section.\n\n`;
        message += `What type of news interests you?\n`;
        message += `• Breaking news (BBC, CNN, Reuters)\n`;
        message += `• Tech news (TechCrunch, Hacker News)\n`;
        message += `• Business & finance\n`;
        message += `• International news\n`;
        message += `• Industry trends\n\n`;
        message += `Say "open news category" to see all sources, or be specific like "tech news" or "open BBC"!`;
        
        this.addMessage(message, 'ai');
        this.updateStatus('What kind of news?');
    }
    
    handleIntelligentSearch(command) {
        // Try to find relevant categories first
        const relevantCategories = this.findRelevantCategories(command);
        
        if (relevantCategories.length > 0) {
            let message = `🔍 I found some relevant sections for "${command}":\n\n`;
            relevantCategories.slice(0, 3).forEach(cat => {
                message += `• **${cat.name}** - ${cat.count} resources\n`;
            });
            message += `\nWould you like me to open one of these categories, or search the web for "${command}"?`;
            
            this.addMessage(message, 'ai');
            this.updateStatus('Found relevant categories!');
        } else {
            // Default web search with context
            this.addMessage(`🔍 I'll search the web for "${command}". If you're looking for a specific type of resource, try saying:\n\n• "${command} tools" for productivity tools\n• "${command} learning" for educational resources\n• "${command} entertainment" for media platforms`, 'ai');
            window.open(`https://duckduckgo.com/?q=${encodeURIComponent(command)}`, '_blank');
            this.updateStatus('Searching the web!');
        }
    }
    
    findRelevantCategories(query) {
        if (!this.knowledgeEngine) return [];
        
        const categories = this.knowledgeEngine.getAllCategories();
        const relevantCategories = [];
        
        categories.forEach(category => {
            const relevanceScore = this.calculateCategoryRelevance(query, category);
            if (relevanceScore > 0) {
                relevantCategories.push({ ...category, relevanceScore });
            }
        });
        
        return relevantCategories.sort((a, b) => b.relevanceScore - a.relevanceScore);
    }
    
    calculateCategoryRelevance(query, category) {
        const lowercaseQuery = query.toLowerCase();
        let score = 0;
        
        // Check name match
        if (category.name.toLowerCase().includes(lowercaseQuery)) score += 10;
        
        // Check tags match
        category.tags.forEach(tag => {
            if (lowercaseQuery.includes(tag.toLowerCase())) score += 5;
        });
        
        // Check description match
        if (category.description.toLowerCase().includes(lowercaseQuery)) score += 3;
        
        return score;
    }
    
    // 🔍 SEARCH ENGINE SMART CONTROLLER METHODS
    
    handleSearchEngineCommand(command) {
        const lowercaseCommand = command.toLowerCase().trim();
        
        // Check if it's a request for the search engines category
        if (this.isSearchEnginesCategoryRequest(lowercaseCommand)) {
            this.openSearchEnginesCategory();
            return true;
        }
        
        // Check if it's a specific search engine request
        const engineMatch = this.findSearchEngine(lowercaseCommand);
        if (engineMatch) {
            this.openSearchEngine(engineMatch);
            return true;
        }
        
        return false; // Not a search engine command
    }
    
    isSearchEnginesCategoryRequest(command) {
        const categoryPhrases = [
            'search engines',
            'search engine',
            'show me search engines',
            'open search engines',
            'go to search engines',
            'take me to search engines',
            'search category',
            'search tools'
        ];
        
        return categoryPhrases.some(phrase => command.includes(phrase));
    }
    
    findSearchEngine(command) {
        // Direct match
        if (this.searchEngines[command]) {
            return this.searchEngines[command];
        }
        
        // Partial match (for "open google", "launch bing", etc.)
        for (const [key, engine] of Object.entries(this.searchEngines)) {
            if (command.includes(key)) {
                return engine;
            }
        }
        
        return null;
    }
    
    openSearchEnginesCategory() {
        console.log('🎯 Opening Search Engines category page');
        window.location.href = 'categories/search-engines/';
        
        this.addMessage('🔍 Opening Search Engines category with 39 different search engines! From Google and DuckDuckGo to specialized academic search engines.', 'ai');
        this.updateStatus('Opening search engines category...');
    }
    
    openSearchEngine(engine) {
        console.log('🚀 Opening specific search engine:', engine.name);
        window.open(engine.url, '_blank');
        
        this.addMessage(`🔍 Opening ${engine.name}! Great choice for your search needs.`, 'ai');
        this.updateStatus(`Opened ${engine.name}!`);
    }
    
    // 🛠️ TOOLS & UTILITIES SMART CONTROLLER METHODS
    
    handleToolsCommand(command) {
        const lowercaseCommand = command.toLowerCase().trim();
        
        // Check if it's a request for the tools category
        if (this.isToolsCategoryRequest(lowercaseCommand)) {
            this.openToolsCategory();
            return true;
        }
        
        // Check if it's a specific tool request
        const toolMatch = this.findTool(lowercaseCommand);
        if (toolMatch) {
            this.openTool(toolMatch);
            return true;
        }
        
        return false; // Not a tools command
    }
    
    isToolsCategoryRequest(command) {
        const categoryPhrases = [
            'tools category',
            'tools and utilities',
            'tools & utilities',
            'show me tools',
            'open tools',
            'go to tools',
            'take me to tools',
            'developer tools category',
            'productivity tools'
        ];
        
        return categoryPhrases.some(phrase => command.includes(phrase));
    }
    
    findTool(command) {
        // Direct match
        if (this.toolsDatabase[command]) {
            return this.toolsDatabase[command];
        }
        
        // Partial match (for "open figma", "launch notion", etc.)
        for (const [key, tool] of Object.entries(this.toolsDatabase)) {
            if (command.includes(key)) {
                return tool;
            }
        }
        
        return null;
    }
    
    openToolsCategory() {
        console.log('🎯 Opening Tools & Utilities category page');
        window.location.href = 'categories/tools/';
        
        this.addMessage('🛠️ Opening Tools & Utilities with 52 powerful tools! From AI assistants like ChatGPT to design tools like Figma and developer resources like CodePen.', 'ai');
        this.updateStatus('Opening tools category...');
    }
    
    openTool(tool) {
        console.log('🚀 Opening specific tool:', tool.name);
        window.open(tool.url, '_blank');
        
        this.addMessage(`🛠️ Opening ${tool.name}! Perfect for ${tool.category.toLowerCase()} tasks.`, 'ai');
        this.updateStatus(`Opened ${tool.name}!`);
    }
    
    // 🎆 ENTERTAINMENT & MEDIA SMART CONTROLLER METHODS
    
    handleEntertainmentCommand(command) {
        const lowercaseCommand = command.toLowerCase().trim();
        
        // Check if it's a request for the entertainment category
        if (this.isEntertainmentCategoryRequest(lowercaseCommand)) {
            this.openEntertainmentCategory();
            return true;
        }
        
        // Check if it's a specific entertainment platform request
        const platformMatch = this.findEntertainmentPlatform(lowercaseCommand);
        if (platformMatch) {
            this.openEntertainmentPlatform(platformMatch);
            return true;
        }
        
        return false; // Not an entertainment command
    }
    
    isEntertainmentCategoryRequest(command) {
        const categoryPhrases = [
            'entertainment category',
            'entertainment & media',
            'entertainment and media',
            'show me entertainment',
            'open entertainment',
            'go to entertainment',
            'take me to entertainment',
            'media category',
            'streaming platforms'
        ];
        
        return categoryPhrases.some(phrase => command.includes(phrase));
    }
    
    findEntertainmentPlatform(command) {
        // Direct match
        if (this.entertainmentDatabase[command]) {
            return this.entertainmentDatabase[command];
        }
        
        // Partial match (for "open netflix", "launch spotify", etc.)
        for (const [key, platform] of Object.entries(this.entertainmentDatabase)) {
            if (command.includes(key)) {
                return platform;
            }
        }
        
        return null;
    }
    
    openEntertainmentCategory() {
        console.log('🎯 Opening Entertainment & Media category page');
        window.location.href = 'categories/entertainment/';
        
        this.addMessage('🎆 Opening Entertainment & Media with 51 amazing platforms! From Netflix and Spotify to TikTok, Discord, and gaming platforms like Steam.', 'ai');
        this.updateStatus('Opening entertainment category...');
    }
    
    openEntertainmentPlatform(platform) {
        console.log('🚀 Opening entertainment platform:', platform.name);
        window.open(platform.url, '_blank');
        
        this.addMessage(`🎆 Opening ${platform.name}! Perfect for ${platform.category.toLowerCase()} entertainment.`, 'ai');
        this.updateStatus(`Opened ${platform.name}!`);
    }
    
    // 📰 NEWS & TRENDS SMART CONTROLLER METHODS
    
    handleNewsCommand(command) {
        const lowercaseCommand = command.toLowerCase().trim();
        
        // Check if it's a request for the news category
        if (this.isNewsCategoryRequest(lowercaseCommand)) {
            this.openNewsCategory();
            return true;
        }
        
        // Check if it's a specific news source request
        const newsMatch = this.findNewsSource(lowercaseCommand);
        if (newsMatch) {
            this.openNewsSource(newsMatch);
            return true;
        }
        
        return false; // Not a news command
    }
    
    isNewsCategoryRequest(command) {
        const categoryPhrases = [
            'news category',
            'news & trends',
            'news and trends',
            'show me news',
            'open news',
            'go to news',
            'take me to news',
            'news sources',
            'latest news'
        ];
        
        return categoryPhrases.some(phrase => command.includes(phrase));
    }
    
    findNewsSource(command) {
        // Direct match
        if (this.newsDatabase[command]) {
            return this.newsDatabase[command];
        }
        
        // Partial match (for "open bbc", "launch cnn", etc.)
        for (const [key, source] of Object.entries(this.newsDatabase)) {
            if (command.includes(key)) {
                return source;
            }
        }
        
        return null;
    }
    
    openNewsCategory() {
        console.log('🎯 Opening News & Trends category page');
        window.location.href = 'categories/news/';
        
        this.addMessage('📰 Opening News & Trends with 48 trusted news sources! From BBC and CNN to TechCrunch, The Economist, and specialized newsletters.', 'ai');
        this.updateStatus('Opening news category...');
    }
    
    openNewsSource(source) {
        console.log('🚀 Opening news source:', source.name);
        window.open(source.url, '_blank');
        
        this.addMessage(`📰 Opening ${source.name}! Great choice for ${source.category.toLowerCase()} coverage.`, 'ai');
        this.updateStatus(`Opened ${source.name}!`);
    }
    
    addMessage(message, type) {
        const messagesContainer = document.getElementById('aiMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'ai-message';
        messageDiv.innerHTML = message;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    updateStatus(status) {
        const statusElement = document.getElementById('aiStatus');
        if (statusElement) {
            statusElement.textContent = status;
            
            // Reset to default after 3 seconds
            setTimeout(() => {
                statusElement.textContent = 'AI ready - Type your command below';
            }, 3000);
        }
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+G or Cmd+G to open AI chat
            if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
                e.preventDefault();
                this.openAIChat();
            }
            
            // Escape to close AI chat
            if (e.key === 'Escape' && this.chatModal && this.chatModal.style.display === 'flex') {
                this.closeAIChat();
            }
        });
    }
    
    async loadUserPreferences() {
        if (this.knowledgeEngine) {
            const preferences = await this.knowledgeEngine.getUserMemory('preferences');
            if (preferences) {
                this.currentSession.preferences = preferences;
                console.log('🧠 Loaded user preferences:', preferences);
            }
        }
    }
    
    async saveUserPreferences() {
        if (this.knowledgeEngine) {
            await this.knowledgeEngine.saveUserMemory('preferences', this.currentSession.preferences);
        }
    }
}

// Initialize the Gateway Smart Controller
window.GatewaySmartController = GatewaySmartController;

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.gatewaySmartController = new GatewaySmartController();
    });
} else {
    window.gatewaySmartController = new GatewaySmartController();
}

console.log('🎮 Gateway Smart Controller loaded and ready to control the universe!');
