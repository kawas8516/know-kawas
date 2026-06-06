# Design System — know-kawas

## PROTECTED — DO NOT MODIFY
- `app/timeline/page.tsx` and all files it imports
- `app/work/page.tsx` and all files it imports
- `app/about/page.tsx` — REBUILT in PROMPT 4 (PENDING_TASKS.md). Not protected.
- `components/footer.tsx`
- All CSS custom properties in `app/globals.css`
- All font declarations in `app/globals.css` `@theme inline` block
- All existing gradient treatments documented below

---

## Token inventory (source of truth, copied from globals.css)

> The app is dark-mode only. `<html>` has `className="dark"` hardcoded in `app/layout.tsx`.
> `:root` and `.dark` are **identical** — no light-mode variant exists.

### Colors

| Variable | Value |
|---|---|
| `--background` | `oklch(0.07 0.005 270)` |
| `--foreground` | `oklch(0.98 0 0)` |
| `--card` | `oklch(0.12 0.01 270)` |
| `--card-foreground` | `oklch(0.98 0 0)` |
| `--popover` | `oklch(0.12 0.01 270)` |
| `--popover-foreground` | `oklch(0.98 0 0)` |
| `--primary` | `oklch(0.7 0.2 330)` — pink/magenta |
| `--primary-foreground` | `oklch(0.98 0 0)` |
| `--secondary` | `oklch(0.15 0.01 270)` |
| `--secondary-foreground` | `oklch(0.9 0 0)` |
| `--muted` | `oklch(0.2 0.01 270)` |
| `--muted-foreground` | `oklch(0.6 0 0)` |
| `--accent` | `oklch(0.6 0.2 250)` — blue/violet |
| `--accent-foreground` | `oklch(0.98 0 0)` |
| `--destructive` (light) | `oklch(0.577 0.245 27.325)` |
| `--destructive-foreground` (light) | `oklch(0.577 0.245 27.325)` |
| `--destructive` (dark) | `oklch(0.396 0.141 25.723)` |
| `--destructive-foreground` (dark) | `oklch(0.637 0.237 25.331)` |
| `--border` | `oklch(0.22 0.015 270)` |
| `--input` | `oklch(0.15 0.01 270)` |
| `--ring` | `oklch(0.6 0.15 270)` |
| `--chart-1` | `oklch(0.7 0.15 270)` |
| `--chart-2` | `oklch(0.6 0.2 250)` |
| `--chart-3` | `oklch(0.55 0.18 200)` |
| `--chart-4` | `oklch(0.65 0.12 300)` |
| `--chart-5` | `oklch(0.7 0.1 220)` |

### Sidebar tokens

| Variable | Value |
|---|---|
| `--sidebar` | `oklch(0.1 0.01 270)` |
| `--sidebar-foreground` | `oklch(0.95 0 0)` |
| `--sidebar-primary` | `oklch(0.7 0.15 270)` |
| `--sidebar-primary-foreground` | `oklch(0.98 0 0)` |
| `--sidebar-accent` | `oklch(0.18 0.02 270)` |
| `--sidebar-accent-foreground` | `oklch(0.9 0 0)` |
| `--sidebar-border` | `oklch(0.25 0.02 270)` |
| `--sidebar-ring` | `oklch(0.6 0.15 270)` |

### Radius

| Variable | Value |
|---|---|
| `--radius` | `1rem` |
| `--radius-sm` | `calc(1rem - 4px)` = 12px |
| `--radius-md` | `calc(1rem - 2px)` = 14px |
| `--radius-lg` | `1rem` = 16px |
| `--radius-xl` | `calc(1rem + 4px)` = 20px |

### Scrollbar & selection (non-variable, in globals.css)

| Property | Value |
|---|---|
| Scrollbar width | `6px` |
| Scrollbar thumb | `oklch(0.25 0.02 270)` |
| Scrollbar thumb:hover | `oklch(0.35 0.03 270)` |
| `::selection` bg | `oklch(0.5 0.15 330 / 0.4)` — pink/magenta tint |

### Fonts (`@theme inline` in globals.css)

| Variable | Value |
|---|---|
| `--font-sans` | `"Inter", "Inter Fallback", system-ui, sans-serif` |
| `--font-mono` | `"Geist Mono", "Geist Mono Fallback"` |

