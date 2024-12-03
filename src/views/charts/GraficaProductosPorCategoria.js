import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Grid, Typography, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getProductosPorCategoria } from 'src/services/saleService';

const GraficaProductosPorCategoria = () => {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const [startDate, setStartDate] = useState(null); // Estado inicial sin fecha
  const [endDate, setEndDate] = useState(null); // Estado inicial sin fecha
  const [totalVentas, setTotalVentas] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      const fetchData = async () => {
        try {
          const data = await getProductosPorCategoria(
            startDate.format('YYYY-MM-DD'),
            endDate.format('YYYY-MM-DD')
          );
          const categorias = data.map((item) => item._id);
          const totales = data.map((item) => item.totalVendidos);

          setLabels(categorias);
          setSeries(totales);
          setTotalVentas(totales.reduce((acc, curr) => acc + curr, 0)); // Sumar todas las ventas
        } catch (error) {
          console.error('Error al cargar datos de productos por categoría:', error);
        }
      };

      fetchData();
    }
  }, [startDate, endDate]);

  const options = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
    },
    labels: labels,
    legend: {
      show: true,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Ventas',
              formatter: () => `${totalVentas}`, // Muestra el total en el centro
            },
          },
        },
      },
    },
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Ventas por Categoría
      </Typography>
      <Grid container spacing={3} alignItems="center">
        {/* Fecha Inicio */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Fecha Inicio</Typography>
            <DesktopDatePicker
              label="Fecha Inicio"
              inputFormat="YYYY-MM-DD"
              value={startDate} // Mantén el valor como null inicialmente
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          {/* Fecha Fin */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Fecha Fin</Typography>
            <DesktopDatePicker
              label="Fecha Fin"
              inputFormat="YYYY-MM-DD"
              value={endDate} // Mantén el valor como null inicialmente
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
        </LocalizationProvider>
      </Grid>

      {/* Gráfica */}
      <Chart
        options={options}
        series={series}
        type="donut"
        height={400}
      />
    </div>
  );
};

export default GraficaProductosPorCategoria;
