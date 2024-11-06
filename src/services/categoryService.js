import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1/categories';

// Función para obtener todas las categorías
export const getCategories = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(API_URL);
    return response.data; // Retorna las categorías
  } catch (error) {
    throw error; // Lanza el error para que el componente lo maneje
  }
};

// Función para agregar una nueva categoría
export const addCategory = async (category, description) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(API_URL, { category, description });
    return response.data; // Retorna la categoría agregada
  } catch (error) {
    throw error; // Lanza el error para que el componente lo maneje
  }
};
