// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Grid, Typography, MenuItem, Avatar } from '@mui/material';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';

const StatusCard = ({ onChange }) => {
  const [status, setStatus] = useState('Publicado'); // Estado inicial como cadena

  const handleChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    onChange(newStatus); // Notifica al componente padre con la cadena 'Publicado' o 'Oculto'
  };

  return (
    <Box p={3}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h5">Estado</Typography>

        <Avatar
          sx={{
            backgroundColor:
              status === 'Publicado'
                ? 'primary.main'
                : status === 'Oculto'
                ? 'error.main'
                : 'error.main',
            '& svg': { display: 'none' },
            width: 15,
            height: 15,
          }}
        ></Avatar>
      </Box>

      <Grid container mt={3}>
        <Grid item xs={12}>
          <CustomSelect value={status} onChange={handleChange} fullWidth>
            <MenuItem value="Publicado">Publicado</MenuItem>
            <MenuItem value="Oculto">Oculto</MenuItem>
          </CustomSelect>
          <Typography variant="body2">Selecciona si quieres que el producto aparezca en tienda.</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

// Agregar propTypes para validar las props
StatusCard.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default StatusCard;
