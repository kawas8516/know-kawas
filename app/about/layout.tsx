import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Kaustubha M. — building, reading, shipping.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
