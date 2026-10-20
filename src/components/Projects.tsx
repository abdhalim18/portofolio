type Project = {
    id: number;
    title: string;
    description: string;
    tags: string[];
    /** Kosongkan jika belum ada link publik; kartu tampil tanpa tombol PLAY. */
    link?: string;
};

const softwareProjects: Project[] = [
    {
        id: 1,
        title: 'Edit Tone Photo',
        description:
            'Automatic image generator (photo filter maker) used as a form of digital solidarity and social movement in Indonesia.',
        tags: ['Next.js', 'Tailwind', 'Framer Motion'],
        link: 'https://brave-pink-hero-green-xi.vercel.app',
    },
    {
        id: 2,
        title: 'Booking Barbershop Online',
        description:
            'Website for booking barbershop online, with features like barbershop list, booking, and user profile.',
        tags: ['Next.js', 'Vite', 'shadcn/ui'],
        link: 'https://booking-barbershop-al.vercel.app',
    },
    {
        id: 3,
        title: 'POS (Point of Sale) System',
        description:
            'Point of Sale (POS) System for retail businesses, with features like sales management, FEFO (First Expired, First Out) inventory management, stock of goods, and reporting.',
        tags: ['Next.js'],
        link: 'https://pos-roman.vercel.app',
    },
    {
        id: 4,
        title: 'Ar-Risalah Islamic Boarding School',
        description:
            'Website for an Islamic boarding school (asrama), featuring school information, student registration, and management modules.',
        tags: ['Next.js', 'Tailwind'],
        link: 'https://ar-risalah-du.vercel.app/',
    },
    {
        id: 5,
        title: 'Konverta - File Converter',
        description:
            'Web-based file conversion tool that lets users convert files between different formats quickly and easily.',
        tags: ['Next.js', 'Tailwind'],
        link: 'https://konverta-file.vercel.app/',
    },
    {
        id: 6,
        title: 'POS App (Flutter)',
        description:
            'Cross-platform Point of Sale mobile application built with Flutter, integrated with Supabase for backend and data management.',
        tags: ['Flutter', 'Dart', 'Supabase'],
        link: 'https://github.com/abdhalim18/project_flutter',
    },
    {
        id: 7,
        title: 'Barbershop Booking API (Laravel)',
        description:
            'Backend REST API for the Barbershop Booking platform, built with Laravel and MySQL to handle bookings, barbershops, and user data.',
        tags: ['Laravel', 'MySQL', 'PHP'],
        link: 'https://github.com/abdhalim18/barbershop_booking_laravel',
    },
];

const dataProjects: Project[] = [
    {
        id: 1,
        title: 'PWS Dashboard for Maternal & Child Health and Immunization',
        description:
            'Local Area Monitoring (PWS) dashboard for 11 Puskesmas areas in Bogor District and Bekasi City (synthetic data). Tracks K1, K4, DPT3 and IDL coverage against pro-rated targets, with a heatmap that ranks the lowest-coverage areas.',
        tags: ['Looker Studio', 'Google Sheets'],
        link: 'https://drive.google.com/file/d/1NubURzzsUiAtsj8wngF_SqJzvM4zmouV/view?usp=sharing',
    },
    {
        id: 2,
        title: 'Data Quality Monitoring for MCH & Immunization Reports',
        description:
            'Cleaned 159 monthly reports from Puskesmas, midwife practices and hospitals (synthetic data) in 18 documented steps, then built a completeness and timeliness scorecard (95.0% / 86.9%) and a DWH–ASIK immunization reconciliation.',
        tags: ['Microsoft Excel'],
        link: 'https://drive.google.com/drive/folders/1kGMF8rOu1CN_Ai-6fR_Q4_ruFt5y5Sm2?usp=sharing',
    },
    {
        id: 3,
        title: 'Ultramarathon Race Data Analysis',
        description:
            "Processed 7.46 million race records (828 MB, about 7x Excel's row limit) with chunked reading in pandas, corrected 194,226 speed values recorded in the wrong unit, and built a Tableau dashboard of participation trends, finish times by gender, and speed by age.",
        tags: ['Python', 'pandas', 'Tableau'],
        link: 'https://drive.google.com/drive/folders/1uLsGJChxs1Wcy8au2KjdrtJocVaiPQ7H?usp=sharing',
    },
];

const groups = [
    { id: 'software', title: 'SOFTWARE', stage: 'STAGE', cta: 'PLAY', items: softwareProjects },
    { id: 'data', title: 'DATA', stage: 'DATA STAGE', cta: 'VIEW', items: dataProjects },
];

/** Proyek sebagai "stage": kartu berbingkai pixel, dua kolom di desktop, dikelompokkan software dan data. */
export default function Projects() {
    return (
        <div className="space-y-20">
            {groups.map((group) => (
                <section key={group.id} aria-labelledby={`projects-${group.id}`}>
                    <h2 id={`projects-${group.id}`} data-reveal className="text-lg sm:text-xl [text-shadow:4px_4px_0_#000]">
                        {group.title}
                    </h2>
                    <ul className="mt-10 grid gap-8 md:grid-cols-2">
                        {group.items.map((project, i) => (
                            <li
                                key={project.id}
                                data-reveal
                                style={{ '--i': i % 2 } as React.CSSProperties}
                                className={i === group.items.length - 1 && group.items.length % 2 === 1 ? 'md:col-span-2' : ''}
                            >
                                <ProjectCard project={project} label={`${group.stage} ${i + 1}`} cta={group.cta} />
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
}

function ProjectCard({ project, label, cta }: { project: Project; label: string; cta: string }) {
    const body = (
        <>
            <span className="px-label text-coin">{label}</span>
            <h3 className="mt-3 text-sm leading-relaxed group-hover:text-coin sm:text-base sm:leading-relaxed">
                {project.title}
            </h3>
            <p className="mt-4 text-muted">{project.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Built with">
                {project.tags.map((tag) => (
                    <li key={tag} className="border-2 border-black bg-panel-2 px-2 py-0.5 text-xs text-cream">
                        {tag}
                    </li>
                ))}
            </ul>
        </>
    );

    if (!project.link) {
        return <div className="px-panel flex h-full flex-col p-6">{body}</div>;
    }

    return (
        <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-panel group flex h-full flex-col p-6 transition-transform duration-100 hover:-translate-y-1 active:translate-y-0"
        >
            {body}
            <span className="mt-auto pt-6 font-pixel text-[0.625rem] text-cream group-hover:text-coin">
                {cta} <span aria-hidden="true">▶</span>
                <span className="sr-only"> (opens in a new tab)</span>
            </span>
        </a>
    );
}
