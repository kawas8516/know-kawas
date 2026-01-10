"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="relative py-16 px-4 mt-12">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center space-y-4"
        >
          <p className="text-sm text-zinc-500">© 2026 Kaustubha M • All rights reserved</p>

          {/* Divider with gradient */}
          <div className="flex items-center gap-3 w-full max-w-xs">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
          </div>

          <p className="text-xs text-zinc-600 italic">Build. Learn. Iterate.</p>
        </motion.div>
      </div>
    </footer>
  )
}
