import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
        }
        return 'dark';
    });

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

    // Listen for theme changes from ThemeToggle
    useEffect(() => {
        const observer = new MutationObserver(() => {
            const current = document.documentElement.getAttribute('data-theme') as 'dark' | 'light';
            if (current) setTheme(current);
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    const navItems = [
        { label: 'About', href: '#about' },
        { label: 'Projects', href: '#projects' },
        { label: 'Contact', href: '#contact' },
    ];

    // Dynamic navbar bg colors based on theme
    const scrolledBg = theme === 'dark' ? 'rgba(12,12,12,0.85)' : 'rgba(248,247,244,0.85)';
    const scrolledBorder = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            style={{
                borderBottomColor: scrolled ? scrolledBorder : 'transparent',
                backgroundColor: scrolled ? scrolledBg : 'transparent',
            }}
        >
            <div className="navbar-container">
                <a href="#hero" className="logo">
                    al
                </a>

                <ThemeToggle />

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
                            transition={{ delay: 0.15 * i, duration: 0.4 }}
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
