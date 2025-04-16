import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import notFoundPage from '../../components/assets/svg/404_error.svg';

const NotFoundPage = () => {
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
          src={notFoundPage}
          alt="404 illustration"
          sx={{ width: '100%', maxWidth: 500, maxHeight: 300, height: 'auto', mb: 4 }}
        />
        
        <Typography variant="h4" component="h1" gutterBottom>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
          We couldn't find the page you're looking for. It might have been moved or doesn't exist anymore.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/"
            size="large"
          >
            Go to Homepage
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFoundPage;