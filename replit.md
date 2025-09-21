# replit.md

## Overview

This is a modern real estate website for "Premier Estates", a Polish property development company. The application showcases luxury residential projects with a clean, professional design inspired by Develia.pl. It features a full-stack architecture with a React frontend, Express backend, and PostgreSQL database, all built with TypeScript for type safety.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design system supporting light/dark themes
- **State Management**: TanStack Query for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful API endpoints under `/api` namespace
- **Request Handling**: JSON parsing and URL encoding middleware
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Development**: Hot reloading with Vite integration for seamless development

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless hosting
- **Schema Management**: Drizzle migrations for version-controlled schema changes
- **Connection**: Pooled connections with WebSocket support for serverless environments

### Data Models
- **Users**: Basic authentication with username/password
- **Projects**: Real estate developments with location, pricing, and availability data
- **Apartments**: Individual units linked to projects with room count, area, floor, and pricing

### Design System
- **Color Palette**: Professional navy/gray scheme with light/dark mode support
- **Typography**: Inter font family for clean, modern appearance
- **Component Variants**: Consistent button, card, and form styling with hover/active states
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Development Workflow
- **Build System**: Vite for frontend bundling, esbuild for backend compilation
- **Development Server**: Integrated Vite dev server with Express API proxy
- **Type Checking**: Shared TypeScript configuration across frontend, backend, and shared modules
- **Path Aliases**: Clean imports with `@/` for client code and `@shared/` for common types

## External Dependencies

### Core Infrastructure
- **Database Hosting**: Neon PostgreSQL serverless database
- **Package Management**: npm with lockfile for reproducible builds
- **Font Loading**: Google Fonts for Inter typography

### UI and Styling
- **Component Library**: Radix UI primitives for accessible components
- **Icons**: Lucide React for consistent iconography  
- **CSS Framework**: Tailwind CSS with PostCSS processing
- **Animations**: CSS transitions and transforms for smooth interactions

### Development Tools
- **Build Tools**: Vite for frontend, esbuild for backend compilation
- **Type Safety**: Zod for runtime validation and TypeScript integration
- **Development Experience**: Replit-specific plugins for error handling and cartographer
- **Date Handling**: date-fns for localized date formatting

### State and Data Management
- **API Client**: TanStack Query for server state synchronization
- **Form Validation**: React Hook Form with Hookform resolvers
- **Database**: Drizzle ORM with Zod integration for schema validation
- **Session Storage**: Connect-pg-simple for PostgreSQL session store