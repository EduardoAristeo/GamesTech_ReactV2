// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid, Stack } from '@mui/material';
import DatosDispositivo from 'src/components/apps/reparacion/reparacionAdd/DatosDispositivo';
import AgendaDispositivo from 'src/components/apps/reparacion/reparacionAdd/AgendaDispositivo';
import DatosCliente from 'src/components/apps/reparacion/reparacionAdd/DatosCliente';
import { addReparacion } from 'src/services/reparacionService'; // Servicio de reparación
import { validateToken } from 'src/services/authService'; // Servicio para validar el token
import { setUser } from 'src/store/apps/userProfile/UserProfileSlice'; // Redux Slice

const ReparacionAdd = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userProfile); // Obtener datos del usuario desde Redux

  const [formData, setFormData] = useState({
    // Datos del dispositivo
    marca: '',
    modelo: '',
    descripcion: '',
    fallas: [],
    sim: false,
    manipulado: false,
    mojado: false,
    apagado: false,
    pantallaRota: false,
    tapaRota: false,

    // Agenda
    fechaDiagnostico: null,
    horaDiagnostico: null,
    cotizacion: 0,
    adelanto: 0,

    // Datos del cliente
    cliente: '', // ID del cliente
    firstName: '',
    secondName: '',
    lastName: '',
    secondLastName: '',
    phone: '',
    secondPhone: '',

    // Contraseña
    password: {
      tipo: '',
      valor: '',
    },
  });

  // Cargar los datos del usuario al montar el componente
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user.id) { // Verifica si los datos del usuario están vacíos en Redux
        const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
        if (token) {
          try {
            const response = await validateToken(token); // Valida el token
            const { user: userData } = response.data;
            dispatch(setUser(userData)); // Guarda los datos del usuario en Redux
          } catch (error) {
            console.error('Error al validar el token:', error);
            localStorage.removeItem('token'); // Elimina el token si es inválido
          }
        }
      }
    };

    fetchUserData();
  }, [user, dispatch]);

  const resetForm = () => {
    setFormData({
      marca: '',
      modelo: '',
      descripcion: '',
      fallas: [],
      sim: false,
      manipulado: false,
      mojado: false,
      apagado: false,
      pantallaRota: false,
      tapaRota: false,
      fechaDiagnostico: null,
      horaDiagnostico: null,
      cotizacion: 0,
      adelanto: 0,
      cliente: '',
      firstName: '',
      secondName: '',
      lastName: '',
      secondLastName: '',
      phone: '',
      secondPhone: '',
      password: {
        tipo: '',
        valor: '',
      },
    });
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user.id) {
      alert('No se puede registrar la reparación. Usuario no logueado.');
      return;
    }

    try {
      const { cliente, ...reparacionData } = formData;

      if (!cliente) {
        alert('Debe seleccionar o crear un cliente antes de registrar la reparación.');
        return;
      }

      const dataToSubmit = {
        ...reparacionData,
        cliente,
        recepcion: user.id, // Usar el ID del usuario logueado desde Redux
        tecnico: null, // Inicialmente null
      };

      console.log('Datos de la reparación:', dataToSubmit);

      await addReparacion(dataToSubmit);

      alert('Reparación registrada exitosamente.');
      resetForm();
    } catch (error) {
      console.error('Error al registrar la reparación:', error);
      alert('Error de conexión o datos incompletos.');
    }
  };

  const handleClientSelected = (clienteId) => {
    console.log('Cliente seleccionado:', clienteId);

    setFormData((prevData) => ({
      ...prevData,
      cliente: clienteId,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        {/* Datos del Dispositivo */}
        <Grid item lg={4} md={6} xs={12}>
          <Stack spacing={1}>
            <DatosDispositivo
              value={{
                marca: formData.marca,
                modelo: formData.modelo,
                descripcion: formData.descripcion,
                fallas: formData.fallas,
                sim: formData.sim,
                manipulado: formData.manipulado,
                mojado: formData.mojado,
                apagado: formData.apagado,
                pantallaRota: formData.pantallaRota,
                tapaRota: formData.tapaRota,
              }}
              onChange={handleChange}
            />
          </Stack>
        </Grid>

        {/* Agenda del Dispositivo */}
        <Grid item lg={4} md={6} xs={12}>
          <Stack spacing={3}>
            <AgendaDispositivo
              value={{
                fechaDiagnostico: formData.fechaDiagnostico,
                horaDiagnostico: formData.horaDiagnostico,
                cotizacion: formData.cotizacion,
                adelanto: formData.adelanto,
                password: formData.password,
              }}
              onChange={handleChange}
            />
          </Stack>
        </Grid>

        {/* Datos del Cliente */}
        <Grid item lg={4} md={6} xs={12}>
          <Stack spacing={3}>
            <DatosCliente
              value={{
                firstName: formData.firstName,
                secondName: formData.secondName,
                lastName: formData.lastName,
                secondLastName: formData.secondLastName,
                phone: formData.phone,
                secondPhone: formData.secondPhone,
              }}
              onChange={handleChange}
              onClientSelected={handleClientSelected} // Pasar el ID del cliente seleccionado
            />
          </Stack>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} mt={3}>
        <Button type="submit" variant="contained" color="primary">
          Registrar Reparación
        </Button>
      </Stack>
    </form>
  );
};

export default ReparacionAdd;
