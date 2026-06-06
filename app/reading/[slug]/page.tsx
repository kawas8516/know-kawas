import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import { getAllReading, getReading } from '@/lib/content';
import { ArrowLeft, Clock, FileText, BookOpen, Bookmark } from 'lucide-react';

export async function generateStaticParams() {
  const items = getAllReading();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = getReading(slug);
  if (!result) return {};
  const { item } = result;
  return {
    title: `${item.title} — Kaustubha M`,
    description: item.note ?? `${item.author} · ${item.year}`,
  };
}

const typeConfig: Record<string, { color: string; icon: typeof FileText }> = {
  paper:  { color: 'bg-violet-500/15 text-violet-300 border-violet-500/25', icon: FileText },
  book:   { color: 'bg-blue-500/15 text-blue-300 border-blue-500/25',       icon: BookOpen },
  essay:  { color: 'bg-pink-500/15 text-pink-300 border-pink-500/25',       icon: Bookmark },
  talk:   { color: 'bg-amber-500/15 text-amber-300 border-amber-500/25',    icon: FileText },
  other:  { color: 'bg-muted/40 text-muted-foreground border-border',       icon: Bookmark },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mdxOptions: any = {
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [rehypeKatex, [rehypePrettyCode, { theme: 'github-dark' }]],
  },
};

