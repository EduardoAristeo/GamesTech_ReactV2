// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Typography, TextField, Grid } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';

const PricingCard = ({ value, onChange }) => {
  return (
    <Box p={3}>
      <Typography variant="h5" mb={3}>
        Precios y costos
      </Typography>

      <Grid container spacing={3}>
        {/* Campo de Costo */}
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="p_cost" sx={{ mt: 0 }}>
            Costo{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
          <TextField
            id="p_cost"
            placeholder="Costo del producto"
            fullWidth
            type="number"
            value={value.cost} // Usar el valor del estado
            onChange={(e) => onChange('cost', e.target.value)} // Captura el cambio en el campo de costo
            variant="outlined"
          />
          <Typography variant="body2">Cuanto le costó a la empresa</Typography>
        </Grid>

        {/* Campo de Descuento */}
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="p_discount" sx={{ mt: 0 }}>
            Descuento
          </CustomFormLabel>
          <TextField
            id="p_discount"
            placeholder="Descuento para el cliente"
            fullWidth
            type="number"
            value={value.discount} // Usar el valor del estado
            onChange={(e) => onChange('discount', e.target.value)} // Captura el cambio en el campo de descuento
            variant="outlined"
          />
            <Typography variant="body2">Descuento que se aplicará al precio</Typography>
          </Grid>

        

        {/* Campo de Precio */}
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="p_price" sx={{ mt: 0 }}>
            Precio{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
          <TextField
            id="p_price"
            placeholder="Precio para el cliente"
            fullWidth
            type="number"
            value={value.price} // Usar el valor del estado
            onChange={(e) => onChange('price', e.target.value)} // Captura el cambio en el campo de precio
            variant="outlined"
          />
          <Typography variant="body2">Precio que aparecerá en tienda</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

// Agregar propTypes para validar las props
PricingCard.propTypes = {
  value: PropTypes.shape({
    cost: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PricingCard;
