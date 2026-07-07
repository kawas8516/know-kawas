# Reading page — two targeted changes

## Context
This is a portfolio reading page. Do not change any visual styles, layout, spacing, colors, or fonts. Only make the two changes described below. Preserve all existing design system tokens and class names.

---

## Change 1 — Replace filter tab labels

Find the tab/filter bar that currently renders the options: **All, Papers, Books, Articles**

Replace those four labels (and their corresponding filter values/keys) with:

| Old label | New label | New filter value |
|-----------|-----------|-----------------|
| All       | All       | `all`            |
| Papers    | Reading   | `reading`        |
| Books     | Up next   | `up_next`        |
| Articles  | Done      | `done`           |

Update any `status` or `type` field on your reading items to use the new values (`reading`, `up_next`, `done`) instead of the old content-type values (`papers`, `books`, `articles`). If items use a `type` field for content type (paper/book/article) and a separate `status` field, add the `status` field and keep `type` untouched — the filter should now filter by `status`, not `type`.

Keep the active/selected styling, transition, and keyboard behavior exactly as-is.

---

## Change 2 — "Read notes →" hover label on cards with notes

Target: lines 159–167 (the reading item card component/element).

Add a `"Read notes →"` label that:

- **Appears only on hover** of a card where `hasContent === true` (or equivalent truthy field indicating the item has notes)
- **Does not appear** on cards where `hasContent` is false/undefined — those cards should have no hover affordance added
- **Styling**: inherit the card's existing secondary/muted text color and font size (do not introduce new color values). Position it at the bottom of the card, left-aligned, below the existing metadata row. Use `opacity: 0` → `opacity: 1` on parent hover (CSS transition preferred). No new layout shifts — use `visibility` + `opacity` or a reserved-height container so the card doesn't resize on hover.
- **Cursor**: `cursor: pointer` on the whole card when `hasContent === true`
- The label text is exactly: `Read notes →` (unicode arrow, not HTML entity)

---

## What NOT to change
- Do not touch card dimensions, border radius, accent colors, or type badge styles
- Do not change the featured section at the top
- Do not modify any other page, component, or file
- Do not add new dependencies
