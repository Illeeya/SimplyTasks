import express, { Express, Request, Response, json } from "express";
import cors from "cors";
import Register from "./Registration";
import GetUser from "./Api/User/GetUser";
import CreateUser from "./Api/User/CreateUser";

const server: Express = express();
server.use(json());
server.use(cors());

const myUser = {
    userId: "test02",
    email: "qwe@asd.pl",
    username: "tester2",
    password: "piramida151",
};

server.get("/", async (req: Request, res: Response) => {
    console.log("Someone getted");
    const user = await CreateUser(myUser);
    res.status(200).send(user);
});

server.post("/registerUser", async (req: Request, res: Response) => {
    console.log("Register request");
    const message = await Register(req.body);
    res.status(message.success ? 200 : 500).send(JSON.stringify(message));
});

server.listen(4545, () => {
    console.log("Server HTTP 4545");
});
