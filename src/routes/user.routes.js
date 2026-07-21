import { Router } from "express";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";
import { adminController, userController } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddlewares.js";
import { checkRoles } from "../middlewares/checkRole.js";

const router = Router()

router.get('/me', authMiddleware, ctrlWrapper(userController))
router.get('/admin', authMiddleware, checkRoles(['admin']), ctrlWrapper(adminController))
export default router