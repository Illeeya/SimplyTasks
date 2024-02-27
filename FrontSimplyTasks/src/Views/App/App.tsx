import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Register from "../Register/Register";
import Tasklist from "../Tasklist/Tasklist";
import config from "../../Config/config.json";
import { toast } from "react-toastify";
import { ErrorToast } from "../../Helpers/ToastHelper";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        backendWakeup();
    }, []);

    async function backendWakeup() {
        const response = await fetch(`${config.backendUrl}/`, {
            method: "GET",
        });
        if (response.ok) {
            toast.info("Server awake", { theme: "dark", autoClose: 1000 });
        } else {
            ErrorToast("Server awakening failed!");
        }
    }
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tasklist" element={<Tasklist />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </>
    );
}

export default App;
