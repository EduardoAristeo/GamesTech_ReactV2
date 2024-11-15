<<<<<<< HEAD

import React, { useState } from 'react';
=======
// PricingCard.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
>>>>>>> 1479dc6 (Revert "Revert "solo me falta la categoria y la imagen en la pagina de productEdit"")
import Box from '@mui/material/Box';
import { Typography, FormControlLabel, RadioGroup, Stack, useTheme } from '@mui/material';
import { Grid } from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
<<<<<<< HEAD
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import { MenuItem } from '@mui/material';
import CustomRadio from 'src/components/forms/theme-elements/CustomRadio';
import CustomSlider from 'src/components/forms/theme-elements/CustomSlider';

const PricingCard = () => {
  const theme = useTheme();

  const [age, setAge] = React.useState('1');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [selectedValue, setSelectedValue] = useState('percentage');

  const handleValue = (event) => {
    setSelectedValue(event.target.value);
  };

  const [value3, setValue3] = React.useState(30);
  const handleChange6 = (event, newValue) => {
    setValue3(newValue);
  };
=======
import { useParams } from 'react-router-dom'; // Si usas React Router
import { getProductById } from '../../../../services/productService';

const PricingCard = () => {
  const { id } = useParams(); // Obtener el ID desde la URL
  const [product, setProduct] = useState(null);
  const [cost, setCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0); // Agregar estado para el precio final

  // Hacer la llamada a la API para obtener los datos del producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id); // Usar el servicio para obtener los datos
        setProduct(data); // Guardar los datos del producto en el estado
        setCost(data.cost); // Inicializar el costo
        setDiscount(data.discount || 0); // Inicializar el descuento
        setStock(data.stock); // Inicializar el stock
        setFinalPrice(data.cost - (data.discount || 0)); // Calcular el precio final al inicio
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Si aún no se han cargado los datos del producto, muestra un mensaje de carga
  if (!product) {
    return <div>Loading...</div>;
  }

  // Calcular el precio final (si hay descuento) o usar el valor del estado finalPrice
  const handleCostChange = (event) => {
    const newCost = Number(event.target.value);
    setCost(newCost);
    setFinalPrice(newCost - discount); // Recalcular el precio final
  };

  const handleDiscountChange = (event) => {
    const newDiscount = Number(event.target.value);
    setDiscount(newDiscount);
    setFinalPrice(cost - newDiscount); // Recalcular el precio final
  };

  const handleStockChange = (event) => setStock(Number(event.target.value));
>>>>>>> 1479dc6 (Revert "Revert "solo me falta la categoria y la imagen en la pagina de productEdit"")

  return (
    <Box p={3}>
      <Typography variant="h5" mb={3}>
        Pricing
      </Typography>

      <Grid container spacing={3}>
        {/* Campo 1: Precio de costo */}
        <Grid item xs={12}>
<<<<<<< HEAD
          <CustomFormLabel htmlFor="p_price" sx={{ mt: 0 }}>
            Base Price{' '}
=======
          <CustomFormLabel htmlFor="p_cost" sx={{ mt: 0 }}>
            Costo{' '}
>>>>>>> 1479dc6 (Revert "Revert "solo me falta la categoria y la imagen en la pagina de productEdit"")
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
          <CustomTextField
            id="p_cost"
            placeholder="Product Cost"
            value={cost} // Mostrar el costo editable
            onChange={handleCostChange} // Manejar el cambio en el campo
            fullWidth
          />
          <Typography variant="body2">El costo del producto.</Typography>
        </Grid>
<<<<<<< HEAD
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="p_price" sx={{ mt: 0 }}>
            Discount Type{' '}
=======

        {/* Campo 2: Descuento */}
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="p_discount" sx={{ mt: 0 }}>
            Descuento{' '}
>>>>>>> 1479dc6 (Revert "Revert "solo me falta la categoria y la imagen en la pagina de productEdit"")
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
<<<<<<< HEAD
          <RadioGroup
            row
            aria-labelledby="demo-form-control-label-placement"
            name="position"
            value={selectedValue}
            onChange={handleValue}
          >
            <Stack direction="row" spacing={3} width="100%" useFlexGap flexWrap="wrap">
              <Box
                px={2}
                py={1}
                flexGrow={1}
                sx={{
                  border: `1px dashed ${theme.palette.divider}`,
                  textAlign: 'center',
                }}
              >
                <FormControlLabel
                  value="no_discount"
                  control={<CustomRadio />}
                  label="No Discount"
                />
              </Box>
              <Box
                px={2}
                py={1}
                flexGrow={1}
                sx={{
                  border: `1px dashed ${theme.palette.divider}`,
                  textAlign: 'center',
                }}
              >
                <FormControlLabel
                  value="percentage"
                  control={<CustomRadio />}
                  label="Percentage %"
                />
              </Box>
              <Box
                px={2}
                py={1}
                flexGrow={1}
                sx={{
                  border: `1px dashed ${theme.palette.divider}`,
                  textAlign: 'center',
                }}
              >
                <FormControlLabel value="fixed" control={<CustomRadio />} label="Fixed Price" />
              </Box>
            </Stack>
          </RadioGroup>

          {selectedValue === 'no_discount' && null}

          {selectedValue === 'percentage' && (
            <>
              <CustomFormLabel>
                Set Discount Percentage{' '}
                <Typography color="error.main" component="span">
                  *
                </Typography>
              </CustomFormLabel>
              <CustomSlider aria-label="Volume" value={value3} onChange={handleChange6} />
              <Typography variant="body2">
                Set a percentage discount to be applied on this product.
              </Typography>
            </>
          )}

          {selectedValue === 'fixed' && (
            <>
              <CustomFormLabel htmlFor="p_fixed">
                Fixed Discounted Price{' '}
                <Typography color="error.main" component="span">
                  *
                </Typography>
              </CustomFormLabel>
              <CustomTextField id="p_fixed" placeholder="Discounted Price" fullWidth />
              <Typography variant="body2">
                Set the discounted product price. The product will be reduced at the determined
                fixed price.
              </Typography>
            </>
          )}
        </Grid>
        <Grid item xs={12} lg={6}>
          <CustomFormLabel htmlFor="p_tax" sx={{ mt: 0 }}>
            Tax Class{' '}
=======
          <CustomTextField
            id="p_discount"
            placeholder="Discount Price"
            value={discount} // Mostrar el descuento editable
            onChange={handleDiscountChange} // Manejar el cambio en el campo
            fullWidth
          />
          <Typography variant="body2">Descuento aplicado al producto.</Typography>
        </Grid>

        {/* Campo 3: Precio final */}
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="p_final_price" sx={{ mt: 0 }}>
            Precio Final{' '}
>>>>>>> 1479dc6 (Revert "Revert "solo me falta la categoria y la imagen en la pagina de productEdit"")
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
<<<<<<< HEAD
          <CustomSelect id="p_tax" value={age} onChange={handleChange} fullWidth>
            <MenuItem value={0}>Select an option</MenuItem>
            <MenuItem value={1}>Tax Free</MenuItem>
            <MenuItem value={2}>Taxable Goods</MenuItem>
            <MenuItem value={3}>Downloadable Products</MenuItem>
          </CustomSelect>
          <Typography variant="body2">Set the product tax class.</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <CustomFormLabel htmlFor="p_vat" sx={{ mt: 0 }}>
            VAT Amount (%){' '}
=======
          <CustomTextField
            id="p_final_price"
            placeholder="Final Price"
            value={finalPrice} // Mostrar el precio final editable
            onChange={(e) => setFinalPrice(Number(e.target.value))} // Permitir que el usuario cambie el precio final directamente
            fullWidth
          />
          <Typography variant="body2">Precio final después del descuento.</Typography>
        </Grid>

        {/* Campo 4: Stock */}
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="p_stock" sx={{ mt: 0 }}>
            Stock{' '}
>>>>>>> 1479dc6 (Revert "Revert "solo me falta la categoria y la imagen en la pagina de productEdit"")
            <Typography color="error.main" component="span">
              *
            </Typography>
          </CustomFormLabel>
<<<<<<< HEAD
          <CustomTextField id="p_vat" fullWidth value="40" />
          <Typography variant="body2">Set the product VAT about.</Typography>
=======
          <CustomTextField
            id="p_stock"
            placeholder="Stock Available"
            value={stock} // Mostrar el stock editable
            onChange={handleStockChange} // Manejar el cambio en el campo
            fullWidth
          />
          <Typography variant="body2">Cantidad disponible del producto.</Typography>
>>>>>>> 1479dc6 (Revert "Revert "solo me falta la categoria y la imagen en la pagina de productEdit"")
        </Grid>
      </Grid>
    </Box>
  );
};

export default PricingCard;
