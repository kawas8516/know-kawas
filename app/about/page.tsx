'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, X } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

type ModalEntry = {
  tag: string;
  tagBg: string;
  tagColor: string;
  title: string;
  body: React.ReactNode;
};

const MODAL_DATA: Record<string, ModalEntry> = {
  dna: {
    tag: 'Community Building',
    tagBg: 'rgba(236,72,153,0.1)',
    tagColor: '#be185d',
    title: 'Discord Nation Alpha (DNA)',
    body: (
      <>
        <p>
          Co-founded in 2020 as a Gen-Z focused digital creator and community network
          operating across Discord. Supported content creators and social media influencers
          through video editing, content writing, graphic design, and audience building.
        </p>
        <ul>
          <li>
            Scaled to <strong>4,300+ members</strong>
          </li>
          <li>
            <strong>~35% growth</strong> in community engagement via data-driven strategies
            and creator collaborations
          </li>
          <li>Reduced churn through structured mentorship and governance initiatives</li>
          <li>
            Contributed across operations, moderation, engagement strategy, and creator
            collaboration
          </li>
        </ul>
        <p className="mt-3 italic text-sm opacity-70">
          DNA taught me how to build and manage communities from the ground up — taking
          ownership across different roles, working with a long-term mindset, and staying
          adaptable in a fast-moving online environment. Communication, leadership, and
          data-driven decisions on retention and growth were how we kept 4,300+ members
          engaged.
        </p>
      </>
    ),
  },

  rag: {
    tag: 'Project Highlight',
    tagBg: 'rgba(29,158,117,0.1)',
    tagColor: '#0f6e56',
    title: 'Food Waste Chatbot · RAG + FAISS + Django',
    body: (
      <>
        <p>
          An end-to-end RAG system built to reduce food waste through intelligent
          query-answering. The project where retrieval pipelines finally clicked beyond
          what the papers described.
        </p>
        <p>
          <strong>Stack:</strong> Django · FAISS · NLP preprocessing · Python
        </p>
        <p>
          <strong>Key insight:</strong> 80% of RAG quality is in the retrieval step, not
          the generation. The LLM is the easy part. Chunking strategy, embedding model
          choice, metadata filters — that is where the real engineering lives.
        </p>
        <p>
          Run your retrieval quality check across N samples to spot patterns — usually
          reveals chunking problems, not retrieval problems.
        </p>
      </>
    ),
  },

  connections: {
    tag: 'Cross-Pollination',
    tagBg: 'rgba(186,117,23,0.1)',
    tagColor: '#854f0b',
    title: 'How domains connect',
    body: (
      <>
        <p>
          The same mental models keep appearing across different domains. A few I have
          noticed:
        </p>
        <ul>
          <li>
            <strong>Community ops → Systems thinking:</strong>{' '}
            Running DNA taught me to see a community as a whole system — roles, incentives,
            feedback loops, failure modes. That same structural thinking transfers when
            designing software or managing a project.
          </li>
          <li>
            <strong>Classification models → Research papers:</strong>{' '}
            Starting with Hugging Face implementations gave me enough intuition to read the
            papers behind them. The practical work came first; the theory clicked after.
          </li>
          <li>
            <strong>RAG pipelines → Agentic AI:</strong>{' '}
            RAG taught me that grounding matters more than generation. Agentic systems have
            the same problem — they need to retrieve from the real world, not just a vector
            store.
          </li>
          <li>
            <strong>Task Scheduler → This page:</strong>{' '}
            A queue with priorities and statuses. This page is structured the same way. The
            irony was intentional.
          </li>
        </ul>
      </>
    ),
  },

  philosophy: {
    tag: 'Philosophy',
    tagBg: 'rgba(127,119,221,0.1)',
    tagColor: '#534ab7',
    title: '"Build. Learn. Iterate."',
    body: (
      <>
        <p>The only rule that survived every project and every failure.</p>
        <p>
          Not &quot;plan endlessly.&quot; Not &quot;wait until you are ready.&quot; Build
          something. Learn from it honestly. Iterate until it works — or until you
          understand exactly why it cannot.
        </p>
        <p>
          I have built things that worked and things that did not. The ones that did not
          taught more. The pattern holds at every scale — a side project, a community, a
          career.
        </p>
        <p className="italic text-sm mt-2 opacity-70">
          DNA was run this way. The Food Waste Chatbot was built this way. This site was
          designed this way. The iterate part is the one everyone skips — that is where all
          the real learning lives.
        </p>
      </>
    ),
  },

  backlog: {
    tag: 'Backlog.md',
    tagBg: 'rgba(127,119,221,0.1)',
    tagColor: '#534ab7',
    title: 'Current priorities',
    body: (
      <>
        <ul>
          <li>
            <strong>[P0]</strong> Ship a production RAG project with a full evaluation
            harness — not just a demo
          </li>
          <li>
            <strong>[P0]</strong> Finish Designing Data-Intensive Applications (halfway
            through)
          </li>
          <li>
            <strong>[P1]</strong> First meaningful open-source contribution to an LLM
            tooling project
          </li>
          <li>
            <strong>[P1]</strong> First long-form essay on a topic I have gone deep on
          </li>
          <li>
            <strong>[P2]</strong> Go deeper on Hugging Face — models, fine-tuning, beyond
            the tutorial implementations
          </li>
          <li>
            <strong>[P2]</strong> Run a workshop for juniors at MIT-WPU
          </li>
        </ul>
        <p className="text-sm italic mt-3 opacity-50">// update these when they ship</p>
      </>
    ),
  },

  status: {
    tag: 'Live Status',
    tagBg: 'rgba(74,222,128,0.1)',
    tagColor: '#166534',
    title: 'Where things stand',
    body: (
      <>
        <ul>
          <li>
            <strong>MCA at MIT-WPU</strong> — active, graduating July 2027. Mix of
            technical and research subjects.
          </li>
          <li>
            <strong>Actively reading</strong> — AI and ML research papers weekly.
            Currently discussing Memory in the Age of AI Agents with people online.
          </li>
          <li>
            <strong>Building</strong> — production RAG project. Current focus is the
            evaluation layer — RAGAS metrics, faithfulness scoring, moving beyond
            subjective quality checks.
          </li>
          <li>
            <strong>Shipping</strong> — reading list, this site, small tools as they come.
          </li>
        </ul>
        <p className="mt-3">
          Open to: internships, research collaborations, community work.
        </p>
      </>
    ),
  },

  jrn: {
    tag: 'Journey',
    tagBg: 'rgba(59,130,246,0.1)',
    tagColor: '#1d4ed8',
    title: 'How I got here',
    body: (
      <>
        <ul>
          <li>
            <strong style={{ color: 'rgba(255,255,255,0.8)' }}>
              BCA · MIT-WPU · 2022–25
            </strong>{' '}
            — systems, algorithms, C/C++, SQL. First classification models and Hugging Face
            implementations.
          </li>
          <li>
            <strong style={{ color: 'rgba(255,255,255,0.8)' }}>
              Discord Nation Alpha · 2020–24
            </strong>{' '}
            — co-founded, 4,300+ members, 35% engagement growth.
          </li>
          <li>
            <strong style={{ color: 'rgba(255,255,255,0.8)' }}>
              Food Waste Chatbot · 2024
            </strong>{' '}
            — first end-to-end RAG system. Django + FAISS + NLP.
          </li>
          <li>
            <strong style={{ color: 'rgba(255,255,255,0.8)' }}>
              MCA · MIT-WPU · 2025–27
            </strong>{' '}
            — currently active. Mix of technical and research subjects. Reading AI research
            papers weekly.
          </li>
        </ul>
      </>
    ),
  },
};

