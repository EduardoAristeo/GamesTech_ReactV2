// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {
  Autocomplete,
  Button,
  Grid,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import { IconPlus} from '@tabler/icons'; 
import { getMarcas, addMarca } from 'src/services/marcaService';
import { getFallas, addFalla } from 'src/services/fallaService';

const GeneralCard = ({ value, onChange }) => {
  const [marcas, setMarcas] = useState([]);
  const [selectedMarca, setSelectedMarca] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newMarca, setNewMarca] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [fallas, setFallas] = useState([]);
  const [selectedFallas, setSelectedFallas] = useState([]);
  const [openFallaDialog, setOpenFallaDialog] = useState(false);
  const [newFalla, setNewFalla] = useState('');

  const [checkboxes, setCheckboxes] = useState({
    sim: false,
    manipulado: false,
    mojado: false,
    apagado: false,
    pantallaRota: false,
    tapaRota: false,
  });

  // Cargar las marcas desde la base de datos
  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const data = await getMarcas();
        setMarcas(
          data.map((marca) => ({
            label: marca.marca,
            id: marca._id,
          }))
        );
      } catch (error) {
        console.error('Error al cargar marcas:', error);
      }
    };

    fetchMarcas();
  }, []);

  // Cargar las fallas desde la base de datos
  useEffect(() => {
    const fetchFallas = async () => {
      try {
        const data = await getFallas();
        setFallas(
          data.map((falla) => ({
            label: falla.falla,
            id: falla._id,
          }))
        );
      } catch (error) {
        console.error('Error al cargar fallas:', error);
      }
    };

    fetchFallas();
  }, []);

  const handleMarcaChange = (event, newValue) => {
    setSelectedMarca(newValue);
    onChange('marca', newValue?.id || '');
  };

  const handleFallaChange = (event, newValue) => {
    setSelectedFallas(newValue);
    onChange(
      'fallas',
      newValue.map((falla) => falla.id)
    );
  };

  const handleCheckboxChange = (field) => {
    const updatedCheckboxes = { ...checkboxes, [field]: !checkboxes[field] };
    setCheckboxes(updatedCheckboxes);
    onChange(field, updatedCheckboxes[field]);
  };

  const handleAddMarca = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewMarca('');
  };

  const handleSaveNewMarca = async () => {
    try {
      const savedMarca = await addMarca(newMarca);
      setMarcas((prev) => [...prev, { label: savedMarca.marca, id: savedMarca._id }]);
      handleDialogClose();
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error al agregar la nueva marca:', error);
    }
  };

  const handleAddFalla = () => {
    setOpenFallaDialog(true);
  };

  const handleFallaDialogClose = () => {
    setOpenFallaDialog(false);
    setNewFalla('');
  };

  const handleSaveNewFalla = async () => {
    try {
      const savedFalla = await addFalla(newFalla);
      setFallas((prev) => [...prev, { label: savedFalla.falla, id: savedFalla._id }]);
      handleFallaDialogClose();
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error al agregar la nueva falla:', error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5">Datos del dispositivo</Typography>
      <Grid container spacing={2} mt={3}>
        {/* Campo de Marca */}
        <Grid item xs={12}>
          <CustomFormLabel>Marca</CustomFormLabel>
          <Autocomplete
            fullWidth
            id="marca"
            options={marcas}
            getOptionLabel={(option) => option.label}
            value={selectedMarca}
            onChange={handleMarcaChange}
            renderInput={(params) => <TextField {...params} placeholder="Selecciona una marca" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="text" startIcon={<IconPlus />} onClick={handleAddMarca}>
            Añadir nueva marca
          </Button>
        </Grid>

        {/* Campo de Modelo */}
        <Grid item xs={12}>
          <CustomFormLabel>Modelo</CustomFormLabel>
          <TextField
            fullWidth
            placeholder="Modelo del dispositivo"
            value={value.modelo || ''}
            onChange={(e) => onChange('modelo', e.target.value)}
          />
        </Grid>

        {/* Campo de Descripción */}
        <Grid item xs={12}>
          <CustomFormLabel>Descripción de la falla</CustomFormLabel>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Descripción de la falla que menciona el cliente"
            value={value.descripcion || ''}
            onChange={(e) => onChange('descripcion', e.target.value)}
          />
        </Grid>

        {/* Campo de Fallas */}
        <Grid item xs={12}>
          <CustomFormLabel>Fallas</CustomFormLabel>
          <Autocomplete
            multiple
            fullWidth
            id="fallas"
            options={fallas}
            getOptionLabel={(option) => option.label}
            value={selectedFallas}
            onChange={handleFallaChange}
            renderInput={(params) => <TextField {...params} placeholder="Selecciona una o más fallas" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="text" startIcon={<IconPlus />} onClick={handleAddFalla}>
            Añadir nueva falla
          </Button>
        </Grid>

        {/* Checkboxes */}
        <Grid item xs={12}>
          <Typography variant="h6">Condiciones del dispositivo</Typography>
          <Grid container spacing={2}>
            {[
              { label: 'SIM', field: 'sim' },
              { label: 'Manipulado', field: 'manipulado' },
              { label: 'Mojado', field: 'mojado' },
              { label: 'Apagado', field: 'apagado' },
              { label: 'Pantalla rota', field: 'pantallaRota' },
              { label: 'Tapa rota', field: 'tapaRota' },
            ].map(({ label, icon, field }) => (
              <Grid item xs={4} md={4} key={field}>
                <FormControlLabel
                  control={<Checkbox checked={checkboxes[field]} onChange={() => handleCheckboxChange(field)} />}
                  label={
                    <Box display="flex" alignItems="center">
                      {icon}
                      <Typography ml={1}>{label}</Typography>
                    </Box>
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Diálogo para nueva marca */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Añadir Nueva Marca</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre de la marca"
            value={newMarca}
            onChange={(e) => setNewMarca(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancelar</Button>
          <Button onClick={handleSaveNewMarca} disabled={!newMarca.trim()}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para nueva falla */}
      <Dialog open={openFallaDialog} onClose={handleFallaDialogClose}>
        <DialogTitle>Añadir Nueva Falla</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Descripción de la falla"
            value={newFalla}
            onChange={(e) => setNewFalla(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFallaDialogClose}>Cancelar</Button>
          <Button onClick={handleSaveNewFalla} disabled={!newFalla.trim()}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Operación realizada con éxito.
        </Alert>
      </Snackbar>
    </Box>
  );
};

GeneralCard.propTypes = {
  value: PropTypes.shape({
    marca: PropTypes.string,
    modelo: PropTypes.string,
    descripcion: PropTypes.string,
    fallas: PropTypes.array,
    sim: PropTypes.bool,
    manipulado: PropTypes.bool,
    mojado: PropTypes.bool,
    apagado: PropTypes.bool,
    pantallaRota: PropTypes.bool,
    tapaRota: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GeneralCard;
