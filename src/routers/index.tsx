import { Switch, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import PrivateRoutes from "./PrivateRoutes";



export const RoutesApp = () => {
    return (
        <Switch >
            <Route path="/login" component={Login} />
            <PrivateRoutes path="/" component={Home} />
        </Switch >
    )
}