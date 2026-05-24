import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    "PENDING_TASKS.md — a living TODO file of what I've shipped, what I'm building, and what's queued.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
