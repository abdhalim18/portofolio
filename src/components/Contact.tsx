import { motion } from 'motion/react';

const Contact = () => {
    return (
        <section id="contact" className="contact section">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Get In Touch
                </motion.h2>
                <motion.div
                    className="contact-wrapper"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <p className="contact-text">
                        I'm currently open to new opportunities and collaborations.
                        Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>
                    <div className="contact-action" style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <a href="mailto:mabdulhalim257@gmail.com" className="btn btn-primary" style={{ display: 'inline-block' }}>
                            Email Me
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
