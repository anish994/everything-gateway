/**
 * Conversation Engine for Gateway AI 2.0
 * Pattern matching, response generation, and conversation management
 */

class ConversationEngine {
    constructor() {
        this.conversations = {};
        this.userPreferences = {
            useEmojis: true,
            conversationHistory: [],
            lastEmojiPreference: null
        };
        this.comparisonEngine = new ComparisonEngine();
        this.loadConversations();
    }

    loadConversations() {
        // Load search engines conversations
        if (typeof searchEnginesConversations !== 'undefined') {
            this.conversations.searchEngines = searchEnginesConversations;
        }
    }

    // MAIN CONVERSATION PROCESSING
    processConversation(message, context = {}) {
        const msgLower = message.toLowerCase().trim();

        // Check for emoji preference changes
        this.checkEmojiPreference(msgLower);

        // Check for comparison requests first (X vs Y, compare X and Y)
        const comparisonResult = this.checkForComparison(msgLower);
        if (comparisonResult) {
            return this.formatResponse(comparisonResult);
        }

        // Find best matching conversation pattern
        const match = this.findBestMatch(msgLower);
        if (match) {
            return this.generateResponse(match, context);
        }

        // No match found - generate helpful fallback
        return this.generateFallback(msgLower);
    }

    // PATTERN MATCHING SYSTEM
    findBestMatch(message) {
        let bestMatch = null;
        let bestScore = 0;

        // Search through all conversation categories
        for (const [categoryName, category] of Object.entries(this.conversations)) {
            for (const [sectionName, section] of Object.entries(category)) {
                for (const pattern of section.patterns) {
                    const score = this.calculateMatchScore(message, pattern);
                    if (score > bestScore && score > 0.6) { // 60% minimum match
                        bestMatch = {
                            category: categoryName,
                            section: sectionName,
                            pattern: pattern,
                            intent: section.intent,
                            responses: section.responses,
                            score: score
                        };
                        bestScore = score;
                    }
                }
            }
        }

        return bestMatch;
    }

    // PATTERN MATCHING ALGORITHMS
    calculateMatchScore(message, pattern) {
        // Multiple matching strategies for robustness

        // 1. Exact substring match (highest score)
        if (message.includes(pattern)) {
            return 1.0;
        }

        // 2. Word-based matching
        const messageWords = message.split(/\s+/);
        const patternWords = pattern.split(/\s+/);
        const commonWords = this.findCommonWords(messageWords, patternWords);
        
        if (commonWords.length > 0) {
            const wordScore = commonWords.length / Math.max(messageWords.length, patternWords.length);
            if (wordScore > 0.5) return wordScore;
        }

        // 3. Fuzzy matching for typos and variations
        const fuzzyScore = this.fuzzyMatch(message, pattern);
        if (fuzzyScore > 0.7) return fuzzyScore * 0.8; // Slight penalty for fuzzy

        // 4. Semantic matching (simplified)
        const semanticScore = this.semanticMatch(message, pattern);
        if (semanticScore > 0.6) return semanticScore * 0.7;

        return 0;
    }

    findCommonWords(words1, words2) {
        const set1 = new Set(words1.map(w => w.toLowerCase()));
        const set2 = new Set(words2.map(w => w.toLowerCase()));
        return [...set1].filter(word => set2.has(word) && word.length > 2);
    }

    fuzzyMatch(str1, str2) {
        // Simple fuzzy matching using edit distance
        const distance = this.levenshteinDistance(str1, str2);
        const maxLength = Math.max(str1.length, str2.length);
        return 1 - (distance / maxLength);
    }

    levenshteinDistance(str1, str2) {
        const matrix = [];
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[str2.length][str1.length];
    }

    semanticMatch(message, pattern) {
        // Simple semantic matching using synonyms and related terms
        const synonyms = {
            'search': ['find', 'look', 'discover', 'explore'],
            'engines': ['tools', 'platforms', 'sites', 'services'],
            'privacy': ['private', 'secure', 'anonymous', 'confidential'],
            'academic': ['scholarly', 'research', 'scientific', 'educational'],
            'code': ['programming', 'development', 'coding', 'software']
        };

        let semanticScore = 0;
        const messageWords = message.split(/\s+/);
        const patternWords = pattern.split(/\s+/);

        for (const word of patternWords) {
            if (messageWords.includes(word)) {
                semanticScore += 1;
                continue;
            }

            // Check synonyms
            for (const [key, syns] of Object.entries(synonyms)) {
                if ((word === key || syns.includes(word)) && 
                    (messageWords.includes(key) || messageWords.some(w => syns.includes(w)))) {
                    semanticScore += 0.8;
                    break;
                }
            }
        }

        return semanticScore / patternWords.length;
    }

