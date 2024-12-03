import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Autocomplete,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import { getClients, addCliente } from 'src/services/clientService'; // Servicios de cliente

const ClientDetails = ({ onClientSelected }) => {
  const [clients, setClients] = useState([]); // Lista de clientes obtenida de la base de datos
  const [selectedClient, setSelectedClient] = useState(null); // Cliente seleccionado
  const [clientData, setClientData] = useState({
    firstName: '',
    secondName: '',
    lastName: '',
    secondLastName: '',
    phone: '',
    secondPhone: '',
  });
  const [clientMode, setClientMode] = useState('existing'); // Modo: 'existing' o 'new'

  // Obtener los clientes desde el backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        setClients(
          data.map((client) => ({
            id: client._id,
            label: `${client.firstName} ${client.lastName}`,
            ...client,
          }))
        );
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
      }
    };

    fetchClients();
  }, []);

  const handleClientChange = (event, newValue) => {
    if (newValue) {
      setSelectedClient(newValue);

      // Autocompletar campos con los datos del cliente existente
      setClientData({
        firstName: newValue.firstName || '',
        secondName: newValue.secondName || '',
        lastName: newValue.lastName || '',
        secondLastName: newValue.secondLastName || '',
        phone: newValue.phone || '',
        secondPhone: newValue.secondPhone || '',
      });

      // Notificar al componente padre el ID del cliente seleccionado
      onClientSelected(newValue.id);
    } else {
      setSelectedClient(null);

      // Limpiar los campos
      setClientData({
        firstName: '',
        secondName: '',
        lastName: '',
        secondLastName: '',
        phone: '',
        secondPhone: '',
      });

      // Notificar al componente padre que no hay cliente seleccionado
      onClientSelected(null);
    }
  };

  const handleInputChange = (field, value) => {
    setClientData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddNewClient = async () => {
    try {
      const newClient = await addCliente(clientData);

      // Notificar al componente padre el ID del cliente recién creado
      onClientSelected(newClient._id);

      alert('Cliente registrado exitosamente.');
    } catch (error) {
      console.error('Error al agregar el cliente:', error);
      alert('Error al agregar el cliente.');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5">Detalles del Cliente</Typography>
      <Grid container spacing={2} mt={3}>
        {/* Selección del modo de cliente */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Seleccione el tipo de cliente
          </Typography>
          <Select
            fullWidth
            value={clientMode}
            onChange={(e) => setClientMode(e.target.value)}
          >
            <MenuItem value="existing">Cliente existente</MenuItem>
            <MenuItem value="new">Cliente nuevo</MenuItem>
          </Select>
        </Grid>

        {/* Modo: Cliente existente */}
        {clientMode === 'existing' && (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Buscar Cliente
              </Typography>
              <Autocomplete
                fullWidth
                options={clients}
                getOptionLabel={(option) => option.label}
                value={selectedClient}
                onChange={handleClientChange}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Busca un cliente por nombre"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          </>
        )}

        {/* Modo: Cliente nuevo */}
        {clientMode === 'new' && (
          <>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Primer Nombre
              </Typography>
              <TextField
                fullWidth
                placeholder="Primer nombre"
                value={clientData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Segundo Nombre
              </Typography>
              <TextField
                fullWidth
                placeholder="Segundo nombre"
                value={clientData.secondName}
                onChange={(e) => handleInputChange('secondName', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Primer Apellido
              </Typography>
              <TextField
                fullWidth
                placeholder="Primer apellido"
                value={clientData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Segundo Apellido
              </Typography>
              <TextField
                fullWidth
                placeholder="Segundo apellido"
                value={clientData.secondLastName}
                onChange={(e) => handleInputChange('secondLastName', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Teléfono Principal
              </Typography>
              <TextField
                fullWidth
                placeholder="Teléfono principal"
                value={clientData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Teléfono Secundario
              </Typography>
              <TextField
                fullWidth
                placeholder="Teléfono secundario"
                value={clientData.secondPhone}
                onChange={(e) => handleInputChange('secondPhone', e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddNewClient}
              >
                Registrar Cliente Nuevo
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

ClientDetails.propTypes = {
  onClientSelected: PropTypes.func.isRequired, // Callback para manejar el cliente seleccionado
};

export default ClientDetails;
