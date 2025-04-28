import QRCode from "qrcode";
import fs from "fs";
import path from "path";

export const generateQRCode = async (data, filename) => {
    try {
        const qrDir = path.resolve("qrcodes");

        // Crear el directorio "qrcodes" si no existe
        if (!fs.existsSync(qrDir)) {
            fs.mkdirSync(qrDir);
        }

        const qrPath = path.resolve(qrDir, `${filename}.png`);
        await QRCode.toFile(qrPath, data, {
            width: 300,
            margin: 2,
        });

        // elimina el archivo QR, si es necesario que no se elimine, comentar el siguiente bloque
        setTimeout(() => {
            fs.unlink(qrPath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error(`Error al eliminar el archivo QR: ${unlinkErr}`);
                } else {
                    console.log(`Archivo QR ${qrPath} eliminado correctamente después de 20 segundos.`);
                }
            });
        }, 1000);

        return qrPath;
    } catch (error) {
        throw new Error(`Error generating QR code: ${error.message}`);
    }
};