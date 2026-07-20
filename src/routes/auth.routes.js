import { Router } from "express";
import { loginController, registerController } from "../controllers/authController.js";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";
const router = Router()

router.post('/register', ctrlWrapper(registerController))
router.post('/login', ctrlWrapper(loginController))

export default router