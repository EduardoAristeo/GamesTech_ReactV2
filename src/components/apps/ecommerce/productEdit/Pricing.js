import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Typography, Grid } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';

const PricingCard = ({ value, onChange }) => {
  const handleCostChange = (event) => {
    onChange('cost', Number(event.target.value)); // Actualizar el estado en el padre
  };

  const handlePriceChange = (event) => {
    onChange('price', Number(event.target.value)); // Actualizar el estado en el padre
  };

  const handleDiscountChange = (event) => {
    onChange('discount', Number(event.target.value)); // Actualizar el estado en el padre
  };

  const handleStockChange = (event) => {
    onChange('stock', Number(event.target.value)); // Actualizar el estado en el padre
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={3}>
        Precios y Costos
      </Typography>
      <Grid container spacing={3}>
        {/* Campo 1: Precio de costo */}
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="p_cost" sx={{ mt: 0 }}>
            Costo{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
          <CustomTextField
            id="p_cost"
            placeholder="Product Cost"
            value={value.cost} // Usar el valor del estado del padre
            onChange={handleCostChange} // Actualizar el estado del padre
            fullWidth
          />
          <Typography variant="body2">El costo del producto.</Typography>
        </Grid>

        {/* Campo 2: Precio de venta */}
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="p_price" sx={{ mt: 0 }}>
            Precio de Venta{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
          <CustomTextField
            id="p_price"
            placeholder="Sale Price"
            value={value.price} // Usar el valor del estado del padre
            onChange={handlePriceChange} // Actualizar el estado del padre
            fullWidth
          />
          <Typography variant="body2">El precio de venta del producto.</Typography>
        </Grid>

        {/* Campo 3: Descuento */}
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="p_discount" sx={{ mt: 0 }}>
            Descuento{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
          <CustomTextField
            id="p_discount"
            placeholder="Discount Price"
            value={value.discount} // Usar el valor del estado del padre
            onChange={handleDiscountChange} // Actualizar el estado del padre
            fullWidth
          />
          <Typography variant="body2">Descuento aplicado al producto.</Typography>
        </Grid>

        {/* Campo 4: Stock */}
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="p_stock" sx={{ mt: 0 }}>
            Stock{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
          <CustomTextField
            id="p_stock"
            placeholder="Stock Available"
            value={value.stock} // Usar el valor del estado del padre
            onChange={handleStockChange} // Actualizar el estado del padre
            fullWidth
          />
          <Typography variant="body2">Cantidad disponible del producto.</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

PricingCard.propTypes = {
  value: PropTypes.shape({
    cost: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired, // Agregar validación para `price`
    discount: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PricingCard;
