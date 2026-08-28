'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { JensenSticker } from './scatter';
import {
  AllenKeyKit,
  AnthropicAscii,
  ArxivAscii,
  BookKhwabon,
  BookLokMazya,
  ControlBoard,
  FlatPackFigure,
  GithubOutline,
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
} from './objects';

/**
 * One scatter field over the whole page rather than objects pinned inside each
 * section.
 *
 * Positions are a percentage of total page height, which is what makes this
 * safe: two objects on the same side are always several hundred pixels apart
 * no matter how the copy reflows, so nothing can collide the way hand-picked
 * per-section offsets could. Sides alternate down the page and the horizontal
 * inset varies object to object, so it reads as a scattered desk instead of
 * two tidy columns.
 *
 * Horizontal insets are two-tier: a tight value that fits the ~208px gutter at
 * `lg`, and a wider `xl:` value once the gutter opens up to ~336px. The bike is
 * 200px wide and cannot fit a 208px gutter at all, so it is `xl` and up only.
 *
 * Below `lg` the whole field is dropped — the gutters do not exist at that
 * width — and `MiniatureStrip` carries the personality on phones instead.
 */

type Placement = {
  key: string;
  top: number;
  side: 'left' | 'right';
  inset: string;
  node: ReactNode;
  interactive?: boolean;
  /** The bike is 200px wide and only fits the gutter from xl up. */
  xlOnly?: boolean;
};

const PLACEMENTS: Placement[] = [
  { key: 'allen', top: 2, side: 'right', inset: '-right-28 xl:-right-44', node: <AllenKeyKit /> },
  { key: 'ipod', top: 6, side: 'left', inset: '-left-28 xl:-left-44', node: <IPod /> },
  { key: 'obsidian', top: 11, side: 'right', inset: '-right-28 xl:-right-40', node: <ObsidianMark /> },
  { key: 'flatpack', top: 12, side: 'left', inset: '-left-32 xl:-left-48', node: <FlatPackFigure /> },
  { key: 'pi', top: 17, side: 'left', inset: '-left-28 xl:-left-52', node: <PiBoard /> },
  { key: 'transformer', top: 22, side: 'right', inset: '-right-30 xl:-right-48', node: <TransformerBlock /> },
  { key: 'paper', top: 27, side: 'left', inset: '-left-30 xl:-left-44', node: <PaperSheet /> },
  { key: 'control', top: 32, side: 'right', inset: '-right-28 xl:-right-40', node: <ControlBoard /> },
  {
    key: 'jacket',
    top: 37,
    side: 'left',
    inset: '-left-28 xl:-left-44',
    interactive: true,
    node: <JensenSticker />,
  },
  {
    key: 'arxiv',
    top: 42,
    side: 'right',
    inset: '-right-28 xl:-right-40',
    interactive: true,
    node: (
      <Link
        href="/reading"
        aria-label="Reading notes"
        className="block rounded text-foreground/45 transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <ArxivAscii />
      </Link>
    ),
  },
  { key: 'tablet', top: 46, side: 'left', inset: '-left-28 xl:-left-44', node: <Tablet /> },
  {
    key: 'book-khwab',
    top: 50,
    side: 'right',
    inset: '-right-28 xl:-right-44',
    interactive: true,
    node: <BookKhwabon />,
  },
  {
    key: 'book-lok',
    top: 55,
    side: 'left',
    inset: '-left-28 xl:-left-40',
    interactive: true,
    node: <BookLokMazya />,
  },
  { key: 'anthropic', top: 59, side: 'right', inset: '-right-44 xl:-right-52', node: <AnthropicAscii /> },
  {
    key: 'hf',
    top: 63,
    side: 'left',
    inset: '-left-28 xl:-left-44',
    interactive: true,
    node: (
      <a
        href="https://huggingface.co/spaces/kawas8516/chat-cooking"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Food Recipes Bot on Hugging Face Spaces"
        className="block rounded-lg transition-opacity duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <HuggingFaceMark />
      </a>
    ),
  },
  {
    key: 'github',
    top: 65,
    side: 'right',
    inset: '-right-28 xl:-right-40',
    interactive: true,
    node: (
      <a
        href="https://github.com/kawas8516"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className="block rounded-lg transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <GithubOutline />
      </a>
    ),
  },
  { key: 'newspaper', top: 68, side: 'right', inset: '-right-28 xl:-right-44', node: <Newspaper /> },
  { key: 'shuttle', top: 72, side: 'left', inset: '-left-28 xl:-left-48', node: <Shuttlecock /> },
  { key: 'bike', top: 78, side: 'right', inset: '-right-56', xlOnly: true, node: <Motorcycle /> },
  { key: 'rocket', top: 84, side: 'left', inset: '-left-28 xl:-left-40', node: <RocketSticker /> },
  { key: 'substack', top: 88, side: 'right', inset: '-right-28 xl:-right-36', node: <SubstackMark /> },
  { key: 'x', top: 93, side: 'left', inset: '-left-28 xl:-left-36', node: <XMark /> },
];

export function MiniatureField() {
  return (
    /* No z-index on the wrapper: it would trap the interactive objects behind
       the sections that follow in the DOM, killing their hover and clicks. */
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden={false}>
      {PLACEMENTS.map((p) => (
        <div
          key={p.key}
          className={`absolute ${p.inset} ${p.xlOnly ? 'hidden xl:block' : ''} ${
            p.interactive ? 'pointer-events-auto z-30' : 'pointer-events-none select-none'
          } text-foreground/40`}
          style={{ top: `${p.top}%` }}
        >
          {p.node}
        </div>
      ))}
    </div>
  );
}
