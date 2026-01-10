"use client"

import { motion } from "framer-motion"
import { Smartphone, RefreshCw, Database, FileCode, Code, Layers, Wind, LayoutGrid, Palette, Zap } from "lucide-react"
import Link from "next/link"

const techStack = [
  { name: "React Native", icon: Smartphone, color: "#61DAFB" },
  { name: "Redux", icon: RefreshCw, color: "#764ABC" },
  { name: "Golang", icon: Database, color: "#00ADD8" },
  { name: "MySQL", icon: FileCode, color: "#4479A1" },
  { name: "C++", icon: Code, color: "#00599C" },
  { name: "shadcn UI", icon: Layers, color: "#FFFFFF" },
  { name: "Tailwind CSS", icon: Wind, color: "#06B6D4" },
  { name: "Bootstrap", icon: LayoutGrid, color: "#7952B3" },
  { name: "Sass", icon: Palette, color: "#CC6699" },
  { name: "Vite", icon: Zap, color: "#646CFF" },
]

export function TechStackSection() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium text-zinc-500 uppercase tracking-wider"
          >
            Technology Stack
          </motion.h3>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link
              href="/resume.pdf"
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
          className="grid grid-cols-5 gap-4"
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
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-zinc-700 transition-colors">
                <tech.icon className="h-7 w-7" style={{ color: tech.color }} />
              </div>
              <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors text-center">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
