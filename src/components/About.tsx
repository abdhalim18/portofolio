const reactIcon = '/icons/react.svg';
const typescriptIcon = '/icons/typescript.svg';
const nextjsIcon = '/icons/nextjs.svg';
const tailwindcssIcon = '/icons/tailwindcss.svg';
const nodejsIcon = '/icons/nodejs.svg';
const laravelIcon = '/icons/laravel.svg';
const phpIcon = '/icons/php.svg';
const mysqlIcon = '/icons/mysql.svg';
const postgresqlIcon = '/icons/postgresql.svg';
const figmaIcon = '/icons/figma.svg';
const javascriptIcon = '/icons/javascript.svg';
const html5Icon = '/icons/html5.svg';

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
    { label: 'Study', value: 'Information Systems Graduate' },
    { label: 'Status', value: 'Open to full-time roles & collab' },
];

const About = () => {
    const track = [...skills, ...skills];

    return (
        <section id="about" className="about section">
            <div className="container">
                <div data-reveal className="section-head">
                    <span className="section-index">01 — About</span>
                    <h2 className="section-title">A bit about me</h2>
                </div>

                <div className="about-grid">
                    <div data-reveal>
                        <p className="about-intro">
                            I enjoy turning complex problems into simple, beautiful,
                            and intuitive digital solutions.
                        </p>
                        <p className="about-body">
                            A recent Information Systems graduate with a deep focus on web
                            development. I'm actively seeking full-time roles or
                            collaborative projects where I can apply my skills, learn from
                            experienced professionals, and create meaningful impact through
                            technology.
                        </p>
                    </div>

                    <dl data-reveal className="about-specs">
                        {specs.map((spec) => (
                            <div className="about-spec-row" key={spec.label}>
                                <dt>{spec.label}</dt>
                                <dd>{spec.value}</dd>
                            </div>
                        ))}
                    </dl>
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
