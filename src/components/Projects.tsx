import { motion } from 'motion/react';

const projects = [
    {
        id: 1,
        title: 'Edit Tone Photo',
        description:
            'Automatic image generator (photo filter maker) used as a form of digital solidarity and social movement in Indonesia.',
        tags: ['Next.js', 'Tailwind', 'Framer Motion'],
        link: 'https://brave-pink-hero-green-xi.vercel.app',
        image: null,
        status: 'live',
    },
    {
        id: 2,
        title: 'Booking Barbershop Online',
        description:
            'Website for booking barbershop online, with features like barbershop list, booking, and user profile.',
        tags: ['Next.js', 'Vite', 'shadcn/ui'],
        link: 'https://booking-barbershop-al.vercel.app',
        image: null,
        status: 'live',
    },
    {
        id: 3,
        title: 'POS (Point of Sale) System',
        description:
            'Point of Sale (POS) System for retail businesses, with features like sales management, inventory management, stock of goods, and reporting.',
        tags: ['Next.js'],
        link: 'https://erp-roman.vercel.app',
        image: null,
        status: 'live',
    },
];

const Projects = () => {
    return (
        <section id="projects" className="projects section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Work</span>
                    <h2 className="section-title">Featured Projects</h2>
                    <p className="section-subtitle">
                        A curated selection of projects — from social-impact tools to full-stack business systems.
                    </p>
                </motion.div>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="project-card"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ delay: index * 0.12, duration: 0.6 }}
                        >
                            <div className="project-preview">
                                {project.image ? (
                                    <img src={project.image} alt={`${project.title} preview`} className="project-preview-img" />
                                ) : (
                                    <div className="project-preview-placeholder">
                                        <span>{project.title.charAt(0)}</span>
                                    </div>
                                )}
                                {project.status === 'in-progress' && (
                                    <span className="status-badge">In Progress</span>
                                )}
                            </div>
                            <div className="project-content">
                                <div className="project-header">
                                    <div className="folder-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                                        </svg>
                                    </div>
                                    {project.link && (
                                        <div className="project-links">
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Visit ${project.title}`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                    <polyline points="15 3 21 3 21 9" />
                                                    <line x1="10" y1="14" x2="21" y2="3" />
                                                </svg>
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
