const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="container footer-row">
                <p>&copy; {new Date().getFullYear()} Muhammad Abdul Halim</p>
                <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
                    Back to top
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m18 15-6-6-6 6" />
                    </svg>
                </button>
            </div>
        </footer>
    );
};

export default Footer;
