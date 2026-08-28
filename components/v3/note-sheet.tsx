'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * The taped note.
 *
 * A sheet of graph paper stuck to the desk with a strip of black tape, tilted
 * a couple of degrees off true. The heading is set, the list is handwritten —
 * the same split the reference uses, and the same split the miniatures already
 * imply: printed diagram, human annotation.
 */

type Position = { id: string; title: string; body: string };

export function NoteSheet({ positions, lead }: { positions: Position[]; lead: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto max-w-[46rem] rotate-[-1.2deg]"
      initial={reduce ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* tape */}
      <div
        aria-hidden="true"
        className="absolute -top-4 left-10 h-9 w-28 rotate-[-8deg] bg-stone-900/85 dark:bg-stone-100/15"
        style={{ clipPath: 'polygon(2% 0, 100% 6%, 98% 100%, 0 94%)' }}
      />

      {/* sheet */}
      <div
        className="rounded-lg border border-stone-300/70 bg-stone-50 px-8 py-12 dark:border-stone-700/70 dark:bg-stone-900 sm:px-14"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(120,113,108,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,113,108,0.12) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      >
        <h2 className="font-display mx-auto max-w-[30rem] text-balance text-center text-2xl leading-snug text-foreground sm:text-3xl">
          {lead}
        </h2>

        <ol className="mt-10 space-y-8">
          {positions.map((p, i) => (
            <li key={p.id} className="grid grid-cols-[2rem_1fr] gap-x-2">
              <span
                className="text-xl text-foreground/70"
                style={{ fontFamily: 'var(--font-logo)' }}
              >
                {i + 1}.
              </span>
              <p
                className="text-pretty text-xl leading-[2] text-foreground/80"
                style={{ fontFamily: 'var(--font-logo)' }}
              >
                <span className="text-foreground">{p.title}:</span> {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}
