import { Request, Response } from "express"
import { getAllTask, getAllTaskAdmin } from "../service/CRUD.js"
import { parsePaginationParams } from "../utils/parsePagination.js"
import { parsedSort } from "../utils/parseSort.js"
import { parseFiltersFields } from "../utils/filterParsers.js"

export const userController = async (req:Request, res:Response):Promise<void> => {
    const user = req.user
    if (!user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
}
    res.status(200).json({
        message: 'Current user',
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
}
export const getAllTasksAdminController = async (req:Request, res:Response):Promise<void> => {
    const { page, perPage } = parsePaginationParams(req.query)
    const filter = parseFiltersFields(req.query)
    const {sortOrder, sortBy,search} = parsedSort(req.query)
    const response = await getAllTaskAdmin({
        page,
        perPage,
        filter,
        sortOrder,
        sortBy,
        search,
    })
    res.status(200).json({
        message: "Success",
        data: response.tasks,
        pagination: response.paginationData
    })
}