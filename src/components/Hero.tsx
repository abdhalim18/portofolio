import { motion } from 'motion/react';

const Hero = () => {
    return (
        <section id="hero" className="hero">
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
                    <a href="#projects" className="btn btn-primary">View My Work</a>
                    <a href="#contact" className="btn btn-outline">Contact Me</a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
