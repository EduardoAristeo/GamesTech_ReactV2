import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Typography, useTheme, Chip } from '@mui/material';
import { useDropzone } from 'react-dropzone';

const Thumbnail = ({ value, onChange }) => {
  const theme = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        onChange(file); // Llama a la función onChange para enviar el archivo seleccionado al componente padre
      }
    },
  });

  // Usar useEffect para reiniciar el valor si el formulario se reinicia
  useEffect(() => {
    if (!value) {
      setSelectedFile(null);
    }
  }, [value]);

  return (
    <Box p={3}>
      <Typography variant="h5">Imagen del producto</Typography>

      <Box
        mt={3}
        fontSize="12px"
        sx={{
          backgroundColor: 'primary.light',
          color: 'primary.main',
          padding: '30px',
          textAlign: 'center',
          border: `1px dashed`,
          borderColor: 'primary.main',
        }}
        {...getRootProps({ className: 'dropzone' })}
      >
        <input {...getInputProps()} />
        <p>Arrastra una imagen o haz click para abrir explorador</p>
      </Box>
      <Typography variant="body2" textAlign="center" mt={1}>
        La imagen que subas será la que se muestre en la tienda, usa .png o .jpg
      </Typography>
      <Box mt={2}>
        <Typography variant="h6" fontSize="15px">
          Imagen seleccionada:
        </Typography>
        {selectedFile ? (
          <Box
            display="flex"
            alignItems="center"
            py={1}
            mt={2}
            sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
            justifyContent="space-between"
          >
            <Typography variant="body1" fontWeight="500">
              {selectedFile.name}
            </Typography>
            <Chip color="primary" label={`${(selectedFile.size / 1024).toFixed(2)} KB`} />
          </Box>
        ) : (
          <Typography variant="body1">No se ha seleccionado ninguna imagen.</Typography>
        )}
      </Box>
    </Box>
  );
};

// Agregar propTypes para validar las props
Thumbnail.propTypes = {
  value: PropTypes.object, // Aceptar el valor como un objeto (archivo) o null
  onChange: PropTypes.func.isRequired,
};

export default Thumbnail;
