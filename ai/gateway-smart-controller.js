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
        
        // 🛍️ Lifestyle & Shopping Database - Daily life platforms mapped by keywords
        this.lifestyleDatabase = {
            // E-commerce Giants
            'amazon': { url: 'https://amazon.com', name: 'Amazon', category: 'E-commerce Giants' },
            'ebay': { url: 'https://ebay.com', name: 'eBay', category: 'E-commerce Giants' },
            'walmart': { url: 'https://walmart.com', name: 'Walmart', category: 'E-commerce Giants' },
            'target': { url: 'https://target.com', name: 'Target', category: 'E-commerce Giants' },
            'bestbuy': { url: 'https://bestbuy.com', name: 'Best Buy', category: 'E-commerce Giants' },
            'best buy': { url: 'https://bestbuy.com', name: 'Best Buy', category: 'E-commerce Giants' },
            'costco': { url: 'https://costco.com', name: 'Costco', category: 'E-commerce Giants' },
            'home depot': { url: 'https://homedepot.com', name: 'Home Depot', category: 'E-commerce Giants' },
            'homedepot': { url: 'https://homedepot.com', name: 'Home Depot', category: 'E-commerce Giants' },
            'lowes': { url: 'https://lowes.com', name: 'Lowe\'s', category: 'E-commerce Giants' },
            "lowe's": { url: 'https://lowes.com', name: 'Lowe\'s', category: 'E-commerce Giants' },
            'macys': { url: 'https://macys.com', name: 'Macy\'s', category: 'E-commerce Giants' },
            "macy's": { url: 'https://macys.com', name: 'Macy\'s', category: 'E-commerce Giants' },
            'nordstrom': { url: 'https://nordstrom.com', name: 'Nordstrom', category: 'E-commerce Giants' },
            'kohls': { url: 'https://kohls.com', name: 'Kohl\'s', category: 'E-commerce Giants' },
            "kohl's": { url: 'https://kohls.com', name: 'Kohl\'s', category: 'E-commerce Giants' },
            
            // Food Delivery & Dining
            'doordash': { url: 'https://doordash.com', name: 'DoorDash', category: 'Food Delivery & Dining' },
            'door dash': { url: 'https://doordash.com', name: 'DoorDash', category: 'Food Delivery & Dining' },
            'uber eats': { url: 'https://ubereats.com', name: 'Uber Eats', category: 'Food Delivery & Dining' },
            'ubereats': { url: 'https://ubereats.com', name: 'Uber Eats', category: 'Food Delivery & Dining' },
            'grubhub': { url: 'https://grubhub.com', name: 'Grubhub', category: 'Food Delivery & Dining' },
            'postmates': { url: 'https://postmates.com', name: 'Postmates', category: 'Food Delivery & Dining' },
            'seamless': { url: 'https://seamless.com', name: 'Seamless', category: 'Food Delivery & Dining' },
            'instacart': { url: 'https://instacart.com', name: 'Instacart', category: 'Food Delivery & Dining' },
            'hellofresh': { url: 'https://hellofresh.com', name: 'HelloFresh', category: 'Food Delivery & Dining' },
            'hello fresh': { url: 'https://hellofresh.com', name: 'HelloFresh', category: 'Food Delivery & Dining' },
            'blue apron': { url: 'https://blueapron.com', name: 'Blue Apron', category: 'Food Delivery & Dining' },
            'blueapron': { url: 'https://blueapron.com', name: 'Blue Apron', category: 'Food Delivery & Dining' },
            'opentable': { url: 'https://opentable.com', name: 'OpenTable', category: 'Food Delivery & Dining' },
            'open table': { url: 'https://opentable.com', name: 'OpenTable', category: 'Food Delivery & Dining' },
            'yelp': { url: 'https://yelp.com', name: 'Yelp', category: 'Food Delivery & Dining' },
            'zomato': { url: 'https://zomato.com', name: 'Zomato', category: 'Food Delivery & Dining' },
            'deliveroo': { url: 'https://deliveroo.com', name: 'Deliveroo', category: 'Food Delivery & Dining' },
            
            // Travel & Transportation
            'airbnb': { url: 'https://airbnb.com', name: 'Airbnb', category: 'Travel & Transportation' },
            'booking.com': { url: 'https://booking.com', name: 'Booking.com', category: 'Travel & Transportation' },
            'booking': { url: 'https://booking.com', name: 'Booking.com', category: 'Travel & Transportation' },
            'expedia': { url: 'https://expedia.com', name: 'Expedia', category: 'Travel & Transportation' },
            'uber': { url: 'https://uber.com', name: 'Uber', category: 'Travel & Transportation' },
            'lyft': { url: 'https://lyft.com', name: 'Lyft', category: 'Travel & Transportation' },
            'kayak': { url: 'https://kayak.com', name: 'Kayak', category: 'Travel & Transportation' },
            'priceline': { url: 'https://priceline.com', name: 'Priceline', category: 'Travel & Transportation' },
            'hotels.com': { url: 'https://hotels.com', name: 'Hotels.com', category: 'Travel & Transportation' },
            'hotels': { url: 'https://hotels.com', name: 'Hotels.com', category: 'Travel & Transportation' },
            'tripadvisor': { url: 'https://tripadvisor.com', name: 'TripAdvisor', category: 'Travel & Transportation' },
            'trip advisor': { url: 'https://tripadvisor.com', name: 'TripAdvisor', category: 'Travel & Transportation' },
            'skyscanner': { url: 'https://skyscanner.com', name: 'Skyscanner', category: 'Travel & Transportation' },
            'car2go': { url: 'https://car2go.com', name: 'Car2Go', category: 'Travel & Transportation' },
            'lime': { url: 'https://li.me', name: 'Lime', category: 'Travel & Transportation' },
            
            // Home Services & Daily Life
            'taskrabbit': { url: 'https://taskrabbit.com', name: 'TaskRabbit', category: 'Home Services & Daily Life' },
            'task rabbit': { url: 'https://taskrabbit.com', name: 'TaskRabbit', category: 'Home Services & Daily Life' },
            'thumbtack': { url: 'https://thumbtack.com', name: 'Thumbtack', category: 'Home Services & Daily Life' },
            'angies list': { url: 'https://angieslist.com', name: 'Angie\'s List', category: 'Home Services & Daily Life' },
            "angie's list": { url: 'https://angieslist.com', name: 'Angie\'s List', category: 'Home Services & Daily Life' },
            'ikea': { url: 'https://ikea.com', name: 'IKEA', category: 'Home Services & Daily Life' },
            'rover': { url: 'https://rover.com', name: 'Rover', category: 'Home Services & Daily Life' },
            'care.com': { url: 'https://care.com', name: 'Care.com', category: 'Home Services & Daily Life' },
            'care': { url: 'https://care.com', name: 'Care.com', category: 'Home Services & Daily Life' },
            'handy': { url: 'https://handy.com', name: 'Handy', category: 'Home Services & Daily Life' },
            'urban company': { url: 'https://urbancompany.com', name: 'Urban Company', category: 'Home Services & Daily Life' },
            'urbancompany': { url: 'https://urbancompany.com', name: 'Urban Company', category: 'Home Services & Daily Life' },
            'fiverr': { url: 'https://fiverr.com', name: 'Fiverr', category: 'Home Services & Daily Life' },
            'upwork': { url: 'https://upwork.com', name: 'Upwork', category: 'Home Services & Daily Life' }
        };
        
        // 🗾 Anime & Manga Database - Japanese animation and comics ecosystem mapped by keywords
        this.animeDatabase = {
            // Anime Streaming
            'crunchyroll': { url: 'https://crunchyroll.com', name: 'Crunchyroll', category: 'Anime Streaming' },
            'funimation': { url: 'https://funimation.com', name: 'Funimation', category: 'Anime Streaming' },
            'netflix anime': { url: 'https://netflix.com/browse/genre/7424', name: 'Netflix Anime', category: 'Anime Streaming' },
            'hulu anime': { url: 'https://hulu.com/hub/anime', name: 'Hulu Anime', category: 'Anime Streaming' },
            'disney+ anime': { url: 'https://disneyplus.com', name: 'Disney+ Anime', category: 'Anime Streaming' },
            'disney anime': { url: 'https://disneyplus.com', name: 'Disney+ Anime', category: 'Anime Streaming' },
            'vrv': { url: 'https://vrv.co', name: 'VRV', category: 'Anime Streaming' },
            'animelab': { url: 'https://animelab.com', name: 'AnimeLab', category: 'Anime Streaming' },
            'anime lab': { url: 'https://animelab.com', name: 'AnimeLab', category: 'Anime Streaming' },
            'wakanim': { url: 'https://wakanim.tv', name: 'Wakanim', category: 'Anime Streaming' },
            'animeplanet': { url: 'https://anime-planet.com', name: 'AnimePlanet', category: 'Anime Streaming' },
            'anime planet': { url: 'https://anime-planet.com', name: 'AnimePlanet', category: 'Anime Streaming' },
            'tubi anime': { url: 'https://tubitv.com/category/anime', name: 'Tubi Anime', category: 'Anime Streaming' },
            'amazon prime anime': { url: 'https://primevideo.com', name: 'Amazon Prime Video Anime', category: 'Anime Streaming' },
            'prime anime': { url: 'https://primevideo.com', name: 'Amazon Prime Video Anime', category: 'Anime Streaming' },
            'hidive': { url: 'https://hidive.com', name: 'Hidive', category: 'Anime Streaming' },
            
            // Manga Reading
            'mangadex': { url: 'https://mangadex.org', name: 'MangaDex', category: 'Manga Reading' },
            'manga dex': { url: 'https://mangadex.org', name: 'MangaDex', category: 'Manga Reading' },
            'viz shonen jump': { url: 'https://viz.com/shonenjump', name: 'VIZ Shonen Jump', category: 'Manga Reading' },
            'shonen jump': { url: 'https://viz.com/shonenjump', name: 'VIZ Shonen Jump', category: 'Manga Reading' },
            'manga plus': { url: 'https://mangaplus.shueisha.co.jp', name: 'MANGA Plus', category: 'Manga Reading' },
            'mangaplus': { url: 'https://mangaplus.shueisha.co.jp', name: 'MANGA Plus', category: 'Manga Reading' },
            'comixology': { url: 'https://comixology.com', name: 'ComiXology', category: 'Manga Reading' },
            'crunchyroll manga': { url: 'https://crunchyroll.com/comics', name: 'Crunchyroll Manga', category: 'Manga Reading' },
            'kodansha comics': { url: 'https://kodansha.us', name: 'Kodansha Comics', category: 'Manga Reading' },
            'kodansha': { url: 'https://kodansha.us', name: 'Kodansha Comics', category: 'Manga Reading' },
            'seven seas entertainment': { url: 'https://sevenseasentertainment.com', name: 'Seven Seas Entertainment', category: 'Manga Reading' },
            'seven seas': { url: 'https://sevenseasentertainment.com', name: 'Seven Seas Entertainment', category: 'Manga Reading' },
            'yen press': { url: 'https://yenpress.com', name: 'Yen Press', category: 'Manga Reading' },
            'j-novel club': { url: 'https://j-novel.club', name: 'J-Novel Club', category: 'Manga Reading' },
            'j novel club': { url: 'https://j-novel.club', name: 'J-Novel Club', category: 'Manga Reading' },
            'bookwalker': { url: 'https://bookwalker.jp', name: 'BookWalker', category: 'Manga Reading' },
            'book walker': { url: 'https://bookwalker.jp', name: 'BookWalker', category: 'Manga Reading' },
            'mangaup': { url: 'https://mangaup.square-enix.com', name: 'MangaUp!', category: 'Manga Reading' },
            'manga up': { url: 'https://mangaup.square-enix.com', name: 'MangaUp!', category: 'Manga Reading' },
            'webtoon': { url: 'https://webtoons.com', name: 'WebToon', category: 'Manga Reading' },
            
            // Community & Tracking
            'myanimelist': { url: 'https://myanimelist.net', name: 'MyAnimeList', category: 'Community & Tracking' },
            'my anime list': { url: 'https://myanimelist.net', name: 'MyAnimeList', category: 'Community & Tracking' },
            'mal': { url: 'https://myanimelist.net', name: 'MyAnimeList', category: 'Community & Tracking' },
            'anilist': { url: 'https://anilist.co', name: 'AniList', category: 'Community & Tracking' },
            'ani list': { url: 'https://anilist.co', name: 'AniList', category: 'Community & Tracking' },
            'kitsu': { url: 'https://kitsu.io', name: 'Kitsu', category: 'Community & Tracking' },
            'r/anime': { url: 'https://reddit.com/r/anime', name: 'r/anime', category: 'Community & Tracking' },
            'reddit anime': { url: 'https://reddit.com/r/anime', name: 'r/anime', category: 'Community & Tracking' },
            'r/manga': { url: 'https://reddit.com/r/manga', name: 'r/manga', category: 'Community & Tracking' },
            'reddit manga': { url: 'https://reddit.com/r/manga', name: 'r/manga', category: 'Community & Tracking' },
            'anime-planet': { url: 'https://anime-planet.com', name: 'Anime-Planet', category: 'Community & Tracking' },
            'anidb': { url: 'https://anidb.net', name: 'AniDB', category: 'Community & Tracking' },
            'ani db': { url: 'https://anidb.net', name: 'AniDB', category: 'Community & Tracking' },
            'shikimori': { url: 'https://shikimori.one', name: 'Shikimori', category: 'Community & Tracking' },
            'animeforum': { url: 'https://animeforum.com', name: 'AnimeForum', category: 'Community & Tracking' },
            'anime forum': { url: 'https://animeforum.com', name: 'AnimeForum', category: 'Community & Tracking' },
            'mangafox': { url: 'https://mangafox.fun', name: 'MangaFox', category: 'Community & Tracking' },
            'manga fox': { url: 'https://mangafox.fun', name: 'MangaFox', category: 'Community & Tracking' },
            '4chan /a/': { url: 'https://boards.4chan.org/a/', name: '4chan /a/', category: 'Community & Tracking' },
            '4chan anime': { url: 'https://boards.4chan.org/a/', name: '4chan /a/', category: 'Community & Tracking' },
            'discord anime': { url: 'https://disboard.org/servers/tag/anime', name: 'Discord Anime Servers', category: 'Community & Tracking' },
            
            // News & Industry
            'anime news network': { url: 'https://animenewsnetwork.com', name: 'Anime News Network', category: 'News & Industry' },
            'ann': { url: 'https://animenewsnetwork.com', name: 'Anime News Network', category: 'News & Industry' },
            'crunchyroll news': { url: 'https://crunchyroll.com/news', name: 'Crunchyroll News', category: 'News & Industry' },
            'siliconera': { url: 'https://siliconera.com', name: 'Siliconera', category: 'News & Industry' },
            'otaku usa': { url: 'https://otakuusamagazine.com', name: 'Otaku USA', category: 'News & Industry' },
            'goboiano': { url: 'https://goboiano.com', name: 'GoBoiano', category: 'News & Industry' },
            'the anime man': { url: 'https://youtube.com/c/TheAnimeMan', name: 'The Anime Man', category: 'News & Industry' },
            'anime man': { url: 'https://youtube.com/c/TheAnimeMan', name: 'The Anime Man', category: 'News & Industry' },
            'gigguk': { url: 'https://youtube.com/c/Gigguk', name: 'Gigguk', category: 'News & Industry' },
            "mother's basement": { url: 'https://youtube.com/c/MothersBasement', name: "Mother's Basement", category: 'News & Industry' },
            'mothers basement': { url: 'https://youtube.com/c/MothersBasement', name: "Mother's Basement", category: 'News & Industry' },
            'lost pause': { url: 'https://youtube.com/c/LostPause', name: 'Lost Pause', category: 'News & Industry' },
            'anime feminist': { url: 'https://animefeminist.com', name: 'Anime Feminist', category: 'News & Industry' },
            'sakuga blog': { url: 'https://blog.sakugabooru.com', name: 'Sakuga Blog', category: 'News & Industry' },
            'wave motion cannon': { url: 'https://wavemotioncannon.com', name: 'Wave Motion Cannon', category: 'News & Industry' }
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
        
        // 📚 Knowledge & Learning Database - Educational resources mapped by keywords
        this.knowledgeDatabase = {
            // Online Learning Platforms
            'coursera': { url: 'https://coursera.org', name: 'Coursera', category: 'Online Learning' },
            'edx': { url: 'https://edx.org', name: 'edX', category: 'Online Learning' },
            'khan academy': { url: 'https://khanacademy.org', name: 'Khan Academy', category: 'Online Learning' },
            'udemy': { url: 'https://udemy.com', name: 'Udemy', category: 'Online Learning' },
            'futurelearn': { url: 'https://futurelearn.com', name: 'FutureLearn', category: 'Online Learning' },
            'mit opencourseware': { url: 'https://ocw.mit.edu', name: 'MIT OpenCourseWare', category: 'Online Learning' },
            'mit ocw': { url: 'https://ocw.mit.edu', name: 'MIT OpenCourseWare', category: 'Online Learning' },
            'stanford online': { url: 'https://online.stanford.edu', name: 'Stanford Online', category: 'Online Learning' },
            'harvard extension': { url: 'https://extension.harvard.edu', name: 'Harvard Extension', category: 'Online Learning' },
            
            // Language Learning
            'duolingo': { url: 'https://duolingo.com', name: 'Duolingo', category: 'Language Learning' },
            'babbel': { url: 'https://babbel.com', name: 'Babbel', category: 'Language Learning' },
            'rosetta stone': { url: 'https://rosettastone.com', name: 'Rosetta Stone', category: 'Language Learning' },
            'busuu': { url: 'https://busuu.com', name: 'Busuu', category: 'Language Learning' },
            'italki': { url: 'https://italki.com', name: 'italki', category: 'Language Learning' },
            'memrise': { url: 'https://memrise.com', name: 'Memrise', category: 'Language Learning' },
            'hellotalk': { url: 'https://hellotalk.com', name: 'HelloTalk', category: 'Language Learning' },
            
            // Reference & Research
            'wikipedia': { url: 'https://wikipedia.org', name: 'Wikipedia', category: 'Reference & Research' },
            'britannica': { url: 'https://britannica.com', name: 'Britannica', category: 'Reference & Research' },
            'google scholar': { url: 'https://scholar.google.com', name: 'Google Scholar', category: 'Reference & Research' },
            'internet archive': { url: 'https://archive.org', name: 'Internet Archive', category: 'Reference & Research' },
            'jstor': { url: 'https://jstor.org', name: 'JSTOR', category: 'Reference & Research' },
            'researchgate': { url: 'https://researchgate.net', name: 'ResearchGate', category: 'Reference & Research' },
            'wolfram alpha': { url: 'https://wolframalpha.com', name: 'Wolfram Alpha', category: 'Reference & Research' },
            'pubmed': { url: 'https://pubmed.ncbi.nlm.nih.gov', name: 'PubMed', category: 'Reference & Research' },
            
            // Skill Development
            'masterclass': { url: 'https://masterclass.com', name: 'MasterClass', category: 'Skill Development' },
            'skillshare': { url: 'https://skillshare.com', name: 'Skillshare', category: 'Skill Development' },
            'linkedin learning': { url: 'https://linkedin.com/learning', name: 'LinkedIn Learning', category: 'Skill Development' },
            'pluralsight': { url: 'https://pluralsight.com', name: 'Pluralsight', category: 'Skill Development' },
            'codecademy': { url: 'https://codecademy.com', name: 'Codecademy', category: 'Skill Development' },
            'creativelive': { url: 'https://creativelive.com', name: 'CreativeLive', category: 'Skill Development' },
            'udacity': { url: 'https://udacity.com', name: 'Udacity', category: 'Skill Development' },
            'domestic ceo': { url: 'https://domesticceo.com', name: 'Domestic CEO', category: 'Skill Development' },
            
            // Libraries & Archives
            'project gutenberg': { url: 'https://gutenberg.org', name: 'Project Gutenberg', category: 'Libraries & Archives' },
            'gutenberg': { url: 'https://gutenberg.org', name: 'Project Gutenberg', category: 'Libraries & Archives' },
            'hathitrust': { url: 'https://hathitrust.org', name: 'HathiTrust', category: 'Libraries & Archives' },
            'digital public library': { url: 'https://dp.la', name: 'Digital Public Library', category: 'Libraries & Archives' },
            'europeana': { url: 'https://europeana.eu', name: 'Europeana', category: 'Libraries & Archives' },
            'library of congress': { url: 'https://loc.gov', name: 'Library of Congress', category: 'Libraries & Archives' },
            'open library': { url: 'https://openlibrary.org', name: 'Open Library', category: 'Libraries & Archives' },
            'smithsonian learning': { url: 'https://learninglab.si.edu', name: 'Smithsonian Learning', category: 'Libraries & Archives' },
            
            // Specialized Learning
            'brilliant': { url: 'https://brilliant.org', name: 'Brilliant', category: 'Specialized Learning' },
            'datacamp': { url: 'https://datacamp.com', name: 'DataCamp', category: 'Specialized Learning' },
            'coursera business': { url: 'https://coursera.org/business', name: 'Coursera for Business', category: 'Specialized Learning' },
            'edx business': { url: 'https://business.edx.org', name: 'edX for Business', category: 'Specialized Learning' },
            'ted-ed': { url: 'https://ed.ted.com', name: 'TED-Ed', category: 'Specialized Learning' },
            'crash course': { url: 'https://crashcourse.com', name: 'Crash Course', category: 'Specialized Learning' },
            'great courses': { url: 'https://thegreatcourses.com', name: 'Great Courses', category: 'Specialized Learning' },
            'academic earth': { url: 'https://academicearth.org', name: 'Academic Earth', category: 'Specialized Learning' }
        };
        
        // 🎮 Gaming & Esports Database - Gaming ecosystem mapped by keywords
        this.gamingDatabase = {
            // Game Stores & Platforms
            'steam': { url: 'https://store.steampowered.com', name: 'Steam', category: 'Game Stores' },
            'epic games store': { url: 'https://store.epicgames.com', name: 'Epic Games Store', category: 'Game Stores' },
            'epic games': { url: 'https://store.epicgames.com', name: 'Epic Games Store', category: 'Game Stores' },
            'xbox game pass': { url: 'https://xbox.com/game-pass', name: 'Xbox Game Pass', category: 'Game Stores' },
            'xbox': { url: 'https://xbox.com/game-pass', name: 'Xbox Game Pass', category: 'Game Stores' },
            'playstation store': { url: 'https://store.playstation.com', name: 'PlayStation Store', category: 'Game Stores' },
            'playstation': { url: 'https://store.playstation.com', name: 'PlayStation Store', category: 'Game Stores' },
            'nintendo eshop': { url: 'https://nintendo.com/us/eshop', name: 'Nintendo eShop', category: 'Game Stores' },
            'nintendo': { url: 'https://nintendo.com/us/eshop', name: 'Nintendo eShop', category: 'Game Stores' },
            'gog': { url: 'https://gog.com', name: 'GOG', category: 'Game Stores' },
            'origin': { url: 'https://origin.com', name: 'Origin', category: 'Game Stores' },
            'ubisoft connect': { url: 'https://ubisoftconnect.com', name: 'Ubisoft Connect', category: 'Game Stores' },
            'ubisoft': { url: 'https://ubisoftconnect.com', name: 'Ubisoft Connect', category: 'Game Stores' },
            'itch.io': { url: 'https://itch.io', name: 'itch.io', category: 'Game Stores' },
            'itch': { url: 'https://itch.io', name: 'itch.io', category: 'Game Stores' },
            'humble bundle': { url: 'https://humblebundle.com', name: 'Humble Bundle', category: 'Game Stores' },
            'humble': { url: 'https://humblebundle.com', name: 'Humble Bundle', category: 'Game Stores' },
            'battle.net': { url: 'https://battle.net', name: 'Battle.net', category: 'Game Stores' },
            'battle net': { url: 'https://battle.net', name: 'Battle.net', category: 'Game Stores' },
            'battlenet': { url: 'https://battle.net', name: 'Battle.net', category: 'Game Stores' },
            'microsoft store': { url: 'https://microsoft.com/store/games', name: 'Microsoft Store', category: 'Game Stores' },
            
            // Streaming & Content
            'twitch': { url: 'https://twitch.tv', name: 'Twitch', category: 'Streaming & Content' },
            'youtube gaming': { url: 'https://gaming.youtube.com', name: 'YouTube Gaming', category: 'Streaming & Content' },
            'facebook gaming': { url: 'https://fb.gg', name: 'Facebook Gaming', category: 'Streaming & Content' },
            'kick': { url: 'https://kick.com', name: 'Kick', category: 'Streaming & Content' },
            'gamesdonequick': { url: 'https://gamesdonequick.com', name: 'GamesDoneQuick', category: 'Streaming & Content' },
            'games done quick': { url: 'https://gamesdonequick.com', name: 'GamesDoneQuick', category: 'Streaming & Content' },
            'streamelements': { url: 'https://streamelements.com', name: 'StreamElements', category: 'Streaming & Content' },
            'stream elements': { url: 'https://streamelements.com', name: 'StreamElements', category: 'Streaming & Content' },
            'obs studio': { url: 'https://obsproject.com', name: 'OBS Studio', category: 'Streaming & Content' },
            'obs': { url: 'https://obsproject.com', name: 'OBS Studio', category: 'Streaming & Content' },
            'streamlabs': { url: 'https://streamlabs.com', name: 'Streamlabs', category: 'Streaming & Content' },
            
            // Communities & Forums
            'reddit gaming': { url: 'https://reddit.com/r/gaming', name: 'Reddit Gaming', category: 'Communities & Forums' },
            'discord': { url: 'https://discord.com', name: 'Discord', category: 'Communities & Forums' },
            'gamefaqs': { url: 'https://gamefaqs.gamespot.com', name: 'GameFAQs', category: 'Communities & Forums' },
            'game faqs': { url: 'https://gamefaqs.gamespot.com', name: 'GameFAQs', category: 'Communities & Forums' },
            'neogaf': { url: 'https://neogaf.com', name: 'NeoGAF', category: 'Communities & Forums' },
            'neo gaf': { url: 'https://neogaf.com', name: 'NeoGAF', category: 'Communities & Forums' },
            'resetera': { url: 'https://resetera.com', name: 'ResetEra', category: 'Communities & Forums' },
            'reset era': { url: 'https://resetera.com', name: 'ResetEra', category: 'Communities & Forums' },
            'steam community': { url: 'https://steamcommunity.com', name: 'Steam Community', category: 'Communities & Forums' },
            'giant bomb': { url: 'https://giantbomb.com', name: 'Giant Bomb', category: 'Communities & Forums' },
            'trueachievements': { url: 'https://trueachievements.com', name: 'TrueAchievements', category: 'Communities & Forums' },
            'true achievements': { url: 'https://trueachievements.com', name: 'TrueAchievements', category: 'Communities & Forums' },
            'ign': { url: 'https://ign.com', name: 'IGN', category: 'Communities & Forums' },
            'gamespot': { url: 'https://gamespot.com', name: 'GameSpot', category: 'Communities & Forums' },
            'game spot': { url: 'https://gamespot.com', name: 'GameSpot', category: 'Communities & Forums' },
            
            // Esports & Competitive
            'esl gaming': { url: 'https://esl-gaming.com', name: 'ESL Gaming', category: 'Esports & Competitive' },
            'esl': { url: 'https://esl-gaming.com', name: 'ESL Gaming', category: 'Esports & Competitive' },
            'liquipedia': { url: 'https://liquipedia.net', name: 'Liquipedia', category: 'Esports & Competitive' },
            'hltv': { url: 'https://hltv.org', name: 'HLTV', category: 'Esports & Competitive' },
            'lolesports': { url: 'https://lolesports.com', name: 'Lolesports', category: 'Esports & Competitive' },
            'lol esports': { url: 'https://lolesports.com', name: 'Lolesports', category: 'Esports & Competitive' },
            'faceit': { url: 'https://faceit.com', name: 'FACEIT', category: 'Esports & Competitive' },
            'esea': { url: 'https://esea.net', name: 'ESEA', category: 'Esports & Competitive' },
            'dotabuff': { url: 'https://dotabuff.com', name: 'Dotabuff', category: 'Esports & Competitive' },
            'dota buff': { url: 'https://dotabuff.com', name: 'Dotabuff', category: 'Esports & Competitive' },
            'vlr.gg': { url: 'https://vlr.gg', name: 'VLR.gg', category: 'Esports & Competitive' },
            'vlr': { url: 'https://vlr.gg', name: 'VLR.gg', category: 'Esports & Competitive' },
            'smash.gg': { url: 'https://smash.gg', name: 'Smash.gg', category: 'Esports & Competitive' },
            'smash gg': { url: 'https://smash.gg', name: 'Smash.gg', category: 'Esports & Competitive' },
            'blast': { url: 'https://blast.tv', name: 'BLAST', category: 'Esports & Competitive' },
            'blast tv': { url: 'https://blast.tv', name: 'BLAST', category: 'Esports & Competitive' },
            'tracker.gg': { url: 'https://tracker.gg', name: 'Tracker.gg', category: 'Esports & Competitive' },
            'tracker gg': { url: 'https://tracker.gg', name: 'Tracker.gg', category: 'Esports & Competitive' },
            'tracker': { url: 'https://tracker.gg', name: 'Tracker.gg', category: 'Esports & Competitive' },
            'esports earnings': { url: 'https://esportsearnings.com', name: 'Esports Earnings', category: 'Esports & Competitive' }
        };
        
        // 🎨 Design & Creative Tools Database - Creative ecosystem mapped by keywords
        this.designDatabase = {
            // Design Tools
            'figma': { url: 'https://figma.com', name: 'Figma', category: 'Design Tools' },
            'adobe creative cloud': { url: 'https://adobe.com/creativecloud', name: 'Adobe Creative Cloud', category: 'Design Tools' },
            'creative cloud': { url: 'https://adobe.com/creativecloud', name: 'Adobe Creative Cloud', category: 'Design Tools' },
            'canva': { url: 'https://canva.com', name: 'Canva', category: 'Design Tools' },
            'sketch': { url: 'https://sketch.com', name: 'Sketch', category: 'Design Tools' },
            'adobe xd': { url: 'https://adobe.com/products/xd', name: 'Adobe XD', category: 'Design Tools' },
            'xd': { url: 'https://adobe.com/products/xd', name: 'Adobe XD', category: 'Design Tools' },
            'framer': { url: 'https://framer.com', name: 'Framer', category: 'Design Tools' },
            'invision': { url: 'https://invisionapp.com', name: 'InVision', category: 'Design Tools' },
            'invision app': { url: 'https://invisionapp.com', name: 'InVision', category: 'Design Tools' },
            'affinity designer': { url: 'https://affinity.serif.com/designer', name: 'Affinity Designer', category: 'Design Tools' },
            'procreate': { url: 'https://procreate.art', name: 'Procreate', category: 'Design Tools' },
            'blender': { url: 'https://blender.org', name: 'Blender', category: 'Design Tools' },
            
            // Stock Resources
            'unsplash': { url: 'https://unsplash.com', name: 'Unsplash', category: 'Stock Resources' },
            'shutterstock': { url: 'https://shutterstock.com', name: 'Shutterstock', category: 'Stock Resources' },
            'getty images': { url: 'https://gettyimages.com', name: 'Getty Images', category: 'Stock Resources' },
            'getty': { url: 'https://gettyimages.com', name: 'Getty Images', category: 'Stock Resources' },
            'pexels': { url: 'https://pexels.com', name: 'Pexels', category: 'Stock Resources' },
            'adobe stock': { url: 'https://stock.adobe.com', name: 'Adobe Stock', category: 'Stock Resources' },
            'freepik': { url: 'https://freepik.com', name: 'Freepik', category: 'Stock Resources' },
            'pixabay': { url: 'https://pixabay.com', name: 'Pixabay', category: 'Stock Resources' },
            'envato elements': { url: 'https://elements.envato.com', name: 'Envato Elements', category: 'Stock Resources' },
            'envato': { url: 'https://elements.envato.com', name: 'Envato Elements', category: 'Stock Resources' },
            'icons8': { url: 'https://icons8.com', name: 'Icons8', category: 'Stock Resources' },
            'creative market': { url: 'https://creativemarket.com', name: 'Creative Market', category: 'Stock Resources' },
            
            // Inspiration & Community
            'dribbble': { url: 'https://dribbble.com', name: 'Dribbble', category: 'Inspiration & Community' },
            'behance': { url: 'https://behance.net', name: 'Behance', category: 'Inspiration & Community' },
            'pinterest': { url: 'https://pinterest.com', name: 'Pinterest', category: 'Inspiration & Community' },
            'awwwards': { url: 'https://awwwards.com', name: 'Awwwards', category: 'Inspiration & Community' },
            'designer hangout': { url: 'https://designerhangout.co', name: 'Designer Hangout', category: 'Inspiration & Community' },
            'muzli': { url: 'https://muz.li', name: 'Muzli', category: 'Inspiration & Community' },
            'collect ui': { url: 'https://collectui.com', name: 'Collect UI', category: 'Inspiration & Community' },
            'collectui': { url: 'https://collectui.com', name: 'Collect UI', category: 'Inspiration & Community' },
            'ui movement': { url: 'https://uimovement.com', name: 'UI Movement', category: 'Inspiration & Community' },
            'uimovement': { url: 'https://uimovement.com', name: 'UI Movement', category: 'Inspiration & Community' },
            'page flows': { url: 'https://pageflows.com', name: 'Page Flows', category: 'Inspiration & Community' },
            'pageflows': { url: 'https://pageflows.com', name: 'Page Flows', category: 'Inspiration & Community' },
            'really good ux': { url: 'https://reallygoodux.io', name: 'Really Good UX', category: 'Inspiration & Community' },
            'reallygoodux': { url: 'https://reallygoodux.io', name: 'Really Good UX', category: 'Inspiration & Community' },
            
            // Collaboration & Feedback
            'abstract': { url: 'https://abstract.com', name: 'Abstract', category: 'Collaboration & Feedback' },
            'zeplin': { url: 'https://zeplin.io', name: 'Zeplin', category: 'Collaboration & Feedback' },
            'marvel': { url: 'https://marvelapp.com', name: 'Marvel', category: 'Collaboration & Feedback' },
            'marvelapp': { url: 'https://marvelapp.com', name: 'Marvel', category: 'Collaboration & Feedback' },
            'principle': { url: 'https://principleformac.com', name: 'Principle', category: 'Collaboration & Feedback' },
            'notion': { url: 'https://notion.so', name: 'Notion', category: 'Collaboration & Feedback' },
            'miro': { url: 'https://miro.com', name: 'Miro', category: 'Collaboration & Feedback' },
            'uservoice': { url: 'https://uservoice.com', name: 'UserVoice', category: 'Collaboration & Feedback' },
            'user voice': { url: 'https://uservoice.com', name: 'UserVoice', category: 'Collaboration & Feedback' },
            'loom': { url: 'https://loom.com', name: 'Loom', category: 'Collaboration & Feedback' },
            'protopie': { url: 'https://protopie.io', name: 'ProtoPie', category: 'Collaboration & Feedback' },
            'proto pie': { url: 'https://protopie.io', name: 'ProtoPie', category: 'Collaboration & Feedback' },
            'avocode': { url: 'https://avocode.com', name: 'Avocode', category: 'Collaboration & Feedback' }
        };
        
        // 🏃 Health & Fitness Database - Health and wellness ecosystem mapped by keywords
        this.healthDatabase = {
            // Fitness Tracking & Apps
            'myfitnesspal': { url: 'https://myfitnesspal.com', name: 'MyFitnessPal', category: 'Fitness Tracking & Apps' },
            'strava': { url: 'https://strava.com', name: 'Strava', category: 'Fitness Tracking & Apps' },
            'fitbit': { url: 'https://fitbit.com', name: 'Fitbit', category: 'Fitness Tracking & Apps' },
            'nike training club': { url: 'https://nike.com/ntc-app', name: 'Nike Training Club', category: 'Fitness Tracking & Apps' },
            'nike training': { url: 'https://nike.com/ntc-app', name: 'Nike Training Club', category: 'Fitness Tracking & Apps' },
            'apple fitness+': { url: 'https://fitness.apple.com', name: 'Apple Fitness+', category: 'Fitness Tracking & Apps' },
            'apple fitness': { url: 'https://fitness.apple.com', name: 'Apple Fitness+', category: 'Fitness Tracking & Apps' },
            'garmin connect': { url: 'https://connect.garmin.com', name: 'Garmin Connect', category: 'Fitness Tracking & Apps' },
            'garmin': { url: 'https://connect.garmin.com', name: 'Garmin Connect', category: 'Fitness Tracking & Apps' },
            'under armour mapmyfitness': { url: 'https://mapmyfitness.com', name: 'Under Armour MapMyFitness', category: 'Fitness Tracking & Apps' },
            'mapmyfitness': { url: 'https://mapmyfitness.com', name: 'Under Armour MapMyFitness', category: 'Fitness Tracking & Apps' },
            'adidas training': { url: 'https://adidas.com/app', name: 'Adidas Training', category: 'Fitness Tracking & Apps' },
            'seven': { url: 'https://seven.app', name: 'Seven', category: 'Fitness Tracking & Apps' },
            'freeletics': { url: 'https://freeletics.com', name: 'Freeletics', category: 'Fitness Tracking & Apps' },
            'sweat': { url: 'https://sweat.com', name: 'Sweat', category: 'Fitness Tracking & Apps' },
            
            // Nutrition & Diet
            'cronometer': { url: 'https://cronometer.com', name: 'Cronometer', category: 'Nutrition & Diet' },
            'lose it!': { url: 'https://loseit.com', name: 'Lose It!', category: 'Nutrition & Diet' },
            'lose it': { url: 'https://loseit.com', name: 'Lose It!', category: 'Nutrition & Diet' },
            'yazio': { url: 'https://yazio.com', name: 'Yazio', category: 'Nutrition & Diet' },
            'noom': { url: 'https://noom.com', name: 'Noom', category: 'Nutrition & Diet' },
            'ww': { url: 'https://weightwatchers.com', name: 'WW (Weight Watchers)', category: 'Nutrition & Diet' },
            'weight watchers': { url: 'https://weightwatchers.com', name: 'WW (Weight Watchers)', category: 'Nutrition & Diet' },
            'platejoy': { url: 'https://platejoy.com', name: 'PlateJoy', category: 'Nutrition & Diet' },
            'eat this much': { url: 'https://eatthismuch.com', name: 'Eat This Much', category: 'Nutrition & Diet' },
            'nutrients': { url: 'https://nutrients.app', name: 'Nutrients', category: 'Nutrition & Diet' },
            'lifesum': { url: 'https://lifesum.com', name: 'Lifesum', category: 'Nutrition & Diet' },
            'fooducate': { url: 'https://fooducate.com', name: 'Fooducate', category: 'Nutrition & Diet' },
            
            // Mental Health & Wellness
            'headspace': { url: 'https://headspace.com', name: 'Headspace', category: 'Mental Health & Wellness' },
            'calm': { url: 'https://calm.com', name: 'Calm', category: 'Mental Health & Wellness' },
            'insight timer': { url: 'https://insighttimer.com', name: 'Insight Timer', category: 'Mental Health & Wellness' },
            'ten percent happier': { url: 'https://tenpercent.com', name: 'Ten Percent Happier', category: 'Mental Health & Wellness' },
            '10% happier': { url: 'https://tenpercent.com', name: 'Ten Percent Happier', category: 'Mental Health & Wellness' },
            'waking up': { url: 'https://wakingup.com', name: 'Waking Up', category: 'Mental Health & Wellness' },
            'betterhelp': { url: 'https://betterhelp.com', name: 'BetterHelp', category: 'Mental Health & Wellness' },
            'better help': { url: 'https://betterhelp.com', name: 'BetterHelp', category: 'Mental Health & Wellness' },
            'talkspace': { url: 'https://talkspace.com', name: 'Talkspace', category: 'Mental Health & Wellness' },
            'ptsd coach': { url: 'https://ptsd.va.gov/appvid/mobile/ptsdcoach_app.asp', name: 'PTSD Coach', category: 'Mental Health & Wellness' },
            'sanvello': { url: 'https://sanvello.com', name: 'Sanvello', category: 'Mental Health & Wellness' },
            'youper': { url: 'https://youper.ai', name: 'Youper', category: 'Mental Health & Wellness' },
            'shine': { url: 'https://theshineapp.com', name: 'Shine', category: 'Mental Health & Wellness' },
            
            // Workout & Training Platforms
            'peloton digital': { url: 'https://onepeloton.com', name: 'Peloton Digital', category: 'Workout & Training Platforms' },
            'peloton': { url: 'https://onepeloton.com', name: 'Peloton Digital', category: 'Workout & Training Platforms' },
            'daily burn': { url: 'https://dailyburn.com', name: 'Daily Burn', category: 'Workout & Training Platforms' },
            'dailyburn': { url: 'https://dailyburn.com', name: 'Daily Burn', category: 'Workout & Training Platforms' },
            'beachbody on demand': { url: 'https://beachbodyondemand.com', name: 'Beachbody On Demand', category: 'Workout & Training Platforms' },
            'beachbody': { url: 'https://beachbodyondemand.com', name: 'Beachbody On Demand', category: 'Workout & Training Platforms' },
            'les mills on demand': { url: 'https://lesmillsondemand.com', name: 'Les Mills On Demand', category: 'Workout & Training Platforms' },
            'les mills': { url: 'https://lesmillsondemand.com', name: 'Les Mills On Demand', category: 'Workout & Training Platforms' },
            'classpass': { url: 'https://classpass.com', name: 'ClassPass', category: 'Workout & Training Platforms' },
            'class pass': { url: 'https://classpass.com', name: 'ClassPass', category: 'Workout & Training Platforms' },
            'alo moves': { url: 'https://alomoves.com', name: 'Alo Moves', category: 'Workout & Training Platforms' },
            'alomoves': { url: 'https://alomoves.com', name: 'Alo Moves', category: 'Workout & Training Platforms' },
            'down dog yoga': { url: 'https://downdogapp.com', name: 'Down Dog Yoga', category: 'Workout & Training Platforms' },
            'down dog': { url: 'https://downdogapp.com', name: 'Down Dog Yoga', category: 'Workout & Training Platforms' },
            'corepower yoga on demand': { url: 'https://corepoweryoga.com', name: 'CorePower Yoga On Demand', category: 'Workout & Training Platforms' },
            'corepower yoga': { url: 'https://corepoweryoga.com', name: 'CorePower Yoga On Demand', category: 'Workout & Training Platforms' },
            'corepower': { url: 'https://corepoweryoga.com', name: 'CorePower Yoga On Demand', category: 'Workout & Training Platforms' },
            'obé fitness': { url: 'https://obefitness.com', name: 'Obé Fitness', category: 'Workout & Training Platforms' },
            'obe fitness': { url: 'https://obefitness.com', name: 'Obé Fitness', category: 'Workout & Training Platforms' },
            'mirror home gym': { url: 'https://mirror.co', name: 'Mirror Home Gym', category: 'Workout & Training Platforms' },
            'mirror': { url: 'https://mirror.co', name: 'Mirror Home Gym', category: 'Workout & Training Platforms' },
            'tonal': { url: 'https://tonal.com', name: 'Tonal', category: 'Workout & Training Platforms' }
        };
        
        // 🌍 Social Media & Community Database - Social platforms and community hubs mapped by keywords
        this.socialDatabase = {
            // Major Social Platforms
            'facebook': { url: 'https://facebook.com', name: 'Facebook', category: 'Major Social Platforms' },
            'instagram': { url: 'https://instagram.com', name: 'Instagram', category: 'Major Social Platforms' },
            'twitter': { url: 'https://twitter.com', name: 'Twitter', category: 'Major Social Platforms' },
            'x': { url: 'https://x.com', name: 'X (Twitter)', category: 'Major Social Platforms' },
            'linkedin': { url: 'https://linkedin.com', name: 'LinkedIn', category: 'Major Social Platforms' },
            'snapchat': { url: 'https://snapchat.com', name: 'Snapchat', category: 'Major Social Platforms' },
            'tiktok': { url: 'https://tiktok.com', name: 'TikTok', category: 'Major Social Platforms' },
            'pinterest': { url: 'https://pinterest.com', name: 'Pinterest', category: 'Major Social Platforms' },
            'youtube': { url: 'https://youtube.com', name: 'YouTube', category: 'Major Social Platforms' },
            'telegram': { url: 'https://telegram.org', name: 'Telegram', category: 'Major Social Platforms' },
            'whatsapp web': { url: 'https://web.whatsapp.com', name: 'WhatsApp Web', category: 'Major Social Platforms' },
            'whatsapp': { url: 'https://web.whatsapp.com', name: 'WhatsApp Web', category: 'Major Social Platforms' },
            
            // Community Platforms
            'reddit': { url: 'https://reddit.com', name: 'Reddit', category: 'Community Platforms' },
            'discord': { url: 'https://discord.com', name: 'Discord', category: 'Community Platforms' },
            'slack': { url: 'https://slack.com', name: 'Slack', category: 'Community Platforms' },
            'clubhouse': { url: 'https://clubhouse.com', name: 'Clubhouse', category: 'Community Platforms' },
            'mastodon': { url: 'https://mastodon.social', name: 'Mastodon', category: 'Community Platforms' },
            'matrix': { url: 'https://matrix.org', name: 'Matrix', category: 'Community Platforms' },
            'signal': { url: 'https://signal.org', name: 'Signal', category: 'Community Platforms' },
            'tumblr': { url: 'https://tumblr.com', name: 'Tumblr', category: 'Community Platforms' },
            'quora': { url: 'https://quora.com', name: 'Quora', category: 'Community Platforms' },
            'stack overflow': { url: 'https://stackoverflow.com', name: 'Stack Overflow', category: 'Community Platforms' },
            'stackoverflow': { url: 'https://stackoverflow.com', name: 'Stack Overflow', category: 'Community Platforms' },
            
            // Professional Networks
            'behance': { url: 'https://behance.net', name: 'Behance', category: 'Professional Networks' },
            'dribbble': { url: 'https://dribbble.com', name: 'Dribbble', category: 'Professional Networks' },
            'github': { url: 'https://github.com', name: 'GitHub', category: 'Professional Networks' },
            'gitlab': { url: 'https://gitlab.com', name: 'GitLab', category: 'Professional Networks' },
            'deviantart': { url: 'https://deviantart.com', name: 'DeviantArt', category: 'Professional Networks' },
            'artstation': { url: 'https://artstation.com', name: 'ArtStation', category: 'Professional Networks' },
            'medium': { url: 'https://medium.com', name: 'Medium', category: 'Professional Networks' },
            'dev.to': { url: 'https://dev.to', name: 'Dev.to', category: 'Professional Networks' },
            'hackernews': { url: 'https://news.ycombinator.com', name: 'Hacker News', category: 'Professional Networks' },
            'hacker news': { url: 'https://news.ycombinator.com', name: 'Hacker News', category: 'Professional Networks' },
            
            // Niche Communities
            'goodreads': { url: 'https://goodreads.com', name: 'Goodreads', category: 'Niche Communities' },
            'letterboxd': { url: 'https://letterboxd.com', name: 'Letterboxd', category: 'Niche Communities' },
            'strava': { url: 'https://strava.com', name: 'Strava', category: 'Niche Communities' },
            'meetup': { url: 'https://meetup.com', name: 'Meetup', category: 'Niche Communities' },
            'nextdoor': { url: 'https://nextdoor.com', name: 'Nextdoor', category: 'Niche Communities' },
            'ravelry': { url: 'https://ravelry.com', name: 'Ravelry', category: 'Niche Communities' },
            'untappd': { url: 'https://untappd.com', name: 'Untappd', category: 'Niche Communities' },
            'foursquare': { url: 'https://foursquare.com', name: 'Foursquare', category: 'Niche Communities' },
            'yelp': { url: 'https://yelp.com', name: 'Yelp', category: 'Niche Communities' },
            'tripadvisor': { url: 'https://tripadvisor.com', name: 'TripAdvisor', category: 'Niche Communities' },
            
            // Gaming Communities
            'steam community': { url: 'https://steamcommunity.com', name: 'Steam Community', category: 'Gaming Communities' },
            'twitch': { url: 'https://twitch.tv', name: 'Twitch', category: 'Gaming Communities' },
            'mixer': { url: 'https://mixer.com', name: 'Mixer', category: 'Gaming Communities' },
            'kick': { url: 'https://kick.com', name: 'Kick', category: 'Gaming Communities' },
            'gamejolt': { url: 'https://gamejolt.com', name: 'GameJolt', category: 'Gaming Communities' },
            'itch.io community': { url: 'https://itch.io/community', name: 'itch.io Community', category: 'Gaming Communities' },
            'resetera': { url: 'https://resetera.com', name: 'ResetEra', category: 'Gaming Communities' },
            'neogaf': { url: 'https://neogaf.com', name: 'NeoGAF', category: 'Gaming Communities' },
            
            // Business & Networking
            'xing': { url: 'https://xing.com', name: 'Xing', category: 'Business & Networking' },
            'wellfound': { url: 'https://wellfound.com', name: 'Wellfound', category: 'Business & Networking' },
            'angellist': { url: 'https://angel.co', name: 'AngelList', category: 'Business & Networking' },
            'producthunt': { url: 'https://producthunt.com', name: 'Product Hunt', category: 'Business & Networking' },
            'product hunt': { url: 'https://producthunt.com', name: 'Product Hunt', category: 'Business & Networking' },
            'indiehackers': { url: 'https://indiehackers.com', name: 'Indie Hackers', category: 'Business & Networking' },
            'indie hackers': { url: 'https://indiehackers.com', name: 'Indie Hackers', category: 'Business & Networking' },
            'founder groups': { url: 'https://foundergroups.com', name: 'Founder Groups', category: 'Business & Networking' },
            
            // Alternative/Emerging Platforms
            'threads': { url: 'https://threads.net', name: 'Threads', category: 'Alternative/Emerging' },
            'bluesky': { url: 'https://bsky.app', name: 'Bluesky', category: 'Alternative/Emerging' },
            'vero': { url: 'https://vero.co', name: 'Vero', category: 'Alternative/Emerging' },
            'minds': { url: 'https://minds.com', name: 'Minds', category: 'Alternative/Emerging' },
            'gab': { url: 'https://gab.com', name: 'Gab', category: 'Alternative/Emerging' },
            'parler': { url: 'https://parler.com', name: 'Parler', category: 'Alternative/Emerging' },
            'gettr': { url: 'https://gettr.com', name: 'GETTR', category: 'Alternative/Emerging' },
            'truth social': { url: 'https://truthsocial.com', name: 'Truth Social', category: 'Alternative/Emerging' }
        };
        
        console.log('🎮 Gateway Smart Controller initializing...');
        console.log('🔍 Loaded', Object.keys(this.searchEngines).length, 'search engines');
        console.log('🛠️ Loaded', Object.keys(this.toolsDatabase).length, 'tools & utilities');
        console.log('🎆 Loaded', Object.keys(this.entertainmentDatabase).length, 'entertainment platforms');
        console.log('📰 Loaded', Object.keys(this.newsDatabase).length, 'news sources');
        console.log('📚 Loaded', Object.keys(this.knowledgeDatabase).length, 'knowledge & learning resources');
        console.log('🎮 Loaded', Object.keys(this.gamingDatabase).length, 'gaming & esports platforms');
        console.log('🎨 Loaded', Object.keys(this.designDatabase).length, 'design & creative tools');
        console.log('🏃 Loaded', Object.keys(this.healthDatabase).length, 'health & fitness platforms');
        console.log('🌍 Loaded', Object.keys(this.socialDatabase).length, 'social media & community platforms');
        console.log('🛍️ Loaded', Object.keys(this.lifestyleDatabase).length, 'lifestyle & shopping platforms');
        console.log('🗾 Loaded', Object.keys(this.animeDatabase).length, 'anime & manga platforms');
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
        
        // 📚 KNOWLEDGE & LEARNING COMMANDS - Handle educational resources
        if (this.handleKnowledgeCommand(lowercaseCommand)) {
            return;
        }
        
        // 🎮 GAMING & ESPORTS COMMANDS - Handle gaming platforms
        if (this.handleGamingCommand(lowercaseCommand)) {
            return;
        }
        
        // 🎨 DESIGN & CREATIVE TOOLS COMMANDS - Handle design platforms
        if (this.handleDesignCommand(lowercaseCommand)) {
            return;
        }
        
        // 🏃 HEALTH & FITNESS COMMANDS - Handle health platforms
        if (this.handleHealthCommand(lowercaseCommand)) {
            return;
        }
        
        // 🌍 SOCIAL MEDIA & COMMUNITY COMMANDS - Handle social platforms
        if (this.handleSocialCommand(lowercaseCommand)) {
            return;
        }
        
        // 🛍️ LIFESTYLE & SHOPPING COMMANDS - Handle lifestyle platforms
        if (this.handleLifestyleCommand(lowercaseCommand)) {
            return;
        }
        
        // 🗾 ANIME & MANGA COMMANDS - Handle anime platforms
        if (this.handleAnimeCommand(lowercaseCommand)) {
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
    
    // 📚 KNOWLEDGE & LEARNING SMART CONTROLLER METHODS
    
    handleKnowledgeCommand(command) {
        const lowercaseCommand = command.toLowerCase().trim();
        
        // Check if it's a request for the knowledge category
        if (this.isKnowledgeCategoryRequest(lowercaseCommand)) {
            this.openKnowledgeCategory();
            return true;
        }
        
        // Check if it's a specific learning resource request
        const resourceMatch = this.findKnowledgeResource(lowercaseCommand);
        if (resourceMatch) {
            this.openKnowledgeResource(resourceMatch);
            return true;
        }
        
        return false; // Not a knowledge command
    }
    
    isKnowledgeCategoryRequest(command) {
        const categoryPhrases = [
            'knowledge category',
            'knowledge & learning',
            'knowledge and learning',
            'show me knowledge',
            'open knowledge',
            'go to knowledge',
            'take me to knowledge',
            'learning category',
            'educational resources',
            'education category'
        ];
        
        return categoryPhrases.some(phrase => command.includes(phrase));
    }
    
    findKnowledgeResource(command) {
        // Direct match
        if (this.knowledgeDatabase[command]) {
            return this.knowledgeDatabase[command];
        }
        
        // Partial match (for "open khan academy", "launch coursera", etc.)
        for (const [key, resource] of Object.entries(this.knowledgeDatabase)) {
            if (command.includes(key)) {
                return resource;
            }
        }
        
        return null;
    }
    
    openKnowledgeCategory() {
        console.log('🎯 Opening Knowledge & Learning category page');
        window.location.href = 'categories/knowledge/';
        
        this.addMessage('📚 Opening Knowledge & Learning with 53 educational resources! From Khan Academy and Coursera to Wikipedia, language learning platforms like Duolingo, and research tools.', 'ai');
        this.updateStatus('Opening knowledge category...');
    }
    
    openKnowledgeResource(resource) {
        console.log('🚀 Opening knowledge resource:', resource.name);
        window.open(resource.url, '_blank');
        
        this.addMessage(`📚 Opening ${resource.name}! Perfect for ${resource.category.toLowerCase()} activities.`, 'ai');
        this.updateStatus(`Opened ${resource.name}!`);
    }
    
    // 🎮 GAMING & ESPORTS SMART CONTROLLER METHODS
    
    handleGamingCommand(command) {
        const lowercaseCommand = command.toLowerCase().trim();
        
        // Check if it's a request for the gaming category
        if (this.isGamingCategoryRequest(lowercaseCommand)) {
            this.openGamingCategory();
            return true;
        }
        
        // Check if it's a specific gaming platform request
        const gamingMatch = this.findGamingPlatform(lowercaseCommand);
        if (gamingMatch) {
            this.openGamingPlatform(gamingMatch);
            return true;
        }
        
        return false; // Not a gaming command
    }
    
    isGamingCategoryRequest(command) {
        const categoryPhrases = [
            'gaming category',
            'gaming & esports',
            'gaming and esports',
            'show me gaming',
            'open gaming',
            'go to gaming',
            'take me to gaming',
            'esports category',
            'game platforms',
            'gaming platforms'
        ];
        
        return categoryPhrases.some(phrase => command.includes(phrase));
    }
    
    findGamingPlatform(command) {
        // Direct match
        if (this.gamingDatabase[command]) {
            return this.gamingDatabase[command];
        }
        
        // Partial match (for "open steam", "launch twitch", etc.)
        for (const [key, platform] of Object.entries(this.gamingDatabase)) {
            if (command.includes(key)) {
                return platform;
            }
        }
        
        return null;
    }
    
    openGamingCategory() {
        console.log('🎯 Opening Gaming & Esports category page');
        window.location.href = 'categories/gaming/';
        
        this.addMessage('🎮 Opening Gaming & Esports with 42 awesome platforms! From Steam and Epic Games to Twitch, Discord, and competitive esports platforms like FACEIT.', 'ai');
        this.updateStatus('Opening gaming category...');
    }
    
    openGamingPlatform(platform) {
        console.log('🚀 Opening gaming platform:', platform.name);
        window.open(platform.url, '_blank');
        
        this.addMessage(`🎮 Opening ${platform.name}! Perfect for ${platform.category.toLowerCase()} activities.`, 'ai');
        this.updateStatus(`Opened ${platform.name}!`);
    }
    
    // 🏃 HEALTH & FITNESS SMART CONTROLLER METHODS
    
    handleHealthCommand(command) {
        const lowercaseCommand = command.toLowerCase().trim();
        
        // Check if it's a request for the health category
        if (this.isHealthCategoryRequest(lowercaseCommand)) {
            this.openHealthCategory();
            return true;
        }
        
        // Check if it's a specific health platform request
        const healthMatch = this.findHealthPlatform(lowercaseCommand);
        if (healthMatch) {
            this.openHealthPlatform(healthMatch);
            return true;
        }
        
        return false; // Not a health command
    }
    
    isHealthCategoryRequest(command) {
        const categoryPhrases = [
            'health category',
            'health & fitness',
            'health and fitness',
            'fitness category',
            'wellness category',
            'show me health',
            'open health',
            'go to health',
            'take me to health',
            'fitness platforms',
            'health platforms',
            'wellness platforms',
            'health tools'
        ];
        
        return categoryPhrases.some(phrase => command.includes(phrase));
    }
    
    findHealthPlatform(command) {
        // Direct match
        if (this.healthDatabase[command]) {
            return this.healthDatabase[command];
        }
        
        // Partial match (for "open myfitnesspal", "launch headspace", etc.)
        for (const [key, platform] of Object.entries(this.healthDatabase)) {
            if (command.includes(key)) {
                return platform;
            }
        }
        
        // Special handling for common health-related queries
        if (command.includes('fitness track') || command.includes('calorie') || command.includes('workout track')) {
            return this.healthDatabase['myfitnesspal'];
        }
        if (command.includes('meditation') || command.includes('mindfulness') || command.includes('mental health')) {
            return this.healthDatabase['headspace'];
        }
        if (command.includes('running') || command.includes('cycling') || command.includes('activity track')) {
            return this.healthDatabase['strava'];
        }
        if (command.includes('yoga') || command.includes('home workout')) {
            return this.healthDatabase['down dog yoga'];
        }
        if (command.includes('nutrition') || command.includes('diet') || command.includes('food track')) {
            return this.healthDatabase['cronometer'];
        }
        if (command.includes('therapy') || command.includes('counseling') || command.includes('mental support')) {
            return this.healthDatabase['betterhelp'];
        }
        if (command.includes('sleep') || command.includes('relax') || command.includes('calm')) {
            return this.healthDatabase['calm'];
        }
        
        return null;
    }
    
    openHealthCategory() {
        console.log('🎯 Opening Health & Fitness category page');
        window.location.href = 'categories/health/';
        
        this.addMessage('🏃 Opening Health & Fitness with 43 wellness platforms! From fitness tracking with MyFitnessPal and Strava to mental wellness with Headspace and Calm, plus nutrition tools and workout platforms.', 'ai');
        this.updateStatus('Opening health category...');
    }
    
    openHealthPlatform(platform) {
        console.log('🚀 Opening health platform:', platform.name);
        window.open(platform.url, '_blank');
        
        this.addMessage(`🏃 Opening ${platform.name}! Perfect for ${platform.category.toLowerCase()} activities.`, 'ai');
        this.updateStatus(`Opened ${platform.name}!`);
    }
    
    // 🌍 SOCIAL MEDIA & COMMUNITY SMART CONTROLLER METHODS
    
    handleSocialCommand(command) {
        const lowercaseCommand = command.toLowerCase().trim();
        
        // Check if it's a request for the social category
        if (this.isSocialCategoryRequest(lowercaseCommand)) {
            this.openSocialCategory();
            return true;
        }
        
        // Check if it's a specific social platform request
        const socialMatch = this.findSocialPlatform(lowercaseCommand);
        if (socialMatch) {
            this.openSocialPlatform(socialMatch);
            return true;
        }
        
        return false; // Not a social command
    }
    
    isSocialCategoryRequest(command) {
        const categoryPhrases = [
            'social category',
            'social media',
            'social & community',
            'social and community',
            'show me social',
            'open social',
            'go to social',
            'take me to social',
            'community platforms',
            'social platforms',
            'social networks'
        ];
        
        return categoryPhrases.some(phrase => command.includes(phrase));
    }
    
    findSocialPlatform(command) {
        // Direct match
        if (this.socialDatabase[command]) {
            return this.socialDatabase[command];
        }
        
        // Partial match (for "open facebook", "launch discord", etc.)
        for (const [key, platform] of Object.entries(this.socialDatabase)) {
            if (command.includes(key)) {
                return platform;
            }
        }
        
        // Special handling for common social queries
        if (command.includes('chat') || command.includes('messaging')) {
            return this.socialDatabase['discord'] || this.socialDatabase['telegram'];
        }
        if (command.includes('professional network') || command.includes('job') || command.includes('career')) {
            return this.socialDatabase['linkedin'];
        }
        if (command.includes('video sharing') || command.includes('video platform')) {
            return this.socialDatabase['youtube'];
        }
        if (command.includes('micro blog') || command.includes('news social')) {
            return this.socialDatabase['twitter'];
        }
        if (command.includes('photo sharing') || command.includes('pictures')) {
            return this.socialDatabase['instagram'];
        }
        if (command.includes('discussion') || command.includes('forum') || command.includes('community discussion')) {
            return this.socialDatabase['reddit'];
        }
        if (command.includes('business network') || command.includes('startup community')) {
            return this.socialDatabase['producthunt'] || this.socialDatabase['indiehackers'];
        }
        if (command.includes('creative portfolio') || command.includes('design community')) {
            return this.socialDatabase['behance'] || this.socialDatabase['dribbble'];
        }
        if (command.includes('developer community') || command.includes('code sharing')) {
            return this.socialDatabase['github'] || this.socialDatabase['stackoverflow'];
        }
        
        return null;
    }
    
    openSocialCategory() {
        console.log('🎯 Opening Social Media & Community category page');
        window.location.href = 'categories/social/';
        
        this.addMessage('🌍 Opening Social Media & Community with 69 platforms! From Facebook and Twitter to Reddit, Discord, and niche communities.', 'ai');
        this.updateStatus('Opening social media category...');
    }
    
    openSocialPlatform(platform) {
        console.log('🚀 Opening social platform:', platform.name);
        window.open(platform.url, '_blank');
        
        this.addMessage(`🌍 Opening ${platform.name}! Perfect for ${platform.category.toLowerCase()}.`, 'ai');
        this.updateStatus(`Opened ${platform.name}!`);
    }
    
        // 🎆 LIFESTYLE & SHOPPING SMART CONTROLLER METHODS
        
        handleLifestyleCommand(command) {
            const lowercaseCommand = command.toLowerCase().trim();
            
            // Check if it's a request for the lifestyle category
            if (this.isLifestyleCategoryRequest(lowercaseCommand)) {
                this.openLifestyleCategory();
                return true;
            }
            
            // Check if it's a specific lifestyle platform request
            const lifestyleMatch = this.findLifestylePlatform(lowercaseCommand);
            if (lifestyleMatch) {
                this.openLifestylePlatform(lifestyleMatch);
                return true;
            }
            
            return false; // Not a lifestyle command
        }
        
        isLifestyleCategoryRequest(command) {
            const categoryPhrases = [
                'lifestyle category',
                'lifestyle & shopping',
                'lifestyle and shopping',
                'lifestyle',
                'shopping category',
                'shopping',
                'show me lifestyle',
                'open lifestyle',
                'go to lifestyle',
                'take me to lifestyle',
                'daily life',
                'e-commerce',
                'online shopping'
            ];
            
            return categoryPhrases.some(phrase => command.includes(phrase));
        }
        
        findLifestylePlatform(command) {
            // Direct match
            if (this.lifestyleDatabase[command]) {
                return this.lifestyleDatabase[command];
            }
            
            // Partial match (for "open amazon", "launch uber", etc.)
            for (const [key, platform] of Object.entries(this.lifestyleDatabase)) {
                if (command.includes(key)) {
                    return platform;
                }
            }
            
            // Special handling for common lifestyle queries
            if (command.includes('food delivery') || command.includes('order food') || command.includes('delivery')) {
                return this.lifestyleDatabase['doordash'] || this.lifestyleDatabase['uber eats'];
            }
            if (command.includes('shopping') || command.includes('buy online') || command.includes('e-commerce')) {
                return this.lifestyleDatabase['amazon'];
            }
            if (command.includes('travel') || command.includes('book hotel') || command.includes('accommodation')) {
                return this.lifestyleDatabase['booking.com'] || this.lifestyleDatabase['airbnb'];
            }
            if (command.includes('ride') || command.includes('taxi') || command.includes('transportation')) {
                return this.lifestyleDatabase['uber'] || this.lifestyleDatabase['lyft'];
            }
            if (command.includes('home service') || command.includes('handyman') || command.includes('home repair')) {
                return this.lifestyleDatabase['taskrabbit'] || this.lifestyleDatabase['thumbtack'];
            }
            if (command.includes('grocery') || command.includes('grocery delivery') || command.includes('instacart')) {
                return this.lifestyleDatabase['instacart'];
            }
            if (command.includes('restaurant') || command.includes('dining') || command.includes('reservation')) {
                return this.lifestyleDatabase['opentable'] || this.lifestyleDatabase['yelp'];
            }
            if (command.includes('freelance') || command.includes('gig work') || command.includes('remote work')) {
                return this.lifestyleDatabase['upwork'] || this.lifestyleDatabase['fiverr'];
            }
            
            return null;
        }
        
        openLifestyleCategory() {
            console.log('🎯 Opening Lifestyle & Shopping category page');
            window.location.href = 'categories/lifestyle/';
            
            this.addMessage('🎆 Opening Lifestyle & Shopping with 48 platforms! From Amazon and eBay to DoorDash, Airbnb, and home services like TaskRabbit.', 'ai');
            this.updateStatus('Opening lifestyle category...');
        }
        
        openLifestylePlatform(platform) {
            console.log('🚀 Opening lifestyle platform:', platform.name);
            window.open(platform.url, '_blank');
            
            this.addMessage(`🎆 Opening ${platform.name}! Perfect for ${platform.category.toLowerCase()}.`, 'ai');
            this.updateStatus(`Opened ${platform.name}!`);
        }
        
        // 🗾 ANIME & MANGA SMART CONTROLLER METHODS
        
        handleAnimeCommand(command) {
            const lowercaseCommand = command.toLowerCase().trim();
            
            // Check if it's a request for the anime category
            if (this.isAnimeCategoryRequest(lowercaseCommand)) {
                this.openAnimeCategory();
                return true;
            }
            
            // Check if it's a specific anime platform request
            const animeMatch = this.findAnimePlatform(lowercaseCommand);
            if (animeMatch) {
                this.openAnimePlatform(animeMatch);
                return true;
            }
            
            return false; // Not an anime command
        }
        
        isAnimeCategoryRequest(command) {
            const categoryPhrases = [
                'anime category',
                'anime & manga',
                'anime and manga',
                'anime',
                'manga category',
                'manga',
                'show me anime',
                'open anime',
                'go to anime',
                'take me to anime',
                'japanese animation',
                'otaku',
                'kawaii',
                'weeb',
                'japanese comics'
            ];
            
            return categoryPhrases.some(phrase => command.includes(phrase));
        }
        
        findAnimePlatform(command) {
            // Direct match
            if (this.animeDatabase[command]) {
                return this.animeDatabase[command];
            }
            
            // Partial match (for "open crunchyroll", "launch myanimelist", etc.)
            for (const [key, platform] of Object.entries(this.animeDatabase)) {
                if (command.includes(key)) {
                    return platform;
                }
            }
            
            // Special handling for common anime queries
            if (command.includes('anime streaming') || command.includes('watch anime') || command.includes('anime shows')) {
                return this.animeDatabase['crunchyroll'];
            }
            if (command.includes('manga reading') || command.includes('read manga') || command.includes('manga online')) {
                return this.animeDatabase['mangadex'] || this.animeDatabase['viz shonen jump'];
            }
            if (command.includes('anime tracking') || command.includes('anime list') || command.includes('anime database')) {
                return this.animeDatabase['myanimelist'] || this.animeDatabase['anilist'];
            }
            if (command.includes('anime news') || command.includes('anime updates') || command.includes('anime industry')) {
                return this.animeDatabase['anime news network'];
            }
            if (command.includes('anime community') || command.includes('anime discussion') || command.includes('anime forum')) {
                return this.animeDatabase['r/anime'] || this.animeDatabase['animeforum'];
            }
            if (command.includes('light novel') || command.includes('ln') || command.includes('web novel')) {
                return this.animeDatabase['j-novel club'] || this.animeDatabase['yen press'];
            }
            if (command.includes('anime youtube') || command.includes('anime reviewer') || command.includes('anime analysis')) {
                return this.animeDatabase['gigguk'] || this.animeDatabase['the anime man'];
            }
            if (command.includes('free manga') || command.includes('official manga') || command.includes('legal manga')) {
                return this.animeDatabase['manga plus'] || this.animeDatabase['webtoon'];
            }
            
            return null;
        }
        
        openAnimeCategory() {
            console.log('🎯 Opening Anime & Manga category page');
            window.location.href = 'categories/anime/';
            
            this.addMessage('🗾 Opening Anime & Manga with 48 amazing platforms! From Crunchyroll and Funimation to MyAnimeList, MangaDex, and otaku communities. Kawaii mode activated! 🌸', 'ai');
            this.updateStatus('Opening anime category...');
        }
        
        openAnimePlatform(platform) {
            console.log('🚀 Opening anime platform:', platform.name);
            window.open(platform.url, '_blank');
            
            this.addMessage(`🗾 Opening ${platform.name}! Perfect for ${platform.category.toLowerCase()} activities. Enjoy your otaku journey! ✨`, 'ai');
            this.updateStatus(`Opened ${platform.name}!`);
        }
        
        // 🎨 DESIGN & CREATIVE TOOLS SMART CONTROLLER METHODS
    
    handleDesignCommand(command) {
        const lowercaseCommand = command.toLowerCase().trim();
        
        // Check if it's a request for the design category
        if (this.isDesignCategoryRequest(lowercaseCommand)) {
            this.openDesignCategory();
            return true;
        }
        
        // Check if it's a specific design tool request
        const designMatch = this.findDesignTool(lowercaseCommand);
        if (designMatch) {
            this.openDesignTool(designMatch);
            return true;
        }
        
        return false; // Not a design command
    }
    
    isDesignCategoryRequest(command) {
        const categoryPhrases = [
            'design category',
            'design & creative',
            'design and creative',
            'creative tools',
            'design tools',
            'show me design',
            'open design',
            'go to design',
            'take me to design',
            'creative category',
            'design platforms',
            'creative platforms'
        ];
        
        return categoryPhrases.some(phrase => command.includes(phrase));
    }
    
    findDesignTool(command) {
        // Direct match
        if (this.designDatabase[command]) {
            return this.designDatabase[command];
        }
        
        // Partial match (for "open figma", "launch canva", "stock photos", etc.)
        for (const [key, tool] of Object.entries(this.designDatabase)) {
            if (command.includes(key)) {
                return tool;
            }
        }
        
        // Special handling for common design-related queries
        if (command.includes('stock photo') || command.includes('stock image')) {
            return this.designDatabase['unsplash'];
        }
        if (command.includes('design inspiration') || command.includes('inspiration')) {
            return this.designDatabase['dribbble'];
        }
        if (command.includes('prototype') || command.includes('wireframe')) {
            return this.designDatabase['figma'];
        }
        if (command.includes('color palette') || command.includes('colors')) {
            return this.designDatabase['coolors'] || this.designDatabase['adobe stock'];
        }
        
        return null;
    }
    
    openDesignCategory() {
        console.log('🎯 Opening Design & Creative Tools category page');
        window.location.href = 'categories/design/';
        
        this.addMessage('🎨 Opening Design & Creative Tools with 40 amazing resources! From Figma and Adobe Creative Cloud to Dribbble, Unsplash, and collaborative design platforms.', 'ai');
        this.updateStatus('Opening design category...');
    }
    
    openDesignTool(tool) {
        console.log('🚀 Opening design tool:', tool.name);
        window.open(tool.url, '_blank');
        
        this.addMessage(`🎨 Opening ${tool.name}! Perfect for ${tool.category.toLowerCase()} work.`, 'ai');
        this.updateStatus(`Opened ${tool.name}!`);
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
