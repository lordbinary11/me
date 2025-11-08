# Design System Documentation

## Overview

This portfolio website is inspired by the Imroz portfolio theme, featuring a modern, clean design with smooth animations and a professional aesthetic.

## Color Palette

### Primary Colors
- **Primary Red**: `#ff6b6b` - Used for CTAs, highlights, and accents
- **Primary Dark Red**: `#ee5a5a` - Hover states for primary actions
- **Secondary Teal**: `#4ecdc4` - Secondary accents and gradients
- **Accent Blue**: `#45b7d1` - Additional accent color

### Neutral Colors
- **Text Primary**: `#1f1f1f` - Main text color
- **Text Secondary**: `#666666` - Secondary text and descriptions
- **Background**: `#ffffff` - Main background
- **Background Alt**: `#f9fafb` (gray-50) - Alternate section backgrounds
- **Border**: `#e5e5e5` - Borders and dividers

## Typography

### Font Families
- **Primary (Sans)**: Inter - Used for body text, navigation, and most UI elements
- **Secondary (Serif)**: Playfair Display - Used for elegant headings and display text

### Font Sizes
- **Hero Title**: 5xl to 7xl (48px - 72px)
- **Section Titles**: 4xl to 5xl (36px - 48px)
- **Subheadings**: 2xl (24px)
- **Body Text**: Base (16px)
- **Small Text**: sm (14px)

### Font Weights
- **Bold**: 700 - Headings and emphasis
- **Semibold**: 600 - CTAs and important text
- **Medium**: 500 - Navigation and labels
- **Regular**: 400 - Body text

## Spacing System

The design uses a consistent spacing scale based on Tailwind's default scale:
- **Small**: 4px (1 unit)
- **Medium**: 8px (2 units)
- **Large**: 16px (4 units)
- **XLarge**: 24px (6 units)
- **XXLarge**: 32px (8 units)

## Component Patterns

### Sections
All main sections follow a consistent pattern:
1. **Section Title**: Centered with decorative underline
2. **Subtitle**: Brief description below title
3. **Content Grid**: Responsive grid layout
4. **Animations**: Fade-in-up animations on scroll

### Buttons

#### Primary Button
- Background: `#ff6b6b`
- Text: White
- Hover: Darker red (`#ee5a5a`)
- Transform: Scale up on hover
- Shadow: Enhanced on hover

#### Secondary Button
- Border: `#1f1f1f` (2px)
- Background: Transparent
- Hover: Fill with border color, text becomes white

### Cards

#### Service Cards
- Background: White
- Shadow: Medium on default, enhanced on hover
- Hover: Lift effect (translate-y)
- Border Radius: lg (8px)

#### Portfolio Cards
- Image: Gradient placeholder (replace with actual images)
- Overlay: Dark gradient on hover
- Information: Shown in overlay on hover

## Animation System

### Scroll Animations
- **Fade-in-up**: Elements fade in while sliding up from 30px below
- **Fade-in**: Simple fade-in effect
- **Stagger**: Sequential animations with delays (0.1s increments)

### Intersection Observer
All sections use Intersection Observer API to trigger animations when they come into view, providing:
- Performance optimization
- Smooth user experience
- Progressive disclosure

### Hover Effects
- **Scale**: 1.05x transform on interactive elements
- **Shadow**: Enhanced shadow on hover
- **Color Transitions**: Smooth color changes (300ms)
- **Lift Effect**: Translate-y for card hover states

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: 1024px - 1280px (lg)
- **Large Desktop**: > 1280px (xl)

### Mobile-First Approach
- Base styles target mobile devices
- Progressive enhancement for larger screens
- Navigation transforms to hamburger menu on mobile
- Grid layouts adapt from single column to multi-column

## Layout Structure

### Header
- Fixed position, sticky on scroll
- Background changes from transparent to white with shadow
- Mobile: Hamburger menu
- Desktop: Horizontal navigation

### Hero Section
- Full viewport height
- Two-column layout on desktop
- Centered content on mobile
- Scroll indicator at bottom

### Content Sections
- Consistent padding: py-20 (vertical), px-4 sm:px-6 lg:px-8 (horizontal)
- Max width: 6xl (1152px) container
- Centered content

### Footer
- Dark background (`#1f1f1f`)
- Three-column layout on desktop
- Single column on mobile
- Social media links with hover effects

## Accessibility

### Considerations
- Semantic HTML elements
- ARIA labels for icon buttons
- Keyboard navigation support
- Focus states visible
- Color contrast ratios meet WCAG standards
- Reduced motion support (respects prefers-reduced-motion)

## Performance Optimizations

1. **Lazy Loading**: Animations only trigger when elements are visible
2. **CSS Optimization**: Tailwind CSS purges unused styles
3. **Next.js Features**: Automatic code splitting and optimization
4. **Image Optimization**: Ready for Next.js Image component
5. **Font Optimization**: Next.js font optimization for Google Fonts

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Customization Guide

### Changing Colors
1. Update CSS variables in `src/app/globals.css`
2. Replace color values throughout components
3. Ensure contrast ratios remain accessible

### Adding New Sections
1. Create new component in `src/components/`
2. Follow existing section pattern
3. Add to main page layout
4. Update navigation if needed

### Modifying Animations
1. Adjust animation delays in component files
2. Modify CSS keyframes in `globals.css`
3. Update Intersection Observer thresholds as needed

## Design Principles

1. **Clarity**: Information hierarchy is clear and intuitive
2. **Consistency**: Patterns repeat across sections
3. **Contrast**: Strong contrast between text and backgrounds
4. **White Space**: Generous spacing for readability
5. **Progressive Disclosure**: Information revealed as user scrolls
6. **User Feedback**: Hover states and transitions provide clear feedback

