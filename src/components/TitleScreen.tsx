'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import HandPointer from './ff/HandPointer';
import ScreenLink from './ff/ScreenLink';
import { playSfx } from '@/lib/sfx';
import { prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(useGSAP);

const ROLES = ['Web Developer', 'UI/UX Enthusiast', 'Problem Solver'];
const CV_URL = 'https://drive.google.com/file/d/1emuzKndKYUwePhNjp9HeDDqhDCi0vomF/view?usp=sharing';
const STARTED_KEY = 'ff-title-started';

type MenuItem = { label: string; href: string; help: string; external?: boolean };

// New Game -> /about, Continue -> /projects, Journal -> /journal, Options -> /contact, plus CV lama tetap ada.
const MENU: MenuItem[] = [
  { label: 'New Game', href: '/about', help: 'Start the story: who I am and the tools I use.' },
  { label: 'Continue', href: '/projects', help: 'Load my save files: the projects I have shipped.' },
  { label: 'Journal', href: '/journal', help: 'Live log: my last song on Spotify and my latest workout.' },
  { label: 'Options', href: '/contact', help: 'Send me a message, or find me on GitHub and LinkedIn.' },
  { label: 'Download CV', href: CV_URL, help: 'Open my CV on Google Drive in a new tab.', external: true },
];

// Bintang latar dengan posisi deterministik (sama di server & client, tanpa hydration mismatch).
const STARS = (() => {
  let seed = 1337;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: 56 }, () => ({
    left: `${(rand() * 100).toFixed(2)}%`,
    top: `${(rand() * 100).toFixed(2)}%`,
    size: rand() > 0.85 ? 3 : 2,
    delay: `${(rand() * 3).toFixed(2)}s`,
    duration: `${(1.6 + rand() * 2.4).toFixed(2)}s`,
  }));
})();

type Phase = 'attract' | 'starting' | 'menu';

const noopSubscribe = () => () => { };
function readStarted() {
  try {
    return window.sessionStorage.getItem(STARTED_KEY) === '1';
  } catch {
    return false;
  }
}

