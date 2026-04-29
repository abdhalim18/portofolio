import { motion } from 'motion/react';

const skills = [
    'React', 'TypeScript', 'Next.js', 'Tailwind CSS',
    'Node.js', 'Laravel', 'PHP', 'MySQL',
    'PostgreSQL', 'Figma', 'JavaScript', 'HTML/CSS',
];

const About = () => {
    return (
        <section id="about" className="about section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-label">About</span>
                    <h2 className="section-title">A bit about me</h2>
                </motion.div>
                <div className="about-content">
                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <p>
                            Currently, I am a 8th-semester Information Systems student dedicated to web development.
                            During my studies, I have honed my skills in building responsive and functional applications.
                        </p>
                        <p>
                            I am seeking internship opportunities or projects to apply my knowledge, learn from
                            experienced mentors, and make a tangible contribution to the tech industry.
                        </p>
                    </motion.div>
                    <motion.div
                        className="about-skills"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3>Tech Stack</h3>
                        <div className="skills-grid">
                            {skills.map((skill, index) => (
                                <motion.span
                                    key={skill}
                                    className="skill-tag"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.04 }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
