import React from 'react';
import { Box, Typography, Container, Grid, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-scroll-parallax';

const ContactSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <Box
      ref={ref}
      sx={{
        py: 10,
        position: 'relative',
        overflow: 'hidden',
        color: 'white',
        background:  `linear-gradient(135deg, rgb(0, 0, 0) 0%, rgba(168, 166, 166, 0.32) 100%)`,
      }}
    >
      <Parallax y={[-20, 20]}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))',
            zIndex: 0,
          }}
        />
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
          alt="Contact background"
        />
      </Parallax>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
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
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                bgcolor: 'white',
                borderRadius: 2,
              },
            }}
          >
            Get In Touch
          </Typography>
        </motion.div>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h4" gutterBottom>
                Let's talk about your project
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                We're excited to hear about your ideas and help bring them to life. Contact us today
                to discuss how we can work together.
              </Typography>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Our Office
                </Typography>
                <Typography variant="body1">
                  123 Tech Street, Suite 456<br />
                  San Francisco, CA 94107<br />
                  United States
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Contact Info
                </Typography>
                <Typography variant="body1">
                  Email: info@softhouse.example<br />
                  Phone: +1 (555) 123-4567
                </Typography>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Box
                component="form"
                sx={{
                  bgcolor: 'background.paper',
                  p: 4,
                  borderRadius: 2,
                  boxShadow: 6,
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      variant="outlined"
                      type="email"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      fullWidth
                      sx={{
                        py: 1.5,
                        fontSize: '1.1rem',
                        borderRadius: '50px',
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactSection;