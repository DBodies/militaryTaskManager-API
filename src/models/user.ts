import  mongoose from "mongoose";
import { UserInterface } from "../types/user.js";

export const userSchema = new mongoose.Schema<UserInterface>({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
}, {
    timestamps: true
})

userSchema.methods.toJSON = function () {
    const obj = this.toObject()
    delete obj.password
    return obj
}
export const User = mongoose.model<UserInterface>('User', userSchema)