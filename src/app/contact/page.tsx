import type { Metadata } from 'next';
import GameScreen from '@/components/ff/GameScreen';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Muhammad Abdul Halim by email, GitHub, or LinkedIn.',
};

export default function ContactPage() {
  return (
    <GameScreen label="Contact">
      <Contact />
    </GameScreen>
  );
}
