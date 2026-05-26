'use client';

import { motion } from 'framer-motion';
import { Zap, Layers } from 'lucide-react';
import Link from 'next/link';

const experiences = [
  {
    company: 'Discord Nation Alpha DNA',
    period: '2024 — now',
    icon: Zap,
    iconBg: 'bg-emerald-500/20',
    iconColor: '#22C55E',
    borderColor: 'border-emerald-500/30',
  },
  {
    company: 'Student Communities @MIT-WPU',
    period: '2024',
    icon: Layers,
    iconBg: 'bg-red-500/20',
    iconColor: '#EF4444',
    borderColor: 'border-red-500/30',
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium text-zinc-500 uppercase tracking-wider"
          >
            Professional Experience
          </motion.h3>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link
              href="/timeline"
              className="text-sm text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1"
            >
              My timeline <span>→</span>
            </Link>
          </motion.div>
        </div>

        {/* Experience Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-8"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group cursor-pointer"
            >
              <div
                className={'relative rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 flex flex-col items-center text-center hover:border-zinc-700 transition-all'}
              >
                {/* Icon */}
                <div className="mb-4">
                  <div
                    className={`w-14 h-14 rounded-xl ${exp.iconBg} ${exp.borderColor} border flex items-center justify-center`}
                  >
                    <exp.icon className="h-7 w-7" style={{ color: exp.iconColor }} />
                  </div>
                </div>

                {/* Company Name */}
                <h4 className="text-sm font-medium text-white mb-1">{exp.company}</h4>

                {/* Period */}
                <p className="text-xs text-zinc-500">{exp.period}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
