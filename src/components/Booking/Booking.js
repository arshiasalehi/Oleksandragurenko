import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, TextField, Grid } from '@mui/material';
import Calendar from 'react-calendar';
import { motion } from 'framer-motion';
import 'react-calendar/dist/Calendar.css';
import './Booking.css';
import { useForm } from '@formspree/react';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Booking = () => {
  const [date, setDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [showHours, setShowHours] = useState(false);
  const [state, handleSubmit] = useForm("xanozpbq");

  const [membershipType, setMembershipType] = useState(localStorage.getItem('membershipType') || 'private');
  const [selectedPlan, setSelectedPlan] = useState(localStorage.getItem('selectedPlan') || '1 Session');

  useEffect(() => {
    const interval = setInterval(() => {
      setMembershipType(localStorage.getItem('membershipType') || 'private');
      setSelectedPlan(localStorage.getItem('selectedPlan') || '1 Session');
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const [availability, setAvailability] = useState({});

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const ref = doc(db, 'config', 'availability');
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          setAvailability(snapshot.data());
        }
      } catch (err) {
        console.error("Failed to load availability from Firebase:", err);
      }
    };
    fetchAvailability();
  }, []);

  const selectedDay = date ? new Date(date).toLocaleDateString('en-US', { weekday: 'long' }) : null;
  const availableHours = selectedDay ? availability[selectedDay] || [] : [];

  if (state.succeeded) {
    return (
      <Box component="section" className="booking-section" id="booking">
        <Container>
          <Box className="success-message">
            <Typography variant="h4" align="center" gutterBottom>
              Thanks for your booking request!
            </Typography>
            <Typography variant="body1" align="center">
              We'll contact you soon to confirm the session.
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box component="section" className="booking-section" id="booking">
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          Book a Session
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Select your date and time, then fill out the form to request a lesson.
        </Typography>

        <Box className="booking-grid">
          {/* Left side: Calendar or Hour Picker */}
          <Box className="left-pane">
            {!showHours ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Calendar
                  onChange={(d) => {
                    setDate(d);
                    setShowHours(true);
                  }}
                  value={date}
                  minDate={new Date()}
                  className="custom-calendar"
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Button variant="outlined" onClick={() => setShowHours(false)} className="back-button">
                  ← Back to Calendar
                </Button>
                <Typography variant="h6" gutterBottom>Select a time</Typography>
                <Box className="hours-grid">
                  {availableHours.map((hour) => (
                    <Button
                      key={hour}
                      variant={selectedHour === hour ? 'contained' : 'outlined'}
                      onClick={() => setSelectedHour(hour)}
                      className="hour-button"
                    >
                      {hour}
                    </Button>
                  ))}
                </Box>
              </motion.div>
            )}
          </Box>

          {/* Right side: Form */}
          <Box className="right-pane">
            <form onSubmit={(e) => {
              if (!date || !selectedHour) {
                e.preventDefault();
                alert('Please select a date and time before submitting.');
                return;
              }
              handleSubmit(e);
            }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">Your Info</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Name" name="name" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email" name="email" type="email" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Phone Number" name="phone" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Age" name="age" type="number" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Level" name="level" placeholder="Beginner / Intermediate / Advanced" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="City" name="city" required />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="description"
                    multiline
                    rows={4}
                    placeholder="Any details you want to share..."
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    <strong>Date:</strong> {date?.toDateString() || 'Not selected'}<br />
                    <strong>Hour:</strong> {selectedHour || 'Not selected'}<br />
                    <strong>Plan:</strong> {selectedPlan}<br />
                    <strong>Type:</strong> {membershipType}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <input type="hidden" name="selectedDate" value={date?.toDateString() || ''} />
                  <input type="hidden" name="selectedHour" value={selectedHour || ''} />
                  <input type="hidden" name="membershipType" value={membershipType} />
                  <input type="hidden" name="selectedPlan" value={selectedPlan} />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!date || !selectedHour || state.submitting}
                    fullWidth
                  >
                    Request Booking
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Booking;