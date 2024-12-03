import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1/fallas';


export const getFallas = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(API_URL);
    return response.data; // Retorna las categorías
  } catch (error) {
    throw error; // Lanza el error para que el componente lo maneje
  }
};


export const addFalla = async (falla ) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(API_URL, { falla });
    return response.data; 
  } catch (error) {
    throw error; // Lanza el error para que el componente lo maneje
  }
};
