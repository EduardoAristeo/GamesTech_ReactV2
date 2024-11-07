import axios from '../../../utils/axios';
import { map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:4000/api/v1/products';

const initialState = {
  products: [],
  categories: [],
  productSearch: '',
  sortBy: 'newest',
  cart: [],
  total: 0,
  filters: {
    category: 'All',
    priceRange: null, // { min: 0, max: 1000 }
    status: 'All',
  },
  isCartOpen: false, // Nuevo estado para manejar la visibilidad del carrito
  status: 'idle',
  error: '',
};

export const EcommerceSlice = createSlice({
  name: 'ecommerce',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
    // GET PRODUCTS
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    // GET CATEGORIES
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    // SEARCH PRODUCT
    searchProduct: (state, action) => {
      state.productSearch = action.payload;
    },
    // SORT PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },
    // FILTER BY CATEGORY
    filterByCategory(state, action) {
      state.filters.category = action.payload;
    },
    // FILTER BY PRICE RANGE
    filterByPriceRange(state, action) {
      state.filters.priceRange = action.payload;
    },
    // FILTER BY STATUS
    filterByStatus(state, action) {
      state.filters.status = action.payload;
    },
    // FILTER RESET
    filterReset(state) {
      state.filters = {
        category: 'All',
        priceRange: null,
        status: 'All',
      };
      state.sortBy = 'newest';
    },
    // TOGGLE CART
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    clearCart(state) {
      state.cart = []; // Vaciar el carrito
    },
    // ADD TO CART
addToCart(state, action) {
  const product = action.payload;
  // Verificar si el producto ya existe en el carrito
  const existingProduct = state.cart.find((item) => item._id === product._id);

  if (existingProduct) {
    // Si ya existe, aumentar la cantidad
    existingProduct.qty += 1;
  } else {
    // Si no existe, agregarlo con cantidad inicial de 1
    state.cart.push({ ...product, qty: 1 });
  }
},

    
    // DELETE CART
deleteCart(state, action) {
  const productId = action.payload;
  state.cart = state.cart.filter((item) => item._id !== productId); // Usar `_id` en lugar de `id`
},

// QTY INCREMENT
increment(state, action) {
  const productId = action.payload;
  const updateCart = map(state.cart, (product) => {
    if (product._id === productId) {
      return {
        ...product,
        qty: product.qty + 1,
      };
    }
    return product;
  });
  state.cart = updateCart;
},

// QTY DECREMENT
decrement(state, action) {
  const productId = action.payload;
  const updateCart = map(state.cart, (product) => {
    if (product._id === productId) {
      return {
        ...product,
        qty: product.qty - 1,
      };
    }
    return product;
  });
  state.cart = updateCart;
},



  },
});

export const {
  hasError,
  getProducts,
  setCategories,
  searchProduct,
  sortByProducts,
  filterByCategory,
  filterByPriceRange,
  filterByStatus,
  filterReset,
  toggleCart,
  increment,
  deleteCart,
  decrement,
  addToCart,
  clearCart,
} = EcommerceSlice.actions;

// Función para construir los parámetros de consulta en base a los filtros y ordenamiento
const buildQueryParams = (filters, sortBy, search) => {
  const params = new URLSearchParams();
  if (filters.category && filters.category !== 'All') {
    params.append('category', filters.category);
  }
  if (filters.priceRange) {
    params.append('minPrice', filters.priceRange.min);
    params.append('maxPrice', filters.priceRange.max);
  }
  if (filters.status && filters.status !== 'All') {
    params.append('status', filters.status);
  }
  if (search) {
    params.append('search', search);
  }
  if (sortBy) {
    params.append('sortBy', sortBy);
  }
  return params.toString();
};

// Thunk para obtener productos desde la API con filtros y ordenamientos
export const fetchProducts = () => async (dispatch, getState) => {
  try {
    const state = getState().ecommerce;
    const params = buildQueryParams(state.filters, state.sortBy, state.productSearch);
    const response = await axios.get(`${API_URL}?${params}`);
    dispatch(getProducts(response.data));
  } catch (error) {
    dispatch(hasError(error));
  }
};

// Thunk para obtener categorías desde la API
export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:4000/api/v1/categories');
    dispatch(setCategories(response.data));
  } catch (error) {
    console.error('Error fetching categories:', error);
    dispatch(hasError(error));
  }
};

export default EcommerceSlice.reducer;
