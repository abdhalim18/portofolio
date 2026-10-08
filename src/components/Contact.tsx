
const Contact = () => {
    return (
        <section id="contact" className="contact section">
            <div className="container">
                <div data-reveal className="section-head">
                    <span className="section-index">03 — Contact</span>
                    <h2 className="section-title">Let's work together</h2>
                </div>

                <div data-reveal className="contact-status">
                    <span className="hero-dot" />
                    Currently open to internships & collaborations
                </div>

                <a
                    data-reveal
                    href="mailto:mabdulhalim257@gmail.com"
                    className="contact-link"
                >
                    mabdulhalim257@gmail.com
                </a>

                <p data-reveal className="contact-copy">
                    Whether you have a project in mind or just want to connect —
                    I'd love to hear from you.
                </p>

                <div data-reveal className="contact-social">
                    <a href="https://github.com/abdhalim18" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <span>/</span>
                    <a href="https://www.linkedin.com/in/mhmmd-abdul-halim-/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <span>/</span>
                    <a href="mailto:mabdulhalim257@gmail.com">Email</a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
