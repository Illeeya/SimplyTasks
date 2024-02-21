import { MongoClient, ServerApiVersion } from "mongodb";

const credentials = "./Assets/X509-cert-6735106057220143552.pem";

const createMongoClient = () => {
    return new MongoClient(
        "mongodb+srv://cluster0.e0hp7vj.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority",
        {
            tlsCertificateKeyFile: credentials,
            serverApi: ServerApiVersion.v1,
        }
    );
};

export default createMongoClient;
