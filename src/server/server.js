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

export default app;