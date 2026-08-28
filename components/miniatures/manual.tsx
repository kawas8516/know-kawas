'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * The assembly-manual drawing system.
 *
 * Every miniature on /v2 is drawn as an IKEA-style instruction diagram: one
 * stroke weight, rounded caps, no fills, no shading. The consistency is what
 * makes twelve unrelated objects read as pages from the same manual.
 *
 * Colour never appears here — the parent sets a `text-*` token and the strokes
 * inherit it via currentColor, which keeps DESIGN_SYSTEM.md's "no new hex in
 * component files" rule intact and gets dual-theme support for free.
 */

const DRAW_DURATION = 0.28; // DESIGN_SYSTEM.md caps animations at 300ms
const DRAW_EASE = [0.22, 1, 0.36, 1] as const;

export function Diagram({
  children,
  size = 88,
  viewBox = '0 0 100 100',
  className,
  title,
}: {
  children: ReactNode;
  size?: number;
  viewBox?: string;
  className?: string;
  title?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      initial={reduce ? undefined : 'hidden'}
      whileInView={reduce ? undefined : 'visible'}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
    >
      {title && <title>{title}</title>}
      {children}
    </motion.svg>
  );
}

/** A stroked path that draws itself once when scrolled into view. */
export function Stroke({
  d,
  delay = 0,
  className,
  dashed = false,
}: {
  d: string;
  delay?: number;
  className?: string;
  dashed?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <path d={d} className={className} strokeDasharray={dashed ? '3 3' : undefined} />;
  }

  return (
    <motion.path
      d={d}
      className={className}
      strokeDasharray={dashed ? '3 3' : undefined}
      variants={{
        hidden: { pathLength: dashed ? 1 : 0, opacity: dashed ? 0 : 0.2 },
        visible: { pathLength: 1, opacity: 1 },
      }}
      transition={{ duration: DRAW_DURATION, delay, ease: DRAW_EASE }}
    />
  );
}

/** A stroked circle that draws itself once when scrolled into view. */
export function Ring({
  cx,
  cy,
  r,
  delay = 0,
  className,
}: {
  cx: number;
  cy: number;
  r: number;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <circle cx={cx} cy={cy} r={r} className={className} />;

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      className={className}
      variants={{
        hidden: { pathLength: 0, opacity: 0.2 },
        visible: { pathLength: 1, opacity: 1 },
      }}
      transition={{ duration: DRAW_DURATION, delay, ease: DRAW_EASE }}
    />
  );
}

/** The circled step number from an instruction sheet. Used sparingly. */
export function StepBadge({
  n,
  cx,
  cy,
  delay = 0,
}: {
  n: number;
  cx: number;
  cy: number;
  delay?: number;
}) {
  return (
    <g>
      <Ring cx={cx} cy={cy} r={7} delay={delay} />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="9"
        stroke="none"
        fill="currentColor"
        className="font-mono"
      >
        {n}
      </text>
    </g>
  );
}

/** The dotted "this part goes here" arrow. */
export function DottedArrow({
  d,
  head,
  delay = 0,
}: {
  d: string;
  head?: string;
  delay?: number;
}) {
  return (
    <g>
      <Stroke d={d} delay={delay} dashed />
      {head && <Stroke d={head} delay={delay + 0.05} />}
    </g>
  );
}
