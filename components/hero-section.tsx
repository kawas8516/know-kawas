'use client';

import { motion } from 'framer-motion';
import { Linkedin, Github, Mail } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { icon: Linkedin, name: 'LinkedIn', href: 'https://www.linkedin.com/in/kawas-nandan' },
  { icon: Github, name: 'GitHub', href: 'https://github.com/kawas8516' },
  { icon: Mail, name: 'Email', href: 'mailto:kaustubhamandhane24@gmail.com' },
];

export function HeroSection() {
  return (
    <section id="about" className="relative px-4 pt-28 pb-16">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">Hi, I'm Kaustubha M</h1>

          <h2 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Backend Developer | Java, Python, Django
          </h2>

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
            I'm a backend developer focused on building intelligent systems and learning through practice. MCA student
            at MIT-WPU with hands-on experience in backend development and growing exposure to AI/ML concepts. I build
            chatbots, system utilities, and scalable web apps.
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
