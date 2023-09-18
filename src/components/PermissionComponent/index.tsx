import React, { useEffect, useState } from "react";
import { api } from "../../services/api";


interface PermissionComponentProps {
    role: string;
    children: React.ReactNode
}





const PermissionComponent: React.FC<PermissionComponentProps> = ({ role, children }) => {
    const [permissions, setPermissions] = useState([] as string[]);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadRoles() {
            const response = await api.post("/verify-token").finally(() => { setLoading(false) })
            console.log(response.data);
            const findRole = response.data?.role?.some((r: any) => role?.split(",").includes(r.slug))
            console.log(findRole);
            setPermissions(findRole);
        }

        loadRoles();
    }, [])

    if(loading) <><h3>loading...</h3></>

    return <>{permissions && children}</>;
}

export default PermissionComponent;