'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';
import Link from 'next/link';
import type { MotionValue } from 'framer-motion';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { DeskMotionProvider } from './desk-motion';
import { HoverNote, JensenSticker } from '@/components/miniatures/scatter';
import {
  AllenKeyKit,
  AnthropicAscii,
  ArxivAscii,
  BookKhwabon,
  BookLokMazya,
  ControlBoard,
  FlatPackFigure,
  GithubSticker,
  HuggingFaceMark,
  IPod,
  Motorcycle,
  Newspaper,
  ObsidianMark,
  PaperSheet,
  PiBoard,
  RocketSticker,
  Shuttlecock,
  SubstackMark,
  Tablet,
  TransformerBlock,
  XMark,
} from '@/components/miniatures/objects';

/**
 * The desk scatter.
 *
 * Objects are anchored to the **edge of the text island**, not to a percentage
 * of the viewport. A left object sets its `right` to `calc(50% + 20rem + gap)`,
 * so its right edge always lands just outside the 40rem island no matter how
 * wide the window is, and the object grows outward — bleeding off the screen on
 * narrow viewports, which is the look we want anyway.
 *
 * That is what makes overlap impossible rather than merely unlikely: the old
 * viewport-percentage version put the 380px bike at 18% of 1440px, which ran
 * 49px underneath the text, and was far worse at 1024px.
 *
 * `gap` is the only horizontal knob: how far outside the island edge the object
 * sits. Small values hug the text, large values push out toward the margin.
 * `top` stays a percentage of page height; same-side neighbours are >=8% apart.
 *
 * The array is the only knob. Nothing is positioned anywhere else.
 *
 * Motion is direction-aware. Scrolling up pushes every object outward toward
 * its own edge and fades it; scrolling down brings it back to its placed
 * position and lets it draw itself in again. One shared `away` value drives all
 * 22 objects, so there is a single scroll listener rather than 22.
 *
 * `depth` (0-1) scales the distance: big foreground objects travel most, small
 * marks barely at all, which is what reads as depth rather than as wallpaper
 * sliding.
 *
 * Only transforms and opacity are animated, so the field stays on the
 * compositor.
 */

/** How far an object retreats toward its own edge, at depth 1. */
const RETREAT_PX = 140;
/** Vertical parallax across the whole page, at depth 1. */
const DRIFT_PX = 60;
/** Ignore scroll jitter below this velocity so the direction does not flutter. */
const DIRECTION_THRESHOLD = 20;

type Placement = {
  key: string;
  /** % of page height */
  top: number;
  side: 'left' | 'right';
  /** px outside the text island's edge. Bigger = further into the margin. */
  gap: number;
  rotate: number;
  /** 0 pins the object to the page, 1 drifts the most. Follows size. */
  depth?: number;
  caption?: string;
  node: ReactNode;
  interactive?: boolean;
};

