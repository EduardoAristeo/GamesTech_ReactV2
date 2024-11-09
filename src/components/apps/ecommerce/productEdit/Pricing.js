
import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';


const PricingCard = () => {


  return (
    <Box p={3}>
      <Typography variant="h5" mb={3}>
        Precios y Costos
      </Typography>

      <Grid container spacing={3}>
        {/* 1 */}
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="p_price" sx={{ mt: 0 }}>
            Costo{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
          <CustomTextField id="p_price" placeholder="Product Price" value="199.99" fullWidth />
          <Typography variant="body2">Set the product price.</Typography>
        </Grid>
        {/* 1 */}
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="p_price" sx={{ mt: 0 }}>
            Descuento{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
          <CustomTextField id="p_price" placeholder="Product Price" value="199.99" fullWidth />
          <Typography variant="body2">Set the product price.</Typography>
        </Grid>
        {/* 1 */}
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="p_price" sx={{ mt: 0 }}>
            Precio{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
          <CustomTextField id="p_price" placeholder="Product Price" value="199.99" fullWidth />
          <Typography variant="body2">Set the product price.</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PricingCard;
