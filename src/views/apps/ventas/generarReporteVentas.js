import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { getReporteVentas } from 'src/services/reporteService.js';
import LogoGamesTech from 'src/assets/images/iconos/logo_negro.png';

const GenerarReporteVentas = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [data, setData] = useState(null);

  const obtenerReporte = async () => {
    try {
      const result = await getReporteVentas(fechaInicio, fechaFin);
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

    // Obtener fecha y hora actuales
    const now = new Date();
    const fechaGeneracion = now.toLocaleDateString();
    const horaGeneracion = now.toLocaleTimeString();

    // Agregar encabezado con logo, fecha y sucursal
    const addHeader = () => {
      const imgWidth = 20; // Ancho del logo
      const imgHeight = 20; // Altura proporcional del logo
      const marginRight = 10; // Margen derecho
      doc.addImage(LogoGamesTech, 'PNG', doc.internal.pageSize.width - imgWidth - marginRight, 10, imgWidth, imgHeight);
      doc.setFontSize(10);
      doc.text(`Sucursal: GamesTech Alameda Celaya, Guanajuato`, 14, 15);
      doc.text(`Generado el: ${fechaGeneracion} a las ${horaGeneracion}`, 14, 20);
    };

    // Agregar encabezado en la primera página
    addHeader();

    doc.setFontSize(16);
    doc.text('Reporte de Ventas', 14, 30);
doc.setFontSize(12);
doc.text(`Periodo: ${fechaInicio} a ${fechaFin}`, 14, 35);
   

    // Resumen general
    autoTable(doc, {
      startY: 40,
      head: [['Producto', 'Resultado']],
      body: [
        ['Total Productos Vendidos', data.totalProductosVendidos],
        ['Total Generado', `$${data.totalVentas.toFixed(2)}`],
        ['Total Utilidad', `$${data.totalUtilidad.toFixed(2)}`],
      ],
    });

    // Utilidad por Producto
    autoTable(doc, {
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Producto', 'Cantidad Vendida', 'Utilidad']],
      body: data.utilidadPorProducto.map((prod) => [
        prod.producto,
        prod.cantidadVendida,
        `$${prod.utilidad.toFixed(2)}`,
      ]),
    });

    // Utilidad por Categoría
    autoTable(doc, {
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Categoría', 'Utilidad']],
      body: data.utilidadPorCategoria.map((cat) => [
        cat.categoria,
        `$${cat.utilidad.toFixed(2)}`,
      ]),
    });

    // Productos Vendidos por Categoría
    autoTable(doc, {
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Categoría', 'Cantidad Vendida']],
      body: data.productosPorCategoria.map((cat) => [
        cat.categoria,
        cat.cantidadVendida,
      ]),
    });

    // Ventas por Método de Pago
    autoTable(doc, {
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Método de Pago', 'Total']],
      body: Object.entries(data.metodoPagoTotales).map(([metodo, total]) => [
        metodo,
        `$${total.toFixed(2)}`,
      ]),
    });

    // Ventas por Usuario
    autoTable(doc, {
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Usuario', 'Total Ventas', 'Total Productos Vendidos']],
      body: data.ventasPorUsuario.map((usuario) => [
        usuario.usuario,
        `$${usuario.totalVentas.toFixed(2)}`,
        usuario.totalProductosVendidos,
      ]),
    });

    // Top Productos Más Vendidos
    autoTable(doc, {
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Top Producto', 'Cantidad Vendida']],
      body: data.topProductos.map((prod) => [
        prod.producto,
        prod.cantidadVendida,
      ]),
    });

    // Top Categoría Más Vendida
    autoTable(doc, {
      startY: doc.previousAutoTable.finalY + 10,
      head: [['Top Categoría', 'Cantidad Vendida']],
      body: [[data.topCategoria.categoria, data.topCategoria.cantidadVendida]],
    });

    
    // Guardar el PDF
    doc.save(`ReporteVentas_${fechaInicio}_a_${fechaFin}.pdf`);
  };

  const generarExcel = () => {
    if (!data) return;
  
    const workbook = XLSX.utils.book_new();
  
    // Resumen general
    const resumenSheet = XLSX.utils.json_to_sheet([
      { Campo: 'Total Productos Vendidos', Valor: data.totalProductosVendidos },
      { Campo: 'Total Ventas', Valor: `$${data.totalVentas.toFixed(2)}` },
      { Campo: 'Total Utilidad', Valor: `$${data.totalUtilidad.toFixed(2)}` },
    ]);
    XLSX.utils.book_append_sheet(workbook, resumenSheet, 'Resumen General');
  
    // Utilidad por Producto
    const utilidadPorProductoSheet = XLSX.utils.json_to_sheet(
      data.utilidadPorProducto.map((prod) => ({
        Producto: prod.producto,
        'Cantidad Vendida': prod.cantidadVendida,
        Utilidad: `$${prod.utilidad.toFixed(2)}`,
      }))
    );
    XLSX.utils.book_append_sheet(workbook, utilidadPorProductoSheet, 'Utilidad por Producto');
  
    // Utilidad por Categoría
    const utilidadPorCategoriaSheet = XLSX.utils.json_to_sheet(
      data.utilidadPorCategoria.map((cat) => ({
        Categoría: cat.categoria,
        Utilidad: `$${cat.utilidad.toFixed(2)}`,
      }))
    );
    XLSX.utils.book_append_sheet(workbook, utilidadPorCategoriaSheet, 'Utilidad por Categoría');
  
    // Productos Vendidos por Categoría
    const productosPorCategoriaSheet = XLSX.utils.json_to_sheet(
      data.productosPorCategoria.map((cat) => ({
        Categoría: cat.categoria,
        'Cantidad Vendida': cat.cantidadVendida,
      }))
    );
    XLSX.utils.book_append_sheet(workbook, productosPorCategoriaSheet, 'Productos por Categoría');
  
    // Ventas por Método de Pago
    const metodoPagoSheet = XLSX.utils.json_to_sheet(
      Object.entries(data.metodoPagoTotales).map(([metodo, total]) => ({
        'Método de Pago': metodo,
        Total: `$${total.toFixed(2)}`,
      }))
    );
    XLSX.utils.book_append_sheet(workbook, metodoPagoSheet, 'Métodos de Pago');
  
    // Ventas por Usuario
    const ventasPorUsuarioSheet = XLSX.utils.json_to_sheet(
      data.ventasPorUsuario.map((usuario) => ({
        Usuario: usuario.usuario,
        'Total Ventas': `$${usuario.totalVentas.toFixed(2)}`,
        'Total Productos Vendidos': usuario.totalProductosVendidos,
      }))
    );
    XLSX.utils.book_append_sheet(workbook, ventasPorUsuarioSheet, 'Ventas por Usuario');
  
    // Top Productos Más Vendidos
    const topProductosSheet = XLSX.utils.json_to_sheet(
      data.topProductos.map((prod) => ({
        Producto: prod.producto,
        'Cantidad Vendida': prod.cantidadVendida,
      }))
    );
    XLSX.utils.book_append_sheet(workbook, topProductosSheet, 'Top Productos');
  
    // Top Categoría Más Vendida
    const topCategoriaSheet = XLSX.utils.json_to_sheet([
      {
        Categoría: data.topCategoria.categoria,
        'Cantidad Vendida': data.topCategoria.cantidadVendida,
      },
    ]);
    XLSX.utils.book_append_sheet(workbook, topCategoriaSheet, 'Top Categoría');
  
    // Estilo básico para las hojas
    [resumenSheet, utilidadPorProductoSheet, utilidadPorCategoriaSheet, productosPorCategoriaSheet, metodoPagoSheet, ventasPorUsuarioSheet, topProductosSheet, topCategoriaSheet].forEach(
      (sheet) => {
        const range = XLSX.utils.decode_range(sheet['!ref']);
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const col = XLSX.utils.encode_col(C);
          sheet[`${col}1`].s = {
            font: { bold: true, color: { rgb: 'FFFFFF' } },
            fill: { fgColor: { rgb: '4CAF50' } },
          };
        }
      }
    );
  
    // Guardar archivo
    XLSX.writeFile(workbook, `ReporteVentas_${fechaInicio}_a_${fechaFin}.xlsx`);
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

export default GenerarReporteVentas;
