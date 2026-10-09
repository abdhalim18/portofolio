import type { ReactNode } from 'react';

/** Judul dan pengantar halaman dalam, rata kiri. */
export default function PageIntro({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <h1 data-reveal className="text-4xl leading-[1.05] font-semibold tracking-tighter sm:text-5xl md:text-6xl">
        {title}
      </h1>
      <p data-reveal style={{ '--i': 1 } as React.CSSProperties} className="mt-5 max-w-[52ch] text-lg text-muted">
        {children}
      </p>
    </>
  );
}
