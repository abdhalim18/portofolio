import { EMAIL, SOCIALS } from '@/lib/site';

/** Footer di atas baris tanah bata, menutup "level" seperti akhir stage. */
export default function SiteFooter() {
  return (
    <footer className="mt-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 pb-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p translate="no" className="font-pixel text-[0.625rem]">
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> MUHAMMAD ABDUL HALIM
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-coin">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${EMAIL}`} className="hover:text-coin">
              Email
            </a>
          </li>
        </ul>
      </div>
      <div aria-hidden="true" className="px-ground" />
    </footer>
  );
}
