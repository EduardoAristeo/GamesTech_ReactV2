// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from 'react';
import { sum } from 'lodash';
import { Box, Stack, Typography, Button, Modal } from '@mui/material';
import AddToCart from '../productCart/AddToCart';
import { IconArrowBack } from '@tabler/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import HorizontalStepper from './HorizontalStepper';
import ThirdStep from './ThirdStep';
import FinalStep from './FinalStep';
import LogoGamesTech from 'src/assets/images/iconos/logo_negro.png';
import { clearCart } from '/src/store/apps/eCommerce/EcommerceSlice.js';

import { validateToken } from '/src/services/authService'; // Para validar el token
import { addSale } from '/src/services/saleService'; // Servicio para registrar la venta

const ProductCheckout = () => {
  const checkout = useSelector((state) => state.ecommerce.cart);

  const steps = ['Carrito', 'Pago'];
  const [activeStep, setActiveStep] = useState(0);
  const [showTicket, setShowTicket] = useState(false);
  const [metodoPago, setMetodoPago] = useState('efectivo'); // Estado para el método de pago
  const ticketRef = useRef();
  const [originalContent] = useState('');
  const dispatch = useDispatch(); // Hook para usar las acciones de Redux
  const navigate = useNavigate(); // Hook para navegación

  useEffect(() => {
    // Escuchar el evento onafterprint para restaurar el DOM
    const handleAfterPrint = () => {
      document.body.innerHTML = originalContent;
    };
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [originalContent]);

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleReset = () => setActiveStep(0);

  const subtotal = sum(checkout.map((product) => product.price * (product.qty || 1)));
  const totalWithDiscounts = sum(
    checkout.map((product) => {
      const discount = product.discount ? product.discount / 100 : 0;
      const discountedPrice = product.price - product.price * discount;
      return discountedPrice * (product.qty || 1);
    })
  );

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

  // Vaciar carrito y redirigir
  const handleCancel = () => {
    //dispatch(clearCart()); // Vaciar el carrito
    navigate('/apps/ecommerce/shop'); // Redirigir a la página de productos
  };

  const SaleSummary = () => (
    <Box mt={4} p={3} border="1px solid #e0e0e0" borderRadius="8px">
      <Typography variant="h6" gutterBottom>
        Resumen de venta
      </Typography>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="body1">Sub Total</Typography>
        <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="body1">Precio con descuentos</Typography>
        <Typography variant="body1" color="primary">
          ${totalWithDiscounts.toFixed(2)}
        </Typography>
      </Stack>
    </Box>
  );

  const handleGenerateSale = async () => {
    try {
      // Validar token
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Usuario no autenticado');
      const { data: userData } = await validateToken(token);

      // Preparar datos para la venta
      const saleData = prepareSaleData(userData.user.id);

      // Llamar a la API para registrar la venta
      console.log('Datos enviados a la API:', saleData);
      await addSale(saleData);

      // Limpiar carrito y mostrar éxito
      //dispatch(clearCart());
      setShowTicket(false);
      console.log('Venta registrada exitosamente');
    } catch (error) {
      console.log('Error al generar la venta:', error);
      console.log('No se pudo completar la venta. Intente nuevamente.');
    }
  };

  const prepareSaleData = (userId) => {
    return {
      userId,
      date: new Date().toISOString(),
      metodo_pago: metodoPago, // Cambiado a metodo_pago
      products: checkout.map((product) => {
        const discount = product.discount ? product.discount / 100 : 0;
        const discountedPrice = product.price - product.price * discount;
        const utility = (discountedPrice - product.cost) * product.qty;
        return {
          productId: product._id,
          quantity: product.qty || 1,
          price: product.price,
          discount: product.discount || 0,
          utility: utility.toFixed(2),
        };
      }),
      total: totalWithDiscounts.toFixed(2),
    };
  };

  const Ticket = () => (
    console.log('Productos en el carrito:', checkout),
    
    <Box ref={ticketRef} sx={{ width: '300px', lineHeight: '1.5', padding: '0px' }}>
      {/* Logo */}
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
      <Typography textAlign="center" sx={{ fontFamily: 'Arial', fontSize: '10px', lineHeight: '1' }}>
        Fecha: {new Date().toLocaleDateString()}
      </Typography>
      <Typography textAlign="center" sx={{ fontFamily: 'Arial', fontSize: '10px', lineHeight: '1', mt: 1 }}>
        Método de Pago: <strong>{metodoPago.toUpperCase()}</strong>
      </Typography>
  
      <Box pt={2}>
        {/* Lista de productos */}
        {checkout.map((product, index) => {
          const discount = product.discount ? product.discount / 100 : 0;
          const discountedPrice = product.price - product.price * discount;
          const lineTotal = discountedPrice * (product.qty || 1);
          const lineTotalWithoutDiscount = product.price * (product.qty || 1);
  
          return (
            <Box key={index} mb={0.5}>
              <Typography textAlign="center" sx={{ fontFamily: 'Arial', fontSize: '12px', lineHeight: '1' }}>
                {index + 1}. {product.product}
              </Typography>
              <Typography textAlign="center" sx={{ fontFamily: 'Arial', fontSize: '12px', lineHeight: '1' }}>
                {product.qty || 1} x ${product.price.toFixed(2)} = ${lineTotalWithoutDiscount.toFixed(2)}
              </Typography>
              {discount > 0 && (
                <Typography textAlign="center" sx={{ fontFamily: 'Arial', fontSize: '10px', lineHeight: '1', color: 'green' }}>
                  Descuento aplicado: ${lineTotalWithoutDiscount.toFixed(2)} - ${lineTotal.toFixed(2)}
                </Typography>
              )}
              <Typography textAlign="center" sx={{ fontFamily: 'Arial', fontSize: '12px', lineHeight: '1' }}>
                Total: ${lineTotal.toFixed(2)}
              </Typography>
              {/* Línea de separación */}
              <Typography textAlign="center" sx={{ fontFamily: 'Arial', fontSize: '12px', lineHeight: '1' }}>
                ------------------
              </Typography>
            </Box>
          );
        })}
      </Box>
  
      {/* Subtotal y total */}
      <Box borderTop="1px dashed #000" pt={2}>
        <Typography variant="subtitle2" textAlign="center" sx={{ fontFamily: 'Arial', lineHeight: '1' }}>
          Subtotal: ${subtotal.toFixed(2)}
        </Typography>
        <Typography variant="subtitle2" textAlign="center" sx={{ fontFamily: 'Arial', lineHeight: '1' }}>
          Total (c/desc): ${totalWithDiscounts.toFixed(2)}
        </Typography>
      </Box>
  
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
 
  
  return (
    <Box>
      <HorizontalStepper
        steps={steps}
        handleReset={handleReset}
        activeStep={activeStep}
        finalStep={<FinalStep />}
      >
        {activeStep === 0 ? (
          <>
            <Box my={3}>
              <AddToCart />
            </Box>
            {checkout.length > 0 && (
              <>
                <SaleSummary />
                <Stack direction="row" justifyContent="space-between" mt={4}>
                  <Button color="inherit" variant="contained" onClick={handleBack}>
                    Regresar
                  </Button>
                  <Button variant="contained" onClick={handleNext}>
                    Proceder al Pago
                  </Button>
                </Stack>
              </>
            )}
          </>
        ) : activeStep === 1 ? (
          <>
            <ThirdStep setPaymentMethod={setMetodoPago} />
            <SaleSummary />
            <Stack direction="row" justifyContent="space-between" mt={4}>
              <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
                <IconArrowBack /> Regresar
              </Button>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={async () => {
                  await handleGenerateSale(); // Registrar la venta
                  setShowTicket(true);
                  //dispatch(clearCart());
                }}
              >
                Generar Ticket
              </Button>
            </Stack>
          </>
        ) : null}
      </HorizontalStepper>

      {/* Modal para el ticket */}
      <Modal open={showTicket} onClose={() => setShowTicket(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            p: 2,
            borderRadius: '8px',
            boxShadow: 24,
            maxWidth: '300px',
          }}
        >
          <Ticket />
          <Stack direction="row" justifyContent="space-between" mt={3}>
            <Button
              variant="outlined"
              onClick={() => {setShowTicket(false), dispatch(clearCart()), handleCancel()} }
            >
              Salir
            </Button>
            <Button variant="contained" color="primary" onClick={handlePrint}>
              Imprimir
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductCheckout;
