# Design Guidelines for Developer Real Estate Website

## Design Approach
**Reference-Based Approach** - Inspired by Develia.pl's clean, professional real estate presentation with simplified information architecture and elegant visual hierarchy.

## Key Design Principles
- **Clean & Delicate**: Minimalist aesthetic with generous whitespace
- **Transparent & Clear**: Straightforward information presentation without complexity
- **Professional Trust**: Sophisticated visual language appropriate for real estate investment

## Core Design Elements

### A. Color Palette
**Light Mode:**
- Primary: 220 15% 25% (deep navy-blue for headers and navigation)
- Secondary: 0 0% 45% (medium gray for body text)
- Background: 0 0% 98% (off-white main background)
- Card backgrounds: 0 0% 100% (pure white)
- Accent: 210 50% 55% (subtle blue for CTAs and links)

**Dark Mode:**
- Primary: 210 20% 85% (light blue-gray for headers)
- Secondary: 0 0% 70% (light gray for body text)
- Background: 220 15% 8% (very dark navy)
- Card backgrounds: 220 15% 12% (slightly lighter dark)
- Accent: 210 60% 65% (brighter blue for CTAs)

### B. Typography
- **Primary Font**: Inter (Google Fonts) - clean, modern sans-serif
- **Headings**: 600-700 weight, generous line-height (1.2-1.3)
- **Body**: 400 weight, comfortable reading line-height (1.6)
- **Scale**: 14px body, 16px large body, 20px, 24px, 32px, 48px for headings

### C. Layout System
**Tailwind Spacing**: Consistent use of 4, 6, 8, 12, 16, 24 units
- Container max-width: 1200px with auto margins
- Section padding: py-16 (desktop), py-12 (mobile)
- Card spacing: p-6 internal, gap-6 between cards
- Grid systems: 3-column desktop, 1-column mobile for project cards

### D. Component Library

**Navigation:**
- Clean horizontal header with logo left, navigation center, CTA right
- Sticky navigation with subtle shadow on scroll
- Mobile hamburger menu with full-screen overlay

**Hero Section:**
- Large background image with overlay (30% dark opacity)
- Centered content with large heading and description
- Single prominent CTA button with variant="outline" and blurred background

**Project Cards:**
- White cards with subtle shadow and rounded corners
- High-quality project visualization as card header
- Minimal text: project name, location, unit count, availability
- Hover effect: gentle lift with increased shadow

**Forms:**
- Clean input fields with subtle borders
- Floating labels or clear placeholder text
- Consistent button styling matching brand colors

**Data Display:**
- Simple statistics presentation (numbers + labels)
- Clean table layouts for apartment specifications
- Image galleries with thumbnail navigation

### E. Animations
Use sparingly - subtle fade-ins on scroll and gentle hover transitions only.

## Images
**Hero Section**: Large, high-quality architectural visualization or photography of completed development (1920x800px minimum)
**Project Cards**: Professional 3D renderings or photography of buildings (700x400px aspect ratio)
**Gallery Images**: Interior and exterior shots, floor plans, location maps
**About Section**: Team photos, construction progress, company achievements

**Image Treatment**: Consistent filter/color grading for cohesive brand feel, subtle overlays for text readability.