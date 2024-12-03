import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Paper,
  CircularProgress,
} from '@mui/material';

// eslint-disable-next-line react/prop-types
const VentaDetallesDialog = ({ open, onClose, detalles = [], loading }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Detalles de Venta</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              Productos Vendidos
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell align="center">Cantidad</TableCell>
                    <TableCell align="right">Precio Unitario</TableCell>
                    <TableCell align="right">Descuento</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell align="right">Utilidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detalles.length > 0 ? (
                    detalles.map((detalle) => (
                      <TableRow key={detalle._id}>
                        <TableCell>{detalle.producto_id?.product || 'Desconocido'}</TableCell>
                        <TableCell>{detalle.producto_id?.description || 'Sin descripción'}</TableCell>
                        <TableCell align="center">{detalle.cantidad || 0}</TableCell>
                        <TableCell align="right">${detalle.precio_unitario?.toFixed(2) || '0.00'}</TableCell>
                        <TableCell align="right">{detalle.descuento || 0}%</TableCell>
                        <TableCell align="right">${detalle.subtotal?.toFixed(2) || '0.00'}</TableCell>
                        <TableCell align="right">${detalle.utilidad?.toFixed(2) || '0.00'}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No hay detalles disponibles para esta venta.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VentaDetallesDialog;
