import { motion } from 'motion/react';

const Contact = () => {
    return (
        <section id="contact" className="contact section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: 'center' }}
                >
                    <span className="section-label" style={{ justifyContent: 'center' }}>Contact</span>
                    <h2 className="section-title">Get In Touch</h2>
                </motion.div>
                <motion.div
                    className="contact-wrapper"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                >
                    <p className="contact-text">
                        I'm currently open to new opportunities and collaborations.
                        Whether you have a question or just want to say hi — feel free to reach out!
                    </p>
                    <a href="mailto:mabdulhalim257@gmail.com" className="btn btn-primary">
                        Say Hello
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
