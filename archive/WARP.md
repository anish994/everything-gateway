# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**The Everything Gateway** is a professionally designed static web application that organizes internet resources into categories, providing instant access to 142+ curated platforms including search engines, tools, and entertainment resources.

### Key Statistics
- **Current Version**: v2.0 - Production Ready
- **Total Resources**: 142+ curated platforms (39 + 52 + 51)
- **Active Categories**: 3/6 (Search Engines, Tools, Entertainment)
- **Performance**: Sub-100ms load times, Lighthouse 95+ score
- **Architecture**: JSON-driven static site with vanilla JavaScript

### Live Deployments
- **Primary**: https://cheery-flan-dc1088.netlify.app (Production)
- **GitHub**: https://github.com/anishacharya/everything-gateway
- **GitHub Pages**: https://anish994.github.io/everything-gateway
- **Backup**: https://everything-gateway.vercel.app (available)

## Architecture Overview

### Technology Stack
- **Frontend**: HTML5, CSS3 with design tokens, Vanilla JavaScript
- **Data Layer**: JSON-driven content management system
- **Deployment**: Static site hosting (Netlify, Vercel, GitHub Pages)
- **Build System**: Node.js with http-server for local development

### Core Design Principles
- **Performance First**: <100KB bundle size, <100ms load times
- **Accessibility**: WCAG AA compliant with screen reader support
- **Mobile Responsive**: CSS Grid with breakpoint system
- **Privacy Focused**: Optional analytics with user consent
- **Scalable**: JSON-driven architecture for easy content updates

## Development Commands

### Environment Setup
```bash
# Clone and setup
git clone https://github.com/anishacharya/everything-gateway.git
cd everything-gateway

# Install dependencies (optional, for local server)
npm install
```

### Development Workflow
```bash
# Local development server
npm run serve
# Opens at http://localhost:8080

# Alternative: Direct file access
# Just open index.html in browser (fully static)

# Build validation (no actual build step needed)
npm run build
```

### Deployment Commands
```bash
# Netlify deployment
npm run deploy:netlify

# Vercel deployment  
npm run deploy:vercel

# Manual deployment
# Upload entire directory to static host
```

## File Structure & Key Components

```
everything-gateway/
├── index.html                 # Main gateway homepage
├── package.json              # Project metadata & scripts
├── netlify.toml              # Netlify deployment config
├── vercel.json               # Vercel deployment config
├── categories/               # Category pages
│   ├── search-engines/       # 39 search engines across 9 categories
│   │   └── index.html        
│   ├── tools/                # 52 tools across 6 categories
│   │   └── index.html
│   ├── entertainment/        # 51 platforms across 6 categories
│   │   └── index.html
│   └── knowledge/            # Planned category
│       └── index.html
├── data/                     # JSON content management
│   ├── categories.json       # Master category definitions
│   ├── search-engines.json  # Search engine data
│   ├── tools.json           # Tools & utilities data
│   ├── entertainment.json   # Entertainment platforms data
│   └── knowledge.json       # Knowledge resources data
├── css/                      # Modular styling system
│   ├── design-system.css    # CSS custom properties & tokens
│   ├── components.css       # Reusable UI components
│   ├── search.css          # Search overlay styles
│   └── shared.css          # Legacy shared styles
├── js/                       # JavaScript modules
│   ├── gateway.js           # Core functionality
│   ├── gateway-enhanced.js  # Enhanced with performance optimizations
│   └── analytics.js         # Privacy-friendly analytics
└── .github/
    └── workflows/
        └── deploy.yml       # GitHub Actions deployment
```

## Data Management System

### JSON Structure Pattern

#### Categories Schema (`data/categories.json`)
```json
{
  "categories": [
    {
      "id": "search-engines",
      "name": "Search Engines", 
      "emoji": "🔍",
      "description": "Your gateway to the entire search universe",
      "color": "purple",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "status": "active",        // "active" | "planned" | "coming-soon"
      "path": "/categories/search-engines/",
      "count": 39,
      "tags": ["search", "discovery", "privacy"],
      "featured": true
    }
  ]
}
```

