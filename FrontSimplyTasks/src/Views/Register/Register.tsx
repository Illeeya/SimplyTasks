import { useNavigate } from "react-router-dom";
import "./Register.css";
import logoDark from "../../assets/LogoDark.png";
import { ChangeEvent, useState } from "react";
export default function Register() {
    type Data = {
        email: string;
        username: string;
        password: string;
        confirmPassword: string;
        pwMatch: boolean;
    };
    const defaultData: Data = {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        pwMatch: true,
    };
    const navigate = useNavigate();
    const [data, setData] = useState<Data>(defaultData);
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setData((prevData) => {
            const newData = { ...prevData, [e.target.name]: e.target.value };
            if (e.target.name === "confirmPassword" || e.target.name === "password") {
                if (newData.password.length > 0 && newData.confirmPassword.length > 0)
                    newData.pwMatch = newData.password === newData.confirmPassword;
            }
            return newData;
        });
    }

    async function registerOnBackend(data: Data): Promise<void> {
        try {
            const response = await fetch("http://localhost:4545/registerUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                alert("Registered properly on backend!");
            } else {
                alert("Error on backend!");
            }
        } catch (error) {
            alert(`Catch error!: ${error}`);
        }
    }

    return (
        <div className="registerMainContainer">
            <img className="logo" src={logoDark} alt="SimplyTasksLogo" />
            <div className="register">
                <input
                    onChange={handleChange}
                    value={data.email}
                    placeholder="email@example.com"
                    type="email"
                    name="email"
                    id="email"
                />
                <input
                    onChange={(e) => {
                        handleChange(e);
                    }}
                    value={data.username}
                    placeholder="Username..."
                    type="text"
                    name="username"
                    id="username"
                />
                <input
                    onChange={(e) => {
                        handleChange(e);
                    }}
                    value={data.password}
                    placeholder="Password..."
                    type="password"
                    name="password"
                    id="password"
                />
                <input
                    onChange={(e) => {
                        handleChange(e);
                    }}
                    value={data.confirmPassword}
                    placeholder="Confirm Password..."
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className={data.pwMatch ? "" : "noMatch"}
                />
                <p>{!data.pwMatch && "Passwords do not match!"}</p>
                <button
                    onClick={() => {
                        registerOnBackend(data);
                    }}
                >
                    Register
                </button>
            </div>
            <div className="login">
                <p>Already have an account?</p>
                <button
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Login
                </button>
            </div>
        </div>
    ); // classname='newModuleMainContainer'
}
