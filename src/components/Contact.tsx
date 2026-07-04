import { motion } from 'motion/react';

const Contact = () => {
    return (
        <section id="contact" className="contact section">
            <div className="container">
                <motion.div
                    className="section-head"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-index">03 — Contact</span>
                    <h2 className="section-title">Let's work together</h2>
                </motion.div>

                <motion.div
                    className="contact-status"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <span className="hero-dot" />
                    Currently open to internships & collaborations
                </motion.div>

                <motion.a
                    href="mailto:mabdulhalim257@gmail.com"
                    className="contact-link"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    mabdulhalim257@gmail.com
                </motion.a>

                <motion.p
                    className="contact-copy"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    Whether you have a project in mind or just want to connect —
                    I'd love to hear from you.
                </motion.p>

                <motion.div
                    className="contact-social"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <a href="https://github.com/abdhalim18" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <span>/</span>
                    <a href="https://www.linkedin.com/in/mhmmd-abdul-halim-/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <span>/</span>
                    <a href="mailto:mabdulhalim257@gmail.com">Email</a>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
