import { Router } from "express";
import { archivedTaskController, createTaskController, deleteByIdController, getAllTasksController, getTaskByIdController, updateByIdController } from "../controllers/task.controller.js";
import {ctrlWrapper} from '../middlewares/ctrlWrapper.js'
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { patchSchema, postSchema } from "../schemas/validationSchemaJoi.js";
import { authMiddleware } from "../middlewares/authMiddlewares.js";


const router = Router()

router.use(authMiddleware)
router.get('/', ctrlWrapper(getAllTasksController))

router.get('/:taskId', isValidId,
    ctrlWrapper(getTaskByIdController))

router.post('/', validateBody(postSchema),
    ctrlWrapper(createTaskController))

router.patch('/:taskId', isValidId,
    validateBody(patchSchema),
    ctrlWrapper(updateByIdController))

router.patch('/:taskId/archive', isValidId,
    ctrlWrapper(archivedTaskController))

router.delete('/:taskId',
    isValidId,
    ctrlWrapper(deleteByIdController))

export default router
