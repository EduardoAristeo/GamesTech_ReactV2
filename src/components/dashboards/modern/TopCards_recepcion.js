// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Box, CardContent, Grid, Typography } from '@mui/material';

import icon2 from '../../../assets/images/iconos/smartphone.png';
import icon3 from '../../../assets/images/iconos/case.png';
import icon4 from '../../../assets/images/iconos/store.png';
import icon5 from '../../../assets/images/iconos/fix.png';
import icon6 from '../../../assets/images/iconos/fix_done.png';
import icon7 from '../../../assets/images/iconos/fix_garantia.png';

const topcards = [
  {
    icon: icon2,
    title: 'Dsipositivos Ingresados',
    digits: '96',
    bgcolor: 'primary',
  },
  {
    icon: icon3,
    title: 'Accesorios vendidos',
    digits: '3,650',
    bgcolor: 'secondary',
  },
  {
    icon: icon4,
    title: 'Dispositivos vendidos',
    digits: '356',
    bgcolor: 'warning',
  },
  {
    icon: icon5,
    title: 'Dispositivos en reparación',
    digits: '696',
    bgcolor: 'primary',
  },
  {
    icon: icon6,
    title: 'Dispositivos listos para entrega',
    digits: '76',
    bgcolor: 'success',
  },
  {
    icon: icon7,
    title: 'Garantías pendientes',
    digits: '59',
    bgcolor: 'error',
  },
];

const TopCards = () => {
  return (
    <Grid container spacing={3}>
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={4} lg={2} key={i}>
          <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center">
            <CardContent>
              <img src={topcard.icon} alt={topcard.icon} width="50" />
              <Typography
                color={topcard.bgcolor + '.main'}
                mt={1}
                variant="subtitle1"
                fontWeight={600}
              >
                {topcard.title}
              </Typography>
              <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
