'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Link from 'next/link';

const sections = [
  {
    id: 'what-i-do',
    label: 'WHAT I DO',
    content: (
      <>
        <p className="mb-4">
          I'm a backend developer focused on building intelligent systems and learning through practice. Whether it's
          crafting <strong className="text-white">chatbots</strong>,{' '}
          <strong className="text-white">system utilities</strong>, or{' '}
          <strong className="text-white">scalable web apps</strong>, I enjoy solving real-world problems with code.
        </p>
        <p>
          My toolkit includes <strong className="text-white">Java</strong>,{' '}
          <strong className="text-white">Python</strong>, <strong className="text-white">Django</strong>,{' '}
          <strong className="text-white">C/C++</strong>, <strong className="text-white">REST APIs</strong>,{' '}
          <strong className="text-white">PostgreSQL</strong>, and <strong className="text-white">Git/GitHub</strong>.
          I'm also exploring <strong className="text-white">AI/ML (RAG, LLMs)</strong>, cloud deployment, and robust
          backend patterns.
        </p>
      </>
    ),
  },
  {
    id: 'current',
    label: 'CURRENT',
    content: (
      <>
        <p className="mb-4">
          I'm currently pursuing my <strong className="text-white">MCA at MIT-WPU</strong> (post-graduating 2027) while
          building personal projects like the <strong className="text-white">Food Waste Chatbot</strong> — a recipe
          recommendation system using RAG + NLP that suggests recipes from available ingredients and gives storage tips.
        </p>
        <p>
          I'm strengthening my backend architecture & system design skills, integrating{' '}
          <strong className="text-white">LLMs and retrieval-augmented pipelines</strong> into practical apps, and
          preparing production-ready open-source projects for my portfolio.
        </p>
      </>
    ),
  },
  {
    id: 'previously',
    label: 'PREVIOUSLY',
    content: (
      <>
        <p className="mb-4">
          I co-founded <strong className="text-white">DNA (Discord Nation Alpha)</strong>, a 4,300+ member creator
          network. Boosted community engagement by 35% through strategic collaborations and data-driven insights,
          reaching 100,000+ messages in a single day. Reduced churn by 20% through governance and mentorship programs.
        </p>
        <p className="mb-4">
          At <strong className="text-white">STeRG</strong>, I composed 30+ stakeholder emails and secured support from
          university authorities. At <strong className="text-white">MIT-WPU Student Alumni Relations Society</strong>, I
          handled lead generation on LinkedIn for alumni podcasts and authored interview scripts reaching 1K+ students.
        </p>
        <p>
          I also worked as an <strong className="text-white">Associate Business Coordinator at Hyperlinks.edit</strong>,
          gaining experience in business operations and coordination.
        </p>
      </>
    ),
  },
  {
    id: 'education',
    label: 'EDUCATION',
    content: (
      <>
        <p className="mb-4">
          Currently pursuing <strong className="text-white">Master of Computer Applications (MCA)</strong> at{' '}
          <strong className="text-white">MIT World Peace University</strong>, graduating in July 2027.
        </p>
        <p>
          Completed my <strong className="text-white">Bachelor's in Computer Application</strong> from{' '}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-medium">
            Dr. Vishwanath Karad MIT World Peace University, Pune
          </span>{' '}
          (2022-2025), specializing in Computer Software and Media Applications.
        </p>
      </>
    ),
  },
  {
    id: 'certifications',
    label: 'CERTIFICATIONS',
    content: (
      <p>
        <strong className="text-white">Complete A.I. & Machine Learning, Data Science Bootcamp</strong> — Comprehensive
        training in AI/ML fundamentals, data science techniques, and practical applications of machine learning
        algorithms.
      </p>
    ),
  },
  {
    id: 'contact',
    label: 'CONTACT',
    content: (
      <>
        <p className="mb-4">
          Reach out via email at{' '}
          <Link href="mailto:kaustubhamandhane24@gmail.com" className="text-white hover:underline">
            kaustubhamandhane24@gmail.com
          </Link>
          , or connect on{' '}
          <Link href="https://www.linkedin.com/in/kawas-nandan" target="_blank" className="text-white hover:underline">
            LinkedIn
          </Link>{' '}
          or{' '}
          <Link href="https://github.com/kawas8516" target="_blank" className="text-white hover:underline">
            GitHub
          </Link>
          .
        </p>
        <p>
          I'm always open to <strong className="text-white">remote backend development roles</strong> where I can write
          scalable code, learn from experienced engineers, and contribute to products that matter.
        </p>
      </>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-600/8 rounded-full blur-[150px]" />
      </div>

      <Navbar />

      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                About
              </span>
            </h1>
            <p className="text-zinc-400 mb-6">Here's a bit about me. I prefer showcasing my work over my socials.</p>

            {/* Decorative line with dots */}
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-zinc-700" />
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
              </div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-zinc-700" />
            </div>
          </motion.div>

          {/* Content Sections */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
            {sections.map((section) => (
              <motion.section key={section.id} variants={sectionVariants} className="group">
                {/* Section Label */}
                <h2 className="text-xs uppercase tracking-[0.2em] text-zinc-600 mb-4 font-medium">{section.label}</h2>

                {/* Section Content */}
                <div className="text-zinc-400 leading-relaxed">{section.content}</div>
              </motion.section>
            ))}
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
