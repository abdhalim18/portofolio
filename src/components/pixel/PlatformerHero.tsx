'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import PixelArt from './PixelArt';
import { COIN, ITEM_BLOCK, PLAYER, PLAYER_WALK, USED_BLOCK } from './sprites';
import { CV_URL } from '@/lib/site';

/*
 * Mini-game di hero: karakter bisa digerakkan dengan keyboard.
 *   ← →      jalan (menekan pertama kali juga memulai permainan)
 *   ↑ / Spasi lompat (tahan untuk lompat lebih tinggi)
 *   Esc / ↓   berhenti, panah kembali menggulir halaman
 * Hanya aktif di layar lebar (≥1024px) dan saat hero terlihat, supaya tidak
 * mengganggu scroll biasa. Semua tautan di blok juga tersedia di header.
 */

const SCALE = 5;
const PW = 12 * SCALE; // lebar pemain
const PH = 13 * SCALE; // tinggi pemain
const GROUND = 64; // tinggi baris tanah (sama dengan .px-ground)
const BLOCK = 48;
const BLOCK_LIFT = 150; // jarak tanah ke bawah blok
const COIN_SIZE = 24;
const GRAVITY = 1900;
const JUMP_VELOCITY = 940; // puncak ±230px: cukup untuk naik ke atas blok (198px)
const SPEED = 280;
const MAX_FALL = 1400;

type BlockDef = { id: string; xPct: number; label: string; href: string; external?: boolean };
const BLOCKS: BlockDef[] = [
  { id: 'projects', xPct: 0.64, label: 'PROJECTS', href: '/projects' },
  { id: 'contact', xPct: 0.74, label: 'CONTACT', href: '/contact' },
  { id: 'cv', xPct: 0.84, label: 'CV', href: CV_URL, external: true },
];

// lift = tinggi tengah koin dari permukaan tanah. Dua koin hanya terjangkau dari atas blok.
const COINS = [
  { id: 0, xPct: 0.53, lift: 120 },
  { id: 1, xPct: 0.6, lift: 32 },
  { id: 2, xPct: 0.69, lift: 340 },
  { id: 3, xPct: 0.79, lift: 32 },
  { id: 4, xPct: 0.9, lift: 340 },
];

type Rect = { x: number; y: number; w: number; h: number };
const overlap = (a: Rect, b: Rect) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

const groundY = (h: number) => h - GROUND;
const blockRect = (b: BlockDef, w: number, h: number): Rect => ({
  x: Math.round(b.xPct * w - BLOCK / 2),
  y: groundY(h) - BLOCK_LIFT - BLOCK,
  w: BLOCK,
  h: BLOCK,
});
const coinRect = (c: (typeof COINS)[number], w: number, h: number): Rect => ({
  x: Math.round(c.xPct * w - COIN_SIZE / 2),
  y: groundY(h) - c.lift - COIN_SIZE / 2,
  w: COIN_SIZE,
  h: COIN_SIZE,
});

