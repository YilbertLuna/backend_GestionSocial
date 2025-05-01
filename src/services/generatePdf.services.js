import { DataForPdf } from "../repository/getDataForCreatePdf.Repository.js";
import { generateQRCode } from "./generateQrCode.services.js";
import { generatePdf } from "../libs/generatePdf.js";

const data = new DataForPdf()

export const generatePdfService = async (personId, tramiteId) => {
  // Obtén los datos de la persona y del trámite
  const dataInfo = await data.getData(personId, tramiteId);
  const requisitosConsignados = await data.getRequisitosConsignados(tramiteId); 
  const requisitosNoConsignados = await data.getRequisitosNoConsignados(tramiteId);

  // Genera el código QR con el número del trámite
  const qrData = `Numero de Tramite: ${dataInfo[0].nro_tramite}`;
  const qrFilename = dataInfo[0].nro_tramite;
  const qrPath = await generateQRCode(qrData, qrFilename);

  // Genera el PDF con los datos y el QR
  const pdfPath = await generatePdf(dataInfo, requisitosConsignados, requisitosNoConsignados, qrPath);

  return {pdfPath, dataInfo}
};