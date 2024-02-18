import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Register from "../Register/Register";
import Tasklist from "../Tasklist/Tasklist";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tasklist" element={<Tasklist />} />
            </Routes>
        </>
    );
}

export default App;
