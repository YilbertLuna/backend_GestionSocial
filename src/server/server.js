import express from "express";
import morgan from "morgan";
import router from "../router/router.js";

const app = express()

app.use(morgan("dev"))
app.use(express.json())

app.use("/api", router)

app.get("/", (req, res) => {
    res.set("Content-Type", "text/json")
    res.status(200).json("welcome to my server")
})

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