import { generatePdfService } from "../../services/generatePdf.services.js";
import fs from "fs"

export const generatePdfController = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/pdf");

    const { personId, tramiteId } = req.params;
    const {pdfPath, dataInfo} = await generatePdfService(personId, tramiteId);

    await new Promise(resolve => setTimeout(resolve, 2000));

    res.download(pdfPath, `solicitud_${dataInfo[0].nro_tramite}.pdf`, (err) => {
      if (err) {
        console.error("Error al descargar:", err);
        return res.status(500).send("Error al enviar el PDF");
      }

      // elimina el archivo PDF, si es necesario que no se elimine, comentar el siguiente bloque
      setTimeout(() => {
        fs.unlink(pdfPath, (unlinkErr) => {
          if(unlinkErr) {
            console.error("error al eliminar el archivo pdf:", unlinkErr)
          }
        }, 20000)
      })
    });
  } catch (error) {
    console.error("Error en generatePdfController:", error);
    return res.status(500).send("Error al generar el PDF");
  }
};
