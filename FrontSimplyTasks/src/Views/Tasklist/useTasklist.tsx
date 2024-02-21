import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Task from "../../Components/Tasks/Task";
import { useNavigate } from "react-router-dom";
import config from "../../Config/config.json";
import { ErrorToast } from "../../Helpers/ToastHelper";

export default function useTasklist() {
    type Task = {
        taskId: string;
        ownerId: string;
        text: string;
        creationDate: string;
        modificationDate: string;
    };
    const userId = localStorage.getItem("simplyTasksUser");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [tasksJsx, setTasksJsx] = useState<JSX.Element[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
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

    async function updateTaskApi(taskId: string, text: string) {
        const response = await fetch(`${config.backendUrl}/updateTask/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: text, modifiedDate: Date.now().toString() }),
        });
        const responseData = await response.json();

        if (!response.ok) {
            ErrorToast(`Server error! ${responseData.message}`);
            // toast.error(`Server error! ${responseData.message}`, {
            //     theme: "dark",
            //     pauseOnHover: true,
            //     hideProgressBar: false,
            //     autoClose: 3000,
            // });
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
        const updatedSuccessfully = await updateTaskApi(taskId, text);
        if (updatedSuccessfully)
            setTasks((prev) =>
                prev.map((task) => (task.taskId === taskId ? { ...task, text: text } : task))
            );
        else {
            ErrorToast(`Server error!`);
            // toast.error(`Server error!`, {
            //     theme: "dark",
            //     pauseOnHover: true,
            //     hideProgressBar: false,
            //     autoClose: 3000,
            // });
        }
    }

    async function handleDelete(taskId: string) {
        const deletedSuccessfully = await deleteTaskApi(taskId);
        if (deletedSuccessfully)
            setTasks((prev) => prev.filter((task) => task.taskId !== taskId));
        else {
            ErrorToast(`Server error! Could not delete the task!`);
            // toast.error("Server error! Could not delete the task!", {
            //     theme: "dark",
            //     pauseOnHover: true,
            //     hideProgressBar: false,
            //     autoClose: 3000,
            // });
        }
    }

    async function getTasks(): Promise<void> {
        console.log("Getting tasks");
        const response = await fetch(`https://localhost:443/tasks/${userId}`, {
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
            // toast.error("Couldn't load tasks: " + responseData.message, {
            //     theme: "dark",
            //     pauseOnHover: true,
            //     hideProgressBar: false,
            //     autoClose: 3000,
            // });
        }
    }

    return { tasksJsx, logOut };
}
