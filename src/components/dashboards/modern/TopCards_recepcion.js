import React, { useEffect, useState } from 'react';
import { Box, CardContent, Grid, Typography } from '@mui/material';
import { getReparaciones } from '../../../services/reparacionService';
import { getDetalleVentas } from '../../../services/saleService'; // Importar el nuevo servicio

import icon2 from '../../../assets/images/iconos/smartphone.png';
import icon3 from '../../../assets/images/iconos/case.png';
import icon4 from '../../../assets/images/iconos/store.png';
import icon5 from '../../../assets/images/iconos/fix.png';
import icon6 from '../../../assets/images/iconos/fix_done.png';
import icon7 from '../../../assets/images/iconos/fix_garantia.png';

const initialTopCards = [
  {
    icon: icon2,
    title: 'Dispositivos Ingresados',
    digits: '0',
    bgcolor: 'primary',
  },
  {
    icon: icon3,
    title: 'Accesorios vendidos',
    digits: '0',
    bgcolor: 'secondary',
  },
  {
    icon: icon4,
    title: 'Dispositivos vendidos',
    digits: '0',
    bgcolor: 'warning',
  },
  {
    icon: icon5,
    title: 'Dispositivos en reparación',
    digits: '0',
    bgcolor: 'primary',
  },
  {
    icon: icon6,
    title: 'Dispositivos listos para entrega',
    digits: '0',
    bgcolor: 'success',
  },
  {
    icon: icon7,
    title: 'Garantías pendientes',
    digits: '0',
    bgcolor: 'error',
  },
];

const TopCards = () => {
  const [topCards, setTopCards] = useState(initialTopCards);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener reparaciones
        const reparacionesResponse = await getReparaciones();
        const reparaciones = reparacionesResponse.data;

        if (!Array.isArray(reparaciones)) {
          throw new Error('La respuesta no contiene un arreglo de reparaciones.');
        }

        // Filtrar datos por `estatus`
        const ingresados = reparaciones.length; // Total de dispositivos ingresados
        const enReparacion = reparaciones.filter((r) => r.estatus === 'PENDIENTE').length;
        const listosParaEntrega = reparaciones.filter((r) => r.estatus === 'COMPLETADO').length;
        const garantiasPendientes = reparaciones.filter((r) => r.estatus === 'GARANTIA').length;
        const cancelados = reparaciones.filter((r) => r.estatus === 'CANCELADO').length;

        // Obtener detalles de ventas
        const detalleVentasResponse = await getDetalleVentas();
        const detalleVentas = detalleVentasResponse.data;

        if (!Array.isArray(detalleVentas)) {
          throw new Error('La respuesta no contiene un arreglo de detalles de ventas.');
        }

        // Calcular el total de productos vendidos
        const productosVendidos = detalleVentas.reduce((total, detalle) => total + detalle.cantidad, 0);

        // Actualizar valores de las tarjetas
        setTopCards((prevCards) =>
          prevCards.map((card, index) => {
            if (index === 0) card.digits = ingresados;
            if (index === 1) card.digits = productosVendidos; // Total de productos vendidos
            if (index === 2) card.digits = cancelados;
            if (index === 3) card.digits = enReparacion;
            if (index === 4) card.digits = listosParaEntrega;
            if (index === 5) card.digits = garantiasPendientes;
            return card;
          })
        );
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={3}>
      {topCards.map((topcard, i) => (
        <Grid item xs={12} sm={4} lg={2} key={i}>
          <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center" sx={{ borderRadius: 2, p: 2 }}>
            <CardContent>
              <img src={topcard.icon} alt={topcard.icon} width="50" />
              <Typography
                color={topcard.bgcolor + '.main'}
                mt={1}
                variant="subtitle1"
                fontWeight={600}
              >
                {topcard.title}
              </Typography>
              <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
