import { motion } from 'motion/react';

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: "Edit Tone Photo",
            description: "Automatic image generator (photo filter maker) used as a form of digital solidarity and social movement in Indonesia.",
            tags: ["Next.js", "Tailwind", "Framer Motion"],
            link: "https://brave-pink-hero-green-xi.vercel.app"
        },
        {
            id: 2,
            title: "Booking Barbershop Online",
            description: "Website for booking barbershop online, with features like barbershop list, booking, and user profile.",
            tags: ["Next.js", "Vite", "shadcn/ui"],
            link: "https://booking-barbershop-al.vercel.app"
        },
        {
            id: 3,
            title: "Vetmed ERP (on going)",
            description: "Enterprise Resource Planning (ERP) for veterinary clinics, with features like sales management inventory management, stock of goods, and reporting.",
            tags: ["on going", "on going", "on going"],
            link: "#"
        }
    ];

    return (
        <section id="projects" className="projects section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Featured Projects
                </motion.h2>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="project-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                                <a href={project.link} className="project-link">View Project &rarr;</a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
