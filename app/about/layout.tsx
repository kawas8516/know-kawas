import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Who I am, what I have built, what is queued. A living file.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
