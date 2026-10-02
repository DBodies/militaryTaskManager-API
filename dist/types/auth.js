const roles = ["user", 'admin'];
export const isAccessTokenPayload = (value) => {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    if (!("userId" in value) || typeof value.userId !== "string") {
        return false;
    }
    if (!("role" in value) || typeof value.role !== 'string') {
        return false;
    }
    return roles.some((role) => role === value.role);
};
