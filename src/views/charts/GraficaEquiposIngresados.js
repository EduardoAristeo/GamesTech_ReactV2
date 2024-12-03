// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import TopCards from '../../components/dashboards/modern/TopCards_recepcion';
import Welcome from 'src/layouts/full/shared/welcome/Welcome';
import Chart from 'react-apexcharts';
import { getReparacionesPorFechaYMarca } from '../../../services/reparacionService'; // Importa el servicio que consulta los datos

const Modern = () => {
  const [chartData, setChartData] = useState({ series: [], labels: [], total: 0 });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await getReparacionesPorFechaYMarca(); // Llama a tu API
        const data = response.data;

        // Procesa los datos para la gráfica
        const labels = data.map((item) => item._id); // Nombres de marcas
        const series = data.map((item) => item.total); // Totales por marca
        const total = series.reduce((sum, value) => sum + value, 0); // Suma total de dispositivos ingresados

        setChartData({ labels, series, total });
      } catch (error) {
        console.error('Error al obtener datos de la gráfica:', error);
      }
    };

    fetchChartData();
  }, []);

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

  return (
    <Box>
      <h1>Recepción</h1>
      <Grid container spacing={3}>
        {/* TopCards */}
        <Grid item sm={12} lg={12}>
          <h2>Medidas</h2>
          <TopCards />
        </Grid>

        {/* Gráfica de dispositivos ingresados */}
        <Grid item sm={12} lg={12}>
          <Box sx={{ mt: 3 }}>
            <h2>Dispositivos Ingresados por Marca (Hoy)</h2>
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
