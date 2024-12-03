import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import GeneralCard from 'src/components/apps/ecommerce/productEdit/GeneralCard';
import PricingCard from 'src/components/apps/ecommerce/productEdit/Pricing';
import StatusCard from 'src/components/apps/ecommerce/productEdit/Status';
import ProductDetails from 'src/components/apps/ecommerce/productEdit/ProductDetails';
import { getProductById, updateProduct } from '../../../services/productService';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';

const EcommerceEditProduct = () => {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const navigate = useNavigate(); // Hook for navigation
  const fileInputRef = useRef(null); // Referencia para el input de archivo
  const [productData, setProductData] = useState({
    product: '',
    description: '',
    cost: '',
    price: '',
    category: '', // ID de la categoría
    status: 'Publicado',
    stock: 0,
    discount: 0,
    _id: id, // ID del producto
  });
  const [imageFile, setImageFile] = useState(null); // Estado para el archivo de imagen
  const [previewImage, setPreviewImage] = useState(''); // Vista previa de la imagen

  // Cargar los datos del producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(id);
        setProductData({
          ...product,
          category: product.category._id, // Asegurar que solo guardamos el ID de la categoría
        });
        setPreviewImage(`http://localhost:4000/images/products/${product._id}.png`);
      } catch (error) {
        console.error('Error al obtener los datos del producto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (field, value) => {
    setProductData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file); // Actualizar el estado con la imagen seleccionada

      // Generar vista previa de la imagen
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !productData.product ||
      !productData.description.trim() ||
      !productData.price ||
      !productData.cost ||
      !productData.category
    ) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      // Actualizar datos del producto
      await updateProduct(productData._id, {
        product: productData.product,
        description: productData.description,
        cost: Number(productData.cost),
        price: Number(productData.price),
        category: productData.category,
        status: productData.status,
        stock: Number(productData.stock),
        discount: Number(productData.discount),
      });

      // Subir la imagen, si se seleccionó una
      if (imageFile) {
        const formData = new FormData();
        formData.append('productId', productData._id);
        formData.append('image', imageFile);

        await axios.post('http://localhost:4000/api/v1/products/update-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      alert('Producto actualizado exitosamente.');
      navigate('/apps/ecommerce/eco-product-list');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el producto.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item lg={8}>
          <Stack spacing={3}>
            <GeneralCard
              value={{ product: productData.product, description: productData.description }}
              onChange={handleChange}
            />
            <PricingCard
              value={{
                cost: productData.cost,
                price: productData.price,
                discount: productData.discount,
                stock: productData.stock,
              }}
              onChange={handleChange}
            />
          </Stack>
        </Grid>
        <Grid item lg={4}>
          <Stack spacing={3}>
            <Box p={3}>
              <Typography variant="h5">Imagen del producto</Typography>
              <Box mt={3} mb={2} textAlign="center">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <img
                  src={previewImage}
                  alt="Vista previa del producto"
                  style={{ maxWidth: '300px', borderRadius: '7px', margin: '0 auto', cursor: 'pointer' }}
                  onClick={() => fileInputRef.current?.click()}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => fileInputRef.current?.click()}
                  sx={{ mt: 2 }}
                >
                  Cambiar Imagen
                </Button>
              </Box>
            </Box>
            <ProductDetails
              categoryId={productData.category}
              onChange={handleChange}
            />
            <StatusCard
              value={productData.status}
              onChange={(value) => handleChange('status', value)}
            />
          </Stack>
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2} mt={3}>
        <Button type="submit" variant="contained" color="primary">
          Actualizar Producto
        </Button>
      </Stack>
    </form>
  );
};

export default EcommerceEditProduct;
