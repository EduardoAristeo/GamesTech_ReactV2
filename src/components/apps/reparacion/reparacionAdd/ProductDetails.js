// eslint-disable-next-line no-unused-vars
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
import { getCategories, addCategory } from 'src/services/categoryService';

const ProductDetails = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newCategory, setNewCategory] = useState({ category: '', description: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(
          data.map((cat) => ({ label: cat.category, id: cat._id, description: cat.description })),
        );
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  // useEffect para actualizar selectedCategories cuando se cambie el valor de value.category
  useEffect(() => {
    if (value.category) {
      const selectedCategory = categories.find((cat) => cat.id === value.category);
      setSelectedCategories(selectedCategory ? [selectedCategory] : []);
    } else {
      setSelectedCategories([]);
    }
  }, [value.category, categories]);

  const handleCategoryChange = (event, value) => {
    if (value && value.length > 0) {
      setSelectedCategories(value);
      onChange('category', value[0].id); // Enviar solo el ID de la primera categoría seleccionada
    } else {
      setSelectedCategories([]);
      onChange('category', ''); // Si no hay categoría seleccionada, se envía un valor vacío
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

  const handleStockChange = (event) => {
    const newStock = event.target.value;
    onChange('stock', newStock);
  };

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
            multiple
            fullWidth
            id="new-category"
            options={categories}
            getOptionLabel={(option) => option.label}
            filterSelectedOptions
            value={selectedCategories}
            onChange={handleCategoryChange}
            renderInput={(params) => (
              <TextField {...params} placeholder="Categorías" variant="outlined" />
            )}
          />
          <Typography variant="body2" mb={2}>
            Selecciona una categoría del producto.
          </Typography>
        </Grid>

        {/* Botón para añadir nueva categoría */}
        <Grid item xs={12}>
          <Button variant="text" startIcon={<IconPlus size={18} />} onClick={handleAddCategory}>
            Añadir nueva categoría
          </Button>
        </Grid>

        {/* Campo de Stock */}
        <Grid item xs={12} mt={3}>
          <CustomFormLabel htmlFor="p_stock" sx={{ mt: 0 }}>
            Stock
          </CustomFormLabel>
          <TextField
            id="p_stock"
            placeholder="Cantidad en stock"
            fullWidth
            type="number"
            value={value.stock} // Usar el valor del estado para stock
            onChange={handleStockChange}
            variant="outlined"
          />
          <Typography variant="body2">
            Ingresa la cantidad de productos disponibles en inventario.
          </Typography>
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

// Agregar propTypes para validar las props
ProductDetails.propTypes = {
  value: PropTypes.shape({
    category: PropTypes.string,
    stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ProductDetails;
