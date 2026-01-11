'use client';

import { motion } from 'framer-motion';
import { Sparkles, Shield, Box } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    name: 'UpEvent',
    year: '2024',
    icon: Sparkles,
    iconColor: '#A855F7',
    bgGradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    name: 'Abusive Buster',
    year: '2024',
    icon: Shield,
    iconColor: '#22C55E',
    bgGradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    name: 'FridgeInsider',
    year: '2023',
    icon: Box,
    iconColor: '#F97316',
    bgGradient: 'from-orange-500/20 to-amber-500/20',
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium text-zinc-500 uppercase tracking-wider"
          >
            Notable Projects
          </motion.h3>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link
              href="/projects"
              className="text-sm text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1"
            >
              All work <span>→</span>
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-4"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 flex flex-col items-center text-center hover:border-zinc-700 transition-all overflow-hidden">
                {/* Subtle glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Icon */}
                <div className="relative z-10 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center group-hover:border-zinc-600 transition-colors">
                    <project.icon className="h-7 w-7" style={{ color: project.iconColor }} />
                  </div>
                </div>

                {/* Name */}
                <h4 className="relative z-10 text-sm font-medium text-white mb-1">{project.name}</h4>

                {/* Year */}
                <p className="relative z-10 text-xs text-zinc-500">{project.year}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
