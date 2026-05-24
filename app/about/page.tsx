'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { TaskFileView } from '@/components/task-file-view';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* G12 ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[150px]" />
        <div className="absolute top-1/4 -right-32 h-[400px] w-[400px] rounded-full bg-blue-500/15 blur-[120px]" />
        <div className="absolute top-[45%] left-1/4 h-[350px] w-[350px] rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/3 h-[300px] w-[300px] rounded-full bg-orange-500/10 blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <div className="pt-32 pb-20 px-4 sm:px-6">
          <div className="mx-auto max-w-2xl">
            {/* PageHeader */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">about</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                A living file.
              </h1>
              <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-md mx-auto leading-relaxed">
                I&apos;m Kaustubha. Backend developer, pursuing my MCA at MIT-WPU, with a deep
                interest in AI/ML systems and the physical-AI era. I structure work the way I
                structure this page — as a TODO file.
              </p>
              {/* G5 hairline */}
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

            {/* Intro */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-sm text-zinc-400 leading-relaxed mb-8"
            >
              What&apos;s shipped, what I&apos;m building, what&apos;s queued. It updates as I do.
            </motion.p>

            {/* TaskFileView */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <TaskFileView />
            </motion.div>

            {/* Footer nudge */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm text-zinc-400 mt-6"
            >
              Have a{' '}
              <span className="font-mono text-muted-foreground">// [P?]</span> suggestion?{' '}
              <a
                href="mailto:kaustubhamandhane24@gmail.com"
                className="text-primary hover:underline"
              >
                Email me →
              </a>
            </motion.p>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
