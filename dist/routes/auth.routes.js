import { Router } from "express";
import { loginController, registerController } from "../controllers/authController.js";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { loginSchema, registerSchema } from "../schemas/authSchemas.js";
const router = Router();
router.post('/register', validateBody(registerSchema), ctrlWrapper(registerController));
router.post('/login', validateBody(loginSchema), ctrlWrapper(loginController));
export default router;
