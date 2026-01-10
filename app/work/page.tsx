"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    id: 1,
    name: "Food Waste Chatbot",
    description:
      "Suggests recipes from available ingredients and gives storage tips using RAG + NLP. Built with Django, FAISS, Sentence Transformers, and HTMX.",
    icon: (
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/10 flex items-center justify-center border border-emerald-500/20">
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
          <path d="M12 2a10 10 0 0 1 10 10" />
          <circle cx="12" cy="12" r="6" />
        </svg>
      </div>
    ),
    badges: [
      { label: "AI/ML", color: "bg-emerald-500/20 text-emerald-400" },
      { label: "DJANGO", color: "bg-purple-500/20 text-purple-400" },
    ],
    github: "https://github.com/kawas8516/Food-Waste-Chatbot",
    demo: null,
    languages: ["Python", "Django", "HTMX"],
  },
  {
    id: 2,
    name: "Java Task Scheduler",
    description:
      "Java-based scheduling application to manage and track daily/weekly tasks. Built with OOP principles and GUI-based task management.",
    icon: (
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 flex items-center justify-center border border-orange-500/20">
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </div>
    ),
    badges: [
      { label: "JAVA", color: "bg-orange-500/20 text-orange-400" },
      { label: "OOP", color: "bg-purple-500/20 text-purple-400" },
    ],
    github: "https://github.com/kawas8516/Taskscheduler",
    demo: null,
    languages: ["Java"],
  },
  {
    id: 3,
    name: "CLI Utilities (C/C++)",
    description:
      "Collection of system utilities and command-line tools — interactive mode, improved error handling. Built with C and C++.",
    icon: (
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center border border-blue-500/20">
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      </div>
    ),
    badges: [
      { label: "C++", color: "bg-blue-500/20 text-blue-400" },
      { label: "SYSTEM", color: "bg-zinc-500/20 text-zinc-400" },
    ],
    github: "https://github.com/kawas8516/cpp-windows-system-utility-tool",
    demo: null,
    languages: ["C++", "C"],
  },
  {
    id: 4,
    name: "Belleza",
    description:
      "A frontend project showcasing modern web design principles with clean CSS styling and responsive layouts.",
    icon: (
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/10 flex items-center justify-center border border-pink-500/20">
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
    ),
    badges: [
      { label: "CSS", color: "bg-pink-500/20 text-pink-400" },
      { label: "FRONTEND", color: "bg-purple-500/20 text-purple-400" },
    ],
    github: "https://github.com/kawas8516/belleza",
    demo: null,
    languages: ["CSS", "HTML"],
  },
  {
    id: 5,
    name: "Chat Cooking",
    description:
      "A Python-based cooking assistant project. Interactive chat interface for recipe suggestions and cooking help.",
    icon: (
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 flex items-center justify-center border border-amber-500/20">
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
          <path d="M8.5 8.5v.01" />
          <path d="M16 15.5v.01" />
          <path d="M12 12v.01" />
        </svg>
      </div>
    ),
    badges: [
      { label: "PYTHON", color: "bg-amber-500/20 text-amber-400" },
      { label: "CHAT", color: "bg-emerald-500/20 text-emerald-400" },
    ],
    github: "https://github.com/kawas8516/chat-cooking",
    demo: null,
    languages: ["Python"],
  },
  {
    id: 6,
    name: "Railway Reservation System",
    description:
      "A simple Python project for railway ticket booking. Learn Python basics, file handling, and console-based project workflow.",
    icon: (
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 flex items-center justify-center border border-violet-500/20">
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M9 17h6" />
          <path d="M12 3v18" />
        </svg>
      </div>
    ),
    badges: [
      { label: "PYTHON", color: "bg-violet-500/20 text-violet-400" },
      { label: "BEGINNER", color: "bg-emerald-500/20 text-emerald-400" },
    ],
    github: "https://github.com/kawas8516/Railway-Reservation-System",
    demo: null,
    languages: ["Python"],
  },
  {
    id: 7,
    name: "Shopping Cart",
    description: "Python-based shopping cart system. Practice OOP, data handling, and basic project structuring.",
    icon: (
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/10 flex items-center justify-center border border-cyan-500/20">
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </div>
    ),
    badges: [
      { label: "PYTHON", color: "bg-cyan-500/20 text-cyan-400" },
      { label: "OOP", color: "bg-purple-500/20 text-purple-400" },
    ],
    github: "https://github.com/kawas8516/shopping-cart",
    demo: null,
    languages: ["Python"],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative pt-32 pb-20 px-4">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Work
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Each of these projects reflects a piece of my journey.
              <br />
              Feel free to take a look around and explore the work I&apos;ve enjoyed building.
            </p>

            {/* Decorative line */}
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

          {/* Projects List */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className="group flex gap-4 sm:gap-6 p-4 rounded-xl transition-colors hover:bg-zinc-900/30"
              >
                {/* Icon */}
                <div className="flex-shrink-0">{project.icon}</div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-white">{project.name}</h3>
                    {project.badges.map((badge, index) => (
                      <span key={index} className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${badge.color}`}>
                        {badge.label}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{project.description}</p>

                  {/* Language badges */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.languages.map((lang) => (
                      <span key={lang} className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/50 text-zinc-500">
                        {lang}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        className="text-zinc-500 hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </Link>
                    )}
                    {project.demo && (
                      <Link
                        href={project.demo}
                        target="_blank"
                        className="text-zinc-500 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
