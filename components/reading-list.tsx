'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FileText, BookOpen, Bookmark } from 'lucide-react';
import Link from 'next/link';
import type { ReadingItem } from '@/lib/content';

// ─── sort ─────────────────────────────────────────────────────────────────────

const STATUS_ORDER: Record<ReadingItem['status'], number> = {
  discussing: 0,
  reading: 1,
  finished: 2,
  abandoned: 3,
};

function sortByStatus(items: ReadingItem[]): ReadingItem[] {
  return [...items].sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);
}

// ─── section config ───────────────────────────────────────────────────────────

type SectionType = 'paper' | 'book' | 'other';

const sectionConfig = {
  paper: {
    label: 'Papers',
    Icon: FileText,
    gradient: 'from-fuchsia-400/30 to-rose-500/15',
    border: 'border-fuchsia-400/30',
    iconColor: 'text-fuchsia-400',
    blob: 'bg-fuchsia-400/20',
  },
  book: {
    label: 'Books',
    Icon: BookOpen,
    gradient: 'from-emerald-400/30 to-teal-500/15',
    border: 'border-emerald-400/30',
    iconColor: 'text-emerald-400',
    blob: 'bg-emerald-400/20',
  },
  other: {
    label: 'Others',
    Icon: Bookmark,
    gradient: 'from-amber-400/30 to-orange-500/15',
    border: 'border-amber-400/30',
    iconColor: 'text-amber-500',
    blob: 'bg-amber-400/20',
  },
};

// ─── filter config ────────────────────────────────────────────────────────────

const STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'discussing', label: 'Up Next' },
  { value: 'reading', label: 'Reading' },
  { value: 'finished', label: 'Done' },
] as const;

const TYPE_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'paper', label: 'Papers' },
  { value: 'book', label: 'Books' },
  { value: 'other', label: 'Others' },
] as const;

// ─── badges ───────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ReadingItem['status'] }) {
  const base = 'text-[11px] font-medium px-2 py-0.5 rounded-full border';
  if (status === 'reading') {
    return (
      <span className={`${base} bg-fuchsia-400/15 text-fuchsia-500 dark:text-fuchsia-400 border-fuchsia-400/25`}>
        reading
      </span>
    );
  }
  if (status === 'discussing') {
    return (
      <span className={`${base} bg-amber-400/15 text-amber-600 dark:text-amber-400 border-amber-400/25`}>
        up next
      </span>
    );
  }
  if (status === 'finished') {
    return (
      <span className={`${base} bg-white/20 dark:bg-white/[0.06] text-gray-600 dark:text-white/65 border-white/30 dark:border-white/10`}>
        finished
      </span>
    );
  }
  if (status === 'abandoned') {
    return (
      <span className={`${base} bg-white/10 dark:bg-white/[0.04] text-gray-600 dark:text-white/60 border-white/20 dark:border-white/08 opacity-70`}>
        abandoned
      </span>
    );
  }
  return null;
}

// ─── card ─────────────────────────────────────────────────────────────────────

