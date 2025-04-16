import React from 'react';
import { Box, Typography, Container, Grid, useTheme, Avatar, Paper,} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutUsPage = () => {
    const theme = useTheme();

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const [ref1, inView1] = useInView({ threshold: 0.1, triggerOnce: true });
    const [ref2, inView2] = useInView({ threshold: 0.1, triggerOnce: true });
    const [ref3, inView3] = useInView({ threshold: 0.1, triggerOnce: true });
    const [ref4, inView4] = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <Box sx={{ py: 8, bgcolor: '#000' }}>
            <Container maxWidth="lg">
                {/* Hero Section */}
                <Grid container spacing={4} alignItems="center" sx={{ mb: 8 }}>
                    <Grid item xs={12} md={6}>
                        <motion.div
                            ref={ref1}
                            initial="hidden"
                            animate={inView1 ? "visible" : "hidden"}
                            variants={fadeIn}
                        >
                            <Typography
                                variant="h3"
                                component="h1"
                                gutterBottom
                                sx={{
                                    fontWeight: 700,
                                    color: theme.palette.primary.main
                                }}
                            >
                                About Globix Innovation & Software Solutions
                            </Typography>
                            {/* <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.text.primary
                }}
              >
                
              </Typography> */}
                            <Typography
                                variant="body1"
                                paragraph
                                color='#fff'
                                sx={{ fontSize: '1.1rem' }}
                            >
                                Empowering businesses through cutting-edge technology solutions and innovative software development.
                            </Typography>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <motion.div
                            ref={ref2}
                            initial="hidden"
                            animate={inView2 ? "visible" : "hidden"}
                            variants={fadeIn}

                            transition={{ delay: 0.2 }}
                        >
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                alt="Globix team working"
                                sx={{
                                      width: '100%',
                                    borderRadius: 2,
                                    boxShadow: 6,
                                }}
                            />
                        </motion.div>
                    </Grid>
                </Grid>

                {/* Our Story Section */}
                <Box sx={{ mb: 8 }}>
                    <motion.div
                        ref={ref3}
                        initial="hidden"
                        animate={inView3 ? "visible" : "hidden"}
                        variants={fadeIn}
                    >
                        <Typography
                            variant="h3"
                            component="h2"
                            gutterBottom
                            sx={{
                                fontWeight: 600,
                                textAlign: 'center',
                                mb: 6,
                                color: theme.palette.primary.main
                            }}
                        >
                            Our Story
                        </Typography>

                        <Grid container spacing={4} >
                            <Grid item xs={12} md={6}>
                                <Paper elevation={3} sx={{
                                    p: 4,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                                }}>
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                                        Founded in 2015
                                    </Typography>
                                    <Typography variant="body1" color='#fff' paragraph>
                                        Globix Innovation & Software Solutions began as a small team of passionate developers with a vision to transform businesses through technology. What started as a modest startup has now grown into a leading software solutions provider.
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper elevation={3} sx={{
                                    p: 4,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                }}>
                                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                                        Our Growth
                                    </Typography>
                                    <Typography variant="body1" color='#fff' paragraph>
                                        Over the years, we've expanded our services, built a diverse team of experts, and delivered successful projects for clients across multiple industries. Our commitment to quality and innovation remains unchanged.
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </motion.div>
                </Box>

                {/* Our Values Section */}
                <Box sx={{ mb: 8 }}>
                    <motion.div
                        ref={ref4}
                        initial="hidden"
                        animate={inView4 ? "visible" : "hidden"}
                        variants={fadeIn}
                    >
                        <Typography
                            variant="h3"
                            component="h2"
                            gutterBottom
                            sx={{
                                fontWeight: 600,
                                textAlign: 'center',
                                mb: 6,
                                color: theme.palette.primary.main
                            }}
                        >
                            Our Core Values
                        </Typography>

                        <Grid container justifyContent={"center"} spacing={4}>
                            {[
                                {
                                    title: "Innovation",
                                    description: "We constantly push boundaries to deliver cutting-edge solutions that drive business growth.",
                                    icon: "💡"
                                },
                                {
                                    title: "Excellence",
                                    description: "We strive for perfection in everything we do, ensuring top-quality deliverables for our clients.",
                                    icon: "🏆"
                                },
                                {
                                    title: "Integrity",
                                    description: "We maintain transparency and honesty in all our dealings with clients and team members.",
                                    icon: "🤝"
                                },
                                {
                                    title: "Collaboration",
                                    description: "We believe in teamwork and work closely with clients to understand their unique needs.",
                                    icon: "👥"
                                }
                            ].map((value, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={4} key={index}> {/* Changed md to 4 and added lg={4} */}
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Paper elevation={3} sx={{ p: 4, maxWidth: 400,
                                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                            height: '100%', textAlign: 'center', mx: 'auto' }}> {/* Added mx: 'auto' for better centering */}
                                            <Avatar sx={{
                                                bgcolor: theme.palette.primary.main,
                                                width: 60,
                                                height: 60,
                                                mb: 2,
                                                mx: 'auto',
                                                fontSize: '1.5rem'
                                            }}>
                                                {value.icon}
                                            </Avatar>
                                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                                {value.title}
                                            </Typography>
                                            <Typography variant="body2" color='#fff'>
                                                {value.description}
                                            </Typography>
                                        </Paper>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>
                </Box>

                {/* Team Section */}
                <Box>
                    <Typography
                        variant="h3"
                        component="h2"
                        gutterBottom
                        sx={{
                            fontWeight: 600,
                            textAlign: 'center',
                            mb: 6,
                            color: theme.palette.primary.main
                        }}
                    >
                        Meet Our Leadership
                    </Typography>

                    <Grid container spacing={4} justifyContent="center">
                        {[
                            {
                                name: "Alex Johnson",
                                role: "CEO & Founder",
                                bio: "Visionary leader with 15+ years in software development and business strategy.",
                                img: "https://randomuser.me/api/portraits/men/32.jpg"
                            },
                            {
                                name: "Sarah Chen",
                                role: "CTO",
                                bio: "Technology expert specializing in AI, cloud computing, and scalable architectures.",
                                img: "https://randomuser.me/api/portraits/women/44.jpg"
                            },
                            {
                                name: "Michael Rodriguez",
                                role: "Head of Product",
                                bio: "Product development specialist focused on user-centric design and innovation.",
                                img: "https://randomuser.me/api/portraits/men/75.jpg"
                            }
                        ].map((member, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={12} key={index}>
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Paper elevation={3} sx={{ p: 4, maxWidth: 400,
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                        height: '100%', textAlign: 'center' }}>
                                        <Avatar
                                            alt={member.name}
                                            src={member.img}
                                            sx={{
                                                width: 120,
                                                height: 120,
                                                mb: 3,
                                                mx: 'auto',
                                                border: `4px solid ${theme.palette.primary.main}`
                                            }}
                                        />
                                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                                            {member.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="rgb(49, 49, 49)" fontWeight={600} gutterBottom>
                                            {member.role}
                                        </Typography>
                                        <Typography variant="body2" color='#fff' > 
                                            {member.bio}
                                        </Typography>
                                    </Paper>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default AboutUsPage;