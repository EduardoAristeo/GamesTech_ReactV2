import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button } from '@mui/material';
import axios from 'axios';

const Thumbnail = ({ productId }) => {
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (productId) {
      setImageUrl(`http://localhost:4000/images/products/${productId}.png`);
    }
  }, [productId]);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tamaño del archivo (opcional)
    if (file.size > 5 * 1024 * 1024) {
      alert('El tamaño del archivo es demasiado grande. Máximo 5MB.');
      return;
    }

    const formData = new FormData();
    formData.append('productId', productId); // Este campo coincide con el backend
    formData.append('image', file); // Cambiamos de 'file' a 'image'

    try {
      const response = await axios.post('http://localhost:4000/api/v1/products/update-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Imagen actualizada con éxito.');
      setImageUrl(`http://localhost:4000/images/products/${productId}.png?${Date.now()}`); // Agregar un timestamp para evitar caché
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Error al actualizar la imagen.');
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box p={3}>
      <Typography variant="h5">Imagen del producto</Typography>
      <Box mt={3} mb={2} textAlign="center">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Product Thumbnail"
            style={{ maxWidth: '300px', borderRadius: '7px', margin: '0 auto', cursor: 'pointer' }}
            onClick={handleImageClick}
          />
        ) : (
          <Typography variant="body2">No se encontró la imagen del producto.</Typography>
        )}
        <Button variant="contained" color="primary" onClick={handleImageClick} sx={{ mt: 2 }}>
          Cambiar Imagen
        </Button>
      </Box>
    </Box>
  );
};

export default Thumbnail;
