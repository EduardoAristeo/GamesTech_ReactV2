import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ReparacionModal = ({ open, reparacion, onClose }) => {
  if (!reparacion) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Información Detallada</DialogTitle>
      <DialogContent>
        {Object.entries(reparacion).map(([key, value]) => (
          <Typography key={key} sx={{ marginBottom: 1 }}>
            <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
          </Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReparacionModal;
