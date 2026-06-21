'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, FileText, Book, Bookmark } from 'lucide-react';
import Link from 'next/link';
import type { ReadingItem } from '@/lib/content';

function StatusBadge({ status }: { status: ReadingItem['status'] }) {
  if (status === 'reading') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full
        bg-indigo-400/15 text-indigo-400 border border-indigo-400/25"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-400" />
        </span>
        reading
      </span>
    );
  }
  if (status === 'discussing') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full
        bg-purple-400/15 text-purple-400 border border-purple-400/25"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-400" />
        </span>
        up next
      </span>
    );
  }
  return (
    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full
      bg-white/20 dark:bg-white/[0.06] text-gray-500 dark:text-white/40
      border border-white/30 dark:border-white/[0.09]">
      {status}
    </span>
  );
}

const typeCardConfig = {
  paper: {
    Icon: FileText,
    gradient: 'from-violet-400/30 to-purple-500/15',
    border: 'border-violet-400/30',
    iconColor: 'text-violet-400',
    blob: 'bg-violet-400/25',
  },
  book: {
    Icon: BookOpen,
    gradient: 'from-blue-400/30 to-cyan-500/15',
    border: 'border-blue-400/30',
    iconColor: 'text-blue-400',
    blob: 'bg-blue-400/25',
  },
  other: {
    Icon: Bookmark,
    gradient: 'from-pink-400/30 to-rose-500/15',
    border: 'border-pink-400/30',
    iconColor: 'text-pink-400',
    blob: 'bg-pink-400/25',
  },
} as const;

function getCardConfig(type: ReadingItem['type']) {
  if (type === 'paper') return typeCardConfig.paper;
  if (type === 'book') return typeCardConfig.book;
  return typeCardConfig.other;
}

function TypeBadge({ type }: { type: ReadingItem['type'] }) {
  const typeConfig = {
    paper: { label: 'PAPER', icon: FileText },
    book: { label: 'BOOK', icon: Book },
    article: { label: 'ARTICLE', icon: FileText },
  } as const;

  const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.paper;
  const Icon = config.icon;

  return (
    <span className="inline-flex items-center gap-1 text-[9px] font-medium uppercase tracking-widest text-gray-400 dark:text-white/35 group-hover:text-gray-600 dark:group-hover:text-white/55 transition-colors">
      <Icon className="w-2.5 h-2.5" />
      {config.label}
    </span>
  );
}

export function HomeContentSections({ readingItems }: { readingItems: ReadingItem[] }) {
  const prefersReducedMotion = useReducedMotion();

  if (!readingItems.length) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 90, damping: 14 },
    },
  };

  return (
    <section className="px-4 sm:px-6 py-10">
      <div className="mx-auto max-w-2xl">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[11px] font-medium uppercase tracking-widest text-gray-400 dark:text-white/40 whitespace-nowrap">
            Currently reading
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-white/40 dark:from-white/10 to-transparent" />
          <Link
            href="/reading"
            className="text-[11px] text-gray-400 dark:text-white/35 hover:text-gray-700 dark:hover:text-white/65 transition-colors whitespace-nowrap"
          >
            Reading list â†’
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {readingItems.map((item, index) => {
            const cardCfg = getCardConfig(item.type);
            const CardIcon = cardCfg.Icon;
            return (
              <motion.div
                key={item.slug}
                className="min-w-0"
                variants={cardVariants}
                whileHover={
                  prefersReducedMotion ? {} : {
                    y: -6,
                    transition: { type: 'spring', stiffness: 220, damping: 18 },
                  }
                }
              >
                <Link href={item.hasContent ? `/reading/${item.slug}` : '/reading'} className="block h-full">
                  <div className="group relative h-full flex flex-col p-4 rounded-2xl overflow-hidden">

                    {/* Per-card accent blob */}
                    <div
                      className={`pointer-events-none absolute -top-8 -right-8 w-28 h-28 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${cardCfg.blob}`}
                      aria-hidden="true"
                    />

                    {/* Glass surface */}
                    <div
                      className="absolute inset-0 rounded-2xl
                        bg-white/32 dark:bg-white/[0.05]
                        border border-white/55 dark:border-white/[0.08]
                        shadow-[0_3px_18px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.75)]
                        dark:shadow-[0_3px_22px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.06)]
                        group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.88)]
                        dark:group-hover:shadow-[0_8px_36px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.08)]
                        transition-shadow duration-300"
                      style={{ backdropFilter: 'blur(28px) saturate(180%) brightness(1.04)', WebkitBackdropFilter: 'blur(28px) saturate(180%) brightness(1.04)' }}
                    />

                    {/* Specular shimmer */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl
                        bg-gradient-to-r from-transparent via-white/65 to-transparent
                        dark:via-white/12 z-10"
                    />

                    {/* Icon */}
                    <div className="relative z-10 mb-3">
                      <div
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cardCfg.gradient} flex items-center justify-center border ${cardCfg.border} shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]`}
                        style={{ backdropFilter: 'blur(8px)' }}
                      >
                        <motion.div
                          animate={prefersReducedMotion ? {} : { y: [0, -2, 0] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                        >
                          <CardIcon className={`w-5 h-5 ${cardCfg.iconColor}`} />
                        </motion.div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between relative z-10">
                      <div className="mb-3">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white/90 leading-tight line-clamp-2 mb-1.5">
                          {item.title}
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs text-gray-500 dark:text-white/45 line-clamp-1">{item.author}</p>
                          <TypeBadge type={item.type} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <StatusBadge status={item.status} />
                        {item.hasContent && (
                          <span className="text-[10px] text-gray-400 dark:text-white/30 group-hover:text-gray-600 dark:group-hover:text-white/60 transition-colors flex-shrink-0">
                            Read notes â†’
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
