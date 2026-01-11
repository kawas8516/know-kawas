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
    color: 'from-[oklch(0.65_0.18_250)] to-[oklch(0.7_0.15_270)]',
  },
  {
    title: 'Backend',
    icon: Server,
    skills: ['Node.js', 'Express', 'Python', 'GraphQL'],
    color: 'from-[oklch(0.6_0.15_180)] to-[oklch(0.65_0.12_200)]',
  },
  {
    title: 'Database',
    icon: Database,
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'],
    color: 'from-[oklch(0.6_0.18_280)] to-[oklch(0.55_0.15_300)]',
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    skills: ['AWS', 'Vercel', 'Docker', 'CI/CD'],
    color: 'from-[oklch(0.65_0.12_40)] to-[oklch(0.6_0.15_30)]',
  },
  {
    title: 'Mobile',
    icon: Smartphone,
    skills: ['React Native', 'Expo', 'iOS', 'Android'],
    color: 'from-[oklch(0.6_0.2_330)] to-[oklch(0.65_0.18_350)]',
  },
  {
    title: 'Tools',
    icon: Terminal,
    skills: ['Git', 'VS Code', 'Figma', 'Postman'],
    color: 'from-[oklch(0.55_0.15_220)] to-[oklch(0.6_0.12_240)]',
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
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit built over years of hands-on experience in building modern web applications.
          </p>
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300"
            >
              {/* Icon with gradient background */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} p-2.5 mb-4 group-hover:scale-110 transition-transform`}
              >
                <category.icon className="w-full h-full text-white" />
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-3">{category.title}</h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs rounded-full bg-secondary/50 text-muted-foreground border border-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-5 blur-xl`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Icon Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {allTechIcons.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{
                scale: 1.2,
                boxShadow: '0 0 25px oklch(0.6 0.15 270 / 0.4)',
              }}
              className="p-4 rounded-xl bg-secondary/30 border border-border hover:border-primary/50 cursor-pointer transition-colors"
            >
              <tech.icon className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
