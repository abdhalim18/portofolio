import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

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

/** Daftar proyek: judul dan teknologi di kiri, deskripsi di kanan, garis tipis di antara baris. */
export default function Projects() {
    return (
        <ul className="border-t border-line">
            {projects.map((project, i) => (
                <li key={project.id} data-reveal style={{ '--i': Math.min(i, 3) } as React.CSSProperties} className="border-b border-line">
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group grid gap-3 py-8 transition-colors duration-200 md:grid-cols-12 md:gap-8"
                    >
                        <div className="md:col-span-5">
                            <h2 className="text-xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-ink">
                                {project.title}
                            </h2>
                            <p className="mt-2 font-mono text-xs text-muted">{project.tags.join(', ')}</p>
                        </div>
                        <p className="text-muted md:col-span-6">{project.description}</p>
                        <span className="hidden justify-self-end md:col-span-1 md:block" aria-hidden="true">
                            <ArrowUpRight
                                weight="bold"
                                className="size-5 text-muted transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                            />
                        </span>
                        <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                </li>
            ))}
        </ul>
    );
}
