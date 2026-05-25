'use client';

import { motion } from 'framer-motion';
import { FileText, BookOpen, Bookmark } from 'lucide-react';
import type { ReadingItem } from '@/lib/content';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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

function StatusBadge({ status }: { status: ReadingItem['status'] }) {
  if (status === 'reading') {
    return (
      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary/15 text-primary">
        reading
      </span>
    );
  }
  if (status === 'discussing') {
    return (
      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-violet-500/15 text-violet-400 font-mono inline-flex items-center">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse mr-1" />
        discussing
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
  return (
    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground opacity-70">
      abandoned
    </span>
  );
}

function TypeBadge({ type }: { type: ReadingItem['type'] }) {
  return (
    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">
      {type}
    </span>
  );
}

function ReadingCard({ item, sectionType }: { item: ReadingItem; sectionType: SectionType }) {
  const config = sectionConfig[sectionType];
  const { Icon } = config;
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ x: 4 }}
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
          <TypeBadge type={item.type} />
        </div>
        {item.note && (
          <p className="text-xs text-zinc-400 leading-relaxed mt-1 italic line-clamp-2 group-hover:line-clamp-none transition-all">
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
      <div className="ml-auto flex-shrink-0 pl-2 self-center">
        <span
          className="text-muted-foreground/20 group-hover:text-muted-foreground/60 transition-colors text-sm"
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </motion.div>
  );
}

function SectionGroup({ type, items }: { type: SectionType; items: ReadingItem[] }) {
  const config = sectionConfig[type];
  const { Icon } = config;
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-3 mb-6">
        <Icon className="size-4" />
        <span>{config.label}</span>
        <div className="flex-1 h-px bg-border" />
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">Nothing here yet.</p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3"
        >
          {items.map((item) => (
            <ReadingCard key={item.slug} item={item} sectionType={type} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export function ReadingList({ items }: { items: ReadingItem[] }) {
  const papers = items.filter((i) => i.type === 'paper');
  const books = items.filter((i) => i.type === 'book');
  const others = items.filter((i) => i.type !== 'paper' && i.type !== 'book');

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl">
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
            Papers, books, and other things worth the time. Updated when I read, not on a schedule.
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

        <div className="space-y-16">
          <SectionGroup type="paper" items={papers} />
          <SectionGroup type="book" items={books} />
          <SectionGroup type="other" items={others} />
        </div>
      </div>
    </div>
  );
}
