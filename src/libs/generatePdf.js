import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generatePdf = async (dataInfo, requisitosConsignados, requisitosNoConsignados, qrPath) => {
  const generatedPDF = path.resolve("generatedPDF");
  const pdfPath = path.join(generatedPDF, `solicitud_${dataInfo[0].nro_tramite}.pdf`);

  // Verifica si el directorio 'generated' existe, si no, créalo
  if (!fs.existsSync(generatedPDF)) {
    fs.mkdirSync(generatedPDF, { recursive: true });
  }

  const doc = new PDFDocument();

  // Configura el archivo de salida
  doc.pipe(fs.createWriteStream(pdfPath));

  // Desprendible
  doc.font("Helvetica-Bold").fontSize(9).fillColor("white").rect(30, doc.y, 200, 15).fill();
  doc.fillColor("black").text(`N° Solicitud: ${dataInfo[0].nro_tramite}`, 35, doc.y - 12, { continued: true });
  doc.text(`Cédula: ${dataInfo[0].pers_cedula}`, 250, doc.y - 12, { align: "right" });
  doc.moveDown();
  doc.font("Helvetica").fontSize(9).text(`Fecha de la solicitud: ${new Date(dataInfo[0].tram_fecha_inicio).toLocaleDateString()}`);
  doc.text(`Apellidos y Nombres del Solicitante: ${dataInfo[0].pers_apellidos} ${dataInfo[0].pers_nombres}`);
  doc.text(`Apellidos y Nombres del Beneficiario: ${dataInfo[1].pers_apellidos} ${dataInfo[1].pers_nombres}`);
  doc.text(`DEPENDENCIA: ${dataInfo[0].depe_nombre}`);
  doc.text(`ÁREA: ${dataInfo[0].area_descripcion}`);
  doc.text(`TIPO DE SERVICIO: ${dataInfo[0].serv_descripcion}`);
  doc.text(`Monto solicitado: ${parseFloat(dataInfo[0].tram_monto).toFixed(2)} Bs`);
  doc.moveDown();

  // Encabezado
  doc.fontSize(10).text("REPÚBLICA BOLIVARIANA DE VENEZUELA", { align: "center" });
  doc.text("GOBIERNO DEL TÁCHIRA", { align: "center" });
  doc.text(dataInfo[0].depe_nombre, { align: "center" });
  doc.moveDown();

  // Información de la solicitud
  doc.fontSize(9).text(`N° Solicitud: ${dataInfo[0].nro_tramite}`, { continued: true });
  doc.text(`Cédula: ${dataInfo[0].pers_cedula}`, { align: "right" });
  doc.text(`Fecha de la solicitud: ${new Date(dataInfo[0].tram_fecha_inicio).toLocaleDateString()}`);
  doc.text(`Apellidos y Nombres del Solicitante: ${dataInfo[0].pers_apellidos} ${dataInfo[0].pers_nombres}`);
  doc.text(`Apellidos y Nombres del Beneficiario: ${dataInfo[1].pers_apellidos} ${dataInfo[1].pers_nombres}`);
  doc.text(`DEPENDENCIA: ${dataInfo[0].depe_nombre}`);
  doc.text(`ÁREA: ${dataInfo[0].area_descripcion}`);
  doc.text(`TIPO DE SERVICIO: ${dataInfo[0].serv_descripcion}`);
  doc.text(`Monto solicitado: ${parseFloat(dataInfo[0].tram_monto).toFixed(2)} Bs`);
  doc.moveDown();

  // QR Code
  doc.image(qrPath, 450, 50, { fit: [100, 100], align: "center" });

  // Requisitos Consignados
  doc.fontSize(10).text("Requisitos Consignados", { underline: true });
  requisitosConsignados.forEach((req, index) => {
    doc.fontSize(8).text(`${index + 1}. ${req.requ_descripcion}`);
  });
  doc.moveDown();

  // Requisitos No Consignados
  doc.fontSize(10).text("Requisitos No Consignados", { underline: true });
  requisitosNoConsignados.forEach((req, index) => {
    doc.fontSize(8).text(`${index + 1}. ${req.requ_descripcion}`);
  });
  doc.moveDown();

  // Pie de página
  doc.fontSize(8).fillColor("red").text("La generación de esta solicitud NO implica su aprobación.", { align: "center" });
  doc.fillColor("black").text("Este documento vence al 31/12/2025 y este expediente queda en resguardo de la institución.", { align: "center" });

  // Finaliza el PDF
  doc.end();

  return pdfPath;
};