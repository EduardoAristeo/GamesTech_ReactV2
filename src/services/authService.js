import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1';

// Función para hacer login
export const loginUser = async (user, password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(`${API_URL}/login`, { user, password });
    return response;
  } catch (error) {
    throw error; // Lanza el error para que el hook lo maneje
  }
};
