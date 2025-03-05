import express from "express";
import morgan from "morgan";

const app = express()

app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.set("Content-Type", "text/json")
    res.status(200).json("welcome to my server")
})

export default app;