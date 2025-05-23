import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBaseballBall } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const navLinks = ['Home', 'About', 'Plans', 'Booking', 'Contact', 'Gallery'];

  return (
    <Box component="footer" className="footer">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="footer-content"
        >
          <Typography variant="h6" className="footer-name">
            Oleksandra
          </Typography>

          <Box className="footer-links">
            {navLinks.map((link) => (
              <Link
                key={link}
                href={`#${link.toLowerCase()}`}
                color="inherit"
                underline="none"
              >
                {link}
              </Link>
            ))}
          </Box>

          <Box className="footer-copyright">
            <FaBaseballBall className="tennis-icon" />
            <Typography variant="body2">
              All rights reserved © {new Date().getFullYear()}
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer; 