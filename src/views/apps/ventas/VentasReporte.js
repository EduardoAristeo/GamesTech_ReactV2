import React from 'react';
import { CardContent } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import BlankCard from 'src/components/shared/BlankCard';
import GraficaVentasTiempo from 'src/views/charts/GraficaVentasTiempo';
import GraficaProductosPorCategoria from 'src/views/charts/GraficaProductosPorCategoria';
import GenerarReporteVentas from 'src/views/apps/ventas/generarReporteVentas.js';

const BCrumb = [
  { to: '/recepcion', title: 'Inicio' },
  { title: 'Reporte de Ventas' },
];

const ReporteVentas = () => {
  return (
    <PageContainer title="Reporte de Ventas" description="Esta es la página de reportes de ventas">
      <Breadcrumb title="Reporte de Ventas" items={BCrumb} />

      {/* Generar Reporte Ventas */}
      <BlankCard>
        <CardContent>
          <GenerarReporteVentas />
        </CardContent>
      </BlankCard>

      {/* Gráfica Ventas por Tiempo */}
      <BlankCard>
        <CardContent>
          <GraficaVentasTiempo />
        </CardContent>
      </BlankCard>

      {/* Gráfica Productos por Categoría */}
      <BlankCard>
        <CardContent>
          <GraficaProductosPorCategoria />
        </CardContent>
      </BlankCard>
    </PageContainer>
  );
};

export default ReporteVentas;
