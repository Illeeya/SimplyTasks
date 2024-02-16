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
            <div className="register">
                <input
                    onChange={handleChange}
                    value={data.email}
                    placeholder="email@example.com"
                    type="email"
                    maxLength={50}
                    name="email"
                    id="email"
                    className={validation.emailValid || data.email === "" ? "" : "noMatch"}
                />
                <p>{validation.emailValid || data.email === "" ? "" : "Invalid email!"}</p>
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
                            disabled={
                                !validation.emailValid ||
                                !validation.usernameValid ||
                                !validation.pwMatch
                            }
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
