'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

import { Diagram, DottedArrow, Ring, StepBadge, Stroke } from './manual';
import { BIKE_SHAPES, BIKE_VIEWBOX } from './bike-paths';

/**
 * Thirteen objects from the desk, each drawn as one page of an assembly manual.
 * No fills, no shading, no colour — see manual.tsx for the shared system.
 */

/* The signature object: hex key, flat-pack carton, one loose screw. */
export function AllenKeyKit({ size = 97 }: { size?: number }) {
  return (
    <Diagram size={size}>
      {/* flat-pack carton, seen slightly from the side */}
      <Stroke d="M14 46 L54 34 L86 44 L46 57 Z" />
      <Stroke d="M14 46 L14 60 L46 71 L46 57" delay={0.04} />
      <Stroke d="M46 71 L86 58 L86 44" delay={0.06} />
      {/* hex key */}
      <Stroke d="M20 22 L52 22 L52 30" delay={0.1} />
      {/* loose screw */}
      <Stroke d="M70 20 L70 30" delay={0.14} />
      <Stroke d="M66 20 L74 20" delay={0.16} />
      <DottedArrow d="M60 26 L70 34" head="M66 32 L70 34 L68 30" delay={0.18} />
    </Diagram>
  );
}

/**
 * The other half of the flat-pack signature: the instruction-sheet figure,
 * hex key in hand, consulting a step he does not fully believe.
 *
 * Pairs with AllenKeyKit. No wordmark and no logo — the figure and the manual
 * convention are the reference, not the brand.
 */
export function FlatPackFigure({ size = 97 }: { size?: number }) {
  return (
    <Diagram size={size}>
      {/* figure */}
      <Ring cx={28} cy={20} r={8} />
      <Stroke d="M28 28 V54" delay={0.04} />
      <Stroke d="M28 34 L14 44" delay={0.06} />
      <Stroke d="M28 34 L44 40" delay={0.07} />
      <Stroke d="M28 54 L18 78" delay={0.08} />
      <Stroke d="M28 54 L38 78" delay={0.09} />
      <Stroke d="M16 78 H22" delay={0.1} />
      <Stroke d="M36 78 H42" delay={0.1} />

      {/* hex key in the raised hand */}
      <Stroke d="M14 44 L6 40 L6 34" delay={0.12} />

      {/* the sheet */}
      <Stroke d="M50 30 H88 V72 H50 Z" delay={0.14} />
      <Stroke d="M56 38 H82" delay={0.16} />
      <Stroke d="M56 46 H74" delay={0.17} />
      <Stroke d="M56 56 H68 V66 H56 Z" delay={0.18} />
      <DottedArrow d="M72 58 L82 58" head="M79 55 L82 58 L79 61" delay={0.2} />

      {/* he is holding it */}
      <Stroke d="M44 40 L50 42" delay={0.22} />
      <StepBadge n={3} cx={84} cy={22} delay={0.24} />
    </Diagram>
  );
}

/* Raspberry Pi, exploded: the GPIO header floats off the board. */
export function PiBoard({ size = 97 }: { size?: number }) {
  return (
    <Diagram size={size}>
      {/* board */}
      <Stroke d="M12 44 H88 V82 H12 Z" />
      {/* SoC */}
      <Stroke d="M34 56 H54 V72 H34 Z" delay={0.05} />
      {/* ports along the right edge */}
      <Stroke d="M66 54 H84 V62 H66 Z" delay={0.08} />
      <Stroke d="M66 68 H84 V76 H66 Z" delay={0.1} />
      {/* mounting holes */}
      <Ring cx={18} cy={50} r={2} delay={0.12} />
      <Ring cx={18} cy={76} r={2} delay={0.13} />
      {/* GPIO header, lifted */}
      <Stroke d="M20 20 H72 V28 H20 Z" delay={0.14} />
      {Array.from({ length: 9 }).map((_, i) => (
        <Stroke key={i} d={`M${25 + i * 6} 22 V26`} delay={0.16 + i * 0.01} />
      ))}
      <DottedArrow d="M46 30 L46 42" head="M42 38 L46 42 L50 38" delay={0.22} />
      <StepBadge n={1} cx={84} cy={22} delay={0.24} />
    </Diagram>
  );
}

/* Control surface: knobs and faders, one knob caught mid-turn. */
export function ControlBoard({ size = 93 }: { size?: number }) {
  return (
    <Diagram size={size}>
      <Stroke d="M10 26 H90 V78 H10 Z" />
      {/* knobs */}
      <Ring cx={26} cy={42} r={8} delay={0.05} />
      <Stroke d="M26 42 L26 35" delay={0.08} />
      <Ring cx={50} cy={42} r={8} delay={0.06} />
      <Stroke d="M50 42 L55 37" delay={0.09} />
      <Ring cx={74} cy={42} r={8} delay={0.07} />
      <Stroke d="M74 42 L69 37" delay={0.1} />
      {/* the turn */}
      <DottedArrow d="M58 30 A12 12 0 0 1 66 28" head="M64 25 L67 28 L63 30" delay={0.14} />
      {/* faders */}
      <Stroke d="M22 58 H78" delay={0.16} />
      <Stroke d="M34 54 V62" delay={0.18} />
      <Stroke d="M22 68 H78" delay={0.19} />
      <Stroke d="M60 64 V72" delay={0.2} />
    </Diagram>
  );
}

