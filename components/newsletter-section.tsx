'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function NewsletterSection() {
  return (
    <section id="newsletter" className="mx-auto max-w-[560px] px-6 py-12">

      {/* Outer shell — clips blobs, establishes stacking context for backdrop-filter */}
      <div className="relative overflow-hidden isolate rounded-2xl">

        {/* Apple WWDC 2025 Liquid Glass Background */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          {/* Primary gradient blob - Indigo to Purple */}
          <motion.div
            className="absolute -top-32 -left-32 h-96 w-96 rounded-full blur-[120px] bg-indigo-500/40 dark:bg-indigo-600/20"
            animate={{
              x: [0, 40, -30, 0],
              y: [0, -40, 30, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Secondary gradient blob - Cyan to Teal */}
          <motion.div
            className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full blur-[120px] bg-cyan-400/35 dark:bg-teal-600/20"
            animate={{
              x: [0, -35, 25, 0],
              y: [0, 35, -25, 0],
              scale: [1, 0.95, 1.05, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />

          {/* Tertiary accent - Pink to Rose */}
          <motion.div
            className="absolute top-0 right-1/3 h-80 w-80 rounded-full blur-[100px] bg-pink-400/25 dark:bg-rose-600/15"
            animate={{
              x: [0, 25, -35, 0],
              y: [0, 30, 40, 0],
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />

          {/* Quaternary accent - Purple to Violet */}
          <motion.div
            className="absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full blur-[90px] bg-purple-400/30 dark:bg-purple-600/15"
            animate={{
              x: [0, -30, 40, 0],
              y: [0, -35, -30, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
          />
        </div>

        {/* Apple WWDC 2025 Glass Surface */}
        <motion.div
          className="
            relative z-10 rounded-3xl
            px-8 py-8
            flex flex-col items-center justify-center text-center
            bg-white/40 dark:bg-white/[0.08]
            border border-white/60 dark:border-white/[0.12]
            shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1.5px_0_rgba(255,255,255,0.9)]
            dark:shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]
          "
          style={{
            backdropFilter: 'blur(40px) saturate(180%) brightness(1.05)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(1.05)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >

          {/* Specular shimmer — top edge */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl
              bg-gradient-to-r from-transparent via-white/80 to-transparent
              dark:via-white/20
            "
          />

          {/* Heading */}
          <motion.h3
            className="text-[19px] font-semibold leading-tight text-gray-950 dark:text-white/95 tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Kawas's Substack
          </motion.h3>

          {/* Tagline */}
          <motion.p
            className="mt-2 text-[14px] leading-relaxed text-gray-700 dark:text-white/65"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Thoughtfully curated insights and ideas worth sharing.
          </motion.p>

          {/* Supporting copy */}
          <motion.p
            className="mt-3 text-[13px] leading-relaxed text-gray-600 dark:text-white/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join a growing community of curious minds.
            <br />
            No spam, only substance.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              href="https://kawas516.substack.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group mt-6 inline-flex items-center gap-2 rounded-full
                px-6 py-3
                text-[13px] font-medium text-white select-none
                bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                hover:shadow-xl active:scale-[0.97]
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400
                transition-all duration-300 ease-out
              "
              style={{
                boxShadow: '0 8px 24px rgba(79, 70, 229, 0.35)',
              }}
            >
              <span>Subscribe Now</span>
              <motion.span
                aria-hidden="true"
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>

        </motion.div>
      </div>

    </section>
  );
}
