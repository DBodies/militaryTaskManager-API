import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        trim: true
    },
    description: {
        type: String,
        required:true,
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
        required: true,
    },
    isArchived: {
        type: Boolean,
        default: false
    }
},
    {timestamps: true}
)

export const Task = mongoose.model('Task', taskSchema)