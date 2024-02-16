import client from "../../Helpers/DatabaseHelper";

export default async function GetUser(userId: string) {
    try {
        await client.connect();
        const database = client.db("SimplyTasks");
        const collection = database.collection("Users");
        const user = await collection.findOne({ userId: userId });
        return user;
    } finally {
        await client.close();
    }
}
