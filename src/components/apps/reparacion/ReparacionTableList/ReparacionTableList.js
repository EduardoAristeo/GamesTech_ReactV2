import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox, IconButton, Tooltip, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { IconEye } from '@tabler/icons';
import ReparacionModal from './modalDetalleFalla';
import { updateMultipleReparaciones } from 'src/services/reparacionService';

const ReparacionesTable = ({ data, userId, fetchReparaciones }) => {
  const [selectedReparaciones, setSelectedReparaciones] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [sortMode, setSortMode] = useState('urgencia');
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');

  // Sincronizar filteredData con data
  useEffect(() => {
    setFilteredData(data);
    handleSort(sortMode); // Aplicar el filtro actual
    if (searchQuery) handleSearch(searchQuery); // Aplicar la búsqueda actual si existe
  }, [data]);

  const handleSelect = (id) => {
    setSelectedReparaciones((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((reparacionId) => reparacionId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (isChecked) => {
    setSelectedReparaciones(isChecked ? filteredData.map((item) => item._id) : []);
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      console.log('Datos enviados al backend:', {
        ids: selectedReparaciones,
        newStatus,
        tecnicoId: userId,
      });

      await updateMultipleReparaciones(selectedReparaciones, newStatus, userId);

      setSelectedReparaciones([]); // Deseleccionar reparaciones
      await fetchReparaciones(); // Refrescar los datos
    } catch (error) {
      console.error('Error al actualizar reparaciones:', error);
    }
  };

  const handleOpenModal = (reparacion) => {
    setModalData(reparacion);
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  const handleSort = (mode) => {
    setSortMode(mode);
    let sortedData;
    switch (mode) {
      case 'urgencia':
        sortedData = [...data].sort((a, b) => {
          if (a.estatus === 'GARANTIA') return -1;
          if (b.estatus === 'GARANTIA') return 1;
          return (a.diasPendientes || Infinity) - (b.diasPendientes || Infinity);
        });
        break;
      case 'fechaIngreso':
        sortedData = [...data].sort((a, b) => new Date(b.fechaIngreso) - new Date(a.fechaIngreso));
        break;
      default:
        sortedData = [...data];
    }
    setFilteredData(sortedData);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
    const searchedData = data.filter((reparacion) =>
      `${reparacion.cliente.nombre} ${reparacion.cliente.apellido}`.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(searchedData);
  };

  const getStatusStyle = (status) => {
    const styles = {
      PENDIENTE: { background: 'rgba(255, 193, 7, 0.2)', color: '#FFC107', border: '1px solid #FFC107' },
      COMPLETADO: { background: 'rgba(40, 167, 69, 0.2)', color: '#28A745', border: '1px solid #28A745' },
      CANCELADO: { background: 'rgba(255, 87, 34, 0.2)', color: '#FF5722', border: '1px solid #FF5722' },
      GARANTIA: { background: 'rgba(220, 53, 69, 0.2)', color: '#DC3545', border: '1px solid #DC3545' },
      SIN_REPARACION: { background: 'rgba(255, 193, 7, 0.2)', color: '#FFC107', border: '1px solid #FFC107' },
      ENTREGADO: { background: 'rgba(0, 123, 255, 0.2)', color: '#007BFF', border: '1px solid #007BFF' },
    };
    return styles[status] || {};
  };

  return (
    <div>
      {/* Barra superior con búsqueda y ordenamiento */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <TextField
            label="Buscar por cliente"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginRight: '1rem', minWidth: '250px' }}
          />
        </div>
        <FormControl>
          <InputLabel id="sort-label">Ordenar por</InputLabel>
          <Select
            labelId="sort-label"
            value={sortMode}
            onChange={(e) => handleSort(e.target.value)}
            style={{ minWidth: '200px' }}
          >
            <MenuItem value="urgencia">Urgencia</MenuItem>
            <MenuItem value="fechaIngreso">Fecha de Ingreso</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Botones para actualizar estado */}
      <div style={{ marginBottom: '1rem' }}>
        {['PENDIENTE', 'COMPLETADO', 'CANCELADO', 'GARANTIA', 'SIN_REPARACION', 'ENTREGADO'].map((status) => (
          <button
            key={status}
            onClick={() => handleStatusUpdate(status)}
            style={{
              ...getStatusStyle(status),
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              display: 'inline-block',
              fontFamily: 'inherit',
              marginRight: '8px',
            }}
          >
            {status}
          </button>
        ))}
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selectedReparaciones.length > 0 &&
                  selectedReparaciones.length < filteredData.length
                }
                checked={selectedReparaciones.length === filteredData.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Fallas</TableCell>
            <TableCell>Estatus</TableCell>
            <TableCell>Días Pendientes</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((reparacion) => (
            <TableRow key={reparacion._id}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedReparaciones.includes(reparacion._id)}
                  onChange={() => handleSelect(reparacion._id)}
                />
              </TableCell>
              <TableCell>{`${reparacion.cliente.nombre} ${reparacion.cliente.apellido}`}</TableCell>
              <TableCell>{reparacion.marca}</TableCell>
              <TableCell>{reparacion.modelo}</TableCell>
              <TableCell>{reparacion.fallas.map((f) => f.falla).join(', ')}</TableCell>
              <TableCell>
                <span
                  style={{
                    ...getStatusStyle(reparacion.estatus),
                    padding: '4px 8px',
                    borderRadius: '8px',
                    display: 'inline-block',
                    textAlign: 'center',
                    minWidth: '80px',
                  }}
                >
                  {reparacion.estatus}
                </span>
              </TableCell>
              <TableCell>{reparacion.diasPendientes || '-'}</TableCell>
              <TableCell>
                <Tooltip title="Ver detalles">
                  <IconButton color="primary" onClick={() => handleOpenModal(reparacion)}>
                    <IconEye />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ReparacionModal
        open={Boolean(modalData)}
        reparacion={modalData}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ReparacionesTable;
