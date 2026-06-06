'use client';

import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';
import { NodeGraphBg } from '@/components/node-graph-bg';

function HackerRankIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.264 16.878H9.24V7.122h2.496v3.627h2.496V7.122h2.528v9.756h-2.528v-3.627h-2.496v3.627z" />
    </svg>
  );
}

function LeetCodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

const socialLinks = [
  { icon: Linkedin, name: 'LinkedIn', href: 'https://www.linkedin.com/in/kawas-nandan' },
  { icon: Github, name: 'GitHub', href: 'https://github.com/kawas8516' },
  { icon: Twitter, name: 'X', href: 'https://x.com/notkawas' },
  { icon: HackerRankIcon, name: 'HackerRank', href: 'https://www.hackerrank.com/profile/kawas8516' },
  { icon: LeetCodeIcon, name: 'LeetCode', href: 'https://leetcode.com/u/kawas8516/' },
  { icon: Mail, name: 'Email', href: 'mailto:kaustubhamandhane24@gmail.com' },
];

export function HeroSection() {
  return (
    <section id="about" className="relative overflow-hidden px-4 pt-28 pb-10">
      <NodeGraphBg />
      <div className="relative z-10 mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
            Hi, I&apos;m Kaustubha
          </h1>

          <h2 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Good at backends. Getting better in ML
          </h2>

          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0"
              style={{ boxShadow: '0 0 6px rgba(74, 222, 128, 0.7)' }}
              aria-hidden="true"
            />
            <span className="text-sm text-foreground/55 tracking-[.01em]">
              Currently open to internships · Pune / Remote
            </span>
          </div>

          {/* Primary CTA */}
          <motion.a
            href="/work"
            className="inline-flex items-center justify-center sm:justify-start gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg hover:opacity-90 transition-opacity w-full sm:w-auto mb-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            See my work
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>

          {/* Social Links Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <social.icon className="h-3.5 w-3.5" />
                <span>{social.name}</span>
              </Link>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground leading-relaxed text-base max-w-xl"
          >
            I write Java, Python, and Django. Reading AI and ML research papers alongside. This site
            is the log — projects I&apos;ve shipped, what I&apos;m reading, prompts I actually use.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground italic text-sm"
          >
            Build. Learn. Iterate.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
