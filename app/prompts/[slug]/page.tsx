import { getPromptBySlug, getAllPrompts } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { CodeBlock } from '@/components/code-block';
import Link from 'next/link';
import type { Prompt } from '@/lib/content';

export async function generateStaticParams() {
  const prompts = getAllPrompts();
  return prompts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) return {};
  return {
    title: `${prompt.title} | Prompts | Kaustubha M`,
    description: prompt.use_case,
  };
}

function ModelBadge({ model }: { model: Prompt['model'] }) {
  if (model === 'claude') {
    return (
      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary/15 text-primary">
        {model}
      </span>
    );
  }
  return (
    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
      {model}
    </span>
  );
}

function extractNotes(raw: string): string {
  return raw.replace(/```prompt[\s\S]*?```/g, '').trim();
}

export default async function PromptDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) notFound();

  const notes = extractNotes(prompt.content);

  return (
    <main className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[150px]" />
        <div className="absolute top-1/4 -right-32 h-[400px] w-[400px] rounded-full bg-blue-500/15 blur-[120px]" />
        <div className="absolute top-[45%] left-1/4 h-[350px] w-[350px] rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/3 h-[300px] w-[300px] rounded-full bg-orange-500/10 blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-[120px]" />
      </div>
      <div className="relative z-10">
        <Navbar />
        <div className="pt-32 pb-20 px-4 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs text-muted-foreground mb-6">
              <Link href="/prompts" className="text-primary hover:underline">
                prompts
              </Link>
              {' / '}
              {prompt.title}
            </p>

            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {prompt.title}
            </h1>

            <div className="flex gap-3 items-center mb-8 flex-wrap">
              <ModelBadge model={prompt.model} />
              <span className="text-xs text-muted-foreground">{prompt.use_case}</span>
              <span className="font-mono text-xs text-muted-foreground">{prompt.date}</span>
            </div>

            <div className="flex items-center gap-2 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-zinc-600 to-zinc-600" />
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
              </div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent via-zinc-600 to-zinc-600" />
            </div>

            <CodeBlock content={prompt.content} />

            {notes && (
              <div className="mt-8">
                <h2 className="text-base font-medium mb-3">Notes</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">{notes}</p>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
