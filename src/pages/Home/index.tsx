import React from "react";
import PermissionComponent from "../../components/PermissionComponent";

export const Home = () => {
    return (
        <>
            <h1>Page Home </h1>
            <PermissionComponent role="games.list">
                <h1>Listar</h1>
            </PermissionComponent>
            <PermissionComponent role="games.edit">
                <h1>Editar</h1>
            </PermissionComponent>
        </>
    )
}