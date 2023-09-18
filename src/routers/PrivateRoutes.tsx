import React, { useEffect, useState } from "react";

import { Route, Redirect, RouteProps } from "react-router-dom"
import { useAuth } from "../contexts/auth"
import { api } from "../services/api";

interface RoutesPropsData extends RouteProps {
    role?: string;
}

const PrivateRoutes: React.FC<RoutesPropsData> = ({ role, ...rest }) => {
    const [permissions, setPermissions] = useState([] as string[]);

    useEffect(() => {
        async function loadRoles() {
            const response = await api.post("/verify-token")
            const findRole = response.data?.role?.some((r: any) => role?.split(",").includes(r.slug))
            setPermissions(findRole);
        }

        loadRoles();
    }, []);

    const { userLogged } = useAuth()

    if (!userLogged()) {
        return <Redirect to="/login" />;
    }
    
    
    if (!role && userLogged()) {
        return <Route {...rest} />;
    }

    return permissions ? <Route {...rest} /> : <Redirect to="/login" />;
}


export default PrivateRoutes;