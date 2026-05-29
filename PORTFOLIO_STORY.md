# Portfolio Build Story

> A developer's log of how this site was designed, built, and iterated.

---

## User Story Cards

Each card maps to a real feature. Format: **As [user], I want [goal], so that [outcome].**

---

### US-01 — Recruiter First Visit
> **As a recruiter** landing on the home page,  
> I want to quickly scan what the developer has built and where they've worked,  
> so that I can decide in under 30 seconds whether to dig deeper.

**Acceptance criteria:**
- Hero section visible above the fold with name, tagline, and a primary CTA
- Project cards and experience cards visible without scrolling past the hero
- Each card is clickable and navigates to the full `/work` or `/timeline` page
- No page reload — Next.js client-side navigation

**Features built for this story:**  
`hero-section.tsx`, `projects-section.tsx → /work`, `experience-section.tsx → /timeline`

---

### US-02 — Power User Navigation
> **As a developer or technical visitor** who wants to jump around the site fast,  
> I want a keyboard-driven command palette,  
> so that I don't have to reach for the mouse or scroll the navbar.

**Acceptance criteria:**
- `Cmd/Ctrl+K` opens the palette from anywhere on the site
- Palette shows Pages, Prompts, and Reading items grouped and labeled
- Typing filters results instantly
- `Esc` closes; `Enter` on a result navigates

**Features built for this story:**  
`command-palette.tsx`, `/api/reading`, `/api/prompts` (client-side fetch on open)

---

### US-03 — Work Page Deep Dive
> **As a hiring manager** reviewing projects,  
> I want to see source code and a live demo from the same card,  
> so that I can evaluate the work without searching GitHub manually.

**Acceptance criteria:**
- Each project card shows a GitHub icon that links to the repo
- Projects with a deployed demo show a second link icon beside the GitHub icon
- Links open in a new tab
- Icons are only visible on card hover (keeps the page clean)

**Features built for this story:**  
`work-content.tsx` — `demo` field on project objects, `ExternalLink` icon beside `Github` icon, `opacity-0 group-hover:opacity-100` reveal

---

### US-04 — Reading List Discovery
> **As a fellow developer** interested in what the owner is reading,  
> I want to browse papers and books by category with status indicators,  
> so that I can find recommendations relevant to my own learning.

**Acceptance criteria:**
- Reading items split into Papers / Books / Others sections
- Each card shows title, author, year
- A colored dot communicates current status: green = reading, amber = discussing, zinc = done
- Home page surfaces up to 3 active items as a preview

**Features built for this story:**  
`reading-list.tsx`, `content/reading/*.mdx`, `home-content-sections.tsx` (reading preview), pulsing Tailwind `animate-pulse` dot

---

### US-05 — Prompts as a Resource
> **As a developer** who uses LLMs in their workflow,  
> I want to browse and filter reusable prompt templates by tag,  
> so that I can adopt or adapt them for my own projects.

**Acceptance criteria:**
- Prompts listed with title, description, and tags
- Clicking a tag filters the list client-side without a page reload
- Each prompt has a detail page with syntax-highlighted content
- Tag state is local (no URL param needed for a small collection)

**Features built for this story:**  
`components/prompt-filter.tsx`, `app/prompts/[slug]/page.tsx`, `code-block.tsx`, `lib/content.ts → getPromptBySlug`

---

### US-06 — About Page as a Story
> **As a visitor** who wants to understand who the developer is beyond a résumé,  
> I want an about page that feels personal and intentional,  
> so that I get a sense of how they think, not just what they've done.

**Acceptance criteria:**
- Page has a distinct aesthetic from the rest of the dark-themed site
- Content is split into sections (Philosophy, Project highlight, Timeline, Connections)
- Sections are interactive — clicking a topic loads its content without a full navigation
- Visual design communicates personality, not just facts

**Features built for this story:**  
`app/about/page.tsx` — notebook aesthetic, `activeId` state + `AnimatePresence` for panel swap, `task-file-view.tsx` terminal component

