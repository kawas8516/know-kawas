'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Twitter, Search } from 'lucide-react';
import { SubstackIcon } from '@/components/icons/substack-icon';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CommandPalette } from '@/components/command-palette';
import { ThemeToggle } from '@/components/theme-toggle';

const navLinks = [
  { name: 'timeline', href: '/timeline' },
  { name: 'about', href: '/about' },
  { name: 'work', href: '/work' },
  { name: 'experience', href: '/#experience' },
  { name: 'reading', href: '/reading' },
];

const socialLinks = [
  { href: 'https://github.com/kawas8516', Icon: Github, label: 'GitHub' },
  { href: 'https://x.com/notkawas', Icon: Twitter, label: 'X / Twitter' },
  { href: 'https://linkedin.com/in/kawas-nandan', Icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://kawas516.substack.com', Icon: SubstackIcon, label: 'Substack' },
];

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsMobileOpen(false); }, [pathname]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 sm:px-6">
        {/* ── Floating glass island ── */}
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="relative mx-auto max-w-5xl"
        >
          <div
            className="relative flex h-12 items-center justify-between px-4 rounded-2xl
              bg-white/45 dark:bg-white/[0.08]
              border border-white/65 dark:border-white/[0.14]
              shadow-[0_8px_32px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.06),inset_0_1.5px_0_rgba(255,255,255,0.90)]
              dark:shadow-[0_8px_40px_rgba(0,0,0,0.45),0_2px_8px_rgba(0,0,0,0.3),inset_0_1.5px_0_rgba(255,255,255,0.10)]"
            style={{
              backdropFilter: 'blur(48px) saturate(200%) brightness(1.06)',
              WebkitBackdropFilter: 'blur(48px) saturate(200%) brightness(1.06)',
            }}
          >
            {/* Specular shimmer — top edge */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-4 top-0 h-px
                bg-gradient-to-r from-transparent via-white/90 to-transparent
                dark:via-white/25 rounded-full"
            />
            {/* Soft bottom reflection */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-8 bottom-0 h-px
                bg-gradient-to-r from-transparent via-white/30 to-transparent
                dark:via-white/08 rounded-full"
            />

            {/* ── Logo ── */}
            <Link href="/">
              <motion.div
                className="relative flex items-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Logo
                  text="Kawas"
                  size="md"
                  ariaLabel="Kawas — Home"
                  disableAnimation
                  className="italic font-light tracking-wide"
                  style={{ fontFamily: 'cursive' }}
                />
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400" />
              </motion.div>
            </Link>

            {/* ── Desktop: nav capsule + search + social ── */}
            <div className="hidden md:flex items-center gap-2.5">

              {/* Nav links - bare, floating inside the island */}
              <nav className="flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative px-3 py-1 rounded-lg text-[12.5px] font-medium transition-all duration-200 select-none ${
                        isActive
                          ? 'text-gray-900 dark:text-white/95'
                          : 'text-gray-500 dark:text-white/45 hover:text-gray-800 dark:hover:text-white/80 hover:bg-white/40 dark:hover:bg-white/[0.07]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-link"
                          className="absolute inset-0 rounded-lg
                            bg-white/65 dark:bg-white/[0.12]
                            border border-white/75 dark:border-white/[0.14]
                            shadow-[0_2px_8px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.9)]
                            dark:shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.10)] -z-10"
                          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                        />
                      )}
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Search pill */}
              <motion.button
                onClick={() => setPaletteOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Open search"
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                  bg-white/35 dark:bg-white/[0.06]
                  border border-white/55 dark:border-white/[0.10]
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_8px_rgba(0,0,0,0.05)]
                  dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_2px_8px_rgba(0,0,0,0.2)]
                  text-gray-500 dark:text-white/40
                  hover:bg-white/55 dark:hover:bg-white/[0.10]
                  hover:text-gray-800 dark:hover:text-white/70
                  transition-all duration-200"
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-2 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/20" />
                <Search size={11} className="flex-shrink-0" />
                <span className="text-[11.5px] font-mono">search</span>
                <kbd className="ml-0.5 inline-flex items-center text-[9.5px] px-1.5 py-0.5 rounded-md font-sans
                  bg-white/60 dark:bg-white/[0.08]
                  border border-white/60 dark:border-white/[0.10]
                  text-gray-400 dark:text-white/30
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                  ⌘K
                </kbd>
              </motion.button>

              {/* Divider */}
              <div className="h-4 w-px bg-white/50 dark:bg-white/[0.12] mx-0.5" />

              {/* Social icons */}
              <div className="flex items-center gap-2">
                {socialLinks.map(({ href, Icon, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-1.5 rounded-lg text-gray-400 dark:text-white/35
                      hover:text-gray-900 dark:hover:text-white/85
                      hover:bg-white/40 dark:hover:bg-white/[0.07]
                      transition-all duration-200"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="h-4 w-px bg-white/50 dark:bg-white/[0.12] mx-0.5" />

              <ThemeToggle />
            </div>

            {/* ── Mobile: hamburger ── */}
            <button
              className="md:hidden p-1.5 rounded-lg text-gray-500 dark:text-white/45
                hover:bg-white/40 dark:hover:bg-white/[0.07] transition-colors"
              onClick={() => setIsMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* ── Mobile drawer — glass panel below island ── */}
          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="relative mt-2 rounded-2xl overflow-hidden
                  bg-white/50 dark:bg-white/[0.08]
                  border border-white/65 dark:border-white/[0.14]
                  shadow-[0_16px_48px_rgba(0,0,0,0.12),inset_0_1.5px_0_rgba(255,255,255,0.90)]
                  dark:shadow-[0_16px_48px_rgba(0,0,0,0.5),inset_0_1.5px_0_rgba(255,255,255,0.10)]"
                style={{
                  backdropFilter: 'blur(48px) saturate(200%) brightness(1.06)',
                  WebkitBackdropFilter: 'blur(48px) saturate(200%) brightness(1.06)',
                }}
              >
                {/* Shimmer top */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-white/25 rounded-full" />

                <div className="px-3 py-3 space-y-1">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                            isActive
                              ? 'text-gray-900 dark:text-white/95 font-medium bg-white/60 dark:bg-white/[0.10] border border-white/70 dark:border-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]'
                              : 'text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white/85 hover:bg-white/40 dark:hover:bg-white/[0.06]'
                          }`}
                        >
                          {isActive && <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex-shrink-0" />}
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Bottom row */}
                  <div className="flex items-center justify-between px-4 pt-3 mt-1 border-t border-white/40 dark:border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      {socialLinks.map(({ href, Icon, label }) => (
                        <Link
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="text-gray-400 dark:text-white/35 hover:text-gray-900 dark:hover:text-white/80 transition-colors"
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </Link>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setPaletteOpen(true); setIsMobileOpen(false); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs
                          bg-white/40 dark:bg-white/[0.06]
                          border border-white/55 dark:border-white/[0.10]
                          text-gray-500 dark:text-white/40
                          hover:bg-white/60 dark:hover:bg-white/[0.10]
                          transition-all duration-200"
                      >
                        <Search size={11} />
                        <span className="font-mono">search</span>
                      </button>
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}