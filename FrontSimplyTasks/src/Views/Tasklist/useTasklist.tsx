import { useEffect, useState } from "react";
import Task from "../../Components/Tasks/Task";
import { useNavigate } from "react-router-dom";
import config from "../../Config/config.json";
import { ErrorToast } from "../../Helpers/ToastHelper";

export default function useTasklist() {
    type Task = {
        taskId: string;
        userId: string;
        text: string;
        creationDate: string;
        modifiedDate: string;
    };
    let userId = localStorage.getItem("simplyTasksUser");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [tasksJsx, setTasksJsx] = useState<JSX.Element[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const loginDate = localStorage.getItem("simplyTasksLoginDate") || "";
        const today = Date.now();
        if (loginDate == "" || today > Number(loginDate) + 604800000) {
            localStorage.setItem("simplyTasksUser", "");
            userId = "";
        }

        if (userId === "" || userId === null) {
            navigate("/");
        } else {
            getTasks();
        }
    }, []);

    useEffect(() => {
        const newTasksJsx = tasks.map((task) => (
            <Task
                taskId={task.taskId}
                handleChange={handleDataChange}
                handleDelete={handleDelete}
                text={task.text}
                key={crypto.randomUUID()}
            />
        ));
        setTasksJsx(newTasksJsx);
    }, [tasks]);

    function logOut() {
        localStorage.setItem("simplyTasksUser", "");
        navigate("/");
    }

    async function createTaskApi(task: Task) {
        console.log(task);
        const response = await fetch(`${config.backendUrl}/createTask`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        console.log(response);
        const responseData = await response.json();

        if (!response.ok) {
            ErrorToast(`Server error! ${responseData.message}`);
        }
        return response.ok;
    }

    async function updateTaskApi(taskId: string, text: string) {
        const response = await fetch(`${config.backendUrl}/updateTask/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: text, modifiedDate: Date.now().toString() }),
        });
        const responseData = await response.json();

        if (!response.ok) {
            ErrorToast(`Server error! ${responseData.message}`);
        }
        return response.ok;
    }

    async function deleteTaskApi(taskId: string) {
        const response = await fetch(`${config.backendUrl}/deleteTask/${taskId}`, {
            method: "DELETE",
        });

        return response.ok;
    }

    async function handleDataChange(taskId: string, text: string) {
        if (text === "" || text == null) {
            handleDelete(taskId);
        } else {
            const updatedSuccessfully = await updateTaskApi(taskId, text);
            if (updatedSuccessfully)
                setTasks((prev) =>
                    prev.map((task) =>
                        task.taskId === taskId ? { ...task, text: text } : task
                    )
                );
            else {
                ErrorToast(`Server error!`);
            }
        }
    }

    async function handleCreate() {
        if (tasks[0].text == "") return;
        const task: Task = {
            taskId: crypto.randomUUID(),
            userId: userId!,
            text: "",
            creationDate: Date.now().toString(),
            modifiedDate: Date.now().toString(),
        };
        setTasks((prev) => [task, ...prev]);
        const createdSuccessfully = await createTaskApi(task);
        if (!createdSuccessfully) {
            setTasks((prev) => prev.filter((task) => task.taskId !== task.taskId));
            ErrorToast(`Server error! Could not create the new task!`);
        }
    }

    async function handleDelete(taskId: string) {
        setTasks((prev) => prev.filter((task) => task.taskId !== taskId));
        const deletedSuccessfully = await deleteTaskApi(taskId);
        if (!deletedSuccessfully) {
            await getTasks();
            ErrorToast(`Server error! Could not delete the task!`);
        }
    }

    async function getTasks(): Promise<void> {
        console.log("Getting tasks");
        const response = await fetch(`${config.backendUrl}/tasks/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        console.log("Response:", response);
        const responseData = await response.json();
        console.log("RD: ", responseData);
        if (response.ok) {
            setTasks(responseData.tasks);
        } else {
            ErrorToast(`Couldn't load tasks: ${responseData.message}`);
        }
    }

    return { tasksJsx, logOut, handleCreate };
}
