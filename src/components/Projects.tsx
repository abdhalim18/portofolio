const projects = [
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

/** Proyek sebagai "stage": kartu berbingkai pixel, dua kolom di desktop. */
export default function Projects() {
    return (
        <ul className="grid gap-8 md:grid-cols-2">
            {projects.map((project, i) => (
                <li
                    key={project.id}
                    data-reveal
                    style={{ '--i': i % 2 } as React.CSSProperties}
                    className={i === projects.length - 1 && projects.length % 2 === 1 ? 'md:col-span-2' : ''}
                >
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-panel group flex h-full flex-col p-6 transition-transform duration-100 hover:-translate-y-1 active:translate-y-0"
                    >
                        <span className="px-label text-coin">STAGE {i + 1}</span>
                        <h2 className="mt-3 text-sm leading-relaxed group-hover:text-coin sm:text-base sm:leading-relaxed">
                            {project.title}
                        </h2>
                        <p className="mt-4 text-muted">{project.description}</p>
                        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Built with">
                            {project.tags.map((tag) => (
                                <li key={tag} className="border-2 border-black bg-panel-2 px-2 py-0.5 text-xs text-cream">
                                    {tag}
                                </li>
                            ))}
                        </ul>
                        <span className="mt-auto pt-6 font-pixel text-[0.625rem] text-cream group-hover:text-coin">
                            PLAY <span aria-hidden="true">▶</span>
                            <span className="sr-only"> (opens in a new tab)</span>
                        </span>
                    </a>
                </li>
            ))}
        </ul>
    );
}
