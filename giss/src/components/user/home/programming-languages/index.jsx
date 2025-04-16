import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ProgrammingLanguages = () => {
  const theme = useTheme();
  
  const languages = [
    'JavaScript', 'React Native', 'React', 'Next.js', 'Vue', 
    'Flutter','Node.js', 'Dart', 'ECMAScript 6', 'Express.js', 'MongoDB', 'Firebase'
  ];

  return (
    <Box sx={{
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      my: 8,
    //   py: 3,
      backgroundColor: `linear-gradient(135deg, rgb(0, 0, 0) 0%, rgba(168, 166, 166, 0.32) 100%)`,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '50px',
        zIndex: 2,
      },
      '&:before': {
        left: 0,
        background: `linear-gradient(to right, rgb(0, 0, 0), transparent)`,
      },
      '&:after': {
        right: 0,
        background: `linear-gradient(to left, rgb(0, 0, 0), transparent)`,
      }
    }}>
      <Box sx={{
        display: 'flex',
        width: 'fit-content',
        animation: 'scroll 20s linear infinite',
        '@keyframes scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: `translateX(calc(-100% / 2))` },
        }
      }}>
        {[...languages, ...languages].map((lang, index) => (
          <Box 
            key={`${lang}-${index}`}
            sx={{
              px: 4,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography 
              variant="h6" 
              sx={{
                whiteSpace: 'nowrap',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: { xs: '1rem', md: '1.25rem', lg: '2rem' },
              }}
            >
              {lang}
            </Typography>
            {index < languages.length * 2 - 1 && (
              <Box sx={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                backgroundColor: theme.palette.primary.main,
                mx: 2,
              }} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProgrammingLanguages;