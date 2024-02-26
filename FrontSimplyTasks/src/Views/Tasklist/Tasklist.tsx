import "./Tasklist.css";
import useTasklist from "./useTasklist";
export default function Tasklist() {
    const { tasksJsx, logOut, handleCreate } = useTasklist();

    return (
        <div className="tasklistMainContainer">
            <nav>
                <button className="logOutBtn" onClick={logOut}>
                    LogOut
                </button>
                <button
                    onClick={() => {
                        handleCreate();
                    }}
                    className="addTaskBtn"
                >
                    Add Task
                </button>
            </nav>
            <div className="tasks">{tasksJsx}</div>
        </div>
    );
}
