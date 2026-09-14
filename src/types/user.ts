export type UserRole = | "user" | 'admin'
export interface UserInterface {
    name: string,
    email: string,
    password: string,
    role: UserRole,
    createdAt: Date,
    updatedAt: Date
}
export type SafeUser = {
    name: string,
    email: string,
}
export type UserLoginResult = {
    user: SafeUser,
    accessToken: string
}

