import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { Parallax } from 'react-scroll-parallax';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const RotatingMessages = () => {
  const messages = [
    "Empowering Digital Futures",
    "Innovate. Build. Scale.",
    "Crafting Tomorrow's Tech Today",
    "Your Vision, Our Code",
    "Smart Software, Real Results"
  ];
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const CYCLE_TIME = 5000;
  const ANIMATION_DURATION = 1.5;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, CYCLE_TIME);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <Box
      sx={{
        perspective: '1200px',
        height: { xs: '60px', sm: '80px' },
        width: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <AnimatePresence mode='popLayout'>
        <motion.div
          key={currentIndex}
          initial={{ rotateX: 90, opacity: 0, y: 40, filter: 'blur(2px)' }}
          animate={{ rotateX: 0, opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ rotateX: -90, opacity: 0, y: -40, filter: 'blur(2px)' }}
          transition={{ duration: ANIMATION_DURATION, ease: [0.33, 1, 0.68, 1] }}
          style={{
            position: 'absolute',
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d',
            width: '100%'
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2.2rem' },
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {messages[currentIndex]}
            </Typography>
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

const HeroSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <Box
      ref={ref}
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, rgb(0, 0, 0) 0%, rgba(168, 166, 166, 0.32) 100%)`,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Parallax
        y={[-20, 20]}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.2,
            zIndex: 0,
          }}
          alt="background"
        />
      </Parallax>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', py: { xs: 6, sm: 10 } }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' } }}
            >
              Globix Innovation & Software Solutions
            </Typography>

            <RotatingMessages />

            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{
                mb: 4,
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
                px: { xs: 2, sm: 6 },
              }}
            >
              We build digital solutions that transform businesses
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                px: 4,
                py: 2,
                fontSize: { xs: '0.9rem', sm: '1.1rem' },
                borderRadius: '50px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 25px rgba(0,0,0,0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
