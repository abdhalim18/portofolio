import { EMAIL, SOCIALS } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p translate="no">
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Muhammad Abdul Halim
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 hover:text-ink">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${EMAIL}`} className="transition-colors duration-200 hover:text-ink">
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
