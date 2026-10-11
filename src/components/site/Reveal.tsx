'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Elemen ber-atribut data-reveal muncul halus saat masuk layar.
 * Pakai IntersectionObserver (bukan event scroll). Dijalankan ulang tiap pindah halaman.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal="in"])');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => (el.dataset.reveal = 'in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = 'in';
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
