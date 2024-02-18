import useTask from "./useTask";
import "./Task.css";
export type Props = {
    taskId: string;
    text: string;
    handleChange: (taskId: string, text: string) => void;
    handleDelete: (taskId: string) => void;
};

export default function Task(props: Props) {
    const { handleTextChange, text } = useTask(props);

    return (
        <div className="taskMainContainer">
            <input
                onChange={handleTextChange}
                onBlur={() => props.handleChange(props.taskId, text)}
                value={text}
                type="text"
                name="taskText"
                id="taskText"
                maxLength={50}
            />
            <button onClick={() => props.handleDelete(props.taskId)}>—</button>
        </div>
    );
}
