import React from 'react';
import { Box, Typography, Avatar, Stack, ButtonGroup, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { IconMinus, IconPlus } from '@tabler/icons';
import { useSelector, useDispatch } from 'react-redux';
import emptyCart from 'src/assets/images/products/empty-shopping-cart.svg';
import { increment, decrement, deleteCart } from 'src/store/apps/eCommerce/EcommerceSlice';

const CartItems = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.ecommerce.cart);
  const categories = useSelector((state) => state.ecommerce.categories);

  // Función para obtener el nombre de la categoría usando el ID de la categoría
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.category : 'Categoría desconocida';
  };

  const Increase = (productId) => {
    dispatch(increment(productId));
  };

  const Decrease = (productId) => {
    dispatch(decrement(productId));
  };

  const handleRemove = (productId) => {
    dispatch(deleteCart(productId));
  };

  return (
    <Box px={3}>
      {cartProducts.length > 0 ? (
        <>
          {cartProducts.map((product) => (
            <Box key={product._id}>
              <Stack direction="row" spacing={2} py={3}>
                <Avatar
                  src={`http://localhost:4000/images/products/${product._id}.png`} // Ajusta la ruta según tu backend
                  alt={product.product}
                  sx={{
                    borderRadius: '10px',
                    height: '75px',
                    width: '105px',
                  }}
                />
                <Box>
                  <Typography variant="subtitle2" color="textPrimary" fontWeight="500">
                    {product.product || 'Producto sin nombre'}
                  </Typography>
                  <Typography color="textSecondary" variant="body1">
                    {getCategoryName(product.category)}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={2} mt="5px">
                    <Typography variant="subtitle2" color="textSecondary">
                      ${((product.discount ? product.price - (product.price * product.discount) / 100 : product.price)* product.qty).toFixed(2)} {/* Calcula el total */}
                    </Typography>
                    <ButtonGroup size="small" color="success" aria-label="small button group">
                      <Button onClick={() => Decrease(product._id)} disabled={product.qty <= 1}>
                        <IconMinus stroke={1.5} size="0.8rem" />
                      </Button>
                      <Button>{product.qty}</Button>
                      <Button onClick={() => Increase(product._id)}>
                        <IconPlus stroke={1.5} size="0.8rem" />
                      </Button>
                    </ButtonGroup>
                  </Stack>
                </Box>
                <Button
                  color="error"
                  onClick={() => handleRemove(product._id)} 
                  sx={{ marginLeft: 'auto' }}
                >
                  Remove
                </Button>
              </Stack>
              <Divider />
            </Box>
          ))}
        </>
      ) : (
        <Box textAlign="center" mb={3}>
          <img src={emptyCart} alt="cart" width="200px" />
          <Typography variant="h5" mb={2}>
            Cart is Empty
          </Typography>
          <Button component={Link} to="/apps/ecommerce/shop" variant="contained">
            Go back to Shopping
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartItems;
