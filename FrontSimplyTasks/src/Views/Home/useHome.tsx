import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
    changeLoggedUser: (userId: string) => void;
};

type Data = {
    username: string;
    password: string;
};

const defaultData: Data = {
    username: "",
    password: "",
};

export default function useHome(props: Props) {
    const navigate = useNavigate();

    const [data, setData] = useState<Data>(defaultData);
    const [dataValid, setDataValid] = useState<boolean>(false);

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
            const response = await fetch("http://localhost:4545/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                }),
            });
            const responseData = await response.json();
            if (response.ok && responseData.userId) {
                props.changeLoggedUser(responseData.userId);
                navigate("/Tasklist");
            } else {
                toast.error("Login error: " + responseData.message, {
                    theme: "dark",
                    pauseOnHover: true,
                    hideProgressBar: false,
                    autoClose: 3000,
                });
            }
        } catch (error) {
            toast.error(`Login error: ${error}`, {
                theme: "dark",
                pauseOnHover: true,
                hideProgressBar: false,
                autoClose: 3000,
            });
        }
    }

    function isValidUsername(username: string) {
        return /^[a-zA-Z0-9]{1,25}$/.test(username);
    }

    return { data, dataValid, handleChange, Login };
}
