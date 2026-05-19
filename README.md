# Joshua Argent's Personal Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16.2-black)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-38bdf8)

> A personal hub for running, reading, coding, and content creation. Built with Next.js, React, and Tailwind CSS.

## Features

- **Running Tracker** - Daily 5km streak tracking with Strava integration
- **Reading Tracker** - Book library with reviews and progress tracking  
- **Code Portfolio** - GitHub repository showcase with live stats
- **YouTube Integration** - Video content organization and tracking
- **Blog** - Personal articles on running, habits, and learning
- **CV/Resume** - Professional experience and skills
- **Contact** - Simple contact form with newsletter signup
- **Responsive** - Fast, mobile-first design

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16.2 (App Router) |
| Language | TypeScript 6.0 |
| UI Library | React 19.2 |
| Styling | Tailwind CSS 4.2 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Markdown | Marked + MDX Remote |
| Syntax Highlighting | Shiki + Rehype Pretty Code |
| State Management | Zustand |
| Analytics | Vercel Analytics + Speed Insights |
| Date Utilities | date-fns |
| Class Utilities | clsx + tailwind-merge |

## Project Structure

```
portfolio/
├── public/                  # Static assets
│   ├── images/            # Images and photos
│   └── fonts/            # Local fonts
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── api/         # API routes
│   │   ├── blog/        # Blog pages
│   │   ├── code/        # Code portfolio
│   │   ├── contact/     # Contact page
│   │   ├── content/    # Content categories
│   │   ├── cv/        # Resume/CV
│   │   ├── reading/    # Book tracker
│   │   └── running/   # Running tracker
│   ├── components/        # React components
│   │   ├── blog/        # Blog components
│   │   ├── code/        # Code components
│   │   ├── content/    # Content components
│   │   ├── home/      # Homepage components
│   │   ├── layout/    # Layout components
│   │   ├── reading/   # Reading components
│   │   ├── running/  # Running components
│   │   ├── shared/   # Shared components
│   │   ├── ui/       # UI components
│   │   └── video/    # Video components
│   ├── data/            # Static data
│   │   ├── blog.ts      # Blog posts
│   │   ├── books.ts    # Book library
│   │   ├── running.ts  # Running data
│   │   ├── videos.ts   # YouTube videos
│   │   ├── projects.ts # GitHub projects
│   │   ├── content.ts # Content pieces
│   │   ├── cv.ts     # Resume data
│   │   └── site.ts   # Site info
│   ├── lib/             # Utility functions
│   │   ├── constants.ts # Site constants
│   │   ├── fonts.ts   # Font configuration
│   │   ├── github.ts # GitHub API
│   │   ├── markdown.ts # Markdown parser
│   │   ├── strava.ts # Strava API
│   │   ├── utils.ts  # General utilities
│   │   └── youtube.ts # YouTube API
│   └── types/           # TypeScript types
│       └── index.ts    # Type definitions
├── .env.example         # Environment variables template
├── next.config.ts       # Next.js configuration
├── postcss.config.mjs  # PostCSS configuration
├── tsconfig.json      # TypeScript configuration
└── package.json     # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 20.0.0+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/joshuaargent/portfolio.git
cd portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### Development

```bash
# Start development server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint
```

### Build

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Site URL (required for production)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# GitHub Integration (optional)
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=your-github-token

# Strava Integration (optional)
STRAVA_CLIENT_ID=your-strava-client-id
STRAVA_CLIENT_SECRET=your-strava-client-secret
STRAVA_ACCESS_TOKEN=your-strava-access-token
STRAVA_REFRESH_TOKEN=your-strava-refresh-token

# YouTube (optional - for video statistics)
YOUTUBE_API_KEY=your-youtube-api-key

# Newsletter (optional)
NEWSLETTER_API_KEY=your-newsletter-key
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run type-check` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run test` | Run Vitest in watch mode |
| `npm run test:run` | Run Vitest once |

## 📱 Pages

| Route | Description |
|-------|------------|
| `/` | Homepage |
| `/about` | About page |
| `/running` | Running tracker & streak |
| `/running/videos` | Running videos |
| `/reading` | Book library |
| `/reading/books/[slug]` | Individual book page |
| `/code` | GitHub projects |
| `/code/[slug]` | Project details |
| `/content` | YouTube content |
| `/blog` | Blog posts |
| `/blog/[slug]` | Individual blog post |
| `/cv` | Resume/CV |
| `/contact` | Contact form |

## 🔌 API Integrations

### Strava
Automatically syncs running activities, calculates streaks, and displays running statistics. Requires Strava API credentials.

### GitHub
Fetches repository data, stats, and READMEs for the code portfolio section. Rate-limited without token.

### YouTube
Displays video content organized by category (long-form, shorts, running shorts).

## Design System

### Colors

| Role | Color |
|------|-------|
| Primary | `#0D9488` (teal) |
| Background | `#FAFAF9` |
| Card | `#FFFFFF` |
| Text | `#1C1917` |
| Muted | `#A8A29E` |

### Typography

| Element | Font |
|---------|------|
| Headings | Inter |
| Body | Inter |
| Blog | Lora |
| Code | JetBrains Mono |

## Code Quality

### Verification Passed

| Check | Status |
|-------|--------|
| TypeScript | No type errors (`tsc --noEmit`) |
| Build | Successfully compiles |
| Tests | 13 passing (Vitest) |
| Lint | Passes |
| Console.log | None in production |

### 📊 Project Stats

- **105** TypeScript/TSX files
- **66** React components
- **8** Data modules
- **7** Utility libraries
- **13** Passing tests

### 🏗 Architecture

- Serverless-ready with Vercel
- Static generation for optimal performance
- API routes for dynamic content
- Type-safe end-to-end

## 📄 License

MIT License - feel free to use this as a template for your own portfolio.

## 🙏 Acknowledgments

Built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and [Vercel](https://vercel.com).

---

<p align="center">
  Built with ❤️ by <a href="https://joshuaargent.vercel.app">Joshua Argent</a>
</p>
