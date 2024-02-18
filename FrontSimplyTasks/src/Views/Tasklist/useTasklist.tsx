import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Task from "../../Components/Tasks/Task";
import { useNavigate } from "react-router-dom";

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
        const response = await fetch(`http://localhost:4545/updateTask/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });

        return response.ok;
    }

    async function deleteTaskApi(taskId: string) {
        const response = await fetch(`http://localhost:4545/deleteTask/${taskId}`, {
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
            toast.error("Server error! Could not update task!", {
                theme: "dark",
                pauseOnHover: true,
                hideProgressBar: false,
                autoClose: 3000,
            });
        }
    }

    async function handleDelete(taskId: string) {
        const deletedSuccessfully = await deleteTaskApi(taskId);
        if (deletedSuccessfully)
            setTasks((prev) => prev.filter((task) => task.taskId !== taskId));
        else {
            toast.error("Server error! Could not delete the task!", {
                theme: "dark",
                pauseOnHover: true,
                hideProgressBar: false,
                autoClose: 3000,
            });
        }
    }

    async function getTasks(): Promise<void> {
        console.log("Getting tasks");
        const response = await fetch(`http://localhost:4545/tasks/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        console.log("Response:", response);
        const responseData = await response.json();
        console.log("RD: ", responseData);
        if (response.ok) {
            setTasks(responseData.tasks);
        } else {
            toast.error("Couldn't load tasks: " + responseData.message, {
                theme: "dark",
                pauseOnHover: true,
                hideProgressBar: false,
                autoClose: 3000,
            });
        }
    }

    return { tasksJsx, logOut };
}
