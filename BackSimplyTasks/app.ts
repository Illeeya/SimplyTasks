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

server.get("/", async (req: Request, res: Response) => {
    res.status(200).send("Test successful. Endpoint works correctly.");
});

server.get("/tasks/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const result = await TaskBaseHandler("GET", { userId });
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
    const result = await TaskBaseHandler("DELETE", { taskId });

    const _message = result.success ? "Task deleted" : result.message;
    const response = { success: result.success, message: _message };

    res.status(result.success ? 200 : 500).send(JSON.stringify(response));
});

server.put("/createTask", async (req: Request, res: Response) => {
    console.log("Creating task!");
    const task = req.body;
    const result = await TaskBaseHandler("CREATE", task);

    const _message = result.success ? "Task created" : result.message;
    const response = { success: result.success, message: _message };

    res.status(result.success ? 200 : 500).send(JSON.stringify(response));
});

server.put("/updateTask/:taskId", async (req: Request, res: Response) => {
    console.log("Updating task!");
    console.log(req.body);
    const taskId = req.params.taskId;
    const result = await TaskBaseHandler("UPDATE", {
        taskId,
        text: req.body.text,
        modifiedDate: req.body.modifiedDate,
    });

    const _message = result.success ? "Task updated" : result.message;
    const response = { success: result.success, message: _message };

    res.status(result.success ? 200 : 500).send(JSON.stringify(response));
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

server.listen(443, () => {
    console.log("Server HTTP 443");
});
