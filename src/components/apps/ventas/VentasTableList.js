// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  IconButton,
  Button,
  Modal,
} from '@mui/material';
import { IconEye, IconPrinter, IconTrash } from '@tabler/icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVentas, deleteVenta } from 'src/store/apps/ventas/VentaSlice';
import axios from 'axios';
import VentaDetallesDialog from './VentaDetallesDialog';
import LogoGamesTech from 'src/assets/images/iconos/logo_negro.png';

const VentasTableList = () => {
  const dispatch = useDispatch();

  // Estado local para paginación, modal y ticket
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loadingDetalles, setLoadingDetalles] = useState(false);
  const [selectedVentaDetalles, setSelectedVentaDetalles] = useState([]);
  const [ticketVenta, setTicketVenta] = useState(null);
  const [ticketDetalles, setTicketDetalles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const ticketRef = useRef();

  // Estado global desde Redux
  const { ventas, loading, error } = useSelector((state) => state.ventas);

  useEffect(() => {
    dispatch(fetchVentas());
  }, [dispatch]);

  // Función para abrir el modal de detalles
  const handleDialogOpen = async (ventaId) => {
    setLoadingDetalles(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/ventas/${ventaId}/detalles`);
      setSelectedVentaDetalles(response.data);
      setDialogOpen(true);
    } catch (err) {
      console.error('Error al cargar los detalles de la venta:', err);
    } finally {
      setLoadingDetalles(false);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedVentaDetalles([]);
  };

  // Función para generar ticket
  const handleGenerateTicket = async (venta) => {
    setLoadingDetalles(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/ventas/${venta._id}/detalles`);
      setTicketVenta(venta);
      setTicketDetalles(response.data);
      setModalOpen(true);
    } catch (err) {
      console.error('Error al generar el ticket:', err);
    } finally {
      setLoadingDetalles(false);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank'); // Abrir nueva ventana
    const ticketContent = ticketRef.current.innerHTML; // Obtener el contenido del ticket
    const styles = Array.from(document.styleSheets) // Obtener estilos de la página actual
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join('\n');
        } catch (e) {
          console.error('Error al cargar estilos:', e);
          return '';
        }
      })
      .join('\n');

    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Imprimir Ticket</title>
            <style>
              ${styles} /* Insertar estilos globales */
              body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .ticket {
                width: 300px; /* Ancho del ticket */
                font-size: 14px; /* Tamaño de fuente global */
                line-height: 1.2; /* Espaciado entre líneas */
                padding: 10px;
                border: 1px solid transparent;
                box-sizing: border-box;
              }
              img {
                max-width: 100%;
                height: auto;
              }
              .ticket h5,
              .ticket h6,
              .ticket p {
                margin: 0;
                padding: 0;
              }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            <div class="ticket">${ticketContent}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const Ticket = () => (
    <Box ref={ticketRef} className="ticket">
      <Box textAlign="center" mb={1}>
        <img src={LogoGamesTech} alt="Logo" style={{ width: '90px', height: '90px' }} />
      </Box>
      <Typography variant="h5" textAlign="center" sx={{ fontFamily: 'Arial', lineHeight: '1' }}>
        <strong>GamesTech</strong>
      </Typography>
      <Typography variant="h6" textAlign="center" sx={{ fontFamily: 'Arial', lineHeight: '1' }}>
        <strong>Celaya</strong>
      </Typography>
      <Typography pt={1} textAlign="center" sx={{ fontFamily: 'Arial', fontSize: '8px', lineHeight: '1' }}>
        Sucursal Celaya - Av. Alameda #516B Colonia Alameda Celaya, GTO. 411-144-0579
      </Typography>
      <Typography pt={1} variant="subtitle2" textAlign="center" sx={{ fontFamily: 'Arial', lineHeight: '1' }}>
        <strong>Ticket de Venta</strong>
      </Typography>
      <Typography textAlign="center" sx={{ fontFamily: 'Arial', fontSize: '10px', lineHeight: '1' }}>Fecha: {ticketVenta.fecha}</Typography>
      <Typography textAlign="center" sx={{ fontFamily: 'Arial', fontSize: '10px', lineHeight: '1', mt: 1 }}>Método de Pago: {ticketVenta.metodo_pago.toUpperCase()}</Typography>
      <hr />
      {ticketDetalles.map((detalle, index) => (
        <Box key={index} sx={{ marginBottom: '10px' }}>
          <Typography textAlign="center" sx={{ fontFamily: 'Arial', fontSize: '12px', lineHeight: '1' }}>
            {index + 1}. {detalle.producto_id.product} x {detalle.cantidad} = ${detalle.precio_unitario.toFixed(2)}
          </Typography>
          {detalle.descuento > 0 && (
           <Typography textAlign="center" sx={{ fontFamily: 'Arial', fontSize: '10px', lineHeight: '1', color: 'green' }}>
              Descuento aplicado: {detalle.descuento}%
            </Typography>
          )}
          <Typography variant="subtitle2" textAlign="center" sx={{ fontFamily: 'Arial', lineHeight: '1' }}>Subtotal: ${detalle.subtotal.toFixed(2)}</Typography>
        </Box>
      ))}
      <hr />
      <Typography variant="subtitle2" textAlign="center" sx={{ fontFamily: 'Arial', lineHeight: '1' }}>Total: ${ticketVenta.total.toFixed(2)}</Typography>
      {/* Políticas de garantía */}
      <Typography pt={1} textAlign="center" sx={{ fontFamily: 'Arial', fontSize: '8px', lineHeight: '1' }}>
        Políticas de garantía
      </Typography>
      <Typography textAlign="justify" sx={{ fontFamily: 'Arial', fontSize: '8px', lineHeight: '1' }}>
        Revisar su producto antes de salir de la tienda, en caso de que su producto falle en el tiempo de garantía es
        necesario traer su ticket de compra así como el producto en su empaque original en buen estado, no hay garantía
        en productos mojados, rotos, golpeados o con daño físico.
      </Typography>
      <Typography pt={1} variant="subtitle2" textAlign="center" sx={{ fontFamily: 'Arial', lineHeight: '1' }}>
        ¡Gracias por su compra, eres el/la mejor! 😊
      </Typography>
    </Box>
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleDeleteVenta = (ventaId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta venta?');
    if (confirmDelete) {
      dispatch(deleteVenta(ventaId));
    }
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) return <Typography>Cargando ventas...</Typography>;
  if (error) return <Typography>Error al cargar ventas: {error}</Typography>;

  return (
    <Box>
      <Paper variant="outlined">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID Venta</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ventas
              .slice()
              .sort((a, b) => {
                const dateA = new Date(`${a.fecha}T${a.hora}`); // Combina fecha y hora si están separadas
                const dateB = new Date(`${b.fecha}T${b.hora}`);
                return dateB - dateA; // Ordenar de más reciente a más antiguo
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((venta) => (
                <TableRow key={venta._id}>
                  <TableCell>{venta._id}</TableCell>
                  <TableCell>{venta.usuario_id.nombre}</TableCell>
                  <TableCell>{venta.fecha}</TableCell>
                  <TableCell>${venta.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Tooltip title="Ver Detalles">
                      <IconButton onClick={() => handleDialogOpen(venta._id)}>
                        <IconEye />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Generar Ticket">
                      <IconButton onClick={() => handleGenerateTicket(venta)}>
                        <IconPrinter />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar Venta">
                        <IconButton onClick={() => handleDeleteVenta(venta._id)} color="error">
                          <IconTrash />
                        </IconButton>
                      </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={ventas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <VentaDetallesDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        detalles={selectedVentaDetalles}
        loading={loadingDetalles}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ width: '300px', margin: '50px auto', backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
          {ticketVenta && <Ticket />}
          <Button variant="contained" color="primary" fullWidth onClick={handlePrint}>
            Imprimir Ticket
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default VentasTableList;
