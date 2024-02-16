import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Register from "../Register/Register";
import useApp from "./useApp";
import Tasklist from "../Tasklist/Tasklist";

function App() {
    const { loggedUserId, changeLoggedUser } = useApp();

    return (
        <>
            <Routes>
                <Route path="/" element={<Home changeLoggedUser={changeLoggedUser} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tasklist" element={<Tasklist userId={loggedUserId} />} />
            </Routes>
        </>
    );
}

export default App;
