import type { Metadata } from 'next';
import Link from 'next/link';
import PageIntro from '@/components/site/PageIntro';

// Studi kasus proyek data. Angka diambil dari notebook pembersihan dan dashboard Tableau.
const DASHBOARD_URL =
  'https://public.tableau.com/app/profile/muhammad.halim1612/viz/AnalisisUltramaraton50K100K/Dashboard1';

export const metadata: Metadata = {
  title: 'Ultramarathon Race Data Analysis',
  description:
    'Case study: cleaning 7.46 million ultramarathon race results with Python (pandas) and analysing 50 km and 100 km races in a Tableau dashboard.',
};

const stats = [
  { value: '7.46M', label: 'Race results' },
  { value: '1.64M', label: 'Athletes' },
  { value: '26,907', label: 'Events' },
  { value: '208', label: 'Countries' },
];

const cleaning = [
  {
    step: 'Read the file in 1M-row chunks',
    detail:
      "At 828 MB the raw CSV is about 7x Excel's row limit. Reading it in chunks keeps memory low while still profiling all 7.46 million rows.",
  },
  {
    step: 'Keep only 50 km and 100 km races',
    detail:
      'The distance column mixes kilometres, miles, timed races (6 h, 24 h) and multi-day stages. These are the two most common fixed distances in the same unit, so finish times compare fairly. 7,461,195 → 2,474,351 rows.',
  },
  {
    step: 'Drop rows without a birth year',
    detail: 'Age is a core variable, so 216,934 rows without one were removed.',
  },
  {
    step: 'Convert finish times to minutes',
    detail: 'Including multi-day formats such as 2d 00:21:51, then derive each athlete’s age at the race.',
  },
  {
    step: 'Fix speeds stored in the wrong unit',
    detail:
      'Recomputing distance ÷ time showed 194,226 rows (8.6%) about 1,000x too high: they were in metres per hour. Correcting them brought the average speed from 717 km/h down to 7.7 km/h.',
  },
  {
    step: 'Remove invalid rows',
    detail:
      '132 rows with a zero finish time, a speed above 25 km/h (faster than the world record), an age outside 10–90, a missing gender, or an exact duplicate.',
  },
];

const ageGroups = [
  { group: 'Under 30', speed: '7.42', share: '10.3%' },
  { group: '30–39', speed: '7.71', share: '29.1%' },
  { group: '40–49', speed: '7.73', share: '35.1%' },
  { group: '50–59', speed: '7.53', share: '19.5%' },
  { group: '60–69', speed: '7.17', share: '5.3%' },
  { group: '70+', speed: '6.28', share: '0.7%' },
];

const headingClass = 'text-lg sm:text-xl [text-shadow:4px_4px_0_#000]';

