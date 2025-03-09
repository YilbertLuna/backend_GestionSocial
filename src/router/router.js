import { Router } from "express";
import { loginController } from "../controllers/login.controller.js";
import { loginSchema } from "../schemas/validateSchema.js";
import { validatorBody } from "../middleware/validateBodyRequest.js";

const router = Router();

router.post("/login", validatorBody(loginSchema), loginController)

export default router