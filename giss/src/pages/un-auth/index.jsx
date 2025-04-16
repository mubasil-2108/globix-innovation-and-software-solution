import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import unauthorizedImage from '../../components/assets/svg/401_unauthorized.svg'; // Custom SVG

const UnauthorizedPage = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
          p: 3,
        }}
      >
        <Box
          component="img"
          src={unauthorizedImage}
          alt="Unauthorized illustration"
          sx={{ width: '100%', maxWidth: 400, height: 'auto', mb: 4 }}
        />
        
        <Typography variant="h4" component="h1" gutterBottom>
          Access Denied
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
          You need proper permissions to view this page. Please contact your administrator or log in.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/auth/login"
            size="large"
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UnauthorizedPage;