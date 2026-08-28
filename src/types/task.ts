import { Types } from "mongoose"

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
    owner?: ownerType
}