const PLACEMENTS: Placement[] = [
  // --- hero
  {
    key: 'newspaper',
    top: 3,
    side: 'left',
    gap: 24,
    rotate: -9,
    depth: 0.85,
    node: <Newspaper size={240} />,
  },
  {
    key: 'ipod',
    top: 6,
    side: 'right',
    gap: 16,
    rotate: 11,
    depth: 0.7,
    node: <IPod size={210} />,
    caption: '2007, still works',
  },
  {
    key: 'allen',
    top: 11,
    side: 'left',
    gap: 48,
    rotate: 7,
    depth: 0.6,
    node: <AllenKeyKit size={200} />,
  },
  {
    key: 'pi',
    top: 15,
    side: 'right',
    gap: 40,
    rotate: -5,
    depth: 0.8,
    node: <PiBoard size={230} />,
  },
  {
    key: 'flatpack',
    top: 20,
    side: 'left',
    gap: 12,
    rotate: -8,
    depth: 0.55,
    node: <FlatPackFigure size={195} />,
  },

  // --- the taped note
  {
    key: 'transformer',
    top: 24,
    side: 'right',
    gap: 28,
    rotate: 6,
    depth: 0.7,
    interactive: true,
    caption: 'hover me',
    node: (
      <HoverNote
        handwritten
        note="Every model you have talked to is this diagram, scaled up."
        footnote="Attention Is All You Need, 2017"
      >
        <TransformerBlock size={215} />
      </HoverNote>
    ),
  },
  {
    key: 'jacket',
    top: 29,
    side: 'left',
    gap: 36,
    rotate: -6,
    depth: 0.6,
    interactive: true,
    caption: 'hover him',
    node: <JensenSticker size={200} handwritten />,
  },
  {
    key: 'control',
    top: 33,
    side: 'right',
    gap: 52,
    rotate: -10,
    depth: 0.65,
    node: <ControlBoard size={205} />,
  },

  // --- reading
  {
    key: 'tablet',
    top: 38,
    side: 'left',
    gap: 20,
    rotate: 9,
    depth: 0.75,
    node: <Tablet size={220} />,
  },
  {
    key: 'arxiv',
    top: 42,
    side: 'right',
    gap: 32,
    rotate: 4,
    depth: 0.4,
    interactive: true,
    node: (
      <Link
        href="/reading"
        aria-label="Reading notes"
        className="block rounded transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <ArxivAscii className="scale-[2.6]" />
      </Link>
    ),
  },
  {
    key: 'book-khwab',
    top: 46,
    side: 'left',
    gap: 56,
    rotate: -12,
    depth: 0.45,
    interactive: true,
    node: <BookKhwabon size={150} />,
  },
  {
    key: 'paper',
    top: 51,
    side: 'right',
    gap: 18,
    rotate: -6,
    depth: 0.7,
    node: <PaperSheet size={215} />,
  },
  {
    key: 'book-lok',
    top: 55,
    side: 'left',
    gap: 30,
    rotate: 8,
    depth: 0.4,
    interactive: true,
    node: <BookLokMazya size={140} />,
  },

  // --- work
  {
    key: 'anthropic',
    top: 59,
    side: 'right',
    gap: 44,
    rotate: -4,
    depth: 0.35,
    node: <AnthropicAscii className="scale-[2.2]" />,
  },
  {
    key: 'github',
    top: 63,
    side: 'left',
    gap: 22,
    rotate: -9,
    depth: 0.45,
    interactive: true,
    caption: 'everything lives here',
    node: (
      <a
        href="https://github.com/kawas8516"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className="block rounded-full transition-opacity duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <GithubSticker size={150} />
      </a>
    ),
  },
  {
    key: 'hf',
    top: 67,
    side: 'right',
    gap: 26,
    rotate: 10,
    depth: 0.4,
    interactive: true,
    node: (
      <a
        href="https://huggingface.co/spaces/kawas8516/chat-cooking"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Food Recipes Bot on Hugging Face Spaces"
        className="block rounded-lg transition-opacity duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <HuggingFaceMark size={140} />
      </a>
    ),
  },
  {
    key: 'obsidian',
    top: 72,
    side: 'left',
    gap: 50,
    rotate: 5,
    depth: 0.6,
    node: <ObsidianMark size={200} />,
  },

  // --- the personal end of the desk
  {
    key: 'bike',
    top: 76,
    side: 'right',
    gap: 14,
    rotate: -3,
    depth: 1,
    node: <Motorcycle size={320} />,
    caption: 'weekends',
  },
  {
    key: 'shuttle',
    top: 82,
    side: 'left',
    gap: 10,
    rotate: -14,
    depth: 0.7,
    node: <Shuttlecock size={210} />,
    caption: 'weeknights',
  },

  // --- close
  {
    key: 'rocket',
    top: 88,
    side: 'right',
    gap: 46,
    rotate: 12,
    depth: 0.35,
    node: <RocketSticker size={140} />,
  },
  {
    key: 'substack',
    top: 92,
    side: 'left',
    gap: 34,
    rotate: -7,
    depth: 0.3,
    node: <SubstackMark size={120} />,
  },
  {
    key: 'x',
    top: 96,
    side: 'right',
    gap: 20,
    rotate: 6,
    depth: 0.25,
    node: <XMark size={110} />,
  },
];

