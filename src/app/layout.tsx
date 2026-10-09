import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import Reveal from '@/components/site/Reveal';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Abdul Halim - Web Developer',
    template: '%s · Abdul Halim',
  },
  description:
    'Muhammad Abdul Halim, web developer focused on front-end and UI systems. Projects, live journal, and contact.',
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfbfa' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: class "no-js" dihapus skrip kecil di bawah sebelum React hydrate,
    // dan ekstensi/terjemahan browser sering mengubah atribut <html>.
    <html lang="en" className={`no-js ${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('no-js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Reveal />
      </body>
    </html>
  );
}
