/**
 * Search Engines Conversational Knowledge Base
 * Gateway AI 2.0 - Conversational System
 * 50+ conversation patterns for search engines category
 */

const searchEnginesConversations = {
    // GENERAL OVERVIEW PATTERNS (10 patterns)
    generalOverview: {
        patterns: [
            'tell me about search engines',
            'what search engines do you know',
            'show me all search engines',
            'list search engines',
            'how many search engines are there',
            'search engine options',
            'what search platforms exist',
            'search engines overview',
            'all search engines',
            'search engine list'
        ],
        intent: 'general_overview',
        responses: [
            {
                id: 'search_overview_1',
                text: `🔍 **Search Engines - I know 39 amazing ones!** From the obvious Google to hidden gems like Wiby and Marginalia, I've organized them into 9 specialized categories! We've got mainstream options, privacy-focused engines, academic research tools, and some seriously cool alternatives you've probably never heard of.

**Categories I Cover:**
• **🌟 Popular & Mainstream** - Google, Bing, Yahoo (4 engines)
• **🔒 Privacy & Security** - DuckDuckGo, Brave, Startpage (6 engines)  
• **📚 Academic & Research** - Google Scholar, PubMed, arXiv (5 engines)
• **🌍 International & Regional** - Yandex, Baidu, Naver (5 engines)
• **💻 Developer & Technical** - GitHub, Stack Overflow (5 engines)
• **🎨 Creative & Visual** - Unsplash, Dribbble, Pixabay (5 engines)
• **🛒 Shopping & Commerce** - Amazon, eBay, Etsy (4 engines)
• **💬 Social & Community** - Twitter, Reddit, LinkedIn (4 engines)
• **💎 Indie & Alternative** - Wiby, Marginalia, Searx (5 engines)

**Follow-up Questions:**
• "Show me privacy-focused search engines"
• "What's the best for academic research?"
• "Tell me about alternative search engines"

**Commands:** /explore-search to browse all categories`,
                followUps: [
                    'Show me privacy-focused search engines',
                    'What\'s the best for academic research?',
                    'Tell me about alternative search engines'
                ],
                relatedCommands: ['explore-search', 'trending-resources'],
                feedback: 0,
                timesShown: 0
            }
        ]
    },

    // PRIVACY FOCUS PATTERNS (12 patterns)
    privacyFocus: {
        patterns: [
            'private search engines',
            'privacy search',
            'no tracking search',
            'anonymous search',
            'search without tracking',
            'google alternatives privacy',
            'secure search engines',
            'don\'t track me search',
            'privacy focused search',
            'search engines that don\'t collect data',
            'best private search',
            'confidential search'
        ],
        intent: 'privacy_search',
        responses: [
            {
                id: 'privacy_search_1',
                text: `🔒 **Privacy Search Engines - Excellent choice!** I know 6 fantastic privacy-focused options that won't track you or collect your data. DuckDuckGo leads the pack with millions of users, but there are some amazing alternatives depending on your specific needs.

**Your Privacy Options:**
• **🦆 DuckDuckGo** - Most popular, instant answers, bang shortcuts (!g, !w)
• **🦁 Brave Search** - Independent index, part of Brave ecosystem  
• **🚀 Startpage** - Google results without tracking, EU-based
• **🐄 Swisscows** - Family-safe search, Swiss privacy laws
• **💎 Kagi** - Premium ad-free search, highly personalized
• **🔍 MetaGer** - German non-profit, open-source meta-search

**Why Choose Privacy Search:**
No tracking cookies • No search history • No personal data collection • Anonymous browsing • Clean, ad-free results

**Follow-up Questions:**
• "Compare DuckDuckGo vs Brave Search"
• "What makes Startpage special?"
• "Show me the most secure option"

**Commands:** /explore-search to see all privacy engines`,
                followUps: [
                    'Compare DuckDuckGo vs Brave Search',
                    'What makes Startpage special?',
                    'Show me the most secure option'
                ],
                relatedCommands: ['explore-search', 'my-favorites'],
                feedback: 0,
                timesShown: 0
            }
        ]
    },

    // ACADEMIC RESEARCH PATTERNS (10 patterns)  
    academicResearch: {
        patterns: [
            'academic search engines',
            'research paper search',
            'scholarly search',
            'scientific paper search',
            'citation search',
            'search for research papers',
            'academic research tools',
            'peer reviewed articles search',
            'scholar search engines',
            'find scientific papers'
        ],
        intent: 'academic_research',
        responses: [
            {
                id: 'academic_search_1',
                text: `📚 **Academic Search Engines - Perfect for research!** I've got 5 specialized academic search engines that'll help you find scholarly papers, citations, and peer-reviewed research across all disciplines. These are way more powerful than regular search for academic work.

**Academic Search Options:**
• **🎓 Google Scholar** - Largest database, citation tracking, free access
• **🏢 Microsoft Academic** - Research graph, author networks, metrics
• **🧠 Semantic Scholar** - AI-powered insights, paper summaries, trending research  
• **📄 arXiv** - Physics, math, CS preprints, cutting-edge research
• **⚕️ PubMed** - Medical & life sciences, 30M+ citations, NIH database

**Academic Search Features:**
Citation tracking • Author profiles • Research metrics • Full-text PDFs • Related papers • Impact factors

**Pro Tips:**
Use quotation marks for exact phrases • Filter by publication date • Check citation counts • Look for open access papers

**Follow-up Questions:**
• "Compare Google Scholar vs Semantic Scholar"
• "Best for medical research papers?"
• "How to find open access papers?"

**Commands:** /explore-search to explore academic tools`,
                followUps: [
                    'Compare Google Scholar vs Semantic Scholar',
                    'Best for medical research papers?',
                    'How to find open access papers?'
                ],
                relatedCommands: ['explore-search', 'explore-knowledge'],
                feedback: 0,
                timesShown: 0
            }
        ]
    },

    // TECHNICAL/DEVELOPER PATTERNS (8 patterns)
    developerTech: {
        patterns: [
            'code search engines',
            'programming search',
            'developer search tools',
            'search for code',
            'find programming solutions',
            'technical documentation search',
            'coding help search',
            'search programming forums'
        ],
        intent: 'developer_search',
        responses: [
            {
                id: 'developer_search_1',
                text: `💻 **Developer Search Engines - Code ninja tools!** I've got 5 specialized search engines that are absolute lifesavers for programmers. From finding code snippets to getting help with bugs, these will supercharge your development workflow.

**Developer Search Arsenal:**
• **🐙 GitHub Search** - 100M+ repositories, code search, advanced filters
• **📚 Stack Overflow** - Programming Q&A, 21M+ questions, expert answers
• **🎨 CodePen** - Frontend demos, CSS tricks, JavaScript snippets
• **🔍 Searchcode** - Search across 7M+ repositories, syntax highlighting  
• **🦊 GitLab Search** - DevOps projects, CI/CD pipelines, issue tracking

**What You Can Find:**
Code examples • Bug solutions • API documentation • Library usage • Best practices • Open source projects

**Search Tips:**
Use specific language keywords • Include error messages • Filter by stars/forks • Check recent activity

**Follow-up Questions:**
• "Best for finding JavaScript examples?"
• "How to search Stack Overflow effectively?"  
• "Show me open source project search"

**Commands:** /explore-search to see all developer tools`,
                followUps: [
                    'Best for finding JavaScript examples?',
                    'How to search Stack Overflow effectively?',
                    'Show me open source project search'
                ],
                relatedCommands: ['explore-search', 'explore-tools'],
                feedback: 0,
                timesShown: 0
            }
        ]
    },

    // VISUAL/CREATIVE PATTERNS (6 patterns)
    visualCreative: {
        patterns: [
            'image search engines',
            'visual search',
            'design inspiration search',
            'free photo search',
            'creative content search',
            'find images and graphics'
        ],
        intent: 'visual_search',
        responses: [
            {
                id: 'visual_search_1',
                text: `🎨 **Visual Search Engines - Creative goldmine!** I've curated 5 amazing visual search platforms perfect for finding images, design inspiration, and creative content. Whether you need free photos or design ideas, I've got you covered.

**Visual Search Collection:**
• **📸 Unsplash** - High-quality free photos, 3M+ images, commercial use OK
• **🎭 Pixabay** - Free images, vectors, illustrations, no attribution required
• **🎯 Dribbble** - Design inspiration, UI/UX showcases, creative trends
• **💼 Behance** - Creative portfolios, professional work, Adobe integration
• **📷 Flickr** - Photo community, Creative Commons, billions of images

**What You'll Find:**
Free stock photos • Design inspiration • UI/UX examples • Vector graphics • Creative portfolios • Trending designs

**License Types:**
Free for commercial use • Creative Commons • Attribution required • Premium options available

**Follow-up Questions:**
• "Best for completely free photos?"
• "Where to find UI design inspiration?"
• "Compare Unsplash vs Pixabay"

**Commands:** /explore-search to browse visual tools`,
                followUps: [
                    'Best for completely free photos?',
                    'Where to find UI design inspiration?',
                    'Compare Unsplash vs Pixabay'
                ],
                relatedCommands: ['explore-search', 'explore-design'],
                feedback: 0,
                timesShown: 0
            }
        ]
    },

    // INTERNATIONAL/REGIONAL PATTERNS (4 patterns)
    international: {
        patterns: [
            'international search engines',
            'search engines by country',
            'regional search engines',
            'non-us search engines'
        ],
        intent: 'international_search',
        responses: [
            {
                id: 'international_search_1',
                text: `🌍 **International Search Engines - Global reach!** I know 5 major regional search engines that dominate specific countries and regions. These are essential if you're researching international markets or need local search results.

**Global Search Engines:**
• **🇷🇺 Yandex** - Russia's #1 search engine, 65% market share, Cyrillic support
• **🇨🇳 Baidu** - China's dominant search, 70% market share, Chinese content focus
• **🇰🇷 Naver** - South Korea's leading portal, news, shopping, local services
• **🇫🇷 Qwant** - French search engine, privacy-focused, European values
• **🌱 Ecosia** - German search that plants trees, 150M+ trees planted, eco-friendly

**Why Use Regional Search:**
Local content priority • Language optimization • Cultural relevance • Regional regulations • Local business focus

**Geographic Strengths:**
Yandex - Best for Russian content • Baidu - Essential for China research • Naver - Korean language specialist

**Follow-up Questions:**
• "Which search engine works in China?"
• "Best for Russian language search?"
• "Tell me about Ecosia tree planting"

**Commands:** /explore-search to see all international options`,
                followUps: [
                    'Which search engine works in China?',
                    'Best for Russian language search?',
                    'Tell me about Ecosia tree planting'
                ],
                relatedCommands: ['explore-search', 'trending-resources'],
                feedback: 0,
                timesShown: 0
            }
        ]
    },

    // ALTERNATIVE/INDIE PATTERNS (5 patterns)
    alternativeIndie: {
        patterns: [
            'alternative search engines',
            'indie search engines',
            'unique search engines',
            'different search options',
            'weird search engines'
        ],
        intent: 'alternative_search',
        responses: [
            {
                id: 'alternative_search_1',
                text: `💎 **Alternative Search Engines - Hidden gems!** I've discovered 5 truly unique search engines that offer completely different approaches to finding information online. These indie and alternative options are perfect for discovering the web's hidden treasures.

**Alternative Search Collection:**
• **🕰️ Wiby** - Retro web search, finds old-school non-commercial sites, nostalgic browsing
• **📝 Marginalia** - Text-heavy sites focus, academic content, independent blogs
• **⚡ Gigablast** - Open-source search engine, transparent algorithms, customizable
• **🔓 Mojeek** - Independent crawler, no tracking, own search index
• **🔧 Searx** - Open-source metasearch, self-hostable, privacy-focused

**What Makes Them Special:**
No commercial bias • Unique algorithms • Open source transparency • Independent crawling • Niche content focus

**Perfect For:**
Academic research • Discovering hidden websites • Privacy enthusiasts • Developers • Retro web exploration

**Follow-up Questions:**
• "Tell me more about Wiby retro search"
• "What's special about Marginalia?"
• "How does open-source search work?"

**Commands:** /explore-search to explore all alternatives`,
                followUps: [
                    'Tell me more about Wiby retro search',
                    'What\'s special about Marginalia?',
                    'How does open-source search work?'
                ],
                relatedCommands: ['explore-search', 'trending-resources'],
                feedback: 0,
                timesShown: 0
            }
        ]
    }
};

// Export for use in main AI system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = searchEnginesConversations;
} else {
    window.searchEnginesConversations = searchEnginesConversations;
}
