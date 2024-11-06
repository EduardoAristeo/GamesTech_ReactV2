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
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Principal',
  },

  {
    id: uniqueId(),
    title: 'Inicio',
    icon: IconHome,
    href: '/recepcion',
    chip: 'New',
    chipColor: 'secondary',
    

  },
  {
    id: uniqueId(),
    title: 'Ingresar dispositivo',
    icon: IconPlus,
    href: '/recepcion/ingresar-dispositivo',//generar una nueva ruta para ingresar dispositivo
  },
  {
    id: uniqueId(),
    title: 'Vender',
    icon: IconShoppingCart,
    href: '/dashboards/ecommerce',
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
      }
    ]
  },
  
  {
    navlabel: true,
    subheader: 'Herramientas',
  },
  

  {
    id: uniqueId(),
    title: 'Inventario',
    icon: IconBasket,
    href: '/apps/ecommerce/',
    
    children: [
      {
        id: uniqueId(),
        title: 'List',
        icon: IconPoint,
        href: '/apps/ecommerce/eco-product-list',
      },
      {
        id: uniqueId(),
        title: 'Add Product',
        icon: IconPoint,
        href: '/apps/ecommerce/add-product',
      },
      {
        id: uniqueId(),
        title: 'Edit Product',
        icon: IconPoint,
        href: '/apps/ecommerce/edit-product',
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
