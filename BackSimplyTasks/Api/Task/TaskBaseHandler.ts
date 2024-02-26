import { Collection } from "mongodb";
import DeleteTask from "./DeleteTask";
import GetTasks from "./GetTasks";
import UpdateTask from "./UpdateTask";
import createMongoClient from "../../Helpers/DatabaseHelper";
import CreateTask from "./CreateTask";

type Response = {
    success: boolean;
    message: any[] | string;
};

export type Input = {
    userId?: string;
    taskId?: string;
    text?: string;
    creationDate?: string;
    modifiedDate?: string;
};

type Operation = "GET" | "UPDATE" | "DELETE" | "CREATE";
export default async function TaskBaseHandler(
    operation: Operation,
    input: Input
    // id: string,
    // text: string = "",
    // date: string = ""
): Promise<Response> {
    const client = createMongoClient();
    try {
        await client.connect();
        const database = client.db("SimplyTasks");
        const collection: Collection = database.collection("Tasks");

        switch (operation) {
            case "GET":
                return await GetTasks(collection, input.userId!);
            case "CREATE":
                return await CreateTask(collection, input);
            case "DELETE":
                return await DeleteTask(collection, input.taskId!);

            case "UPDATE":
                return await UpdateTask(
                    collection,
                    input.taskId!,
                    input.text!,
                    input.modifiedDate!
                );

            default:
                return { success: false, message: "Unknown operation!" };
        }
    } catch (error) {
        return { success: false, message: `${error}` };
    } finally {
        await client.close();
    }
}
