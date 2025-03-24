import { Router } from "express";
import { loginController } from "../controllers/controllerUser/login.controller.js";
import { logoutController } from "../controllers/controllerUser/logout.controller.js";
import { loginSchema } from "../schemas/validateSchema.js";
import { validatorBody } from "../middleware/validateBodyRequest.js";
import { verifyTokenMiddleware } from "../middleware/verifyToken.middleware.js";
import { home } from "../controllers/controllerUser/home.controller.js";
import { newRregisterController } from "../controllers/controllerRegister/newRegister.controller.js";
const router = Router();

// routers for user
router.post("/login", validatorBody(loginSchema), loginController)
router.post("/logout", logoutController)
router.get("/home", verifyTokenMiddleware, home)

// routers for register
router.post("/newRegister", verifyTokenMiddleware, newRregisterController)

export default router