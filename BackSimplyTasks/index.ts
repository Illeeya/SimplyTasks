import express, { Express, Request, Response, json } from "express";
import cors from "cors";
import Register from "./Helpers/RegistrationHelper";
import GetUser from "./Api/User/GetUser";
import CreateUser from "./Api/User/CreateUser";
import rateLimit from "express-rate-limit";
import Login from "./Helpers/LoginHelper";

const limiter = rateLimit({
    windowMs: 60000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
});

const server: Express = express();
server.use(json());
server.use(cors());
server.use(limiter);

// const myUser = { username: "tester3", password: "yess" };

server.get("/login", async (req: Request, res: Response) => {
    console.log("Login request");
    const result = await Login(req.body);
    if (result !== "unknown") {
        res.status(200).send(result);
    } else {
        res.status(500).send("Invalid username or password!");
    }
});

server.post("/registerUser", async (req: Request, res: Response) => {
    console.log("Register request");
    const message = await Register(req.body);
    res.status(message.success ? 200 : 500).send(JSON.stringify(message));
});

server.listen(4545, () => {
    console.log("Server HTTP 4545");
});