#### Resource Data Schema (`data/{category}.json`)
```json
{
  "metadata": {
    "category": "search-engines",
    "totalResources": 39,
    "lastUpdated": "2025-08-09"
  },
  "categories": {
    "mainstream": {
      "title": "Mainstream Search",
      "engines": [
        {
          "name": "Google",
          "url": "https://www.google.com",
          "description": "The world's most popular search engine"
        }
      ]
    }
  }
}
```

### Adding New Resources

1. **Edit appropriate JSON file** in `data/` directory
2. **Update resource count** in `data/categories.json`
3. **Test locally** with `npm run serve`
4. **Deploy** - changes auto-deploy on git push

### Creating New Categories

**Process Checklist:**
- [ ] Create `data/{category-name}.json` with resource data
- [ ] Add category definition to `data/categories.json`
- [ ] Create `categories/{category-name}/index.html` page
- [ ] Update main `index.html` to show new category
- [ ] Test responsive design across breakpoints
- [ ] Update README.md statistics

## JavaScript Architecture

### Core Classes

#### EverythingGateway (`js/gateway.js`)
- Basic search and navigation functionality
- Resource loading from JSON files
- Keyboard shortcuts (Ctrl+K for search)
- Favorites management with localStorage

#### EverythingGatewayEnhanced (`js/gateway-enhanced.js`)
- Performance optimizations with search caching
- Accessibility enhancements with screen reader support
- Animation system with reduced motion support
- Intersection Observer for lazy loading
- Debounced search with fuzzy matching

### Key Features Implementation

#### Universal Search System
- **Trigger**: Ctrl+K hotkey or search button
- **Search Scope**: All 142+ resources across categories
- **Matching**: Fuzzy search across name, description, tags
- **Performance**: Debounced input, cached results, <75ms average

#### Dynamic Resource Loading
```javascript
// Auto-detects current page context for JSON path resolution
const basePath = window.location.pathname.includes('/categories/') ? '../../data/' : 'data/';
```

#### Accessibility Features
- Skip links for screen readers
- Keyboard navigation (arrows, enter, escape)
- High contrast support
- Reduced motion preference detection

## CSS Design System

### Architecture (`css/design-system.css`)

#### CSS Custom Properties
- **Colors**: WCAG AA compliant palette with dark mode support
- **Typography**: System font stack with responsive scale  
- **Spacing**: 8px base grid system (--spacing-1 to --spacing-24)
- **Shadows**: 7-level elevation system
- **Breakpoints**: Mobile-first responsive design

#### Component System (`css/components.css`)
- **Cards**: `.platform-card`, `.category-card` with hover effects
- **Grids**: Responsive grid layouts with auto-fit columns
- **Navigation**: Breadcrumb and skip-link components
- **Search**: Modal overlay with backdrop blur

### Category Color System
```css
/* Gradient definitions for visual hierarchy */
--gradient-mainstream: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-privacy: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
--gradient-academic: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
```

## Performance & Accessibility

### Performance Metrics (Target/Achieved)
- **Bundle Size**: <100KB total ✅
- **Load Time**: <100ms on fast connections ✅  
- **Search Latency**: ~75ms average response ✅
- **Lighthouse Performance**: 95+ score ✅
- **Lighthouse Accessibility**: 100 score ✅

### Accessibility Features
- **WCAG AA Compliance**: Color contrast, keyboard navigation
- **Screen Reader Support**: Semantic HTML, ARIA labels
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Keyboard Shortcuts**: Full keyboard navigation support
- **Skip Links**: Quick navigation for assistive technology

## Deployment Configuration

### Netlify (`netlify.toml`)
- **Security Headers**: X-Frame-Options, XSS Protection, Content-Type
- **Cache Strategy**: 1-year static assets, revalidated HTML
- **Redirects**: SPA fallback to index.html
- **Build**: Static file publishing from root directory

### Vercel (`vercel.json`)
- **Edge Optimization**: Global CDN distribution
- **Cache Headers**: Immutable static assets
- **Security**: Same security headers as Netlify
- **Clean URLs**: Automatic trailing slash handling

