// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Grid, Select, MenuItem, Typography, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Chart from 'react-apexcharts';
import { getProductosVendidosPorTiempo } from 'src/services/saleService';
import { getProducts } from 'src/services/productService';

const GraficaVentasTiempo = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [rangoFechas, setRangoFechas] = useState([null, null]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [seriesData, setSeriesData] = useState([{ name: 'Productos Vendidos', data: [] }]);
  const [totalVentas, setTotalVentas] = useState(0);

  // Cargar productos al iniciar
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await getProducts();
        setProductos(response);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    cargarProductos();
  }, []);

  // Actualizar gráfica
  const actualizarGrafica = async () => {
    if (!productoSeleccionado || !rangoFechas[0] || !rangoFechas[1]) {
      return;
    }

    try {
      const response = await getProductosVendidosPorTiempo(
        productoSeleccionado,
        rangoFechas[0].toISOString(),
        rangoFechas[1].toISOString(),
        'day' // Por defecto, usamos días
      );

      const categories = response.data.map((item) => item._id.split('T')[0]);
      const series = response.data.map((item) => item.totalProductosVendidos);

      setCategoriesData(categories);
      setSeriesData([{ name: 'Productos Vendidos', data: series }]);

      // Calcular el total de ventas
      const total = series.reduce((acc, curr) => acc + curr, 0);
      setTotalVentas(total);
    } catch (error) {
      console.error('Error al actualizar la gráfica:', error);
    }
  };

  // Actualizar gráfica cada vez que se selecciona un producto o rango de fechas
  useEffect(() => {
    actualizarGrafica();
  }, [productoSeleccionado, rangoFechas]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Ventas por Producto
      </Typography>
      <Grid container spacing={3} alignItems="center">
        {/* Selector de producto */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Seleccionar Producto</Typography>
          <Select
            fullWidth
            value={productoSeleccionado}
            onChange={(e) => setProductoSeleccionado(e.target.value)}
          >
            <MenuItem value="">Seleccione un producto</MenuItem>
            {productos.map((producto) => (
              <MenuItem key={producto._id} value={producto._id}>
                {producto.product}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* Rango de fechas */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1">Fecha Inicio</Typography>
            <DesktopDatePicker
              label="Fecha Inicio"
              inputFormat="YYYY-MM-DD"
              value={rangoFechas[0]}
              onChange={(newValue) => setRangoFechas([newValue, rangoFechas[1]])}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} md={4}>
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
            id: 'ventas-producto-tiempo',
            toolbar: { show: true },
          },
          xaxis: {
            categories: categoriesData,
            title: { text: 'Fecha' },
          },
          yaxis: {
            title: { text: 'Productos Vendidos' },
          },
          stroke: { curve: 'smooth' },
        }}
        series={seriesData}
        type="line"
        height={400}
      />

      {/* Total de ventas */}
      <Typography variant="h6" align="center" style={{ marginTop: '1rem' }}>
        Total de productos vendidos: {totalVentas}
      </Typography>
    </div>
  );
};

export default GraficaVentasTiempo;
