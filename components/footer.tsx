'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { SubstackIcon } from '@/components/icons/substack-icon';

const footerNav = [
  { name: 'Timeline', href: '/timeline' },
  { name: 'About', href: '/about' },
  { name: 'Work', href: '/work' },
  { name: 'Reading', href: '/reading' },
];

const footerSocials = [
  { href: 'https://github.com/kawas8516', Icon: Github, label: 'GitHub' },
  { href: 'https://x.com/notkawas', Icon: Twitter, label: 'X / Twitter' },
  { href: 'https://linkedin.com/in/kawas-nandan', Icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://kawas516.substack.com', Icon: SubstackIcon, label: 'Substack' },
  { href: 'mailto:kaustubhamandhane24@gmail.com', Icon: Mail, label: 'Email' },
];

export function Footer() {
  return (
    <footer className="relative px-4 mt-12">
      <div className="mx-auto max-w-2xl border-t border-border/60 py-10">
        <motion.div
          className="space-y-6"
        >
          {/* Nav + socials */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {footerNav.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white/90 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              {footerSocials.map(({ href, Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className="p-2 rounded-lg text-gray-600 dark:text-white/60
                    hover:text-gray-900 dark:hover:text-white/90
                    hover:bg-black/[0.04] dark:hover:bg-white/[0.06]
                    transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Sign-off */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs text-gray-600 dark:text-white/60">
              © 2026 Kaustubha M · Pune, IN
            </p>
            <p className="text-xs italic text-gray-600 dark:text-white/60">Build. Learn. Iterate.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
