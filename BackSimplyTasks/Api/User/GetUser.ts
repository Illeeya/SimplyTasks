import client from "../../Helpers/DatabaseHelper";

export default async function GetUser(username: string) {
    try {
        await client.connect();
        const database = client.db("SimplyTasks");
        const collection = database.collection("Users");
        const user = await collection.findOne({ username: username });
        return user;
    } finally {
        await client.close();
    }
}
