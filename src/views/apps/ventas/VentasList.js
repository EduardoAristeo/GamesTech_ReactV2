// @ts-ignore
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import VentaTableList from 'src/components/apps/ventas/VentasTableList';
import BlankCard from 'src/components/shared/BlankCard';
import { CardContent } from '@mui/material';

const BCrumb = [
  {
    to: '/recepcion',
    title: 'Inicio',
  },
  {
    title: 'Lista de Ventas',
  },
];

const VentasList = () => {
  return (
    <PageContainer title="Lista de Ventas" description="this is Sales List page">
      <Breadcrumb title="Lista de Ventas" items={BCrumb} />
      <BlankCard>
        <CardContent>
          <VentaTableList />
        </CardContent>
      </BlankCard>
    </PageContainer>
  );
};

export default VentasList;
