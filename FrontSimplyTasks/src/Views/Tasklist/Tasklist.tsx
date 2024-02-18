import "./Tasklist.css";
import useTasklist from "./useTasklist";
export default function Tasklist() {
    const { tasksJsx, logOut } = useTasklist();

    return (
        <div className="tasklistMainContainer">
            <nav>
                <button className="logOutBtn" onClick={logOut}>
                    LogOut
                </button>
                <button className="addTaskBtn">Add Task</button>
            </nav>
            <div className="tasks">{tasksJsx}</div>
        </div>
    );
}
