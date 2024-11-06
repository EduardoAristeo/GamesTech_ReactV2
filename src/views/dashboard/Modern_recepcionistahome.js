// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Box, Grid } from '@mui/material';
import TopCards from '../../components/dashboards/modern/TopCards_recepcion';
import Welcome from 'src/layouts/full/shared/welcome/Welcome';

const Modern = () => {
  return (
    <Box>
      <h1>Recepción</h1>
      <Grid container spacing={3}>
        {/* column */}
        <Grid item sm={12} lg={12}>
        <h2>Medidas</h2>
          <TopCards />
        </Grid>
       
        
      </Grid>
      {/* column */}
      <Welcome />
    </Box>
  );
};

export default Modern;
