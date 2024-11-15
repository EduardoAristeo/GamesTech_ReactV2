// PricingCard.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import { useParams } from 'react-router-dom'; // Si usas React Router
import { getProductById } from '../../../../services/productService';

const PricingCard = () => {
  const { id } = useParams(); // Obtener el ID desde la URL
  const [product, setProduct] = useState(null);
  const [cost, setCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0); // Agregar estado para el precio final

  // Hacer la llamada a la API para obtener los datos del producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id); // Usar el servicio para obtener los datos
        setProduct(data); // Guardar los datos del producto en el estado
        setCost(data.cost); // Inicializar el costo
        setDiscount(data.discount || 0); // Inicializar el descuento
        setStock(data.stock); // Inicializar el stock
        setFinalPrice(data.cost - (data.discount || 0)); // Calcular el precio final al inicio
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Si aún no se han cargado los datos del producto, muestra un mensaje de carga
  if (!product) {
    return <div>Loading...</div>;
  }

  // Calcular el precio final (si hay descuento) o usar el valor del estado finalPrice
  const handleCostChange = (event) => {
    const newCost = Number(event.target.value);
    setCost(newCost);
    setFinalPrice(newCost - discount); // Recalcular el precio final
  };

  const handleDiscountChange = (event) => {
    const newDiscount = Number(event.target.value);
    setDiscount(newDiscount);
    setFinalPrice(cost - newDiscount); // Recalcular el precio final
  };

  const handleStockChange = (event) => setStock(Number(event.target.value));

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
            value={cost} // Mostrar el costo editable
            onChange={handleCostChange} // Manejar el cambio en el campo
            fullWidth
          />
          <Typography variant="body2">El costo del producto.</Typography>
        </Grid>

        {/* Campo 2: Descuento */}
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
            value={discount} // Mostrar el descuento editable
            onChange={handleDiscountChange} // Manejar el cambio en el campo
            fullWidth
          />
          <Typography variant="body2">Descuento aplicado al producto.</Typography>
        </Grid>

        {/* Campo 3: Precio final */}
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="p_final_price" sx={{ mt: 0 }}>
            Precio Final{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
          <CustomTextField
            id="p_final_price"
            placeholder="Final Price"
            value={finalPrice} // Mostrar el precio final editable
            onChange={(e) => setFinalPrice(Number(e.target.value))} // Permitir que el usuario cambie el precio final directamente
            fullWidth
          />
          <Typography variant="body2">Precio final después del descuento.</Typography>
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
            value={stock} // Mostrar el stock editable
            onChange={handleStockChange} // Manejar el cambio en el campo
            fullWidth
          />
          <Typography variant="body2">Cantidad disponible del producto.</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PricingCard;
