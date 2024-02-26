import { Collection } from "mongodb";

export default async function DeleteTask(collection: Collection, taskId: string) {
    const result = await collection.deleteOne({ taskId: taskId });
    if (result.deletedCount === 0) {
        return { success: false, message: "Could not delete the task." };
    } else {
        return { success: true, message: "" };
    }
}
