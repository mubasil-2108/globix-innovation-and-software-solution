import React from 'react';
import { Box, Typography, Container, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skills = [
  { name: 'Web Development', icon: '🌐', description: 'Modern web applications with React, Next, and Vue' },
  { name: 'Mobile Apps', icon: '📱', description: 'Cross-platform mobile development with React Native and Flutter' },
  { name: 'Backend Development', icon: '⚙️', description: 'Robust backend solutions with Node.js and Express' },
];

const SkillCard = ({ skill, index, inView }) => {
  const theme = useTheme();
  
  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            p: 4,
            borderRadius: 2,
            boxShadow: 2,
            height: '100%',
            maxWidth: 360,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-10px)',
              boxShadow: 4,
            },
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            {skill.icon}
          </Typography>
          <Typography variant="h5" fontWeight='bold' component="h3" gutterBottom>
            {skill.name}
          </Typography>
          <Typography variant="body1" color="#fff">
            {skill.description}
          </Typography>
        </Box>
      </motion.div>
    </Grid>
  );
};

const SkillsSection = () => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <Box
      ref={ref}
      sx={{
        py: 10,
        bgcolor: '#000',
        position: 'relative',
        overflowY: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              mb: 6,
              color: '#fff',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                bgcolor: theme.palette.primary.main,
                borderRadius: 2,
              },
            }}
          >
            Our Expertise
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} inView={inView} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SkillsSection;