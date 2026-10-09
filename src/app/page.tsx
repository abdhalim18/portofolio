import TitleScreen from '@/components/TitleScreen';
import About from '@/components/About';
import MusicPanel from '@/components/journal/MusicPanel';
import WorkoutPanel from '@/components/journal/WorkoutPanel';

// Halaman utama: Title Screen, lalu About Me dan Journal langsung di bawahnya.
// Projects dan Contact tetap dibuka lewat menu sebagai layar sendiri.
export default function Home() {
  return (
    <main id="main">
      <TitleScreen />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-16">
        <section id="about-me" aria-labelledby="about-me-title" className="ff-box scroll-mt-6">
          <header className="border-b-2 border-white/15 px-5 py-3">
            <h2 id="about-me-title" className="text-sm text-ff-active sm:text-base">
              About Me
            </h2>
          </header>
          <div className="scope-legacy ff-screen-body px-5 py-6">
            <About />
          </div>
        </section>

        <section id="journal" aria-labelledby="journal-title" className="ff-box scroll-mt-6">
          <header className="border-b-2 border-white/15 px-5 py-3">
            <h2 id="journal-title" className="text-sm text-ff-active sm:text-base">
              Journal
            </h2>
          </header>
          <div className="px-5 py-6">
            <p className="mb-6 font-terminal text-2xl text-ff-dim">
              Live from my real accounts: the last song I played and my latest workout.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <MusicPanel />
              <WorkoutPanel />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
