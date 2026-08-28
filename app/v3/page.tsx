import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { InView } from '@/components/motion-primitives/in-view';
import { TextEffect } from '@/components/motion-primitives/text-effect';
import { DeskCanvas } from '@/components/v3/desk-canvas';
import { ScatterField } from '@/components/v3/scatter-field';
import { NoteSheet } from '@/components/v3/note-sheet';
import { MiniatureStrip } from '@/components/miniatures/strip';
import { getAllReading } from '@/lib/content';
import { workProjects } from '@/lib/work-data';
import { timelineEvents } from '@/lib/timeline-data';

export const metadata = {
  title: 'Kaustubha — desk',
  description: 'Home page variant: the desk.',
};

const positions = [
  {
    id: 'systems',
    title: 'Systems that hold under load',
    body: 'Java and Django services, queues, schedulers, the unglamorous parts. Correctness is a property of the boring path, not the clever one.',
  },
  {
    id: 'retrieval',
    title: 'Retrieval, and the models under it',
    body: 'FAISS, sentence transformers, RAG plumbing. I read the paper behind the tool, then rebuild the smallest version I can to find where the abstraction leaks.',
  },
  {
    id: 'agents',
    title: 'Agents as users of software',
    body: 'Memory, self-improvement, multi-agent coordination. If models become the ones calling my endpoints, backend design stops being a human-ergonomics problem.',
  },
];

