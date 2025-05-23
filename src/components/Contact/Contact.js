import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import './Contact.css';

const Contact = () => {
  const [state, handleSubmit] = useForm("mjkwdknw"); 
  const [errors, setErrors] = useState({});

  const [fields, setFields] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const validate = () => {
    const newErrors = {};
    if (!fields.name.trim()) newErrors.name = "Name is required.";
    if (!fields.email.trim()) newErrors.email = "Email is required.";
    if (!fields.subject.trim()) newErrors.subject = "Subject is required.";
    if (!fields.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit(e);
    }
  };

  if (state.succeeded) {
    return (
      <Box component="section" className="contact-section" id="contact">
        <Container>
          <Box className="success-message">
            <Typography variant="h4" align="center">
              Thanks for your message!
            </Typography>
            <Typography variant="body1" align="center">
              I'll get back to you soon.
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box component="section" className="contact-section" id="contact">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" align="center" gutterBottom>
            Contact Me
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Have a question? Send me a message and I'll get back to you soon.
          </Typography>

          <Box
            component="form"
            onSubmit={onSubmit}
            className="contact-form"
            noValidate
          >
            <TextField
              id="name"
              name="name"
              label="What's your name?"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={fields.name}
              onChange={onChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <ValidationError 
              prefix="Name" 
              field="name"
              errors={state.errors}
            />

            <TextField
              id="email"
              name="email"
              label="What's your email address?"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              type="email"
              value={fields.email}
              onChange={onChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <ValidationError 
              prefix="Email" 
              field="email"
              errors={state.errors}
            />

            <TextField
              id="subject"
              name="subject"
              label="What's this about?"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={fields.subject}
              onChange={onChange}
              error={!!errors.subject}
              helperText={errors.subject}
            />
            <ValidationError 
              prefix="Subject" 
              field="subject"
              errors={state.errors}
            />

            <TextField
              id="message"
              name="message"
              label="Your message"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              multiline
              rows={4}
              value={fields.message}
              onChange={onChange}
              error={!!errors.message}
              helperText={errors.message}
            />
            <ValidationError 
              prefix="Message" 
              field="message"
              errors={state.errors}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={state.submitting}
              className="submit-button"
            >
              Send Message
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact;