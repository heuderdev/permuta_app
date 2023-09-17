import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { PrivateRouter } from "./PrivateRouter";



export const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<PrivateRouter><Home /></PrivateRouter>} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}