export type UserRole = | "user" | 'admin'
export interface User {
    name: string,
    email: string,
    password: string,
    role: UserRole,
    createdAt: Date,
    updatedAt: Date
}