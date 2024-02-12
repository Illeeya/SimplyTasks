import express, { Express, Request, Response, json } from "express";
import cors from "cors";

const server: Express = express();
server.use(json());
server.use(cors());

server.get("/", (req: Request, res: Response) => {
    console.log("Someone getted");
    res.status(200).send("Getter");
});

server.post("/registerUser", (req: Request, res: Response) => {
    console.log(req.body);
    res.status(200).send("Properly registered");
});

server.listen(4545, () => {
    console.log("Server HTTP 4545");
});
