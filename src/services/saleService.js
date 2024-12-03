import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1';

// Función para obtener ventas agrupadas por tiempo (para la gráfica)
export const getVentasPorTiempo = async () => {
  try {
    const response = await axios.get(`${API_URL}/ventas/por-tiempo`);
    return response.data; // Devuelve los datos del API
  } catch (error) {
    console.error('Error al obtener ventas por tiempo:', error);
    throw error;
  }
};

// Otras funciones existentes...
export const addSale = async (saleData) => {
  return await axios.post(`${API_URL}/ventas`, saleData);
};

export const getDetalleVentas = async () => {
  try {
    const response = await axios.get(`${API_URL}/detalle-ventas`);
    return response.data; // Devuelve los datos del API
  } catch (error) {
    console.error('Error al obtener los detalles de ventas:', error);
    throw error;
  }
};

export const getProductosVendidosPorTiempo = async (productoId, startDate, endDate, intervalo) => {
  try {
    const response = await axios.get(`${API_URL}/detalle-ventas/productos-vendidos-tiempo`, {
      params: { producto_id: productoId, startDate, endDate, intervalo },
    });
    return response.data; // Asegúrate de que el backend devuelva los datos correctamente.
  } catch (error) {
    console.error('Error al obtener productos vendidos por tiempo:', error);
    throw error;
  }
};

export const getProductosPorCategoria = async (startDate, endDate) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/detalle-ventas/productos-por-categoria`,
      { params: { startDate, endDate } }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener productos por categoría:', error);
    throw error;
  }
};

