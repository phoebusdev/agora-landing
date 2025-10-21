# Agora Landing Page

Landing page for the Agora platform showcasing the design system and interactive prototype.

## Overview

This is a static HTML/CSS landing page implementing the Agora Design System Constitution with:
- Oregon LDO serif font for headings
- Inter sans-serif font for body text
- Grayscale minimalist color palette
- Shared design token system
- Embedded interactive prototype
- **Spec-Kit integration** for spec-driven development

## Features

- **Master Site** (`index.html`): Information architecture and prototype showcase
- **Interactive Prototype** (`/prototype`): Full working prototype of the Agora platform
- **Shared Design System** (`tokens.css`): Single canonical source for all design tokens

## Design System Compliance

Implements the Agora Design System Constitution:
- **Article III**: Single canonical CSS custom properties file
- **Article V**: Typography consistency (Oregon LDO + Inter)
- **Article VIII**: Three-tier shadow system (subtle, medium, strong)
- **Article IX**: Standardized transitions (200ms hover, 150ms click, 300ms page)
- **Article X**: <2px validation tolerance

## Deployment

### Vercel (Recommended)

1. Import this repository to Vercel
2. Framework: Other/Static
3. Build Command: (leave empty)
4. Output Directory: (leave empty)
5. Deploy

The site will deploy instantly as it's pure HTML/CSS with no build process.

### Local Development

Simply open `index.html` in a web browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Project Structure

```
agora-landing/
├── index.html           # Master site HTML
├── styles.css           # Master site styles
├── tokens.css           # Shared design tokens
├── prototype/
│   ├── index.html       # Prototype HTML
│   ├── styles.css       # Prototype styles
│   ├── script.js        # Prototype interactions
│   └── OregonLDO.ttf    # Oregon LDO font file
└── README.md            # This file
```

## Design Tokens

All design tokens are centralized in `tokens.css`:
- Typography (fonts, sizes, weights, line heights)
- Colors (grayscale palette + semantic tokens)
- Spacing (8px base unit)
- Shadows (subtle, medium, strong)
- Transitions (hover, click, page)
- Border radius

Both the master site and prototype import from this single source of truth.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Custom Properties required
- No JavaScript dependencies for master site

## License

All rights reserved.
