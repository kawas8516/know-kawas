'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import type { ReadingItem } from '@/lib/content';

function StatusBadge({ status }: { status: ReadingItem['status'] }) {
  if (status === 'reading') {
    return (
      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary/15 text-primary">
        reading
      </span>
    );
  }
  return (
    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
      {status}
    </span>
  );
}

export function HomeContentSections({ readingItems }: { readingItems: ReadingItem[] }) {
  const prefersReducedMotion = useReducedMotion();

  if (!readingItems.length) return null;

  return (
    <section className="px-4 sm:px-6 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-foreground">Currently reading</span>
          <Link
            href="/reading"
            className="text-primary text-xs hover:underline inline-flex items-center gap-1"
          >
            reading list
            <motion.span
              whileHover={prefersReducedMotion ? {} : { x: 3 }}
              transition={{ duration: 0.15 }}
            >
              →
            </motion.span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {readingItems.map((item) => (
            <motion.div
              key={item.slug}
              whileHover={prefersReducedMotion ? {} : { x: 4 }}
            >
              <Link href="/reading">
                <div className="group flex gap-4 p-4 rounded-xl hover:bg-zinc-900/30 transition-colors">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center border border-blue-500/20 flex-shrink-0">
                    <BookOpen className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground leading-snug line-clamp-2">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.author}</p>
                    <div className="mt-1.5">
                      <StatusBadge status={item.status} />
                    </div>
                  </div>
                  <motion.span
                    className="ml-auto text-muted-foreground/0 group-hover:text-muted-foreground/50 transition-colors self-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    →
                  </motion.span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
