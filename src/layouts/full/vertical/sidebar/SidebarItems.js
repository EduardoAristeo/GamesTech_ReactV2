import React, { useEffect, useState } from 'react';
import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import { validateToken } from 'src/services/authService'; // Servicio para validar el token
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';
import NavGroup from './NavGroup/NavGroup';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const [user, setUser] = useState(null); // Estado para el usuario
  const [loading, setLoading] = useState(true); // Estado para la carga

  useEffect(() => {
    const fetchUserFromToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await validateToken(token); // Valida el token
          if (response.status === 200) {
            setUser(response.data.user); // Almacena los datos del usuario
          } else {
            setUser(null); // Si el token es inválido, limpia el estado del usuario
          }
        } catch (error) {
          console.error('Error al validar el token:', error);
          setUser(null);
        } finally {
          setLoading(false); // Finaliza la carga
        }
      } else {
        setLoading(false); // Finaliza la carga si no hay token
      }
    };

    fetchUserFromToken();
  }, []); // Solo se ejecuta al montar el componente

  if (loading) {
    return <div>Cargando...</div>; // Indicador de carga
  }

  if (!user) {
    return <div>Usuario no autenticado</div>; // Manejo de usuario no autenticado
  }

  // Filtrar elementos del menú según el departamento del usuario
  const filteredMenuItems = Menuitems.filter((item) => {
    if (!item.roles) return true; // Mostrar ítems sin restricciones
    return item.roles.includes(user.department); // Filtrar por departamento
  }).map((item) => ({
    ...item,
    children: item.children
      ? item.children.filter((child) => {
          if (!child.roles) return true; // Mostrar submenús sin restricciones
          return child.roles.includes(user.department); // Filtrar submenús
        })
      : undefined,
  }));

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {filteredMenuItems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathname}
                level={1}
                key={item.id}
              />
            );
          } else {
            return <NavItem item={item} key={item.id} />;
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
