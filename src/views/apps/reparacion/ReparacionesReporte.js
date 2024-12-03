import React from 'react';
import { CardContent } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import BlankCard from 'src/components/shared/BlankCard';
import GraficaReparacionesPorTiempo from 'src/views/charts/GraficaReparacionesTiempo';
import GraficaReparacionesTecnico from 'src/views/charts/GraficaReparacionesTecnico';
import GenerarReporteReparaciones from 'src/views/apps/reparacion/generarReporteReparaciones.js';

const BCrumb = [
  { to: '/recepcion', title: 'Inicio' },
  { title: 'Reporte de Reparaciones' },
];

const ReparacionesReporte = () => {
  return (
    <PageContainer
      title="Reporte de Reparaciones"
      description="Esta es la página de reportes de reparaciones"
    >
      <Breadcrumb title="Reporte de Reparaciones" items={BCrumb} />
        {/* Gráfica Reparaciones por Tiempo */}
      <BlankCard>
        <CardContent>
         <GenerarReporteReparaciones />
        </CardContent>
      </BlankCard>
      {/* Gráfica Reparaciones por Tiempo */}
      <BlankCard>
        <CardContent>
         <GraficaReparacionesPorTiempo />
        </CardContent>
      </BlankCard>
      {/* Gráfica Reparaciones por Tiempo */}
      <BlankCard>
        <CardContent>
         <GraficaReparacionesTecnico />
        </CardContent>
      </BlankCard>

    
    </PageContainer>
  );
};

export default ReparacionesReporte;
