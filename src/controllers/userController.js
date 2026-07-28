import { getAllTask } from "../service/CRUD.js"
import { parsePaginationParams } from "../utils/parsePagination.js"
import { parsedSort } from "../utils/parseSort.js"

export const userController = async (req, res) => {
    const user = req.user
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
export const getAllTasksAdminController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query)
    const filter = parseFiltersFields(req.query)
    const {sortOrder, sortBy,search} = parsedSort(req.query)
    const response = await getAllTask({
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