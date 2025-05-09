import { Router } from "express";
import { loginController } from "../controllers/controllerUser/login.controller.js";
import { logoutController } from "../controllers/controllerUser/logout.controller.js";
import { anotherProcessSchema, editProcessSchema, loginSchema, newProcessSchema, selectProcessSchema, updateProcessSchema } from "../schemas/validateSchema.js";
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
import { searchPersonsController } from "../controllers/searchPersons/searchPersons.Controller.js";
import { searchTramiteController } from "../controllers/searchTramite/searchTramite.controller.js";
import { showDataProcessController } from "../controllers/showData/showDataProcess.controller.js";
import { AplicantInfoController } from "../controllers/AplicantInfo/aplicantInfo.controller.js";
import { selectStatusController } from "../controllers/changeStatus/selectStatus.controller.js";
import { changeStatusController } from "../controllers/changeStatus/changeStatus.controller.js";
import { selectProcessController } from "../controllers/changeStatus/selectProcess.controller.js";
import { showProcessBeforeUpdateController } from "../controllers/changeStatus/showProcessBeforeUpdate.controller.js";
import { generatePdfController } from "../controllers/generatePdf/generatePdf.controller.js";
import { getDataPersonController } from "../controllers/dataPerson/dataPerson.controller.js";
import { newProcessController } from "../controllers/newProcess/newProcess.controller.js";
import { requequimentsNoConsignadosController } from "../controllers/requisitosNoConsignados/requisitosNoConsignados.controller.js";
import { requequimentsConsignadosController } from "../controllers/requisitosConsignados/requisitosConsignado.controller.js";
import { updateProcessController } from "../controllers/updateProcess/updateProcess.controller.js";
import { listProcessApprovedController } from "../controllers/reportes/listProcessApproved/listProcessApproved.controller.js";

const router = Router();

// routers for user
router.post("/login", validatorBody(loginSchema), loginController)
router.post("/logout", logoutController)
router.get("/home", verifyTokenMiddleware, home)

// routers for register
router.post("/newRegister", verifyTokenMiddleware, validatorBody(newProcessSchema), newRregisterController)

// router for get requeriments
router.get("/selectArea", verifyTokenMiddleware, selectArea)
router.post("/selectService", verifyTokenMiddleware, selectService)
router.post("/requeriments", verifyTokenMiddleware, requeriments)
router.get("/referido", verifyTokenMiddleware, referido)

// router for get Estado, Municipio and Parroquia
router.get("/estado", verifyTokenMiddleware, getEstado)
router.post("/municipio", verifyTokenMiddleware, getMunicipions)
router.post("/parroquia", verifyTokenMiddleware, getParroquia)

// router for search persons
router.post("/searchPersons", verifyTokenMiddleware, searchPersonsController)

// router for seatch tramite
router.post("/searchTramite", verifyTokenMiddleware, searchTramiteController)

// router for show data
router.get("/showDataProcess/:id_tram", verifyTokenMiddleware, showDataProcessController)
router.get("/aplicantDataInfo/:person", verifyTokenMiddleware, AplicantInfoController)

// router for change status process
router.post("/selectProcess", verifyTokenMiddleware, validatorBody(selectProcessSchema), selectProcessController)
router.get("/dataProcess/:id_tram", verifyTokenMiddleware, showProcessBeforeUpdateController)
router.get("/selectStatus", verifyTokenMiddleware, selectStatusController)
router.put("/changeStatus", verifyTokenMiddleware, validatorBody(updateProcessSchema), changeStatusController)

// router for generate pdf
router.get("/generatePdf/:personId/:tramiteId", verifyTokenMiddleware, generatePdfController);

// router for get data person for new process
router.get("/getDataPerson/:personId", verifyTokenMiddleware, getDataPersonController)
router.post("/newProcess", verifyTokenMiddleware, validatorBody(anotherProcessSchema), newProcessController)

// router for edit process
// requisitos no consignados
router.get("/requisitosNoConsignados/:tramiteId", verifyTokenMiddleware, requequimentsNoConsignadosController)
router.get("/requisitosConsignados/:tramiteId", verifyTokenMiddleware, requequimentsConsignadosController)
router.put("/updateProcess", verifyTokenMiddleware, validatorBody(editProcessSchema), updateProcessController)

// reportes
// router for create list process with status "aprobado"
router.get("/listProcessApproved", verifyTokenMiddleware, listProcessApprovedController)
export default router