/**
 * One object on the desk. Each needs its own component because `useTransform`
 * is a hook and cannot run inside a `.map()` callback.
 */
function DriftingObject({
  p,
  progress,
  away,
}: {
  p: Placement;
  progress: MotionValue<number>;
  away: MotionValue<number>;
}) {
  const depth = p.depth ?? 0.5;
  /* Negative pushes a left-hand object further left; positive pushes right. */
  const sideSign = p.side === 'left' ? -1 : 1;

  const y = useTransform(progress, [0, 1], [0, depth * -DRIFT_PX]);
  const rotate = useTransform(progress, [0, 1], [p.rotate, p.rotate + depth * 2.5]);
  const x = useTransform(away, [0, 1], [0, sideSign * depth * RETREAT_PX]);
  const opacity = useTransform(away, [0, 1], [1, 0.55]);

  return (
    <motion.div
      className={`absolute ${
        p.interactive
          ? 'pointer-events-auto z-30 text-foreground/40'
          : 'pointer-events-none select-none text-foreground/25'
      }`}
      style={{
        top: `${p.top}%`,
        [p.side === 'left' ? 'right' : 'left']: `calc(50% + 20rem + ${p.gap}px)`,
        x,
        y,
        rotate,
        opacity,
      }}
    >
      {p.node}
      {p.caption && (
        <p
          className="mt-2 whitespace-nowrap text-center text-lg text-foreground/35"
          style={{ fontFamily: 'var(--font-logo)' }}
        >
          {p.caption}
        </p>
      )}
    </motion.div>
  );
}

/** Reduced motion: exactly where the objects sit today, and no scroll listener. */
function StaticObject({ p }: { p: Placement }) {
  return (
    <div
      className={`absolute ${
        p.interactive
          ? 'pointer-events-auto z-30 text-foreground/40'
          : 'pointer-events-none select-none text-foreground/25'
      }`}
      style={{
        top: `${p.top}%`,
        [p.side === 'left' ? 'right' : 'left']: `calc(50% + 20rem + ${p.gap}px)`,
        transform: `rotate(${p.rotate}deg)`,
      }}
    >
      {p.node}
      {p.caption && (
        <p
          className="mt-2 whitespace-nowrap text-center text-lg text-foreground/35"
          style={{ fontFamily: 'var(--font-logo)' }}
        >
          {p.caption}
        </p>
      )}
    </div>
  );
}

export function ScatterField() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();

  /* Smoothed, so scroll jitter does not become object jitter. */
  const progress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.4,
  });

  /* 0 = objects sit where they were placed, 1 = retreated to their own edge.
     Driven by scroll direction, sprung so the flip glides instead of snapping. */
  const awayTarget = useSpring(0, { stiffness: 120, damping: 24, mass: 0.5 });
  const velocity = useVelocity(scrollY);

  useMotionValueEvent(velocity, 'change', (v) => {
    if (v < -DIRECTION_THRESHOLD) awayTarget.set(1);
    else if (v > DIRECTION_THRESHOLD) awayTarget.set(0);
  });

  return (
    <DeskMotionProvider value={{ replay: !reduce }}>
      <div
        ref={ref}
        /* No z-index here on purpose: `z-0` would open a stacking context and trap
         the interactive objects behind the content sections that follow in the
         DOM. Decorative objects stay under the text by document order; the
         interactive ones lift themselves out with `z-30` below. */
        className="pointer-events-none absolute inset-0 hidden overflow-x-clip lg:block"
        aria-hidden={false}
      >
        {PLACEMENTS.map((p) =>
          reduce ? (
            <StaticObject key={p.key} p={p} />
          ) : (
            <DriftingObject key={p.key} p={p} progress={progress} away={awayTarget} />
          ),
        )}
      </div>
    </DeskMotionProvider>
  );
}
