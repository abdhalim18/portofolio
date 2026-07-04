import { motion, useScroll, useSpring } from 'motion/react';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 280,
        damping: 40,
        restDelta: 0.001,
    });

    return <motion.div className="scroll-progress" style={{ scaleX }} />;
};

export default ScrollProgress;
