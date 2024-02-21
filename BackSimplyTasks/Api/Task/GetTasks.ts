import { Collection } from "mongodb";

export default async function GetTasks(collection: Collection<Document>, userId: string) {
    const tasksCoursor = collection.find({ ownerId: userId });
    const tasks = await tasksCoursor.toArray();
    return { success: true, message: tasks };
}
