import { createContext, useState, useContext, useEffect } from 'react';
import { validateToken } from '../services/authService'; // Servicio para validar el token
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga inicial
  const navigate = useNavigate();

  const login = (token) => {
    console.log("Entro a la funcion de login AUTH CONTEXT con el token:", token);
    // Guarda solo el token en localStorage
    localStorage.setItem('token', token);
    setLoading(true); // Activa la carga mientras recupera los datos del usuario

    // Usa el token para obtener los datos del usuario
    fetchUserFromToken(token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login'); // Redirige al login
  };

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await validateToken(token);
          setUser(response.data.user); // Actualiza el usuario en tiempo real
        } catch (error) {
          console.error('Error al validar token:', error);
        }
      }
    };
  
    initializeUser();
  }, []); // Se ejecuta una sola vez al montar
  

  const fetchUserFromToken = async (token) => {
    try {
      const response = await validateToken(token);
      
      if (response.status === 200) {
        setUser(response.data.user); // Almacena los datos del usuario en el estado
        console.log("Datos del usuario:", response.data.user);
      } else {
        logout(); // Si el token es inválido, cierra sesión
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      logout();
    } finally {
      setLoading(false); // Desactiva la carga
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserFromToken(token); // Recupera los datos del usuario al cargar la app
    } else {
      setLoading(false); // Desactiva la carga si no hay token
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