---

### US-07 — Shareable Links with Preview
> **As a visitor** sharing the portfolio on LinkedIn, Discord, or Twitter,  
> I want the shared link to show a rich preview card with title and context,  
> so that the link looks professional and drives clicks.

**Acceptance criteria:**
- Every page has `og:title`, `og:description`, `og:image` metadata
- OG image is generated dynamically (not a static PNG)
- `metadataBase` is set so absolute OG image URLs resolve correctly
- Twitter card type set to `summary_large_image`

**Features built for this story:**  
`app/og/route.tsx` (ImageResponse), `metadataBase` in `app/layout.tsx`, per-route `metadata` exports, `app/sitemap.ts`

---

### US-08 — Project Name Consistency
> **As the portfolio owner** maintaining the site,  
> I want a single project entry to represent one real product,  
> so that the site doesn't show duplicate cards for the same thing under different names.

**Acceptance criteria:**
- "Food Waste Chatbot" and "Chat Cooking" merged into one "Food Recipes bot" entry
- Name updated consistently across work page, home cards, about page, task view, and design system
- No orphaned references remain

**Scope:** 6 files touched — `work-content.tsx`, `projects-section.tsx`, `task-file-view.tsx`, `about/page.tsx` (6 references), `DESIGN_SYSTEM.md`

---

## 1. Bootstrapping — v0 Scaffold (Jan 2026)

The project started from a **v0.dev** scaffold — a fast way to get a structured Next.js 14 (App Router) codebase with Tailwind, shadcn/ui, and Framer Motion wired up before writing a single real line.

The initial scaffold gave us:

- `app/` with `page.tsx`, `layout.tsx`, `about/`, `timeline/`, `work/`
- Core UI components: `hero-section`, `navbar`, `footer`, `experience-section`, `projects-section`, `skills-section`, `contact-section`, `tech-stack-section`
- Theme provider, `lib/utils.ts`, `components.json` for shadcn
- Static placeholder images in `public/`

**Stack chosen:**
- Next.js 14 App Router (RSC + client components mixed)
- Tailwind CSS for styling
- Framer Motion for all animations
- shadcn/ui for accessible base components
- TypeScript throughout

At this stage the site was a standard dark-theme SPA skeleton. No real content, no MDX, no routing beyond the basic pages.

---

## 2. Content + Early Refinements (Jan–Feb 2026)

Early commits focused on content and small UX touches:

- **Tagline changes** — iterating on the hero headline copy to land the right tone
- **Tech stack logos** — swapping placeholder icons for correct brand logos
- **Experience section** — cleaned up layout and reduced redundant markup
- Added **X/Twitter social link** to the navbar

At this stage, `/work` and `/timeline` were monolithic files — all the project data and JSX lived directly inside `app/work/page.tsx` and `app/timeline/page.tsx`.

**Key design decisions locked in early:**
- Dark background (`zinc-950` base), zinc grays for text hierarchy
- Pink → purple → blue gradient for primary accents
- Framer Motion `whileHover: { scale: 1.03, y: -4 }` as the standard card interaction
- `max-w-2xl` centered layout for readability on all pages

---

## 3. Major Feature Sprint — MDX, Reading, Prompts, ⌘K (May 24 2026)

The biggest single commit in the project: `bad8e31` — a full redesign that added four major features simultaneously.

### 3a. MDX Content Layer

**Problem:** Reading list and prompts were going to be long, structured content. Hardcoding them as JSX arrays would not scale.

**Solution:** `lib/content.ts` — a thin content layer using `gray-matter` + `next-mdx-remote` to parse frontmatter from `.mdx` files in `content/reading/` and `content/prompts/`.

```
content/
  reading/    ← one .mdx per paper/book, frontmatter: title, author, status, tags
  prompts/    ← one .mdx per prompt, frontmatter: title, tags, description
```

