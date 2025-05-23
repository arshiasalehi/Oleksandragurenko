import React from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './FAQ.css';

const FAQ = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faqs = [
    {
      question: "How can I book a session?",
      answer: "You can book a session using our online booking system. Simply navigate to the Booking section, select your preferred date and time, and follow the instructions to complete your booking."
    },
    {
      question: "Do I need to bring my own racket?",
      answer: "Yes, it's recommended to bring your own tennis racket. However, we do have loaner rackets available if needed - just let us know in advance."
    },
    {
      question: "What's the cancellation policy?",
      answer: "We require at least 24 hours notice for cancellations. This allows us to accommodate other students who might be waiting for an available slot."
    },
    {
      question: "Where are lessons held?",
      answer: "Lessons are held at SANISports Montreal. The exact address and court details will be provided after your booking is confirmed."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Box component="section" className="faq-section" id="faq">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" align="center" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Find answers to common questions about tennis lessons and booking.
          </Typography>

          <motion.div
            className="faq-container"
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Typography variant="h6">{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default FAQ; 