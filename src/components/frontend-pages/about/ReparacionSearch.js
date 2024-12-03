import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Paper } from '@mui/material';
import axios from 'axios';

const ReparacionSearch = () => {
  const [reparacionId, setReparacionId] = useState('');
  const [reparacion, setReparacion] = useState(null);
  const [error, setError] = useState('');

  const buscarReparacion = async () => {
    if (!reparacionId) {
      setError('Por favor, ingresa un ID de reparación');
      return;
    }
    setError('');
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/reparaciones/${reparacionId}`);
      setReparacion(response.data);
    } catch (err) {
      console.error('Error al buscar la reparación:', err);
      setError('No se encontró la reparación con el ID proporcionado');
    }
  };

  const handlePagarConPayPal = () => {
    alert('Flujo de pago con PayPal simulado');
    // Aquí se podría integrar el SDK de PayPal para procesar el pago real
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        Buscar Reparación
      </Typography>
      <Box mb={3}>
        <TextField
          label="ID de Reparación"
          variant="outlined"
          value={reparacionId}
          onChange={(e) => setReparacionId(e.target.value)}
          fullWidth
          error={!!error}
          helperText={error}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={buscarReparacion}>
        Buscar
      </Button>

      {reparacion && (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
          <Typography variant="h5" mb={2}>
            Detalles de la Reparación
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Recepción:</strong> {`${reparacion.recepcion.nombre} ${reparacion.recepcion.apellido}`}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Técnico:</strong> {reparacion.tecnico ? `${reparacion.tecnico.nombre} ${reparacion.tecnico.apellido}` : 'No asignado'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Cliente:</strong> {`${reparacion.cliente.firstName} ${reparacion.cliente.lastName}`}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Teléfono:</strong> {reparacion.cliente.phone}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Marca:</strong> {reparacion.marca.marca}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Modelo:</strong> {reparacion.modelo}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Fecha de Ingreso:</strong> {new Date(reparacion.fechaIngreso).toLocaleDateString()}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Estatus:</strong> {reparacion.estatus}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Cotización:</strong> ${reparacion.cotizacion}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><strong>Descripción:</strong> {reparacion.descripcion}</Typography>
            </Grid>
            <Grid item xs={12}>
  <Typography>
    <strong>Fallas:</strong> 
    {reparacion.fallas && reparacion.fallas.length > 0 
      ? reparacion.fallas.map((falla, index) => (
          <span key={index}>{falla.falla}{index < reparacion.fallas.length - 1 ? ', ' : ''}</span>
        ))
      : 'No especificado'}
  </Typography>
</Grid>

          </Grid>
          <Box mt={3}>
            <Button variant="contained" color="success" onClick={handlePagarConPayPal}>
              Pagar con PayPal
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ReparacionSearch;
