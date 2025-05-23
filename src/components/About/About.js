import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaInstagram, FaFacebook, FaLinkedin, FaTrophy } from 'react-icons/fa';
import coachImage from './Oleksandra Guerenko .jpg';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const achievements = [
    { title: "10+ Years Experience", icon: <FaTrophy /> },
    { title: "200+ Students Trained", icon: <FaTrophy /> },
    { title: "Regional Champion", icon: <FaTrophy /> },
    { title: "Certified Coach", icon: <FaTrophy /> },
  ];

  const socialLinks = [
    { icon: <FaInstagram />, tooltip: "Follow on Instagram", link: "#" },
    { icon: <FaFacebook />, tooltip: "Connect on Facebook", link: "#" },
    { icon: <FaLinkedin />, tooltip: "Connect on LinkedIn", link: "#" },
  ];

  return (
    <Box component="section" className="about-section" id="about">
      <Container>
        <Grid container spacing={4} alignItems="center" ref={ref}>
          <div className="about-content">
            <Grid item xs={12} md={4}>
              <motion.div
                className="coach-image"
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <img src={coachImage} alt="Oleksandra Guerenko - Tennis Coach" />
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <Typography variant="h3" gutterBottom>
                  About Me
                </Typography>
                <Typography variant="body1" paragraph>
                  With over a decade of experience in tennis coaching, I've helped hundreds of students improve their game and achieve their goals. My approach combines technical expertise with personalized attention to help you reach your full potential on the court.
                </Typography>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={2}>
              <motion.div
                className="social-links-container"
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <Box className="social-links">
                  {socialLinks.map((social, index) => (
                    <Tooltip key={index} title={social.tooltip}>
                      <IconButton
                        component="a"
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.icon}
                      </IconButton>
                    </Tooltip>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </div>

          <Grid item xs={12}>
            <Box className="achievements">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="achievement-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="achievement-icon">{achievement.icon}</div>
                  <Typography variant="h6">{achievement.title}</Typography>
                </motion.div>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;