    // COMPARISON DETECTION AND PROCESSING
    checkForComparison(message) {
        // Patterns for comparison: "X vs Y", "compare X and Y", "X versus Y", etc.
        const comparisonPatterns = [
            /compare\s+(.+?)\s+(?:and|with|vs|versus)\s+(.+)/i,
            /(.+?)\s+vs\s+(.+)/i,
            /(.+?)\s+versus\s+(.+)/i,
            /(?:difference between|diff between)\s+(.+?)\s+and\s+(.+)/i
        ];

        for (const pattern of comparisonPatterns) {
            const match = message.match(pattern);
            if (match && match[1] && match[2]) {
                return this.processComparison(match[1].trim(), match[2].trim());
            }
        }

        return null;
    }

    processComparison(item1, item2) {
        // Use comparison engine to generate detailed comparison
        return this.comparisonEngine.compareSearchEngines(item1, item2);
    }

    // EMOJI PREFERENCE MANAGEMENT
    checkEmojiPreference(message) {
        if (message.includes('no emojis') || message.includes('without emojis') || 
            message.includes('disable emojis')) {
            this.userPreferences.useEmojis = false;
            this.userPreferences.lastEmojiPreference = Date.now();
            return true;
        }

        if (message.includes('use emojis') || message.includes('with emojis') || 
            message.includes('enable emojis')) {
            this.userPreferences.useEmojis = true;
            this.userPreferences.lastEmojiPreference = Date.now();
            return true;
        }

        return false;
    }

    // RESPONSE GENERATION
    generateResponse(match, context) {
        const response = this.selectBestResponse(match.responses);
        const formattedResponse = this.formatResponse(response);
        
        // Track usage
        response.timesShown++;
        response.lastUsed = Date.now();

        return formattedResponse;
    }

    selectBestResponse(responses) {
        // Select response with best feedback score, or random if all equal
        if (responses.length === 1) return responses[0];
        
        const sorted = responses.sort((a, b) => {
            // Prefer responses with better feedback
            if (b.feedback !== a.feedback) return b.feedback - a.feedback;
            // Then prefer less-used responses
            return a.timesShown - b.timesShown;
        });

        return sorted[0];
    }

    formatResponse(response) {
        if (!response || !response.text) return null;

        let text = response.text;

        // Remove emojis if user preference
        if (!this.userPreferences.useEmojis) {
            text = text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/gu, '');
            text = text.replace(/\*\*([^*]+)\*\*/g, '$1'); // Also remove bold formatting for cleaner text
        }

