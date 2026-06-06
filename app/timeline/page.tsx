'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Award, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Link from 'next/link';

type TimelineCategory = 'work' | 'education' | 'award'

interface TimelineEvent {
  id: number
  category: TimelineCategory
  title: string
  organization: string
  location: string
  date: string
  achievements: string[]
  link?: string
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    category: 'education',
    title: 'Master of Computer Applications (MCA)',
    organization: 'MIT World Peace University',
    location: 'Pune, Maharashtra, India',
    date: '2025 - 2027',
    achievements: [
      'Specializing in Computer Science with focus on backend development',
      'Building AI/ML projects including RAG-based chatbots',
      'Exploring microservices, Docker, and AWS',
    ],
    link: 'https://mitwpu.edu.in',
  },
  {
    id: 2,
    category: 'work',
    title: 'Content Writer',
    organization: 'STeRG',
    location: 'Pune, Maharashtra, India',
    date: 'Jan 2024 - Dec 2024',
    achievements: [
      'Composed 30+ emails to stakeholders',
      'Secured support and permissions from university authorities',
      'Developed professional communication skills',
    ],
  },
  {
    id: 3,
    category: 'work',
    title: 'General Member Board',
    organization: 'MIT-WPU Student Alumni Relations Society',
    location: 'Pune, Maharashtra, India',
    date: 'Feb 2024 - Aug 2024',
    achievements: [
      'Lead Generation: Identified and generated leads on LinkedIn for alumni podcasts and interviews',
      'Script Writing: Authored scripts for interviews reaching 1K+ students',
      'Helped grow the society\'s network and engagement',
    ],
  },
  {
    id: 4,
    category: 'education',
    title: 'Bachelor\'s in Computer Application',
    organization: 'Dr. Vishwanath Karad MIT World Peace University',
    location: 'Pune, Maharashtra, India',
    date: 'Aug 2022 - 2025',
    achievements: [
      'Specialization in Computer Software and Media Applications',
      'Built multiple projects including system utilities and web apps',
      'Active participation in technical clubs and hackathons',
    ],
    link: 'https://mitwpu.edu.in',
  },
  {
    id: 5,
    category: 'work',
    title: 'Co-Founder & Community Lead',
    organization: 'DNA (Discord Nation Alpha)',
    location: 'Remote',
    date: 'Jul 2020 - Sep 2022',
    achievements: [
      'Scaled a 4,300+ member creator network across Discord and Reddit',
      'Boosted community engagement by 35% through data-driven content strategies',
      'Surpassed 100,000+ messages in a single day — an all-time peak achievement',
      'Established governance framework and mentorship program, reducing churn by 20%',
      'Produced and edited tutorial videos; crafted graphics in Photoshop and Canva',
    ],
  },
  {
    id: 6,
    category: 'work',
    title: 'Associate Business Coordinator',
    organization: 'Hyperlinks.edit',
    location: 'Remote',
    date: 'Feb 2022 - May 2022',
    achievements: [
      'Coordinated business operations and client communications',
      'Supported team in achieving business objectives',
      'Gained experience in startup operations',
    ],
  },
  {
    id: 7,
    category: 'education',
    title: 'Secondary Education',
    organization: 'Mount Carmel English School',
    location: 'India',
    date: 'Jun 2008 - Jun 2018',
    achievements: ['Completed foundational education', 'Developed early interest in technology and computers'],
  },
];

const categoryIcons: Record<TimelineCategory, typeof Briefcase> = {
  work: Briefcase,
  education: GraduationCap,
  award: Award,
};

const categoryColors: Record<TimelineCategory, string> = {
  work: 'from-violet-500 to-purple-600',
  education: 'from-cyan-500 to-blue-600',
  award: 'from-amber-500 to-orange-600',
};

const categoryGlows: Record<TimelineCategory, string> = {
  work: 'shadow-violet-500/30',
  education: 'shadow-cyan-500/30',
  award: 'shadow-amber-500/30',
};

