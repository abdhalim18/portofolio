import { motion } from 'motion/react';

const Hero = () => {
    return (
        <section id="hero" className="hero">
            <div className="hero-background"></div>
            <div className="hero-content">
                <motion.span
                    className="hero-greeting"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    Hello, I'm
                </motion.span>
                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Muhammad Abdul Halim
                </motion.h1>
                <motion.h2
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Web Developer & <span className="highlight">UI/UX Enthusiast</span>
                </motion.h2>
                <motion.p
                    className="hero-description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    I build pixel-perfect, engaging, and accessible digital experiences.
                    Let's turn your ideas into reality.
                </motion.p>
                <motion.div
                    className="hero-buttons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <a href="#projects" className="btn btn-primary">
                        View My Work
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </a>
                    <a href="https://drive.google.com/file/d/198xo1sJGAVG4RVn8vFqKQCE4Vw9Z-pxC/view?usp=drive_link" className="btn btn-outline" download="Muhammad_Abdul_Halim_CV.pdf">
                        Download CV
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
