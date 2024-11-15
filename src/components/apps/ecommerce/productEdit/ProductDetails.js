import React from 'react';
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
      <Typography variant="h5">Product Details</Typography>
      <Grid container mt={3}>
        {/* 1 */}
        <Grid item xs={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="p_cat" sx={{ mt: 0 }}>
            Categories
          </CustomFormLabel>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            fullWidth
            id="new-category"
            options={categories}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} placeholder="Categorías" variant="outlined" />
            )}
          />
          <Typography variant="body2" mb={2}>
            Add product to a category.
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

export default ProductDetails;
