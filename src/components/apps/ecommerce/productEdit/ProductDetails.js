import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Grid, Typography, TextField, Autocomplete } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import { getCategories } from 'src/services/categoryService';
import { getProductById } from '../../../../services/productService';

const ProductDetails = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null); // Estado para el producto

  // Cargar las categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(
          data.map((cat) => ({ label: cat.category, id: cat._id })), // Solo label (categoría) e id
        );
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  // Obtener los datos del producto por _id y establecer la categoría seleccionada
  useEffect(() => {
    const fetchProduct = async () => {
      if (value._id && categories.length > 0) {
        // Solo continuar si ya se cargaron las categorías
        setLoading(true);
        try {
          const productData = await getProductById(value._id); // Usamos value._id
          const productCategoryId = productData.category.$oid; // Obtenemos el ID de la categoría

          // Buscar la categoría en la lista de categorías
          const productCategory = categories.find((cat) => cat.id === productCategoryId);
          setSelectedCategory(productCategory || null); // Establecemos la categoría seleccionada
        } catch (error) {
          console.error('Error al obtener el producto:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [value._id, categories]); // Dependemos de value._id y categories

  const handleCategoryChange = (event, value) => {
    if (value) {
      setSelectedCategory(value); // Actualizamos la categoría seleccionada
      onChange('category', value.id); // Enviamos el ID de la categoría seleccionada
    } else {
      setSelectedCategory(null); // Si no se selecciona categoría, ponemos el valor como null
      onChange('category', ''); // Enviamos valor vacío si no hay selección
    }
  };

  if (loading) {
    return <Typography variant="h6">Cargando...</Typography>;
  }

  return (
    <Box p={3}>
      <Typography variant="h5">Detalles del producto</Typography>
      <Grid container mt={3}>
        {/* Campo de Categoría */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="p_cat" sx={{ mt: 0 }}>
            Categoría
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            value={selectedCategory} // El valor de la categoría seleccionada
            onChange={handleCategoryChange} // Llamada a la función para manejar el cambio
            fullWidth
            id="new-category"
            options={categories}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} placeholder="Categorías" variant="outlined" />
            )}
          />
          <Typography variant="body2" mb={2}>
            Selecciona o cambia la categoría del producto.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

// PropTypes para validar las props
ProductDetails.propTypes = {
  value: PropTypes.shape({
    _id: PropTypes.string.isRequired, // El producto debe tener un _id
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ProductDetails;
