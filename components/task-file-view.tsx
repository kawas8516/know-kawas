'use client';

import { FileText } from 'lucide-react';

function FileLine({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr] sm:grid-cols-[2rem_1fr] gap-x-3">
      <span className="hidden sm:block text-[10px] text-muted-foreground/40 text-right select-none pt-[3px]">
        {num}
      </span>
      <div className="leading-7">{children}</div>
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-full font-semibold text-foreground mt-5 mb-2">{children}</div>
  );
}

function PriorityTag({ label }: { label: string }) {
  return (
    <span className="text-[10px] px-1 py-0.5 rounded bg-muted text-muted-foreground mr-2">
      {label}
    </span>
  );
}

export function TaskFileView() {
  return (
    <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <FileText className="size-3.5 text-muted-foreground" />
          <span className="font-mono text-xs text-muted-foreground">
            ~/kawas/life/PENDING_TASKS.md
          </span>
        </div>
        <span className="font-mono text-xs text-muted-foreground/60">
          last modified · 2026-05-18
        </span>
      </div>

      {/* Body */}
      <div className="px-3 sm:px-4 py-4 font-mono text-sm">
        {/* ── DONE ✓ ── */}
        <SectionHeader>
          ## DONE{'  '}
          <span className="text-green-400">✓</span>
        </SectionHeader>

        <FileLine num="01">
          <div className="line-through opacity-55">
            <span className="text-green-400 mr-2">✓</span>
            Co-founded DNA, scaled to 4,300+ members
            <span className="text-muted-foreground/70">
              {' '}// 100K+ messages in a single day
            </span>
          </div>
        </FileLine>

        <FileLine num="02">
          <div className="line-through opacity-55">
            <span className="text-green-400 mr-2">✓</span>
            Built Food Waste Chatbot — RAG + NLP on Django + FAISS
            <span className="text-muted-foreground/70">
              {' '}// first end-to-end RAG system
            </span>
          </div>
        </FileLine>

        <FileLine num="03">
          <div className="line-through opacity-55">
            <span className="text-green-400 mr-2">✓</span>
            Java Task Scheduler — OOP + GUI
            <span className="text-muted-foreground/70">
              {' '}// the irony of this page using the same idea isn&apos;t lost on me
            </span>
          </div>
        </FileLine>

        <FileLine num="04">
          <div className="line-through opacity-55">
            <span className="text-green-400 mr-2">✓</span>
            Bachelor&apos;s in Computer Applications, MIT-WPU
            <span className="text-muted-foreground/70">{' '}// 2022–2025</span>
          </div>
        </FileLine>

        <FileLine num="05">
          <div className="line-through opacity-55">
            <span className="text-green-400 mr-2">✓</span>
            CLI utilities in C/C++
            <span className="text-muted-foreground/70">
              {' '}// systems-level fundamentals
            </span>
          </div>
        </FileLine>

        <FileLine num="06">
          <div className="line-through opacity-55">
            <span className="text-green-400 mr-2">✓</span>
            Reduced DNA churn by 20% via governance + mentorship
          </div>
        </FileLine>

        {/* ── IN_PROGRESS … ── */}
        <SectionHeader>
          ## IN_PROGRESS{'  '}
          <span className="text-blue-400">…</span>
        </SectionHeader>

        <FileLine num="07">
          <div>
            <span className="text-blue-400 mr-2">…</span>
            MCA at MIT-WPU
            <span className="text-muted-foreground/70">{' '}// graduating July 2027</span>
          </div>
        </FileLine>

        <FileLine num="08">
          <div>
            <span className="text-blue-400 mr-2">…</span>
            Going deep on transformers, RAG, embeddings
            <span className="text-muted-foreground/70">
              {' '}// from &quot;I&apos;ve used these&quot; to &quot;I can explain why they work&quot;
            </span>
          </div>
        </FileLine>

        <FileLine num="09">
          <div>
            <span className="text-blue-400 mr-2">…</span>
            Building production-grade open-source RAG projects
          </div>
        </FileLine>

        <FileLine num="10">
          <div>
            <span className="text-blue-400 mr-2">…</span>
            Writing in public
            <span className="text-muted-foreground/70">
              {' '}// notes, prompts, reading — all live on this site
            </span>
          </div>
        </FileLine>

        {/* ── BACKLOG ── */}
        <SectionHeader>## BACKLOG</SectionHeader>

        <FileLine num="11">
          <div>
            <span className="text-muted-foreground/70">// </span>
            <PriorityTag label="[P0]" />
            Ship a production RAG project with a full evaluation harness
          </div>
        </FileLine>

        <FileLine num="12">
          <div>
            <span className="text-muted-foreground/70">// </span>
            <PriorityTag label="[P0]" />
            Finish Designing Data-Intensive Applications
          </div>
        </FileLine>

        <FileLine num="13">
          <div>
            <span className="text-muted-foreground/70">// </span>
            <PriorityTag label="[P1]" />
            First long-form essay on a topic I&apos;ve gone deep on
          </div>
        </FileLine>

        <FileLine num="14">
          <div>
            <span className="text-muted-foreground/70">// </span>
            <PriorityTag label="[P1]" />
            Contribute to an open-source LLM tooling project
          </div>
        </FileLine>

        <FileLine num="15">
          <div>
            <span className="text-muted-foreground/70">// </span>
            <PriorityTag label="[P2]" />
            Build something with vision-language-action models — physical-AI angle
          </div>
        </FileLine>

        <FileLine num="16">
          <div>
            <span className="text-muted-foreground/70">// </span>
            <PriorityTag label="[P2]" />
            Run a workshop for juniors at MIT-WPU
          </div>
        </FileLine>

        <FileLine num="17">
          <div>
            <span className="text-muted-foreground/70">// </span>
            <PriorityTag label="[P3-someday]" />
            Read Sutton & Barto end-to-end
          </div>
        </FileLine>

        {/* ── NOT_TODO ── */}
        <SectionHeader>
          ## NOT_TODO{'  '}
          <span className="text-muted-foreground text-xs">// things I won&apos;t chase</span>
        </SectionHeader>

        <FileLine num="18">
          <div>
            <span className="text-muted-foreground/70">// </span>
            Follow every framework launch on social media
          </div>
        </FileLine>

        <FileLine num="19">
          <div>
            <span className="text-muted-foreground/70">// </span>
            Optimize my LinkedIn for keywords I don&apos;t believe in
          </div>
        </FileLine>

        <FileLine num="20">
          <div>
            <span className="text-muted-foreground/70">// </span>
            Pretend I know things I&apos;m still learning
          </div>
        </FileLine>

        {/* ── Closing commit line ── */}
        <div className="border-t border-border mt-4 pt-3 italic text-muted-foreground/60 text-xs">
          // commit: building, reading, shipping — kawas
        </div>
      </div>
    </div>
  );
}
