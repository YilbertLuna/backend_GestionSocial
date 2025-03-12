import { Router } from "express";
import { loginController } from "../controllers/controllerUser/login.controller.js";
import { logoutController } from "../controllers/controllerUser/logout.controller.js";
import { loginSchema } from "../schemas/validateSchema.js";
import { validatorBody } from "../middleware/validateBodyRequest.js";
import { verifyTokenMiddleware } from "../middleware/verifyToken.middleware.js";
import { home } from "../controllers/controllerUser/home.controller.js";
const router = Router();

router.post("/login", validatorBody(loginSchema), loginController)
router.post("/logout", logoutController)

router.get("/home", verifyTokenMiddleware, home)

export default router