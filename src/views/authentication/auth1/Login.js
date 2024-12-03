

import { Grid, Box, Card, } from '@mui/material';

// components
import PageContainer from 'src/components/container/PageContainer';
import AuthLogin from '../authForms/AuthLogin';
import MyLogo from 'src/assets/images/logos/logo_gamestech.png';

const Login2 = () => {
  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '450px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Box display="flex" alignItems="center" justifyContent="center">
                  <img src={MyLogo} alt="My Logo" style={{ maxWidth: '150px' }} />
                </Box>

              </Box>
              <AuthLogin

              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