> **Note:** There are NO `next/font` imports in `app/layout.tsx`. Inter and Geist Mono are declared as string values in `@theme inline`. They are loaded via system fallbacks or a build-time mechanism not visible in source. Do NOT add `next/font` imports.

Special face declared in `globals.css`:
```css
@font-face {
  font-family: "Signature";
  src: local("Brush Script MT"), local("Segoe Script"), local("Comic Sans MS");
}
```

### Animation tokens (from `@theme inline`)

| Variable | Value |
|---|---|
| `--animate-accordion-down` | `accordion-down 0.2s ease-out` |
| `--animate-accordion-up` | `accordion-up 0.2s ease-out` |

---

## Gradients in use

### G1 — Heading text gradient (pink → purple → blue)
- **Value:** `bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent`
- **Applied in:**
  - `app/work/page.tsx:208` — page `<h1>Work</h1>`
  - `app/about/page.tsx:174` — page `<h1>About</h1>`
  - `app/timeline/page.tsx:269` — page `<h1>Timeline</h1>`
  - `components/navbar.tsx:53` — active link underline (h-[2px], rounded-full, no clip-text)
- **Canonical role:** Primary heading + nav accent gradient. Every new page `<h1>` must use this.

### G2 — Hero subtitle gradient (pink → purple → blue, lighter)
- **Value:** `bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent`
- **Applied in:**
  - `components/hero-section.tsx:26` — hero `<h2>` subtitle

### G3 — Logo gradient (violet → cyan)
- **Value:** `bg-gradient-to-r from-violet-500 to-cyan-500`
- **Applied in:**
  - `components/logo.tsx:50` — logo text

### G4 — Education text gradient (violet → cyan, lighter)
- **Value:** `bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent`
- **Applied in:**
  - `app/about/page.tsx:82` — inline university name emphasis

### G5 — Decorative hairline rules (transparent → zinc → transparent)
- **Right-side variant:** `bg-gradient-to-r from-transparent via-zinc-600 to-zinc-600`
- **Left-side variant:** `bg-gradient-to-l from-transparent via-zinc-600 to-zinc-600`
- **Lighter variant:** `from-transparent to-zinc-700` / `from-transparent to-zinc-700`
- **Applied in:**
  - `app/work/page.tsx:219,225` — header decorative lines (zinc-600 variant)
  - `app/about/page.tsx:182,187` — header decorative lines (zinc-700 variant)
  - `app/timeline/page.tsx:280,286` — header decorative lines (zinc-700 variant)
- **Canonical role:** Decorative separator beneath every page header. Pair two — one each side of the dot cluster.

### G6 — Footer divider
- **Value:** `bg-gradient-to-r from-transparent via-zinc-700 to-transparent`
- **Applied in:** `components/footer.tsx:19`

### G7 — Work/project icon box gradients (per-color, bg-gradient-to-br)
Each project icon uses a unique color pair at 20%/10% opacity:

| Project | Gradient classes | Border |
|---|---|---|
| Food Recipes bot | `from-emerald-500/20 to-green-500/10` | `border-emerald-500/20` |
| Java Task Scheduler | `from-orange-500/20 to-amber-500/10` | `border-orange-500/20` |
| CLI Utilities | `from-blue-500/20 to-cyan-500/10` | `border-blue-500/20` |
| Belleza | `from-pink-500/20 to-rose-500/10` | `border-pink-500/20` |
| Railway Reservation | `from-violet-500/20 to-purple-500/10` | `border-violet-500/20` |
| Shopping Cart | `from-cyan-500/20 to-teal-500/10` | `border-cyan-500/20` |

Container: `w-16 h-16 rounded-xl bg-gradient-to-br {colors} flex items-center justify-center border {border}`

### G8 — Skills/contact gradient (primary → accent)
- **Value:** `bg-gradient-to-r from-primary to-accent`
- **Applied in:**
  - `components/skills-section.tsx:85` — section heading text clip
  - `components/contact-section.tsx:37` — section heading text clip
  - `components/contact-section.tsx:159` — submit button background

### G9 — Timeline vertical line
- **Value:** `bg-gradient-to-b from-violet-500 via-purple-500 to-cyan-500`
- **Applied in:** `app/timeline/page.tsx:320` — the 1px vertical line
- **Glow layer:** `bg-gradient-to-b from-violet-500/20 via-purple-500/20 to-cyan-500/20 blur-sm` at `app/timeline/page.tsx:326`

