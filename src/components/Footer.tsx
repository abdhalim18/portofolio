const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Muhammad Abdul Halim. All rights reserved.</p>
                <div className="social-links">
                    <a href="#" aria-label="GitHub">GitHub</a>
                    <a href="#" aria-label="LinkedIn">LinkedIn</a>
                    <a href="#" aria-label="Instagram">Instagram</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
