'use client';

import { createContext, useCallback, useContext, useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { playSfx } from '@/lib/sfx';
import { prefersReducedMotion } from '@/lib/motion';

const STRIPES = 12;
/** Mengembalikan false bila perpindahan diabaikan (transisi masih berjalan / sudah di layar itu). */
const NavigateContext = createContext<(href: string) => boolean>(() => false);

/** Pindah layar dengan transisi "random encounter". Dipakai oleh ScreenLink. */
export const useScreenNavigate = () => useContext(NavigateContext);

/**
 * Transisi antar layar (rute):
 * layar berkedip putih -> garis hitam menutup -> rute baru dimuat ->
 * garis membuka lagi -> fokus pindah ke judul layar baru.
 *
 * Elemen dengan atribut `data-sfx` mendapat bunyi hover dan klik.
 * Pakai `data-sfx="cancel"` untuk bunyi batal.
 */
export default function ScreenTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const pending = useRef<string | null>(null);
  const fallback = useRef<number | undefined>(undefined);

  const parts = () => {
    const overlay = overlayRef.current;
    return {
      overlay,
      stripes: overlay?.querySelectorAll<HTMLElement>('[data-stripe]') ?? [],
      flash: overlay?.querySelector<HTMLElement>('[data-flash]') ?? null,
    };
  };

  const openScreen = useCallback(() => {
    window.clearTimeout(fallback.current);
    const { overlay, stripes } = parts();
    const finish = () => {
      busy.current = false;
      document.querySelector<HTMLElement>('[data-screen-focus]')?.focus({ preventScroll: true });
    };
    if (!overlay || prefersReducedMotion()) {
      if (overlay) gsap.set(overlay, { autoAlpha: 0 });
      finish();
      return;
    }
    gsap
      .timeline({ onComplete: finish })
      .to({}, { duration: 0.06 })
      .to(stripes, { scaleX: 0, duration: 0.28, ease: 'power2.out', stagger: { each: 0.015, from: 'edges' } })
      .set(overlay, { autoAlpha: 0 });
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (busy.current || href === pathname) return false;
      pending.current = href;
      const { overlay, stripes, flash } = parts();
      if (!overlay || prefersReducedMotion()) {
        router.push(href);
        return true;
      }
      busy.current = true;
      gsap
        .timeline({ defaults: { ease: 'power2.in' } })
        .set(overlay, { autoAlpha: 1 })
        .fromTo(flash, { opacity: 0 }, { opacity: 0.85, duration: 0.04, repeat: 3, yoyo: true, ease: 'steps(1)' })
        .fromTo(stripes, { scaleX: 0 }, { scaleX: 1, duration: 0.28, stagger: { each: 0.015, from: 'center' } })
        .add(() => {
          router.push(href);
          // Pengaman: kalau rute gagal berpindah, layar tidak tertutup selamanya.
          fallback.current = window.setTimeout(() => {
            pending.current = null;
            openScreen();
          }, 4000);
        });
      return true;
    },
    [pathname, router, openScreen],
  );

  // Rute baru sudah tampil: buka layar.
  useEffect(() => {
    if (!pending.current) return;
    pending.current = null;
    openScreen();
  }, [pathname, openScreen]);

  // Efek suara global untuk elemen ber-atribut data-sfx.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const el = event.target instanceof Element ? event.target.closest('[data-sfx]') : null;
      if (el) playSfx(el.getAttribute('data-sfx') === 'cancel' ? 'cancel' : 'confirm');
    };

    let lastHover: Element | null = null;
    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const el = event.target instanceof Element ? event.target.closest('[data-sfx]') : null;
      if (el && el !== lastHover) playSfx('cursor');
      lastHover = el;
    };

    const onFocusIn = (event: FocusEvent) => {
      const el = event.target instanceof Element ? event.target : null;
      if (el?.matches('[data-sfx]:focus-visible')) playSfx('cursor');
    };

    document.addEventListener('click', onClick);
    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('focusin', onFocusIn);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('focusin', onFocusIn);
    };
  }, []);

  return (
    <NavigateContext.Provider value={navigate}>
      {children}
      <div ref={overlayRef} className="ff-wipe" style={{ '--stripes': STRIPES } as CSSProperties} aria-hidden="true">
        {Array.from({ length: STRIPES }, (_, i) => (
          <span key={i} className="ff-wipe__stripe" data-stripe />
        ))}
        <span className="ff-wipe__flash" data-flash />
      </div>
    </NavigateContext.Provider>
  );
}