        return {
            text: text,
            followUps: response.followUps || [],
            relatedCommands: response.relatedCommands || [],
            responseId: response.id,
            canRate: true
        };
    }

    // FALLBACK SYSTEM
    generateFallback(message) {
        const emojiPrefix = this.userPreferences.useEmojis ? '🤔 ' : '';
        
        let fallbackText = `${emojiPrefix}**I didn't quite catch that!** But I'm really knowledgeable about search engines and can help with lots of questions.

**I'm great at discussing:**
${this.userPreferences.useEmojis ? '🔍' : '•'} **Search Engine Overviews:** "Tell me about search engines"
${this.userPreferences.useEmojis ? '🔒' : '•'} **Privacy Search:** "Show me private search engines"  
${this.userPreferences.useEmojis ? '📚' : '•'} **Academic Research:** "Best for research papers"
${this.userPreferences.useEmojis ? '💻' : '•'} **Developer Tools:** "Code search engines"
${this.userPreferences.useEmojis ? '🎨' : '•'} **Visual Search:** "Find free images"
${this.userPreferences.useEmojis ? '⚖️' : '•'} **Comparisons:** "Compare DuckDuckGo vs Google"

What sounds interesting? ${this.userPreferences.useEmojis ? '✨' : ''}`;

        return {
            text: fallbackText,
            followUps: [
                'Tell me about search engines',
                'Show me privacy search options',
                'Compare two search engines'
            ],
            relatedCommands: ['explore-search', 'trending-resources'],
            responseId: 'fallback_search_engines',
            canRate: false
        };
    }

    // FEEDBACK SYSTEM
    recordFeedback(responseId, isPositive) {
        // Find and update the response feedback score
        for (const category of Object.values(this.conversations)) {
            for (const section of Object.values(category)) {
                for (const response of section.responses) {
                    if (response.id === responseId) {
                        response.feedback += isPositive ? 1 : -1;
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

// COMPARISON ENGINE
class ComparisonEngine {
    constructor() {
        this.searchEngineData = this.loadSearchEngineData();
    }

    loadSearchEngineData() {
        // This would integrate with your actual search engines data
        return {
            'duckduckgo': {
                name: 'DuckDuckGo',
                category: 'Privacy',
                pros: ['No tracking', 'Instant answers', 'Bang shortcuts', 'Clean interface'],
                cons: ['Uses other engines\' results', 'Smaller index'],
                bestFor: 'Privacy newcomers, familiar Google-like experience',
                userBase: 'Millions of users',
                features: ['Bang shortcuts (!g, !w)', 'Instant answers', 'No ads'],
                privacy: 'Excellent - no tracking'
            },
            'brave search': {
                name: 'Brave Search',
                category: 'Privacy',
                pros: ['Independent index', 'No ads', 'Part of Brave ecosystem', 'Truly independent'],
                cons: ['Newer platform', 'Smaller index than Google', 'Less instant answers'],
                bestFor: 'Users wanting complete independence from Big Tech',
                userBase: 'Growing rapidly',
                features: ['Independent crawler', 'Ad-free', 'Anonymous usage metrics'],
                privacy: 'Excellent - independent and private'
            }
            // More engines would be loaded from your actual data
        };
    }

    compareSearchEngines(engine1Name, engine2Name) {
        const e1 = this.findEngine(engine1Name);
        const e2 = this.findEngine(engine2Name);

        if (!e1 || !e2) {
            return this.generateNoComparisonFound(engine1Name, engine2Name);
        }

        return this.generateComparison(e1, e2);
    }

    findEngine(name) {
        const normalized = name.toLowerCase().trim();
        return this.searchEngineData[normalized] || 
               Object.values(this.searchEngineData).find(engine => 
                   engine.name.toLowerCase().includes(normalized) ||
                   normalized.includes(engine.name.toLowerCase())
               );
    }

    generateComparison(engine1, engine2) {
        return {
            text: `⚖️ **${engine1.name} vs ${engine2.name} - Detailed Comparison:**

**${engine1.name}:**
${engine1.pros.map(pro => '• ✅ ' + pro).join('\n')}
${engine1.cons.map(con => '• ❌ ' + con).join('\n')}
• **Best for:** ${engine1.bestFor}

**${engine2.name}:**
${engine2.pros.map(pro => '• ✅ ' + pro).join('\n')}
${engine2.cons.map(con => '• ❌ ' + con).join('\n')}
• **Best for:** ${engine2.bestFor}

**My Recommendation:** Try ${engine1.name} if you want ${engine1.bestFor.toLowerCase()}, or ${engine2.name} if you prefer ${engine2.bestFor.toLowerCase()}!`,
            followUps: [
                `Tell me more about ${engine1.name}`,
                `What makes ${engine2.name} special?`,
                'Show me more privacy alternatives'
            ],
            relatedCommands: ['explore-search', 'my-favorites'],
            responseId: `comparison_${engine1.name.toLowerCase()}_${engine2.name.toLowerCase()}`,
            canRate: true
        };
    }

    generateNoComparisonFound(name1, name2) {
        return {
            text: `🤔 **I'd love to compare "${name1}" and "${name2}"** but I need more specific search engine names! 

**Search Engines I Can Compare:**
• **Privacy:** DuckDuckGo, Brave Search, Startpage, Swisscows
• **Academic:** Google Scholar, Semantic Scholar, Microsoft Academic
• **Developer:** GitHub, Stack Overflow, CodePen
• **Visual:** Unsplash, Pixabay, Dribbble
• **Mainstream:** Google, Bing, Yahoo

**Try asking:** "Compare DuckDuckGo vs Brave Search" or "Google Scholar vs Semantic Scholar"`,
            followUps: [
                'Compare DuckDuckGo vs Brave Search',
                'Show me privacy search options',
                'Tell me about academic search engines'
            ],
            relatedCommands: ['explore-search'],
            responseId: 'comparison_not_found',
            canRate: false
        };
    }
}

// Export for use in main AI system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ConversationEngine, ComparisonEngine };
} else {
    window.ConversationEngine = ConversationEngine;
    window.ComparisonEngine = ComparisonEngine;
}
