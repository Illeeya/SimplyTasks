import { useNavigate } from "react-router-dom";
import logoDark from "../../assets/LogoDark.png";
import "./Home.css";
import useHome from "./useHome";

export default function Home() {
    const navigate = useNavigate();
    const { data, dataValid, handleChange, Login } = useHome();
    return (
        <div className="homeMainContainer">
            <img className="logo" src={logoDark} alt="SimplyTasksLogo" />
            <h1 className="title">
                SIMPLY <br />
                TASKS
            </h1>
            <div className="forms">
                <div className="login">
                    <input
                        value={data.username}
                        onChange={handleChange}
                        name="username"
                        placeholder="Username..."
                        type="text"
                        maxLength={50}
                    />
                    <input
                        value={data.password}
                        onChange={handleChange}
                        name="password"
                        placeholder="Password..."
                        type="password"
                        maxLength={50}
                    />
                    <button onClick={() => Login()} className="btn" disabled={!dataValid}>
                        Login
                    </button>
                </div>
                <div className="register">
                    <p>Don't have an account?</p>
                    <button onClick={() => navigate("/register")} className="btn">
                        Register
                    </button>
                </div>
            </div>
        </div>
    ); // classname='newModuleMainContainer'
}
