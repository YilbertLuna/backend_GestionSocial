import express from "express";
import morgan from "morgan";
import router from "../router/router.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

// Configurar Express para confiar en los encabezados de proxy
app.set('trust proxy', true);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    secure: false,
}));

// Middleware para obtener la IP del cliente
app.use((req, res, next) => {
    // Obtener la dirección IP del cliente
    const clientIP = req.headers['x-forwarded-for'] || req.ip;

    // Extraer la parte IPv4 si está en formato IPv6 mapeado
    const ipv4 = clientIP.replace('::ffff:', '');

    // Agregar la IP al objeto req
    req.clientIP = ipv4;

    // Continuar con el siguiente middleware o ruta
    next();
});

app.use("/api", router);

app.get("/", (req, res) => {
    res.set("Content-Type", "text/json");
    res.status(200).json({
        message: "Welcome to my server",
        yourIP: req.clientIP,
    });
});

// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
    return res.status(404).json({
        success: false,
        message: 'Resource not found',
    });
});

// Manejador de errores global (500)
app.use((err, req, res, next) => {
    return res.status(500).json({ error: 'Something went wrong!' });
});

export default app;