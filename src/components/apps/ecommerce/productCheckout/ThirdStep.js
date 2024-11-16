import React from 'react';
import { Box, Grid, Paper, Radio, Stack, Typography } from '@mui/material';
import payment from 'src/assets/images/products/payment-complete.gif';
import terminal from 'src/assets/images/iconos/terminal-bancaria.png';
import cash from 'src/assets/images/iconos/dinero.png';
import transfer from 'src/assets/images/iconos/transferencia-movil.png';

const Payment = [
  {
    value: 'efectivo',
    title: 'Pago con Efectivo',
    description: 'El cliente pagará en total en efectivo',
    icons: cash,
  },
  {
    value: 'tarjeta',
    title: 'Tarjeta Debito / Credito',
    description: 'El cliente pagará con tarjeta de débito o crédito',
    icons: terminal,
  },
  {
    value: 'transferencia',
    title: 'Transferencia Bancaria',
    description: 'El cliente pagará con transferencia bancaria',
    icons: transfer,
  },
];

const ThirdStep = ({ setPaymentMethod }) => {
  const [selectedPayment, setSelectedPayment] = React.useState('efectivo'); // Predeterminado: efectivo

  const handlePChange = (event) => {
    const value = event.target.value;
    setSelectedPayment(value);
    setPaymentMethod(value); // Actualizar el método de pago en el padre
  };

  return (
    <>
      {/* ------------------------------------------- */}
      {/* Payment Option */}
      {/* ------------------------------------------- */}
      <Paper variant="outlined" sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6">Método de pago</Typography>
        <Grid container spacing={3} alignItems="center">
          {/* Opciones de método de pago */}
          <Grid lg={8} xs={12} item>
            <Grid container spacing={3} mt={2}>
              {Payment.map((option) => (
                <Grid item lg={12} xs={12} key={option.value}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderColor: selectedPayment === option.value ? 'primary.main' : '',
                      backgroundColor: selectedPayment === option.value ? 'primary.light' : '',
                    }}
                  >
                    <Stack direction={'row'} alignItems="center" gap={1}>
                      <Radio
                        checked={selectedPayment === option.value}
                        onChange={handlePChange}
                        value={option.value}
                        name="radio-buttons"
                        inputProps={{ 'aria-label': option.title }}
                      />
                      <Box>
                        <Typography variant="h6">{option.title}</Typography>
                        <Typography variant="subtitle2">{option.description}</Typography>
                      </Box>
                      <Box ml="auto">
                        {option.icons ? <img src={option.icons} alt="payment" /> : ''}
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
          {/* Imagen del GIF */}
          <Grid lg={4} xs={12} item>
            <Box sx={{ width: { xs: '200px', sm: 'auto' } }}>
              <img src={payment} alt="payment" />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default ThirdStep;
