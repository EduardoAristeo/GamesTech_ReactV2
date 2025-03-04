// @ts-ignore
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer'; //src/components/apps/ecommerce/ProductTableList/ProductTableList
import ProductTableList from 'src/components/apps/ecommerce/ProductTableList/ProductTableList';
import BlankCard from 'src/components/shared/BlankCard';
import { InvoiceProvider } from 'src/context/InvoiceContext/index';
import { CardContent } from '@mui/material';

const BCrumb = [
  {
    to: '/recepcion',
    title: 'Inicio',
  },
  {
    title: 'Lista',
  },
];

const EcomProductList = () => {
  return (
    <InvoiceProvider>
    <PageContainer title="Lista de productos" description="this is Shop List page">
      {/* breadcrumb */}
      <Breadcrumb title="Lista de productos" items={BCrumb} />
      <BlankCard>
      <CardContent>
        <ProductTableList />
      </CardContent>
      </BlankCard>
    </PageContainer>
    </InvoiceProvider>
  );
};

export default EcomProductList;
