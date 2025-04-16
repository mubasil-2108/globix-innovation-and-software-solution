import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

const FloatingLanguages = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const languages = [
    'JavaScript', 'React', 'Nextjs', 'Vue', 
    'Flutter', 'Nodejs', 'Dart', 'es6', 'Expressjs', 'MongoDB', 'Firebase'
  ];

  const instancesPerLogo = isSm ? 2 : isMd ? 3 : 4;

  const backgroundImage = 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const getLogoPath = (lang) => {
    const formattedLang = lang.toLowerCase()
      .replace('.js', '')
      .replace(' ', '-')
      .replace('native', '');
    return `/logos/${formattedLang}.svg`;
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '400px', sm: '500px', md: '600px' },
        overflow: 'hidden',
        my: 10,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 0,
        }
      }}
    >
      {languages.flatMap((lang) =>
        Array.from({ length: instancesPerLogo }).map((_, instanceIndex) => {
          const key = `${lang}-${instanceIndex}`;
          const left = Math.random() * 100;
          const initialTop = -100 - (Math.random() * 200);
          const duration = 25 + (Math.random() * 20);
          const delay = Math.random() * 20;
          const opacity = 0.6 + (Math.random() * 0.4);
          const size = isSm
            ? 30 + (Math.random() * 30)
            : isMd
            ? 40 + (Math.random() * 40)
            : 50 + (Math.random() * 50);
          const rotateDirection = Math.random() > 0.5 ? 360 : -360;

          return (
            <Box
              key={key}
              sx={{
                position: 'absolute',
                left: `${left}%`,
                top: `${initialTop}px`,
                animation: `float ${duration}s linear ${delay}s infinite`,
                opacity: opacity,
                zIndex: 1,
                '&:hover': {
                  opacity: 1,
                  animationPlayState: 'paused',
                  transform: 'scale(1.2)',
                }
              }}
              style={{
                animationName: `float-${rotateDirection}`,
              }}
            >
              <Parallax speed={-10 + (Math.random() * 20)}>
                <Box
                  component="img"
                  src={getLogoPath(lang)}
                  alt={lang}
                  sx={{
                    height: `${size}px`,
                    width: 'auto',
                    filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.7))',
                    transition: 'all 0.3s ease',
                  }}
                />
              </Parallax>
            </Box>
          );
        })
      )}

      {/* Overlay Text */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2,
          color: 'white',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Typography
          variant='h2'
          sx={{
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          Our Technology Stack
        </Typography>
        <Typography
          variant='body1'
          sx={{
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
            maxWidth: '600px',
          }}
        >
          We work with the latest technologies to deliver outstanding results
        </Typography>
      </Box>

      {/* CSS Keyframes */}
      <style jsx global>{`
        @keyframes float-360 {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(120vh) rotate(360deg);
          }
        }
        @keyframes float--360 {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(120vh) rotate(-360deg);
          }
        }
      `}</style>
    </Box>
  );
};

export default FloatingLanguages;
