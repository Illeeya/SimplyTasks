import createMongoClient from "../../Helpers/DatabaseHelper";

type User = {
    userId: string;
    username: string;
    password: string;
    salt: string;
};

export default async function CreateUser(user: User) {
    const client = createMongoClient();
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
