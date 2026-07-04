import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const INTERACTIVE_SELECTOR = 'a, button, [data-cursor-hover]';

const CustomCursor = () => {
    const [enabled, setEnabled] = useState(false);
    const [hovering, setHovering] = useState(false);
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

    useEffect(() => {
        const fine = window.matchMedia('(pointer: fine)').matches;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        setEnabled(fine && !reduced);
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const move = (e: PointerEvent) => {
            x.set(e.clientX - 5);
            y.set(e.clientY - 5);
        };

        const over = (e: PointerEvent) => {
            const target = e.target as HTMLElement;
            setHovering(!!target.closest(INTERACTIVE_SELECTOR));
        };

        window.addEventListener('pointermove', move);
        window.addEventListener('pointerover', over);
        return () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerover', over);
        };
    }, [enabled, x, y]);

    if (!enabled) return null;

    return (
        <motion.div
            className="cursor-dot"
            style={{ x: springX, y: springY }}
            animate={{ scale: hovering ? 2.4 : 1, opacity: hovering ? 0.6 : 1 }}
            transition={{ duration: 0.2 }}
        />
    );
};

export default CustomCursor;
