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
        return qrPath;
    } catch (error) {
        throw new Error(`Error generating QR code: ${error.message}`);
    }
};