import { ChangeEvent, useState } from "react";
import { Props } from "./Task";

export default function useTask(props: Props) {
    const [text, setText] = useState<string>(props.text);

    function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
        setText(e.target.value);
    }
    return { handleTextChange, text };
}
