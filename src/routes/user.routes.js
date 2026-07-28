import { Router } from "express";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";
import { getAllTasksAdminController, userController } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddlewares.js";
import { checkRoles } from "../middlewares/checkRole.js";


const router = Router()

router.get('/me', authMiddleware, ctrlWrapper(userController))
router.get('/admin/tasks', authMiddleware, checkRoles(['admin']), ctrlWrapper(getAllTasksAdminController))
export default router