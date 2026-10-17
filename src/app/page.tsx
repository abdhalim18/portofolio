import Link from 'next/link';
import About, { Skills } from '@/components/About';
import MusicPanel from '@/components/journal/MusicPanel';
import WorkoutPanel from '@/components/journal/WorkoutPanel';
import PixelArt from '@/components/pixel/PixelArt';
import { CLOUD, COIN, HILL, PLAYER } from '@/components/pixel/sprites';
import PlatformerHero from '@/components/pixel/PlatformerHero';

// Halaman utama: dunia atas (hero) lalu level bawah tanah (About, Journal, Skills).
export default function Home() {
  return (
    <main id="main">
      <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-sky">
        {/* Latar: awan bergerak pelan dan bukit */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <PixelArt {...CLOUD} scale={6} className="px-drift absolute left-[8%] top-10 opacity-95" />
          <PixelArt {...CLOUD} scale={4} className="px-drift absolute right-[12%] top-24 [animation-duration:80s]" />
          <PixelArt {...CLOUD} scale={5} className="px-drift absolute left-[55%] top-[42%] hidden md:block [animation-duration:70s]" />
          <PixelArt {...HILL} scale={8} className="absolute bottom-16 -left-10" />
          <PixelArt {...HILL} scale={5} className="absolute bottom-16 right-[6%] hidden sm:block" />
        </div>

        <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 pb-36 pt-16 sm:px-8 md:grid-cols-12 md:pt-24">
          <div className="md:col-span-8">
            <p
              data-reveal
              className="inline-flex items-center gap-2 border-4 border-black bg-grass px-3 py-1.5 font-pixel text-[0.625rem] text-black shadow-[4px_4px_0_#000]"
            >
              <span aria-hidden="true" className="px-blink inline-block size-2 bg-black" />
              AVAILABLE FOR WORK
            </p>

            <h1
              id="hero-title"
              data-reveal
              style={{ '--i': 1 } as React.CSSProperties}
              className="mt-8 text-[clamp(1.4rem,5.2vw,3rem)] leading-[1.25] [text-shadow:4px_4px_0_#000]"
            >
              <span className="block text-[0.55em] tracking-[0.2em]">MUHAMMAD</span>
              ABDUL HALIM
            </h1>

            <p
              data-reveal
              style={{ '--i': 2 } as React.CSSProperties}
              className="px-dialog mt-8 max-w-[46ch] px-5 py-4 text-[17px] leading-relaxed"
            >
              Web developer focused on front-end and UI systems, with a growing interest in data analytics. I build
              clean, functional products and turn raw data into dashboards that answer real questions.
            </p>

            <div data-reveal style={{ '--i': 3 } as React.CSSProperties} className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/projects" className="px-btn">
                <PixelArt {...COIN} scale={2} />
                VIEW PROJECTS
              </Link>
            </div>
          </div>

          {/* Tablet: karakter diam. Layar lebar: karakter bisa dimainkan (PlatformerHero). */}
          <div aria-hidden="true" className="pointer-events-none absolute bottom-16 right-[18%] hidden md:block lg:hidden">
            <PixelArt {...PLAYER} scale={6} className="px-bob" />
          </div>
        </div>

        <div aria-hidden="true" className="px-ground absolute inset-x-0 bottom-0" />
        <PlatformerHero />
      </section>

      <About />

      <section id="journal" aria-labelledby="journal-title" className="scroll-mt-20">
        <div className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-8 md:py-24">
          <h2 id="journal-title" data-reveal className="text-lg sm:text-xl [text-shadow:4px_4px_0_#000]">
            JOURNAL
          </h2>
          <p data-reveal className="mt-4 max-w-[52ch] text-muted">
            Pulled live from my accounts: the last song I played and my latest workout.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-12">
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
