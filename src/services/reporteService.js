import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1/reportes';

// Función para obtener el reporte de ventas en un rango de fechas
export const getReporteVentas = async (fechaInicio, fechaFin) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(`${API_URL}/ventas`, { fechaInicio, fechaFin });
    return response.data; // Retorna los datos del reporte directamente
  } catch (error) {
    throw error; // Lanza el error para que el componente lo maneje
  }
};
