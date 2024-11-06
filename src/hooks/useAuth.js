import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService'; // Importar la función desde authService.js
import { useDispatch } from 'react-redux';
import { setUser } from '../store/apps/userProfile/UserProfileSlice'; // Ajusta la ruta según tu proyecto

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Inicializar useDispatch

  const login = async (user, password) => {
    setLoading(true);
    try {
      const response = await loginUser(user, password);
      if (response.status === 200) {
        toast.success('Inicio de sesión exitoso');
        const userData = response.data; // Obtén todos los datos del usuario desde la respuesta

        // Despachar la acción para guardar al usuario en Redux
        dispatch(setUser(userData));

        // Redirigir según el departamento
        switch (userData.department) {
          case 'admin':
            navigate('/dashboards/ecommerce');
            break;
          case 'tecnico':
            navigate('/dashboards/modern');
            break;
          case 'recepcion':
            navigate('/recepcion');
            break;
          default:
            navigate('/'); // Redirigir a una ruta por defecto si el departamento no coincide
            break;
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error('Contraseña incorrecta');
      } else if (err.response && err.response.status === 404) {
        toast.error('Usuario no encontrado');
      } else {
        toast.error('Error al iniciar sesión. Por favor, intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
