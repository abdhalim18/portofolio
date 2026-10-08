import type { Metadata } from 'next';
import GameScreen from '@/components/ff/GameScreen';
import MusicPanel from '@/components/journal/MusicPanel';
import WorkoutPanel from '@/components/journal/WorkoutPanel';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'What Muhammad Abdul Halim is listening to and his latest workout.',
};

export default function JournalPage() {
  return (
    <GameScreen label="Journal" next={{ href: '/contact', label: 'Talk' }}>
      <p data-reveal className="mb-6 font-terminal text-2xl text-ff-dim">
        Live from my real accounts: the last song I played and my latest workout.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <MusicPanel />
        <WorkoutPanel />
      </div>
    </GameScreen>
  );
}
