import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1/marcas';

// Función para obtener todas las marcas
export const getMarcas = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(API_URL);
    return response.data; // Retorna las marcas directamente
  } catch (error) {
    throw error; // Lanza el error para que el componente lo maneje
  }
};

// Función para agregar una nueva marca
export const addMarca = async (marca) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(API_URL, { marca });
    return response.data; // Retorna la marca agregada
  } catch (error) {
    throw error; // Lanza el error para que el componente lo maneje
  }
};
