# Snap & Style - Neeman's AI Shoe Stylist

## Overview

Snap & Style is a mobile-first web application that uses AI-powered computer vision to analyze outfit photos and recommend matching sustainable shoes from Neeman's collection. Users upload or capture photos of their outfits, and the application provides personalized shoe recommendations based on color palette, style, and occasion analysis.

The application emphasizes visual-first interactions inspired by Instagram and Pinterest, with a clean, eco-conscious design aesthetic that reflects Neeman's sustainable materials philosophy.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing
- Mobile-first responsive design targeting max-width of 448px (md breakpoint)

**UI Component System**
- shadcn/ui component library with Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for type-safe component variants
- Custom design system defined in `design_guidelines.md` emphasizing:
  - Visual hierarchy through scale (images dominate, text supports)
  - Touch-optimized interactions with generous tap targets
  - Eco-conscious aesthetic with clean, organic design language
  - DM Sans as primary font family via Google Fonts

**State Management**
- TanStack Query (React Query) for server state management, caching, and API interactions
- Local component state with React hooks for UI state
- Custom hooks for mobile detection and toast notifications

**Key Features**
- Photo upload via file picker or camera capture with drag-and-drop support
- Real-time image preview before analysis
- Example scenarios carousel for quick demos
- Progressive loading states with animated indicators
- Responsive card-based layout for shoe recommendations

### Backend Architecture

**Server Framework**
- Express.js with TypeScript running on Node.js
- HTTP server created with native Node.js `http` module
- Middleware stack includes JSON parsing, URL encoding, and request logging
- Custom logging with timestamp formatting for request/response tracking

**API Design**
- RESTful API endpoints under `/api` prefix
- Single analysis endpoint (`POST /api/analyze`) that accepts base64-encoded images
- Support for both real image uploads and predefined example scenarios
- Image validation using Zod schemas defined in shared types

**AI/ML Integration**
- OpenAI GPT-5 (latest model as of August 2025) for vision-based outfit analysis
- Structured JSON responses for outfit detection including:
  - Detected clothing items (3-5 items max)
  - Dominant colors and hex codes (3-4 colors max)
  - Style classification (casual/formal/ethnic/athleisure/office)
  - Occasion detection (everyday/work/party/traditional/sports)
- Custom recommendation algorithm matching analyzed outfits to Neeman's shoe catalog

**Static Asset Serving**
- Production: Serves pre-built static files from `dist/public`
- Development: Vite middleware integration for HMR and on-demand compilation
- SPA fallback routing to `index.html` for client-side navigation

**Build Process**
- Custom build script using esbuild for server bundling
- Dependency allowlist for common packages to reduce cold start times
- Separate client build via Vite
- TypeScript compilation check before deployment

### External Dependencies

**AI Services**
- OpenAI API (GPT-5 model) for image analysis and outfit understanding
- Requires `OPENAI_API_KEY` environment variable

**Database**
- Drizzle ORM configured for PostgreSQL via `@neondatabase/serverless`
- Connection via `DATABASE_URL` environment variable
- Schema defined in `shared/schema.ts`
- Migration management through Drizzle Kit
- Note: Database appears configured but may not be actively used; shoe catalog and examples are currently in-memory data structures

**Third-Party UI Libraries**
- Radix UI suite (@radix-ui/*) for accessible component primitives:
  - Dialogs, dropdowns, popovers, tooltips
  - Form controls (checkbox, radio, select, slider, switch)
  - Navigation components (accordion, tabs, menubar)
  - Layout components (scroll area, separator, aspect ratio)
- Embla Carousel for touch-friendly carousels
- Lucide React for consistent iconography
- React Hook Form with Zod resolvers for form validation

**Styling & Design**
- Tailwind CSS with PostCSS for processing
- Custom color system using HSL values with CSS variables
- Design tokens for spacing, typography, shadows, and elevations
- Dark mode support via class-based theming

**Development Tools**
- Replit-specific plugins for error overlay, cartographer, and dev banner
- TypeScript for static type checking across shared types
- Path aliases configured for clean imports (@/, @shared/, @assets/)

**Data Sources**
- Neeman's shoe catalog hardcoded in `server/neemans-data.ts` and mirrored in `client/src/lib/neemans-catalog.ts`
- Example scenarios with pre-defined outfits for demo purposes
- Unsplash images for placeholder shoe product images