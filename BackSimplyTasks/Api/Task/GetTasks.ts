import client from "../../Helpers/DatabaseHelper";

export default async function GetTasks(userId: string) {
    try {
        console.log(userId);
        await client.connect();
        const database = client.db("SimplyTasks");
        const collection = database.collection("Tasks");
        const tasksCoursor = collection.find({ ownerId: userId });
        const tasks = await tasksCoursor.toArray();
        return tasks;
    } finally {
        await client.close();
    }
}
