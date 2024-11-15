import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography, MenuItem } from '@mui/material';
import { Avatar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import { getProductById } from '../../../../services/productService'; // Asegúrate de que esta función está definida correctamente
import { useParams } from 'react-router-dom'; // Para obtener el id de la URL

const StatusCard = ({ onChange }) => {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState(null); // Inicializa en null para indicar "cargando"
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  const handleChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    onChange(newStatus); // Notifica al componente padre con el nuevo estado seleccionado
  };

  // Hacer la llamada a la API para obtener los datos del producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); // Inicia el indicador de carga
        const data = await getProductById(id); // Usar el servicio para obtener los datos
        setProduct(data); // Guardar los datos del producto en el estado
        setStatus(data.status || 'Oculto'); // Inicializa el estado o 'Oculto' si no está definido
      } catch (error) {
        console.error('Error al obtener el producto:', error);
        setStatus('Oculto'); // Valor predeterminado si hay un error
      } finally {
        setLoading(false); // Finaliza el indicador de carga
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <CircularProgress />; // Indicador de carga mientras espera los datos
  }

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
                : 'warning.main', // Si no es ninguno de los anteriores, lo toma como warning
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
            {/* Agrega más estados si es necesario */}
          </CustomSelect>
          <Typography variant="body2">
            Selecciona si quieres que el producto aparezca en la tienda.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatusCard;
