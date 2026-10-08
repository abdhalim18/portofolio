'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useScreenNavigate } from './ScreenTransition';

type ScreenLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

/**
 * Link antar layar. Tetap <a> biasa (bisa dibuka di tab baru, jalan tanpa JS),
 * tapi klik biasa diganti dengan transisi screen wipe.
 */
export default function ScreenLink({ href, onClick, ...rest }: ScreenLinkProps) {
  const navigate = useScreenNavigate();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(href);
      }}
    />
  );
}
