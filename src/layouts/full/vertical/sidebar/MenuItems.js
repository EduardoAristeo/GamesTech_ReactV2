import {
  IconPoint,
  IconNotes,
  IconCalendar,
  IconUserCircle,
  IconBasket,
  IconShoppingCart,
  IconListDetails,
  IconHome,
  IconPlus,

  IconBrandApple,
  IconTools,

  IconCircuitCell,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Principal',
  },

  {
    id: uniqueId(),
    title: 'Inicio Recepcion',
    icon: IconHome,
    href: '/recepcion',
    
    chipColor: 'secondary',
    roles: ['recepcion'],
  },
  {
    id: uniqueId(),
    title: 'Inicio Tecnico',
    icon: IconHome,
    href: '/tecnico',
    
    chipColor: 'secondary',
    roles: ['tecnico'],
  },
  {
    id: uniqueId(),
    roles: ['recepcion'], // Agregar roles para filtr
    title: 'Ingresar reparación',
    icon: IconPlus,
    href: '/recepcion/agregar-reparacion', //generar una nueva ruta para ingresar dispositivo
  },
  {
    id: uniqueId(),
    title: 'Vender',
    icon: IconShoppingCart,
    href: '/dashboards/ecommerce',
    roles: ['recepcion'], // Agregar roles para filtrar elementos del menú
    children: [
      {
        id: uniqueId(),
        title: 'Accesorios',
        icon: IconPoint,
        href: '/apps/ecommerce/shop', //generar una nueva ruta para accesorios
      },
      {
        id: uniqueId(),
        title: 'Dispositivos',
        icon: IconPoint,
        href: '/dashboards/ecommerce', //generar una nueva ruta para dispositivos
      },
    ],
  },

  {
    navlabel: true,
    subheader: 'Herramientas',
  },

  {
    id: uniqueId(),
    title: 'Productos',
    icon: IconBasket,
    href: '/apps/ecommerce/',
    roles: ['recepcion'],
    

    children: [
      {
        id: uniqueId(),
        title: 'Productos',
        icon: IconPoint,
        href: '/recepcion/lista-productos',
      },
      {
        id: uniqueId(),
        title: 'Ventas realizadas',
        icon: IconPoint,
        href: '/apps/ventas/ventas-list',

      },
      {
        id: uniqueId(),
        title: 'Reportes de ventas',
        icon: IconPoint,
        href: '/recepcion/reporte-ventas',
      },
      
    ],
  },
  {
    id: uniqueId(),
    title: 'Reparaciones',
    icon: IconTools,
    href: '/',

    children: [
      {
        id: uniqueId(),
        title: 'Lista de reparaciones',
        icon: IconPoint,
        href: '/recepcion/lista-reparaciones', //editar la ruta para reparaciones
      },
      {
        id: uniqueId(),
        title: 'Reportes de reparaciones',
        icon: IconPoint,
        roles: ['recepcion'],
        href: '/recepcion/reporte-reparaciones', //editar la ruta para nueva reparacion
      },
      
    ],
  },
  {
    id: uniqueId(),
    title: 'Dispositivos',
    icon: IconBrandApple,
    href: '/',
    roles: ['recepcion'],

    children: [
      {
        id: uniqueId(),
        title: 'Lista de dispositivos',
        icon: IconPoint,
       // href: '/apps/ecommerce/eco-product-list', //editar la ruta para dispositivos
      },
      {
        id: uniqueId(),
        title: 'Nuevo dispositivo',
        icon: IconPoint,
        //href: '/apps/ecommerce/add-product', //editar la ruta para nuevo dispositivo
      },
      
    ],
  },
  {
    id: uniqueId(),
    title: 'Refacciones',
    icon: IconCircuitCell,
    href: '/',

    children: [
      {
        id: uniqueId(),
        title: 'Lista de refacciones',
        icon: IconPoint,
       // href: '/apps/ecommerce/eco-product-list', //editar la ruta para refacciones
      },
      {
        id: uniqueId(),
        title: 'Nueva refaccion',
        icon: IconPoint,
       // href: '/apps/ecommerce/add-product', //editar la ruta para nueva refaccion
      },
      
    ],
  },
  {
    id: uniqueId(),
    title: 'Pedidos',
    icon: IconListDetails,
    href: '/apps/invoice/',
    children: [
      {
        id: uniqueId(),
        title: 'Ver pedidos',
        icon: IconPoint,
        href: '/apps/invoice/list',
      },
      {
        id: uniqueId(),
        title: 'Realizar pedido',
        icon: IconPoint,
        href: '/apps/invoice/create',
      },
    ],
  },

  {
    id: uniqueId(),
    title: 'Notes',
    icon: IconNotes,
    href: '/apps/notes',
  },
  {
    id: uniqueId(),
    title: 'Calendar',
    icon: IconCalendar,
    href: '/apps/calendar',
  },
  {
    id: uniqueId(),
    title: 'Account Setting',
    icon: IconUserCircle,
    href: '/pages/account-settings',
  },
];

export default Menuitems;