/* A paper, exploded: the figure lifts off the page. */
export function PaperSheet({ size = 93 }: { size?: number }) {
  return (
    <Diagram size={size}>
      <Stroke d="M22 30 H78 V86 H22 Z" />
      {/* title */}
      <Stroke d="M30 40 H62" delay={0.05} />
      <Stroke d="M30 46 H50" delay={0.06} />
      {/* two columns of body text */}
      {Array.from({ length: 4 }).map((_, i) => (
        <Stroke key={`l${i}`} d={`M30 ${58 + i * 6} H46`} delay={0.08 + i * 0.01} />
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <Stroke key={`r${i}`} d={`M54 ${58 + i * 6} H70`} delay={0.1 + i * 0.01} />
      ))}
      {/* the figure, lifted off */}
      <Stroke d="M44 6 H78 V22 H44 Z" delay={0.16} />
      <Stroke d="M48 18 L56 11 L62 16 L70 9" delay={0.18} />
      <DottedArrow d="M52 24 L44 34" head="M44 30 L44 34 L48 33" delay={0.2} />
    </Diagram>
  );
}

/* Tablet with a paper sliding into it. */
export function Tablet({ size = 89 }: { size?: number }) {
  return (
    <Diagram size={size}>
      <Stroke d="M26 18 H76 A4 4 0 0 1 80 22 V84 A4 4 0 0 1 76 88 H26 A4 4 0 0 1 22 84 V22 A4 4 0 0 1 26 18 Z" />
      <Stroke d="M28 26 H74 V78 H28 Z" delay={0.06} />
      <Stroke d="M44 83 H58" delay={0.08} />
      {/* paper sliding in */}
      <Stroke d="M4 34 H24 V58 H4 Z" delay={0.1} />
      <Stroke d="M8 42 H20" delay={0.12} />
      <Stroke d="M8 48 H16" delay={0.13} />
      <DottedArrow d="M26 46 L38 46" head="M34 42 L38 46 L34 50" delay={0.15} />
      <StepBadge n={2} cx={88} cy={14} delay={0.18} />
    </Diagram>
  );
}

/* Classic iPod: screen, click wheel, one earbud trailing off. */
export function IPod({ size = 85 }: { size?: number }) {
  return (
    <Diagram size={size}>
      <Stroke d="M28 12 H72 A6 6 0 0 1 78 18 V82 A6 6 0 0 1 72 88 H28 A6 6 0 0 1 22 82 V18 A6 6 0 0 1 28 12 Z" />
      {/* screen */}
      <Stroke d="M30 20 H70 V46 H30 Z" delay={0.06} />
      <Stroke d="M34 28 H54" delay={0.08} />
      <Stroke d="M34 34 H48" delay={0.09} />
      {/* click wheel */}
      <Ring cx={50} cy={68} r={15} delay={0.11} />
      <Ring cx={50} cy={68} r={5} delay={0.13} />
      {/* headphone cable */}
      <Stroke d="M50 12 Q46 2 34 4" delay={0.15} />
      <Ring cx={31} cy={4} r={3} delay={0.17} />
    </Diagram>
  );
}

/**
 * Obsidian: the faceted shard inside its rounded-square tile. The reference
 * mark is already outline-only, so it drops straight into the manual language
 * with no translation — one weight, no fills, facets meeting at a single
 * off-centre point.
 */
export function ObsidianMark({ size = 89 }: { size?: number }) {
  return (
    <Diagram size={size} title="Obsidian">
      {/* tile */}
      <Stroke d="M26 10 H74 A16 16 0 0 1 90 26 V74 A16 16 0 0 1 74 90 H26 A16 16 0 0 1 10 74 V26 A16 16 0 0 1 26 10 Z" />

      {/* shard outline */}
      <Stroke
        d="M52 22 L68 40 L76 58 L64 76 L40 78 L28 62 L32 44 L44 30 Z"
        delay={0.06}
      />

      {/* facets */}
      <Stroke d="M52 22 L46 52" delay={0.12} />
      <Stroke d="M46 52 L32 44" delay={0.14} />
      <Stroke d="M46 52 L76 58" delay={0.16} />
      <Stroke d="M46 52 L38 58" delay={0.18} />
      <Stroke d="M38 58 L28 62" delay={0.19} />
      <Stroke d="M38 58 L40 78" delay={0.2} />
      <Stroke d="M46 52 L64 76" delay={0.22} />
    </Diagram>
  );
}