const SOCIAL_LINKS = [
  { href: 'https://github.com/kawas8516', icon: Github, label: 'kawas8516' },
  { href: 'https://www.linkedin.com/in/kawas-nandan', icon: Linkedin, label: 'kawas-nandan' },
  { href: 'https://x.com/notkawas', icon: Twitter, label: 'notkawas' },
  { href: 'mailto:kaustubhamandhane24@gmail.com', icon: Mail, label: 'email' },
];

const STATUS_DOTS = [
  { color: '#4ade80', glow: 'rgba(74,222,128,0.7)', label: 'Building' },
  { color: '#fbbf24', glow: 'rgba(251,191,36,0.7)', label: 'Learning' },
  { color: '#60a5fa', glow: 'rgba(96,165,250,0.7)', label: 'Shipping' },
];

const LINE_NUMBERS = Array.from({ length: 40 }, (_, i) => i + 1);

const CONNECTIONS = [
  { left: 'Community ops', right: 'Systems thinking' },
  { left: 'Classification models', right: 'Research papers' },
  { left: 'RAG pipelines', right: 'Agentic AI' },
  { left: 'Task Scheduler (Java)', right: 'Structure of this very page' },
];

const BACKLOG_ITEMS = [
  { priority: 'P0', className: 'bg-red-100 text-red-700', text: 'Ship production RAG project with eval harness' },
  { priority: 'P0', className: 'bg-red-100 text-red-700', text: 'Finish Designing Data-Intensive Applications' },
  { priority: 'P1', className: 'bg-violet-100 text-violet-700', text: 'First OSS contribution to LLM tooling' },
];

const STATUS_PILLS = [
  { bg: '#fef08a', color: '#713f12', text: 'MCA · active' },
  { bg: '#bfdbfe', color: '#1e3a5f', text: 'Building RAG' },
  { bg: '#bbf7d0', color: '#14532d', text: 'Actively reading' },
  { bg: '#f3e8ff', color: '#6b21a8', text: 'Open to collabs' },
];

