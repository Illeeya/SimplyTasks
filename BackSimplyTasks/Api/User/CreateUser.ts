import client from "../../Helpers/DatabaseHelper";

type User = {
    userId: string;
    email: string;
    username: string;
    password: string;
};
export default async function CreateUser(user: User) {
    try {
        await client.connect();
        const database = client.db("SimplyTasks");
        const collection = database.collection("Users");
        const insertedId = await collection.insertOne(user);
        return insertedId;
    } finally {
        await client.close();
    }
}
