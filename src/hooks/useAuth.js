import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService'; // Importar la función desde authService.js

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (user, password) => {
    setLoading(true);
    try {
      const response = await loginUser(user, password);
      if (response.status === 200) {
        toast.success('Inicio de sesión exitoso');
        const { department } = response.data;

        // Redirigir según el departamento
        switch (department) {
          case 'admin':
            navigate('/dashboards/ecommerce');
            break;
          case 'tecnico':
            navigate('/dashboards/modern');
            break;
          case 'recepcion':
            navigate('/apps/tickets');
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
