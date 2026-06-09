'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, FileText, Book, Bookmark } from 'lucide-react';
import Link from 'next/link';
import type { ReadingItem } from '@/lib/content';

function StatusBadge({ status }: { status: ReadingItem['status'] }) {
  if (status === 'reading') {
    return (
      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary/15 text-primary inline-flex items-center gap-1">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
        </span>
        reading
      </span>
    );
  }
  if (status === 'discussing') {
    return (
      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-accent/15 text-accent inline-flex items-center gap-1">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
        </span>
        up next
      </span>
    );
  }
  return (
    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
      {status}
    </span>
  );
}

const typeCardConfig = {
  paper: {
    Icon: FileText,
    gradient: 'from-violet-500/20 to-purple-500/10',
    hoverGradient: 'group-hover:from-violet-500/30 group-hover:to-purple-500/20',
    border: 'border-violet-500/20',
    iconColor: 'text-violet-400',
  },
  book: {
    Icon: BookOpen,
    gradient: 'from-blue-500/20 to-cyan-500/10',
    hoverGradient: 'group-hover:from-blue-500/30 group-hover:to-cyan-500/20',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  other: {
    Icon: Bookmark,
    gradient: 'from-pink-500/20 to-rose-500/10',
    hoverGradient: 'group-hover:from-pink-500/30 group-hover:to-rose-500/20',
    border: 'border-pink-500/20',
    iconColor: 'text-pink-400',
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
    <span className="inline-flex items-center gap-1 text-[9px] font-medium uppercase tracking-widest text-muted-foreground/60 group-hover:text-muted-foreground/80 transition-colors">
      <Icon className="w-3 h-3" />
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
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, rotate: -2 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="px-4 sm:px-6 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">
            Currently reading
          </span>
          <div className="flex-1 h-px bg-border" />
          <Link
            href="/reading"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
          >
            Reading list →
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
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
                  prefersReducedMotion
                    ? {}
                    : {
                        y: -6,
                        rotate: 0.3,
                        transition: { type: 'spring', stiffness: 200, damping: 15 },
                      }
                }
              >
                <Link href={item.hasContent ? `/reading/${item.slug}` : '/reading'} className="block h-full">
                  <div className="group relative h-full flex flex-col p-4 rounded-xl bg-gradient-to-br from-muted/30 to-background border border-border/40 hover:border-border/80 hover:from-muted/50 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden">
                    {/* Animated background accent */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${cardCfg.gradient} opacity-0 group-hover:opacity-100`}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Icon */}
                    <div className={`relative z-10 w-12 h-12 rounded-lg bg-gradient-to-br ${cardCfg.gradient} flex items-center justify-center border ${cardCfg.border} mb-3 ${cardCfg.hoverGradient} transition-colors`}>
                      <motion.div
                        animate={prefersReducedMotion ? {} : { y: [0, -2, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.2 }}
                      >
                        <CardIcon className={`w-6 h-6 ${cardCfg.iconColor}`} />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between relative z-10">
                      <div className="mb-3">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <p className="font-semibold text-sm text-foreground leading-tight line-clamp-2 flex-1 group-hover:text-foreground/90 transition-colors">
                            {item.title}
                          </p>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{item.author}</p>
                          <TypeBadge type={item.type} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <StatusBadge status={item.status} />
                        {item.hasContent && (
                          <motion.span
                            className="text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors text-xs flex-shrink-0"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          >
                            Read notes →
                          </motion.span>
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
