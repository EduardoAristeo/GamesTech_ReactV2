// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Box } from '@mui/material';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ProductChecout from 'src/components/apps/ecommerce/productCheckout/ProductCheckout';
import ChildCard from 'src/components/shared/ChildCard';

const BCrumb = [
  {
    to: '/apps/ecommerce/shop',
    title: 'Tienda Accesorios',
  },
  {
    title: 'Confirmar Venta',
  },
];

const EcommerceCheckout = () => {
  return (
    <PageContainer title="Confirmar Venta" description="Pagina de confirmación">
      {/* breadcrumb */}
      <Breadcrumb title="Confirmar Venta" items={BCrumb} />
      <ChildCard>
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}
        <Box sx={{
          p: {
            xs: '0', sm: '24px'
          }
        }} flexGrow={1}>
          <ProductChecout />
        </Box>
      </ChildCard>
    </PageContainer>
  );
};

export default EcommerceCheckout;