### G10 — Timeline dot
- **Value:** `bg-gradient-to-br from-violet-500 to-cyan-500`
- **Applied in:** `app/timeline/page.tsx:345` — the pulsing dot

### G11 — Tech stack ambient glow
- **Value:** `bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl`
- **Applied in:** `components/tech-stack-float.tsx:28`

### G12 — Background ambient glows (blurred colored divs, not CSS gradients)
These are large blurred circles using Tailwind color utilities, not `linear-gradient()`:
- **Home page:** purple-600/20, blue-500/15, emerald-500/10, orange-500/10, pink-500/10
- **Work page:** purple-500/10, blue-500/10, emerald-500/10
- **About page:** purple-600/10, blue-600/10, emerald-600/8, orange-600/8

**New pages must replicate this ambient glow layer.** Use the same color set as Home (or Work).

---

## Typography

- **Sans:** Inter — `font-sans` via `--font-sans` — loaded as system/fallback (no `next/font` import)
- **Mono:** Geist Mono — `font-mono` via `--font-mono` — loaded as system/fallback (no `next/font` import)
- **Signature:** Local cursive fallback (`Brush Script MT`, `Segoe Script`, `Comic Sans MS`) — used sparingly if at all
- **No `next/font` imports exist.** Do not add them. If Geist Mono is unavailable at runtime, the system mono stack (`ui-monospace, 'SF Mono', Menlo, monospace`) will apply naturally.

---

## Component inventory (shadcn `components/ui/`)

| File | Component |
|---|---|
| `button.tsx` | Button |
| `input.tsx` | Input |
| `label.tsx` | Label |
| `textarea.tsx` | Textarea |

---

## Custom components present

| File | Purpose |
|---|---|
| `components/navbar.tsx` | Top navigation with logo + links + active gradient underline |
| `components/hero-section.tsx` | Landing hero with gradient subtitle |
| `components/tech-stack-section.tsx` | Tech icons section |
| `components/tech-stack-float.tsx` | Floating tech icon with ambient glow |
| `components/projects-section.tsx` | Project cards grid (Home page version) |
| `components/experience-section.tsx` | Experience list (Home page version) |
| `components/skills-section.tsx` | Skills category cards with gradient icon boxes |
| `components/contact-section.tsx` | Contact form with gradient button |
| `components/footer.tsx` | Footer with gradient divider |
| `components/logo.tsx` | Logo with violet→cyan gradient text |
| `components/theme-provider.tsx` | next-themes ThemeProvider wrapper |

---

## Existing routes

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Home landing — hero + tech stack + projects + experience, multi-color ambient glow background |
| `/about` | `app/about/page.tsx` | About — labelled text sections (What I Do, Current, Previously, Education, Certifications, Contact) |
| `/work` | `app/work/page.tsx` | Projects — horizontal list cards with gradient icon boxes, GitHub links |
| `/timeline` | `app/timeline/page.tsx` | Timeline — animated vertical line with category-colored event cards |

---

## DESIGN LAWS

