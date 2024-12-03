import { styled, Container, Box, useTheme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from './vertical/header/Header';
import HorizontalHeader from '../full/horizontal/header/Header';
import Sidebar from './vertical/sidebar/Sidebar';
import Customizer from './shared/customizer/Customizer';
import Navigation from './horizontal/navbar/Navbar';

import { validateToken } from 'src/services/authService'; // Servicio para validar el token
import { setUser } from 'src/store/apps/userProfile/UserProfileSlice'; // Redux Slice para manejar el usuario

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  width: '100%',
  backgroundColor: 'transparent',
}));

const FullLayout = () => {
  const customizer = useSelector((state) => state.customizer);
  const user = useSelector((state) => state.user.userProfile); // Datos del usuario desde Redux
  const dispatch = useDispatch();
  const theme = useTheme();

  const [loading, setLoading] = useState(true); // Estado para manejar la carga inicial

  useEffect(() => {
    const fetchUserFromToken = async () => {
      const token = localStorage.getItem('token'); // Obtén el token del localStorage
      if (token) {
        try {
          const response = await validateToken(token); // Valida el token
          if (response.status === 200) {
            dispatch(setUser(response.data.user)); // Almacena los datos del usuario en Redux
          } else {
            console.error('Token inválido');
          }
        } catch (error) {
          console.error('Error al validar el token:', error);
        } finally {
          setLoading(false); // Desactiva la carga
        }
      } else {
        setLoading(false); // Desactiva la carga si no hay token
      }
    };

    fetchUserFromToken();
  }, [dispatch]);

  if (loading) {
    return <div>Cargando...</div>; // Indicador de carga inicial
  }

  return (
    <MainWrapper
      className={customizer.activeMode === 'dark' ? 'darkbg mainwrapper' : 'mainwrapper'}
    >
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      {customizer.isHorizontal ? '' : <Sidebar />}
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up('lg')]: { ml: `${customizer.MiniSidebarWidth}px` },
          }),
        }}
      >
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        {customizer.isHorizontal ? <HorizontalHeader /> : <Header />}
        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}
        {customizer.isHorizontal ? <Navigation /> : ''}
        <Container
          sx={{
            pt: '30px',
            maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
          }}
        >
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet />
          </Box>
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
        <Customizer />
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
