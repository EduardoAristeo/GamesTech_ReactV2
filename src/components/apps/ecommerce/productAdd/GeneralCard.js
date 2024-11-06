// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Typography, Grid, TextField } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';

const GeneralCard = ({ value, onChange }) => {
  return (
    <Box p={3}>
      <Typography variant="h5">Datos del producto nuevo</Typography>

      <Grid container mt={3}>
        {/* Campo de Nombre */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="product" sx={{ mt: 0 }}>
            Nombre{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="product"
            placeholder="Nombre del producto"
            fullWidth
            variant="outlined"
            value={value.product} // Asignar el valor del estado
            onChange={(e) => onChange('product', e.target.value)} // Captura el cambio en el campo de texto
          />
          <Typography variant="body2">
            El nombre que ingreses será el que aparezca en tickets e inventario.
          </Typography>
        </Grid>

        {/* Campo de Descripción */}
        <Grid item xs={12} display="flex" alignItems="center" mt={3}>
          <CustomFormLabel htmlFor="description">Descripción</CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            placeholder="Descripción del producto"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={value.description} // Asignar el valor del estado
            onChange={(e) => onChange('description', e.target.value)} // Captura el cambio en el campo de texto
          />
          <Typography variant="body2">
            Coloca una breve descripción del producto.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

GeneralCard.propTypes = {
  value: PropTypes.shape({
    product: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GeneralCard;
