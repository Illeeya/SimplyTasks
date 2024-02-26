import { Collection } from "mongodb";
import { Input } from "./TaskBaseHandler";

type Task = {
    taskId: string;
    ownerId: string;
    text: string;
    creationDate: string;
    modifiedDate: string;
};
export default async function CreateTask(collection: Collection, input: Input) {
    const task: Task = {
        taskId: input.taskId!,
        ownerId: input.userId!,
        text: "",
        creationDate: input.creationDate!,
        modifiedDate: input.modifiedDate!,
    };

    const acknowledged = await collection.insertOne(task);

    if (acknowledged) {
        return { success: true, message: "Task created!" };
    } else {
        return { success: false, message: "Could not create a task!" };
    }
}