/* Folded broadsheet. */
export function Newspaper({ size = 93 }: { size?: number }) {
  return (
    <Diagram size={size}>
      <Stroke d="M10 26 H90 V76 H10 Z" />
      <Stroke d="M50 26 V76" delay={0.05} />
      <Stroke d="M16 34 H44" delay={0.07} />
      <Stroke d="M16 42 H38" delay={0.08} />
      <Stroke d="M16 52 H44" delay={0.09} />
      <Stroke d="M16 58 H40" delay={0.1} />
      <Stroke d="M16 64 H44" delay={0.11} />
      <Stroke d="M56 34 H84 V50 H56 Z" delay={0.12} />
      <Stroke d="M56 58 H84" delay={0.14} />
      <Stroke d="M56 64 H80" delay={0.15} />
    </Diagram>
  );
}

/**
 * The bike: a Meteor 350 in side profile, facing left, on its side stand.
 *
 * The shapes live in `bike-paths.ts` because a render harness consumes the same
 * array to rasterise the drawing for inspection. Drawing this blind is what
 * produced two unusable versions; tracing it against a reference and actually
 * looking at the output is what produced this one.
 */
export function Motorcycle({ size = 320 }: { size?: number }) {
  return (
    <Diagram size={size} viewBox={BIKE_VIEWBOX}>
      {BIKE_SHAPES.map((shape, i) =>
        'd' in shape ? (
          <Stroke key={i} d={shape.d} dashed={shape.dashed} delay={i * 0.003} />
        ) : (
          <Ring key={i} cx={shape.cx} cy={shape.cy} r={shape.r} delay={i * 0.003} />
        )
      )}
    </Diagram>
  );
}

/**
 * The transformer block, drawn as an exploded stack: tokens in at the bottom,
 * positional encoding added, multi-head attention with its heads visible,
 * residual paths running up the outside, feed-forward, and the Nx bracket
 * saying the whole thing repeats.
 */
export function TransformerBlock({ size = 97 }: { size?: number }) {
  return (
    <Diagram size={size}>
      {/* output, leaving the top */}
      <Stroke d="M50 18 V8" />
      <Stroke d="M46 12 L50 8 L54 12" delay={0.02} />

      {/* add and norm */}
      <Stroke d="M26 18 H74 V26 H26 Z" delay={0.04} />

      {/* feed forward */}
      <Stroke d="M26 30 H74 V44 H26 Z" delay={0.06} />
      <Stroke d="M34 37 H66" delay={0.08} />

      {/* add and norm */}
      <Stroke d="M26 48 H74 V56 H26 Z" delay={0.1} />

      {/* multi-head attention, heads drawn as parallel columns */}
      <Stroke d="M26 60 H74 V78 H26 Z" delay={0.12} />
      {[34, 42, 50, 58, 66].map((x, i) => (
        <Stroke key={`head${x}`} d={`M${x} 64 V74`} delay={0.14 + i * 0.01} />
      ))}

      {/* residual paths up both sides */}
      <Stroke d="M20 76 V52 H26" delay={0.2} dashed />
      <Stroke d="M80 76 V52 H74" delay={0.21} dashed />
      <Stroke d="M20 44 V22 H26" delay={0.22} dashed />

      {/* positional encoding, added in */}
      <Ring cx={50} cy={86} r={5} delay={0.24} />
      <Stroke d="M47 86 H53" delay={0.25} />
      <Stroke d="M50 83 V89" delay={0.25} />
      <Stroke d="M50 81 V78" delay={0.26} />
      <DottedArrow d="M64 86 H56" head="M59 83 L56 86 L59 89" delay={0.27} />

      {/* input tokens */}
      <Stroke d="M32 92 H40 V98 H32 Z" delay={0.28} />
      <Stroke d="M46 92 H54 V98 H46 Z" delay={0.29} />
      <Stroke d="M60 92 H68 V98 H60 Z" delay={0.3} />
      <Stroke d="M50 92 V90" delay={0.31} />

      {/* Nx bracket: the stack repeats */}
      <Stroke d="M14 20 H10 V80 H14" delay={0.32} />
      <text
        x={6}
        y={50}
        fontSize="9"
        stroke="none"
        fill="currentColor"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-mono"
      >
        N
      </text>
    </Diagram>
  );
}

