import React from 'react';
import { Box,} from '@mui/material';
import { ParallaxProvider } from 'react-scroll-parallax';
import { LandingPage } from '../../../components/user';

const Home = () => {
  // Scroll to top function
  
  return (
    <ParallaxProvider>
      <Box sx={{ overflowX: 'hidden'}}>
        <LandingPage.HeroSection />
        <LandingPage.SkillsSection />
        <LandingPage.ProgrammingLanguages />
        <LandingPage.ProjectsSection />
        <LandingPage.FloatingLanguages />
        <LandingPage.TeamSection />
        <LandingPage.ContactSection />
      </Box>
    </ParallaxProvider>
  )
}

export default Home