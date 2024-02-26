import { MongoClient, ServerApiVersion } from "mongodb";

const credentials = "./Assets/mongoDbCert.pem";

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
