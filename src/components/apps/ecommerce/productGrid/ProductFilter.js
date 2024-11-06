import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ListItemText,
  ListItemButton,
  List,
  Divider,
  FormGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Button,
} from '@mui/material';
import {
  filterByCategory,
  sortByProducts,
  filterByPriceRange,
  filterByStatus,
  filterReset,
  fetchProducts,
} from '../../../../store/apps/eCommerce/EcommerceSlice';
import { IconCircles, IconSortAscending2, IconSortDescending2 } from '@tabler/icons';
import axios from 'axios';

const ProductFilter = () => {
  const dispatch = useDispatch();
  const activeFilters = useSelector((state) => state.ecommerce.filters);
  const activeSort = useSelector((state) => state.ecommerce.sortBy);
  const customizer = useSelector((state) => state.customizer);
  const br = `${customizer.borderRadius}px`;

  // Estado local para almacenar las categorías
  const [categories, setCategories] = useState([]);

  // Función para cargar las categorías desde la API
  const loadCategories = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  useEffect(() => {
    loadCategories(); // Cargar las categorías cuando el componente se monta
  }, []);

  const filterbySort = [
    { id: 1, value: 'newest', label: 'Recién agregados', icon: IconCircles },
    { id: 2, value: 'priceDesc', label: 'Precio: Alto - Bajo', icon: IconSortAscending2 },
    { id: 3, value: 'priceAsc', label: 'Precio: Bajo - Alto', icon: IconSortDescending2 },
  ];

  const filterbyPrice = [
    { id: 0, label: 'Todos', value: null },
    { id: 1, label: '0-50', value: { min: 0, max: 50 } },
    { id: 2, label: '50-100', value: { min: 50, max: 100 } },
    { id: 3, label: '100-200', value: { min: 100, max: 200 } },
    { id: 4, label: 'Más 200', value: { min: 200, max: 99999 } },
  ];

  const handleCategoryChange = (category) => {
    dispatch(filterByCategory(category));
    dispatch(fetchProducts());
  };

  const handlePriceChange = (value) => {
    dispatch(filterByPriceRange(value));
    dispatch(fetchProducts());
  };

  const handleSortChange = (sortBy) => {
    dispatch(sortByProducts(sortBy));
    dispatch(fetchProducts());
  };

  const handleStatusChange = (status) => {
    dispatch(filterByStatus(status));
    dispatch(fetchProducts());
  };

  const handleReset = () => {
    dispatch(filterReset());
    dispatch(fetchProducts());
  };

  return (
    <List>
      {/* Category Filter */}
      <Typography variant="subtitle2" fontWeight={600} px={3} mt={2} pb={2}>
        Filtrar por Categoría
      </Typography>
      <ListItemButton
        sx={{ mb: 1, mx: 3, borderRadius: br }}
        selected={activeFilters.category === 'All'}
        onClick={() => handleCategoryChange('All')}
      >
        <ListItemText>Todas</ListItemText>
      </ListItemButton>
      {categories.map((category) => (
        <ListItemButton
          sx={{ mb: 1, mx: 3, borderRadius: br }}
          selected={activeFilters.category === category._id}
          onClick={() => handleCategoryChange(category._id)}
          key={category._id}
        >
          <ListItemText>{category.category}</ListItemText>
        </ListItemButton>
      ))}

      <Divider />

      {/* Sort By */}
      <Typography variant="subtitle2" fontWeight={600} px={3} mt={3} pb={2}>
        Otros Filtros
      </Typography>
      {filterbySort.map((filter) => (
        <ListItemButton
          sx={{ mb: 1, mx: 3, borderRadius: br }}
          selected={activeSort === filter.value}
          onClick={() => handleSortChange(filter.value)}
          key={filter.id}
        >
          <ListItemText>{filter.label}</ListItemText>
        </ListItemButton>
      ))}

      <Divider />

      {/* Filter By Pricing */}
      <Typography variant="subtitle2" fontWeight={600} px={3} mt={3} pb={2}>
        Rango de precios
      </Typography>
      <Box p={3} pt={0}>
        <FormGroup>
          {filterbyPrice.map((price) => (
            <FormControlLabel
              key={price.label}
              control={
                <Radio
                  value={price.value}
                  checked={
                    activeFilters.priceRange &&
                    activeFilters.priceRange.min === price.value?.min &&
                    activeFilters.priceRange.max === price.value?.max
                  }
                  onChange={() => handlePriceChange(price.value)}
                />
              }
              label={price.label}
            />
          ))}
        </FormGroup>
      </Box>

      <Divider />

      

      <Divider />

      {/* Reset Filters */}
      <Box p={3}>
        <Button variant="contained" onClick={handleReset} fullWidth>
          Limpiar Filtros
        </Button>
      </Box>
    </List>
  );
};

export default ProductFilter;
