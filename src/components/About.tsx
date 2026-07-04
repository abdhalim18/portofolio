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

const specs = [
    { label: 'Role', value: 'Web Developer' },
    { label: 'Focus', value: 'Front-end & UI Systems' },
    { label: 'Study', value: '8th-semester, Information Systems' },
    { label: 'Status', value: 'Open to internships & collab' },
];

const About = () => {
    const track = [...skills, ...skills];

    return (
        <section id="about" className="about section">
            <div className="container">
                <motion.div
                    className="section-head"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-index">01 — About</span>
                    <h2 className="section-title">A bit about me</h2>
                </motion.div>

                <div className="about-grid">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <p className="about-intro">
                            I enjoy turning complex problems into simple, beautiful,
                            and intuitive digital solutions.
                        </p>
                        <p className="about-body">
                            An 8th-semester Information Systems student with a deep focus on web
                            development. I'm actively seeking internship opportunities or
                            collaborative projects where I can apply my skills, learn from
                            experienced professionals, and create meaningful impact through
                            technology.
                        </p>
                    </motion.div>

                    <motion.dl
                        className="about-specs"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {specs.map((spec) => (
                            <div className="about-spec-row" key={spec.label}>
                                <dt>{spec.label}</dt>
                                <dd>{spec.value}</dd>
                            </div>
                        ))}
                    </motion.dl>
                </div>

                <div className="marquee-wrap">
                    <div className="marquee-track">
                        {track.map((skill, i) => (
                            <span className="marquee-item" key={`${skill.name}-${i}`}>
                                <img src={skill.icon} alt="" aria-hidden="true" />
                                {skill.name}
                                <span className="marquee-sep" aria-hidden="true">/</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
