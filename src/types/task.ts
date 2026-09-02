import { QueryFilter, Types } from "mongoose"
import { SortBy } from "../utils/parseSort.js"
import { SortOrder } from "../constants/index.js"

export type TaskStatus = | 'pending' | 'in_progress' | 'completed' | 'cancelled'
export type TaskPriority = | 'low' | 'medium' | 'high' | 'critical'
export type TaskCategory = | 'general' | 'training' | 'logistics' | 'maintenance' | "operation"
export type ownerType = Types.ObjectId
export interface Task  {
    title: string,
    description?: string,
    status: TaskStatus,
    priority: TaskPriority,
    category: TaskCategory,
    dueDate?: Date,
    isArchived?: boolean,
    owner: ownerType,
    createdAt: Date,
    updatedAt: Date
}
export interface CreatedTaskDTO  {
    title: string,
    description: string,
    status: TaskStatus,
    priority: TaskPriority,
    category: TaskCategory,
    dueDate?: Date,
}
export interface UpdatedTaskDTO  {
    title?: string,
    description?: string,
    status?: TaskStatus,
    priority?: TaskPriority,
    category?: TaskCategory,
    dueDate?: Date,
}
export type GetAllTaskParams = {
    page?: number,
    perPage?: number,
    filter?: QueryFilter<Task>,
    sortOrder?: SortOrder
    sortBy?: SortBy,
    search?: string,
    owner: Types.ObjectId
}
export type CreateTaskServiceParams = CreatedTaskDTO & {
  owner: Types.ObjectId;
};

export type TaskOwnerParams = {
        taskId: string,
        owner: Types.ObjectId
}
    export type GetUpdateById = {
        taskId: string,
        owner: Types.ObjectId,
        updateData: UpdatedTaskDTO,
        options?: {}
}
