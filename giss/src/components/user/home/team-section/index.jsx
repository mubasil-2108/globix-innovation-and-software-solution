import React from 'react';
import { Box, Typography, Container, Grid, Avatar, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const teamMembers = [
  {
    name: 'Alex Johnson',
    role: 'CEO & Founder',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Visionary leader with 15+ years in software development',
  },
  {
    name: 'Sarah Williams',
    role: 'CTO',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Technology expert specializing in scalable architectures',
  },
  {
    name: 'Michael Chen',
    role: 'Lead Developer',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    bio: 'Full-stack developer with passion for clean code',
  },
  {
    name: 'Emily Davis',
    role: 'UX Designer',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
    bio: 'Creates intuitive and beautiful user experiences',
  },
];

const TeamSection = () => {
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
            Meet Our Team
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={member.name}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3,
                  }}
                >
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{
                      width: 150,
                      height: 150,
                      mb: 3,
                      border: `4px solid ${theme.palette.primary.main}`,
                    }}
                  />
                  <Typography variant="h5" color='#fff' component="h3" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    {member.role}
                  </Typography>
                  <Typography variant="body1" color="secondary">
                    {member.bio}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TeamSection;