'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import FieldMenu from './FieldMenu';
import ScreenLink from './ScreenLink';
import { useScreenNavigate } from './ScreenTransition';
import { playSfx } from '@/lib/sfx';
import { prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(useGSAP);

type GameScreenProps = {
  /** Nama layar bergaya FF, mis. "Status". */
  label: string;
  /** Layar berikutnya untuk tombol "Next", supaya pengunjung bisa lanjut tanpa kembali ke Title. */
  next?: { href: string; label: string };
  children: ReactNode;
};

/**
 * Kerangka satu layar game: jendela konten di kiri, menu perintah di kanan.
 * Esc atau tombol Cancel kembali ke Title Screen.
 * Desktop: konten panjang digulir di dalam jendela. Mobile: halaman digulir biasa.
 */
export default function GameScreen({ label, next, children }: GameScreenProps) {
  const rootRef = useRef<HTMLElement>(null);
  const navigate = useScreenNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || e.defaultPrevented) return;
      if (navigate('/')) playSfx('cancel');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  // Jendela "terbuka" vertikal, lalu isi muncul berurutan.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline()
        .from('[data-window]', { scaleY: 0, transformOrigin: 'center top', duration: 0.22, ease: 'steps(5)', stagger: 0.08 })
        .from('[data-reveal]', { autoAlpha: 0, y: 12, duration: 0.35, ease: 'power2.out', stagger: 0.06 }, '-=0.05');
    },
    { scope: rootRef },
  );

  return (
    <main
      id="main"
      ref={rootRef}
      className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 pb-6 pt-20 lg:grid lg:h-dvh lg:grid-cols-[minmax(0,1fr)_14rem] lg:grid-rows-[minmax(0,1fr)] lg:gap-6"
    >
      <section data-window aria-labelledby="screen-title" className="ff-box flex min-h-0 flex-col">
        <header className="flex items-center justify-between gap-4 border-b-2 border-white/15 px-5 py-3">
          <h1 id="screen-title" tabIndex={-1} data-screen-focus className="text-sm text-ff-active sm:text-base">
            {label}
          </h1>
          <ScreenLink href="/" className="ff-button" data-sfx="cancel">
            Cancel
            <kbd className="hidden font-terminal text-lg text-ff-muted sm:inline">Esc</kbd>
          </ScreenLink>
        </header>

        <div className="scope-legacy ff-screen-body min-h-0 flex-1 px-5 py-6 lg:overflow-y-auto">{children}</div>

        {next ? (
          <footer className="flex justify-end border-t-2 border-white/15 px-5 py-3">
            <ScreenLink href={next.href} className="ff-button" data-sfx>
              Next: {next.label}
              <span aria-hidden="true">▶</span>
            </ScreenLink>
          </footer>
        ) : null}
      </section>

      <FieldMenu />
    </main>
  );
}
