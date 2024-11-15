import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import { getProductById } from '../../../../services/productService';

const EcommerceEditProduct = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [productData, setProductData] = useState({
    product: '', // Nombre del producto
    description: '', // Descripción del producto
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await getProductById(id); // Usa el método getProductById
        setProductData({
          product: data.product, // Nombre del producto
          description: data.description, // Descripción del producto
        });
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [id]);

  // Manejar el cambio de nombre del producto
  const handleProductChange = (e) => {
    setProductData({ ...productData, product: e.target.value });
  };

  // Manejar el cambio de descripción del producto
  const handleDescriptionChange = (e) => {
    setProductData({ ...productData, description: e.target.value });
  };

  return (
    <Box p={3}>
      <Typography variant="h5">Editar Producto</Typography>

      <Grid container mt={3}>
        {/* Nombre del Producto */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="p_name" sx={{ mt: 0 }}>
            Nombre del Producto{' '}
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id="p_name"
            placeholder="Nombre del Producto"
            value={productData.product} // Valor del campo
            fullWidth
            onChange={handleProductChange} // Actualizar el estado con el nuevo valor
          />
          <Typography variant="body2">
            Se recomienda que el nombre del producto sea único.
          </Typography>
        </Grid>

        {/* Descripción */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="p_description">Descripción</CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id="p_description"
            placeholder="Descripción del Producto"
            value={productData.description} // Valor del campo
            fullWidth
            onChange={handleDescriptionChange} // Actualizar el estado con el nuevo valor
          />
          <Typography variant="body2">
            Añade una descripción al producto para mayor visibilidad.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EcommerceEditProduct;
