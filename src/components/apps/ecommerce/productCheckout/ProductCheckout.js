import React from 'react';
import { sum } from 'lodash';
import { Box, Stack, Typography, Button } from '@mui/material';
import AddToCart from '../productCart/AddToCart';
import { IconArrowBack } from '@tabler/icons';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import HorizontalStepper from './HorizontalStepper';
import FirstStep from './FirstStep';
import ThirdStep from './ThirdStep';
import FinalStep from './FinalStep';

const ProductCheckout = () => {
  const checkout = useSelector((state) => state.ecommerce.cart);
  const steps = ['Cart', 'Payment'];
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Calcular el total sin aplicar descuentos
  const subtotal = sum(checkout.map((product) => product.price * (product.qty || 1)));

  // Calcular el total aplicando los descuentos
  const totalWithDiscounts = sum(
    checkout.map((product) => {
      const discount = product.discount ? product.discount / 100 : 0;
      const discountedPrice = product.price - product.price * discount;
      return discountedPrice * (product.qty || 1);
    })
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Ticket de Venta', 20, 20);

    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text('Detalles de los productos:', 20, 40);

    let yOffset = 50;
    checkout.forEach((product, index) => {
      const discount = product.discount ? product.discount / 100 : 0;
      const discountedPrice = product.price - product.price * discount;
      const lineTotal = discountedPrice * (product.qty || 1);

      doc.text(
        `${index + 1}. ${product.product} - ${product.qty || 1} x $${discountedPrice.toFixed(2)} = $${lineTotal.toFixed(2)}`,
        20,
        yOffset
      );
      yOffset += 10;
    });

    doc.text(`Total: $${totalWithDiscounts.toFixed(2)}`, 20, yOffset + 10);
    doc.save('ticket.pdf');
  };

  return (
    <Box>
      <HorizontalStepper
        steps={steps}
        handleReset={handleReset}
        activeStep={activeStep}
        finalStep={<FinalStep />}
      >
        {/* ------------------------------------------- */}
        {/* Step1 - Cart */}
        {/* ------------------------------------------- */}
        {activeStep === 0 ? (
          <>
            <Box my={3}>
              <AddToCart />
            </Box>
            {checkout.length > 0 ? (
              <>
                {/* ------------------------------------------- */}
                {/* Cart Total */}
                {/* ------------------------------------------- */}
                <Box mt={4} p={3} border="1px solid #e0e0e0" borderRadius="8px">
                  <Typography variant="h6" gutterBottom>
                    Rsumen de venta
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" mb={2}>
                    <Typography variant="body1">Sub Total</Typography>
                    <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" mb={2}>
                    <Typography variant="body1">Precio con descuentos</Typography>
                    <Typography variant="body1" color="error">
                      ${totalWithDiscounts.toFixed(2)}
                    </Typography>
                  </Stack>
                </Box>
                <Stack direction={'row'} justifyContent="space-between" mt={4}>
                  <Button
                    color="secondary"
                    variant="contained"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button variant="contained" onClick={handleNext}>
                    Proceed to Payment
                  </Button>
                </Stack>
              </>
            ) : (
              ''
            )}
          </>
        ) : activeStep === 1 ? (
          <>
            {/* ------------------------------------------- */}
            {/* Step2 - Payment */}
            {/* ------------------------------------------- */}
            <ThirdStep />
            <Box mt={4} p={3} border="1px solid #e0e0e0" borderRadius="8px">
              <Typography variant="h6" gutterBottom>
                Order Summary
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
            <Stack direction={'row'} justifyContent="space-between" mt={4}>
              <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
                <IconArrowBack /> Back
              </Button>
              <Button onClick={generatePDF} size="large" variant="contained" color="primary">
                Complete Order & Generate Ticket
              </Button>
            </Stack>
          </>
        ) : null}
      </HorizontalStepper>
    </Box>
  );
};

export default ProductCheckout;
