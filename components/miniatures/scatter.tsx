'use client';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { JacketMic } from './objects';


/**
 * A miniature that carries a note on hover.
 *
 * Same mechanics as the jacket: a hover-card on a real <button>, so it opens on
 * hover *and* on keyboard focus, with the note text also in the aria-label for
 * anyone who never sees the card. `handwritten` sets the note in the desk's own
 * hand rather than in mono.
 */
export function HoverNote({
  children,
  note,
  footnote,
  handwritten = false,
}: {
  children: React.ReactNode;
  note: string;
  footnote?: string;
  handwritten?: boolean;
}) {
  return (
    <HoverCard openDelay={80} closeDelay={80}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          aria-label={footnote ? `${note} — ${footnote}` : note}
          className="cursor-help rounded-lg text-foreground/45 transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {children}
        </button>
      </HoverCardTrigger>
      <HoverCardContent side="top" className={handwritten ? 'w-64' : 'w-56'}>
        {handwritten ? (
          <>
            <p
              className="text-xl leading-snug text-foreground"
              style={{ fontFamily: 'var(--font-logo)' }}
            >
              {note}
            </p>
            {footnote && <p className="mt-3 text-sm text-muted-foreground">{footnote}</p>}
          </>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-foreground">{note}</p>
            {footnote && (
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {footnote}
              </p>
            )}
          </>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}

/**
 * The one object with state. No face is drawn — it is a jacket and a mic.
 *
 * Written as reported speech, not as a verbatim quote, because the exact
 * wording is not verified here. If you have the real line, swap it in and put
 * it in quotation marks.
 */
const JENSEN_QUOTE = 'Says he does zero of his own shopping. Same.';
const JENSEN_ATTRIBUTION = 'on Jensen Huang and the jacket';

export function JensenSticker({
  size,
  handwritten = false,
}: {
  size?: number;
  /** Desk pages set this: the card is set in the page's own hand, not in mono. */
  handwritten?: boolean;
}) {
  if (!JENSEN_QUOTE) {
    return (
      <div className="text-foreground/35">
        <JacketMic size={size} />
      </div>
    );
  }

  return (
    <HoverCard openDelay={80} closeDelay={80}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          aria-label={`${JENSEN_QUOTE} — ${JENSEN_ATTRIBUTION}`}
          className="cursor-help rounded-lg text-foreground/45 transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <JacketMic size={size} />
        </button>
      </HoverCardTrigger>
      <HoverCardContent side="top" className={handwritten ? 'w-64' : 'w-56'}>
        {handwritten ? (
          <>
            <p
              className="text-xl leading-snug text-foreground"
              style={{ fontFamily: 'var(--font-logo)' }}
            >
              {JENSEN_QUOTE}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{JENSEN_ATTRIBUTION}</p>
          </>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-foreground">{JENSEN_QUOTE}</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {JENSEN_ATTRIBUTION}
            </p>
          </>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