### Color & gradient rules
- ALL colors via existing Tailwind classes referencing existing CSS variables (`bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, etc.)
- ALL gradients via the gradient patterns documented in **Gradients in use** above
- NEVER inline a hex, rgb, or oklch value in component code
- NEVER add a new CSS variable without explicit approval
- New page `<h1>` headings: use **G1** (pink→purple→blue clip-text)
- New page backgrounds: replicate the ambient glow layer from Home (**G12**) — never a flat `bg-background` with no glow
- Hairline decorative rules beneath headers: use **G5** pattern

### Typography rules
- `font-sans` (Inter) for all body and heading text
- `font-mono` (Geist Mono) for code, file paths, and `TaskFileView` content
- If Geist Mono is unavailable, the system mono stack applies automatically — do not add a new font import
- Type scale: `text-xs / sm / base / lg / xl / 2xl / 3xl / 4xl` from Tailwind defaults only. No arbitrary `text-[15px]`.

### Spacing rules
- Tailwind spacing utilities only. No arbitrary `p-[13px]`.
- Section spacing: `py-12` mobile / `py-16` desktop
- Card padding: `p-6` default, `p-4` compact / mobile
- Gaps: `gap-2`, `gap-3`, `gap-4`, `gap-6`, `gap-8`

### Radius rules
- Cards / buttons / badges: `rounded-xl` (matches `/work` cards and icon boxes)
- Small badges / tags: `rounded` (matches existing badge pattern in `/work`)
- Pills: `rounded-full`
- Code blocks: `rounded-md`

### Animation rules (framer-motion installed)
- Page entrance: `opacity 0→1`, `y 20→0`, `duration 0.5–0.6s`, easeOut (matches existing pages)
- List stagger: `staggerChildren: 0.1s` (matches `/work`)
- Work card hover: `whileHover={{ x: 4 }}` — translate X, NOT scale (canonical pattern from `/work`)
- ContentCard hover: `hover:bg-zinc-900/30` (matches `/work` row hover)
- Modal entrance: `opacity + scale 0.96→1`, `duration 0.2s`
- Theme toggle: icon cross-fade 0.2s via `AnimatePresence`
- Hard cap: 300ms. Respect `prefers-reduced-motion`.

### Interaction states
- Hover (list cards): `whileHover={{ x: 4 }}` + `hover:bg-zinc-900/30` — this is the canonical pattern
- Focus: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- Active (buttons): `scale-[0.98]`
- Disabled: `opacity-50 cursor-not-allowed pointer-events-none`
- Link hover: `text-zinc-500 hover:text-white transition-colors` (matches `/work` icon links)

### Icon rules
- `lucide-react` only
- Sizes: `size-4` inline / `size-5` standalone / `size-6` nav / `w-8 h-8` inside 64px icon boxes
- Color: `text-muted-foreground` default; `text-foreground` when emphasized; specific color per project card
- `aria-label` on icon-only buttons

### Layout rules
- Content pages container: `mx-auto max-w-2xl px-4 sm:px-6` (matches `/work`, `/about`, `/timeline`)
- Index/grid pages container: `mx-auto max-w-5xl px-4 sm:px-6`
- Page top padding: `pt-32 pb-20` (matches `/work`, `/about`)
- Mobile-first; verify at 375px width

### Forbidden patterns
- Marketing-speak: "passionate," "results-driven," "leverage," "synergy," "ecosystem," "cutting-edge," "world-class," "10x"
- Vulnerability framing in public copy: "catching up," "lagging behind," "Pandora's box," "I feel low"
- New fonts (including `next/font/google` imports)
- New CSS variables
- New hex/rgb/oklch values in component files
- Replacing or flattening existing gradients
- Modifying anything in the PROTECTED list
- `box-shadow` inline styles
- Layout-shifting hover effects (changing padding/margin on hover)
- Animations longer than 300ms
- `bg-zinc-950` as a background (use `bg-background` instead — `/about` uses it but is protected)

---

## Voice rules (applies to all copy on NEW pages)
- Allowed phrasing: "building toward," "going deep on," "current focus," "actively learning," "shipping"
- Anchor identity: "Backend dev with deep interest in the physical-AI era. Building, reading, shipping."
- Indian English cadence preserved; fix true typos only
- Forbidden: see Forbidden patterns above

---

## Component design specs

### ContentCard (used by /reading, /prompts indices)
- Match `/work` list card exactly: `flex gap-4 sm:gap-6 p-4 rounded-xl hover:bg-zinc-900/30 transition-colors`
- `whileHover={{ x: 4 }}` via framer-motion
- Internal structure: meta row (badges + date) → title → excerpt/note → language/tag pills
- Mobile: `p-4`. Desktop: `p-6`.
- Border: none (matches `/work` — no visible card border on list items)

### Badge (variants: status, type, model, tag)
- Base: `text-[10px] font-medium px-1.5 py-0.5 rounded` (matches `/work` badge pattern)
- `status="reading"`: `bg-primary/15 text-primary`
- `status="finished"`: `bg-muted text-muted-foreground`
- `status="abandoned"`: `opacity-70`
- `type="book"/"paper"/"essay"`: `bg-secondary text-secondary-foreground`
- `tag`: `bg-accent/20 text-accent-foreground`
- `model`: `bg-zinc-800/50 text-zinc-500` (matches language pills in `/work`)

### CodeBlock (used by /prompts detail)
- Container: `rounded-md border border-border bg-muted/50 overflow-hidden`
- Header bar: `flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30`
  - Left: file label `text-xs text-muted-foreground font-mono`
  - Right: copy button — lucide `Copy` → `Check` on success (1.5s), then revert
- Body: `font-mono text-sm leading-relaxed overflow-x-auto p-4`
- Syntax highlight: rehype-pretty-code + shiki, dark theme
- Copy success: `sonner toast.success("Copied")`

### TaskFileView (the PENDING_TASKS.md aesthetic — /about only)
- Wrapper: `rounded-xl border border-border bg-card/80 backdrop-blur-sm` — sits ON TOP of page background (which has ambient glows — do not flatten)
- Title bar: `flex items-center justify-between px-4 py-3 border-b border-border`
  - Left: `~/kawas/life/PENDING_TASKS.md` in `font-mono text-sm text-muted-foreground`
  - Right: `last modified <timestamp>` in `text-xs text-muted-foreground`
- Body: `font-mono text-sm leading-relaxed p-4`
- Section headers (`## DONE ✓` / `## IN_PROGRESS …` / `## BACKLOG`): `font-semibold mt-5 mb-2`
- Line items: `grid grid-cols-[2rem_1fr] gap-2` with CSS counter line numbers
- DONE items: `line-through opacity-55`
- `// comments`: `text-muted-foreground`
- `✓` symbol: success color (primary); `…`: muted; `//`: `text-muted-foreground/70`
- Priority tags `[P0]/[P1]/[P2]`: subtle inline badge, `text-[10px] px-1 py-0.5 rounded bg-muted text-muted-foreground`
- Closing commit line: `italic text-muted-foreground border-t border-border mt-4 pt-3`
- Mobile `<640px`: drop line numbers, reduce to `px-3`

### Reading sections (3 fixed: Papers, Books, Others)
- Section heading: `text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2`
  - Lucide icon (size-4) + label + `<hr className="flex-1 border-border ml-2" />`
- Within each: `flex flex-col gap-3` of ContentCards
- Status badge on every card
- All three sections visible in scroll order (no tabs)
- Section spacing: `space-y-12` between sections

### CommandPalette (cmdk)
- Trigger: small pill in header, `font-mono text-xs`, shows `⌘K` kbd hint
- Modal: `cmdk CommandDialog max-w-xl`, `backdrop-blur-sm` overlay
- Item: `flex items-center gap-3 px-3 py-2 rounded-md aria-selected:bg-accent`
- Groups order: Pages → Prompts → Reading → Actions
- Footer: keyboard hints `↑↓ navigate  ↵ select  esc close`

### ThemeToggle
- `size-9` icon button in header next to ⌘K pill
- lucide `Sun`/`Moon`, cross-fade via framer-motion `AnimatePresence` (0.2s)
- `aria-label` dynamic ("Switch to light mode" / "Switch to dark mode")

### PageHeader (all new pages)
- Eyebrow: `text-xs uppercase tracking-widest text-muted-foreground mb-2`
- H1: `text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent` (G1)
- Lede: `mt-3 text-sm sm:text-base text-zinc-400 max-w-md mx-auto leading-relaxed`
- Hairline rule block below lede: G5 pattern (left line + dot cluster + right line)
- Outer margin: `mb-16` (matches existing pages)
- All wrapped in `motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}` and `text-center`

---

## Build sequence (locked)

| Prompt | Scope |
|---|---|
| **PROMPT 1** | MDX foundation + `/content` scaffold |
| **PROMPT 1.5** | Seed content (reading + prompts only; no notes, no blog) |
| **PROMPT 2** | `/reading` (Papers/Books/Others) + `/prompts` (index + detail) |
| **PROMPT 4** | `/about` rewrite as PENDING_TASKS.md |
| **PROMPT 5** | ⌘K palette + theme toggle + Home copy rewrite + surface Reading/Prompts on Home |
| **PROMPT 6** | SEO, OG, sitemap, RSS (if applicable), Lighthouse pass |

PROMPT 3 (Blog) — REMOVED.  
PROMPT 5.5 (Experience) — REMOVED, page is protected.

---

## Quality bar
- Lighthouse: Performance 90+, A11y 95+, Best Practices 95+, SEO 95+
- No console errors, no hydration warnings
- Dark mode only — verify every new component in dark context
- 375px viewport verified on all new pages
- Keyboard navigation works on every interactive element
- No layout shift on hover (`x: 4` translation is safe; no padding/margin changes)
- All existing gradients preserved on new pages