### GitHub Actions (`.github/workflows/deploy.yml`)
- **Triggers**: Push to main/master branch
- **Environment**: Node.js 18, Ubuntu latest
- **Process**: Checkout → Setup → Test → Deploy to GitHub Pages

## Development Workflows

### Hot Development Cycle
1. **Edit content**: Modify JSON files for instant updates
2. **Test locally**: `npm run serve` for live development
3. **Validate**: Check responsive design across breakpoints
4. **Deploy**: Git push triggers automatic deployment

### Performance Testing
```bash
# Lighthouse CLI for performance auditing
npx lighthouse http://localhost:8080 --view

# Bundle size analysis
du -sh . --exclude=node_modules
```

### Adding Interactive Features
- Extend `EverythingGatewayEnhanced` class in `js/gateway-enhanced.js`
- Follow existing patterns for accessibility and performance
- Test across mobile/desktop breakpoints
- Maintain <100KB bundle size constraint

## Current Roadmap Alignment

### Completed (v2.0)
- ✅ **3 Active Categories**: Search Engines (39), Tools (52), Entertainment (51)
- ✅ **Universal Search**: Ctrl+K hotkey with fuzzy matching
- ✅ **Performance Optimization**: Sub-100ms load times
- ✅ **Production Deployment**: Live on Netlify with analytics

### Immediate Next (v2.1)
- [ ] **Knowledge Category**: 50+ learning and reference resources
- [ ] **Search Enhancements**: Category filtering, recent searches
- [ ] **PWA Features**: Service worker, app installation
- [ ] **Analytics Dashboard**: Usage patterns and popular resources

### Future Phases
- [ ] **News Category**: Global news sources and trend tracking
- [ ] **Social Networks**: Professional and community platforms
- [ ] **User Personalization**: Favorites sync, custom layouts
- [ ] **Mobile App**: React Native or Flutter implementation

## Known Issues & Troubleshooting

### Common Development Issues

#### JSON Loading Failures
```javascript
// Fallback mechanism in gateway.js
catch (error) {
    console.error('Failed to load resources:', error);
    this.resources = this.getFallbackResources();
}
```

#### Search Performance on Large Datasets
- Search is debounced to 200ms for performance
- Results limited to 50 items to prevent UI lag
- Consider implementing virtual scrolling for 500+ resources

#### Mobile Safari CSS Grid Issues  
- Grid layouts tested across iOS Safari versions
- Fallback to flexbox for older browsers if needed

### Performance Monitoring
```javascript
// Built-in metrics tracking in gateway-enhanced.js
this.metrics = {
    searchLatency: [],
    renderTime: [],
    animationFrames: 0
};
```

## Contributing Guidelines

### Code Standards
- **Vanilla JavaScript**: No framework dependencies
- **Semantic HTML**: Accessibility-first markup
- **CSS Custom Properties**: Use design token system
- **Mobile First**: Design for mobile, enhance for desktop

### Content Guidelines  
- **Resource Quality**: Only include actively maintained platforms
- **Description Length**: 50-100 characters for consistency
- **Categories**: Follow existing 6-category structure
- **URLs**: Use HTTPS, verify accessibility

### Testing Checklist
- [ ] **Cross-browser**: Chrome, Firefox, Safari, Edge
- [ ] **Mobile responsive**: iPhone, Android, tablet
- [ ] **Accessibility**: Screen reader navigation
- [ ] **Performance**: Lighthouse score >90
- [ ] **Load testing**: Slow connection simulation

## AI Agent Integration Points

```html
<!-- Markers for future AI-generated content -->
<!-- AI-GENERATED-DOCS:API-REFERENCE -->
<!-- AI-GENERATED-DOCS:PERFORMANCE-METRICS -->
<!-- AI-GENERATED-DOCS:ACCESSIBILITY-AUDIT -->
```

This WARP.md serves as the definitive guide for AI agents working on The Everything Gateway, providing architectural context, development workflows, and contribution guidelines for maintaining this high-performance web application.
