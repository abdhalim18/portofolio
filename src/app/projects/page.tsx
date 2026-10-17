import type { Metadata } from 'next';
import Projects from '@/components/Projects';
import PageIntro from '@/components/site/PageIntro';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Projects built by Muhammad Abdul Halim, from social-impact tools and full-stack business systems to data dashboards.',
};

export default function ProjectsPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-5xl px-5 pb-32 pt-20 sm:px-8 md:pt-24">
      <PageIntro title="Projects">From social-impact tools and full-stack business systems to data cleaning and dashboards. Linked ones open in a new tab.</PageIntro>
      <div className="mt-16">
        <Projects />
      </div>
    </main>
  );
}
