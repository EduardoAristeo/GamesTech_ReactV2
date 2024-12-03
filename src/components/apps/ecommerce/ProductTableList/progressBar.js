import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

const StockProgressBar = ({ stock }) => {
  const value = Math.min((stock / 50) * 100, 100); // Asegurar que no pase del 100%

  // Determinar el color según el rango de stock
  const getColor = (stock) => {
    if (stock > 40) return 'green'; // Mayor a 40 -> Verde
    if (stock > 20) return 'yellow'; // Entre 21 y 40 -> Amarillo
    if (stock > 10) return 'orange'; // Entre 11 y 20 -> Naranja
    return 'red'; // Menor o igual a 10 -> Rojo
  };

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
          '& .MuiLinearProgress-bar': {
            backgroundColor: getColor(stock), // Asignar el color dinámico
          },
        }}
      />
      <Typography
        variant="caption"
        sx={{ display: 'block', textAlign: 'center', mt: 0.5 }}
      >
        {stock} unidades
      </Typography>
    </Box>
  );
};

export default StockProgressBar;
