import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MagneticButton from './MagneticButton';

const roles = ['Web Developer', 'UI/UX Enthusiast', 'Problem Solver'];

const Hero = () => {
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) return;
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2600);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="hero" className="hero">
            <div className="hero-inner">
                <motion.div
                    className="hero-meta"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="hero-dot" />
                    Available for work — based in Indonesia
                </motion.div>

                <motion.h1
                    className="hero-name"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    Muhammad
                    <br />
                    Abdul Halim
                </motion.h1>

                <motion.div
                    className="hero-role"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.46, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span>I work as a</span>
                    <AnimatePresence mode="wait">
                        <motion.em
                            key={roles[roleIndex]}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {roles[roleIndex]}
                        </motion.em>
                    </AnimatePresence>
                </motion.div>

                <motion.p
                    className="hero-desc"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.58, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    Crafting clean, functional, and thoughtfully designed
                    digital experiences from concept to deployment.
                </motion.p>

                <motion.div
                    className="hero-actions"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <MagneticButton href="#projects" className="btn btn-primary">
                        View Projects
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </MagneticButton>
                    <MagneticButton
                        href="https://drive.google.com/file/d/1205NnDLtZi20zZ4W3S5pRyCY5UTuYEWy/view?usp=drive_link"
                        className="btn btn-outline"
                        download="Muhammad_Abdul_Halim_CV.pdf"
                    >
                        Download CV
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" x2="12" y1="15" y2="3" />
                        </svg>
                    </MagneticButton>
                </motion.div>
            </div>

            <div className="scroll-cue">
                <span>SCROLL</span>
                <div className="scroll-cue-line"><i /></div>
            </div>
        </section>
    );
};

export default Hero;
