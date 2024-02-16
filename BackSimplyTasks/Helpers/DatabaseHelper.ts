import { MongoClient, ServerApiVersion } from "mongodb";

const credentials = "./Assets/X509-cert-6735106057220143552.pem";
const client = new MongoClient(
    "mongodb+srv://cluster0.e0hp7vj.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority",
    {
        tlsCertificateKeyFile: credentials,
        serverApi: ServerApiVersion.v1,
    }
);

export default client;

// async function run() {
//     try {
//         await client.connect();
//         const database = client.db("SimplyTasks");
//         const collection = database.collection("Tasks");
//         const docCount = await collection.countDocuments({});
//         const a = await collection.findOne({ test: "qwe" });
//         return a;
//     } finally {
//         await client.close();
//     }
// }
