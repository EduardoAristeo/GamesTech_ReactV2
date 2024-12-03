import React, { useEffect, useState } from 'react';
import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import TopCards from '../../components/dashboards/modern/TopCards_recepcion';
import Welcome from 'src/layouts/full/shared/welcome/Welcome';
import Chart from 'react-apexcharts';
import { validateToken } from 'src/services/authService'; // Servicio para validar el token
import { setUser } from 'src/store/apps/userProfile/UserProfileSlice'; // Redux Slice para manejar usuario
import { getReparacionesPorFechaYMarca } from 'src/services/reparacionService.js';

const Modern = () => {
  const [chartData, setChartData] = useState({ series: [], labels: [], total: 0 });
  const [loading, setLoading] = useState(true); // Estado para manejo de carga
  const user = useSelector((state) => state.user.userProfile); // Obtener datos del usuario desde Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeUser = async () => {
      if (!user.id) {
        const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
        if (token) {
          try {
            const response = await validateToken(token); // Valida el token
            const { user: userData } = response.data;
            dispatch(setUser(userData)); // Guarda los datos del usuario en Redux
          } catch (error) {
            console.error('Error al validar el token:', error);
            localStorage.removeItem('token'); // Elimina el token si es inválido
          }
        }
      }
      setLoading(false); // Detiene el indicador de carga
    };

    initializeUser();

    const fetchChartData = async () => {
      try {
        const response = await getReparacionesPorFechaYMarca();
        const data = response.data;

        // Procesa los datos para la gráfica
        const labels = data.map((item) => item._id); // Nombres de marcas
        const series = data.map((item) => item.total); // Totales por marca
        const total = series.reduce((sum, value) => sum + value, 0); // Total de dispositivos ingresados

        setChartData({ labels, series, total });
      } catch (error) {
        console.error('Error al obtener datos de la gráfica:', error);
      }
    };

    fetchChartData();
  }, [user, dispatch]);

  const chartOptions = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
    },
    labels: chartData.labels,
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              formatter: () => `${chartData.total}`,
            },
          },
        },
      },
    },
    colors: ['#1E90FF', '#FF6347', '#32CD32', '#FFD700', '#8A2BE2'], // Colores personalizados
    legend: {
      show: true,
      position: 'bottom',
    },
    tooltip: {
      theme: 'dark',
    },
  };

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
    <Box>
      <h1>Recepción</h1>
      <Grid container spacing={3}>
        {/* Tarjetas de medidas */}
        <Grid item sm={12} lg={12}>
          <h2>Medidores</h2>
          <TopCards />
        </Grid>

        {/* Gráfica de dispositivos ingresados */}
        <Grid item sm={12} lg={12}>
          <Box sx={{ mt: 3 }}>
            <h2>Dispositivos ingresados hoy</h2>
            <Chart
              options={chartOptions}
              series={chartData.series}
              type="donut"
              height="350"
            />
          </Box>
        </Grid>
      </Grid>
      <Welcome />
    </Box>
  );
};

export default Modern;
