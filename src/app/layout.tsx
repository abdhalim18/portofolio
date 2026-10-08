import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Press_Start_2P, VT323 } from 'next/font/google';
import ScreenTransition from '@/components/ff/ScreenTransition';
import SoundToggle from '@/components/ff/SoundToggle';
import './globals.css';
import './legacy-sections.css';

// Font judul/menu (pixel tebal) dan font teks panjang (terminal, lebih mudah dibaca).
const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-press-start',
});

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-vt323',
});

export const metadata: Metadata = {
  title: {
    default: 'Abdul Halim — Web Developer Portfolio',
    template: '%s · Abdul Halim',
  },
  description:
    'Muhammad Abdul Halim — Web Developer & UI/UX Enthusiast. Building pixel-perfect, engaging, and accessible digital experiences.',
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#000040',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: ekstensi/terjemahan browser (mis. Google Translate) sering
    // mengubah atribut lang & class di <html> sebelum React hydrate. Hanya berlaku untuk
    // atribut <html> ini saja, tidak menyembunyikan mismatch di elemen lain.
    <html lang="en" className={`${pressStart.variable} ${vt323.variable}`} suppressHydrationWarning>
      <body>
        <a href="#main" className="skip-link ff-button">
          Skip to content
        </a>
        <SoundToggle />
        <ScreenTransition>{children}</ScreenTransition>
        <div className="ff-scanlines" aria-hidden="true" />
      </body>
    </html>
  );
}