const links = [
  { label: 'Email', href: 'mailto:kaustubhamandhane24@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/kawas8516' },
  { label: 'X', href: 'https://x.com/notkawas' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kawas-nandan' },
  { label: 'Substack', href: 'https://kawas516.substack.com' },
  {
    label: 'Résumé',
    href: 'https://drive.google.com/file/d/1PaV_eo-KRfX-WLQ1HevIZb1Wt8EtimgA/view?usp=sharing',
  },
];

/** A centred island of text sitting on the desk. */
function Island({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative z-10 mx-auto max-w-[40rem] px-5 text-center ${className ?? ''}`}>
      {children}
    </div>
  );
}

export default function V3Home() {
  const reading = getAllReading()
    .filter((i) => i.status === 'reading' || i.status === 'discussing')
    .slice(0, 5);

  const shipped = workProjects.filter((p) => p.github).slice(0, 4);
  const experience = timelineEvents.filter((e) => e.category === 'work').slice(0, 3);

  return (
    <main className="relative min-h-screen overflow-x-clip">
      <DeskCanvas />
      <Navbar />
      <ScatterField />

      {/* ---------- the opening sentence ---------- */}
      <section className="relative pb-40 pt-48 sm:pt-56">
        <Island>
          <TextEffect
            as="h1"
            per="word"
            preset="fade-in-blur"
            speedReveal={1.5}
            className="font-display text-balance text-[2.5rem] leading-[1.15] text-foreground sm:text-[3.25rem]"
          >
            I build backends, and I am learning the machine-learning stack that is quietly rewriting
            what a backend is for.
          </TextEffect>

          <p className="mx-auto mt-8 max-w-[34rem] text-pretty text-lg leading-relaxed text-muted-foreground">
            Currently in <span aria-hidden="true">📍</span> Pune, India, open to remote. Reading for
            an <span aria-hidden="true">🎓</span> MCA at MIT-WPU, and open to internships.
          </p>

          <MiniatureStrip />
        </Island>
      </section>

      {/* ---------- the taped note ---------- */}
      <section className="relative px-5 pb-44">
        <NoteSheet
          lead="Software is being rewritten by things that are not people. I am curious where that leaves the backend."
          positions={positions}
        />
      </section>

      {/* ---------- work ---------- */}
      <section className="relative pb-40">
        <Island>
          <InView>
            <h2 className="font-display text-balance text-3xl leading-snug text-foreground sm:text-4xl">
              Here are some things I have been{' '}
              <span className="underline decoration-2 underline-offset-8">building</span> lately…
            </h2>
          </InView>
        </Island>

        <div className="relative z-10 mx-auto mt-16 max-w-[44rem] space-y-14 px-5">
          {shipped.map((p, i) => (
            <InView key={p.id}>
              <article
                className={`mx-auto max-w-[30rem] ${i % 2 ? 'sm:ml-auto sm:mr-0' : 'sm:ml-0 sm:mr-auto'}`}
              >
                <h3 className="font-display text-2xl text-foreground">{p.name}</h3>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-3 flex items-baseline gap-4">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
                  >
                    source ↗
                  </a>
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
                    >
                      live ↗
                    </a>
                  )}
                  {p.languages.length > 0 && (
                    <span
                      className="text-lg text-muted-foreground"
                      style={{ fontFamily: 'var(--font-logo)' }}
                    >
                      {p.languages.join(', ')}
                    </span>
                  )}
                </div>
              </article>
            </InView>
          ))}
        </div>

        <Island className="mt-14">
          <Link
            href="/work"
            className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          >
            everything I have built →
          </Link>
        </Island>
      </section>

      {/* ---------- reading ---------- */}
      <section className="relative pb-40">
        <Island>
          <InView>
            <h2 className="font-display text-balance text-3xl leading-snug text-foreground sm:text-4xl">
              And some things I have been{' '}
              <span className="underline decoration-2 underline-offset-8">reading</span> this week…
            </h2>
          </InView>
        </Island>

        <div className="relative z-10 mx-auto mt-14 max-w-[36rem] px-5">
          <ul className="space-y-5 text-center">
            {reading.map((item) => (
              <InView key={item.slug}>
                <li>
                  <Link
                    href={item.hasContent ? `/reading/${item.slug}` : '/reading'}
                    className="group inline-block"
                  >
                    <span className="font-display text-xl text-foreground transition-colors group-hover:text-primary">
                      {item.title}
                    </span>
                    <span
                      className="ml-3 text-lg text-muted-foreground"
                      style={{ fontFamily: 'var(--font-logo)' }}
                    >
                      {item.author}, {item.year}
                    </span>
                  </Link>
                </li>
              </InView>
            ))}
          </ul>

          <p className="mt-12 text-center">
            <Link
              href="/reading"
              className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              the whole reading list →
            </Link>
          </p>
        </div>
      </section>

      {/* ---------- experience ---------- */}
      {experience.length > 0 && (
        <section className="relative pb-40">
          <Island>
            <InView>
              <h2 className="font-display text-3xl leading-snug text-foreground sm:text-4xl">
                Before this…
              </h2>
            </InView>
            <ul className="mt-12 space-y-10">
              {experience.map((e) => (
                <InView key={e.id}>
                  <li>
                    <p
                      className="text-lg text-muted-foreground"
                      style={{ fontFamily: 'var(--font-logo)' }}
                    >
                      {e.date}
                    </p>
                    <p className="font-display mt-1 text-xl text-foreground">{e.title}</p>
                    <p className="text-muted-foreground">{e.organization}</p>
                    {e.achievements[0] && (
                      <p className="mx-auto mt-2 max-w-[30rem] text-pretty leading-relaxed text-muted-foreground">
                        {e.achievements[0]}
                      </p>
                    )}
                  </li>
                </InView>
              ))}
            </ul>
          </Island>
        </section>
      )}

      {/* ---------- close ---------- */}
      <section className="relative pb-32">
        <Island>
          <InView>
            <h2 className="font-display text-balance text-3xl leading-snug text-foreground sm:text-4xl">
              If you are building something backend-heavy, or wondering what software looks like
              when agents are the ones using it, I would like to hear about it.
            </h2>
            <p className="mx-auto mt-8 max-w-[32rem] text-pretty leading-relaxed text-muted-foreground">
              I write most of this up on Substack first, usually before it makes it here.{' '}
              <a
                href="https://kawas516.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
              >
                Subscribe there
              </a>{' '}
              if you want it in your inbox.
            </p>

            <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <p
              className="mt-14 text-lg text-muted-foreground/70"
              style={{ fontFamily: 'var(--font-logo)' }}
            >
              © 2024—2026 Kaustubha Mandhane
            </p>
          </InView>
        </Island>
      </section>
    </main>
  );
}
