'use client';

import { motion } from 'framer-motion';
import { Zap, Layers } from 'lucide-react';
import Link from 'next/link';

const experiences = [
  {
    company: 'Discord Nation Alpha (DNA)',
    role: 'Co-Founder & Community Lead',
    summary: 'Scaled a 4,300+ member creator network; governance and mentorship cut churn by 20%.',
    period: '2020 — 2022',
    icon: Zap,
    iconBg: 'bg-emerald-500/20',
    iconColor: '#22C55E',
    borderColor: 'border-emerald-500/30',
  },
  {
    company: 'Student Communities @MIT-WPU',
    role: 'Content Writer & Alumni Relations',
    summary: 'Scripted alumni interviews reaching 1K+ students; stakeholder comms for STeRG.',
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
            className="text-[15px] font-semibold tracking-tight text-gray-900 dark:text-white/90"
          >
            Experience
          </motion.h3>
          <motion.div>
            <Link
              href="/timeline"
              className="text-xs text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white/90 transition-colors flex items-center gap-1"
            >
              My timeline <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Experience Grid */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ y: 16 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Link
                href="/timeline"
                className="relative flex h-full gap-4 p-5 rounded-2xl overflow-hidden
                  bg-white/32 dark:bg-white/[0.05]
                  border border-white/55 dark:border-white/[0.08]
                  shadow-[0_3px_18px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.75)]
                  dark:shadow-[0_3px_22px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.06)]
                  group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.88)]
                  dark:group-hover:shadow-[0_8px_36px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.08)]
                  transition-shadow duration-300"
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
                  className={`w-11 h-11 flex-shrink-0 rounded-xl ${exp.iconBg} ${exp.borderColor} border flex items-center justify-center`}
                >
                  <exp.icon className="h-5 w-5" style={{ color: exp.iconColor }} />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white/90 leading-tight">
                    {exp.company}
                  </h4>
                  <p className="text-xs text-gray-700 dark:text-white/75 mt-0.5">{exp.role}</p>
                  <p className="text-xs text-gray-600 dark:text-white/65 leading-relaxed mt-1.5">
                    {exp.summary}
                  </p>
                  <p className="text-[11px] text-gray-600 dark:text-white/60 mt-2">{exp.period}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
