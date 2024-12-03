import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useSelector } from 'react-redux';
import { Box, Menu, Avatar, Typography, Divider, Button, IconButton } from '@mui/material';
import * as dropdownData from './data';
import { IconMail } from '@tabler/icons';
import { Stack } from '@mui/system';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';

const SERVER_URL = 'http://localhost:4000';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const user = useSelector((state) => state.user.userProfile);
  const navigate = useNavigate(); // Para redirigir al login

  const userImage = `http://localhost:4000/images/users/${user.id}.png`;

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Borra el token del localStorage
    navigate('/auth/login'); // Redirige al login
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show user profile"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={userImage}
          alt={user.nombre}
          sx={{
            width: 35,
            height: 35,
          }}
          onError={(e) => {
            e.target.src = '/default-avatar.png';
          }}
        />
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
          },
        }}
      >
        <Scrollbar sx={{ height: '100%', maxHeight: '85vh' }}>
          <Box p={3}>
            <Typography variant="h5">Perfil Usuario</Typography>
            <Stack direction="row" py={3} spacing={2} alignItems="center">
              <Avatar
                src={userImage}
                alt={user.nombre}
                sx={{ width: 95, height: 95 }}
                onError={(e) => {
                  e.target.src = '/default-avatar.png';
                }}
              />
              <Box>
                <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                  {user.nombre} {user.apellido}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {user.department || 'Sin departamento'}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <IconMail width={15} height={15} />
                  {user.email || 'Sin correo'}
                </Typography>
              </Box>
            </Stack>
            <Divider />
            {dropdownData.profile.map((profile) => (
              <Box key={profile.title}>
                <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
                  <Link to={profile.href}>
                    <Stack direction="row" spacing={2}>
                      <Box
                        width="45px"
                        height="45px"
                        bgcolor="primary.light"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Avatar
                          src={profile.icon}
                          alt={profile.icon}
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: 0,
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          color="textPrimary"
                          className="text-hover"
                          noWrap
                          sx={{
                            width: '240px',
                          }}
                        >
                          {profile.title}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          sx={{
                            width: '240px',
                          }}
                          noWrap
                        >
                          {profile.subtitle}
                        </Typography>
                      </Box>
                    </Stack>
                  </Link>
                </Box>
              </Box>
            ))}
            <Box mt={2}>
              <Box bgcolor="primary.light" p={3} mb={3} overflow="hidden" position="relative">
                <Box display="flex" justifyContent="space-between">
                  <Box>
                    <Typography variant="h5" mb={2}>
                      Checador de<br />
                      Horario
                    </Typography>
                    <Button variant="contained" color="primary">
                      ENTRADA
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleLogout} // Llama a la función de logout
              >
                Cerrar Sesión
              </Button>
            </Box>
          </Box>
        </Scrollbar>
      </Menu>
    </Box>
  );
};

export default Profile;
