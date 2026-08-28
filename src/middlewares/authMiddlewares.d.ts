import type { Types } from "mongoose";
import { UserRole } from "../types/user.ts";

export type AuthenticateUser = {
    _id: Types.ObjectId,
    name: string,
    email: string,
    role: UserRole
}
