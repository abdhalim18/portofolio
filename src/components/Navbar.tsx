import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navItems = [
        { label: 'About', href: '#about' },
        { label: 'Projects', href: '#projects' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            style={{
                borderBottomColor: scrolled ? 'rgba(255,255,255,0.06)' : 'transparent',
                backgroundColor: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
            }}
        >
            <div className="navbar-container">
                <a href="#hero" className="logo">
                    Abdul Halim
                </a>

                <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    {navItems.map((item, i) => (
                        <motion.li
                            key={item.label}
                            className="nav-item"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i, duration: 0.4 }}
                        >
                            <a
                                href={item.href}
                                className="nav-link"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </a>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.nav>
    );
};

export default Navbar;
