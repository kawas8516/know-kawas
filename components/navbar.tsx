"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Instagram, Github, Linkedin, Gamepad2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
  { name: "timeline", href: "/timeline" },
  { name: "about", href: "/about" },
  { name: "work", href: "/work" },
  { name: "experience", href: "/#experience" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/">
            <motion.div className="relative flex items-center" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Logo
                text="Antriksh"
                size="md"
                ariaLabel="Antriksh - Home"
                disableAnimation
                className="italic font-light tracking-wide"
                style={{ fontFamily: "cursive" }}
              />
              {/* Gradient underline */}
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`text-sm transition-colors ${
                    pathname === link.href ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            {/* Social Icons */}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-zinc-700">
              <Link
                href="https://instagram.com"
                target="_blank"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link
                href="https://discord.com"
                target="_blank"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Gamepad2 className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-zinc-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      pathname === link.href
                        ? "text-white bg-zinc-800/50"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="flex items-center gap-4 px-4 pt-4 border-t border-zinc-800">
                <Link href="https://instagram.com" target="_blank" className="text-zinc-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="https://github.com" target="_blank" className="text-zinc-400 hover:text-white">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="https://linkedin.com" target="_blank" className="text-zinc-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="https://discord.com" target="_blank" className="text-zinc-400 hover:text-white">
                  <Gamepad2 className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
