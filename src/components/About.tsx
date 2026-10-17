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
  { name: 'Python', icon: '/icons/python.svg' },
  { name: 'Excel', icon: '/icons/excel.svg' },
  { name: 'Tableau', icon: '/icons/tableau.svg' },
  { name: 'Looker Studio', icon: '/icons/lookerstudio.svg' },
];

const facts = [
  { label: 'Role', value: 'Web Developer' },
  { label: 'Focus', value: 'Front-end, UI systems, and data analytics' },
  { label: 'Study', value: 'Information Systems graduate' },
  { label: 'Status', value: 'Open to full-time roles and collaborations' },
];

/** About: cerita singkat di kiri, "stat pemain" di panel kanan. */
export default function About() {
  return (
    <section id="about-me" aria-labelledby="about-title" className="scroll-mt-20">
      <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-20 sm:px-8 md:grid-cols-12 md:py-24">
        <div className="md:col-span-7">
          <h2 id="about-title" data-reveal className="text-lg sm:text-xl [text-shadow:4px_4px_0_#000]">
            ABOUT ME
          </h2>
          <p data-reveal className="mt-8 font-pixel text-sm leading-loose text-cream sm:text-base sm:leading-loose">
            I turn complex problems into simple, intuitive web products.
          </p>
          <p data-reveal className="mt-6 max-w-[58ch] text-[17px] text-muted">
            I recently graduated in Information Systems with a focus on web development. Lately I&apos;ve also been
            working with data: cleaning messy reports, analysing millions of rows in Python, and building dashboards
            in Tableau and Looker Studio. I&apos;m looking for a front-end, full-stack, or data analyst role where I
            can ship real work, learn from experienced people, and keep getting better at the craft.
          </p>
        </div>

        <dl data-reveal style={{ '--i': 1 } as React.CSSProperties} className="px-panel self-start p-6 md:col-span-5">
          {facts.map((f, i) => (
            <div key={f.label} className={i > 0 ? 'mt-5 border-t-4 border-dashed border-panel-2 pt-5' : ''}>
              <dt className="px-label">{f.label}</dt>
              <dd className="mt-1.5 text-[17px] text-cream">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Skills: kotak-kotak item seperti inventori. */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-8 md:py-24">
        <h2 id="skills-title" data-reveal className="text-lg sm:text-xl [text-shadow:4px_4px_0_#000]">
          TOOLS I WORK WITH
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {skills.map((skill, i) => (
            <li
              key={skill.name}
              data-reveal
              style={{ '--i': i % 4 } as React.CSSProperties}
              className="flex items-center gap-3 border-4 border-black bg-panel-2 p-3 text-[15px] text-cream shadow-[4px_4px_0_#000] sm:text-base"
            >
              <span className="grid size-10 shrink-0 place-items-center border-2 border-black bg-cream">
                <img src={skill.icon} alt="" width={22} height={22} className="size-[22px] [image-rendering:auto]" />
              </span>
              {skill.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
