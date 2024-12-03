import { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTokenAuth } from '../../../hooks/useTokenAuth'; // Cambiar al nuevo hook
import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { ToastContainer } from 'react-toastify'; // Importar ToastContainer
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';

// eslint-disable-next-line react/prop-types
const AuthLogin = ({ title, subtitle, subtext }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true); // Estado para el checkbox
  const { login, loading } = useTokenAuth(); // Usar el nuevo hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(user, password); // Llamar a la función de login
      console.log('Inicio de sesión exitoso');
    } catch (error) {
      console.error('Error en el login:', error);
      setUser('');
      setPassword('');
    }
  };

  return (
    <>
      <ToastContainer />
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            Ingresa tus credenciales
          </Typography>
        </Divider>
      </Box>

      <form onSubmit={handleSubmit}>
        <Stack>
          <Box>
            <CustomFormLabel htmlFor="user">Usuario</CustomFormLabel>
            <CustomTextField
              id="user"
              variant="outlined"
              fullWidth
              value={user}
              onChange={(e) => setUser(e.target.value)}
              aria-label="Ingrese su usuario"
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">Contraseña</CustomFormLabel>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Ingrese su contraseña"
            />
          </Box>
          <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
            <FormGroup>
              <FormControlLabel
                control={
                  <CustomCheckbox
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                  />
                }
                label="Recordar este dispositivo"
              />
            </FormGroup>
            <Typography
              component={Link}
              to="/auth/forgot-password"
              fontWeight="500"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
              }}
            >
              ¿Olvidaste tu contraseña?
            </Typography>
          </Stack>
        </Stack>
        <Box mt={2}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={loading || !user || !password}
          >
            {loading ? 'Cargando...' : 'Entrar'}
          </Button>
        </Box>
      </form>

      {subtitle}
    </>
  );
};

export default AuthLogin;
