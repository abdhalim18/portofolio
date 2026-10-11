import type { Metadata } from 'next';
import Contact from '@/components/Contact';
import PageIntro from '@/components/site/PageIntro';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Muhammad Abdul Halim by email, GitHub, or LinkedIn.',
};

export default function ContactPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-5xl px-5 pb-32 pt-20 sm:px-8 md:pt-24">
      <PageIntro title="Let's work together">
        I&apos;m open to full-time roles, internships, and collaborations. Whether you have a project in mind or just
        want to connect, email is the fastest way to reach me.
      </PageIntro>
      <Contact />
    </main>
  );
}
