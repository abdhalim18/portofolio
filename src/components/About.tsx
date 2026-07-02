import { motion } from 'motion/react';
import reactIcon from '../assets/icons/react.svg';
import typescriptIcon from '../assets/icons/typescript.svg';
import nextjsIcon from '../assets/icons/nextjs.svg';
import tailwindcssIcon from '../assets/icons/tailwindcss.svg';
import nodejsIcon from '../assets/icons/nodejs.svg';
import laravelIcon from '../assets/icons/laravel.svg';
import phpIcon from '../assets/icons/php.svg';
import mysqlIcon from '../assets/icons/mysql.svg';
import postgresqlIcon from '../assets/icons/postgresql.svg';
import figmaIcon from '../assets/icons/figma.svg';
import javascriptIcon from '../assets/icons/javascript.svg';
import html5Icon from '../assets/icons/html5.svg';

const skills = [
    { name: 'React', icon: reactIcon },
    { name: 'TypeScript', icon: typescriptIcon },
    { name: 'Next.js', icon: nextjsIcon },
    { name: 'Tailwind CSS', icon: tailwindcssIcon },
    { name: 'Node.js', icon: nodejsIcon },
    { name: 'Laravel', icon: laravelIcon },
    { name: 'PHP', icon: phpIcon },
    { name: 'MySQL', icon: mysqlIcon },
    { name: 'PostgreSQL', icon: postgresqlIcon },
    { name: 'Figma', icon: figmaIcon },
    { name: 'JavaScript', icon: javascriptIcon },
    { name: 'HTML/CSS', icon: html5Icon },
];

const About = () => {
    return (
        <section id="about" className="about section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">About</span>
                    <h2 className="section-title">A bit about me</h2>
                </motion.div>
                <div className="about-content">
                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <p>
                            An 8th-semester Information Systems student with a deep focus on web development.
                            I enjoy turning complex problems into simple, beautiful, and intuitive solutions.
                        </p>
                        <p>
                            I'm actively seeking internship opportunities or collaborative projects where I can
                            apply my skills, learn from experienced professionals, and create meaningful impact
                            through technology.
                        </p>
                    </motion.div>
                    <motion.div
                        className="about-skills"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3>Tech Stack</h3>
                        <div className="skills-grid">
                            {skills.map((skill, index) => (
                                <motion.span
                                    key={skill.name}
                                    className="skill-tag"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.04 }}
                                >
                                    <img
                                        src={skill.icon}
                                        alt={skill.name}
                                        className="skill-icon"
                                    />
                                    {skill.name}
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
