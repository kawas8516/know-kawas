'use client';

import { motion } from 'framer-motion';

export function LiquidGlassBg() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-[140px] bg-indigo-500/15 dark:bg-indigo-600/10"
        animate={{ x: [0, 50, -35, 0], y: [0, -45, 30, 0], scale: [1, 1.12, 0.9, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/4 -right-40 w-[480px] h-[480px] rounded-full blur-[130px] bg-blue-500/12 dark:bg-cyan-600/09"
        animate={{ x: [0, -40, 28, 0], y: [0, 38, -28, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute top-[45%] left-1/4 w-[420px] h-[420px] rounded-full blur-[120px] bg-purple-500/10 dark:bg-violet-600/08"
        animate={{ x: [0, 35, -45, 0], y: [0, -30, 22, 0], scale: [1, 1.08, 0.93, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-[380px] h-[380px] rounded-full blur-[110px] bg-pink-500/10 dark:bg-rose-600/08"
        animate={{ x: [0, -30, 40, 0], y: [0, 40, -30, 0], scale: [1, 0.92, 1.08, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full blur-[130px] bg-emerald-500/09 dark:bg-teal-600/07"
        animate={{ x: [0, 28, -20, 0], y: [0, -25, 35, 0], scale: [1, 1.05, 0.95, 1] }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
    </div>
  );
}
