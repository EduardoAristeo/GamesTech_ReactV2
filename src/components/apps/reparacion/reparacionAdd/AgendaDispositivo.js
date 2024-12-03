// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import PatternLock from 'react-pattern-lock'; // Librería para patrón de Android
import dayjs from 'dayjs'; // Importa la librería dayjs

const AdditionalDetails = ({ value, onChange }) => {
  const [selectedDate, setSelectedDate] = useState(value.fechaDiagnostico || null);
  const [selectedTime, setSelectedTime] = useState(value.horaDiagnostico || null);
  const [passwordType, setPasswordType] = useState(value.password?.tipo || ''); // Tipo de contraseña
  const [pattern, setPattern] = useState([]); // Para el patrón

  const handleDateChange = (newValue) => {
    // Convierte el valor de la fecha a string
    const fechaStr = newValue ? newValue.toISOString() : '';
    setSelectedDate(fechaStr);
    onChange('fechaDiagnostico', fechaStr); // Pasamos el string a 'onChange'
  };
  

  const handleTimeChange = (newValue) => {
    if (newValue) {
      const horaStr = newValue.format('hh:mm A'); // Conviértelo a formato de cadena
      setSelectedTime(horaStr);
      onChange('horaDiagnostico', horaStr); // Pasa la hora formateada como string
    }
  };
  
  const handlePasswordTypeChange = (event) => {
    const tipo = event.target.value;
    setPasswordType(tipo);

    // Limpiar la contraseña cuando cambia el tipo
    onChange('password', { tipo, valor: '' });
  };

  const handlePatternChange = (newPattern) => {
    setPattern(newPattern);
    onChange('password', { ...value.password, tipo: 'patron', valor: JSON.stringify(newPattern) });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box p={3}>
        <Typography variant="h5">Datos programados</Typography>
        <Grid container spacing={2} mt={3}>
          {/* Fecha de diagnóstico */}
          <Grid item xs={12} md={12}>
            <Typography variant="subtitle1" gutterBottom>
              Fecha de diagnóstico
            </Typography>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          {/* Hora de diagnóstico */}
          <Grid item xs={12} md={12}>
            <Typography variant="subtitle1" gutterBottom>
              Hora de diagnóstico
            </Typography>
            <TimePicker
              value={selectedTime ? dayjs(selectedTime, 'hh:mm A') : null} // Conviértelo de nuevo a Dayjs si es necesario
              onChange={handleTimeChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          {/* Campo para cotización */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Cotización
            </Typography>
            <TextField
              fullWidth
              type="number"
              placeholder="Cotización del diagnóstico"
              value={value.cotizacion || ''}
              onChange={(e) => onChange('cotizacion', parseFloat(e.target.value) || 0)}
            />
          </Grid>

          {/* Campo para adelanto */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Adelanto
            </Typography>
            <TextField
              fullWidth
              type="number"
              placeholder="Adelanto proporcionado por el cliente"
              value={value.adelanto || ''}
              onChange={(e) => onChange('adelanto', parseFloat(e.target.value) || 0)}
            />
          </Grid>

          {/* Entrada condicional para contraseña */}
          <Grid item xs={12}>
            {/* Selección de tipo de contraseña */}
            <FormControl fullWidth>
              <InputLabel id="passwordTypeLabel">Tipo de Contraseña</InputLabel>
              <Select
                labelId="passwordTypeLabel"
                value={passwordType}
                onChange={handlePasswordTypeChange}
              >
                <MenuItem value="digitos">Dígitos</MenuItem>
                <MenuItem value="texto">Texto</MenuItem>
                <MenuItem value="patron">Patrón</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Mostrar el campo de contraseña según el tipo */}
          <Grid item xs={12}>
            {passwordType === 'digitos' && (
              <TextField
                fullWidth
                type="number"
                placeholder="Ejemplo: 1234"
                value={value.password?.valor || ''}
                onChange={(e) =>
                  onChange('password', { ...value.password, valor: e.target.value })
                }
              />
            )}

            {passwordType === 'texto' && (
              <TextField
                fullWidth
                placeholder="Ejemplo: MiContraseña123"
                value={value.password?.valor || ''}
                onChange={(e) =>
                  onChange('password', { ...value.password, valor: e.target.value })
                }
              />
            )}

            {passwordType === 'patron' && (
              <Box mt={3} display="flex" justifyContent="center">
                <PatternLock
                  width={300}
                  size={3} // Tamaño de la cuadrícula
                  path={pattern}
                  onChange={handlePatternChange}
                  connectorThickness={4} // Grosor de las líneas de conexión
                  circleSize={15} // Tamaño de los círculos
                  style={{
                    backgroundColor: "#b9cafc", // Fondo del patrón
                    borderRadius: "30px", // Bordes redondeados del patrón
                  }}
                  pointActiveSize={50} // Tamaño del punto activo
                  pointStyle={(index, isActive) => ({
                    backgroundColor: isActive ? "#5d87ff" : "#ccc", // Color de los puntos activos e inactivos
                    border: "2px solid #5d87ff", // Borde de los puntos
                    borderRadius: "50%", // Puntos redondeados
                  })}
                  connectorStyle={{
                    stroke: "#5d87ff", // Color de las líneas
                    strokeWidth: 4, // Grosor de las líneas
                  }}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

AdditionalDetails.propTypes = {
  value: PropTypes.shape({
    fechaDiagnostico: PropTypes.string,
    horaDiagnostico: PropTypes.string,
    cotizacion: PropTypes.number,
    adelanto: PropTypes.number,
    password: PropTypes.shape({
      tipo: PropTypes.string,
      valor: PropTypes.string,
    }),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AdditionalDetails;
