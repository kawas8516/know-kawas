'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import Link from 'next/link';
import type { Prompt } from '@/lib/content';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function ModelBadge({ model }: { model: Prompt['model'] }) {
  if (model === 'claude') {
    return (
      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary/15 text-primary">
        {model}
      </span>
    );
  }
  return (
    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
      {model}
    </span>
  );
}

export function PromptFilter({ prompts }: { prompts: Prompt[] }) {
  const [activeTag, setActiveTag] = useState('all');

  const allTags = [
    'all',
    ...Array.from(new Set(prompts.flatMap((p) => p.tags))),
  ];
  const filtered =
    activeTag === 'all' ? prompts : prompts.filter((p) => p.tags.includes(activeTag));

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">prompts</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Prompts I actually use
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-md mx-auto leading-relaxed">
            For Claude, GPT, whatever. Copy them, fork them, tell me when they break.
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

        <div className="flex gap-2 flex-wrap mb-8">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                activeTag === tag
                  ? 'bg-primary/15 text-primary border-primary/30'
                  : 'border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">No prompts match this tag.</p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-3"
          >
            {filtered.map((prompt) => (
              <motion.div key={prompt.slug} variants={itemVariants} whileHover={{ x: 4 }}>
                <Link
                  href={`/prompts/${prompt.slug}`}
                  className="group flex gap-4 sm:gap-6 p-4 rounded-xl hover:bg-zinc-900/30 transition-colors"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-blue-500/10 flex items-center justify-center border border-accent/20 flex-shrink-0">
                    <Terminal className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground">{prompt.title}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs text-muted-foreground">{prompt.use_case}</span>
                      <ModelBadge model={prompt.model} />
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {prompt.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-zinc-800/50 text-zinc-500 px-1.5 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
