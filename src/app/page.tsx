import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import About, { Skills } from '@/components/About';
import MusicPanel from '@/components/journal/MusicPanel';
import WorkoutPanel from '@/components/journal/WorkoutPanel';

// Halaman utama: perkenalan, About, Journal (data langsung), lalu Skills.
export default function Home() {
  return (
    <main id="main">
      <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
        {/* Titik cahaya hangat yang sangat samar, supaya hero tidak terasa datar */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[44rem] -translate-x-1/3 rounded-full bg-[radial-gradient(circle,rgb(214_190_150/0.16),transparent_65%)]"
        />
        <div className="mx-auto w-full max-w-5xl px-5 pb-24 pt-20 sm:px-8 md:pb-32 md:pt-24">
          <p data-reveal className="inline-flex items-center gap-2 rounded-full bg-accent-bg px-3 py-1 text-xs font-medium tracking-wide text-accent-fg uppercase">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-fg" />
            Available for work
          </p>

          <h1 id="hero-title" data-reveal style={{ '--i': 1 } as React.CSSProperties} className="mt-8 text-5xl leading-[1.02] font-semibold tracking-tighter sm:text-6xl md:text-7xl">
            Muhammad Abdul Halim
          </h1>

          <p data-reveal style={{ '--i': 2 } as React.CSSProperties} className="mt-6 max-w-[46ch] text-lg text-muted md:text-xl">
            Web developer focused on front-end and UI systems. I build clean, functional products from concept to
            deployment.
          </p>

          <div data-reveal style={{ '--i': 3 } as React.CSSProperties} className="mt-10">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-[15px] font-medium text-canvas transition-[opacity,transform] duration-200 hover:opacity-85 active:scale-[0.98]"
            >
              View projects
              <ArrowRight weight="bold" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <About />

      <section id="journal" aria-labelledby="journal-title" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto w-full max-w-5xl px-5 py-24 sm:px-8 md:py-32">
          <h2 id="journal-title" data-reveal className="text-2xl font-semibold tracking-tight md:text-3xl">
            Journal
          </h2>
          <p data-reveal className="mt-3 max-w-[52ch] text-muted">
            Pulled live from my accounts: the last song I played and my latest workout.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-12">
            <div data-reveal className="md:col-span-7">
              <MusicPanel />
            </div>
            <div data-reveal style={{ '--i': 1 } as React.CSSProperties} className="md:col-span-5">
              <WorkoutPanel />
            </div>
          </div>
        </div>
      </section>

      <Skills />
    </main>
  );
}
