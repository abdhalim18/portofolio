import { EMAIL, SOCIALS } from '@/lib/site';

/** Kontak: alamat email sebagai aksi utama, lalu tombol GitHub dan LinkedIn. */
export default function Contact() {
  return (
    <div data-reveal style={{ '--i': 2 } as React.CSSProperties} className="px-panel mt-12 p-6 sm:p-8">
      <p className="px-label">Email</p>
      <a
        href={`mailto:${EMAIL}`}
        className="mt-3 inline-block font-pixel text-[0.7rem] leading-relaxed break-all text-coin underline decoration-2 underline-offset-8 hover:text-coin-light sm:text-base md:text-xl"
      >
        {EMAIL}
      </a>

      <div className="mt-10 flex flex-wrap gap-4">
        {SOCIALS.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="px-btn px-btn--ghost">
            {s.label.toUpperCase()}
            <span aria-hidden="true">▶</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </div>
    </div>
  );
}