function ReadingCard({ item, sectionType }: { item: ReadingItem; sectionType: SectionType }) {
  const config = sectionConfig[sectionType];
  const { Icon } = config;

  const inner = (
    <div className={`group relative overflow-hidden rounded-2xl ${item.hasContent ? 'cursor-pointer' : ''}`}>
      {/* Per-card hover blob */}
      <div
        className={`pointer-events-none absolute -top-8 -right-8 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${config.blob}`}
        aria-hidden="true"
      />

      {/* Glass surface */}
      <div
        className="relative flex gap-4 sm:gap-5 p-4 rounded-2xl
          bg-white/30 dark:bg-white/[0.04]
          border border-white/55 dark:border-white/[0.07]
          shadow-[0_2px_16px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.75)]
          dark:shadow-[0_2px_20px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.05)]
          transition-shadow duration-300
          group-hover:shadow-[0_6px_28px_rgba(0,0,0,0.09),inset_0_1px_0_rgba(255,255,255,0.9)]
          dark:group-hover:shadow-[0_6px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.07)]"
      >
        {/* Specular shimmer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl
            bg-gradient-to-r from-transparent via-white/65 to-transparent
            dark:via-white/12"
        />

        {/* Icon */}
        <div
          className={`w-13 h-13 min-w-[3.25rem] min-h-[3.25rem] rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center border ${config.border} flex-shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]`}
        >
          <Icon className={`w-6 h-6 ${config.iconColor}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="font-medium text-sm text-gray-900 dark:text-white/90">{item.title}</p>
            {item.hasContent && (
              <span className="text-[11px] text-gray-600 dark:text-white/60 group-hover:text-gray-900 dark:group-hover:text-white/90 transition-colors flex-shrink-0 mt-0.5">
                Read notes →
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 dark:text-white/70 mt-0.5">
            {item.author} · {item.year}
          </p>
          {item.note && (
            <p className="text-xs text-gray-600 dark:text-white/65 leading-relaxed mt-1.5 italic line-clamp-2 group-hover:line-clamp-none transition-all duration-200">
              {item.note}
            </p>
          )}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-full
                  bg-white/35 dark:bg-white/[0.05]
                  border border-white/50 dark:border-white/[0.08]
                  text-gray-600 dark:text-white/65"
              >
                {tag}
              </span>
            ))}
            <StatusBadge status={item.status} />
          </div>
        </div>
      </div>
    </div>
  );

  if (item.hasContent) {
    return <Link href={`/reading/${item.slug}`}>{inner}</Link>;
  }
  return inner;
}

// ─── section ──────────────────────────────────────────────────────────────────

function SectionGroup({ type, items }: { type: SectionType; items: ReadingItem[] }) {
  const prefersReducedMotion = useReducedMotion();
  const config = sectionConfig[type];
  const { Icon } = config;

  if (items.length === 0) return null;

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`w-7 h-7 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center border ${config.border} shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]`}
        >
          <Icon className={`w-3.5 h-3.5 ${config.iconColor}`} />
        </div>
        <span className="text-[11px] uppercase tracking-widest text-gray-600 dark:text-white/70 font-medium">
          {config.label}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-white/40 dark:from-white/10 to-transparent" />
      </div>

      <div className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.slug}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, y: -4, transition: { duration: 0.12 } }}
              transition={{ duration: 0.22 }}
            >
              <ReadingCard item={item} sectionType={type} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── filter button ────────────────────────────────────────────────────────────

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`text-xs px-3 py-1 rounded-full border transition-all duration-200 ${
        active
          ? 'bg-gradient-to-r from-fuchsia-500/20 to-rose-500/20 text-fuchsia-600 dark:text-fuchsia-300 border-fuchsia-400/30 font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]'
          : 'bg-white/20 dark:bg-white/[0.04] text-gray-600 dark:text-white/60 border-white/40 dark:border-white/[0.07] hover:bg-white/35 dark:hover:bg-white/[0.07] hover:text-gray-900 dark:hover:text-white/60'
      }`}
    >
      {label}
    </button>
  );
}

// ─── status filter row ────────────────────────────────────────────────────────

function StatusFilterRow({
  statusFilter,
  onStatusChange,
}: {
  statusFilter: string;
  onStatusChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-8">
      {STATUS_FILTERS.map((f) => (
        <FilterButton
          key={f.value}
          label={f.label}
          active={statusFilter === f.value}
          onClick={() => onStatusChange(f.value)}
        />
      ))}
    </div>
  );
}

// ─── desktop sidebar ──────────────────────────────────────────────────────────

function FilterSidebar({
  statusFilter,
  typeFilter,
  onStatusChange,
  onTypeChange,
}: {
  statusFilter: string;
  typeFilter: string;
  onStatusChange: (v: string) => void;
  onTypeChange: (v: string) => void;
}) {
  const hasActiveFilter = statusFilter !== 'all' || typeFilter !== 'all';

  return (
    <div
      className="rounded-2xl p-4
        bg-white/30 dark:bg-white/[0.04]
        border border-white/55 dark:border-white/[0.07]
        shadow-[0_2px_16px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.75)]
        dark:shadow-[0_2px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]"
      style={{ backdropFilter: 'blur(28px) saturate(180%)', WebkitBackdropFilter: 'blur(28px) saturate(180%)' }}
    >
      {/* Specular shimmer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl
          bg-gradient-to-r from-transparent via-white/60 to-transparent
          dark:via-white/10"
      />

      <p className="text-[11px] uppercase tracking-[.12em] text-gray-600 dark:text-white/60 font-mono mb-3">
        Type
      </p>
      <div className="flex flex-col gap-1.5">
        {TYPE_FILTERS.map((f) => (
          <FilterButton
            key={f.value}
            label={f.label}
            active={typeFilter === f.value}
            onClick={() => onTypeChange(f.value)}
          />
        ))}
      </div>

      {hasActiveFilter && (
        <button
          onClick={() => { onStatusChange('all'); onTypeChange('all'); }}
          className="mt-5 w-full text-center text-[11px] text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white/60 transition-colors rounded-full border border-dashed border-white/40 dark:border-white/10 py-1"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

// ─── mobile type filters ──────────────────────────────────────────────────────

function MobileTypeFilters({
  typeFilter,
  onTypeChange,
}: {
  typeFilter: string;
  onTypeChange: (v: string) => void;
}) {
  return (
    <div className="md:hidden flex flex-wrap gap-1.5 mb-6">
      {TYPE_FILTERS.map((f) => (
        <FilterButton
          key={f.value}
          label={f.label}
          active={typeFilter === f.value}
          onClick={() => onTypeChange(f.value)}
        />
      ))}
    </div>
  );
}

// ─── main ─────────────────────────────────────────────────────────────────────

export function ReadingList({ items }: { items: ReadingItem[] }) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filtered = items.filter((item) => {
    const statusMatch = statusFilter === 'all' || item.status === statusFilter;
    const typeMatch =
      typeFilter === 'all' ||
      (typeFilter === 'other'
        ? item.type !== 'paper' && item.type !== 'book'
        : item.type === typeFilter);
    return statusMatch && typeMatch;
  });

  const papers = sortByStatus(filtered.filter((i) => i.type === 'paper'));
  const books = sortByStatus(filtered.filter((i) => i.type === 'book'));
  const others = sortByStatus(filtered.filter((i) => i.type !== 'paper' && i.type !== 'book'));
  const totalFiltered = papers.length + books.length + others.length;

  return (
    <div className="relative pt-32 pb-24 px-4 sm:px-6">

      {/* Liquid glass animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full blur-[130px] bg-fuchsia-500/12 dark:bg-fuchsia-600/08"
          animate={{ x: [0, 45, -30, 0], y: [0, -35, 25, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full blur-[130px] bg-rose-500/12 dark:bg-rose-600/08"
          animate={{ x: [0, -40, 28, 0], y: [0, 38, -28, 0], scale: [1, 0.92, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-2/3 left-1/3 w-[380px] h-[380px] rounded-full blur-[110px] bg-pink-500/10 dark:bg-rose-600/07"
          animate={{ x: [0, 30, -45, 0], y: [0, -28, 18, 0], scale: [1, 1.06, 0.94, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.div
          className="absolute top-10 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px] bg-amber-400/10 dark:bg-amber-500/07"
          animate={{ x: [0, -22, 32, 0], y: [0, 32, -22, 0], scale: [1, 0.88, 1.12, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          {/* Glass pill label */}
          <motion.div
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full text-[11px] font-medium tracking-widest uppercase
              bg-white/30 dark:bg-white/[0.06] border border-white/50 dark:border-white/[0.1]
              text-gray-600 dark:text-white/70
              shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-amber-400 inline-block" />
            reading
          </motion.div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
            What I&apos;m reading
          </h1>
          <p className="mt-3 text-sm sm:text-[15px] text-gray-600 dark:text-white/70 max-w-md mx-auto leading-relaxed">
            Papers, books, essays — things worth the time. Filtered by what actually changed how I think.
          </p>

          {/* Shimmer divider */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/40 to-white/20 dark:via-white/20" />
            <div className="flex gap-1.5">
              <div className="w-1 h-1 rounded-full bg-fuchsia-400/60" />
              <div className="w-1 h-1 rounded-full bg-rose-400/60" />
              <div className="w-1 h-1 rounded-full bg-amber-400/60" />
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent via-white/40 to-white/20 dark:via-white/20" />
          </div>
        </motion.div>

        {/* ── GRID ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-[1fr_200px] md:gap-12 items-start"
        >
          {/* LEFT: content */}
          <div>
            <StatusFilterRow statusFilter={statusFilter} onStatusChange={setStatusFilter} />
            <MobileTypeFilters typeFilter={typeFilter} onTypeChange={setTypeFilter} />

            {totalFiltered === 0 ? (
              <div
                className="py-14 text-center rounded-2xl
                  bg-white/25 dark:bg-white/[0.03]
                  border border-white/50 dark:border-white/[0.06]"
                style={{ backdropFilter: 'blur(20px)' }}
              >
                <p className="text-sm text-gray-600 dark:text-white/60 italic">
                  No items match this filter.
                </p>
              </div>
            ) : (
              <div className="space-y-14">
                <SectionGroup type="paper" items={papers} />
                <SectionGroup type="book" items={books} />
                <SectionGroup type="other" items={others} />
              </div>
            )}
          </div>

          {/* RIGHT: sidebar (desktop only) */}
          <aside className="hidden md:block sticky top-24 relative">
            <FilterSidebar
              statusFilter={statusFilter}
              typeFilter={typeFilter}
              onStatusChange={setStatusFilter}
              onTypeChange={setTypeFilter}
            />
          </aside>
        </motion.div>
      </div>
    </div>
  );
}
