import { Router } from "express";
import { getAllTasksAdminController, userController } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddlewares.js";
import { checkRoles } from "../middlewares/checkRole.js";
const router = Router();
router.get('/me', authMiddleware, userController);
router.get('/admin/tasks', authMiddleware, checkRoles('admin'), getAllTasksAdminController);
export default router;
