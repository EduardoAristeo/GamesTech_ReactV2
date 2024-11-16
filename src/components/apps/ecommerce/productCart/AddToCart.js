import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Stack,
  ButtonGroup,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { IconMinus, IconPlus, IconTrash } from '@tabler/icons';
import { useSelector, useDispatch } from 'react-redux';
import emptyCart from 'src/assets/images/products/empty-shopping-cart.svg';
import { increment, deleteCart, decrement } from '../../../../store/apps/eCommerce/EcommerceSlice';

const AddToCart = () => {
  const dispatch = useDispatch();

  // Obtener productos y categorías del carrito
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
    <Box>
      {cartProducts.length > 0 ? (
        <TableContainer sx={{ minWidth: { sm: '350px' } }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell align="left">Cantidad</TableCell>
                <TableCell align="right">Precio</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cartProducts.map((product) => {
                // Calcular el precio con descuento si el producto tiene descuento
                const hasDiscount = product.discount && product.discount > 0;
                const discountedPrice = hasDiscount
                  ? product.price - (product.price * product.discount) / 100
                  : product.price;

                return (
                  <TableRow key={product._id}>
                    {/* ------------------------------------------- */}
                    {/* Product Image & Title */}
                    {/* ------------------------------------------- */}
                    <TableCell>
                      <Stack direction="row" alignItems="center" gap={2}>
                        <Avatar
                          src={`http://localhost:4000/images/products/${product._id}.png`} // Ajustar la ruta según tu backend
                          alt={product.product || 'No image'}
                          sx={{
                            borderRadius: '10px',
                            height: '80px',
                            width: '90px',
                          }}
                        />
                        <Box>
                          <Typography variant="h6">{product.product || 'No name'}</Typography>
                          <Typography color="textSecondary" variant="body1">
                            {getCategoryName(product.category)}
                          </Typography>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleRemove(product._id)}
                          >
                            <IconTrash size="1rem" />
                          </IconButton>
                        </Box>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <ButtonGroup size="small" color="success" aria-label="small button group">
                        <Button onClick={() => Decrease(product._id)} disabled={product.qty < 2}>
                          <IconMinus stroke={1.5} size="0.8rem" />
                        </Button>
                        <Button>{product.qty || 1}</Button>
                        <Button onClick={() => Increase(product._id)}>
                          <IconPlus stroke={1.5} size="0.8rem" />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                    <TableCell align="right">
                      {hasDiscount ? (
                        <>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ textDecoration: 'line-through', marginRight: '8px' }}
                          >
                            ${(product.price * (product.qty || 1)).toFixed(2)}
                          </Typography>
                          <Typography variant="h6" color="error">
                            ${(discountedPrice * (product.qty || 1)).toFixed(2)}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="h6">
                          ${(product.price * (product.qty || 1)).toFixed(2)}
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
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

export default AddToCart;