export default function PlatformerHero() {
  const layerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState(false);
  const [collected, setCollected] = useState<ReadonlySet<number>>(() => new Set());
  const [opened, setOpened] = useState<ReadonlySet<string>>(() => new Set());
  const [bumping, setBumping] = useState<string | null>(null);

  const sizeRef = useRef(size);
  const activeRef = useRef(false);
  const enabledRef = useRef(false);
  const inViewRef = useRef(false);
  const collectedRef = useRef(new Set<number>());
  const openedRef = useRef(new Set<string>());
  const keys = useRef({ left: false, right: false, jumpQueued: false, jumpHeld: false });
  const p = useRef({ x: 0, y: 0, vx: 0, vy: 0, onGround: true, facing: 1, frameT: 0, frame: 0, placed: false });
  const raf = useRef<number | null>(null);
  const last = useRef(0);

  /** Tulis posisi pemain langsung ke DOM (tanpa render ulang React tiap frame). */
  const paint = useCallback(() => {
    const el = playerRef.current;
    if (!el) return;
    const s = p.current;
    el.style.transform = `translate3d(${Math.round(s.x)}px, ${Math.round(s.y)}px, 0) scaleX(${s.facing})`;
    el.dataset.frame = String(s.frame);
  }, []);

  const bump = useCallback((b: BlockDef) => {
    setBumping(b.id);
    window.setTimeout(() => setBumping((cur) => (cur === b.id ? null : cur)), 180);
    if (!openedRef.current.has(b.id)) {
      openedRef.current.add(b.id);
      setOpened(new Set(openedRef.current));
    }
  }, []);

  const step = useCallback(
    (dt: number) => {
      const { w, h } = sizeRef.current;
      const s = p.current;
      const k = keys.current;
      const gy = groundY(h);
      const blocks = BLOCKS.map((b) => ({ def: b, r: blockRect(b, w, h) }));

      // Gerak horizontal
      s.vx = ((k.right ? 1 : 0) - (k.left ? 1 : 0)) * SPEED;
      if (s.vx !== 0) s.facing = s.vx > 0 ? 1 : -1;

      // Lompat (sekali per tekan)
      if (k.jumpQueued && s.onGround) {
        s.vy = -JUMP_VELOCITY;
        s.onGround = false;
      }
      k.jumpQueued = false;
      // Lepas tombol lompat lebih awal = lompatan lebih rendah
      if (!k.jumpHeld && s.vy < -380) s.vy = -380;

      s.vy = Math.min(s.vy + GRAVITY * dt, MAX_FALL);

      // Sumbu X lalu tabrakan samping dengan blok
      s.x = Math.max(0, Math.min(w - PW, s.x + s.vx * dt));
      for (const { r } of blocks) {
        const me = { x: s.x, y: s.y, w: PW, h: PH };
        if (!overlap(me, r)) continue;
        if (s.vx > 0) s.x = r.x - PW;
        else if (s.vx < 0) s.x = r.x + r.w;
      }

      // Sumbu Y lalu mendarat di atas blok atau membentur bawahnya
      const prevY = s.y;
      s.y += s.vy * dt;
      s.onGround = false;
      for (const { def, r } of blocks) {
        const me = { x: s.x, y: s.y, w: PW, h: PH };
        if (!overlap(me, r)) continue;
        if (s.vy > 0 && prevY + PH <= r.y + 1) {
          s.y = r.y - PH;
          s.vy = 0;
          s.onGround = true;
        } else if (s.vy < 0 && prevY >= r.y + r.h - 1) {
          s.y = r.y + r.h;
          s.vy = 0;
          bump(def);
        }
      }
      if (s.y + PH >= gy) {
        s.y = gy - PH;
        s.vy = 0;
        s.onGround = true;
      }

      // Koin
      const me = { x: s.x, y: s.y, w: PW, h: PH };
      let got = false;
      for (const c of COINS) {
        if (collectedRef.current.has(c.id)) continue;
        if (overlap(me, coinRect(c, w, h))) {
          collectedRef.current.add(c.id);
          got = true;
        }
      }
      if (got) setCollected(new Set(collectedRef.current));

      // Animasi kaki saat berlari di tanah
      if (s.onGround && s.vx !== 0) {
        s.frameT += dt;
        if (s.frameT > 0.12) {
          s.frameT = 0;
          s.frame = s.frame ? 0 : 1;
        }
      } else {
        s.frame = s.onGround ? 0 : 1;
      }
    },
    [bump],
  );

  const startLoop = useCallback(() => {
    if (raf.current !== null) return;
    last.current = performance.now();
    const tick = (t: number) => {
      const dt = Math.min((t - last.current) / 1000, 1 / 30); // batasi agar tidak "teleport" setelah tab dibuka lagi
      last.current = t;
      step(dt);
      paint();
      // Tetap jalan selama aktif, atau sampai pemain mendarat setelah berhenti
      raf.current = activeRef.current || !p.current.onGround ? requestAnimationFrame(tick) : null;
    };
    raf.current = requestAnimationFrame(tick);
  }, [step, paint]);

  const setPlaying = useCallback(
    (on: boolean) => {
      activeRef.current = on;
      setActive(on);
      if (on) startLoop();
      else {
        keys.current.left = false;
        keys.current.right = false;
        keys.current.jumpHeld = false;
      }
    },
    [startLoop],
  );

  // Ukuran hero: posisi blok, koin dan tanah dihitung dari sini.
  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      const h = Math.round(entry.contentRect.height);
      sizeRef.current = { w, h };
      setSize({ w, h });
      const s = p.current;
      if (!s.placed) {
        s.x = Math.round(w * 0.55);
        s.placed = true;
      }
      s.x = Math.max(0, Math.min(w - PW, s.x));
      if (s.onGround) s.y = groundY(h) - PH;
      paint();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [paint]);

  // Hanya di layar lebar, dan hanya saat hero terlihat.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onMq = () => {
      enabledRef.current = mq.matches;
      if (!mq.matches && activeRef.current) setPlaying(false);
    };
    onMq();
    mq.addEventListener('change', onMq);

    const section = layerRef.current?.parentElement;
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.intersectionRatio >= 0.5;
        if (!inViewRef.current && activeRef.current) setPlaying(false);
      },
      { threshold: [0, 0.5, 1] },
    );
    if (section) io.observe(section);

    return () => {
      mq.removeEventListener('change', onMq);
      io.disconnect();
    };
  }, [setPlaying]);

  // Keyboard
  useEffect(() => {
    const isTyping = (t: EventTarget | null) =>
      t instanceof HTMLElement && !!t.closest('input, textarea, select, [contenteditable="true"]');

    const onDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      if (!enabledRef.current) return;
      const key = e.key;
      const k = keys.current;

      if (!activeRef.current) {
        if ((key === 'ArrowLeft' || key === 'ArrowRight') && inViewRef.current) setPlaying(true);
        else return;
      }

      if (key === 'Escape' || key === 'ArrowDown') {
        // ↓ tetap menggulir halaman seperti biasa
        setPlaying(false);
        return;
      }
      if (key === 'ArrowLeft') k.left = true;
      else if (key === 'ArrowRight') k.right = true;
      else if (key === 'ArrowUp' || key === ' ') {
        if (!e.repeat) k.jumpQueued = true;
        k.jumpHeld = true;
      } else return;
      e.preventDefault();
    };

    const onUp = (e: KeyboardEvent) => {
      const k = keys.current;
      if (e.key === 'ArrowLeft') k.left = false;
      else if (e.key === 'ArrowRight') k.right = false;
      else if (e.key === 'ArrowUp' || e.key === ' ') k.jumpHeld = false;
    };

    const onBlur = () => {
      keys.current.left = false;
      keys.current.right = false;
      keys.current.jumpHeld = false;
    };

    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      window.removeEventListener('blur', onBlur);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [setPlaying]);

  const { w, h } = size;
  const ready = w > 0 && h > 0;

  // Elemen pemain baru ada setelah ukuran diketahui: pasang posisinya sebelum digambar.
  useLayoutEffect(() => {
    if (ready) paint();
  }, [ready, paint]);
  const allCoins = collected.size === COINS.length;

  return (
    <div ref={layerRef} className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
      {ready ? (
        <>
          {/* HUD */}
          <div aria-hidden="true" className="absolute right-6 top-5 text-right font-pixel text-[0.625rem] leading-loose text-cream [text-shadow:2px_2px_0_#000]">
            <p className="flex items-center justify-end gap-2">
              <PixelArt {...COIN} scale={2} />
              <span className={allCoins ? 'text-coin' : ''}>
                × {collected.size}/{COINS.length}
                {allCoins ? ' ALL COINS!' : ''}
              </span>
            </p>
            <p className={active ? '' : 'px-blink'}>{active ? '↑ JUMP   ESC STOP' : 'PRESS ← → TO PLAY'}</p>
          </div>
          <p role="status" className="sr-only">
            {active ? `Game on. ${collected.size} of ${COINS.length} coins collected.` : ''}
          </p>

          {/* Koin */}
          {COINS.map((c) => {
            if (collected.has(c.id)) return null;
            const r = coinRect(c, w, h);
            return (
              <div key={c.id} aria-hidden="true" className="absolute" style={{ left: r.x, top: r.y }}>
                <PixelArt {...COIN} scale={3} className="px-spin" />
              </div>
            );
          })}

          {/* Blok berisi tautan */}
          {BLOCKS.map((b) => {
            const r = blockRect(b, w, h);
            const isOpen = opened.has(b.id);
            const sprite = isOpen ? USED_BLOCK : ITEM_BLOCK;
            return (
              <div key={b.id}>
                <div aria-hidden="true" className={`absolute ${bumping === b.id ? 'px-bump' : ''}`} style={{ left: r.x, top: r.y }}>
                  <PixelArt {...sprite} scale={3} />
                </div>
                {isOpen ? (
                  <div className="px-pop pointer-events-auto absolute -translate-x-1/2" style={{ left: r.x + BLOCK / 2, top: r.y - 52 }}>
                    {b.external ? (
                      <a href={b.href} target="_blank" rel="noopener noreferrer" className="px-btn whitespace-nowrap !px-2.5 !py-2 !text-[0.5625rem]">
                        {b.label} ▶<span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <Link href={b.href} className="px-btn whitespace-nowrap !px-2.5 !py-2 !text-[0.5625rem]">
                        {b.label} ▶
                      </Link>
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}

          {/* Pemain */}
          <div
            ref={playerRef}
            aria-hidden="true"
            data-frame="0"
            className="group/player absolute left-0 top-0 origin-center will-change-transform"
            style={{ width: PW, height: PH }}
          >
            <PixelArt {...PLAYER} scale={SCALE} className="group-data-[frame=1]/player:hidden" />
            <PixelArt {...PLAYER_WALK} scale={SCALE} className="hidden group-data-[frame=1]/player:block" />
          </div>
        </>
      ) : null}
    </div>
  );
}
