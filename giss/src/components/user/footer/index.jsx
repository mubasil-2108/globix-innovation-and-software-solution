import React from 'react';
import { Box, Typography, Container, Grid, Link, useTheme, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Facebook, Twitter, LinkedIn, GitHub } from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Box
      ref={ref}
      component="footer"
      sx={{
        py: 6,
        bgcolor: theme.palette.grey[900],
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography variant="h5" component="h3" gutterBottom>
                TechSolutions Inc.
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Transforming ideas into digital reality through innovative software solutions.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {[Facebook, Twitter, LinkedIn, GitHub].map((Icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon
                      sx={{
                        fontSize: 28,
                        color: 'white',
                        '&:hover': {
                          color: theme.palette.primary.main,
                        },
                        transition: 'color 0.3s ease',
                      }}
                    />
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={6} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h6" component="h3" gutterBottom>
                Company
              </Typography>
              {['About Us', 'Careers', 'Blog', 'Press'].map((item) => (
                <Typography key={item} variant="body2" component="div" sx={{ mb: 1 }}>
                  <Link href="#" color="inherit" underline="hover">
                    {item}
                  </Link>
                </Typography>
              ))}
            </motion.div>
          </Grid>
          <Grid item xs={6} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Typography variant="h6" component="h3" gutterBottom>
                Services
              </Typography>
              {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Cloud Solutions'].map((item) => (
                <Typography key={item} variant="body2" component="div" sx={{ mb: 1 }}>
                  <Link href="#" color="inherit" underline="hover">
                    {item}
                  </Link>
                </Typography>
              ))}
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Typography variant="h6" component="h3" gutterBottom>
                Newsletter
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Subscribe to our newsletter for the latest updates.
              </Typography>
              <Box component="form" sx={{ display: 'flex' }}>
                <TextField
                  variant="outlined"
                  placeholder="Your email"
                  size="small"
                  sx={{
                    flexGrow: 1,
                    bgcolor: 'background.paper',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(255,255,255,0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255,255,255,0.4)',
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ ml: 1 }}
                >
                  Subscribe
                </Button>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Typography variant="body2">
              © {new Date().getFullYear()} TechSolutions Inc. All rights reserved.
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;