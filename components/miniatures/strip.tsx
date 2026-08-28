'use client';

import {
  AllenKeyKit,
  ArxivAscii,
  HuggingFaceMark,
  PiBoard,
  Shuttlecock,
  SubstackMark,
} from './objects';

/**
 * Phone fallback. The scattered objects need gutter space that does not exist
 * at 375px, so below `lg` a single quiet row carries the same personality.
 */
export function MiniatureStrip() {
  return (
    <div className="mt-10 flex items-center gap-5 text-foreground/30 lg:hidden">
      <AllenKeyKit size={40} />
      <PiBoard size={40} />
      <HuggingFaceMark size={34} />
      <Shuttlecock size={36} />
      <SubstackMark size={30} />
      <ArxivAscii className="ml-auto" />
    </div>
  );
}
