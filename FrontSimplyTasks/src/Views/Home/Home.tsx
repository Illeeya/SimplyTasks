import { useNavigate } from "react-router-dom";
import logoDark from "../../assets/LogoDark.png";
import "./Home.css";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="homeMainContainer">
            <img className="logo" src={logoDark} alt="SimplyTasksLogo" />
            <h1 className="title">
                SIMPLY <br />
                TASKS
            </h1>
            <div className="forms">
                <div className="login">
                    <input placeholder="Username..." type="text" />
                    <input placeholder="Password..." type="password" />
                    <button onClick={() => navigate("/login")} className="btn">
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
