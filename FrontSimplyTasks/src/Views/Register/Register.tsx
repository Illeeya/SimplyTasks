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
        pwMatch: false,
    };
    const navigate = useNavigate();
    const [data, setData] = useState<Data>(defaultData);
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setData((prevData) => {
            const newData = { ...prevData, [e.target.name]: e.target.value };
            if (e.target.name === "confirmPassword") {
                newData.pwMatch = newData.password === newData.confirmPassword;
            }
            return newData;
        });
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
                <button
                    onClick={() => {
                        alert(`Registered as ${data.username} with pw: ${data.password} `);
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
