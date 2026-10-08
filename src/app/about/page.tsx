import type { Metadata } from 'next';
import GameScreen from '@/components/ff/GameScreen';
import About from '@/components/About';

export const metadata: Metadata = {
  title: 'Status',
  description: 'About Muhammad Abdul Halim: background, focus, and the tools he uses.',
};

export default function AboutPage() {
  return (
    <GameScreen label="Status" next={{ href: '/projects', label: 'Save Data' }}>
      <About />
    </GameScreen>
  );
}
