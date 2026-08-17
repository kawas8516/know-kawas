'use client';

import { workProjects } from '@/lib/work-data';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { LiquidGlassBg } from '@/components/liquid-glass-bg';

// function MediumIcon({ className }: { className?: string }) {
//   return (
//     <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
//       <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
//     </svg>
//   );
// }

// function HashnodeIcon({ className }: { className?: string }) {
//   return (
//     <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
//       <path d="M22.351 8.019l-6.37-6.37a5.63 5.63 0 00-7.962 0l-6.37 6.37a5.63 5.63 0 000 7.962l6.37 6.37a5.63 5.63 0 007.962 0l6.37-6.37a5.63 5.63 0 000-7.962zM12 15.953a3.953 3.953 0 110-7.906 3.953 3.953 0 010 7.906z" />
//     </svg>
//   );
// }

// function DevToIcon({ className }: { className?: string }) {
//   return (
//     <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
//       <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.29zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z" />
//     </svg>
//   );
// }

// const writingIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
//   Medium: MediumIcon,
//   Hashnode: HashnodeIcon,
//   'Dev.to': DevToIcon,
// };

const projectIcons: Record<string, React.JSX.Element> = {
  'food-recipes-bot': (
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/30 to-green-500/15 flex items-center justify-center border border-emerald-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M12 2a10 10 0 0 1 10 10" />
        <circle cx="12" cy="12" r="6" />
      </svg>
    </div>
  ),
  writing: (
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/30 to-yellow-500/15 flex items-center justify-center border border-amber-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    </div>
  ),
  'java-task-scheduler': (
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400/30 to-amber-500/15 flex items-center justify-center border border-orange-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    </div>
  ),
  'cli-utilities': (
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400/30 to-cyan-500/15 flex items-center justify-center border border-blue-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.75">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    </div>
  ),
  belleza: (
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400/30 to-rose-500/15 flex items-center justify-center border border-pink-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-pink-400" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    </div>
  ),
  'railway-reservation': (
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-400/30 to-rose-500/15 flex items-center justify-center border border-fuchsia-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-fuchsia-400" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M9 17h6" />
        <path d="M12 3v18" />
      </svg>
    </div>
  ),
  'shopping-cart': (
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400/30 to-emerald-500/15 flex items-center justify-center border border-teal-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    </div>
  ),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export function WorkContent() {
  return (
    <>
      <LiquidGlassBg />

      <div className="relative pt-32 pb-24 px-4">
        <div className="mx-auto max-w-2xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full text-[11px] font-medium tracking-widest uppercase
                bg-white/30 dark:bg-white/[0.06] border border-white/50 dark:border-white/[0.1]
                text-gray-600 dark:text-white/60
                shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-amber-400 inline-block" />
              Selected Projects
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
              Work
            </h1>
            <p className="text-gray-600 dark:text-white/70 text-sm sm:text-[15px] max-w-md mx-auto leading-relaxed">
              Each of these projects reflects a piece of my journey.
              <br />
              Feel free to take a look around and explore the work I&apos;ve enjoyed building.
            </p>

            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/40 to-white/20 dark:via-white/20" />
              <div className="flex gap-1.5">
                <div className="w-1 h-1 rounded-full bg-fuchsia-400/60" />
                <div className="w-1 h-1 rounded-full bg-rose-400/60" />
                <div className="w-1 h-1 rounded-full bg-amber-400/60" />
              </div>
              <div className="h-px w-20 bg-gradient-to-l from-transparent via-white/40 to-white/20 dark:via-white/20" />
            </div>
          </motion.div>

          {/* Projects List */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
            {workProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl"
                whileHover={{ scale: 1.01 }}
              >
                {/* Per-card accent blob */}
                <div
                  className={`pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${project.accentBlob}`}
                  aria-hidden="true"
                />

                {/* Glass card */}
                <div
                  className="relative flex gap-4 sm:gap-5 p-5 rounded-2xl
                    bg-white/35 dark:bg-white/[0.05]
                    border border-white/60 dark:border-white/[0.08]
                    shadow-[0_4px_20px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]
                    dark:shadow-[0_4px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)]
                    transition-shadow duration-300
                    group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]
                    dark:group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]"
                  style={{ backdropFilter: 'blur(28px) saturate(180%) brightness(1.04)', WebkitBackdropFilter: 'blur(28px) saturate(180%) brightness(1.04)' }}
                >
                  {/* Specular shimmer */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl
                      bg-gradient-to-r from-transparent via-white/70 to-transparent
                      dark:via-white/15"
                  />

                  {/* Icon */}
                  <div className="flex-shrink-0 mt-0.5">{projectIcons[project.id]}</div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <h3 className="font-semibold text-gray-900 dark:text-white/90 tracking-tight">{project.name}</h3>
                      {project.badges.map((badge, index) => (
                        <span
                          key={index}
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${badge.color}`}
                          style={{ backdropFilter: 'blur(8px)' }}
                        >
                          {badge.label}
                        </span>
                      ))}
                    </div>

                    <p className="text-[13px] text-gray-600 dark:text-white/70 leading-relaxed">{project.description}</p>

                    {/* Language chips */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {project.languages.map((lang) => (
                        <span
                          key={lang}
                          className="text-[11px] px-2 py-0.5 rounded-full
                            bg-white/40 dark:bg-white/[0.06]
                            border border-white/50 dark:border-white/[0.08]
                            text-gray-600 dark:text-white/70"
                          style={{ backdropFilter: 'blur(8px)' }}
                        >
                          {lang}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3 mt-3">
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View on GitHub"
                          className="flex items-center gap-1.5 text-[12px] text-gray-600 dark:text-white/65 hover:text-gray-900 dark:hover:text-white/95 transition-colors duration-200"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                        </Link>
                      )}
                      {project.demo && (
                        <Link
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View live demo"
                          className="flex items-center gap-1.5 text-[12px] text-gray-600 dark:text-white/65 hover:text-gray-900 dark:hover:text-white/95 transition-colors duration-200"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </Link>
                      )}
                      {/* {project.writingLinks?.map((l) => {
                        const Icon = writingIconMap[l.label];
                        return Icon ? (
                          <Link
                            key={l.label}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={l.label}
                            className="text-gray-600 dark:text-white/65 hover:text-gray-900 dark:hover:text-white/95 transition-colors duration-200"
                          >
                            <Icon className="w-4 h-4" />
                          </Link>
                        ) : null;
                      })} */}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
