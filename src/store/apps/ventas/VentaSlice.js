import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk para obtener ventas
export const fetchVentas = createAsyncThunk(
  'ventas/fetchVentas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/ventas');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al cargar ventas');
    }
  }
);

// Async thunk para eliminar una venta
export const deleteVenta = createAsyncThunk(
  'ventas/deleteVenta',
  async (ventaId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/ventas/${ventaId}`);
      return ventaId; // Devolvemos el ID de la venta eliminada
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al eliminar la venta');
    }
  }
);

const ventaSlice = createSlice({
  name: 'ventas',
  initialState: {
    ventas: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVentas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVentas.fulfilled, (state, action) => {
        state.loading = false;
        state.ventas = action.payload;
      })
      .addCase(fetchVentas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error desconocido';
      })
      .addCase(deleteVenta.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVenta.fulfilled, (state, action) => {
        state.loading = false;
        state.ventas = state.ventas.filter((venta) => venta._id !== action.payload);
      })
      .addCase(deleteVenta.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al eliminar la venta';
      });
  },
});

export const { clearError } = ventaSlice.actions;
export default ventaSlice.reducer;
