import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { loginUser, validateToken } from '../services/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/apps/userProfile/UserProfileSlice'; // Asegúrate de que la ruta sea correcta
import { useAuth } from '../context/AuthContext';

export const useTokenAuth = () => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login: authLogin } = useAuth();

  const redirectBasedOnDepartment = (department) => {
    switch (department) {
      case 'admin':
        navigate('/dashboards/ecommerce');
        break;
      case 'tecnico':
        navigate('/tecnico');
        break;
      case 'recepcion':
        navigate('/recepcion');
        break;
      default:
        navigate('/');
        break;
    }
  };

  // Validación del token al cargar la aplicación
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await validateToken(token);
          const { user: userData } = response.data;

          // Guardar los datos del usuario en Redux
          dispatch(setUser(userData));

          // Redirigir basado en el departamento
          redirectBasedOnDepartment(userData.department);
        } catch (err) {
          console.error('Token inválido o expirado:', err);
          localStorage.removeItem('token'); // Elimina el token si es inválido
        }
      }
      setIsAuthenticated(true); // Indica que la validación ha terminado
    };

    checkToken();
  }, [dispatch]);

  // Función de inicio de sesión
  const login = async (user, password) => {
    setLoading(true);
    try {
      const response = await loginUser(user, password);
      const { token, user: userData } = response.data;

      // Almacena el token en localStorage
      localStorage.setItem('token', token);

      // Guarda los datos del usuario en Redux
      dispatch(setUser(userData));

      // Redirige según el departamento
      redirectBasedOnDepartment(userData.department);

      toast.success('Inicio de sesión exitoso');
    } catch (err) {
      console.error('Error en el login:', err);
      toast.error('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, isAuthenticated };
};
