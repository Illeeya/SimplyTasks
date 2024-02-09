import logoDark from "../../assets/LogoDark.png";
import "./Home.css";

export default function Home() {
    return (
        <div className="homeMainContainer">
            <img src={logoDark} alt="SimplyTasksLogo" />
            <h2>Welcome</h2>
            <h3>to</h3>
            <h1>SIMPLY</h1>
            <h1>TASKS</h1>
            <button className="btn">Login</button>
            <button className="btn">Register</button>
        </div>
    ); // classname='newModuleMainContainer'
}
