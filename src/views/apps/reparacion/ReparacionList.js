// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { validateToken } from 'src/services/authService'; // Servicio para validar el token
import { setUser } from 'src/store/apps/userProfile/UserProfileSlice'; // Redux Slice para manejar usuario
import ReparacionesTable from 'src/components/apps/reparacion/ReparacionTableList/ReparacionTableList'; // Tabla de reparaciones
import { Box, CircularProgress, Typography, CardContent } from '@mui/material';
import BlankCard from 'src/components/shared/BlankCard';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  { to: '/recepcion', title: 'Inicio' },
  { title: 'Lista' },
];

const ViewReparacionesList = () => {
  const [reparaciones, setReparaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.userProfile); // Obtener usuario desde Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeUser = async () => {
      if (!user.id) {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const response = await validateToken(token);
            const { user: userData } = response.data;
            dispatch(setUser(userData)); // Guardar usuario en Redux
          } catch (error) {
            console.error('Error al validar el token:', error);
            localStorage.removeItem('token'); // Eliminar token si es inválido
          }
        }
      }
    };

    const fetchReparaciones = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/reparaciones/tabla');
        setReparaciones(response.data.data);
      } catch (error) {
        console.error('Error al cargar reparaciones:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
    fetchReparaciones();
  }, [user, dispatch]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Cargando...
        </Typography>
      </Box>
    );
  }

  if (!user.id) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" color="error">
          Usuario no autenticado
        </Typography>
      </Box>
    );
  }

  return (
    <PageContainer title="Lista de reparaciones" description="this is Shop List page">
      <Breadcrumb title="Lista de reparaciones" items={BCrumb} />
      <BlankCard>
        <CardContent>
          <ReparacionesTable 
            data={reparaciones} 
            userId={user.id} // Pasar el ID del usuario logueado como prop
            fetchReparaciones={() => {
              // Función para refrescar las reparaciones
              const fetchReparaciones = async () => {
                try {
                  const response = await axios.get('http://localhost:4000/api/v1/reparaciones/tabla');
                  setReparaciones(response.data.data);
                } catch (error) {
                  console.error('Error al recargar reparaciones:', error);
                }
              };
              fetchReparaciones();
            }}
          />
        </CardContent>
      </BlankCard>
    </PageContainer>
  );
};

export default ViewReparacionesList;
