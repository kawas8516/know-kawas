'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FileText, BookOpen, Bookmark } from 'lucide-react';
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
    gradient: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/20',
    iconColor: 'text-violet-400',
  },
  book: {
    label: 'Books',
    Icon: BookOpen,
    gradient: 'from-blue-500/20 to-cyan-500/10',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  other: {
    label: 'Others',
    Icon: Bookmark,
    gradient: 'from-pink-500/20 to-rose-500/10',
    border: 'border-pink-500/20',
    iconColor: 'text-pink-400',
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
  if (status === 'reading') {
    return (
      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary/15 text-primary">
        reading
      </span>
    );
  }
  if (status === 'finished') {
    return (
      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
        finished
      </span>
    );
  }
  if (status === 'abandoned') {
    return (
      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground opacity-70">
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
  return (
    <div
      className="group flex gap-4 sm:gap-6 p-4 rounded-xl hover:bg-zinc-900/30 transition-colors"
    >
      <div
        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center border ${config.border} flex-shrink-0`}
      >
        <Icon className={`w-8 h-8 ${config.iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-foreground">{item.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {item.author} · {item.year}
        </p>
        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
          <StatusBadge status={item.status} />
        </div>
        {item.note && (
          <p className="text-xs text-zinc-400 leading-relaxed mt-1 italic line-clamp-2 group-hover:line-clamp-none transition-all duration-200">
            {item.note}
          </p>
        )}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] bg-zinc-800/50 text-zinc-500 px-1.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── section ──────────────────────────────────────────────────────────────────

function SectionGroup({ type, items }: { type: SectionType; items: ReadingItem[] }) {
  const prefersReducedMotion = useReducedMotion();
  const config = sectionConfig[type];
  const { Icon } = config;

  if (items.length === 0) return null;

  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-3 mb-6">
        <Icon className="size-4" />
        <span>{config.label}</span>
        <div className="flex-1 h-px bg-border" />
      </div>
      <div className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.slug}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, y: -4, transition: { duration: 0.12 } }}
              transition={{ duration: 0.18 }}
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
      className={`text-xs px-2.5 py-0.5 rounded-full border transition-colors duration-150 ${
        active
          ? 'bg-primary/15 text-primary border-primary/40 font-medium'
          : 'bg-muted/20 text-muted-foreground/50 border-transparent hover:bg-muted/40 hover:text-muted-foreground/80'
      }`}
    >
      {label}
    </button>
  );
}

// ─── status filter row (top, all breakpoints) ─────────────────────────────────

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

// ─── desktop sidebar (type only) ─────────────────────────────────────────────

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
    <div>
      <p className="text-[10px] uppercase tracking-[.12em] text-muted-foreground/50 font-mono mb-3">
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
          className="mt-6 w-full text-center text-[11px] text-muted-foreground/50 hover:text-muted-foreground/80 transition-colors rounded-full border border-dashed border-muted-foreground/20 py-1"
        >
          Clear
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
    <div className="pt-32 pb-20 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">reading</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            What I&apos;m reading
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-md mx-auto leading-relaxed">
            Papers, books, essays — things worth the time. Filtered by what actually changed how I
            think.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-zinc-600 to-zinc-600" />
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
            </div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent via-zinc-600 to-zinc-600" />
          </div>
        </motion.div>

        {/* ── GRID ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-[1fr_200px] md:gap-12 items-start"
        >
          {/* LEFT: content */}
          <div>
            <StatusFilterRow
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
            />
            <MobileTypeFilters
              typeFilter={typeFilter}
              onTypeChange={setTypeFilter}
            />

            {totalFiltered === 0 ? (
              <p className="text-sm text-muted-foreground/35 italic text-center py-12">
                No items match this filter.
              </p>
            ) : (
              <div className="space-y-16">
                <SectionGroup type="paper" items={papers} />
                <SectionGroup type="book" items={books} />
                <SectionGroup type="other" items={others} />
              </div>
            )}
          </div>

          {/* RIGHT: sidebar (desktop only) */}
          <aside className="hidden md:block sticky top-20">
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
