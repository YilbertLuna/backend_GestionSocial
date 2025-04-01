import { Router } from "express";
import { loginController } from "../controllers/controllerUser/login.controller.js";
import { logoutController } from "../controllers/controllerUser/logout.controller.js";
import { loginSchema } from "../schemas/validateSchema.js";
import { validatorBody } from "../middleware/validateBodyRequest.js";
import { verifyTokenMiddleware } from "../middleware/verifyToken.middleware.js";
import { home } from "../controllers/controllerUser/home.controller.js";
import { newRregisterController } from "../controllers/controllerRegister/newRegister.controller.js";
import { requeriments } from "../controllers/requeriments/requeriments.controller.js";
import { selectArea } from "../controllers/requeriments/selectArea.controller.js";
import { selectService } from "../controllers/requeriments/selectService.controller.js";
import { referido } from "../controllers/requeriments/referido.controller.js";
import { getEstado } from "../controllers/localidad/getEstado.controller.js";
import { getMunicipions } from "../controllers/localidad/getMunicipio.controller.js";
import { getParroquia } from "../controllers/localidad/getParroquia.controller.js";

const router = Router();

// routers for user
router.post("/login", validatorBody(loginSchema), loginController)
router.post("/logout", logoutController)
router.get("/home", verifyTokenMiddleware, home)

// routers for register
router.post("/newRegister", verifyTokenMiddleware, newRregisterController)

// router for get requeriments
router.get("/selectArea", verifyTokenMiddleware, selectArea)
router.post("/selectService", verifyTokenMiddleware, selectService)
router.post("/requeriments", verifyTokenMiddleware, requeriments)
router.get("/referido", verifyTokenMiddleware, referido)

// router for get Estado, Municipio and Parroquia
router.get("/estado", verifyTokenMiddleware, getEstado)
router.post("/municipio", verifyTokenMiddleware, getMunicipions)
router.post("/parroquia", verifyTokenMiddleware, getParroquia)

export default router