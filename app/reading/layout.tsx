import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reading',
  description: 'Papers, books, essays — things worth the time.',
};

export default function ReadingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