export default async function ReadingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = getReading(slug);
  if (!result) notFound();

  const { item, content, readingTime, related } = result;
  const cfg = typeConfig[item.type] ?? typeConfig.other;
  const TypeIcon = cfg.icon;

  return (
    <main className="min-h-screen bg-background">
      {/* KaTeX CSS */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
        crossOrigin="anonymous"
      />

      {/* Scroll progress bar */}
      <div id="progress-bar" className="fixed top-0 left-0 h-[2px] z-50 bg-gradient-to-r from-violet-500 via-pink-500 to-blue-500" style={{ width: '0%' }} />

      <div className="mx-auto max-w-[680px] px-5 pt-24 pb-32">

        {/* Back */}
        <Link
          href="/reading"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-foreground transition-colors mb-12 tracking-wide"
        >
          <ArrowLeft className="h-3 w-3" />
          Reading list
        </Link>

        {/* ── Header ── */}
        <header className="mb-12">
          {/* Type + read time row */}
          <div className="flex items-center gap-3 mb-5">
            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded border ${cfg.color}`}>
              <TypeIcon className="h-2.5 w-2.5" />
              {item.type}
            </span>
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest">{item.year}</span>
            <span className="text-[10px] text-muted-foreground/40">·</span>
            <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/50 uppercase tracking-widest">
              <Clock className="h-2.5 w-2.5" />
              {readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[1.65rem] sm:text-[2rem] font-bold text-foreground leading-[1.2] tracking-tight mb-4" style={{ textWrap: 'balance' } as React.CSSProperties}>
            {item.title}
          </h1>

          {/* Author */}
          <p className="text-sm text-muted-foreground/70 mb-5 font-medium">{item.author}</p>

          {/* Personal note — italicised pull quote style */}
          {item.note && (
            <blockquote className="border-l-[3px] border-violet-500/40 pl-4 py-1 mb-5">
              <p className="text-sm text-muted-foreground/80 italic leading-relaxed">{item.note}</p>
            </blockquote>
          )}

          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground/70 border border-border/50">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />

        {/* ── Body ── */}
        {item.hasContent ? (
          <article className="reading-prose">
            <MDXRemote source={content} options={mdxOptions} />
          </article>
        ) : (
          <p className="text-muted-foreground/60 text-sm italic">No notes yet for this one.</p>
        )}

        {/* ── Bottom nav ── */}
        <div className="mt-20 pt-8 border-t border-border/50">
          {related.length > 0 && (
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground/40 mb-4">More {item.type}s</p>
              <div className="flex flex-col gap-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/reading/${r.slug}`}
                    className="group flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors line-clamp-1">{r.title}</span>
                    <span className="text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors text-sm flex-shrink-0 ml-3">→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <Link
            href="/reading"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to reading list
          </Link>
        </div>
      </div>

      {/* ── Prose styles ── */}
      <style>{`
        /* Layout */
        .reading-prose { font-size: 0.9375rem; line-height: 1.85; color: var(--color-muted-foreground); }

        /* Headings */
        .reading-prose h1 { font-size: 1.3rem; font-weight: 700; color: var(--color-foreground); margin: 3rem 0 0.75rem; letter-spacing: -0.02em; line-height: 1.3; text-wrap: balance; }
        .reading-prose h2 { font-size: 1.1rem; font-weight: 700; color: var(--color-foreground); margin: 2.5rem 0 0.75rem; padding-left: 0.875rem; border-left: 2px solid color-mix(in oklch, var(--color-border) 120%, transparent); letter-spacing: -0.01em; }
        .reading-prose h3 { font-size: 0.9375rem; font-weight: 600; color: var(--color-foreground); margin: 1.75rem 0 0.5rem; }
        .reading-prose h4 { font-size: 0.875rem; font-weight: 600; color: var(--color-foreground); margin: 1.25rem 0 0.4rem; text-transform: uppercase; letter-spacing: 0.06em; font-size: 0.75rem; }

        /* Paragraphs & text */
        .reading-prose p { margin: 0 0 1.2rem; text-wrap: pretty; }
        .reading-prose strong { color: var(--color-foreground); font-weight: 600; }
        .reading-prose em { font-style: italic; }
        .reading-prose a { color: var(--color-foreground); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: color-mix(in oklch, var(--color-border) 180%, transparent); transition: text-decoration-color 0.15s; }
        .reading-prose a:hover { text-decoration-color: var(--color-foreground); }

        /* Lists */
        .reading-prose ul, .reading-prose ol { padding-left: 1.35rem; margin: 0 0 1.2rem; }
        .reading-prose ul { list-style: none; }
        .reading-prose ul li::before { content: '–'; display: inline-block; width: 1.35rem; margin-left: -1.35rem; color: var(--color-muted-foreground); opacity: 0.5; }
        .reading-prose ol { list-style: decimal; }
        .reading-prose li { margin-bottom: 0.45rem; }
        .reading-prose li p { margin: 0; }

        /* Blockquote */
        .reading-prose blockquote { border-left: 2px solid var(--color-border); padding: 0.25rem 0 0.25rem 1rem; margin: 1.5rem 0; font-style: italic; color: color-mix(in oklch, var(--color-muted-foreground) 80%, transparent); }

        /* Inline code */
        .reading-prose :not(pre) > code { background: color-mix(in oklch, var(--color-muted) 60%, transparent); padding: 0.15em 0.4em; border-radius: 4px; font-size: 0.83em; font-family: var(--font-mono); color: var(--color-foreground); border: 1px solid color-mix(in oklch, var(--color-border) 80%, transparent); }

        /* Code blocks — rehype-pretty-code handles coloring; we control the shell */
        .reading-prose pre { border-radius: 10px; border: 1px solid var(--color-border); margin: 0.25rem 0 1.5rem; overflow-x: auto; }
        .reading-prose pre > code { font-size: 0.8rem; font-family: var(--font-mono); display: block; padding: 1.1rem 1.25rem; }
        .reading-prose [data-rehype-pretty-code-figure] { margin: 0.25rem 0 1.5rem; }
        .reading-prose [data-rehype-pretty-code-title] { font-size: 0.7rem; font-family: var(--font-mono); color: var(--color-muted-foreground); background: color-mix(in oklch, var(--color-muted) 40%, transparent); border: 1px solid var(--color-border); border-bottom: none; border-radius: 8px 8px 0 0; padding: 0.4rem 1rem; }
        .reading-prose [data-rehype-pretty-code-title] + pre { border-radius: 0 0 8px 8px; margin-top: 0; }
        .reading-prose [data-line] { padding: 0 1.25rem; }
        .reading-prose [data-highlighted-line] { background: rgba(255,255,255,0.05); }

        /* Tables */
        .reading-prose table { width: 100%; border-collapse: collapse; margin: 0 0 1.5rem; font-size: 0.875rem; }
        .reading-prose thead tr { border-bottom: 1px solid var(--color-border); }
        .reading-prose th { text-align: left; color: var(--color-foreground); font-weight: 600; padding: 0.5rem 0.75rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .reading-prose td { color: var(--color-muted-foreground); border-bottom: 1px solid color-mix(in oklch, var(--color-border) 40%, transparent); padding: 0.6rem 0.75rem; }
        .reading-prose tr:last-child td { border-bottom: none; }

        /* Horizontal rule */
        .reading-prose hr { border: none; border-top: 1px solid color-mix(in oklch, var(--color-border) 60%, transparent); margin: 2.5rem 0; }

        /* Images */
        .reading-prose img { width: 100%; height: auto; border-radius: 10px; border: 1px solid var(--color-border); margin: 2rem 0 0.5rem; display: block; }
        .reading-prose img + em { display: block; text-align: center; font-size: 0.78rem; color: color-mix(in oklch, var(--color-muted-foreground) 60%, transparent); margin-bottom: 2rem; font-style: normal; }

        /* KaTeX math */
        .reading-prose .katex { font-size: 1em; color: var(--color-foreground); }
        .reading-prose .katex-display {
          overflow-x: auto;
          margin: 1.75rem 0;
          padding: 1rem 1.25rem;
          background: color-mix(in oklch, var(--color-muted) 30%, transparent);
          border-radius: 8px;
          border: 1px solid color-mix(in oklch, var(--color-border) 60%, transparent);
        }
      `}</style>

      {/* Scroll progress script */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var bar = document.getElementById('progress-bar');
          if (!bar) return;
          function update() {
            var scrolled = window.scrollY;
            var total = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
          }
          window.addEventListener('scroll', update, { passive: true });
          update();
        })();
      `}} />
    </main>
  );
}
