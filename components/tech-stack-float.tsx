"use client"

import { motion } from "framer-motion"

const techStack = [
  { name: "React", color: "#61DAFB", size: "lg" },
  { name: "Next.js", color: "#ffffff", size: "lg" },
  { name: "TypeScript", color: "#3178C6", size: "md" },
  { name: "Node.js", color: "#339933", size: "md" },
  { name: "Tailwind", color: "#06B6D4", size: "md" },
  { name: "PostgreSQL", color: "#4169E1", size: "sm" },
  { name: "GraphQL", color: "#E10098", size: "sm" },
  { name: "AWS", color: "#FF9900", size: "sm" },
  { name: "Docker", color: "#2496ED", size: "sm" },
  { name: "Git", color: "#F05032", size: "sm" },
]

const sizeClasses = {
  lg: "w-24 h-24 text-sm",
  md: "w-20 h-20 text-xs",
  sm: "w-16 h-16 text-[10px]",
}

export function TechStackFloat() {
  return (
    <div className="relative h-[500px] w-full">
      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />

      {techStack.map((tech, index) => {
        const angle = (index / techStack.length) * 2 * Math.PI
        const radius = tech.size === "lg" ? 120 : tech.size === "md" ? 160 : 200
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: x,
              y: y,
            }}
            transition={{
              delay: index * 0.1,
              duration: 0.6,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.15,
              zIndex: 10,
              boxShadow: `0 0 30px ${tech.color}40`,
            }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${sizeClasses[tech.size as keyof typeof sizeClasses]} rounded-2xl bg-secondary/80 backdrop-blur-sm border border-border hover:border-primary/50 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors`}
          >
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3 + index * 0.3,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-6 h-6 rounded-lg" style={{ backgroundColor: tech.color }} />
              <span className="font-medium text-foreground">{tech.name}</span>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
