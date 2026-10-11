import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';
import { GeistMono } from 'geist/font/mono';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import Reveal from '@/components/site/Reveal';
import './globals.css';

// Font pixel disimpan di repo (lisensi OFL ada di folder fonts), jadi build tidak perlu internet.
const pressStart = localFont({
  src: './fonts/PressStart2P-latin.woff2',
  display: 'swap',
  variable: '--font-press-start',
});

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
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: class "no-js" dihapus skrip kecil di bawah sebelum React hydrate,
    // dan ekstensi/terjemahan browser sering mengubah atribut <html>.
    <html lang="en" className={`no-js ${pressStart.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('no-js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link px-btn">
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
