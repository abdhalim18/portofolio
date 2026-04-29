const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="social-links">
                    <a href="https://github.com/abdhalim18" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        GitHub
                    </a>
                    <a href="#" aria-label="LinkedIn">
                        LinkedIn
                    </a>
                    <a href="#" aria-label="Instagram">
                        Instagram
                    </a>
                </div>
                <p>&copy; {new Date().getFullYear()} Muhammad Abdul Halim</p>
            </div>
        </footer>
    );
};

export default Footer;
