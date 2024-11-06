// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Drawer, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { filterByCategory, filterByPriceRange, filterByStatus } from '../../../../store/apps/eCommerce/EcommerceSlice';

import ProductFilter from './ProductFilter'; // Asegúrate de que ProductFilter maneje categorías, precios, y estado.

const drawerWidth = 250;

// eslint-disable-next-line react/prop-types
const ProductSidebar = ({ isMobileSidebarOpen, onSidebarClose }) => {
  const dispatch = useDispatch();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  // Obtener filtros actuales del estado global
  const filters = useSelector((state) => state.ecommerce.filters);

  // Manejadores de cambio para los filtros
  const handleCategoryChange = (category) => {
    dispatch(filterByCategory(category));
  };

  const handlePriceRangeChange = (min, max) => {
    dispatch(filterByPriceRange({ min, max }));
  };

  const handleStatusChange = (status) => {
    dispatch(filterByStatus(status));
  };

  return (
    <Drawer
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant={lgUp ? 'permanent' : 'temporary'}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        zIndex: lgUp ? 0 : 1,
        [`& .MuiDrawer-paper`]: { position: 'relative' },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Filter Sidebar */}
      {/* ------------------------------------------- */}
      <ProductFilter
        currentCategory={filters.category}
        onCategoryChange={handleCategoryChange}
        currentPriceRange={filters.priceRange}
        onPriceRangeChange={handlePriceRangeChange}
        currentStatus={filters.status}
        onStatusChange={handleStatusChange}
      />
    </Drawer>
  );
};

export default ProductSidebar;
