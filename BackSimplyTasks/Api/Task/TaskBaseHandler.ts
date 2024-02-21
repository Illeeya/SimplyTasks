import { Collection } from "mongodb";
import client from "../../Helpers/DatabaseHelper";
import DeleteTask from "./DeleteTask";
import GetTasks from "./GetTasks";
import UpdateTask from "./UpdateTask";
import createMongoClient from "../../Helpers/DatabaseHelper";

type Response = {
    success: boolean;
    message: any[] | string;
};

type Operation = "GET" | "UPDATE" | "DELETE";
export default async function TaskBaseHandler(
    operation: Operation,
    id: string,
    text: string = "",
    modifiedDate: string = ""
): Promise<Response> {
    const client = createMongoClient();
    try {
        await client.connect();
        const database = client.db("SimplyTasks");
        const collection: Collection<Document> = database.collection("Tasks");

        switch (operation) {
            case "GET":
                return await GetTasks(collection, id);

            case "DELETE":
                return await DeleteTask(collection, id);

            case "UPDATE":
                return await UpdateTask(collection, id, text, modifiedDate);

            default:
                return { success: false, message: "Unknown operation!" };
        }
    } catch (error) {
        return { success: false, message: `${error}` };
    } finally {
        await client.close();
    }
}
