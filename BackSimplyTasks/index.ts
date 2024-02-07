import express, { Express, Request, Response, json } from "express";
import cors from "cors";

const server: Express = express();
server.use(json());
server.use(cors());

server.get("/", (req: Request, res: Response) => {
    console.log("Someone getted");
    res.status(200).send("Getter");
});

server.listen(6969, () => {
    console.log("Server HTTP 6969");
});
