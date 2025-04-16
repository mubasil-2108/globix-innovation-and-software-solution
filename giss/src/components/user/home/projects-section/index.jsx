import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Grid, useTheme, Card, CardMedia, CardContent, Divider, CardActions, IconButton, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-scroll-parallax';
import CountUp from 'react-countup';
import { Data } from '../../../../services';
import { FaAngleLeft, FaAngleRight, FaGithub, FaGlobe } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProjects } from '../../../../store/project-slice';

const companyStats = [
  { value: 250, label: 'Projects Completed', suffix: '+', duration: 3 },
  { value: 180, label: 'Satisfied Clients', suffix: '+', duration: 2.5 },
  { value: 8, label: 'Years Experience', suffix: '+', duration: 2 },
];

const AnimatedCounter = ({ value, suffix = '', duration = 2, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <Box component={'span'} ref={ref}>
      {inView ? (
        <CountUp
          start={0}
          end={value}
          duration={duration}
          delay={delay}
          suffix={suffix}
          decimals={0}
        />
      ) : (
        <span>0{suffix}</span>
      )}
    </Box>
  );
};

const ProjectsSection = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { projectList } = useSelector(state => state.adminProject)
  const [currentImageIndices, setCurrentImageIndices] = useState(projectList?.map(() => 0));
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const handleNextImage = (projectIndex) => {
    setCurrentImageIndices(prevIndices => {
      const newIndices = [...prevIndices];
      const project = Data.projects[projectIndex];
      newIndices[projectIndex] = (newIndices[projectIndex] + 1) % project.image.length;
      return newIndices;
    });
  };

  const handlePrevImage = (projectIndex) => {
    setCurrentImageIndices(prevIndices => {
      const newIndices = [...prevIndices];
      const project = Data.projects[projectIndex];
      newIndices[projectIndex] = (newIndices[projectIndex] - 1 + project.image.length) % project.image.length;
      return newIndices;
    });
  };
  const [expandedProjects, setExpandedProjects] = useState({});
  const toggleReadMore = (id) => {
    setExpandedProjects(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(async () => {
    await dispatch(fetchAllProjects());
  },[dispatch])

  return (
    <Box
      ref={ref}
      sx={{
        py: 10,
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#000',
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
            background: `linear-gradient(45deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
            opacity: 0.05,
            zIndex: 0,
          }}
        />
      </Parallax>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Box
            sx={{
              p: 4,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              mb: 6,
            }}
          >
            <Typography variant="h4" align="center" sx={{ mb: 4, color: '#fff' }}>
              Our Impact in Numbers
            </Typography>
            <Grid container justifyContent="space-between" spacing={3}>
              {companyStats.map((stat, index) => (
                <Grid item xs={6} sm={3} key={stat.label}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: 2,
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        color: theme.palette.secondary.main,
                        fontWeight: 'bold',
                        mb: 1,
                        fontFeatureSettings: '"tnum"',
                      }}
                    >
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        duration={stat.duration}
                        delay={index * 0.1}
                      />
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
        <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />

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
                bgcolor: theme.palette.secondary.main,
                borderRadius: 2,
              },
            }}
          >
            Featured Projects
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {projectList?.map((project, index) => (
            <Grid item xs={12} md={4} lg={1} key={project?._id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    maxWidth: 360,
                    display: 'flex',
                    flexDirection: 'column',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box sx={{
                    position: 'relative',
                    boxShadow: 1,
                  }}>
                    <CardMedia
                      component="img"
                      image={project.projectImage?.[currentImageIndices[index]] || './assets/defaultImage.jpg'}
                      alt={project.title}
                      sx={{
                        height: 200,
                        width: 360,
                        objectFit: 'cover',
                      }}
                    />
                    {
                      project?.projectImage && project?.projectImage?.length > 1 && (
                        <>
                          <IconButton
                            sx={{ position: 'absolute', top: '50%', left: 5, transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.7)', ":hover": { backgroundColor: 'rgba(255, 255, 255, 0.9)' } }}
                            onClick={() => handlePrevImage(index)}
                          >
                            <FaAngleLeft />
                          </IconButton>
                          <IconButton
                            sx={{ position: 'absolute', top: '50%', right: 5, transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.7)', ":hover": { backgroundColor: 'rgba(255, 255, 255, 0.9)' } }}
                            onClick={() => handleNextImage(index)}
                          >
                            <FaAngleRight />
                          </IconButton>
                        </>
                      )
                    }
                  </Box>
                  <CardContent sx={{ flexGrow: 1, }}>
                    <Typography gutterBottom variant="h5" component="h3">
                      {project?.projectName}
                    </Typography>
                    <Box sx={{ maxHeight: 100, overflowY: expandedProjects[project._id] ? 'scroll': 'hidden'}}>
                    <Typography variant="body1" color="text.secondary" sx={{ fontSize:14, maxWidth: 250 }}>
                      {
                        expandedProjects[project._id]
                          ? project?.projectDescription
                          : `${project?.projectDescription?.slice(0, 100)}${project?.projectDescription?.length > 100 ? '...' : ''}`
                      }
                    </Typography>
                    </Box>
                    {project?.projectDescription?.length > 100 && (
                      <Typography
                        sx={{ cursor:'pointer', textAlign:'right', color: '#000', mb:2, fontSize: 12, fontWeight:'bold', alignItems:'flex-end', textTransform: 'none', px: 0 }}
                        onClick={() => toggleReadMore(project._id)}
                      >
                        {expandedProjects[project._id] ? 'Read Less' : 'Read More'}
                      </Typography>
                    )}
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {project?.projectTechnologies.map((tag) => (
                        <Chip
                          label={tag}
                          size="small"
                          sx={{ color: '#fff', backgroundColor: theme.palette.primary.main, fontSize: 12, fontWeight: 'bold' }}
                          variant="filled"
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end' }} disableSpacing>
                    <IconButton href={project?.gitHubUrl} aria-label='github' sx={{ color: '#000', "&:hover": { color: '#1b00ff99' } }}>
                      <FaGithub />
                    </IconButton>
                    <IconButton href={project?.websiteUrl} aria-label='website' sx={{ color: '#000', "&:hover": { color: '#1b00ff99' } }}>
                      <FaGlobe />
                    </IconButton>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProjectsSection;