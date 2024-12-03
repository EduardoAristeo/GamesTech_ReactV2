import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1';

// Función para hacer login
export const loginUser = async (user, password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    
    const response = await axios.post(`${API_URL}/login`, { user, password });

    // Almacenar el token en localStorage o sessionStorage
    
    const token = response.data.token; // Extraer el token de la respuesta
    if (token) {
      localStorage.setItem('token', token);
      console.log("Token almacenado:", localStorage.getItem('token')); // Verifica el token almacenado
      
    }
    
   
    return response; // Devuelve los datos del usuario
  } catch (error) {
    throw error;
  }
};

export const validateToken = async (token) => {

  const response = await axios.post(`${API_URL}/validateToken`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
  
};

// Función para cerrar sesión
export const logoutUser = () => {
  localStorage.removeItem('token'); // Elimina el token
};
