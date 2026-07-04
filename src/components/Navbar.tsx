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
        { index: '01', label: 'About', href: '#about' },
        { index: '02', label: 'Work', href: '#projects' },
        { index: '03', label: 'Contact', href: '#contact' },
    ];

    const scrolledBg = theme === 'dark' ? 'rgba(11,11,12,0.82)' : 'rgba(245,243,238,0.82)';
    const scrolledBorder = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
                borderBottomColor: scrolled ? scrolledBorder : 'transparent',
                backgroundColor: scrolled ? scrolledBg : 'transparent',
                backdropFilter: scrolled ? 'blur(16px)' : 'none',
            }}
        >
            <div className="navbar-inner">
                <a href="#hero" className="brand">
                    abdul<span>.</span>halim
                </a>

                <div className="nav-right">
                    <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                        {navItems.map((item, i) => (
                            <motion.li
                                key={item.label}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 * i, duration: 0.4 }}
                            >
                                <a
                                    href={item.href}
                                    className="nav-link"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <i>{item.index}</i>
                                    {item.label}
                                </a>
                            </motion.li>
                        ))}
                    </ul>

                    <ThemeToggle />

                    <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu} data-cursor-hover>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
