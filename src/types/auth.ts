export type RegisterDTO = {
    name: string,
    email: string,
    password: string
}
export type LoginDTO = {
    email: string,
    password: string
}

const roles = ["user", 'admin'] as const
type UserRoles = (typeof roles)[number]


type AccessTokenPayload = {
    userId: string,
    role: UserRoles
} 
export const isAccessTokenPayload = (value: unknown): value is AccessTokenPayload => {
    if (typeof value !== 'object' || value === null) {
        return false
    }
    if (!("userId" in value) || typeof value.userId !== "string") {
        return false
    }
    if (!("role" in value) || typeof value.role !== 'string') {
        return false
    }
    return roles.some((role) => role === value.role)
}