Exposed three functions:
- `getAllReading()` — returns sorted list with metadata
- `getAllPrompts()` — returns list with tag aggregation
- `getPromptBySlug(slug)` — full content for detail page

API routes (`/api/reading`, `/api/prompts`) proxy the content layer so the ⌘K palette can fetch them client-side without bundling all MDX into the client.

### 3b. /reading Page

Categorized view (Papers / Books / Others) with animated cards. Each card shows title, author, year, and a pulsing colored dot indicating status:
- `reading` → green pulse
- `discussing` → amber pulse
- `completed` → static zinc dot

### 3c. /prompts Page + Detail Route

Tag-based filter (`components/prompt-filter.tsx`) — clicking a tag client-side filters the list with a fade animation. Each prompt has its own `/prompts/[slug]` detail page with a `<CodeBlock>` component for syntax-highlighted prompt content.

### 3d. ⌘K Command Palette

`components/command-palette.tsx` — keyboard-driven navigation. Groups:
- **Pages** — static links (Home, Work, About, Timeline, Reading, Prompts)
- **Prompts** — fetched from `/api/prompts` on palette open
- **Reading** — fetched from `/api/reading` on palette open
- **Actions** — copy email, open GitHub, open social links

Triggered by `Cmd/Ctrl+K`. Uses a `useEffect` listener on `document` and renders into a portal with backdrop blur.

### 3e. About Page Overhaul

The about page was replaced with `task-file-view.tsx` — a terminal/code-editor aesthetic where life milestones are rendered as a fake task file with line numbers, strikethrough completed items, and inline comments (`// note`).

### 3f. SEO Foundation

- `app/og/route.tsx` — dynamic OG image generation using `@vercel/og` / Next.js ImageResponse. Renders a dark-card design with the page title.
- `app/sitemap.ts` — auto-generated sitemap including dynamic reading/prompt routes
- Per-route `metadata` exports with `title`, `description`, `openGraph`, `twitter` fields
- `metadataBase` set to production URL

### 3g. DESIGN_SYSTEM.md

A living design contract was committed alongside the code. It documents every gradient token, color variable, animation spec, and component pattern used across the site — so future changes stay consistent without guessing.

---

## 4. About Page: Notebook Redesign (May 25 2026)

`app/about/page.tsx` grew by ~1,000 lines in a single commit.

The about page became a **physical notebook aesthetic** — white/cream paper background, fountain pen serif fonts, handwritten-style annotations, red ink callouts, and diagonal sticky notes. It uses a split layout:

- **Left column:** A mini "newspaper" index of clickable sections
- **Right column:** The active section content, animated in with `AnimatePresence`

Sections include:
- Philosophy (Build → Learn → Iterate)
- RAG project highlight (Food Recipes bot)
- Timeline snapshot
- Cross-domain connections (how different disciplines informed each other)

The interactive model: clicking a row in the left column sets `activeId` state, which triggers the right panel to swap content with a spring animation. It deliberately looks like a handwritten notebook — not a standard dark-theme component page.

---

## 5. Home Page Polish + OG Fix (May 28 2026)

- **`metadataBase`** was missing, causing broken OG image URLs when the page was shared on Twitter/Discord. Fixed by setting it to `https://kawas.netlify.app` in `app/layout.tsx`.
- **Hero CTA** — a primary button was added above the social icon row to give visitors a clear action path.
- **Hero copy** — updated to sharper, more direct language.
- **Project card descriptions** — each card on the home page got a one-line summary (previously the cards showed title + year only).
- **Reading preview** — the home page now shows a "Currently Reading" section that surfaces items with `status: reading` or `status: discussing` from the MDX layer, up to 3 items, with the pulsing dot badge.

---

## 6. Work Page Extraction + Reading UI (May 29 2026)

**Problem:** `app/work/page.tsx` had grown to 286 lines with all project data and rendering logic inside one file.