/* Shuttlecock mid-flight, racket edge below. */
export function Shuttlecock({ size = 93 }: { size?: number }) {
  return (
    <Diagram size={size}>
      {/* cork */}
      <Stroke d="M30 26 A9 9 0 0 1 48 26" />
      <Stroke d="M30 26 L34 38" delay={0.04} />
      <Stroke d="M48 26 L44 38" delay={0.05} />
      {/* skirt */}
      <Stroke d="M34 38 L22 62" delay={0.07} />
      <Stroke d="M44 38 L56 62" delay={0.08} />
      <Stroke d="M22 62 L56 62" delay={0.1} />
      <Stroke d="M39 38 V62" delay={0.11} />
      <Stroke d="M31 44 L28 62" delay={0.12} />
      <Stroke d="M47 44 L50 62" delay={0.13} />
      {/* flight path + racket edge */}
      <DottedArrow d="M58 30 Q76 44 74 66" head="M70 62 L74 68 L78 63" delay={0.16} />
      <Stroke d="M12 86 A22 14 0 0 0 56 82" delay={0.2} />
    </Diagram>
  );
}

/**
 * Stickers hold their own colour in both themes.
 *
 * The manual diagrams are drawn in `currentColor` and flip with the canvas,
 * because line art has to. A sticker does not: a Hugging Face sticker is
 * yellow on a dark desk and yellow on a light one, and it stays readable
 * because of the white die-cut border, exactly like the real thing.
 *
 * Colours come from Tailwind's built-in scales, kept to the warm range so they
 * sit with the project's heat accent (no purple / blue / cyan, per PRODUCT.md).
 *
 * The one deliberate exception to DESIGN_SYSTEM.md's "no new hex in component
 * files": the three third-party brand marks below carry their real brand
 * values (Hugging Face yellow, Substack orange, X black). A brand mark in an
 * approximate colour is just wrong, and these are not theme tokens — they must
 * not move when the canvas does. Nothing else in this file uses a literal.
 */
