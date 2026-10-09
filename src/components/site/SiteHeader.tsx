'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CV_URL } from '@/lib/site';

const NAV = [
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

/** Header tipis satu baris: nama di kiri, navigasi di kanan. */
export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="text-[15px] font-semibold tracking-tight text-ink" aria-current={pathname === '/' ? 'page' : undefined}>
          Abdul Halim
        </Link>

        <nav aria-label="Main">
          <ul className="flex items-center gap-1 text-[15px] sm:gap-2">
            {NAV.map((item) => {
              const current = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? 'page' : undefined}
                    className={`rounded-md px-3 py-2 transition-colors duration-200 hover:text-ink ${current ? 'text-ink' : 'text-muted'}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 inline-flex items-center rounded-md bg-ink px-3.5 py-2 font-medium text-canvas transition-[opacity,transform] duration-200 hover:opacity-85 active:scale-[0.98]"
              >
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
