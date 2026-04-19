
## Premium Commercial Printer — Marketing + Lead Capture Site

### Brand (fictional)
**Name:** **Forma & Press** — modern commercial print + packaging studio.
**Tagline:** *"Print, perfected."*
**Positioning line:** Bay Area commercial printer for healthcare, technology, and consumer brands. G7 Master qualified. Family-owned since 1987.

**Visual identity (Medius × Artisan × Mohawk):**
- Palette: deep charcoal `#0E0F12` base, bone white `#F5F2EC`, signature **molten copper** accent `#C8541E`, muted slate for secondary surfaces.
- Type: bold condensed display sans (headline) + clean humanist sans (body). No serifs, no decorative faces.
- Imagery: full-bleed editorial — press detail shots, paper edge macros, ink-on-roller, hands-on-craft. AI-generated placeholders styled consistently (no stock photo look).
- Motifs: subtle copper radial sunburst behind hero, thin hairline rules between sections, generous whitespace.

### Site map (12 pages)
1. **Home**
2. **About** (history + family-owned story + sustainability stats)
3. **Capabilities** (overview hub) → 4 service pages:
   4. Commercial Print (offset + digital)
   5. Packaging & Folding Cartons
   6. Large Format & Display
   7. Finishing & Fulfillment
8. **Industries** (Healthcare, Technology, Consumer, Education — single page, tabbed)
9. **Case Studies** (index + 2 detail pages with ROI numbers)
10. **Insights** (blog index — scaffold with 3 seed posts)
11. **Request a Quote** (multi-step form + file upload)
12. **Request Samples** (form) + **Contact** (combined page with addresses, hours, map placeholder)

### Homepage structure (the conversion blueprint)
1. **Hero** — dark, copper sunburst, condensed headline *"Print, perfected."* + subhead, dual CTAs: **Request a Quote** + **Order Sample Pack**. Cinematic press photo.
2. **Client logo bar** — 12 recognizable-style logos immediately below hero (fictional but credible).
3. **Featured case study strip** — "MedDevice Co. — 42% lift in surgeon kit response, $4.2M incremental revenue" with image + Read Case Study CTA.
4. **Capabilities grid** — 4 tiles linking to service pages, each with macro photo.
5. **Industries tabs** — Medical / Technology / Consumer / Education (Medius pattern).
6. **Process / craft section** — "Watch us work" placeholder video block + 3 craft proof points.
7. **Trust stack** — G7 Master, FSC, SOC-2, SGP badges in a clean row + "Since 1987 · 38 years" stat strip (4MM impressions/yr style scale stats).
8. **Testimonial carousel** — 5 named testimonials with title + company + headshot.
9. **Sustainability strip** — 3 quantified stats (tons recycled, trees/yr, soy inks).
10. **Insights preview** — 3 latest posts.
11. **Final CTA band** — copper background, *"Let's make something exceptional."* + Quote + Sample CTAs.
12. **Footer** — 2 office addresses (San Jose HQ + Sacramento), phone, hours, certification badges, social, newsletter signup, accessibility + privacy + AI usage links.

### Navigation
Sticky dark header. 6 items: **Capabilities** (mega-menu, 4 services), **Industries**, **Work** (case studies), **About**, **Insights**, **Contact**. Persistent **Request a Quote** copper button + phone click-to-call. Hamburger on mobile. Site search in header.

### Lead capture (Lovable Cloud)
- **Quote form** — multi-step: project type → specs (size, quantity, paper, finish) → timeline → contact + file upload (drag-and-drop). Stored in Cloud DB; confirmation toast + email-ready record.
- **Sample pack form** — name, company, address, industry. Stored in DB.
- **Contact form** — 5 fields + optional file. Stored in DB.
- **Newsletter** — email captured to DB.
- All submissions viewable via Lovable Cloud table UI.

### Trust stack baked in
G7 Master + FSC + SOC-2 + SGP badges (footer + capabilities pages), client logo wall, 2 case studies with hard ROI numbers, named testimonials with headshots, scale stats, facility photography, sustainability numbers, 38-year heritage.

### Anti-patterns explicitly avoided
No stock photo look, no first-name-only testimonials, no 3-field contact form without upload, no generic CMS template feel, no dense alert bars, no manual-approval gates, no discount-led hero, no missing certifications.

### Tech
- React + Tailwind, design tokens in `index.css` (HSL).
- Lovable Cloud: tables for `quote_requests`, `sample_requests`, `contacts`, `newsletter_signups`. Storage bucket for uploaded artwork.
- Responsive (mobile-first verified at 380px), sticky header, smooth scroll, accordion FAQs, tabbed industries module, carousel testimonials.
- Placeholder imagery via curated AI/illustrative assets — replaceable later.

### Out of scope (v1)
Live instant pricing, payments, customer accounts, order history, true configurator, multi-region, live chat. (Plan a phase 2 if needed.)
