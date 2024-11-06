import img1 from 'src/assets/images/profile/user-1.jpg';
import img2 from 'src/assets/images/profile/user-2.jpg';
import img3 from 'src/assets/images/profile/user-3.jpg';
import img4 from 'src/assets/images/profile/user-4.jpg';

import icon1 from 'src/assets/images/svgs/icon-account.svg';
import icon2 from 'src/assets/images/svgs/icon-inbox.svg';


import ddIcon1 from 'src/assets/images/svgs/icon-dd-chat.svg';
import ddIcon2 from 'src/assets/images/svgs/icon-dd-cart.svg';
import ddIcon3 from 'src/assets/images/svgs/icon-dd-invoice.svg';
import ddIcon4 from 'src/assets/images/svgs/icon-dd-date.svg';
import ddIcon5 from 'src/assets/images/svgs/icon-dd-mobile.svg';
import ddIcon6 from 'src/assets/images/svgs/icon-dd-lifebuoy.svg';

//
// Notifications dropdown
//
const notifications = [
  {
    avatar: img1,
    title: 'Roman Joined the Team!',
    subtitle: 'Congratulate him',
  },
  {
    avatar: img2,
    title: 'New message received',
    subtitle: 'Salma sent you new message',
  },
  {
    avatar: img3,
    title: 'New Payment received',
    subtitle: 'Check your earnings',
  },
  {
    avatar: img4,
    title: 'Jolly completed tasks',
    subtitle: 'Assign her new tasks',
  },
  {
    avatar: img1,
    title: 'Roman Joined the Team!',
    subtitle: 'Congratulate him',
  },
  {
    avatar: img2,
    title: 'New message received',
    subtitle: 'Salma sent you new message',
  },
  {
    avatar: img3,
    title: 'New Payment received',
    subtitle: 'Check your earnings',
  },
  {
    avatar: img4,
    title: 'Jolly completed tasks',
    subtitle: 'Assign her new tasks',
  },
];

//
// Profile dropdown
//
const profile = [
  {
    href: '/user-profile',
    title: 'Mi horario',
    subtitle: 'Revisar horario laboral',
    icon: icon1,
  },
  {
    href: '/apps/email',
    title: 'Mis nominas',
    subtitle: 'Revisar mis nominas',
    icon: icon2,
  },
  
];

// apps dropdown

const appsLink = [
  {
    href: 'https://web.whatsapp.com/',
    title: 'Web WhatsApp',
    subtext: 'Abrir WhatsApp business',
    avatar: ddIcon1,
  },
  {
    href: 'https://www.facebook.com/',
    title: 'Facebook',
    subtext: 'Abrir Facebook',
    avatar: ddIcon2,
  },
  {
    href: 'https://fullunlock-mx.com/',
    title: 'Servidor 1 ',
    subtext: 'eSIM - Reportes IMEI - Unlock',
    avatar: ddIcon3,
  },
  {
    href: 'https://www.instagram.com/',
    title: 'Instagram',
    subtext: 'Abrir Instagram',
    avatar: ddIcon4,
  },
  {
    href: 'https://ifreeicloud.co.uk/client-area/check',
    title: 'Servidor 2',
    subtext: 'Checks iCloud',
    avatar: ddIcon5,
  },
  {
    href: 'https://www.ift.org.mx/usuarios-y-audiencias/consulta-de-imei',
    title: 'IFT Mexico',
    subtext: 'Consulta IMEI',
    avatar: ddIcon6,
  },
  
];



const pageLinks = [
  {
    href: '/pricing',
    title: 'Pricing Page',
  },
  {
    href: '/auth/login',
    title: 'Authentication Design',
  },
  {
    href: '/auth/register',
    title: 'Register Now',
  },
  {
    href: '/404',
    title: '404 Error Page',
  },
  {
    href: '/apps/notes',
    title: 'Notes App',
  },
  {
    href: '/user-profile',
    title: 'User Application',
  },
  {
    href: '/frontend-pages/blog/',
    title: 'Blog Design',
  },
  {
    href: '/apps/ecommerce/eco-checkout',
    title: 'Shopping Cart',
  },
];



export { notifications, profile, pageLinks, appsLink };
