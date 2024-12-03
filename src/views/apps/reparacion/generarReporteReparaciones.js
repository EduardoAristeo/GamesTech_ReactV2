import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { getReporteReparaciones } from 'src/services/reparacionService';
import LogoGamesTech from 'src/assets/images/iconos/logo_negro.png';

const GenerarReporteReparaciones = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [data, setData] = useState(null);

  const obtenerReporte = async () => {
    try {
      const result = await getReporteReparaciones(fechaInicio, fechaFin);
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error al obtener el reporte:', error);
    }
  };

  const generarPDF = () => {
    if (!data) return;

    const doc = new jsPDF();
    const now = new Date();
    const fechaGeneracion = now.toLocaleDateString();
    const horaGeneracion = now.toLocaleTimeString();

    const addHeader = () => {
      const imgWidth = 20;
      const imgHeight = 20;
      const marginRight = 10;
      doc.addImage(LogoGamesTech, 'PNG', doc.internal.pageSize.width - imgWidth - marginRight, 10, imgWidth, imgHeight);
      doc.setFontSize(10);
      doc.text(`Sucursal: GamesTech Alameda Celaya, Guanajuato`, 14, 15);
      doc.text(`Generado el: ${fechaGeneracion} a las ${horaGeneracion}`, 14, 20);
    };

    addHeader();

    doc.setFontSize(16);
    doc.text('Reporte de Reparaciones', 14, 30);
    doc.setFontSize(12);
    doc.text(`Periodo: ${fechaInicio} a ${fechaFin}`, 14, 35);

    autoTable(doc, {
      startY: 40,
      head: [['Métrica', 'Resultado']],
      body: [
        ['Cotizaciones Entregadas', `$${data.cotizacionesEntregadas}`],
        ['Cotizaciones Completadas', `$${data.cotizacionesCompletadas}`],
        ['Reparaciones Ingresadas', data.cantidadIngresadas],
      ],
    });

    autoTable(doc, {
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Falla', 'Cantidad']],
      body: data.reparacionesPorFalla.map((falla) => [falla._id, falla.total]),
    });

    autoTable(doc, {
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Técnico', 'Cantidad']],
      body: data.reparacionesPorTecnico.map((tecnico) => [
        `${tecnico._id.nombre} ${tecnico._id.apellido}`,
        tecnico.total,
      ]),
    });

    autoTable(doc, {
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Estatus', 'Cantidad']],
      body: data.reparacionesPorEstatus.map((estatus) => [estatus._id, estatus.total]),
    });

    autoTable(doc, {
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Falla', 'Cantidad']],
      body: data.top5Fallas.map((falla) => [falla._id, falla.total]),
    });

    // Reparaciones segmentadas
// Reparaciones segmentadas
autoTable(doc, {
    startY: doc.previousAutoTable.finalY + 10,
    head: [
      [
        'Recepción',
        'Técnico',
        'Cliente',
        'Marca',
        'Modelo',
        'Ingreso',
        'Diagnóstico',
        'Entregado',
        'Estatus',
        'Cotización',
        'Fallas',
      ],
    ],
    body: data.reparacionesSegmentadas.map((reparacion) => [
      `${reparacion.recepcion.nombre} ${reparacion.recepcion.apellido}`,
      reparacion.tecnico ? `${reparacion.tecnico.nombre} ${reparacion.tecnico.apellido}` : 'N/A',
      `${reparacion.cliente.nombre} ${reparacion.cliente.apellido}`,
      reparacion.marca,
      reparacion.modelo,
      reparacion.fechaIngreso.split('T')[0],
      reparacion.fechaDiagnostico ? reparacion.fechaDiagnostico.split('T')[0] : 'N/A',
      reparacion.fechaEntregado ? reparacion.fechaEntregado.split('T')[0] : 'N/A',
      reparacion.estatus,
      `$${reparacion.cotizacion}`,
      reparacion.fallas.map((f) => f.falla).join(', '), // Aquí procesamos las fallas para que estén en una línea
    ]),
    styles: { fontSize: 10 }, // Ajuste del tamaño de la fuente para mejor espacio
    columnStyles: {
      0: { cellWidth: 25 }, // Recepción
      1: { cellWidth: 25 }, // Técnico
      2: { cellWidth: 25 }, // Cliente
      3: { cellWidth: 20 }, // Marca
      4: { cellWidth: 20 }, // Modelo
      5: { cellWidth: 20 }, // Ingreso
      6: { cellWidth: 20 }, // Diagnóstico
      7: { cellWidth: 20 }, // Entregado
      8: { cellWidth: 20 }, // Estatus
      9: { cellWidth: 20 }, // Cotización
      10: { cellWidth: 50 }, // Fallas
    },
    didDrawCell: (data) => {
      if (data.section === 'body' && data.column.index === 10) {
        // Ajustamos la celda de fallas si es necesario
        const text = data.cell.raw;
        const lines = doc.splitTextToSize(text, 50); // Ajusta el ancho aquí
        data.cell.text = lines;
      }
    },
  });
  
  

    doc.save(`ReporteReparaciones_${fechaInicio}_a_${fechaFin}.pdf`);
  };

  const generarExcel = () => {
    if (!data) return;

    const workbook = XLSX.utils.book_new();

    const resumenSheet = XLSX.utils.json_to_sheet([
      { Métrica: 'Cotizaciones Entregadas', Valor: data.cotizacionesEntregadas },
      { Métrica: 'Cotizaciones Completadas', Valor: data.cotizacionesCompletadas },
      { Métrica: 'Reparaciones Ingresadas', Valor: data.cantidadIngresadas },
    ]);
    XLSX.utils.book_append_sheet(workbook, resumenSheet, 'Resumen General');

    const fallasSheet = XLSX.utils.json_to_sheet(
      data.reparacionesPorFalla.map((falla) => ({ Falla: falla._id, Cantidad: falla.total }))
    );
    XLSX.utils.book_append_sheet(workbook, fallasSheet, 'Fallas');

    const tecnicosSheet = XLSX.utils.json_to_sheet(
      data.reparacionesPorTecnico.map((tecnico) => ({
        Técnico: `${tecnico._id.nombre} ${tecnico._id.apellido}`,
        Cantidad: tecnico.total,
      }))
    );
    XLSX.utils.book_append_sheet(workbook, tecnicosSheet, 'Técnicos');

    const estatusSheet = XLSX.utils.json_to_sheet(
      data.reparacionesPorEstatus.map((estatus) => ({ Estatus: estatus._id, Cantidad: estatus.total }))
    );
    XLSX.utils.book_append_sheet(workbook, estatusSheet, 'Estatus');

    const segmentadasSheet = XLSX.utils.json_to_sheet(
      data.reparacionesSegmentadas.map((reparacion) => ({
        Recepción: `${reparacion.recepcion.nombre} ${reparacion.recepcion.apellido}`,
        Técnico: reparacion.tecnico ? `${reparacion.tecnico.nombre} ${reparacion.tecnico.apellido}` : 'N/A',
        Cliente: `${reparacion.cliente.nombre} ${reparacion.cliente.apellido}`,
        Marca: reparacion.marca,
        Modelo: reparacion.modelo,
        Ingreso: reparacion.fechaIngreso.split('T')[0],
        Diagnóstico: reparacion.fechaDiagnostico ? reparacion.fechaDiagnostico.split('T')[0] : 'N/A',
        Entregado: reparacion.fechaEntregado ? reparacion.fechaEntregado.split('T')[0] : 'N/A',
        Estatus: reparacion.estatus,
        Cotización: `$${reparacion.cotizacion}`,
        Fallas: reparacion.fallas.map((f) => f.falla).join(', '),
      }))
    );
    XLSX.utils.book_append_sheet(workbook, segmentadasSheet, 'Reparaciones');

    XLSX.writeFile(workbook, `ReporteReparaciones_${fechaInicio}_a_${fechaFin}.xlsx`);
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <TextField
        label="Fecha Inicio"
        type="date"
        value={fechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Fecha Fin"
        type="date"
        value={fechaFin}
        onChange={(e) => setFechaFin(e.target.value)}
        InputLabelProps={{ shrink: true }}
        style={{ marginLeft: 16 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={obtenerReporte}
        style={{ marginLeft: 16 }}
      >
        Generar Reporte
      </Button>
      {data && (
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={generarPDF}
            style={{ marginLeft: 16 }}
          >
            Descargar PDF
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={generarExcel}
            style={{ marginLeft: 16 }}
          >
            Descargar Excel
          </Button>
        </>
      )}
    </div>
  );
};

export default GenerarReporteReparaciones;
