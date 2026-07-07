'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function NewsletterSection() {
  return (
    <section id="newsletter" className="mx-auto max-w-[560px] px-6 py-12">

      {/* Outer shell — clips blobs, establishes stacking context for backdrop-filter */}
      <div className="relative overflow-hidden isolate rounded-2xl">

        {/* Liquid glass background — compositor-only CSS drift */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="blob-drift-a absolute -top-32 -left-32 h-96 w-96 rounded-full blur-[120px] bg-fuchsia-500/40 dark:bg-fuchsia-600/20" />
          <div className="blob-drift-b absolute -right-32 -bottom-32 h-96 w-96 rounded-full blur-[120px] bg-amber-400/35 dark:bg-amber-600/15" />
        </div>

        {/* Glass surface */}
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
            backdropFilter: 'blur(40px) saturate(150%)',
            WebkitBackdropFilter: 'blur(40px) saturate(150%)',
          }}
          initial={{ y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
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
          <h3 className="text-[19px] font-semibold leading-tight text-gray-950 dark:text-white/95 tracking-tight">
            Kawas's Substack
          </h3>

          {/* Tagline */}
          <p className="mt-2 text-[14px] leading-relaxed text-gray-700 dark:text-white/70">
            Notes on backend systems, ML papers, and whatever I&apos;m building.
          </p>

          {/* Supporting copy */}
          <p className="mt-3 text-[13px] leading-relaxed text-gray-700 dark:text-white/65">
            One email when something&apos;s worth your time. Unsubscribe anytime.
          </p>

          {/* CTA Button */}
          <Link
            href="https://kawas516.substack.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group mt-6 inline-flex items-center gap-2 rounded-full
              px-6 py-3
              text-[13px] font-medium text-white select-none
              bg-gradient-to-r from-fuchsia-600 to-rose-600
              hover:shadow-xl active:scale-[0.97]
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-400
              transition-all duration-300 ease-out
            "
            style={{
              boxShadow: '0 8px 24px rgba(192, 38, 211, 0.35)',
            }}
          >
            <span>Subscribe Now</span>
            <span aria-hidden="true" className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
              →
            </span>
          </Link>

        </motion.div>
      </div>

    </section>
  );
}
