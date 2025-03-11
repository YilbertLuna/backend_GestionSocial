import { Router } from "express";
import { loginController } from "../controllers/controllerUser/login.controller.js";
import { logoutController } from "../controllers/controllerUser/logout.controller.js";
import { loginSchema } from "../schemas/validateSchema.js";
import { validatorBody } from "../middleware/validateBodyRequest.js";
import { verifyTokenMiddleware } from "../middleware/verifyToken.middleware.js";
const router = Router();

router.post("/login", validatorBody(loginSchema), loginController)
router.post("/logout", logoutController)

router.get("/hello", verifyTokenMiddleware, (req, res) => {
    try {
        const user = req.User
        res.status(200).json(`Hola ${user.nombre}, de: ${user.dependencia_nombre}`)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

export default router