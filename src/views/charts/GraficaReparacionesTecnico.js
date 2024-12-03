import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Chart from 'react-apexcharts';
import { getReparacionesPorTecnico } from 'src/services/reparacionService';

const GraficaReparacionesTecnico = () => {
  const [rangoFechas, setRangoFechas] = useState([null, null]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [seriesData, setSeriesData] = useState([{ name: 'Reparaciones', data: [] }]);
  const [totalReparaciones, setTotalReparaciones] = useState(0);

  const actualizarGrafica = async () => {
    if (!rangoFechas[0] || !rangoFechas[1]) {
      return;
    }

    try {
      const response = await getReparacionesPorTecnico(
        rangoFechas[0].toISOString().split('T')[0],
        rangoFechas[1].toISOString().split('T')[0]
      );

      const categories = response.data.map(
        (item) => `${item._id.nombre} ${item._id.apellido}`
      ); // Nombres de los técnicos
      const series = response.data.map((item) => item.total); // Totales de reparaciones

      setCategoriesData(categories);
      setSeriesData([{ name: 'Reparaciones', data: series }]);

      // Calcular el total de reparaciones
      const total = series.reduce((acc, curr) => acc + curr, 0);
      setTotalReparaciones(total);
    } catch (error) {
      console.error('Error al actualizar la gráfica:', error);
    }
  };

  // Actualizar gráfica cada vez que cambie el rango de fechas
  useEffect(() => {
    actualizarGrafica();
  }, [rangoFechas]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Reparaciones por Técnico
      </Typography>
      <Grid container spacing={3} alignItems="center">
        {/* Rango de fechas */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Fecha Inicio</Typography>
            <DesktopDatePicker
              label="Fecha Inicio"
              inputFormat="YYYY-MM-DD"
              value={rangoFechas[0]}
              onChange={(newValue) => setRangoFechas([newValue, rangoFechas[1]])}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Fecha Fin</Typography>
            <DesktopDatePicker
              label="Fecha Fin"
              inputFormat="YYYY-MM-DD"
              value={rangoFechas[1]}
              onChange={(newValue) => setRangoFechas([rangoFechas[0], newValue])}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
        </LocalizationProvider>
      </Grid>

      {/* Gráfica */}
      <Chart
        options={{
          chart: {
            id: 'reparaciones-por-tecnico',
            toolbar: { show: true },
          },
          xaxis: {
            categories: categoriesData,
            title: { text: 'Técnicos' },
          },
          yaxis: {
            title: { text: 'Cantidad de Reparaciones' },
          },
          colors: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A2', '#A233FF'], // Colores personalizados
          plotOptions: {
            bar: {
              distributed: true, // Colores diferentes por técnico
            },
          },
          stroke: { curve: 'smooth' },
        }}
        series={seriesData}
        type="bar"
        height={400}
      />

      {/* Total de reparaciones */}
      <Typography variant="h6" align="center" style={{ marginTop: '1rem' }}>
        Total de reparaciones realizadas: {totalReparaciones}
      </Typography>
    </div>
  );
};

export default GraficaReparacionesTecnico;
