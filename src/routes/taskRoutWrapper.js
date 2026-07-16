import { Router } from "express";
import { archivedTaskController, createTaskController, deleteByIdController, getAllTasksController, getTaskByIdController, updateByIdController, upsertByIdController } from "../controllers/task.controller.js";
import {ctrlWrapper} from '../middlewares/ctrlWrapper.js'
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { patchSchema, postSchema } from "../schemas/validationSchemaJoi.js";


const router = Router()

router.get('/', ctrlWrapper(getAllTasksController))

router.get('/:taskId', isValidId,
    ctrlWrapper(getTaskByIdController))

router.post('/', validateBody(postSchema),
    ctrlWrapper(createTaskController))

router.patch('/upsert/:taskId',
    isValidId,
    validateBody(patchSchema),
    ctrlWrapper(upsertByIdController))

router.patch('/:taskId', isValidId,
    validateBody(patchSchema),
    ctrlWrapper(updateByIdController))

router.patch('/:taskId/archive', isValidId,
    ctrlWrapper(archivedTaskController))

router.delete('/:taskId',
    isValidId,
    ctrlWrapper(deleteByIdController))

export default router
