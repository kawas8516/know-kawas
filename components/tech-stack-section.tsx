'use client';

import { motion } from 'framer-motion';
import { Code, Table, Database, Zap, Coffee, Brain, Network, GitBranch, Leaf, Binary } from 'lucide-react';
import Link from 'next/link';

const techStack = [
  { name: 'Java',         icon: Coffee,    color: '#ED8B00', blob: 'bg-orange-400/25' },
  { name: 'Python',       icon: Code,      color: '#3776AB', blob: 'bg-blue-400/25' },
  { name: 'C++',          icon: Binary,    color: '#00599C', blob: 'bg-cyan-400/25' },
  { name: 'SQL',          icon: Table,     color: '#4479A1', blob: 'bg-sky-400/25' },
  { name: 'PostgreSQL',   icon: Database,  color: '#4169E1', blob: 'bg-indigo-400/25' },
  { name: 'MongoDB',      icon: Leaf,      color: '#47A248', blob: 'bg-emerald-400/25' },
  { name: 'LLMs / GenAI', icon: Brain,     color: '#FF6B6B', blob: 'bg-rose-400/25' },
  { name: 'Vector Search',icon: Network,   color: '#4ECDC4', blob: 'bg-teal-400/25' },
  { name: 'Git / GitHub', icon: GitBranch, color: '#F05032', blob: 'bg-red-400/25' },
  { name: 'FastAPI',      icon: Zap,       color: '#009688', blob: 'bg-green-400/25' },
];

export function TechStackSection() {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-2xl">

        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div className="flex items-center gap-3">
            <h3 className="text-[15px] font-semibold tracking-tight text-gray-900 dark:text-white/90">
              Stack I work with
            </h3>
            <div className="w-16 h-px bg-gradient-to-r from-white/40 dark:from-white/10 to-transparent" />
          </motion.div>

          <motion.div>
            <Link
              href="https://drive.google.com/file/d/1PaV_eo-KRfX-WLQ1HevIZb1Wt8EtimgA/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white/90 transition-colors flex items-center gap-1"
            >
              View Resume →
            </Link>
          </motion.div>
        </div>

        {/* Tech grid */}
        <motion.div
          initial={{ y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ scale: 0.88 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.045, duration: 0.3 }}
              whileHover={{ scale: 1.06, y: -4 }}
              className="group flex flex-col items-center gap-2"
            >
              {/* Glass tile */}
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden">
                {/* Accent blob — visible on hover */}
                <div
                  className={`pointer-events-none absolute inset-0 rounded-2xl blur-[20px] opacity-0 group-hover:opacity-80 transition-opacity duration-400 ${tech.blob}`}
                  aria-hidden="true"
                />

                {/* Glass surface */}
                <div
                  className="absolute inset-0 rounded-2xl
                    bg-white/32 dark:bg-white/[0.05]
                    border border-white/55 dark:border-white/[0.08]
                    shadow-[0_2px_14px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.75)]
                    dark:shadow-[0_2px_18px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.06)]
                    group-hover:shadow-[0_6px_24px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.88)]
                    dark:group-hover:shadow-[0_6px_28px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.08)]
                    transition-shadow duration-300"
                />

                {/* Specular shimmer */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl
                    bg-gradient-to-r from-transparent via-white/65 to-transparent
                    dark:via-white/12 z-10"
                />

                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <tech.icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" style={{ color: tech.color }} />
                </div>
              </div>

              {/* Label */}
              <span className="text-[11px] text-gray-600 dark:text-white/65 group-hover:text-gray-900 dark:group-hover:text-white/90 transition-colors text-center leading-tight">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
