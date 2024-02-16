import "./Tasklist.css";
type Props = {
    userId: string;
};
export default function Tasklist(props: Props) {
    return <div className="">{props.userId}</div>;
}