export default function AboutPage() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-10">
        {/* ── HERO ── */}
        <section className="mx-auto max-w-[560px] px-4 mb-6">
          <p className="text-[9px] uppercase tracking-[.16em] text-muted-foreground/60 mb-2.5 font-mono">
            Portfolio · Pune, IN
          </p>

          <h1 className="text-[32px] font-bold leading-[1.1] mb-2.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Hey, I&apos;m Kawas.
          </h1>

          <p className="text-[13px] text-muted-foreground/80 leading-[1.65] max-w-[400px] mb-3.5">
            Backend developer. Co-founded DNA. Started with classification models and Hugging
            Face in undergrad — now reading research papers, following where the field is
            going. The direction is clear: Gen AI → Agentic AI → what comes next. I&apos;m
            moving deeper.
          </p>

          <div className="flex flex-wrap gap-[18px]">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[5px] text-xs text-muted-foreground/40 hover:text-foreground transition-colors"
              >
                <Icon className="size-3" />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="mx-auto max-w-[560px] px-4">
          <hr className="border-border mb-8" />
        </div>

        {/* ── THREE-COLUMN CANVAS ── */}
        <div className="flex justify-center items-start gap-0 px-3 relative">
          {/* LEFT PANEL — 72px */}
          <div className="hidden md:flex w-[72px] flex-shrink-0 mt-1 flex-col gap-2.5">
            {/* Status box */}
            <div className="bg-muted/30 border border-border rounded p-2">
              <p className="text-[8px] uppercase tracking-[.08em] text-muted-foreground/50 font-mono mb-1.5">
                Status
              </p>
              {STATUS_DOTS.map(({ color, glow, label }) => (
                <div key={label} className="flex items-center gap-1 mb-1 last:mb-0">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: color, boxShadow: `0 0 5px ${glow}` }}
                  />
                  <span className="text-[9px] text-muted-foreground/55 font-mono">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Yellow sticky */}
            <div className="relative" style={{ transform: 'rotate(-4deg)' }}>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-500 shadow-md z-10" />
              <div
                className="text-[8.5px] leading-[1.5] p-2 rounded-sm"
                style={{
                  background: '#fef08a',
                  color: '#713f12',
                  boxShadow: '1px 3px 8px rgba(0,0,0,0.35)',
                }}
              >
                <p className="font-bold mb-0.5">key takeaway</p>
                <p>ownership across every role</p>
              </div>
            </div>
          </div>

          {/* CENTER PAPER */}
          <div className="w-full max-w-[460px] md:flex-shrink-0 md:mx-3 relative">
            <div
              className="relative overflow-hidden"
              style={{
                background: 'linear-gradient(165deg, #f7f0e0, #f0e8ce, #ede0c4)',
                borderRadius: '2px',
                boxShadow:
                  '0 12px 50px rgba(0,0,0,.65), 0 2px 10px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.4)',
              }}
            >
              {/* Top rule */}
              <div className="h-[3px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />

              {/* Two-column inner layout */}
              <div className="flex">
                {/* GUTTER */}
                <div
                  className="font-mono text-[8px] text-black/25 flex-shrink-0"
                  style={{
                    background: 'rgba(0,0,0,0.04)',
                    borderRight: '1px solid rgba(0,0,0,0.1)',
                    padding: '10px 0',
                    minWidth: '26px',
                  }}
                >
                  {LINE_NUMBERS.map((n) => (
                    <div
                      key={n}
                      style={{
                        lineHeight: '20px',
                        paddingRight: '5px',
                        textAlign: 'right',
                      }}
                    >
                      {n}
                    </div>
                  ))}
                </div>

                {/* BODY */}
                <div className="flex-1 min-w-0 p-3 pr-4">
                  {/* META ROW */}
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <span className="font-mono text-[8.5px] text-black/40">
                      06. Apr 23, creator days
                    </span>
                    <span
                      className="text-[8px] px-2 py-0.5 rounded-sm font-mono tracking-[.06em] border"
                      style={{
                        background: '#1a1525',
                        color: 'rgba(255,255,255,0.45)',
                        borderColor: 'rgba(255,255,255,0.08)',
                      }}
                    >
                      PRIVATE · KM-001
                    </span>
                  </div>

                  {/* Title block */}
                  <h2 className="font-mono text-[15px] font-bold text-black tracking-[.05em]">
                    CROSS-POLLINATION LOG
                  </h2>
                  <p className="text-[9.5px] text-black/50 italic">
                    — no, no, everything connects.
                  </p>
                  <p className="font-mono text-[9.5px] text-black/60 font-bold mb-2">
                    [RESEARCH YEAR: 2025]
                  </p>

                  <div className="border-t border-black/10 my-1.5" />

                  {/* ── SECTION 0: JOURNEY ── */}
                  <motion.div
                    className="py-2 border-b cursor-pointer relative group"
                    style={{ borderColor: 'rgba(0,0,0,0.08)' }}
                    initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    onClick={() => setActiveId('jrn')}
                    role="button"
                    aria-label="Open Journey"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-amber-700 text-[10px]">★</span>
                      <span className="font-mono text-[8px] uppercase tracking-[.09em] text-black/50">
                        Journey · 2020–present
                      </span>
                    </div>
                    <h3 className="font-mono text-[11.5px] font-bold text-black tracking-[.03em] leading-[1.4] mb-1">
                      HOW I GOT HERE
                    </h3>
                    <div className="space-y-0.5 mt-1">
                      {[
                        { text: 'BCA 2022–25', className: 'text-black/55' },
                        { text: 'DNA · 2020–24', className: 'text-black/55' },
                        { text: 'RAG Chatbot', className: 'text-black/55' },
                        { text: 'MCA · active', className: 'text-violet-700' },
                        { text: 'Research papers + models', className: 'text-blue-700' },
                      ].map(({ text, className }) => (
                        <div key={text} className="flex items-center gap-1.5 text-[9.5px]">
                          <span className="text-amber-600 text-[9px]">✦</span>
                          <span className={`font-serif ${className}`}>{text}</span>
                        </div>
                      ))}
                    </div>
                    <span className="text-[9px] text-black/20 group-hover:text-black/50 transition-colors flex items-center gap-1 mt-1">
                      → read more
                    </span>
                  </motion.div>

                  {/* ── SECTION 1: DNA ── */}
                  <motion.div
                    className="py-2 border-b cursor-pointer relative group"
                    style={{ borderColor: 'rgba(0,0,0,0.08)' }}
                    initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    onClick={() => setActiveId('dna')}
                    role="button"
                    aria-label="Open Discord Nation Alpha"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-amber-700 text-[10px]">★</span>
                      <span className="font-mono text-[8px] uppercase tracking-[.09em] text-black/50">
                        Community building · 2020–2024
                      </span>
                    </div>
                    <h3 className="font-mono text-[11.5px] font-bold text-black tracking-[.03em] leading-[1.4] mb-1">
                      DISCORD NATION ALPHA
                      <span className="text-[9px] text-red-600 ml-1">
                        (REF:{' '}
                        <span className="bg-orange-200 text-orange-900 px-1 rounded-sm font-semibold text-[9px]">
                          CREATOR ECONOMY
                        </span>
                        )
                      </span>
                    </h3>
                    <p className="font-serif text-[10px] text-black/55 leading-[1.78]">
                      Co-founded Gen-Z digital creator and community network.{' '}
                      <span className="text-green-700 font-semibold underline decoration-green-600/40">
                        Scaled to 4,300+ members
                      </span>{' '}
                      across Discord — video editing, content writing, graphic design,
                      audience building. Worked across multiple hierarchy levels:
                      operations, moderation, engagement strategy, creator collaboration.{' '}
                      <span className="line-through text-black/30">
                        tried everything at once
                      </span>{' '}
                      Achieved{' '}
                      <span className="bg-orange-100 text-orange-900 px-1 rounded-sm text-[9px] font-semibold">
                        ~35% engagement growth
                      </span>{' '}
                      via data-driven strategy and creator collaborations.
                      <br />
                      <span className="text-red-600 italic text-[9.5px]">
                        ↳ owned every role — operations, moderation, creator strategy
                      </span>
                    </p>

                    {/* Overlapping sticky */}
                    <div
                      className="absolute right-[-10px] top-4 z-10"
                      style={{ transform: 'rotate(3.5deg)' }}
                    >
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-pink-500 shadow-md z-10" />
                      <div
                        className="text-[8.5px] leading-[1.5] p-2 w-[88px] rounded-sm"
                        style={{
                          background: '#fef08a',
                          color: '#713f12',
                          boxShadow: '1px 3px 8px rgba(0,0,0,0.25)',
                        }}
                      >
                        <p className="font-bold text-[8px] mb-0.5">35% growth</p>
                        <p>data-driven strategy + creator collabs</p>
                      </div>
                    </div>
                    <span className="text-[9px] text-black/20 group-hover:text-black/50 transition-colors flex items-center gap-1 mt-1">
                      → read more
                    </span>
                  </motion.div>

                  {/* ── SECTION 2: RAG ── */}
                  <motion.div
                    className="py-2 border-b cursor-pointer relative group"
                    style={{ borderColor: 'rgba(0,0,0,0.08)' }}
                    initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    onClick={() => setActiveId('rag')}
                    role="button"
                    aria-label="Open Food Waste Chatbot"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-amber-700 text-[10px]">★</span>
                      <span className="font-mono text-[8px] uppercase tracking-[.09em] text-black/50">
                        AI/ML systems · 2024
                      </span>
                    </div>
                    <h3 className="font-mono text-[11.5px] font-bold text-black tracking-[.03em] leading-[1.4] mb-1">
                      FOOD WASTE CHATBOT{' '}
                      <span className="underline decoration-blue-500 text-blue-700">
                        (RAG · FAISS · DJANGO)
                      </span>
                    </h3>
                    <p className="font-serif text-[10px] text-black/55 leading-[1.78]">
                      First end-to-end retrieval pipeline shipped.{' '}
                      <span className="text-red-600 font-semibold underline decoration-red-500/50">
                        80% of RAG quality lives in retrieval
                      </span>
                      ,{' '}
                      <span className="line-through text-black/30">not the model</span>{' '}
                      not the generation. Chunking strategy, embedding model choice,
                      metadata filters —{' '}
                      <span className="bg-orange-100 text-orange-900 px-1 rounded-sm text-[9px] font-semibold">
                        chunking strategy clicked here
                      </span>
                      .
                      <br />
                      <span className="text-red-600 italic text-[9.5px]">
                        → re-read the RAG paper after building — it reads differently
                      </span>
                    </p>

                    {/* Diagonal annotation */}
                    <span
                      className="absolute right-[-18px] top-6 text-red-600 italic text-[9px] whitespace-nowrap pointer-events-none z-[8]"
                      style={{ transform: 'rotate(-18deg)' }}
                    >
                      amounts of thought →
                    </span>
                    <span className="text-[9px] text-black/20 group-hover:text-black/50 transition-colors flex items-center gap-1 mt-1">
                      → read more
                    </span>
                  </motion.div>

                  {/* ── SECTION 3: CONNECTIONS ── */}
                  <motion.div
                    className="py-2 border-b cursor-pointer relative group"
                    style={{ borderColor: 'rgba(0,0,0,0.08)' }}
                    initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    onClick={() => setActiveId('connections')}
                    role="button"
                    aria-label="Open Cross-domain connections"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-amber-700 text-[10px]">★</span>
                      <span className="font-mono text-[8px] uppercase tracking-[.09em] text-black/50">
                        Cross-domain connections
                      </span>
                    </div>
                    <h3 className="font-mono text-[11.5px] font-bold text-black tracking-[.03em] leading-[1.4] mb-1">
                      HOW DOMAINS CROSS-POLLINATE
                    </h3>
                    {CONNECTIONS.map(({ left, right }) => (
                      <div
                        key={left}
                        className="flex items-center gap-1 text-[9.5px] text-black/55 mt-1"
                      >
                        <div className="flex-1 px-1.5 py-0.5 rounded bg-black/5 border border-black/10 font-mono text-[9px] text-black/50">
                          {left}
                        </div>
                        <span className="text-black/30 font-mono text-[10px]">→</span>
                        <div className="flex-1 px-1.5 py-0.5 rounded bg-black/5 border border-black/10 font-mono text-[9px] text-black/50">
                          {right}
                        </div>
                      </div>
                    ))}
                    <span className="text-red-600 italic text-[9.5px] block mt-1">
                      ↳ the last one was intentional — philosophy as engineering
                    </span>
                    <span className="text-[9px] text-black/20 group-hover:text-black/50 transition-colors flex items-center gap-1 mt-1">
                      → read more
                    </span>
                  </motion.div>

                  {/* ── SECTION 4: PHILOSOPHY ── */}
                  <motion.div
                    className="py-2 border-b cursor-pointer relative group"
                    style={{ borderColor: 'rgba(0,0,0,0.08)' }}
                    initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    onClick={() => setActiveId('philosophy')}
                    role="button"
                    aria-label="Open Philosophy"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-amber-700 text-[10px]">★</span>
                      <span className="font-mono text-[8px] uppercase tracking-[.09em] text-black/50">
                        Philosophy
                      </span>
                    </div>
                    <h3 className="font-mono text-[11.5px] font-bold text-black tracking-[.03em] leading-[1.4] mb-1">
                      BUILD. LEARN.{' '}
                      <span
                        style={{
                          textDecoration: 'underline',
                          textDecorationStyle: 'wavy',
                          textDecorationColor: '#dc2626',
                        }}
                      >
                        ITERATE.
                      </span>{' '}
                      <span className="text-red-600 italic text-[9px]">
                        (RED underline)
                      </span>
                    </h3>
                    <p className="font-serif text-[10px] text-black/55 leading-[1.78]">
                      Not &quot;plan endlessly.&quot; Not{' '}
                      <span className="bg-blue-100 text-blue-800 px-1 rounded-sm text-[9px]">
                        &quot;wait until ready.&quot;
                      </span>{' '}
                      Build something. Learn from it{' '}
                      <span className="text-green-700 font-semibold underline decoration-green-600/40">
                        honestly
                      </span>
                      . Iterate until it works — or until you understand why it{' '}
                      <span className="text-red-600 font-semibold underline decoration-red-500/50">
                        cannot
                      </span>
                      . DNA was run this way. The Food Waste Chatbot was built this way.
                      This site was designed this way.
                      <br />
                      <span className="text-red-600 italic text-[9.5px]">
                        ↳ the iterate part is what everyone skips — real learning lives
                        here
                      </span>
                    </p>
                    <span className="text-[9px] text-black/20 group-hover:text-black/50 transition-colors flex items-center gap-1 mt-1">
                      → read more
                    </span>
                  </motion.div>

                  {/* ── SECTION 5: BACKLOG ── */}
                  <motion.div
                    className="py-2 border-b cursor-pointer relative group"
                    style={{ borderColor: 'rgba(0,0,0,0.08)' }}
                    initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    onClick={() => setActiveId('backlog')}
                    role="button"
                    aria-label="Open Backlog"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-amber-700 text-[10px]">★</span>
                      <span className="font-mono text-[8px] uppercase tracking-[.09em] text-black/50">
                        Backlog.md — current priorities
                      </span>
                    </div>
                    <h3 className="font-mono text-[11.5px] font-bold text-black tracking-[.03em] leading-[1.4] mb-1">
                      QUEUED &amp; CONCEPTUAL BLENDING
                    </h3>

                    {BACKLOG_ITEMS.map(({ priority, className, text }) => (
                      <div
                        key={text}
                        className="flex items-baseline gap-1.5 py-0.5 text-[10px] text-black/55 leading-[1.5]"
                      >
                        <span
                          className={`text-[8px] font-bold px-1 py-0.5 rounded-sm font-mono flex-shrink-0 ${className}`}
                        >
                          [{priority}]
                        </span>
                        {text}
                      </div>
                    ))}
                    <div className="flex items-baseline gap-1.5 py-0.5 text-[10px] text-black/55 leading-[1.5]">
                      <span className="text-[8px] font-bold px-1 py-0.5 rounded-sm font-mono flex-shrink-0 bg-blue-100 text-blue-700">
                        [P2]
                      </span>
                      Go deeper on{' '}
                      <span className="bg-orange-100 text-orange-900 px-1 rounded-sm text-[9px] font-semibold">
                        Hugging Face
                      </span>{' '}
                      — beyond the tutorials
                    </div>

                    <div className="mt-2">
                      <div className="flex justify-between text-[8.5px] text-black/35 font-mono mb-0.5">
                        <span>sprint progress</span>
                        <span>2 / 6 done</span>
                      </div>
                      <div className="h-[2px] bg-black/10 rounded-full overflow-hidden">
                        <div className="h-full w-[28%] bg-purple-500 rounded-full" />
                      </div>
                    </div>
                    <span className="text-[9px] text-black/20 group-hover:text-black/50 transition-colors flex items-center gap-1 mt-1">
                      → read more
                    </span>
                  </motion.div>

                  {/* ── SECTION 6: STATUS ── */}
                  <motion.div
                    className="py-2 cursor-pointer relative group"
                    initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                    onClick={() => setActiveId('status')}
                    role="button"
                    aria-label="Open Live status"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-amber-700 text-[10px]">★</span>
                      <span className="font-mono text-[8px] uppercase tracking-[.09em] text-black/50">
                        Live status
                      </span>
                    </div>
                    <h3 className="font-mono text-[11.5px] font-bold text-black tracking-[.03em] leading-[1.4] mb-1">
                      CURRENTLY
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {STATUS_PILLS.map(({ bg, color, text }) => (
                        <span
                          key={text}
                          className="inline-flex px-2 py-1 rounded-sm text-[9px] shadow-sm"
                          style={{ background: bg, color }}
                        >
                          {text}
                        </span>
                      ))}
                    </div>
                    <span className="text-[9px] text-black/20 group-hover:text-black/50 transition-colors flex items-center gap-1 mt-1">
                      → read more
                    </span>
                  </motion.div>

                  {/* CLOSING QUOTE */}
                  <div className="border-t pt-2.5 mt-1 pb-3" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                    <p className="text-center italic text-[9px] text-black/40 leading-[1.7] font-serif">
                      &ldquo;A complex system that works is invariably found to have evolved from a simple system that worked.&rdquo;
                    </p>
                    <p className="text-center text-[8px] text-black/28 font-mono tracking-[.06em] uppercase mt-1">
                      John Gall — Systemantics, 1975
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — 160px */}
          <div className="hidden md:flex w-[160px] flex-shrink-0 flex-col gap-2.5 mt-1">
            {/* CARD 1 — RAG Pipeline */}
            <div
              className="bg-white rounded-sm shadow-md p-2.5 relative"
              style={{ transform: 'rotate(-1.5deg)' }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-500 shadow-md z-10" />
              <p className="font-mono text-[8px] uppercase tracking-wider text-black/50 mb-1">
                RAG pipeline
              </p>
              <svg viewBox="0 0 135 50" className="w-full">
                <defs>
                  <marker
                    id="rag-arrow"
                    markerWidth="5"
                    markerHeight="5"
                    refX="4"
                    refY="2.5"
                    orient="auto"
                  >
                    <path d="M0,0 L5,2.5 L0,5 z" fill="#ccc" />
                  </marker>
                </defs>
                <rect x="0" y="14" width="26" height="20" rx="3" fill="#fee2e2" />
                <text
                  x="13"
                  y="27"
                  fontSize="7"
                  fill="#991b1b"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  query
                </text>
                <line x1="26" y1="24" x2="35" y2="24" stroke="#ccc" markerEnd="url(#rag-arrow)" />
                <rect x="36" y="14" width="26" height="20" rx="3" fill="#fef3c7" />
                <text
                  x="49"
                  y="27"
                  fontSize="7"
                  fill="#92400e"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  embed
                </text>
                <line x1="62" y1="24" x2="71" y2="24" stroke="#ccc" markerEnd="url(#rag-arrow)" />
                <rect x="72" y="14" width="26" height="20" rx="3" fill="#dbeafe" />
                <text
                  x="85"
                  y="27"
                  fontSize="7"
                  fill="#1e40af"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  FAISS
                </text>
                <line x1="98" y1="24" x2="107" y2="24" stroke="#ccc" markerEnd="url(#rag-arrow)" />
                <rect x="108" y="14" width="26" height="20" rx="3" fill="#dcfce7" />
                <text
                  x="121"
                  y="27"
                  fontSize="7"
                  fill="#166534"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  LLM
                </text>
              </svg>
              <p className="italic text-[7px] text-red-600 text-center mt-1">
                ↑ 80% quality lives here
              </p>
            </div>

            {/* CARD 2 — Community taught */}
            <div
              className="bg-white rounded-sm shadow-md p-2.5 relative"
              style={{ transform: 'rotate(2deg)' }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-pink-500 shadow-md z-10" />
              <p className="font-mono text-[8px] uppercase tracking-wider text-black/50 mb-1">
                What community taught me
              </p>
              <p className="text-[9.5px] text-black/65 leading-[1.55]">
                Running DNA was a leadership challenge — ownership across moderation,
                creator collaboration, and data-driven retention for 4,300+ members.
                Communication and adaptability were the real skills.
              </p>
              <div className="border-l-2 border-black/10 pl-1.5 mt-1 italic text-[8.5px] text-black/45">
                DNA → leadership + systems thinking
              </div>
            </div>

            {/* CARD 3 — Blue sticky */}
            <div
              className="rounded-sm shadow-md p-2.5 relative"
              style={{
                transform: 'rotate(-2.5deg)',
                background: '#bfdbfe',
                color: '#1e3a5f',
              }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-md z-10" />
              <p className="text-[9.5px] font-bold mb-1">Read DDIA Ch.3</p>
              <p className="text-[9px] leading-[1.55]">
                Storage &amp; Retrieval. The indexing section finally clicked when building
                the FAISS pipeline.
              </p>
            </div>

            {/* CARD 4 — Neural net */}
            <div
              className="bg-white rounded-sm shadow-md p-2.5 relative"
              style={{ transform: 'rotate(1.5deg)' }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500 shadow-md z-10" />
              <p className="font-mono text-[8px] uppercase tracking-wider text-black/50 mb-1">
                Embedding space
              </p>
              <svg viewBox="0 0 135 68" className="w-full">
                {/* Connections: input → hidden1 */}
                {[14, 30, 46].map((y1) =>
                  [10, 26, 42, 58].map((y2) => (
                    <line
                      key={`i-h1-${y1}-${y2}`}
                      x1="14"
                      y1={y1}
                      x2="50"
                      y2={y2}
                      stroke="#e9d5ff"
                      strokeOpacity="0.55"
                      strokeWidth="0.5"
                    />
                  ))
                )}
                {/* hidden1 → hidden2 */}
                {[10, 26, 42, 58].map((y1) =>
                  [18, 34, 50].map((y2) => (
                    <line
                      key={`h1-h2-${y1}-${y2}`}
                      x1="50"
                      y1={y1}
                      x2="86"
                      y2={y2}
                      stroke="#bfdbfe"
                      strokeOpacity="0.55"
                      strokeWidth="0.5"
                    />
                  ))
                )}
                {/* hidden2 → output */}
                {[18, 34, 50].map((y1) => (
                  <line
                    key={`h2-o-${y1}`}
                    x1="86"
                    y1={y1}
                    x2="120"
                    y2="34"
                    stroke="#bfdbfe"
                    strokeOpacity="0.55"
                    strokeWidth="0.5"
                  />
                ))}
                {/* Input nodes */}
                {[14, 30, 46].map((cy) => (
                  <circle
                    key={`i-${cy}`}
                    cx="14"
                    cy={cy}
                    r="3.5"
                    fill="#fce7f3"
                    stroke="#f9a8d4"
                    strokeWidth="0.8"
                  />
                ))}
                {/* Hidden layer 1 */}
                {[10, 26, 42, 58].map((cy) => (
                  <circle
                    key={`h1-${cy}`}
                    cx="50"
                    cy={cy}
                    r="3.5"
                    fill="#ede9fe"
                    stroke="#c4b5fd"
                    strokeWidth="0.8"
                  />
                ))}
                {/* Hidden layer 2 */}
                {[18, 34, 50].map((cy) => (
                  <circle
                    key={`h2-${cy}`}
                    cx="86"
                    cy={cy}
                    r="3.5"
                    fill="#dbeafe"
                    stroke="#93c5fd"
                    strokeWidth="0.8"
                  />
                ))}
                {/* Output */}
                <circle
                  cx="120"
                  cy="34"
                  r="4.5"
                  fill="#dcfce7"
                  stroke="#86efac"
                  strokeWidth="0.8"
                />
              </svg>
              <p className="font-mono text-[6.5px] text-black/35 text-center mt-1">
                token → vector space
              </p>
            </div>

            {/* CARD 5 — Project stack (dark) */}
            <div
              className="rounded-sm shadow-md p-2.5 relative"
              style={{
                background: '#1a1525',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p className="font-mono text-[8px] uppercase tracking-wider text-white/30 mb-1.5">
                Project stack
              </p>
              <div className="flex gap-1.5 items-center">
                <div className="w-3 h-3 rounded-full bg-pink-500" />
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-[8.5px] text-white/35 ml-1">DNA · RAG · MCA</span>
              </div>
            </div>

            {/* CARD 6 — Green sticky: Memory in AI Agents */}
            <div
              className="rounded-sm shadow-md p-2.5 relative"
              style={{
                transform: 'rotate(1.5deg)',
                background: '#bbf7d0',
                color: '#14532d',
              }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-green-500 shadow-md z-10" />
              <p className="text-[9.5px] font-bold mb-1">Memory in AI Agents</p>
              <p className="text-[9px] leading-[1.55]">
                How do you give a model persistent context without blowing the window? Same
                chunking problem as RAG, one abstraction up.
              </p>
            </div>

            {/* CARD 7 — Pink sticky: trajectory */}
            <div
              className="rounded-sm shadow-md p-2.5 relative"
              style={{
                transform: 'rotate(-1deg)',
                background: '#fce7f3',
                color: '#9d174d',
              }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-pink-500 shadow-md z-10" />
              <p className="text-[9.5px] font-bold mb-1">Gen AI → Agentic</p>
              <p className="text-[9px] leading-[1.55]">
                The shift from &quot;generate a response&quot; to &quot;complete a
                task&quot; changes the whole stack. Memory, planning, tool use. That&apos;s
                the direction.
              </p>
            </div>

            {/* CARD 8 — Attention paper */}
            <div
              className="bg-white rounded-sm shadow-md p-2.5 relative"
              style={{ transform: 'rotate(-1.5deg)' }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-violet-500 shadow-md z-10" />
              <p className="font-mono text-[8px] uppercase tracking-wider text-black/50 mb-1">
                Attention is All You Need
              </p>
              <p className="text-[9.5px] text-black/65 leading-[1.55]">
                Vaswani et al., 2017. At the time: just another arXiv paper. By 2026: the
                architecture behind every model you use.
              </p>
              <div className="border-l-2 border-black/10 pl-1.5 mt-1 italic text-[8.5px] text-black/45">
                who knew
              </div>
            </div>
          </div>
        </div>

        {/* MODAL */}
        <AnimatePresence>
          {activeId && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              style={{
                backdropFilter: 'blur(16px)',
                backgroundColor: 'rgba(0, 0, 0, 0.72)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) setActiveId(null);
              }}
            >
              <motion.div
                className="relative w-full max-w-[480px] max-h-[78vh] overflow-y-auto rounded-xl border border-border"
                style={{ background: 'linear-gradient(145deg, #10101a, #0d0d18)' }}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  className="absolute top-4 right-4 z-10 flex items-center justify-center w-7 h-7 rounded-full border border-border bg-muted/40 text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
                  onClick={() => setActiveId(null)}
                  aria-label="Close"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="size-3.5" />
                </motion.button>

                <div className="p-7">
                  {(() => {
                    const d = MODAL_DATA[activeId];
                    if (!d) return null;
                    return (
                      <>
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium mb-4"
                          style={{ background: d.tagBg, color: d.tagColor }}
                        >
                          {d.tag}
                        </span>
                        <h2 className="text-lg font-semibold text-foreground mb-4 leading-snug">
                          {d.title}
                        </h2>
                        <div className="text-[13px] text-muted-foreground leading-[1.8] space-y-2.5 [&_ul]:pl-4 [&_ul]:space-y-2 [&_strong]:text-foreground [&_strong]:font-medium [&_p]:text-[13px]">
                          {d.body}
                        </div>
                      </>
                    );
                  })()}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
}
