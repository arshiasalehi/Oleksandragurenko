import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import './Hero.css';

const Hero = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const canvasRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const paddleWidth = 10;
  const paddleHeight = 100;
  const ballSize = 40;

  useEffect(() => {
    if (!gameStarted) return;
    let rotation = 0;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const ballImage = new Image();
    ballImage.src = '/tennis.png';

    const paddleImage = new Image();
    paddleImage.src = '/tennis.png';

    let paddlePos = isMobile
      ? canvas.width / 2 - paddleHeight / 2 // horizontal paddle (X)
      : canvas.height / 2 - paddleHeight / 2; // vertical paddle (Y)

    let paddleY = isMobile
      ? canvas.height - paddleWidth - 20 // bottom on mobile
      : null;

    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSpeedX = 8;
    let ballSpeedY = 8;

    const handleMouseMove = (e) => {
      const bounds = canvas.getBoundingClientRect();
      const newPos = isMobile
        ? e.clientX - bounds.left - paddleHeight / 2
        : e.clientY - bounds.top - paddleHeight / 2;

      paddlePos = Math.max(
        0,
        Math.min(
          (isMobile ? canvas.width : canvas.height) - paddleHeight,
          newPos
        )
      );
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      const bounds = canvas.getBoundingClientRect();
      const newPos = isMobile
        ? touch.clientX - bounds.left - paddleHeight / 2
        : touch.clientY - bounds.top - paddleHeight / 2;

      paddlePos = Math.max(
        0,
        Math.min(
          (isMobile ? canvas.width : canvas.height) - paddleHeight,
          newPos
        )
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw paddle
      if (paddleImage.complete && paddleImage.naturalWidth > 0) {
        if (isMobile) {
          ctx.drawImage(paddleImage, paddlePos, paddleY, paddleHeight, paddleWidth);
        } else {
          ctx.drawImage(paddleImage, 20, paddlePos, paddleWidth, paddleHeight);
        }
      } else {
        ctx.fillStyle = 'white';
        if (isMobile) {
          ctx.fillRect(paddlePos, paddleY, paddleHeight, paddleWidth);
        } else {
          ctx.fillRect(20, paddlePos, paddleWidth, paddleHeight);
        }
      }

      // Draw ball (rotating)
      if (ballImage.complete && ballImage.naturalWidth > 0) {
        ctx.save();
        ctx.translate(ballX, ballY);
        ctx.rotate(rotation);
        ctx.drawImage(
          ballImage,
          -ballSize / 2,
          -ballSize / 2,
          ballSize,
          ballSize
        );
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
      }
    };

    const update = () => {
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Bounce off canvas edges
      if (ballY - ballSize / 2 <= 0 || ballY + ballSize / 2 >= canvas.height) {
        ballSpeedY *= -1;
      }
      if (ballX - ballSize / 2 <= 0 || ballX + ballSize / 2 >= canvas.width) {
        ballSpeedX *= -1;
      }

      // Collision: desktop vertical paddle
      if (!isMobile) {
        if (
          ballX - ballSize / 2 <= 20 + paddleWidth &&
          ballY + ballSize / 2 >= paddlePos &&
          ballY - ballSize / 2 <= paddlePos + paddleHeight
        ) {
          ballSpeedX *= -1;
          ballX = 20 + paddleWidth + ballSize / 2;
        }
      }

      // Collision: mobile bottom horizontal paddle
      if (isMobile) {
        if (
          ballY + ballSize / 2 >= paddleY &&
          ballX + ballSize / 2 >= paddlePos &&
          ballX - ballSize / 2 <= paddlePos + paddleHeight
        ) {
          ballSpeedY *= -1;
          ballY = paddleY - ballSize / 2;
        }
      }

      rotation += 0.05;
    };

    const gameLoop = () => {
      update();
      draw();
      requestAnimationFrame(gameLoop);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);
    gameLoop();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [gameStarted, isMobile]);

  const ballVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'linear',
        repeatType: 'loop'
      }
    }
  };

  if (gameStarted) {
    return (
      <Box className={`pong-container ${isMobile ? 'mobile' : ''}`}>
        <canvas
          ref={canvasRef}
          width={isMobile ? 500 : 800}
          height={isMobile ? 800 : 500}
          className="pong-canvas"
        />
      </Box>
    );
  }

  return (
    <Box className="hero-container">
      <div className={`background-image ${isMobile ? 'mobile' : ''}`} />
      <Box className="hero-content">
        <motion.div
          className={`text-container ${isMobile ? 'mobile' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" className="hero-text left">
            Tennis with
          </Typography>

          <motion.div
            className="tennis-ball"
            animate="animate"
            variants={ballVariants}
            onClick={() => setGameStarted(true)}
          />

          <Typography variant="h2" className="hero-text right">
            Oleksandra
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Hero;