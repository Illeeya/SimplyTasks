import "./Tasklist.css";
import useTasklist from "./useTasklist";
type Props = {
    userId: string;
};
export default function Tasklist({ userId }: Props) {
    const {} = useTasklist(userId);

    return <div className=""></div>;
}