export default function TitleScreen() {
  const rootRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const phaseRef = useRef<Phase>('attract');
  const focusOnOpen = useRef(false);

  const [phase, setPhase] = useState<Phase>('attract');
  const [active, setActive] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);

  // Kunjungan ulang di sesi yang sama: langsung tampilkan menu, lewati PRESS START.
  const resumed = useSyncExternalStore(noopSubscribe, readStarted, () => false);
  const view: Phase = resumed && phase === 'attract' ? 'menu' : phase;


  /** "PRESS START": kedip cepat + bunyi konfirmasi, lalu menu terbuka. */
  const pressStart = useCallback(() => {
    if (phaseRef.current !== 'attract') return;
    phaseRef.current = 'starting';
    setPhase('starting');
    playSfx('confirm');
    try {
      window.sessionStorage.setItem(STARTED_KEY, '1');
    } catch {
      /* storage diblokir: tidak masalah */
    }
    window.setTimeout(
      () => {
        phaseRef.current = 'menu';
        focusOnOpen.current = true;
        setPhase('menu');
      },
      prefersReducedMotion() ? 0 : 450,
    );
  }, []);

  // Tombol apa saja (selain Tab/modifier) saat title screen terlihat = PRESS START.
  useEffect(() => {
    if (view !== 'attract') return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Tab' || e.metaKey || e.ctrlKey || e.altKey || e.key === 'Shift') return;
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect || rect.bottom < window.innerHeight * 0.4) return;
      if (e.key === 'Enter' || e.key === ' ') e.preventDefault();
      pressStart();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view, pressStart]);

  // Rotasi job/role seperti versi lama.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2600);
    return () => window.clearInterval(id);
  }, []);

  // Intro: kristal turun, huruf nama jatuh satu-satu, teks lain menyusul.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ defaults: { ease: 'power2.out' } })
        .from('[data-crystal]', { autoAlpha: 0, y: -30, duration: 0.8 })
        .from('[data-char]', { autoAlpha: 0, y: -28, duration: 0.35, ease: 'steps(4)', stagger: 0.04 }, '-=0.35')
        .from('[data-intro]', { autoAlpha: 0, y: 10, duration: 0.4, stagger: 0.12 }, '-=0.1');
      gsap.to('[data-crystal]', { y: -10, duration: 1.8, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.8 });
    },
    { scope: rootRef },
  );

  // Ganti role: fade singkat.
  useGSAP(
    () => {
      if (roleIndex === 0 || prefersReducedMotion()) return;
      gsap.fromTo(roleRef.current, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'steps(3)' });
    },
    { dependencies: [roleIndex] },
  );

  // Jendela menu "terbuka" vertikal seperti di game.
  useGSAP(
    () => {
      if (view !== 'menu' || !menuRef.current) return;
      const focusFirst = () => {
        if (focusOnOpen.current) itemRefs.current[0]?.focus();
      };
      if (prefersReducedMotion()) {
        focusFirst();
        return;
      }
      gsap
        .timeline({ onComplete: focusFirst })
        .from(menuRef.current.querySelectorAll('[data-window]'), {
          scaleY: 0,
          transformOrigin: 'center top',
          duration: 0.22,
          ease: 'steps(5)',
          stagger: 0.08,
        });
    },
    { dependencies: [view], scope: rootRef },
  );

  // Panah atas/bawah memindahkan kursor menu, Home/End ke ujung.
  const onMenuKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const last = MENU.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowDown') next = active >= last ? 0 : active + 1;
    if (e.key === 'ArrowUp') next = active <= 0 ? last : active - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    itemRefs.current[next]?.focus();
  };

  const nameLines = ['MUHAMMAD', 'ABDUL HALIM'];

  return (
    <section
      id="hero"
      ref={rootRef}
      aria-label="Title screen"
      className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 pb-8 pt-24 text-center"
      onClick={(e) => {
        // Klik di area kosong juga dianggap PRESS START.
        if (view === 'attract' && !(e.target as Element).closest('a, button')) pressStart();
      }}
    >
      {/* Latar: langit malam berbintang + gradasi biru FF */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_110%,#1a1a8a_0%,#000040_45%,#000010_80%)]">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute bg-white"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animation: `ff-twinkle ${s.duration} steps(3) ${s.delay} infinite`,
            }}
          />
        ))}
      </div>

      <p data-intro className="mb-8 flex items-center gap-2 font-terminal text-xl text-ff-dim">
        <span aria-hidden="true" className="ff-blink inline-block size-2.5 bg-ff-hp" />
        Available for work — based in Indonesia
      </p>

      {/* Kristal dekoratif */}
      <svg data-crystal aria-hidden="true" viewBox="0 0 48 80" className="mb-6 h-16 w-10 drop-shadow-[0_0_14px_#5aa8ff] sm:h-20 sm:w-12">
        <polygon points="24,0 48,30 24,80 0,30" fill="#9fd4ff" />
        <polygon points="24,0 24,80 0,30" fill="#e6f4ff" />
        <polygon points="24,0 48,30 24,36" fill="#5aa0ff" />
        <polygon points="0,30 24,36 24,80" fill="#bfe2ff" />
        <polygon points="48,30 24,36 24,80" fill="#2f6fe0" />
      </svg>

      {/* translate="no": nama dipecah per huruf, jadi Google Translate bisa salah
          membaca huruf "I" sebagai kata "I" lalu mengubahnya jadi "SAYA". */}
      <h1 translate="no" className="[text-shadow:none]">
        <span className="sr-only">Muhammad Abdul Halim</span>
        {nameLines.map((line, li) => (
          <span
            key={line}
            aria-hidden="true"
            className={`block whitespace-nowrap ${li === 0 ? 'mb-3 text-[clamp(0.9rem,3.2vw,1.75rem)] tracking-[0.35em]' : 'text-[clamp(1.45rem,6.4vw,4.25rem)]'}`}
          >
            {line.split('').map((ch, ci) => (
              <span
                key={ci}
                data-char
                className="inline-block bg-gradient-to-b from-white via-white to-[#8fa8ff] bg-clip-text text-transparent [filter:drop-shadow(0_3px_0_#1c1ca8)_drop-shadow(0_3px_0_#000020)]"
              >
                {ch === ' ' ? ' ' : ch}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <p data-intro className="mt-6 font-pixel text-[0.7rem] leading-relaxed text-ff-dim sm:text-xs">
        I work as a{' '}
        <span ref={roleRef} className="inline-block text-ff-active">
          {ROLES[roleIndex]}
        </span>
      </p>

      <p data-intro className="mt-4 max-w-[46ch] font-terminal text-2xl leading-tight text-ff-dim">
        Crafting clean, functional, and thoughtfully designed digital experiences from concept to deployment.
      </p>

      <div ref={menuRef} className="mt-10 flex w-full flex-col items-center">
        {view === 'menu' ? (
          <>
            <nav data-window aria-label="Title menu" className="ff-box w-full max-w-xs px-4 py-5 text-left">
              <ul onKeyDown={onMenuKeyDown}>
                {MENU.map((item, i) => {
                  const itemProps = {
                    ref: (el: HTMLAnchorElement | null) => {
                      itemRefs.current[i] = el;
                    },
                    className: 'ff-menu-item',
                    'data-active': active === i,
                    'data-sfx': '',
                    'aria-describedby': `title-help-${i}`,
                    // Kembali dari layar lain (Cancel/Esc): fokus mendarat di item pertama.
                    'data-screen-focus': i === 0 ? '' : undefined,
                    onMouseEnter: () => setActive(i),
                    onFocus: () => setActive(i),
                  };
                  const content = (
                    <>
                      <HandPointer />
                      {item.label}
                      <span id={`title-help-${i}`} className="sr-only">
                        {item.help}
                      </span>
                    </>
                  );
                  return (
                    <li key={item.label}>
                      {item.external ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" {...itemProps}>
                          {content}
                        </a>
                      ) : (
                        // Rute internal: pindah layar dengan transisi screen wipe.
                        <ScreenLink href={item.href} {...itemProps}>
                          {content}
                        </ScreenLink>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Jendela bantuan di bawah, seperti help bar FF */}
            <div data-window aria-hidden="true" className="ff-box mt-5 w-full max-w-xl px-5 py-3 text-left font-terminal text-xl">
              {MENU[active].help}
            </div>
          </>
        ) : (
          <button
            type="button"
            data-intro
            onClick={pressStart}
            className={`min-h-11 px-4 font-pixel text-sm tracking-[0.2em] text-ff-text [text-shadow:var(--ff-pixel-shadow)] sm:text-base ${view === 'starting' ? 'ff-blink-fast text-ff-active' : 'ff-blink'}`}
            aria-label="Press start to open the menu"
          >
            PRESS START
          </button>
        )}
      </div>

      <p translate="no" className="mt-14 font-pixel text-[0.55rem] tracking-widest text-ff-muted">
        © <span suppressHydrationWarning>{new Date().getFullYear()}</span> MUHAMMAD ABDUL HALIM
      </p>
    </section>
  );
}
