import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {
  Autocomplete,
  Button,
  Grid,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import { IconPlus } from '@tabler/icons';
import { getCategories, getProductById } from '../../../../services/productService';

const ProductDetails = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newCategory, setNewCategory] = useState({ category: '', description: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cargar las categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(
          data.map((cat) => ({
            label: cat.category,
            id: cat._id,
            category: cat.category,
          })),
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
        setLoading(true);
        try {
          const productData = await getProductById(value._id);
          const productCategoryId = productData.category._id;

          // Buscar la categoría en la lista de categorías
          const productCategory = categories.find((cat) => cat.id === productCategoryId);
          setSelectedCategory(productCategory || null);
        } catch (error) {
          console.error('Error al obtener el producto:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [value._id, categories]);

  const handleCategoryChange = (event, value) => {
    if (value) {
      setSelectedCategory(value);
      onChange('category', value.id);
    } else {
      setSelectedCategory(null);
      onChange('category', '');
    }
  };

  const handleAddCategory = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewCategory({ category: '', description: '' });
  };

  const handleNewCategoryChange = (field, value) => {
    setNewCategory((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveNewCategory = async () => {
    try {
      const savedCategory = await addCategory(newCategory.category, newCategory.description);
      setCategories((prev) => [
        ...prev,
        {
          label: savedCategory.category,
          id: savedCategory._id,
          category: savedCategory.category,
          description: savedCategory.description,
        },
      ]);
      handleDialogClose();
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error al agregar la nueva categoría:', error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
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
            getOptionLabel={(option) => option.category} // Usar 'category' como etiqueta
            renderInput={(params) => (
              <TextField {...params} placeholder="Categorías" variant="outlined" />
            )}
          />
          <Typography variant="body2" mb={2}>
            Selecciona o cambia la categoría del producto.
          </Typography>
        </Grid>

        {/* Botón para añadir nueva categoría */}
        <Grid item xs={12}>
          <Button variant="text" startIcon={<IconPlus size={18} />} onClick={handleAddCategory}>
            Añadir nueva categoría
          </Button>
        </Grid>
      </Grid>

      {/* Dialogo para añadir una nueva categoría */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Añadir Nueva Categoría</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre de la categoría"
            fullWidth
            variant="outlined"
            value={newCategory.category}
            onChange={(e) => handleNewCategoryChange('category', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Descripción de la categoría"
            fullWidth
            variant="outlined"
            value={newCategory.description}
            onChange={(e) => handleNewCategoryChange('description', e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveNewCategory} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para mostrar mensajes de éxito */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Categoría agregada exitosamente
        </Alert>
      </Snackbar>
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
