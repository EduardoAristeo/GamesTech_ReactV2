// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { IconPower } from '@tabler/icons';
import { Link } from "react-router-dom";

export const Profile = () => {
  // Obtener datos del usuario desde Redux
  const user = useSelector((state) => state.user);
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';

  console.log('User:', user);

  // Comprobar si el usuario está cargado para evitar errores
  if (!user || !user.nombre) {
    return null; // O un loader/spinner si prefieres mostrar algo mientras se cargan los datos
  }

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar 
            alt={user.nombre} 
            src={user.avatar || 'src/assets/images/profile/default-avatar.jpg'} 
          />

          <Box>
            <Typography variant="h6" color="textPrimary">{user.nombre}</Typography>
            <Typography variant="caption" color="textSecondary">{user.department}</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton 
                color="primary" 
                component={Link} 
                to="/auth/login" 
                aria-label="logout" 
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
