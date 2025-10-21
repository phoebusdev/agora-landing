# Agora Landing Page - Design System

This document defines the visual design system for the Agora Landing Page, borrowed from the Agora Prototype. This design system should be used for all spec-kit generated content and any future development.

## Design Philosophy

**Grayscale Minimalism with Depth and Hierarchy**

The design system creates visual interest and hierarchy through subtle depth cues, refined shadows, and careful layering - all within a strict grayscale palette. No color is used except black, white, and grays.

## Design Tokens

All design tokens are defined in `tokens.css` and follow the **Constitution Design Compliance** principles.

### Color Palette - Grayscale Only

```css
--color-black: #000000
--color-white: #FFFFFF
--color-gray-900: #1A1A1A  (primary text)
--color-gray-800: #2d2d2d
--color-gray-700: #404040
--color-gray-600: #666666  (secondary text)
--color-gray-500: #808080  (muted text)
--color-gray-400: #D4D4D4
--color-gray-300: #E5E5E5  (borders)
--color-gray-200: #cccccc
--color-gray-100: #F5F5F5  (secondary background)
```

### Typography

**Font Families:**
- Headings: `'Oregon LDO', serif` (custom serif)
- Body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

**Font Sizes:**
```css
--font-size-heading-1: 48px
--font-size-heading-2: 36px
--font-size-heading-3: 24px
--font-size-body: 16px
--font-size-small: 14px
--font-size-tiny: 12px
```

**Font Weights:**
```css
--font-weight-regular: 400
--font-weight-medium: 500
--font-weight-semibold: 600
--font-weight-bold: 700
```

### Spacing System (8px base unit)

```css
--space-xs: 8px
--space-sm: 16px
--space-md: 24px
--space-lg: 32px
--space-xl: 48px
--space-2xl: 64px
--space-3xl: 96px
```

### Visual Refinement System

**Refined Shadows - Multi-layer depth system:**

```css
/* Subtle shadow for minimal depth */
--shadow-refined-subtle:
  0 0.5px 1px 0 rgba(0, 0, 0, 0.03),
  0 1px 2px 0 rgba(0, 0, 0, 0.02);

/* Card shadow for content blocks */
--shadow-refined-card:
  0 0.5px 1px 0 rgba(0, 0, 0, 0.04),
  0 2px 4px -1px rgba(0, 0, 0, 0.06),
  0 4px 8px -2px rgba(0, 0, 0, 0.04);

/* Card hover state */
--shadow-refined-card-hover:
  0 1px 2px 0 rgba(0, 0, 0, 0.05),
  0 4px 8px -1px rgba(0, 0, 0, 0.08),
  0 8px 16px -2px rgba(0, 0, 0, 0.06);

/* Modal/overlay shadow */
--shadow-refined-modal:
  0 2px 4px 0 rgba(0, 0, 0, 0.06),
  0 8px 16px -2px rgba(0, 0, 0, 0.08),
  0 16px 32px -4px rgba(0, 0, 0, 0.08),
  0 0 0 1px rgba(0, 0, 0, 0.02);
```

**Background Depth Layers:**

```css
--bg-level-0: #FFFFFF  (highest level)
--bg-level-1: #FAFAFA
--bg-level-2: #F5F5F5
--bg-level-3: #F0F0F0  (deepest level)
```

### Transitions & Animation

**Duration Tokens:**
```css
--duration-hover: 200ms
--duration-click: 150ms
--duration-page: 300ms
```

**Easing Tokens:**
```css
--easing-bidirectional: ease-in-out
--easing-entrance: ease-out
--easing-exit: ease-in
```

## Navigation Design Pattern

### Magnification and Spacing Shift

The navigation uses a unique **magnification and spacing shift pattern** that creates hierarchy purely through scale and spatial relationships **without any decorative elements**.

**Characteristics:**
- No backgrounds, borders, shadows, or underlines (except accessibility focus outline)
- Visual hierarchy created through: scale, spacing, color, weight, and opacity
- Smooth coordinated spatial animation as users scroll or interact

**States:**

```css
/* Inactive state */
scale: 0.95
opacity: 0.75
color: gray-600
font-weight: 500
margin: 0px 16px

/* Hover state */
scale: 0.98
opacity: 0.9
color: black

/* Active state */
scale: 1.1
opacity: 1.0
color: black
font-weight: 600
margin: 0px 24px  /* claims more space */
```

**Implementation:**
- CSS animations with 300ms cubic-bezier easing
- JavaScript scroll detection for active state management
- Keyboard focus outline preserved for accessibility

## Design Principles

1. **Minimalism First** - Remove unnecessary elements, let content breathe
2. **Typography is King** - Georgia/Oregon LDO serif for elegance
3. **Generous White Space** - Breathing room in all layouts
4. **Subtle Elegance** - Depth through shadows and layering, not flashy animations
5. **Mobile-First Responsive** - Test all changes on mobile devices
6. **Grayscale Only** - No colors except black, white, and grays
7. **Hierarchy Through Depth** - Use shadows, layering, and scale for visual hierarchy

## Component Patterns

### Content Blocks

```css
.content-block {
  margin-bottom: var(--space-xl);
  max-width: var(--max-width-text); /* 700px for readability */
}
```

### Cards

```css
.card {
  background: var(--bg-level-0);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-refined-card);
  padding: var(--space-lg);
  transition: var(--transition-hover);
}

.card:hover {
  box-shadow: var(--shadow-refined-card-hover);
}
```

### Comparison Columns

```css
.comparison-column {
  padding: var(--space-lg);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}
```

## Accessibility Requirements

1. **Focus States** - All interactive elements must have clear focus indicators (2px solid black outline)
2. **Color Contrast** - Maintain WCAG AA minimum contrast ratios (gray-600 on white = 5.74:1)
3. **Keyboard Navigation** - All navigation and interaction must be keyboard accessible
4. **Reduced Motion** - Respect `prefers-reduced-motion` media query
5. **Semantic HTML** - Use proper heading hierarchy, landmarks, and ARIA labels

## Files Reference

- `tokens.css` - Single source of truth for design tokens
- `styles.css` - Main stylesheet for landing page
- `prototype/styles.css` - Prototype-specific styles with visual refinement system
- `script.js` - Navigation behavior and scroll detection

## Spec-Kit Integration

When using spec-kit slash commands (like `/speckit.specify`, `/speckit.plan`, etc.), ensure that any generated HTML, CSS, or UI components follow this design system:

1. Use only tokens from `tokens.css`
2. Apply the grayscale color palette exclusively
3. Use refined shadows for depth
4. Follow the 8px spacing grid
5. Implement magnification patterns for navigation
6. Maintain mobile-first responsive design
7. Preserve accessibility standards

## Future Development

All new features, components, and pages should:
- Import and use `tokens.css` for design consistency
- Follow the magnification and spacing shift pattern for navigation
- Use the refined shadow system for depth
- Maintain the grayscale-only constraint
- Test on mobile devices first
- Validate accessibility with keyboard navigation and screen readers
