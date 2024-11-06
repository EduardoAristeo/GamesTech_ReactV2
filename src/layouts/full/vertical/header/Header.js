import React, { useState } from 'react';
import { IconButton, Box, AppBar, useMediaQuery, Toolbar, styled, Stack, Badge } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleSidebar,
  toggleMobileSidebar,
  setDarkMode,
} from 'src/store/customizer/CustomizerSlice';
import { IconMenu2, IconMoon, IconSun, IconShoppingCart } from '@tabler/icons';

// components
import Profile from './Profile';
import Search from './Search';
import Navigation from './Navigation';
import MobileRightSidebar from './MobileRightSidebar';
import Cart from './Cart'; // Importa el componente Cart directamente

const Header = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  // drawer
  const customizer = useSelector((state) => state.customizer);
  const cartProducts = useSelector((state) => state.ecommerce.cart);
  const itemCount = cartProducts.length;

  const dispatch = useDispatch();

  // Estado para controlar la visibilidad del carrito
  const [showCart, setShowCart] = useState(false);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: customizer.TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={lgUp ? () => dispatch(toggleSidebar()) : () => dispatch(toggleMobileSidebar())}
        >
          <IconMenu2 size="20" />
        </IconButton>
        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        <Search />
        {lgUp ? (
          <>
            <Navigation />
          </>
        ) : null}

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {/* Icono del carrito con contador */}
          <IconButton
            size="large"
            color="inherit"
            onClick={() => setShowCart(true)} // Abre directamente el componente lateral
          >
            <Badge color="error" badgeContent={itemCount}>
              <IconShoppingCart size="21" stroke="1.5" />
            </Badge>
          </IconButton>

          {/* Renderiza el componente Cart */}
          <Cart showDrawer={showCart} setShowDrawer={setShowCart} />

          <IconButton size="large" color="inherit">
            {customizer.activeMode === 'light' ? (
              <IconMoon size="21" stroke="1.5" onClick={() => dispatch(setDarkMode('dark'))} />
            ) : (
              <IconSun size="21" stroke="1.5" onClick={() => dispatch(setDarkMode('light'))} />
            )}
          </IconButton>

          {lgDown ? <MobileRightSidebar /> : null}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  toggleSidebar: PropTypes.func,
};

export default Header;
