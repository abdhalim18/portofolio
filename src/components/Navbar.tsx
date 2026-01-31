import { useState } from 'react';
import { motion } from 'motion/react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="navbar-container">
                <a href="#hero" className="logo">Muhammad Abdul Halim</a>

                <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <a href="#about" className="nav-link" onClick={() => setIsOpen(false)}>About</a>
                    </li>
                    <li className="nav-item">
                        <a href="#projects" className="nav-link" onClick={() => setIsOpen(false)}>Projects</a>
                    </li>
                    <li className="nav-item">
                        <a href="#contact" className="nav-link" onClick={() => setIsOpen(false)}>Contact</a>
                    </li>
                </ul>
            </div>
        </motion.nav>
    );
};

export default Navbar;
