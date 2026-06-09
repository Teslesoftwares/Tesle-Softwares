# TESLE Software & Web Innovations

A premium digital agency website with an immersive cinematic loader and futuristic AI-lab aesthetic.

## Tech Stack

- **React 19** + **TypeScript** + **Vite 8**
- **GSAP 3.15** — timeline-driven loader animation
- **Framer Motion** — page transitions and UI animations
- **Three.js / R3F / Drei** — 3D hero section
- **Tailwind CSS v4** — utility-first styling
- **React Router** — client-side routing

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Project Structure

```
src/
├── App.tsx                  # Root with router + Coming Soon / Main layout
├── main.tsx                 # Entry point
├── index.css                # Global styles + Tailwind
├── components/
│   ├── cinematic/           # Hero 3D scene (lazy loaded)
│   ├── hero3d/              # Three.js character model + effects
│   ├── layout/              # Navbar, Footer, TopBar, SEO
│   ├── sections/            # Home page sections
│   └── ui/                  # Reusable UI components
│       ├── Loader.tsx       # Cinematic fullscreen loader
│       └── loader.css
├── pages/
│   ├── ComingSoon.tsx       # Standalone coming-soon page
│   ├── Home.tsx
│   ├── Services.tsx
│   ├── Portfolio.tsx
│   ├── Blog.tsx
│   ├── Contact.tsx
│   └── ...
├── data/                    # JSON content files
├── hooks/                   # Custom hooks (theme, scroll, etc.)
├── lib/                     # Utilities (icons, schema, etc.)
└── types/                   # TypeScript type definitions
```

## Loader

The cinematic loader runs on first visit (fixed to `localStorage`). It plays a 7-phase animation:

1. **Dot** — tiny white point at center
2. **Line** — expands into a 3D-rotating light line with a traveling sphere and energy trail
3. **Split** — line breaks into segments that assemble into the Tesle "T" logo
4. **Brand** — logo glows, text fades in
5. **Orbit** — sphere orbits the logo, emitting particles
6. **Collapse** — everything converges to a bright point
7. **Burst** — cyan-white light burst expands, transitions to content

## Performance

- WebP images (28–69 KB each)
- Lazy-loaded route sections (2–12 KB chunks)
- Tree-shaken icons (29 precise imports, 18 KB)
- Preloaded hero background image
- Immutable asset caching headers
- Total build ~2 MB

## Deployment

Supports Netlify, Vercel, Cloudflare Pages, or any static host. Point to `dist/`.
