import express, { Express, Request, Response, json } from "express";
import cors from "cors";
import Register from "./Helpers/RegistrationHelper";
import rateLimit from "express-rate-limit";
import Login from "./Helpers/LoginHelper";
import TaskBaseHandler from "./Api/Task/TaskBaseHandler";

const limiter = rateLimit({
    windowMs: 60000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
});

const server: Express = express();
server.use(json());
server.use(cors());
server.use(limiter);

server.get("/test", async (req: Request, res: Response) => {
    setTimeout(() => {
        res.status(200).send("test");
    }, 5000);
});

server.get("/tasks/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const result = await TaskBaseHandler("GET", userId);
    if (result.success) {
        const tasks = result.message;
        console.log(tasks);
        res.status(200).send({ tasks });
    } else {
        console.log("Ewwow");
        res.status(500).send(JSON.stringify(result));
    }
});

server.delete("/deleteTask/:taskId", async (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const result = await TaskBaseHandler("DELETE", taskId);
    res.status(result.success ? 200 : 500).send(
        result.success ? "Task deleted" : result.message
    );
});

server.put("/updateTask/:taskId", async (req: Request, res: Response) => {
    console.log("Updating task!");
    const taskId = req.params.taskId;
    const result = await TaskBaseHandler(
        "UPDATE",
        taskId,
        req.body.text,
        req.body.modifiedDate
    );
    res.status(result.success ? 200 : 500).send(
        result.success ? "Task updated" : result.message
    );
});

server.post("/login", async (req: Request, res: Response) => {
    console.log("Login request");
    const result = await Login(req.body);
    if (result !== "unknown") {
        res.status(200).send(
            JSON.stringify({ success: true, message: "Login successful", userId: result })
        );
    } else {
        res.status(500).send(
            JSON.stringify({ success: true, message: "Invalid username or password!" })
        );
    }
});

server.post("/registerUser", async (req: Request, res: Response) => {
    console.log("Register request");
    const message = await Register(req.body);
    res.status(message.success ? 200 : 500).send(JSON.stringify(message));
});

server.listen(8080, () => {
    console.log("Server HTTP 8080");
});
