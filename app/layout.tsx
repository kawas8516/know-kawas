import type React from 'react';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: { template: '%s | Kaustubha M', default: 'Kaustubha M' },
  description:
    'Backend dev with deep interest in the physical-AI era. Building, reading, shipping.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    images: [{ url: '/og' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={'font-sans antialiased'}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
