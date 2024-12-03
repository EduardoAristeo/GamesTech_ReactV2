import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService'; // Importar la función desde authService.js
import { useDispatch } from 'react-redux';
import { setUser } from '../store/apps/userProfile/UserProfileSlice'; // Ajusta la ruta según tu proyecto

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const login = async (user, password) => {
    setLoading(true);
    try {
      const response = await loginUser(user, password);
      if (response.status === 200) {
        const { token, user: userData } = response.data;
        localStorage.setItem('token', token); // Almacena el token
        
        dispatch(setUser(userData)); // Actualiza el estado de Redux con los datos del usuario
  
        toast.success('Inicio de sesión exitoso');
        
        // Redirección basada en el departamento
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
            navigate('/');
            break;
        }
      }
    } catch (err) {
      console.error('Error en el login:', err);
      toast.error('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };
  
  

  return { login, loading };
};