function TimelineCard({
  event,
  index,
}: {
  event: TimelineEvent
  index: number
}) {
  const isLeft = index % 2 === 0;
  const Icon = categoryIcons[event.category];

  return (
    <div className={`flex items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        whileHover={{ scale: 1.02, y: -4 }}
        className="flex-1"
      >
        <div
          className={`relative group bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:border-border hover:shadow-xl ${categoryGlows[event.category]}`}
        >
          {/* Glow effect */}
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${categoryColors[event.category]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
          />

          {/* Category badge */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${categoryColors[event.category]}`}>
              <Icon className="h-4 w-4 text-white" />
            </div>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">{event.category}</span>
          </div>

          {/* Date badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border/50 mb-4">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{event.date}</span>
          </div>

          {/* Title & Organization */}
          <h3 className="text-lg font-semibold text-foreground mb-1">{event.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            {event.link ? (
              <Link
                href={event.link}
                target="_blank"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                {event.organization}
                <ExternalLink className="h-3 w-3" />
              </Link>
            ) : (
              <span className="text-sm text-muted-foreground">{event.organization}</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
            <MapPin className="h-3 w-3" />
            {event.location}
          </div>

          {/* Achievements */}
          <ul className="space-y-2">
            {event.achievements.map((achievement, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span
                  className={`mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${categoryColors[event.category]} flex-shrink-0`}
                />
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Center marker - visible only on desktop */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={`relative h-5 w-5 rounded-full bg-gradient-to-br ${categoryColors[event.category]} shadow-lg ${categoryGlows[event.category]}`}
        >
          {/* Pulse effect */}
          <span
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${categoryColors[event.category]} animate-ping opacity-30`}
          />
        </motion.div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block flex-1" />
    </div>
  );
}

export default function TimelinePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <Navbar />

      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Timeline
              </span>
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              A quick look at my journey, highlighting key projects and growth as a developer. I prefer sharing my work
              here rather than on socials. Stay tuned for more updates and insights.
            </p>

            {/* Decorative line with dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-border" />
                <span className="h-1.5 w-1.5 rounded-full bg-border" />
                <span className="h-1.5 w-1.5 rounded-full bg-border" />
              </div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
            </div>
          </motion.div>

          {/* Category Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            {(Object.keys(categoryIcons) as TimelineCategory[]).map((category) => {
              const Icon = categoryIcons[category];
              return (
                <div key={category} className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md bg-gradient-to-br ${categoryColors[category]}`}>
                    <Icon className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground capitalize">{category}</span>
                </div>
              );
            })}
          </motion.div>

          {/* Timeline */}
          <div ref={containerRef} className="relative">
            {/* Animated vertical line - center on desktop, left on mobile */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px">
              {/* Background dashed line */}
              <div className="absolute inset-0 border-l border-dashed border-border" />

              {/* Animated solid line with glow */}
              <motion.div
                style={{ scaleY, originY: 0 }}
                className="absolute inset-0 w-px bg-gradient-to-b from-violet-500 via-purple-500 to-cyan-500"
              />

              {/* Glow effect */}
              <motion.div
                style={{ scaleY, originY: 0 }}
                className="absolute inset-0 w-4 -left-1.5 bg-gradient-to-b from-violet-500/20 via-purple-500/20 to-cyan-500/20 blur-sm"
              />
            </div>

            {/* Timeline events */}
            <div className="relative space-y-12 pl-12 md:pl-0">
              {timelineEvents.map((event, index) => (
                <TimelineCard key={event.id} event={event} index={index} />
              ))}
            </div>

            {/* End marker */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="absolute left-4 md:left-1/2 md:-translate-x-1/2 -bottom-4"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <div className="h-3 w-3 rounded-full bg-background" />
              </div>
            </motion.div>
          </div>

          {/* Back to home link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>←</span>
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
