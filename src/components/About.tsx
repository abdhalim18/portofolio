import { motion } from 'motion/react';

const About = () => {
    return (
        <section id="about" className="about section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    About Me
                </motion.h2>
                <div className="about-content">
                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <p>
                            Currently, I am a 7th-semester Information Systems student dedicated to web development.
                            During my studies, I have honed my skills in building responsive and functional applications.
                        </p>
                        <p>
                            I am seeking internship opportunities or projects to apply my knowledge, learn from experienced mentors,
                            and make a tangible contribution to the tech industry.
                        </p>
                    </motion.div>
                    <motion.div
                        className="about-skills"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h3>Tech Stack</h3>
                        <div className="skills-grid">
                            {["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "Laravel", "PHP", "MySQL", "Figma", "JavaScript", "HTML", "CSS"].map((skill, index) => (
                                <motion.span
                                    key={skill}
                                    className="skill-tag"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + (index * 0.1) }}
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
