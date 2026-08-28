/**
 * The surface everything else sits on.
 *
 * Light: warm paper. Dark: a deep charcoal desk. Same grain over both, so the
 * page reads as a material rather than as a background colour — and so dark
 * stays first-class instead of being a cream page with the lights off
 * (PRODUCT.md principle 1, and its anti-reference to cream-by-default).
 *
 * Fixed and behind everything; it never scrolls, so the objects and text move
 * across it the way things move across a desk.
 */

/* Fractal noise, tiled. Inline so it costs no request and no new asset. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E\")";

export function DeskCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      {/* base material */}
      <div className="absolute inset-0 bg-stone-100 dark:bg-stone-950" />

      {/* warmth in light, depth in dark */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(255,247,237,0.9),rgba(245,240,232,0)_70%)] dark:bg-[radial-gradient(120%_90%_at_50%_0%,rgba(41,37,36,0.9),rgba(12,10,9,0)_70%)]" />

      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-multiply dark:opacity-[0.22] dark:mix-blend-screen"
        style={{ backgroundImage: GRAIN, backgroundRepeat: 'repeat' }}
      />

      {/* soft vignette so the edges settle */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_55%,rgba(120,113,108,0.14))] dark:bg-[radial-gradient(120%_120%_at_50%_50%,transparent_55%,rgba(0,0,0,0.45))]" />
    </div>
  );
}
