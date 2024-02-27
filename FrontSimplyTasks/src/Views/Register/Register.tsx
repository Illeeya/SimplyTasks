import "./Register.css";
import logoDark from "../../assets/LogoDark.png";
import useRegister from "./useRegister";
import { BeatLoader } from "react-spinners";
export default function Register() {
    const { data, loading, validation, registerOnBackend, handleChange, navigate } =
        useRegister();

    return (
        <div className="registerMainContainer">
            <img className="logo" src={logoDark} alt="SimplyTasksLogo" />
            <div className="warning">
                <h3>WARNING</h3>
                <p>Please, do not use your typical data for this registration.</p>
                <p>This is a free, hobby project with basic security.</p>
                <p>Encryption isn't strong so do not provide sensitive data.</p>
            </div>
            <div className="info">
                <h3>Info</h3>
                <p>Backend runs on a free server that tends to sleep.</p>
                <p>Waking up might take around a minute, so please be patient.</p>
            </div>
            <div className="register">
                {/* Abandoned due to the safety issues - unavaliable HTTPS on backend */}
                {/* <input
                    onChange={handleChange}
                    value={data.email}
                    placeholder="email@example.com"
                    type="email"
                    maxLength={50}
                    name="email"
                    id="email"
                    className={validation.emailValid || data.email === "" ? "" : "noMatch"}
                />
                <p>{validation.emailValid || data.email === "" ? "" : "Invalid email!"}</p> */}
                <input
                    onChange={handleChange}
                    value={data.username}
                    placeholder="Username..."
                    type="text"
                    maxLength={50}
                    name="username"
                    id="username"
                    className={
                        validation.usernameValid || data.username === "" ? "" : "noMatch"
                    }
                />
                <p>
                    {validation.usernameValid || data.username === ""
                        ? ""
                        : "Invalid username!"}
                </p>
                <input
                    onChange={handleChange}
                    value={data.password}
                    placeholder="Password..."
                    type="password"
                    maxLength={50}
                    name="password"
                    id="password"
                />
                <input
                    onChange={handleChange}
                    value={data.confirmPassword}
                    placeholder="Confirm Password..."
                    type="password"
                    maxLength={50}
                    name="confirmPassword"
                    id="confirmPassword"
                    className={
                        validation.pwMatch || data.confirmPassword === "" ? "" : "noMatch"
                    }
                />
                <p>
                    {validation.pwMatch || data.confirmPassword === ""
                        ? ""
                        : "Passwords do not match!"}
                </p>
                <div className="loaderButton">
                    {loading ? (
                        <BeatLoader className="beatLoader" color="#888" />
                    ) : (
                        <button
                            onClick={() => {
                                registerOnBackend(data);
                            }}
                            disabled={!validation.usernameValid || !validation.pwMatch}
                        >
                            Register
                        </button>
                    )}
                </div>
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
