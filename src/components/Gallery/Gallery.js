import React, { useState } from 'react';
import { Box, Container, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import './Gallery.css';

const images = [
  {
    img: '/gallery/tennis.png',
    title: 'Tennis Ball',
  },
];

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const handleOpen = (idx) => {
    setCurrent(idx);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box component="section" className="gallery-section" id="gallery">
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            component="h2"
            className="section-title"
            gutterBottom
            align="center"
          >
            Gallery
          </Typography>
          <Typography
            variant="subtitle1"
            className="section-subtitle"
            gutterBottom
            align="center"
          >
            Moments from coaching sessions and tournaments
          </Typography>
          <Box className="gallery-lightbox-grid">
            {images.map((item, idx) => (
              <Box
                key={item.img}
                className="gallery-lightbox-thumb"
                onClick={() => handleOpen(idx)}
                tabIndex={0}
                role="button"
                aria-label={`Open ${item.title}`}
                component={motion.div}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src={item.img} alt={item.title} className="gallery-image" />
                <div className="image-overlay">
                  <Typography variant="subtitle1" className="image-title">
                    {item.title}
                  </Typography>
                </div>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        PaperProps={{
          style: { background: 'rgba(0,0,0,0.95)', boxShadow: 'none' },
        }}
        className="gallery-lightbox-dialog"
      >
        <DialogContent
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: 0,
            minHeight: 400,
          }}
          onClick={handleClose}
        >
          <IconButton
            className="gallery-lightbox-arrow"
            onClick={handlePrev}
            style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#fff', zIndex: 2 }}
            aria-label="Previous"
          >
            <ArrowBackIos />
          </IconButton>
          <img
            src={images[current].img}
            alt={images[current].title}
            className="gallery-lightbox-image"
            style={{ maxHeight: '70vh', maxWidth: '80vw', borderRadius: 8 }}
          />
          <IconButton
            className="gallery-lightbox-arrow"
            onClick={handleNext}
            style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#fff', zIndex: 2 }}
            aria-label="Next"
          >
            <ArrowForwardIos />
          </IconButton>
          <IconButton
            className="gallery-lightbox-close"
            onClick={handleClose}
            style={{ position: 'absolute', top: 8, right: 8, color: '#fff', zIndex: 3 }}
            aria-label="Close"
          >
            <Close />
          </IconButton>
          <Typography
            variant="h6"
            style={{
              position: 'absolute',
              bottom: 16,
              left: 0,
              right: 0,
              textAlign: 'center',
              color: '#fff',
              textShadow: '0 2px 8px #000',
              zIndex: 2,
            }}
          >
            {images[current].title}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Gallery;