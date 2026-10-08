'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import HandPointer from './HandPointer';
import ScreenLink from './ScreenLink';

// Label bergaya FF + nama asli halaman agar tetap jelas bagi pengunjung.
const ITEMS = [
  { href: '/about', label: 'Status', hint: 'About me' },
  { href: '/projects', label: 'Save Data', hint: 'Projects' },
  { href: '/journal', label: 'Journal', hint: 'Music & workouts' },
  { href: '/contact', label: 'Talk', hint: 'Contact' },
  { href: '/', label: 'Title', hint: 'Home' },
];

/**
 * Menu perintah di sisi kanan layar, seperti menu utama FF6.
 * Desktop: kolom tetap di kanan. Mobile: tombol MENU di pojok kanan atas.
 */
export default function FieldMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = hovered ?? pathname;

  // Esc menutup menu mobile dulu, sebelum Esc "kembali ke Title" di GameScreen.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.stopPropagation();
      setOpen(false);
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open]);

  return (
    <nav aria-label="Main" className="fixed right-4 top-4 z-50 flex flex-col items-end lg:static lg:z-auto lg:items-stretch">
      <button
        type="button"
        className="ff-button lg:hidden"
        aria-expanded={open}
        aria-controls="field-menu-list"
        onClick={() => setOpen((v) => !v)}
        data-sfx
      >
        Menu
      </button>

      <div
        id="field-menu-list"
        data-window
        className={`ff-box mt-3 w-56 px-3 py-4 lg:mt-0 lg:block lg:w-auto ${open ? 'block' : 'hidden'}`}
      >
        <ul onMouseLeave={() => setHovered(null)}>
          {ITEMS.map((item) => (
            <li key={item.href}>
              <ScreenLink
                href={item.href}
                className="ff-menu-item"
                data-active={active === item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                onMouseEnter={() => setHovered(item.href)}
                onFocus={() => setHovered(item.href)}
                onBlur={() => setHovered(null)}
                onClick={() => setOpen(false)}
                data-sfx={item.href === '/' ? 'cancel' : ''}
              >
                <HandPointer />
                <span className="flex flex-col py-1">
                  <span>{item.label}</span>
                  <span className="font-terminal text-lg leading-none text-ff-muted">{item.hint}</span>
                </span>
              </ScreenLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
