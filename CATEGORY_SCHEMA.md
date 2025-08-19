# 📋 The Everything Gateway - Category JSON Schema v2.0

## **CANONICAL STRUCTURE**

Every category JSON file must follow this exact structure:

```json
{
    "category": "Category Name",
    "description": "Brief category overview (max 150 characters)",
    "sections": [
        {
            "title": "Section Title",
            "description": "Section description (max 100 characters)",
            "platforms": [
                {
                    "name": "Platform Name",
                    "url": "https://example.com",
                    "description": "Platform description (max 120 characters)",
                    "icon": "🎯"
                }
            ]
        }
    ],
    "metadata": {
        "totalPlatforms": 42,
        "totalSections": 4,
        "lastUpdated": "2025-08-12",
        "version": "2.0"
    }
}
```

---

## **FIELD REQUIREMENTS**

### **Root Level:**
- `category` (string): Exact category name matching homepage
- `description` (string): SEO-optimized description, 100-150 chars
- `sections` (array): 3-6 thematic sections
- `metadata` (object): File statistics and versioning

### **Section Level:**
- `title` (string): Clear section name with emoji prefix
- `description` (string): Section purpose, 60-100 chars
- `platforms` (array): 8-15 platforms per section

### **Platform Level:**
- `name` (string): Official platform name (no "The")
- `url` (string): Clean HTTPS URL (no UTM params)
- `description` (string): Value proposition, 80-120 chars
- `icon` (string): Single relevant emoji

### **Metadata Level:**
- `totalPlatforms` (number): Exact count of all platforms
- `totalSections` (number): Number of sections
- `lastUpdated` (string): ISO date format (YYYY-MM-DD)
- `version` (string): Schema version

---

## **CONTENT GUIDELINES**

### **✅ GOOD DESCRIPTIONS:**
- "World's largest video streaming platform with original content"
- "Professional design tool with real-time collaboration"
- "Cryptocurrency exchange with advanced trading features"

### **❌ BAD DESCRIPTIONS:**
- "Great platform for streaming" (too vague)
- "The best cryptocurrency exchange in the world!" (hyperbolic)
- "A platform where you can watch videos and stuff" (unprofessional)

### **✅ GOOD ICONS:**
- Use single, relevant emojis
- Match the platform's primary function
- Avoid generic icons (❓ 🔗 ➡️)

### **❌ BAD ICONS:**
- Multiple emojis (🎯🎮🎨)
- Country flags (unless geo-specific service)
- Generic symbols (▶️ 📱 💻)

---

## **PLATFORM INCLUSION CRITERIA**

### **✅ INCLUDE IF:**
- Active and maintained platform
- Significant user base (10K+ users)
- Legitimate business model
- English-accessible interface
- Stable URL and branding

### **❌ EXCLUDE IF:**
- Dead/abandoned platforms
- Obvious scams or suspicious sites
- Adult/NSFW content
- Duplicate of existing entry
- Regional-only (unless major)

---

## **QUALITY STANDARDS**

### **Platform Count Targets:**
- Minimum: 35 platforms per category
- Optimal: 40-50 platforms per category
- Maximum: 60 platforms per category

### **Section Balance:**
- 3-6 sections per category
- 8-15 platforms per section
- Logical thematic grouping
- Progressive complexity (basic → advanced)

### **Description Quality:**
- No spelling/grammar errors
- Professional tone
- Clear value proposition
- Keyword-optimized for search
- Consistent style across category

---

## **VALIDATION CHECKLIST**

Before finalizing any category JSON:

- [ ] All URLs return 200 status
- [ ] Platform count matches metadata
- [ ] No duplicate entries
- [ ] All descriptions under character limits
- [ ] Icons are single emojis
- [ ] Sections are balanced (8-15 platforms)
- [ ] Grammar and spelling checked
- [ ] Consistent formatting
- [ ] Updated timestamp
- [ ] Version number correct

---

**STATUS:** ✅ PRODUCTION READY SCHEMA  
**VERSION:** 2.0  
**LAST UPDATED:** 2025-08-12
