import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Grid, Typography, TextField, Autocomplete } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import { getCategories } from 'src/services/categoryService';

const ProductDetails = ({ categoryId, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);

  console.log('categoryId a editar:', categoryId);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data); // Guardar todas las categorías
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Actualizar la categoría seleccionada por defecto cuando `categoryId` cambie
    setSelectedCategoryId(categoryId);
  }, [categoryId]);

  const handleCategoryChange = (event, newValue) => {
    if (newValue) {
      setSelectedCategoryId(newValue._id); // Actualizar el ID de la categoría seleccionada
      onChange('category', newValue._id); // Enviar el ID seleccionado al padre
    } else {
      setSelectedCategoryId(null);
      onChange('category', '');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5">Detalles del producto</Typography>
      <Grid container mt={3}>
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="category">Categoría</CustomFormLabel>
          <Autocomplete
  value={categories.find((cat) => cat._id === categoryId) || null} // Buscar la categoría por su ID
  onChange={handleCategoryChange}
  options={categories}
  getOptionLabel={(option) => option.category} // Mostrar el nombre de la categoría
  fullWidth
  renderInput={(params) => (
    <TextField {...params} placeholder="Categorías" variant="outlined" />
  )}
/>

        </Grid>
      </Grid>
    </Box>
  );
};

ProductDetails.propTypes = {
  categoryId: PropTypes.string.isRequired, // ID de la categoría seleccionada
  onChange: PropTypes.func.isRequired,
};

export default ProductDetails;
