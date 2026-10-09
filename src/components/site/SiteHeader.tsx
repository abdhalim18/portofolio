'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PixelArt from '@/components/pixel/PixelArt';
import { COIN } from '@/components/pixel/sprites';
import { CV_URL } from '@/lib/site';

const NAV = [
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

/** Header hitam seperti HUD game: nama di kiri, navigasi di kanan. */
export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b-4 border-black bg-black">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-8">
        <Link
          href="/"
          aria-current={pathname === '/' ? 'page' : undefined}
          className="group flex items-center gap-2.5 font-pixel text-[0.5625rem] whitespace-nowrap text-cream sm:text-xs"
        >
          <PixelArt {...COIN} scale={2} className="hidden shrink-0 group-hover:[animation:px-spin_0.9s_steps(4)_infinite] sm:block" />
          <span translate="no">ABDUL HALIM</span>
        </Link>

        <nav aria-label="Main">
          <ul className="flex items-center gap-0.5 font-pixel text-[0.5625rem] whitespace-nowrap sm:gap-3 sm:text-xs">
            {NAV.map((item) => {
              const current = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? 'page' : undefined}
                    className={`flex items-center gap-1.5 px-1.5 py-3 transition-colors hover:text-coin sm:px-2 ${current ? 'text-coin' : 'text-cream'}`}
                  >
                    <span aria-hidden="true" className={`hidden sm:inline ${current ? '' : 'invisible'}`}>
                      ▶
                    </span>
                    {item.label.toUpperCase()}
                  </Link>
                </li>
              );
            })}
            <li className="ml-1">
              <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="px-btn !px-3 !py-2.5 !text-[0.625rem]">
                CV
                <span className="sr-only"> (opens Google Drive in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
