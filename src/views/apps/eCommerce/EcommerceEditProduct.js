
import React, { useState } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import GeneralCard from 'src/components/apps/ecommerce/productEdit/GeneralCard';
//import VariationCard from 'src/components/apps/ecommerce/productEdit/VariationCard';
import PricingCard from 'src/components/apps/ecommerce/productEdit/Pricing';
import Thumbnail from 'src/components/apps/ecommerce/productEdit/Thumbnail';
import StatusCard from 'src/components/apps/ecommerce/productEdit/Status';
import ProductDetails from 'src/components/apps/ecommerce/productEdit/ProductDetails';

import ProductTemplate from 'src/components/apps/ecommerce/productEdit/ProductTemplate';
import CustomersReviews from 'src/components/apps/ecommerce/productEdit/CustomersReviews';
import ProductAvgSales from 'src/components/apps/ecommerce/productEdit/ProductAvgSales';

import BlankCard from 'src/components/shared/BlankCard';
import { updateProduct, uploadImage } from '../../../services/productService';

const EcommerceEditProduct = () => {
  // Estado para cada campo del formulario
  const [productData, setProductData] = useState({
    product: '',
    description: '',
    cost: '',
    price: '',
    thumbnail: null,
    category: '',
    status: 'Publicado',
    stock: 0,
    discount: 0,
  });

  // Función para resetear el estado del formulario
  const resetForm = () => {
    setProductData({
      product: '',
      description: '',
      cost: '',
      price: '',
      thumbnail: null,
      category: '',
      status: 'Publicado',
      stock: 0,
      discount: 0,
    });
  };

  // Manejador de cambios específico para la imagen
  const handleImageChange = (file) => {
    setProductData((prevData) => ({
      ...prevData,
      thumbnail: file,
    }));
  };

  const handleChange = (field, value) => {
    setProductData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
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
      const product = await updateProduct({
        product: productData.product,
        description: productData.description,
        cost: Number(productData.cost),
        price: Number(productData.price),
        category: productData.category,
        status: productData.status,
        stock: Number(productData.stock),
        discount: Number(productData.discount),
      });

      if (productData.thumbnail) {
        await uploadImage(product._id, productData.thumbnail);
      }

      alert('Producto agregado exitosamente.');
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión.');
    }
  };
  return (
    <PageContainer title="Edit Product" description="this is Edit Product page">
      {/* breadcrumb */}
      <Breadcrumb title="Edit Product" items={BCrumb} />
      <form>
        <Grid container spacing={3}>
          <Grid item lg={8}>
            <Stack spacing={3}>
              <BlankCard>
                <GeneralCard />
              </BlankCard>

              <BlankCard>
                <MediaCard />
              </BlankCard>

              <BlankCard>
                <PricingCard />
              </BlankCard>
            </Stack>
          </Grid>

          <Grid item lg={4}>
            <Stack spacing={3}>
              <BlankCard>
                <Thumbnail />
              </BlankCard>

              <BlankCard>
                <StatusCard />
              </BlankCard>

              <BlankCard>
                <ProductDetails />
              </BlankCard>

            </Stack>
          </Grid>

        </Grid>
        <Grid item lg={4}>
          <Stack spacing={3}>
            <Thumbnail value={productData.thumbnail} onChange={handleImageChange} />
            <ProductDetails value={productData} onChange={handleChange} />
            <StatusCard
              value={productData.status}
              onChange={(value) => handleChange('status', value)}
            />
          </Stack>
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2} mt={3}>
        <Button type="submit" variant="contained" color="primary">
          Agregar Producto
        </Button>
      </Stack>
    </form>
  );
};

export default EcommerceEditProduct;
