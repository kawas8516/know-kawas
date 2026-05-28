'use client';

import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { icon: Linkedin, name: 'LinkedIn', href: 'https://www.linkedin.com/in/kawas-nandan' },
  { icon: Github, name: 'GitHub', href: 'https://github.com/kawas8516' },
  { icon: Twitter, name: 'X', href: 'https://x.com/notkawas' },
  { icon: Mail, name: 'Email', href: 'mailto:kaustubhamandhane24@gmail.com' },
];

export function HeroSection() {
  return (
    <section id="about" className="relative px-4 pt-28 pb-10">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Hi, I&apos;m Kaustubha
          </h1>

          <h2 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Good at backends. Getting better in ML
          </h2>

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
                className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
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
            className="text-zinc-400 leading-relaxed text-base max-w-xl"
          >
            I write Java, Python, and Django. Reading AI and ML research papers alongside. This site
            is the log — projects I&apos;ve shipped, what I&apos;m reading, prompts I actually use.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-zinc-500 italic text-sm"
          >
            Build. Learn. Iterate.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
