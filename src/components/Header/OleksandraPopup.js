import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, Typography,
  IconButton, TextField, Button, Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../../firebase'; // ✅ must export both from firebase.js

const OleksandraPopup = ({ open, onClose }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [availability, setAvailability] = useState(null);
  const [error, setError] = useState('');

  const handleFirebaseLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAuthenticated(true);
      setError('');
    } catch (err) {
      setError('Login failed. Check your credentials.');
    }
  };

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const docRef = doc(db, 'config', 'availability');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAvailability(docSnap.data());
        } else {
          setAvailability({ error: 'No availability document found.' });
        }
      } catch (err) {
        setAvailability({ error: 'Failed to load availability from Firebase.' });
      }
    };

    if (authenticated) {
      fetchAvailability();
    }
  }, [authenticated]);

  const handleHoursChange = (day, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: value.split(',').map((h) => h.trim())
    }));
  };

  const handleSave = async () => {
    try {
      await setDoc(doc(db, 'config', 'availability'), availability);
      alert('Changes saved to Firebase.');
    } catch (err) {
      alert('Failed to save changes.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {authenticated ? 'Weekly Availability' : 'Admin Login'}
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {authenticated ? (
          availability ? (
            typeof availability.error === 'string' ? (
              <Typography color="error">{availability.error}</Typography>
            ) : (
              <Box component="form" display="flex" flexDirection="column" gap={2}>
                {Object.entries(availability).map(([day, hours]) => (
                  <TextField
                    key={day}
                    label={day}
                    fullWidth
                    value={hours.join(', ')}
                    onChange={(e) => handleHoursChange(day, e.target.value)}
                  />
                ))}
                <Button variant="contained" onClick={handleSave}>Save Changes</Button>
              </Box>
            )
          ) : (
            <Typography>Loading availability...</Typography>
          )
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error}
              helperText={error}
              fullWidth
            />
            <Button variant="contained" onClick={handleFirebaseLogin}>
              Log In
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OleksandraPopup;