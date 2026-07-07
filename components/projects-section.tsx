'use client';

import { motion } from 'framer-motion';
import { Clock, Terminal, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    name: 'Java Task Scheduler',
    year: '2024',
    description: 'OOP + GUI scheduler built in Java. Queue-based task management with priority handling.',
    href: 'https://github.com/kawas8516/Taskscheduler',
    external: true,
    icon: Clock,
    iconColor: 'text-orange-400',
    gradient: 'from-orange-400/30 to-amber-500/15',
    border: 'border-orange-400/30',
    blob: 'bg-orange-400/20',
  },
  {
    name: 'CLI Utilities (C/C++)',
    year: '2024',
    description: 'Command-line tools built in C and C++. Systems-level fundamentals — where it all started.',
    href: 'https://github.com/kawas8516/cpp-windows-system-utility-tool',
    external: true,
    icon: Terminal,
    iconColor: 'text-blue-400',
    gradient: 'from-blue-400/30 to-cyan-500/15',
    border: 'border-blue-400/30',
    blob: 'bg-blue-400/20',
  },
  {
    name: 'Food Recipes Bot',
    year: '2024',
    description: 'RAG system using FAISS + Django + NLP. Suggests recipes from ingredients and storage tips.',
    href: 'https://github.com/kawas8516/chat-cooking',
    external: true,
    icon: MessageSquare,
    iconColor: 'text-emerald-400',
    gradient: 'from-emerald-400/30 to-green-500/15',
    border: 'border-emerald-400/30',
    blob: 'bg-emerald-400/20',
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="px-4 py-10">
      <div className="mx-auto max-w-2xl">

        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div className="flex items-center gap-3">
            <h3 className="text-[15px] font-semibold tracking-tight text-gray-900 dark:text-white/90">
              Notable projects
            </h3>
            <div className="w-20 h-px bg-gradient-to-r from-white/40 dark:from-white/10 to-transparent" />
          </motion.div>
          <motion.div>
            <Link
              href="/work"
              className="text-[11px] text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white/90 transition-colors flex items-center gap-1"
            >
              All work →
            </Link>
          </motion.div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.09, ease: 'easeOut', duration: 0.45 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group cursor-pointer"
            >
              <Link
                href={project.href}
                target={project.external ? '_blank' : undefined}
                rel={project.external ? 'noopener noreferrer' : undefined}
                className="block h-full"
              >
                <div className="relative h-full flex flex-col items-center text-center p-5 rounded-2xl overflow-hidden">

                  {/* Per-card accent blob */}
                  <div
                    className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-[55px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${project.blob}`}
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
                  />

                  {/* Specular shimmer */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl
                      bg-gradient-to-r from-transparent via-white/65 to-transparent
                      dark:via-white/12 z-10"
                  />

                  {/* Icon */}
                  <div className="relative z-10 mb-4">
                    <div
                      className={`w-13 h-13 min-w-[3.25rem] min-h-[3.25rem] rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center border ${project.border} shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform duration-300`}
                    >
                      <project.icon className={`h-6 w-6 ${project.iconColor}`} />
                    </div>
                  </div>

                  {/* Name */}
                  <h4 className="relative z-10 text-sm font-semibold text-gray-900 dark:text-white/90 mb-1 tracking-tight">
                    {project.name}
                  </h4>

                  {/* Year chip */}
                  <span
                    className="relative z-10 text-[11px] px-2 py-0.5 rounded-full mb-2
                      bg-white/35 dark:bg-white/[0.05]
                      border border-white/50 dark:border-white/[0.08]
                      text-gray-600 dark:text-white/65"
                  >
                    {project.year}
                  </span>

                  {/* Description */}
                  <p className="relative z-10 text-xs text-gray-600 dark:text-white/65 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
