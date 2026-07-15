import { motion } from 'motion/react';

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
            'Point of Sale (POS) System for retail businesses, with features like sales management, inventory management, stock of goods, and reporting.',
        tags: ['Next.js'],
        link: 'https://erp-roman.vercel.app',
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
];

const Projects = () => {
    return (
        <section id="projects" className="projects section">
            <div className="container">
                <motion.div
                    className="section-head"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-index">02 — Work</span>
                    <h2 className="section-title">Featured Projects</h2>
                    <p className="section-subtitle">
                        A curated selection of projects — from social-impact tools to full-stack business systems.
                    </p>
                </motion.div>

                <div className="project-list">
                    {projects.map((project, index) => (
                        <motion.a
                            key={project.id}
                            className="project-row"
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="project-row-fill" aria-hidden="true" />
                            <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                            <span className="project-main">
                                <span className="project-title">{project.title}</span>
                                <span className="project-description">{project.description}</span>
                                <span className="project-tags">
                                    {project.tags.map((tag) => (
                                        <span key={tag}>{tag}</span>
                                    ))}
                                </span>
                            </span>
                            <span className="project-arrow" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 17 17 7" />
                                    <path d="M7 7h10v10" />
                                </svg>
                            </span>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
