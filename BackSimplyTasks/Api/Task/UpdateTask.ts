import { Collection } from "mongodb";

export default async function UpdateTask(
    collection: Collection,
    taskId: string,
    text: string,
    modifiedDate: string
) {
    const result = await collection.updateOne(
        { taskId: taskId },
        { $set: { text: text, modifiedDate: modifiedDate } }
    );
    if (result.modifiedCount === 1) {
        return { success: true, message: "" };
    } else {
        return { success: false, message: "Could not update task." };
    }
}
