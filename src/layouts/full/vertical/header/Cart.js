import React from 'react';
import { sum } from 'lodash';
import { IconX } from '@tabler/icons';
import { Box, Typography, Drawer, IconButton, Button, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItems from './CartItems';

const Cart = ({ showDrawer, setShowDrawer }) => {
  const cartProducts = useSelector((state) => state.ecommerce.cart);
  
  // Calcular el total asegurando que todos los precios sean números válidos
  const total = sum(
    cartProducts.map((product) => parseFloat(product.price) * parseInt(product.qty))
  );

  const handleDrawerClose = () => {
    setShowDrawer(false);
  };

  const cartContent = (
    <Box>
      <CartItems />
    </Box>
  );

  return (
    <Drawer
      anchor="right"
      open={showDrawer}
      onClose={handleDrawerClose}
      PaperProps={{ sx: { maxWidth: '500px' } }}
    >
      <Box display="flex" alignItems="center" p={3} pb={0} justifyContent="space-between">
        <Typography variant="h5" fontWeight="500">
          Carrito de compras
        </Typography>
        <Box>
          <IconButton
            color="inherit"
            sx={{
              color: (theme) => theme.palette.grey.A200,
            }}
            onClick={handleDrawerClose}
          >
            <IconX size="1rem" />
          </IconButton>
        </Box>
      </Box>

      {cartContent}

      <Box px={3} mt={2}>
        {cartProducts.length > 0 ? (
          <>
            <Stack direction="row" justifyContent="space-between" mb={3}>
              <Typography variant="subtitle2" color="textSecondary" fontWeight={400}>
                Total
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                ${total.toFixed(2)}
              </Typography>
            </Stack>
            <Button
              fullWidth
              component={Link}
              to="/apps/ecommerce/eco-checkout"
              variant="contained"
              color="primary"
            >
              Checkout
            </Button>
          </>
        ) : (
          <Typography variant="body2" color="textSecondary" align="center" mt={2}>
            Tu carrito está vacio
          </Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default Cart;
