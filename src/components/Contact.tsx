import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { EMAIL, SOCIALS } from '@/lib/site';

/** Kontak: alamat email besar sebagai aksi utama, lalu tautan lain. */
export default function Contact() {
  return (
    <>
      <a
        data-reveal
        style={{ '--i': 2 } as React.CSSProperties}
        href={`mailto:${EMAIL}`}
        className="text-link mt-12 inline-block text-2xl font-medium tracking-tight break-all sm:text-4xl md:text-5xl"
      >
        {EMAIL}
      </a>

      <ul data-reveal style={{ '--i': 3 } as React.CSSProperties} className="mt-16 flex flex-col border-t border-line sm:max-w-md">
        {SOCIALS.map((s) => (
          <li key={s.label} className="border-b border-line">
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-4 text-[17px] text-ink"
            >
              {s.label}
              <ArrowUpRight weight="bold" className="size-4 text-muted transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
