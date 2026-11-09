import { Router } from "express";
import { loginController, registerController } from "../controllers/authController.js";
import { validateBody } from "../middlewares/validateBody.js";
import { loginSchema, registerSchema } from "../schemas/authSchemas.js";
const router = Router()

router.post('/register',  validateBody(registerSchema),registerController)
router.post('/login', validateBody(loginSchema),loginController)

export default router