import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskId: {
        type: String,
        required: true,
        unique: true,
    },
    ownerId: {
        type: String,
        required: true,
        unique: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
