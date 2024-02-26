import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../Config/config.json";
import { ErrorToast } from "../../Helpers/ToastHelper";

type Data = {
    username: string;
    password: string;
};

const defaultData: Data = {
    username: "",
    password: "",
};

export default function useHome() {
    const navigate = useNavigate();

    const [data, setData] = useState<Data>(defaultData);
    const [dataValid, setDataValid] = useState<boolean>(false);

    useEffect(() => {
        const loginDate = localStorage.getItem("simplyTasksLoginDate") || "";
        const today = Date.now();
        if (loginDate === "" || today > Number(loginDate) + 604800000) {
            localStorage.setItem("simplyTasksUser", "");
        }
        const storedId = localStorage.getItem("simplyTasksUser") || "";
        if (storedId !== "") navigate("/tasklist");
    }, []);

    useEffect(() => {
        if (
            data.username.length > 0 &&
            data.password.length > 0 &&
            isValidUsername(data.username)
        )
            setDataValid(true);
    }, [data]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    }

    async function Login(): Promise<void> {
        try {
            const response = await fetch(`${config.backendUrl}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                }),
            });
            const responseData = await response.json();
            if (response.ok && responseData.userId) {
                localStorage.setItem("simplyTasksUser", responseData.userId);
                localStorage.setItem("simplyTasksLoginDate", Date.now().toString());
                navigate("/Tasklist");
            } else {
                ErrorToast(`Login error: ${responseData.message}`);
            }
        } catch (error) {
            ErrorToast(`Login error: ${error}`);
        }
    }

    function isValidUsername(username: string) {
        return /^[a-zA-Z0-9]{1,25}$/.test(username);
    }

    return { data, dataValid, handleChange, Login };
}
