import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../Config/config.json";
import { ErrorToast } from "../../Helpers/ToastHelper";

export default function useRegister() {
    type Data = {
        username: string;
        password: string;
        confirmPassword: string;
    };
    type Validation = {
        pwMatch: boolean;
        usernameValid: boolean;
    };
    const defaultData: Data = {
        username: "",
        password: "",
        confirmPassword: "",
    };
    const defaultValidation: Validation = {
        pwMatch: false,
        usernameValid: false,
    };
    const navigate = useNavigate();
    const [data, setData] = useState<Data>(defaultData);
    const [validation, setValidation] = useState<Validation>(defaultValidation);
    const [loading, setLoading] = useState<boolean>(false);
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    }

    useEffect(() => {
        if (data.password.length > 0 && data.confirmPassword.length > 0)
            setValidation((prev) => ({
                ...prev,
                pwMatch: data.password === data.confirmPassword,
            }));
    }, [data.password, data.confirmPassword]);
    // Abandoned due to the safety issues - unavaliable HTTPS on backend
    // useEffect(() => {
    //     setValidation((prev) => ({ ...prev, emailValid: isValidEmail(data.email) }));
    // }, [data.email]);
    useEffect(() => {
        setValidation((prev) => ({ ...prev, usernameValid: isValidUsername(data.username) }));
    }, [data.username]);

    async function registerOnBackend(data: Data): Promise<void> {
        if (validation.pwMatch && validation.usernameValid)
            try {
                setLoading(true);
                const response = await fetch(`${config.backendUrl}/registerUser`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: data.username,
                        password: data.password,
                    }),
                });
                const responseData = await response.json();
                if (response.ok) {
                    toast.success("Registration successful", {
                        theme: "dark",
                        pauseOnHover: false,
                        hideProgressBar: false,
                        autoClose: 2000,
                    });
                    navigate("/");
                } else {
                    ErrorToast(`Registration error: ${responseData.message}`);
                }
            } catch (error) {
                ErrorToast(`Caught error: ${error}`);
            } finally {
                setLoading(false);
            }
        else {
            ErrorToast(`Invalid data, cannot sent for registration!`);
        }
    }

    // Abandoned due to the safety issues - unavaliable HTTPS on backend
    // function isValidEmail(email: string) {
    //     return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
    //         email
    //     );
    // }

    function isValidUsername(username: string) {
        return /^[a-zA-Z0-9]{1,25}$/.test(username);
    }

    return { data, validation, loading, registerOnBackend, handleChange, navigate };
}
