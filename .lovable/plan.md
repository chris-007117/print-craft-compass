
The user wants both: (1) the site search from the previous turn, AND (2) the full rebrand brief executed. I need to be honest about what's realistic here.

## Reality check on the full brief

The brief asks for things that **cannot** or **should not** be done in this stack/turn:

- **Next.js SSR / RSC** — this project is React + Vite. Switching frameworks means rebuilding from scratch. Not doable in-place.
- **50+ pages** (6 services + 6 industries + 6 location pages + 4 pillar posts + cluster posts + 4 calculator tools + about/team/equipment/sustainability/careers + glossary/file-prep/paper-guide/faq + portfolio detail pages) — this is weeks of work, not one turn.
- **Full rebrand** away from "Forma & Press" to a new Latin/Greek-rooted name with gold/teal palette — throws away the approved direction from 2 turns ago. Need user confirmation before nuking it.
- **Custom fonts (PP Neue Montreal, Satoshi, Clash Display)** — these are paid/licensed. Can substitute free equivalents (Space Grotesk, Manrope, JetBrains Mono).
- **Scroll-locked horizontal service section, parallax, counter animations** — doable but heavy.
- **Full schema/sitemap/robots stack** — doable in Vite via static files + react-helmet-async, but limited without SSR.

## Proposed split

**This turn — ship now:**
1. **Site search** (command palette, ⌘K) — the explicit top-line ask.
2. **New brand name + palette** — pick a Latin/Greek root name and apply the dark-charcoal / burnished-gold / deep-teal palette + new font stack across existing tokens. Affects every page instantly via `index.css` + `tailwind.config.ts` + `Logo.tsx`.
3. **Homepage scroll upgrades** — animated stat counters (Intersection Observer), staggered portfolio reveal, parallax quote mark in testimonials, `prefers-reduced-motion` respected.
4. **SEO foundation** — install `react-helmet-async`, add per-page `<title>`/meta/canonical/OG, JSON-LD (Organization + LocalBusiness + WebSite on home, Service on capability pages, Article on insights, BreadcrumbList everywhere), updated `robots.txt` with the AI-crawler block list, and a static `sitemap.xml`.
5. **Footer hardening** — newsletter already exists; add Privacy/Terms/Accessibility/AI-Usage placeholder pages and link them.

**Next turns — explicitly deferred (will suggest after):**
- 6 industry detail pages, 6 location SEO pages, 4 pillar + cluster blog posts, 4 interactive calculator tools, team/equipment/sustainability/careers/glossary/file-prep/paper-guide/FAQ pages, scroll-locked horizontal services section, portfolio detail pages, full Article schema per blog post.
- SSR migration is **not** recommended — if true SSR is a hard requirement, the project should be rebuilt in Next.js (separate decision).

## Brand proposal (pick one in next turn if you dislike)

**Veridia Press** — from Latin *veridicus* (truth-telling) + *viridis* (verdant/living). Premium, timeless, trademark-clean feel. Tagline: *"Truth in print."*

Alt picks I'll mention: **Aevum** (Latin: an age/eternity), **Orior Press** (Latin: to rise), **Lithos & Co.** (Greek: stone, the root of lithography).

## Files I'll touch

- `src/components/SiteSearch.tsx` (new), `src/components/Header.tsx` — search
- `src/index.css`, `tailwind.config.ts`, `src/components/Logo.tsx`, `index.html` — rebrand tokens + fonts + title
- `src/pages/Index.tsx` — animated counters, staggered reveals, parallax quote
- `src/components/SEO.tsx` (new), `src/main.tsx` (HelmetProvider), all 12 pages — meta + JSON-LD
- `public/robots.txt`, `public/sitemap.xml` — SEO files
- `src/pages/Privacy.tsx`, `Terms.tsx`, `Accessibility.tsx`, `AIPolicy.tsx` (new stubs), `App.tsx`, `Footer.tsx` — legal pages

## Out of scope this turn (will list as suggestions)

Industry detail pages · Location SEO pages · Pillar blog content · Calculator tools · Team/equipment pages · Horizontal-scroll services · Next.js SSR migration · Real custom-licensed fonts.

If you want the full brief built end-to-end, approve this turn first, then I'll knock out the deferred items in 4–5 follow-up turns.
