import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Typography, Grid } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';

const GeneralCard = ({ value, onChange }) => {
  return (
    <Box p={3}>
      <Typography variant="h5">Editar Producto</Typography>
      <Grid container mt={3}>
        {/* Nombre del Producto */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="product" sx={{ mt: 0 }}>
            Nombre del Producto{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id="product"
            placeholder="Nombre del Producto"
            value={value.product} // Usar el valor del estado del padre
            fullWidth
            onChange={(e) => onChange('product', e.target.value)} // Propagar el cambio al padre
          />
          <Typography variant="body2">
            Se recomienda que el nombre del producto sea único.
          </Typography>
        </Grid>

        {/* Descripción */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="description">Descripción</CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id="description"
            placeholder="Descripción del Producto"
            value={value.description} // Usar el valor del estado del padre
            fullWidth
            onChange={(e) => onChange('description', e.target.value)} // Propagar el cambio al padre
          />
          <Typography variant="body2">
            Añade una descripción al producto para mayor visibilidad.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

GeneralCard.propTypes = {
  value: PropTypes.shape({
    product: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GeneralCard;
