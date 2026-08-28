'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
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
 */

type Placement = {
  key: string;
  /** % of page height */
  top: number;
  side: 'left' | 'right';
  /** px outside the text island's edge. Bigger = further into the margin. */
  gap: number;
  rotate: number;
  caption?: string;
  node: ReactNode;
  interactive?: boolean;
};

const PLACEMENTS: Placement[] = [
  // --- hero
  { key: 'newspaper', top: 3, side: 'left', gap: 24, rotate: -9, node: <Newspaper size={240} /> },
  { key: 'ipod', top: 6, side: 'right', gap: 16, rotate: 11, node: <IPod size={210} />, caption: '2007, still works' },
  { key: 'allen', top: 11, side: 'left', gap: 48, rotate: 7, node: <AllenKeyKit size={200} /> },
  { key: 'pi', top: 15, side: 'right', gap: 40, rotate: -5, node: <PiBoard size={230} /> },
  { key: 'flatpack', top: 20, side: 'left', gap: 12, rotate: -8, node: <FlatPackFigure size={195} /> },

  // --- the taped note
  {
    key: 'transformer',
    top: 24,
    side: 'right',
    gap: 28,
    rotate: 6,
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
    interactive: true,
    caption: 'hover him',
    node: <JensenSticker size={200} handwritten />,
  },
  { key: 'control', top: 33, side: 'right', gap: 52, rotate: -10, node: <ControlBoard size={205} /> },

  // --- reading
  { key: 'tablet', top: 38, side: 'left', gap: 20, rotate: 9, node: <Tablet size={220} /> },
  {
    key: 'arxiv',
    top: 42,
    side: 'right',
    gap: 32,
    rotate: 4,
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
  { key: 'book-khwab', top: 46, side: 'left', gap: 56, rotate: -12, interactive: true, node: <BookKhwabon size={150} /> },
  { key: 'paper', top: 51, side: 'right', gap: 18, rotate: -6, node: <PaperSheet size={215} /> },
  { key: 'book-lok', top: 55, side: 'left', gap: 30, rotate: 8, interactive: true, node: <BookLokMazya size={140} /> },

  // --- work
  { key: 'anthropic', top: 59, side: 'right', gap: 44, rotate: -4, node: <AnthropicAscii className="scale-[2.2]" /> },
  {
    key: 'github',
    top: 63,
    side: 'left',
    gap: 22,
    rotate: -9,
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
  { key: 'obsidian', top: 72, side: 'left', gap: 50, rotate: 5, node: <ObsidianMark size={200} /> },

  // --- the personal end of the desk
  { key: 'bike', top: 76, side: 'right', gap: 14, rotate: -3, node: <Motorcycle size={320} />, caption: 'weekends' },
  { key: 'shuttle', top: 82, side: 'left', gap: 10, rotate: -14, node: <Shuttlecock size={210} />, caption: 'weeknights' },

  // --- close
  { key: 'rocket', top: 88, side: 'right', gap: 46, rotate: 12, node: <RocketSticker size={140} /> },
  { key: 'substack', top: 92, side: 'left', gap: 34, rotate: -7, node: <SubstackMark size={120} /> },
  { key: 'x', top: 96, side: 'right', gap: 20, rotate: 6, node: <XMark size={110} /> },
];

export function ScatterField() {
  return (
    <div
      /* No z-index here on purpose: `z-0` would open a stacking context and trap
         the interactive objects behind the content sections that follow in the
         DOM. Decorative objects stay under the text by document order; the
         interactive ones lift themselves out with `z-30` below. */
      className="pointer-events-none absolute inset-0 hidden overflow-x-clip lg:block"
      aria-hidden={false}
    >
      {PLACEMENTS.map((p) => (
        <div
          key={p.key}
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
      ))}
    </div>
  );
}
