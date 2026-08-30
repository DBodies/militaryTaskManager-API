import { Schema, model } from "mongoose";
const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        trim: true
    },
    description: {
        type: String,
        maxlength: 1000,
        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "in_progress", "completed", "cancelled"],
        required: true,
        default: "pending"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        required: true,
        default: "medium"
    },
    category: {
        type: String,
        enum: ["general", "training", "logistics", "maintenance", "operation"],
        required: true,
        default: "general"
    },
    dueDate: {
        type: Date,
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });
export const TaskModel = model('Task', taskSchema);