**Refactor:** Extracted into `components/work-content.tsx`. The page file became a thin shell — just a `<WorkContent />` import. This is the standard Next.js App Router pattern: page files own metadata + data fetching, components own rendering.

Same refactor applied to reading UI — `reading-list.tsx` cleaned up.

**Favicon** — `public/icon.svg` was updated to the final design.

---

## 7. Project Consolidation + Navigation (May 29 2026)

**Use case discovered:** The work page had two separate project entries for the same product — "Food Waste Chatbot" and "Chat Cooking" — listed as separate cards because they were different GitHub repos from different learning phases.

**Decision:** Merge into a single **"Food Recipes bot"** entry. The deployed Hugging Face Space (`chat-cooking`) became the canonical version with:
- GitHub link → `github.com/kawas8516/chat-cooking`
- Live demo link → `huggingface.co/spaces/kawas8516/chat-cooking` (ExternalLink icon)

Updated across **6 files:** work-content, projects-section, task-file-view, about page (6 references), and DESIGN_SYSTEM.md.

**Navigation UX:** Home page cards had `cursor-pointer` and hover animations but were not actually clickable — they were `<div>` elements with no `href`. Fixed by wrapping each card's inner container in a Next.js `<Link>`:
- Project cards → `/work`
- Experience cards → `/timeline`

Framer Motion stays on the outer `motion.div` so all entrance/hover animations are untouched.

---

## Architecture Snapshot (current state)

```
app/
  page.tsx                   ← home, assembles section components
  layout.tsx                 ← root layout, metadata, theme
  about/page.tsx             ← notebook-style interactive about
  work/page.tsx              ← thin shell → <WorkContent />
  timeline/page.tsx          ← full timeline, all inline
  reading/page.tsx           ← thin shell → <ReadingList />
  prompts/page.tsx           ← thin shell → <PromptFilter />
  prompts/[slug]/page.tsx    ← MDX detail page
  og/route.tsx               ← dynamic OG image
  api/reading/route.ts       ← JSON endpoint for ⌘K palette
  api/prompts/route.ts       ← JSON endpoint for ⌘K palette
  sitemap.ts                 ← auto-generated sitemap

components/
  hero-section.tsx           ← landing hero, CTA, social links
  projects-section.tsx       ← home project cards → /work
  experience-section.tsx     ← home experience cards → /timeline
  work-content.tsx           ← full project list with GitHub + demo links
  reading-list.tsx           ← categorized reading cards
  command-palette.tsx        ← ⌘K palette
  task-file-view.tsx         ← about page terminal view
  navbar.tsx                 ← top nav with search pill
  footer.tsx
  code-block.tsx             ← syntax highlighted prompt blocks

content/
  reading/*.mdx              ← one file per paper/book
  prompts/*.mdx              ← one file per prompt

lib/
  content.ts                 ← MDX parsing + content API
```

---

## Key Patterns Used

**Animation contract** — every interactive card uses the same Framer Motion spec:
```ts
initial={{ opacity: 0, scale: 0.9 }}
whileInView={{ opacity: 1, scale: 1 }}
viewport={{ once: true }}
whileHover={{ scale: 1.03, y: -4 }}
```
Changing this in one place was considered but rejected — the consistency is intentional.

**Link-over-div** — navigable cards are `<Link>` wrapping the visual container, not `<div onClick>`. This gives free keyboard navigation, right-click → open in new tab, and correct semantics.

**Content via MDX, not arrays** — anything that will grow over time (reading list, prompts) lives in `.mdx` files. Anything that is stable product data (project list, skills) lives as typed arrays in component files.

**DESIGN_SYSTEM.md as source of truth** — every gradient token, color pair, and animation value is documented. New components reference it instead of inventing new values.

---

## Deployments

- **Primary:** Netlify (`kawas.netlify.app`) — used as `metadataBase` for OG images
- **AI demo:** Hugging Face Spaces (`huggingface.co/spaces/kawas8516/chat-cooking`) — the Food Recipes bot live deployment, linked directly from the work page
