'use client';

import { motion } from 'framer-motion';
import {
  Code2,
  Database,
  Cloud,
  Palette,
  Terminal,
  Boxes,
  Smartphone,
  GitBranch,
  Server,
  Layers,
  Cpu,
  Globe,
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Code2,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    gradient: 'from-indigo-400/30 to-blue-500/15',
    border: 'border-indigo-400/30',
    iconColor: 'text-indigo-400',
    blob: 'bg-indigo-400/20',
  },
  {
    title: 'Backend',
    icon: Server,
    skills: ['Node.js', 'Express', 'Python', 'GraphQL'],
    gradient: 'from-emerald-400/30 to-teal-500/15',
    border: 'border-emerald-400/30',
    iconColor: 'text-emerald-400',
    blob: 'bg-emerald-400/20',
  },
  {
    title: 'Database',
    icon: Database,
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'],
    gradient: 'from-violet-400/30 to-purple-500/15',
    border: 'border-violet-400/30',
    iconColor: 'text-violet-400',
    blob: 'bg-violet-400/20',
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    skills: ['AWS', 'Vercel', 'Docker', 'CI/CD'],
    gradient: 'from-orange-400/30 to-amber-500/15',
    border: 'border-orange-400/30',
    iconColor: 'text-orange-400',
    blob: 'bg-orange-400/20',
  },
  {
    title: 'Mobile',
    icon: Smartphone,
    skills: ['React Native', 'Expo', 'iOS', 'Android'],
    gradient: 'from-pink-400/30 to-rose-500/15',
    border: 'border-pink-400/30',
    iconColor: 'text-pink-400',
    blob: 'bg-pink-400/20',
  },
  {
    title: 'Tools',
    icon: Terminal,
    skills: ['Git', 'VS Code', 'Figma', 'Postman'],
    gradient: 'from-cyan-400/30 to-sky-500/15',
    border: 'border-cyan-400/30',
    iconColor: 'text-cyan-400',
    blob: 'bg-cyan-400/20',
  },
];

const allTechIcons = [
  { icon: Code2, name: 'Code' },
  { icon: Database, name: 'Database' },
  { icon: Cloud, name: 'Cloud' },
  { icon: Palette, name: 'Design' },
  { icon: Terminal, name: 'Terminal' },
  { icon: Boxes, name: 'Containers' },
  { icon: GitBranch, name: 'Git' },
  { icon: Server, name: 'Server' },
  { icon: Layers, name: 'Stack' },
  { icon: Cpu, name: 'Systems' },
  { icon: Globe, name: 'Web' },
  { icon: Smartphone, name: 'Mobile' },
];

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 px-4">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          {/* Glass pill label */}
          <motion.div
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full text-[11px] font-medium tracking-widest uppercase
              bg-white/30 dark:bg-white/[0.06]
              border border-white/50 dark:border-white/[0.1]
              text-gray-500 dark:text-white/50
              shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
            style={{ backdropFilter: 'blur(20px) saturate(180%)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 inline-block" />
            Skills & Stack
          </motion.div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-gray-600 dark:text-white/50 max-w-2xl mx-auto text-[15px] leading-relaxed">
            A comprehensive toolkit built over years of hands-on experience building modern applications.
          </p>
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              {/* Per-card accent blob */}
              <div
                className={`pointer-events-none absolute -top-10 -right-10 w-36 h-36 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-600 ${category.blob}`}
                aria-hidden="true"
              />

              {/* Glass surface */}
              <div
                className="relative p-5 rounded-2xl h-full
                  bg-white/35 dark:bg-white/[0.05]
                  border border-white/60 dark:border-white/[0.08]
                  shadow-[0_4px_20px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]
                  dark:shadow-[0_4px_24px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.06)]
                  transition-shadow duration-300
                  group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]
                  dark:group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)]"
                style={{ backdropFilter: 'blur(32px) saturate(180%) brightness(1.04)', WebkitBackdropFilter: 'blur(32px) saturate(180%) brightness(1.04)' }}
              >
                {/* Specular shimmer */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl
                    bg-gradient-to-r from-transparent via-white/70 to-transparent
                    dark:via-white/12"
                />

                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center border ${category.border} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]`}
                  style={{ backdropFilter: 'blur(8px)' }}
                >
                  <category.icon className={`w-5 h-5 ${category.iconColor}`} />
                </div>

                <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white/90 mb-3 tracking-tight">
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[11px] rounded-full
                        bg-white/40 dark:bg-white/[0.06]
                        border border-white/55 dark:border-white/[0.09]
                        text-gray-600 dark:text-white/50"
                      style={{ backdropFilter: 'blur(8px)' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech icon grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {allTechIcons.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
              whileHover={{ scale: 1.15, y: -2 }}
              className="group p-3.5 rounded-xl cursor-pointer
                bg-white/30 dark:bg-white/[0.04]
                border border-white/55 dark:border-white/[0.07]
                shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.7)]
                dark:shadow-[0_2px_16px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.05)]
                hover:shadow-[0_6px_24px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.85)]
                dark:hover:shadow-[0_6px_28px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.07)]
                transition-all duration-200"
              style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}
              title={tech.name}
            >
              <tech.icon className="h-5 w-5 text-gray-400 dark:text-white/35 group-hover:text-indigo-400 dark:group-hover:text-indigo-300 transition-colors duration-200" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
