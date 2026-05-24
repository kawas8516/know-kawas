'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

function extractPromptContent(raw: string): string {
  const match = raw.match(/```prompt\n([\s\S]*?)\n```/);
  return match ? match[1].trim() : raw.trim();
}

export function CodeBlock({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);
  const promptText = extractPromptContent(content);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(promptText);
    toast.success('Copied to clipboard');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-md border border-border bg-card/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
        <span className="font-mono text-xs text-muted-foreground">prompt</span>
        <button
          onClick={handleCopy}
          aria-label="Copy prompt"
          className="size-8 rounded border border-border bg-background hover:bg-accent/20 flex items-center justify-center transition-colors"
        >
          {copied ? (
            <Check className="size-3.5 text-primary" />
          ) : (
            <Copy className="size-3.5 text-muted-foreground" />
          )}
        </button>
      </div>
      <pre className="font-mono text-sm leading-7 p-4 overflow-x-auto text-foreground/90 whitespace-pre-wrap">
        {promptText}
      </pre>
    </div>
  );
}
