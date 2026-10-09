import type { ReactNode } from 'react';

/** Judul halaman dalam: judul pixel lalu kotak dialog putih berisi pengantar. */
export default function PageIntro({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <h1 data-reveal className="text-2xl sm:text-3xl md:text-4xl [text-shadow:4px_4px_0_#000]">
        {title}
      </h1>
      <p data-reveal style={{ '--i': 1 } as React.CSSProperties} className="px-dialog mt-8 max-w-[58ch] px-5 py-4 text-[17px] leading-relaxed">
        {children}
      </p>
    </>
  );
}
