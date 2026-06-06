'use client';

import { motion } from 'framer-motion';
import { Code, FileCode, Database, Zap, Coffee, Brain, Network, GitBranch, Rocket, Binary } from 'lucide-react';
import Link from 'next/link';

const techStack = [
  { name: 'Java', icon: Coffee, color: '#ED8B00' },
  { name: 'Python', icon: Code, color: '#3776AB' },
  { name: 'C++', icon: Binary, color: '#00599C' },
  { name: 'SQL', icon: FileCode, color: '#4479A1' },
  { name: 'PostgreSQL', icon: Database, color: '#4169E1' },
  { name: 'MongoDB', icon: Zap, color: '#47A248' },
  { name: 'LLMs / GenAI', icon: Brain, color: '#FF6B6B' },
  { name: 'Vector Search', icon: Network, color: '#4ECDC4' },
  { name: 'Git / GitHub', icon: GitBranch, color: '#F05032' },
  { name: 'FastAPI', icon: Rocket, color: '#009688' },
];

export function TechStackSection() {
  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider"
          >
            <Code className="h-4 w-4" />
            Technology Stack
          </motion.h3>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link
              href="https://drive.google.com/file/d/1PaV_eo-KRfX-WLQ1HevIZb1Wt8EtimgA/view?usp=sharing"
              target="_blank"
              className="text-sm text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1"
            >
              View Resume <span>→</span>
            </Link>
          </motion.div>
        </div>

        {/* Tech Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:border-muted-foreground/30 transition-colors">
                <tech.icon className="h-7 w-7" style={{ color: tech.color }} />
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors text-center">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
