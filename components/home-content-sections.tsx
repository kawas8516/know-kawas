'use client';

import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { ReadingItem, Prompt } from '@/lib/content';

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

export function HomeContentSections({
  readingItems,
  promptItems,
}: {
  readingItems: ReadingItem[];
  promptItems: Prompt[];
}) {
  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl space-y-12">
        {/* ── Currently reading ── */}
        {readingItems.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground">Currently reading</span>
              <Link href="/reading" className="text-primary text-xs hover:underline">
                reading list →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {readingItems.map((item) => (
                <motion.div key={item.slug} whileHover={{ x: 4 }}>
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
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ── Prompts I actually use ── */}
        {promptItems.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground">Prompts I actually use</span>
              <Link href="/prompts" className="text-primary text-xs hover:underline">
                all prompts →
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {promptItems.map((prompt) => (
                <motion.div key={prompt.slug} whileHover={{ x: 4 }}>
                  <Link
                    href={`/prompts/${prompt.slug}`}
                    className="flex items-center justify-between hover:bg-zinc-900/30 p-3 rounded-xl transition-colors"
                  >
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="text-sm font-medium text-foreground truncate">{prompt.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{prompt.use_case}</p>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground flex-shrink-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
