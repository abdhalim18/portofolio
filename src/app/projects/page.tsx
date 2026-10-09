import type { Metadata } from 'next';
import GameScreen from '@/components/ff/GameScreen';
import Projects from '@/components/Projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Projects built by Muhammad Abdul Halim, from social-impact tools to full-stack business systems.',
};

export default function ProjectsPage() {
  return (
    <GameScreen label="Projects" next={{ href: '/contact', label: 'Contact' }}>
      <Projects />
    </GameScreen>
  );
}
