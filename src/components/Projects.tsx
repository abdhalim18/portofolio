import { motion } from 'motion/react';

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: "E-Commerce Dashboard",
            description: "A comprehensive dashboard for managing online stores, featuring real-time analytics and inventory management.",
            tags: ["React", "Chart.js", "Node.js"],
            link: "#"
        },
        {
            id: 2,
            title: "Social Media App",
            description: "A responsive social media platform with real-time messaging, notifications, and user profiles.",
            tags: ["Next.js", "Firebase", "Tailwind"],
            link: "#"
        },
        {
            id: 3,
            title: "Task Management Tool",
            description: "A collaborative tool for teams to organize tasks, set deadlines, and track progress efficiently.",
            tags: ["Vue.js", "Vuex", "SCSS"],
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
