import jwtDecode from 'jwt-decode';

export const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    const isTokenExpired = decodedToken.exp * 1000 < Date.now(); // Verifica si el token expiró
    if (isTokenExpired) {
      localStorage.removeItem('token'); // Borra el token si está expirado
      return null;
    }
    return decodedToken;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};
