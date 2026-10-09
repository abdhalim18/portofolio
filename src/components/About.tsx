const skills = [
  { name: 'React', icon: '/icons/react.svg' },
  { name: 'TypeScript', icon: '/icons/typescript.svg' },
  { name: 'Next.js', icon: '/icons/nextjs.svg' },
  { name: 'Tailwind CSS', icon: '/icons/tailwindcss.svg' },
  { name: 'Node.js', icon: '/icons/nodejs.svg' },
  { name: 'Laravel', icon: '/icons/laravel.svg' },
  { name: 'PHP', icon: '/icons/php.svg' },
  { name: 'MySQL', icon: '/icons/mysql.svg' },
  { name: 'PostgreSQL', icon: '/icons/postgresql.svg' },
  { name: 'Figma', icon: '/icons/figma.svg' },
  { name: 'JavaScript', icon: '/icons/javascript.svg' },
  { name: 'HTML/CSS', icon: '/icons/html5.svg' },
];

const facts = [
  { label: 'Role', value: 'Web Developer' },
  { label: 'Focus', value: 'Front-end and UI systems' },
  { label: 'Study', value: 'Information Systems graduate' },
  { label: 'Status', value: 'Open to full-time roles and collaborations' },
];

/** Bagian About: judul di kolom kiri, cerita dan fakta singkat di kanan. */
export default function About() {
  return (
    <section id="about-me" aria-labelledby="about-title" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto grid w-full max-w-5xl gap-10 px-5 py-24 sm:px-8 md:grid-cols-12 md:py-32">
        <h2 id="about-title" data-reveal className="text-sm font-medium text-muted md:col-span-4">
          About
        </h2>

        <div className="md:col-span-8">
          <p data-reveal className="text-2xl leading-snug font-medium tracking-tight text-ink md:text-3xl">
            I turn complex problems into simple, intuitive web products.
          </p>
          <p data-reveal className="mt-6 max-w-[60ch] text-lg text-muted">
            I recently graduated in Information Systems with a focus on web development. I&apos;m looking for a
            full-time role or a project team where I can ship real work, learn from experienced engineers, and keep
            getting better at the craft.
          </p>

          <dl className="mt-12 grid gap-x-10 gap-y-6 border-t border-line pt-8 sm:grid-cols-2">
            {facts.map((f, i) => (
              <div key={f.label} data-reveal style={{ '--i': i } as React.CSSProperties}>
                <dt className="font-mono text-xs text-muted">{f.label}</dt>
                <dd className="mt-1 text-[17px] text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/** Bagian Skills: grid ikon dan nama, tanpa kartu. */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto w-full max-w-5xl px-5 py-24 sm:px-8 md:py-32">
        <h2 id="skills-title" data-reveal className="text-2xl font-semibold tracking-tight md:text-3xl">
          Tools I work with
        </h2>
        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 md:grid-cols-4">
          {skills.map((skill, i) => (
            <li
              key={skill.name}
              data-reveal
              style={{ '--i': i % 4 } as React.CSSProperties}
              className="flex items-center gap-3 text-[17px] text-ink"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-surface">
                <img src={skill.icon} alt="" width={20} height={20} className="size-5" />
              </span>
              {skill.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
