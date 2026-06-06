import type React from 'react';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://kawas.netlify.app'),
  title: { template: '%s | Kaustubha M', default: 'Kaustubha M' },
  description:
    'Backend engineer. Good at backends. Getting better in ML. Building in public — projects, reading list, prompts.',
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
    title: 'Kaustubha M',
    description: 'Backend engineer. Good at backends. Getting better in ML.',
    url: 'https://kawas.netlify.app',
    siteName: 'Kaustubha M',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'Kaustubha M — Backend engineer',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaustubha M',
    description: 'Backend engineer. Good at backends. Getting better in ML.',
    images: ['/og'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={'font-sans antialiased'}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
