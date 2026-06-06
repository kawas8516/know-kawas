'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'cmdk';
import {
  BookOpen,
  Briefcase,
  FileText,
  Folder,
  Github,
  GitBranch,
  Mail,
} from 'lucide-react';
import type { ReadingItem } from '@/lib/content';

type PaletteData = {
  reading: Pick<ReadingItem, 'slug' | 'title' | 'author'>[];
};

const PAGES = [
  { id: 'about', label: 'About', href: '/about', Icon: FileText },
  { id: 'work', label: 'Work', href: '/work', Icon: Folder },
  { id: 'timeline', label: 'Timeline', href: '/timeline', Icon: GitBranch },
  { id: 'reading', label: 'Reading', href: '/reading', Icon: BookOpen },
];

const ACTIONS = [
  {
    id: 'internship',
    label: 'Open to internships — email me',
    href: 'mailto:kaustubhamandhane24@gmail.com?subject=Internship%20Opportunity',
    Icon: Mail,
    external: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/kawas8516',
    Icon: Github,
    external: true,
  },
];

const ITEM_CLASS =
  'flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-muted-foreground aria-selected:bg-accent/20 aria-selected:text-foreground outline-none transition-colors';

const GROUP_HEADING_CLASS =
  '[&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3';

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const router = useRouter();
  const [data, setData] = useState<PaletteData | null>(null);

  useEffect(() => {
    if (open && !data) {
      fetch('/api/reading')
        .then((r) => r.json())
        .then((reading) => setData({ reading }));
    }
  }, [open, data]);

  const handleSelect = useCallback(
    (href: string, external?: boolean) => {
      onOpenChange(false);
      if (external) {
        if (href.startsWith('mailto:')) {
          window.location.href = href;
        } else {
          window.open(href, '_blank', 'noopener,noreferrer');
        }
      } else {
        router.push(href);
      }
    },
    [router, onOpenChange],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
      onClick={() => onOpenChange(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <Command
          className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
          onKeyDown={(e) => {
            if (e.key === 'Escape') onOpenChange(false);
          }}
        >
          <CommandInput
            autoFocus
            placeholder="Search pages, reading…"
            className="border-b border-border px-4 py-3 font-sans text-sm bg-transparent outline-none w-full text-foreground placeholder:text-muted-foreground"
          />

          <CommandList className="max-h-[380px] overflow-y-auto p-2">
            <CommandEmpty className="px-3 py-8 text-center text-sm text-muted-foreground">
              No results.
            </CommandEmpty>

            {/* Pages */}
            <CommandGroup heading="Pages" className={GROUP_HEADING_CLASS}>
              {PAGES.map((page) => (
                <CommandItem
                  key={page.id}
                  value={page.label}
                  onSelect={() => handleSelect(page.href)}
                  className={ITEM_CLASS}
                >
                  <page.Icon className="size-3.5 text-muted-foreground flex-shrink-0" />
                  {page.label}
                </CommandItem>
              ))}
            </CommandGroup>

            {/* Reading */}
            {data?.reading && data.reading.length > 0 && (
              <CommandGroup heading="Reading" className={GROUP_HEADING_CLASS}>
                {data.reading.slice(0, 4).map((item) => (
                  <CommandItem
                    key={item.slug}
                    value={`${item.title} ${item.author}`}
                    onSelect={() => handleSelect('/reading')}
                    className={ITEM_CLASS}
                  >
                    <BookOpen className="size-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="flex-1 truncate">{item.title}</span>
                    <span className="text-[10px] text-muted-foreground/60">{item.author}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Actions */}
            <CommandGroup heading="Actions" className={GROUP_HEADING_CLASS}>
              {ACTIONS.map((action) => (
                <CommandItem
                  key={action.id}
                  value={action.label}
                  onSelect={() => handleSelect(action.href, action.external)}
                  className={ITEM_CLASS}
                >
                  <action.Icon className="size-3.5 text-muted-foreground flex-shrink-0" />
                  {action.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          {/* Footer */}
          <div className="border-t border-border px-3 py-2 bg-muted/20 flex items-center gap-4 text-[10px] text-muted-foreground">
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span>esc close</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
