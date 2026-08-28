import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { InView } from '@/components/motion-primitives/in-view';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { TextEffect } from '@/components/motion-primitives/text-effect';
import { MiniatureStrip } from '@/components/miniatures/strip';
import { MiniatureField } from '@/components/miniatures/field';
import { getAllReading } from '@/lib/content';
import { workProjects } from '@/lib/work-data';
import { timelineEvents } from '@/lib/timeline-data';

export const metadata = {
  title: 'Kaustubha — variant',
  description: 'Editorial home page variant.',
};

const positions = [
  {
    id: 'systems',
    title: 'Systems that hold under load',
    body: 'Java and Django services, queues, schedulers, the unglamorous parts. Most of what I have shipped lives here. It is where I learned that correctness is a property of the boring path, not the clever one.',
  },
  {
    id: 'retrieval',
    title: 'Retrieval, and the models under it',
    body: 'FAISS, sentence transformers, RAG plumbing. I read the papers behind the tools I use, then rebuild the smallest version I can to find where the abstraction leaks.',
  },
  {
    id: 'agents',
    title: 'Agents as users of software',
    body: 'Memory, self-improvement, multi-agent coordination. The reading list below is mostly this. If models become the ones calling my endpoints, backend design stops being a human-ergonomics problem.',
  },
];

const facts = [
  { label: 'writes', value: 'Java, Python, Django, SQL' },
  { label: 'based', value: 'Pune, India. Open to remote' },
  { label: 'studying', value: 'MCA @ MIT-WPU, 2025 to 2027' },
  { label: 'status', value: 'Open to internships' },
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

function Heading({ children, href, cta }: { children: string; href?: string; cta?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 className="text-xl font-medium tracking-tight text-foreground">{children}</h2>
      {href && cta && (
        <Link
          href={href}
          className="shrink-0 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          {cta}
        </Link>
      )}
    </div>
  );
}

export default function V2Home() {
  const reading = getAllReading()
    .filter((i) => i.status === 'reading' || i.status === 'discussing')
    .slice(0, 5);

  const shipped = workProjects.filter((p) => p.github).slice(0, 4);

  const experience = timelineEvents.filter((e) => e.category === 'work').slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="relative mx-auto max-w-[38rem] px-5 pb-24 pt-28 sm:pt-32">
        <MiniatureField />
        {/* Hero */}
        <section className="relative">

          <TextEffect
            as="p"
            per="word"
            preset="fade"
            speedReveal={2.5}
            className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"
          >
            Kaustubha Mandhane — Kawas
          </TextEffect>

          <TextEffect
            as="h1"
            per="word"
            preset="fade-in-blur"
            delay={0.15}
            speedReveal={1.4}
            className="mt-6 text-balance text-3xl leading-[1.25] tracking-tight text-foreground sm:text-4xl sm:leading-[1.2]"
          >
            I build backends, and I am learning the machine-learning stack that is quietly rewriting
            what a backend is for.
          </TextEffect>

          <TextEffect
            as="p"
            per="line"
            preset="slide"
            delay={0.9}
            className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            {`This page is the whole thing: what I have shipped, what I am reading this week, where I have worked, how to reach me. Nothing is hidden behind a card you have to click.`}
          </TextEffect>

          <MiniatureStrip />
        </section>

        {/* Facts */}
        <AnimatedGroup
          as="dl"
          asChild="div"
          preset="blur-slide"
          stagger={0.05}
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2"
        >
          {facts.map((f) => (
            <div key={f.label} className="h-full bg-background px-4 py-3">
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {f.label}
              </dt>
              <dd className="mt-1 text-sm text-foreground">{f.value}</dd>
            </div>
          ))}
        </AnimatedGroup>

        {/* What I work on */}
        <section className="relative mt-24 space-y-12">

          {positions.map((p) => (
            <InView key={p.id}>
              <h2 className="text-xl font-medium tracking-tight text-foreground">{p.title}</h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{p.body}</p>
            </InView>
          ))}
        </section>

        {/* Reading */}
        <section className="relative mt-24">

          <InView>
            <Heading href="/reading" cta="all reading">
              On the desk right now
            </Heading>
          </InView>
          <AnimatedGroup
            as="ul"
            asChild="li"
            preset="fade"
            stagger={0.05}
            className="mt-6 divide-y divide-border border-y border-border"
          >
            {reading.map((item) => (
              <Link
                key={item.slug}
                href={item.hasContent ? `/reading/${item.slug}` : '/reading'}
                className="group flex items-baseline justify-between gap-6 py-3"
              >
                <span className="text-foreground transition-colors group-hover:text-primary">
                  {item.title}
                  <span className="text-muted-foreground"> — {item.author}</span>
                </span>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {item.type} · {item.year}
                </span>
              </Link>
            ))}
          </AnimatedGroup>
        </section>

        {/* Shipped */}
        <section className="relative mt-24">


          <InView>
            <Heading href="/work" cta="all work">
              Things I have shipped
            </Heading>
          </InView>
          <div className="mt-6 space-y-8">
            {shipped.map((p) => (
              <InView key={p.id}>
                <div className="flex items-baseline justify-between gap-6">
                  <h3 className="text-lg font-medium text-foreground">{p.name}</h3>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 font-mono text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    source ↗
                  </a>
                </div>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                {p.languages.length > 0 && (
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
                    {p.languages.join(' · ')}
                  </p>
                )}
              </InView>
            ))}
          </div>
        </section>

        {/* Experience */}
        {experience.length > 0 && (
          <section className="relative mt-24">

            <InView>
              <Heading href="/timeline" cta="full timeline">
                Where I have worked
              </Heading>
            </InView>
            <AnimatedGroup as="ul" asChild="li" preset="slide" className="mt-6 space-y-6">
              {experience.map((e) => (
                <div
                  key={e.id}
                  className="grid grid-cols-1 gap-1 sm:grid-cols-[7rem_1fr] sm:gap-x-6"
                >
                  <span className="font-mono text-xs text-muted-foreground">{e.date}</span>
                  <div>
                    <p className="text-foreground">
                      {e.title}
                      <span className="text-muted-foreground"> · {e.organization}</span>
                    </p>
                    {e.achievements[0] && (
                      <p className="mt-1 text-pretty leading-relaxed text-muted-foreground">
                        {e.achievements[0]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </AnimatedGroup>
          </section>
        )}

        {/* Close */}
        <section className="relative mt-24 border-t border-border pt-10">

          <p className="text-pretty text-lg leading-relaxed text-foreground">
            If you are building something backend-heavy, or thinking about what software looks like
            when agents are the ones using it, I would like to hear about it.
          </p>
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            I write most of this up first on Substack, usually before it makes it here.{' '}
            <a
              href="https://kawas516.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 decoration-foreground/30 transition-colors hover:decoration-foreground"
            >
              Subscribe there
            </a>{' '}
            if you want it in your inbox.
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
            © 2024—2026 Kaustubha Mandhane
          </p>
        </section>
      </div>
    </main>
  );
}