export default function UltramarathonPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-5xl px-5 pb-32 pt-20 sm:px-8 md:pt-24">
      <Link href="/projects" className="font-pixel text-[0.625rem] text-cream hover:text-coin">
        <span aria-hidden="true">◀</span> ALL PROJECTS
      </Link>

      <div className="mt-10">
        <PageIntro title="Ultramarathon Race Data Analysis">
          Two centuries of ultramarathon results, cleaned with Python and explored in Tableau: how participation
          grew, how men and women compare over 50 km and 100 km, and at what age runners are fastest.
        </PageIntro>
      </div>

      <div data-reveal className="mt-10 flex flex-wrap items-center gap-4">
        <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer" className="px-btn">
          OPEN DASHBOARD <span aria-hidden="true">▶</span>
          <span className="sr-only"> on Tableau Public (opens in a new tab)</span>
        </a>
        <ul className="flex flex-wrap gap-2" aria-label="Built with">
          {['Python', 'pandas', 'Jupyter Notebook', 'Tableau Public'].map((tag) => (
            <li key={tag} className="border-2 border-black bg-panel-2 px-2 py-0.5 text-xs text-cream">
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {/* Overview */}
      <section aria-labelledby="overview-title" className="mt-20">
        <h2 id="overview-title" data-reveal className={headingClass}>
          OVERVIEW
        </h2>
        <div className="mt-8 grid gap-10 md:grid-cols-12">
          <div data-reveal className="space-y-5 text-[17px] text-muted md:col-span-7">
            <p>
              The data comes from the public dataset <em className="text-cream">Two Centuries of Ultramarathon Races</em>
              : every recorded ultramarathon result from 1798 to 2022, with the event, distance, finish time, average
              speed, and each athlete’s gender, birth year and country.
            </p>
            <p>
              The raw file is too large for Excel, so I profiled and cleaned it in pandas, narrowed it to 50 km and 100
              km races so the numbers compare fairly, and fed the clean file into a Tableau dashboard. The raw file was
              never edited, and every dropped row is recorded in a cleaning log with its reason.
            </p>
          </div>
          <dl data-reveal style={{ '--i': 1 } as React.CSSProperties} className="px-panel grid grid-cols-2 gap-6 self-start p-6 md:col-span-5">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="px-label">{s.label}</dt>
                <dd className="mt-2 font-pixel text-base text-coin sm:text-lg">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Cleaning */}
      <section aria-labelledby="cleaning-title" className="mt-20">
        <h2 id="cleaning-title" data-reveal className={headingClass}>
          DATA CLEANING
        </h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-2">
          {cleaning.map((c, i) => (
            <li key={c.step} data-reveal style={{ '--i': i % 2 } as React.CSSProperties} className="px-panel p-6">
              <span className="px-label text-coin">STEP {i + 1}</span>
              <h3 className="mt-3 text-sm leading-relaxed">{c.step}</h3>
              <p className="mt-3 text-muted">{c.detail}</p>
            </li>
          ))}
        </ol>
        <p data-reveal className="px-dialog mt-8 px-5 py-4 text-[17px] leading-relaxed">
          Result: <strong>2,257,285 rows</strong> and 241 MB. That is 70% fewer rows, yet still 2.2x Excel’s limit.
        </p>
      </section>

      {/* Screenshot */}
      <section aria-labelledby="dashboard-title" className="mt-20">
        <h2 id="dashboard-title" data-reveal className={headingClass}>
          THE DASHBOARD
        </h2>
        <figure data-reveal className="mt-8">
          <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer" className="block border-4 border-black shadow-[6px_6px_0_#000]">
            <img
              src="/projects/ultramarathon-dashboard.png"
              alt="Tableau dashboard with three charts: race results per year by gender from 1970 to 2022, median finish time by distance and gender, and median speed by athlete age."
              width={1680}
              height={1158}
              loading="lazy"
              className="h-auto w-full [image-rendering:auto]"
            />
            <span className="sr-only"> (opens the interactive dashboard in a new tab)</span>
          </a>
          <figcaption className="mt-4 text-sm text-muted">
            Static snapshot of the dashboard. Open it on Tableau Public to hover over values and filter.
          </figcaption>
        </figure>
      </section>

      {/* Metrics */}
      <section aria-labelledby="metrics-title" className="mt-20">
        <h2 id="metrics-title" data-reveal className={headingClass}>
          METRIC BY METRIC
        </h2>
        <p data-reveal className="mt-4 max-w-[60ch] text-muted">
          All times and speeds are medians, which hold up better than averages against extreme values.
        </p>

        <div className="mt-10 space-y-8">
          <article data-reveal className="px-panel p-6 sm:p-8">
            <span className="px-label text-coin">METRIC 1</span>
            <h3 className="mt-3 text-sm leading-relaxed sm:text-base">Race results per year</h3>
            <div className="mt-5 space-y-4 text-muted">
              <p>
                Participation stayed flat for decades, then took off after 2010. The 2010s logged{' '}
                <strong className="text-cream">1.41 million</strong> results, about 4.4x the 2000s (316,528) and more
                than every earlier decade combined.
              </p>
              <p>
                The line peaks just before 2020 and then drops sharply as races were cancelled during the COVID-19
                pandemic, before starting to recover in 2021–2022.
              </p>
              <p>
                Women make up 22.1% of all results, rising to <strong className="text-cream">24.4%</strong> since 2010.
                The orange line climbs steadily, but men still dominate the field.
              </p>
            </div>
          </article>

          <article data-reveal className="px-panel p-6 sm:p-8">
            <span className="px-label text-coin">METRIC 2</span>
            <h3 className="mt-3 text-sm leading-relaxed sm:text-base">Median finish time by distance and gender</h3>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[22rem] border-collapse text-left">
                <thead>
                  <tr className="border-b-4 border-dashed border-panel-2">
                    <th scope="col" className="px-label py-2 pr-4 font-normal">Distance</th>
                    <th scope="col" className="px-label py-2 pr-4 font-normal">Men</th>
                    <th scope="col" className="px-label py-2 pr-4 font-normal">Women</th>
                    <th scope="col" className="px-label py-2 font-normal">Gap</th>
                  </tr>
                </thead>
                <tbody className="text-cream">
                  <tr className="border-b-4 border-dashed border-panel-2">
                    <th scope="row" className="py-3 pr-4 font-normal">50 km</th>
                    <td className="py-3 pr-4">6.2 h</td>
                    <td className="py-3 pr-4">6.9 h</td>
                    <td className="py-3">+11%</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-3 pr-4 font-normal">100 km</th>
                    <td className="py-3 pr-4">13.5 h</td>
                    <td className="py-3 pr-4">15.0 h</td>
                    <td className="py-3">+10%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-5 space-y-4 text-muted">
              <p>
                Doubling the distance more than doubles the finish time: men take 2.2x longer over 100 km than over 50
                km, because pace drops as the race gets longer (median speed falls from 8.05 to 7.38 km/h for men and
                from 7.27 to 6.69 km/h for women).
              </p>
              <p>
                The gap between men and women stays at roughly <strong className="text-cream">10–11%</strong> at both
                distances. In absolute terms it grows from about 40 minutes to about 1.4 hours, but in relative terms it
                barely moves.
              </p>
            </div>
          </article>

          <article data-reveal className="px-panel p-6 sm:p-8">
            <span className="px-label text-coin">METRIC 3</span>
            <h3 className="mt-3 text-sm leading-relaxed sm:text-base">Median speed by athlete age</h3>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[22rem] border-collapse text-left">
                <thead>
                  <tr className="border-b-4 border-dashed border-panel-2">
                    <th scope="col" className="px-label py-2 pr-4 font-normal">Age</th>
                    <th scope="col" className="px-label py-2 pr-4 font-normal">Median speed</th>
                    <th scope="col" className="px-label py-2 font-normal">Share of results</th>
                  </tr>
                </thead>
                <tbody className="text-cream">
                  {ageGroups.map((a, i) => (
                    <tr key={a.group} className={i < ageGroups.length - 1 ? 'border-b-4 border-dashed border-panel-2' : ''}>
                      <th scope="row" className="py-3 pr-4 font-normal">{a.group}</th>
                      <td className="py-3 pr-4">{a.speed} km/h</td>
                      <td className="py-3">{a.share}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 space-y-4 text-muted">
              <p>
                Speed peaks between <strong className="text-cream">35 and 45</strong>, not in the twenties. Runners under
                30 are slower (7.42 km/h) than those in their thirties and forties (about 7.7 km/h), likely because
                endurance and pacing come with years of training.
              </p>
              <p>
                After 60 the decline becomes clear, reaching 6.28 km/h for runners over 70. The 40–49 group is also the
                largest, with 35% of all results: ultramarathon is a sport of experienced, middle-aged runners.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Conclusion */}
      <section aria-labelledby="conclusion-title" className="mt-20">
        <h2 id="conclusion-title" data-reveal className={headingClass}>
          CONCLUSION
        </h2>
        <ul data-reveal className="px-dialog mt-8 list-disc space-y-3 py-5 pl-10 pr-5 text-[17px] leading-relaxed">
          <li>
            Chunked reading in pandas made a dataset 7x larger than Excel’s limit workable without loading it all into memory, and narrowing it
            to 50 km and 100 km races made the comparisons fair.
          </li>
          <li>
            Checking a recorded value against a recomputed one caught a silent unit error in 8.6% of rows that would have
            inflated average speed about 100x. Validation matters as much as the chart.
          </li>
          <li>
            The sport grew about 4x in the 2010s and the share of women is rising. Men finish about 10% faster at both
            distances, and runners are fastest at 35–45.
          </li>
          <li>
            Caveat: this is a public dataset, so results from before digital record-keeping may be incomplete.
          </li>
        </ul>

        <div data-reveal className="mt-10 flex flex-wrap items-center gap-4">
          <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer" className="px-btn">
            OPEN DASHBOARD <span aria-hidden="true">▶</span>
            <span className="sr-only"> on Tableau Public (opens in a new tab)</span>
          </a>
          <Link href="/projects" className="px-btn px-btn--ghost">
            <span aria-hidden="true">◀</span> ALL PROJECTS
          </Link>
        </div>
      </section>
    </main>
  );
}