function Sticker({
  children,
  cut,
  size,
  tilt,
  viewBox = '0 0 100 100',
  title,
}: {
  children: ReactNode;
  cut: string;
  size: number;
  tilt?: string;
  viewBox?: string;
  title?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      className={tilt}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      initial={reduce ? undefined : { opacity: 0, scale: 0.86 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {title && <title>{title}</title>}
      {/* die-cut border: the white edge that lets a fixed-colour sticker sit on either canvas */}
      <path d={cut} fill="#fff" stroke="#fff" strokeWidth={9} strokeLinejoin="round" />
      {children}
    </motion.svg>
  );
}

/**
 * Hugging Face, the official mark. Paths are the logo as published at
 * huggingface.co/front/assets/huggingface_logo-noborder.svg, unmodified and
 * unrecoloured, sitting on a white die-cut disc. It links to my Space.
 */
export function HuggingFaceMark({ size = 87 }: { size?: number }) {
  return (
    <Sticker
      size={size}
      title="Hugging Face"
      tilt="-rotate-3"
      viewBox="0 0 104 104"
      cut="M52 4 A48 48 0 1 1 52 100 A48 48 0 1 1 52 4 Z"
    >
      <g transform="translate(4.5, 8)">
        <path fill="#FFD21E" d="M47.21 76.5a34.75 34.75 0 1 0 0-69.5 34.75 34.75 0 0 0 0 69.5Z" />
        <path
          fill="#FF9D0B"
          d="M81.96 41.75a34.75 34.75 0 1 0-69.5 0 34.75 34.75 0 0 0 69.5 0Zm-73.5 0a38.75 38.75 0 1 1 77.5 0 38.75 38.75 0 0 1-77.5 0Z"
        />
        <path
          fill="#3A3B45"
          d="M58.5 32.3c1.28.44 1.78 3.06 3.07 2.38a5 5 0 1 0-6.76-2.07c.61 1.15 2.55-.72 3.7-.32ZM34.95 32.3c-1.28.44-1.79 3.06-3.07 2.38a5 5 0 1 1 6.76-2.07c-.61 1.15-2.56-.72-3.7-.32Z"
        />
        <path
          fill="#FF323D"
          d="M46.96 56.29c9.83 0 13-8.76 13-13.26 0-2.34-1.57-1.6-4.09-.36-2.33 1.15-5.46 2.74-8.9 2.74-7.19 0-13-6.88-13-2.38s3.16 13.26 13 13.26Z"
        />
        <path
          fill="#3A3B45"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M39.43 54a8.7 8.7 0 0 1 5.3-4.49c.4-.12.81.57 1.24 1.28.4.68.82 1.37 1.24 1.37.45 0 .9-.68 1.33-1.35.45-.7.89-1.38 1.32-1.25a8.61 8.61 0 0 1 5 4.17c3.73-2.94 5.1-7.74 5.1-10.7 0-2.34-1.57-1.6-4.09-.36l-.14.07c-2.31 1.15-5.39 2.67-8.77 2.67s-6.45-1.52-8.77-2.67c-2.6-1.29-4.23-2.1-4.23.29 0 3.05 1.46 8.06 5.47 10.97Z"
        />
        <path
          fill="#FF9D0B"
          d="M70.71 37a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5ZM24.21 37a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5ZM17.52 48c-1.62 0-3.06.66-4.07 1.87a5.97 5.97 0 0 0-1.33 3.76 7.1 7.1 0 0 0-1.94-.3c-1.55 0-2.95.59-3.94 1.66a5.8 5.8 0 0 0-.8 7 5.3 5.3 0 0 0-1.79 2.82c-.24.9-.48 2.8.8 4.74a5.22 5.22 0 0 0-.37 5.02c1.02 2.32 3.57 4.14 8.52 6.1 3.07 1.22 5.89 2 5.91 2.01a44.33 44.33 0 0 0 10.93 1.6c5.86 0 10.05-1.8 12.46-5.34 3.88-5.69 3.33-10.9-1.7-15.92-2.77-2.78-4.62-6.87-5-7.77-.78-2.66-2.84-5.62-6.25-5.62a5.7 5.7 0 0 0-4.6 2.46c-1-1.26-1.98-2.25-2.86-2.82A7.4 7.4 0 0 0 17.52 48Zm0 4c.51 0 1.14.22 1.82.65 2.14 1.36 6.25 8.43 7.76 11.18.5.92 1.37 1.31 2.14 1.31 1.55 0 2.75-1.53.15-3.48-3.92-2.93-2.55-7.72-.68-8.01.08-.02.17-.02.24-.02 1.7 0 2.45 2.93 2.45 2.93s2.2 5.52 5.98 9.3c3.77 3.77 3.97 6.8 1.22 10.83-1.88 2.75-5.47 3.58-9.16 3.58-3.81 0-7.73-.9-9.92-1.46-.11-.03-13.45-3.8-11.76-7 .28-.54.75-.76 1.34-.76 2.38 0 6.7 3.54 8.57 3.54.41 0 .7-.17.83-.6.79-2.85-12.06-4.05-10.98-8.17.2-.73.71-1.02 1.44-1.02 3.14 0 10.2 5.53 11.68 5.53.11 0 .2-.03.24-.1.74-1.2.33-2.04-4.9-5.2-5.21-3.16-8.88-5.06-6.8-7.33.24-.26.58-.38 1-.38 3.17 0 10.66 6.82 10.66 6.82s2.02 2.1 3.25 2.1c.28 0 .52-.1.68-.38.86-1.46-8.06-8.22-8.56-11.01-.34-1.9.24-2.85 1.31-2.85Z"
        />
        <path
          fill="#FFD21E"
          d="M38.6 76.69c2.75-4.04 2.55-7.07-1.22-10.84-3.78-3.77-5.98-9.3-5.98-9.3s-.82-3.2-2.69-2.9c-1.87.3-3.24 5.08.68 8.01 3.91 2.93-.78 4.92-2.29 2.17-1.5-2.75-5.62-9.82-7.76-11.18-2.13-1.35-3.63-.6-3.13 2.2.5 2.79 9.43 9.55 8.56 11-.87 1.47-3.93-1.71-3.93-1.71s-9.57-8.71-11.66-6.44c-2.08 2.27 1.59 4.17 6.8 7.33 5.23 3.16 5.64 4 4.9 5.2-.75 1.2-12.28-8.53-13.36-4.4-1.08 4.11 11.77 5.3 10.98 8.15-.8 2.85-9.06-5.38-10.74-2.18-1.7 3.21 11.65 6.98 11.76 7.01 4.3 1.12 15.25 3.49 19.08-2.12Z"
        />
        <path
          fill="#FF9D0B"
          d="M77.4 48c1.62 0 3.07.66 4.07 1.87a5.97 5.97 0 0 1 1.33 3.76 7.1 7.1 0 0 1 1.95-.3c1.55 0 2.95.59 3.94 1.66a5.8 5.8 0 0 1 .8 7 5.3 5.3 0 0 1 1.78 2.82c.24.9.48 2.8-.8 4.74a5.22 5.22 0 0 1 .37 5.02c-1.02 2.32-3.57 4.14-8.51 6.1-3.08 1.22-5.9 2-5.92 2.01a44.33 44.33 0 0 1-10.93 1.6c-5.86 0-10.05-1.8-12.46-5.34-3.88-5.69-3.33-10.9 1.7-15.92 2.78-2.78 4.63-6.87 5.01-7.77.78-2.66 2.83-5.62 6.24-5.62a5.7 5.7 0 0 1 4.6 2.46c1-1.26 1.98-2.25 2.87-2.82A7.4 7.4 0 0 1 77.4 48Zm0 4c-.51 0-1.13.22-1.82.65-2.13 1.36-6.25 8.43-7.76 11.18a2.43 2.43 0 0 1-2.14 1.31c-1.54 0-2.75-1.53-.14-3.48 3.91-2.93 2.54-7.72.67-8.01a1.54 1.54 0 0 0-.24-.02c-1.7 0-2.45 2.93-2.45 2.93s-2.2 5.52-5.97 9.3c-3.78 3.77-3.98 6.8-1.22 10.83 1.87 2.75 5.47 3.58 9.15 3.58 3.82 0 7.73-.9 9.93-1.46.1-.03 13.45-3.8 11.76-7-.29-.54-.75-.76-1.34-.76-2.38 0-6.71 3.54-8.57 3.54-.42 0-.71-.17-.83-.6-.8-2.85 12.05-4.05 10.97-8.17-.19-.73-.7-1.02-1.44-1.02-3.14 0-10.2 5.53-11.68 5.53-.1 0-.19-.03-.23-.1-.74-1.2-.34-2.04 4.88-5.2 5.23-3.16 8.9-5.06 6.8-7.33-.23-.26-.57-.38-.98-.38-3.18 0-10.67 6.82-10.67 6.82s-2.02 2.1-3.24 2.1a.74.74 0 0 1-.68-.38c-.87-1.46 8.05-8.22 8.55-11.01.34-1.9-.24-2.85-1.31-2.85Z"
        />
        <path
          fill="#FFD21E"
          d="M56.33 76.69c-2.75-4.04-2.56-7.07 1.22-10.84 3.77-3.77 5.97-9.3 5.97-9.3s.82-3.2 2.7-2.9c1.86.3 3.23 5.08-.68 8.01-3.92 2.93.78 4.92 2.28 2.17 1.51-2.75 5.63-9.82 7.76-11.18 2.13-1.35 3.64-.6 3.13 2.2-.5 2.79-9.42 9.55-8.55 11 .86 1.47 3.92-1.71 3.92-1.71s9.58-8.71 11.66-6.44c2.08 2.27-1.58 4.17-6.8 7.33-5.23 3.16-5.63 4-4.9 5.2.75 1.2 12.28-8.53 13.36-4.4 1.08 4.11-11.76 5.3-10.97 8.15.8 2.85 9.05-5.38 10.74-2.18 1.69 3.21-11.65 6.98-11.76 7.01-4.31 1.12-15.26 3.49-19.08-2.12Z"
        />
      </g>
    </Sticker>
  );
}

/**
 * GitHub, two ways.
 *
 * `GithubOutline` is the manual-language version: the official mark's own
 * geometry, stroked rather than filled, so the Octocat reads as an outline
 * drawing alongside the tablet and the iPod. Deriving the outline from the
 * real path beats redrawing a cat by hand and getting it subtly wrong.
 */
export function GithubOutline({ size = 89 }: { size?: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="-1 -1 26 26"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.5}
      strokeLinejoin="round"
      role="img"
      initial={reduce ? undefined : 'hidden'}
      whileInView={reduce ? undefined : 'visible'}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
    >
      <title>GitHub</title>
      {reduce ? (
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      ) : (
        <motion.path
          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          variants={{ hidden: { pathLength: 0, opacity: 0.2 }, visible: { pathLength: 1, opacity: 1 } }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </motion.svg>
  );
}

/** The sticker version: the real mark in GitHub black on a white die-cut disc. */
export function GithubSticker({ size = 120 }: { size?: number }) {
  return (
    <Sticker
      size={size}
      title="GitHub"
      tilt="rotate-3"
      viewBox="0 0 104 104"
      cut="M52 6 A46 46 0 1 1 52 98 A46 46 0 1 1 52 6 Z"
    >
      <circle cx={52} cy={52} r={46} fill="#fff" />
      <g transform="translate(20, 20) scale(2.67)">
        <path fill="#181717" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </g>
    </Sticker>
  );
}

/* Substack, the official mark in Substack orange. */
export function SubstackMark({ size = 71 }: { size?: number }) {
  return (
    <Sticker
      size={size}
      title="Substack"
      tilt="rotate-6"
      cut="M24 20 H76 A6 6 0 0 1 82 26 V74 A6 6 0 0 1 76 80 H24 A6 6 0 0 1 18 74 V26 A6 6 0 0 1 24 20 Z"
    >
      <path
        d="M24 20 H76 A6 6 0 0 1 82 26 V74 A6 6 0 0 1 76 80 H24 A6 6 0 0 1 18 74 V26 A6 6 0 0 1 24 20 Z"
        fill="#fff"
      />
      <g transform="translate(29, 26) scale(1.8)">
        <path
          fill="#FF6719"
          d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"
        />
      </g>
    </Sticker>
  );
}

/* X, the official mark, white on black. */
export function XMark({ size = 69 }: { size?: number }) {
  return (
    <Sticker
      size={size}
      title="X"
      tilt="-rotate-6"
      cut="M26 22 H74 A8 8 0 0 1 82 30 V70 A8 8 0 0 1 74 78 H26 A8 8 0 0 1 18 70 V30 A8 8 0 0 1 26 22 Z"
    >
      <path
        d="M26 22 H74 A8 8 0 0 1 82 30 V70 A8 8 0 0 1 74 78 H26 A8 8 0 0 1 18 70 V30 A8 8 0 0 1 26 22 Z"
        fill="#000"
      />
      <g transform="translate(35, 37) scale(1.1)">
        <path
          fill="#fff"
          d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"
        />
      </g>
    </Sticker>
  );
}

/* Rocket, die-cut. */
export function RocketSticker({ size = 87 }: { size?: number }) {
  return (
    <Sticker
      size={size}
      tilt="rotate-6"
      cut="M50 8 Q78 26 78 56 Q78 82 50 92 Q22 82 22 56 Q22 26 50 8 Z"
    >
      <path
        d="M50 8 Q78 26 78 56 Q78 82 50 92 Q22 82 22 56 Q22 26 50 8 Z"
        className="fill-stone-100"
      />
      <path
        d="M50 20 Q62 36 62 56 L38 56 Q38 36 50 20 Z"
        className="fill-stone-200 stroke-stone-900"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <circle cx={50} cy={40} r={5} className="fill-white stroke-stone-900" strokeWidth={2.5} />
      <path
        d="M38 52 L28 68 L40 62 Z"
        className="fill-rose-500 stroke-stone-900"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <path
        d="M62 52 L72 68 L60 62 Z"
        className="fill-rose-500 stroke-stone-900"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <path
        d="M44 60 L50 80 L56 60 Z"
        className="fill-amber-500 stroke-stone-900"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
    </Sticker>
  );
}

/* Jacket and mic. Deliberately no face — this is an object, not a person. */
export function JacketMic({ size = 89 }: { size?: number }) {
  return (
    <Diagram size={size}>
      {/* shoulders and body */}
      <Stroke d="M28 34 L14 42 L20 56 L26 52 V86 H74 V52 L80 56 L86 42 L72 34" />
      {/* collar */}
      <Stroke d="M28 34 L50 50 L72 34" delay={0.08} />
      {/* lapels */}
      <Stroke d="M36 38 L50 56 L64 38" delay={0.1} />
      {/* zip */}
      <Stroke d="M50 56 V86" delay={0.12} />
      {/* mic */}
      <Stroke d="M16 12 A5 5 0 0 1 26 12 V22 A5 5 0 0 1 16 22 Z" delay={0.14} />
      <Stroke d="M21 27 V34" delay={0.16} />
      <Stroke d="M12 20 A9 9 0 0 0 30 20" delay={0.17} />
    </Diagram>
  );
}

/**
 * The two books are stickers, not diagrams: a real cover photograph inside a
 * thick white die-cut border, tilted, that scales up and straightens when you
 * point at it. They deliberately break the manual's stroke language — a
 * sticker stuck on the page reads as something the owner put there.
 *
 * Each cover keeps its own aspect ratio. The Javed Akhtar cover is square and
 * the Sharad Pawar cover is a tall portrait; forcing both into one frame would
 * crop the titles off the bottom.
 *
 * Set to false to fall back to the drawn covers (they are still below).
 */
const USE_COVER_IMAGES = true;

const COVERS = {
  khwab: { src: '/books/khawab-ke-gaon-mein.jpg', ratio: 1 },
  lokMazya: { src: '/books/lok-mazya-sangti.jpg', ratio: 1.58 },
} as const;

/**
 * The sticker shell: tilt, pop-in, and the pick-it-up hover — the cover scales
 * up and straightens, the same gesture the jacket sticker uses for its quote.
 * Scale is a transform, so nothing around it shifts.
 */
function BookSticker({
  title,
  src,
  ratio = 1.22,
  tilt,
  size,
  children,
}: {
  title: string;
  src?: string;
  ratio?: number;
  tilt: string;
  size: number;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const height = Math.round(size * ratio);

  return (
    <motion.div
      className={`relative ${tilt} rounded-md hover:z-10 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring`}
      style={{ width: size, height }}
      tabIndex={0}
      role="img"
      aria-label={title}
      initial={reduce ? undefined : { opacity: 0, scale: 0.86 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
      whileHover={reduce ? undefined : { scale: 1.35, rotate: 0 }}
      whileFocus={reduce ? undefined : { scale: 1.35, rotate: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {src ? (
        <span className="block h-full w-full rounded-md bg-white p-[3px]">
          <Image
            src={src}
            alt=""
            width={size}
            height={height}
            sizes={`${size}px`}
            className="h-full w-full rounded-sm object-cover"
          />
        </span>
      ) : (
        children
      )}
    </motion.div>
  );
}

/** The stand-in cover, drawn rather than photographed. */
function DrawnCover({
  lines,
  motif,
  cover,
  spine,
  ink,
  rule,
}: {
  lines: string[];
  motif: ReactNode;
  cover: string;
  spine: string;
  ink: string;
  rule: string;
}) {
  return (
    <svg viewBox="0 0 100 122" fill="none" className="h-full w-full" aria-hidden="true">
      {/* die-cut border */}
      <path
        d="M12 6 H82 A6 6 0 0 1 88 12 V104 A6 6 0 0 1 82 110 H12 A6 6 0 0 1 6 104 V12 A6 6 0 0 1 12 6 Z"
        className="fill-white stroke-white"
        strokeWidth={7}
        strokeLinejoin="round"
      />
      {/* cover */}
      <path
        d="M14 10 H80 A4 4 0 0 1 84 14 V102 A4 4 0 0 1 80 106 H14 A4 4 0 0 1 10 102 V14 A4 4 0 0 1 14 10 Z"
        className={cover}
      />
      {/* spine */}
      <path d="M14 10 H24 V106 H14 A4 4 0 0 1 10 102 V14 A4 4 0 0 1 14 10 Z" className={spine} />

      {motif}

      {/* title */}
      {lines.map((line, i) => (
        <text key={line} x={32} y={72 + i * 11} fontSize="8" className={`${ink} font-mono uppercase`}>
          {line}
        </text>
      ))}
      <path d={`M32 ${78 + lines.length * 11} H70`} className={rule} strokeWidth={2} />

      {/* peel corner */}
      <path
        d="M84 106 L64 106 Q80 100 84 84 Z"
        className="fill-white stroke-stone-300"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BookKhwabon({ size = 89 }: { size?: number }) {
  return (
    <BookSticker
      size={size}
      tilt="-rotate-6"
      title="Khwab ke gaon mein — Javed Akhtar"
      src={USE_COVER_IMAGES ? COVERS.khwab.src : undefined}
      ratio={COVERS.khwab.ratio}
    >
      <DrawnCover
        lines={['Khwabon', 'ke gaon', 'mein']}
        cover="fill-stone-800"
        spine="fill-stone-900"
        ink="fill-stone-100"
        rule="stroke-amber-300"
        motif={
          <g>
            {/* crescent over a village skyline */}
            <path d="M62 26 A11 11 0 1 1 62 46 A9 9 0 1 0 62 26 Z" className="fill-amber-300" />
            <path d="M32 54 H44 V42 L50 36 L56 42 V54 H70" className="fill-stone-600" />
            <path d="M32 54 H72" className="stroke-stone-500" strokeWidth={2} />
          </g>
        }
      />
    </BookSticker>
  );
}

export function BookLokMazya({ size = 89 }: { size?: number }) {
  return (
    <BookSticker
      size={size}
      tilt="rotate-3"
      title="Lok Majhe Sangati — Sharad Pawar"
      src={USE_COVER_IMAGES ? COVERS.lokMazya.src : undefined}
      ratio={COVERS.lokMazya.ratio}
    >
      <DrawnCover
        lines={['Lok mazya', 'sangti']}
        cover="fill-rose-800"
        spine="fill-rose-900"
        ink="fill-amber-50"
        rule="stroke-amber-200"
        motif={
          <g>
            {/* an oil lamp, folk-motif flat */}
            <path d="M38 46 Q50 34 62 46 Q50 52 38 46 Z" className="fill-amber-100" />
            <path d="M50 34 Q46 26 50 20 Q54 26 50 34 Z" className="fill-amber-400" />
            <path d="M34 52 H66" className="stroke-amber-200/70" strokeWidth={2} />
            <path d="M40 58 H60" className="stroke-amber-200/40" strokeWidth={2} />
          </g>
        }
      />
    </BookSticker>
  );
}

/**
 * The one object that is typed, not drawn.
 *
 * Block-element letterforms rather than a slash-and-underscore figlet: every
 * glyph closes at the same two-row height, so it reads as "arXiv" at 10px
 * instead of dissolving into punctuation.
 */
const ARXIV_ART = ['▄▀█ █▀█ ▀▄▀ █ █░█', '█▀█ █▀▄ █░█ █ ▀▄▀'].join('\n');

/**
 * The Anthropic wordmark, set in block-letter cells.
 *
 * The detail that makes it the mark rather than the plain word is the slanted
 * "I" — it reads P\C, not PIC — so that glyph is a diagonal pair of cells
 * while every other letter stays upright.
 */
const ANTHROPIC_ART = [
  '▄▀█ █▄░█ ▀█▀ █░█ █▀█ █▀█ █▀█ █░ █▀▀',
  '█▀█ █░▀█ ░█░ █▀█ █▀▄ █▄█ █▀▀ ░█ █▄▄',
].join('\n');

export function AnthropicAscii({ className }: { className?: string }) {
  return (
    <pre
      aria-hidden="true"
      className={`font-mono text-[7px] leading-[1.05] tracking-[0.02em] ${className ?? ''}`}
    >
      {ANTHROPIC_ART}
    </pre>
  );
}

export function ArxivAscii({ className }: { className?: string }) {
  return (
    <pre
      aria-hidden="true"
      className={`font-mono text-[10px] leading-[1.05] tracking-[0.02em] ${className ?? ''}`}
    >
      {ARXIV_ART}
    </pre>
  );
}
