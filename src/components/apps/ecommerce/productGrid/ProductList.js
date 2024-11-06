import React, { useEffect } from 'react';
import { Box, Grid, Stack, CardContent, Typography, Fab, Tooltip, Skeleton, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, fetchCategories, addToCart } from '../../../../store/apps/eCommerce/EcommerceSlice';
import { IconBasket, IconPlus } from '@tabler/icons';
import AlertCart from '../productCart/AlertCart';
import emptyCart from 'src/assets/images/products/empty-shopping-cart.svg';
import BlankCard from '../../../shared/BlankCard';

// eslint-disable-next-line react/prop-types
const ProductList = ({ onClick }) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Despachar las acciones para cargar productos y categorías cuando se monta el componente
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const { products, categories } = useSelector((state) => state.ecommerce);

  // for alert when added something to cart
  const [cartalert, setCartalert] = React.useState(false);

  const handleClick = () => {
    setCartalert(true);
  };

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setCartalert(false);
  };

  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      <Grid container spacing={3}>
        {products.length > 0 ? (
          products.map((product) => {
            // Calcular el precio con descuento si el producto tiene descuento
            const discountedPrice = product.discount ? product.price - (product.price * product.discount) / 100 : product.price;

            return (
              <Grid
                item
                xs={12}
                lg={4}
                md={4}
                sm={6}
                display="flex"
                alignItems="stretch"
                key={product._id}
              >
                <BlankCard className="hoverCard">
                  <Typography
                    onClick={() => dispatch(addToCart(product)) && handleClick()}
                    sx={{ cursor: 'pointer' }}
                  >
                    {isLoading ? (
                      <Skeleton variant="square" width={270} height={300}></Skeleton>
                    ) : (
                      <CardMedia
                        component="img"
                        width="100%"
                        image={`http://localhost:4000/images/products/${product._id}.png`}
                        alt={product.product}
                      />
                    )}
                  </Typography>
                  <Tooltip title="Agregar al carrito">
                    <Fab
                      size="small"
                      color="primary"
                      onClick={() => dispatch(addToCart(product)) && handleClick()}
                      sx={{ bottom: '89px', right: '7px', position: 'absolute' }}
                    >
                      <IconPlus size="16" />
                    </Fab>
                  </Tooltip>
                  <CardContent sx={{ p: 3, pt: 2 }}>
                    <Typography variant="h6">{product.product}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {categories.find((cat) => cat._id === product.category)?.category || 'Categoría desconocida'}
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                      <Stack direction="row" alignItems="center">
                        {product.discount ? (
                          <>
                            <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through', marginRight: '8px' }}>
                              ${product.price.toFixed(2)}
                            </Typography>
                            <Typography variant="h6" color="error">
                              ${discountedPrice.toFixed(2)}
                            </Typography>
                          </>
                        ) : (
                          <Typography variant="h6">${product.price.toFixed(2)}</Typography>
                        )}
                      </Stack>
                    </Stack>
                  </CardContent>
                </BlankCard>

                <AlertCart handleClose={handleClose} openCartAlert={cartalert} />
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12} lg={12} md={12} sm={12}>
            <Box textAlign="center" mt={6}>
              <img src={emptyCart} alt="cart" width="200px" />
              <Typography variant="h2">No hay productos disponibles</Typography>
              <Typography variant="h6" mb={3}>
                El producto que estás buscando no está disponible.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ProductList;
